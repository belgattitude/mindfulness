/**
 * Converts, in place, the markdown left in "blocks" fields that were
 * "richtext" fields before (the schema type was changed, the column was kept,
 * see lib/markdown-to-blocks.mts for the conversion).
 *
 * Every blocks field of the api content types is checked, or the ones of the
 * given content types. Values already holding blocks json are skipped, so the
 * script can run again. Every row is converted: the draft and the published
 * version of a document are separate rows, both are updated so the
 * publication state is unchanged.
 *
 * Dry run by default (prints the converted json), --write saves.
 * Strapi is loaded but not started (no http server). The admin and the api
 * cannot read the markdown values: run it right after the schema change is
 * deployed. Run a backup first, or point DATABASE_FILENAME to a copy to try it.
 *
 * Usage: pnpm migrate:blocks [uid...] [--write]
 *   ie:  pnpm migrate:blocks --write
 *        pnpm migrate:blocks api::home.home
 */

import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';
import { markdownToBlocks } from './lib/markdown-to-blocks.mts';

// The esm build of @strapi/core fails on named lodash imports under node,
// the commonjs build is used instead
const { compileStrapi, createStrapi } = createRequire(import.meta.url)(
  '@strapi/strapi'
) as typeof import('@strapi/strapi');

type Row = { id: number; document_id: string; published_at: string | null; value: unknown };

const { positionals: uids, values } = parseArgs({
  allowPositionals: true,
  options: {
    write: { type: 'boolean', default: false },
  },
});

/** Blocks json (an array), as opposed to the markdown left by the richtext field */
const isBlocksJson = (value: string) => {
  try {
    return Array.isArray(JSON.parse(value));
  } catch {
    return false;
  }
};

const app = await createStrapi(await compileStrapi()).load();
let failed = 0;
try {
  /** Blocks images embed the media library file, with a relative url */
  const resolveImage = async (url: string) => {
    const path = url.replace(/^https?:\/\/[^/]+/u, '');
    const file = await app.db.query('plugin::upload.file').findOne({ where: { url: path } });
    return file ?? null;
  };

  const contentTypes = Object.values(app.contentTypes).filter((contentType) =>
    uids.length > 0 ? uids.includes(contentType.uid) : contentType.uid.startsWith('api::')
  );
  const unknown = uids.filter((uid) => !contentTypes.some((contentType) => contentType.uid === uid));
  if (unknown.length > 0) throw new Error(`Unknown content types: ${unknown.join(', ')}`);

  for (const contentType of contentTypes) {
    const metadata = app.db.metadata.get(contentType.uid);
    const fields = Object.entries(contentType.attributes as Record<string, { type: string }>)
      .filter(([, attribute]) => attribute.type === 'blocks')
      .map(([name]) => ({
        name,
        column: (metadata.attributes[name] as { columnName?: string }).columnName ?? name,
      }));

    for (const field of fields) {
      // Raw reads: the query layer would try to parse the markdown as json
      const rows = (await app.db
        .connection(metadata.tableName)
        .select('id', 'document_id', 'published_at', { value: field.column })
        .orderBy('id')) as Row[];

      for (const row of rows) {
        const label = `${contentType.uid}.${field.name} #${row.id} ${row.document_id} (${row.published_at ? 'published' : 'draft'})`;
        const markdown = typeof row.value === 'string' ? row.value : '';
        if (markdown.trim() === '' || isBlocksJson(markdown)) continue;
        try {
          const blocks = await markdownToBlocks(markdown, resolveImage);
          if (values.write) {
            // A raw update: the query layer would set updatedAt, a draft newer
            // than its published version shows the document as modified
            await app.db
              .connection(metadata.tableName)
              .where({ id: row.id })
              .update({ [field.column]: JSON.stringify(blocks) });
            console.log(`✔ ${label}: ${blocks.length} blocks written`);
          } else {
            console.log(`• ${label}: ${blocks.length} blocks (dry run)\n${JSON.stringify(blocks, null, 2)}`);
          }
        } catch (error) {
          failed++;
          console.error(`✖ ${label}: ${(error as Error).message}`);
        }
      }
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
