import fs from 'node:fs/promises';
import decode from 'heic-decode';
import sharp from 'sharp';

/**
 * Prepares uploaded images before the upload controller sees them:
 * - HEIC/HEIF (iPhone photos) are converted to WebP. Browsers cannot display
 *   HEIC and the prebuilt sharp only decodes AVIF, so strapi would store them as
 *   plain files without thumbnails or responsive formats.
 * - HEIC, JPEG and PNG wider than MAX_WIDTH are scaled down, the original is
 *   not kept.
 *
 * Set on the admin and content api upload routes (create and replace) in
 * src/extensions/upload/strapi-server.js: it runs after the authentication, so
 * anonymous requests cannot make the server decode images.
 */

const HEIC_BRANDS = new Set(['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs']);
// Generic HEIF brands, also used by AVIF: only trusted with a heic name or type
const HEIF_BRANDS = new Set(['mif1', 'msf1']);
const HEIC_EXT = /\.hei[cf]$/i;

const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const QUALITY = 85;
// Phone photos are ~4000px wide, the site never shows them larger
const MAX_WIDTH = 1600;

const isHeicName = (name) => typeof name === 'string' && HEIC_EXT.test(name);

const isHeic = (file, head) => {
  // ISO BMFF: bytes 4-8 are 'ftyp', 8-12 the major brand
  if (head.length < 12 || head.toString('latin1', 4, 8) !== 'ftyp') {
    return false;
  }
  const brand = head.toString('latin1', 8, 12);
  if (HEIC_BRANDS.has(brand)) {
    return true;
  }
  const declared = /^image\/hei[cf]/.test(file.mimetype ?? '') || isHeicName(file.originalFilename);
  return HEIF_BRANDS.has(brand) && declared;
};

const readHead = async (filepath) => {
  const handle = await fs.open(filepath, 'r');
  try {
    const { buffer, bytesRead } = await handle.read(Buffer.alloc(12), 0, 12, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
};

const toWebpName = (name) => (isHeicName(name) ? name.replace(HEIC_EXT, '.webp') : `${name}.webp`);

const resize = (image) => image.resize({ width: MAX_WIDTH, withoutEnlargement: true });

// Same temporary path: whoever cleans up the multipart files still finds it
const replaceFile = async (file, buffer) => {
  await fs.writeFile(file.filepath, buffer);
  file.size = buffer.length;
};

const convertHeic = async (file) => {
  // libheif applies the rotation and mirroring, the exif (gps…) is dropped
  const { width, height, data } = await decode({ buffer: await fs.readFile(file.filepath) });
  const raw = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  const webp = await resize(sharp(raw, { raw: { width, height, channels: 4 } }))
    .webp({ quality: QUALITY })
    .toBuffer();
  await replaceFile(file, webp);
  file.mimetype = 'image/webp';
  file.originalFilename = toWebpName(file.originalFilename ?? 'image');
};

const resizeImage = async (file, format) => {
  const input = await fs.readFile(file.filepath);
  const { width, height, orientation } = await sharp(input).metadata();
  // Exif orientations 5 to 8 are rotated a quarter turn: the displayed width is the height
  const displayedWidth = orientation >= 5 ? height : width;
  if (!displayedWidth || displayedWidth <= MAX_WIDTH) {
    return;
  }
  // rotate() applies the exif orientation, which is dropped with the rest of the exif
  const image = resize(sharp(input).rotate());
  const output =
    format === 'jpeg'
      ? await image.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer()
      : await image.png({ compressionLevel: 9 }).toBuffer();
  await replaceFile(file, output);
};

// Returns true when a HEIC file was converted (its name changed)
const processFile = async (file) => {
  if (!file?.filepath) {
    return false;
  }
  const head = await readHead(file.filepath);
  if (isHeic(file, head)) {
    await convertHeic(file);
    return true;
  }
  if (head.subarray(0, JPEG_MAGIC.length).equals(JPEG_MAGIC)) {
    await resizeImage(file, 'jpeg');
  } else if (head.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
    await resizeImage(file, 'png');
  }
  return false;
};

// The admin sends the original file name in fileInfo (json string or object, one per file)
const renameFileInfo = (fileInfo) => {
  if (Array.isArray(fileInfo)) {
    return fileInfo.map(renameFileInfo);
  }
  const isString = typeof fileInfo === 'string';
  let info;
  try {
    info = isString ? JSON.parse(fileInfo) : fileInfo;
  } catch {
    return fileInfo;
  }
  if (!isHeicName(info?.name)) {
    return fileInfo;
  }
  const renamed = { ...info, name: toWebpName(info.name) };
  return isString ? JSON.stringify(renamed) : renamed;
};

export default (_config, { strapi }) =>
  async (ctx, next) => {
    const files = ctx.request.files;
    if (!files) {
      return next();
    }
    let converted = 0;
    for (const value of Object.values(files)) {
      for (const file of Array.isArray(value) ? value : [value]) {
        try {
          if (await processFile(file)) {
            converted += 1;
          }
        } catch (error) {
          strapi.log.error(`Image processing failed for ${file.originalFilename}: ${error.message}`);
          return ctx.badRequest(`Impossible de traiter l’image ${file.originalFilename}`);
        }
      }
    }
    if (converted > 0 && ctx.request.body?.fileInfo) {
      ctx.request.body.fileInfo = renameFileInfo(ctx.request.body.fileInfo);
    }
    return next();
  };
