/**
 * Copies a markdown "richtext" field into a "blocks" field of the same
 * content type, converted (see lib/markdown-to-blocks.mts).
 *
 * Every row is converted: the draft and the published version of a document
 * are separate rows, both are updated so the publication state is unchanged.
 * Rows whose blocks field is already filled are skipped (--force overwrites).
 *
 * Dry run by default (prints the converted json), --write saves.
 * Strapi is loaded but not started (no http server): it can run while
 * `strapi develop` is running. Run a backup first, or point DATABASE_FILENAME
 * to a copy to try it.
 *
 * Usage: pnpm migrate:blocks <uid> <markdownField> <blocksField> [--write] [--force]
 *   ie:  pnpm migrate:blocks api::home.home introduction content --write
 */

import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';
import { exitWithError } from './lib/errors.mts';
import { markdownToBlocks } from './lib/markdown-to-blocks.mts';

// The esm build of @strapi/core fails on named lodash imports under node,
// the commonjs build is used instead
const { compileStrapi, createStrapi } = createRequire(import.meta.url)(
  '@strapi/strapi'
) as typeof import('@strapi/strapi');

type Row = { id: number; documentId: string; publishedAt: string | null } & Record<string, unknown>;

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    write: { type: 'boolean', default: false },
    force: { type: 'boolean', default: false },
  },
});
const [uid, from, to] = positionals;
if (!uid || !from || !to) {
  exitWithError(new Error('Usage: pnpm migrate:blocks <uid> <markdownField> <blocksField> [--write] [--force]'));
}

const isEmptyBlocks = (value: unknown) => !Array.isArray(value) || value.length === 0;

const app = await createStrapi(await compileStrapi()).load();
let failed = 0;
try {
  const attributes = app.contentType(uid as never)?.attributes as Record<string, { type: string }> | undefined;
  if (attributes?.[from]?.type !== 'richtext') throw new Error(`${uid}.${from} is not a richtext field`);
  if (attributes?.[to]?.type !== 'blocks') throw new Error(`${uid}.${to} is not a blocks field`);

  /** Blocks images embed the media library file, with a relative url */
  const resolveImage = async (url: string) => {
    const path = url.replace(/^https?:\/\/[^/]+/u, '');
    const file = await app.db.query('plugin::upload.file').findOne({ where: { url: path } });
    return file ?? null;
  };

  const metadata = app.db.metadata.get(uid);
  const table = metadata.tableName;
  const column = (metadata.attributes[to] as { columnName?: string }).columnName ?? to;

  const rows = (await app.db.query(uid as never).findMany({
    select: ['id', 'documentId', 'publishedAt', from, to],
    orderBy: { id: 'asc' },
  })) as Row[];

  for (const row of rows) {
    const label = `#${row.id} ${row.documentId} (${row.publishedAt ? 'published' : 'draft'})`;
    const markdown = typeof row[from] === 'string' ? (row[from] as string) : '';
    if (markdown.trim() === '') {
      console.log(`- ${label}: empty ${from}, skipped`);
      continue;
    }
    if (!isEmptyBlocks(row[to]) && !values.force) {
      console.log(`- ${label}: ${to} already filled, skipped (--force to overwrite)`);
      continue;
    }
    try {
      const blocks = await markdownToBlocks(markdown, resolveImage);
      if (values.write) {
        // A raw update: the query layer would set updatedAt, a draft newer
        // than its published version shows the document as modified
        await app.db
          .connection(table)
          .where({ id: row.id })
          .update({ [column]: JSON.stringify(blocks) });
        console.log(`✔ ${label}: ${blocks.length} blocks written`);
      } else {
        console.log(`• ${label}: ${blocks.length} blocks (dry run)\n${JSON.stringify(blocks, null, 2)}`);
      }
    } catch (error) {
      failed++;
      console.error(`✖ ${label}: ${(error as Error).message}`);
    }
  }
  if (!values.write) console.log('\nDry run, nothing saved: add --write to save.');
} catch (error) {
  failed++;
  console.error(`✖ ${(error as Error).message}`);
} finally {
  await app.destroy();
}
process.exit(failed > 0 ? 1 : 0);
