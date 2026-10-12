/**
 * Replace the server sqlite database with the local one, after a backup of
 * the server database kept on the server. The opposite of pull-prod.mts.
 *
 * Only the database (the content) is pushed: not the code nor the docker
 * image (that is `pnpm run deploy`), not the uploads (public/uploads). The
 * server keeps running the image it has, restarted on the new database.
 *
 * 1. Consistent copy of the local database (sqlite online backup API, fine
 *    while `pnpm develop` runs), checked with integrity_check.
 * 2. Consistent snapshot of the server database in the running strapi
 *    container (see lib/snapshot.mts), compared with the local copy: content
 *    counts, stored content types schema, media files missing on the server.
 * 3. Confirmation: the user has to type "yes" (no flag to skip it).
 * 4. The snapshot is kept on the server, in sqlite/backups/.
 * 5. Strapi is stopped, the database replaced through a container sharing its
 *    volumes (no host path nor permission needed), strapi restarted and
 *    awaited until healthy.
 *
 * Uploads (public/uploads) are not copied: media of the local database
 * missing on the server are listed before the confirmation.
 *
 * Configuration: REMOTE_SSH in .env.deploy (see .env.deploy.example),
 * DATABASE_FILENAME in .env. BACKUP_REMOTE_SQLITE_DIR (optional) shows the
 * backup path on the host.
 *
 * Usage: pnpm push:prod
 */

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { basename, dirname, join, posix } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { backup, DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import { loadEnv } from './lib/env.mts';
import { exitWithError } from './lib/errors.mts';
import { waitForHealthy } from './lib/health.mts';
import { getLocalDatabasePath } from './lib/local-database.mts';
import { getRemoteSsh, type RemoteSsh } from './lib/remote.mts';
import {
  createSnapshot,
  getTimestamp,
  removeSnapshot,
  STRAPI_CONTAINER,
  type Snapshot,
} from './lib/snapshot.mts';

/** Compared before the confirmation: table, label */
const COUNTED_TABLES = [
  ['pages', 'pages'],
  ['programmes', 'programmes'],
  ['events', 'events'],
  ['files', 'media'],
  ['admin_users', 'admin users'],
] as const;

/** Uploads folder in the strapi container (mounted volume) */
const CONTAINER_UPLOADS_DIR = '/app/public/uploads';

type DatabaseInfo = {
  /** documents per table (drafts and published versions counted once) */
  counts: Record<string, number>;
  /** hash of the content types schema strapi stored on its last start */
  schemaHash: string | null;
};

/** Counted the same way locally (node:sqlite) and on the server (better-sqlite3) */
const COUNT_SQL = (table: string) => `SELECT COUNT(DISTINCT document_id) AS n FROM ${table}`;
const SCHEMA_SQL = 'SELECT schema FROM strapi_database_schema ORDER BY id DESC LIMIT 1';

const getLocalInfo = (databasePath: string): DatabaseInfo => {
  const db = new DatabaseSync(databasePath, { readOnly: true });
  try {
    const counts = Object.fromEntries(
      COUNTED_TABLES.map(([table]) => [
        table,
        Number((db.prepare(COUNT_SQL(table)).get() as { n: number }).n),
      ])
    );
    const schema = (db.prepare(SCHEMA_SQL).get() as { schema?: string } | undefined)?.schema;
    return {
      counts,
      schemaHash: schema ? createHash('sha1').update(schema).digest('hex') : null,
    };
  } finally {
    db.close();
  }
};

/** /uploads/... urls of the local media library (originals and formats) */
const getLocalUploadNames = (databasePath: string): string[] => {
  const db = new DatabaseSync(databasePath, { readOnly: true });
  try {
    const rows = db.prepare('SELECT url, formats FROM files').all() as {
      url: string | null;
      formats: string | null;
    }[];
    const urls = rows.flatMap(({ url, formats }) => [
      url ?? '',
      ...[...(formats ?? '').matchAll(/"url":"([^"]+)"/g)].map((match) => match[1] ?? ''),
    ]);
    return [
      ...new Set(
        urls.filter((url) => url.startsWith('/uploads/')).map((url) => url.slice('/uploads/'.length))
      ),
    ];
  } finally {
    db.close();
  }
};

/** Runs a node script in the strapi container (bun provides node), returns stdout */
const runInContainer = async ({ host, sshArgs }: RemoteSsh, script: string): Promise<string> => {
  // Written to a file: bun cannot run `node -` from stdin (see lib/snapshot.mts)
  const run = `f=/tmp/strapi-push-$$.cjs && cat > "$f" && node "$f"; rc=$?; rm -f "$f"; exit $rc`;
  const { stdout } = await execa(
    'ssh',
    [...sshArgs, host, `docker exec -i ${STRAPI_CONTAINER} sh -c '${run}'`],
    { input: script }
  );
  return stdout.trim();
};

const getServerInfo = async (remote: RemoteSsh, snapshot: Snapshot): Promise<DatabaseInfo> => {
  const output = await runInContainer(
    remote,
    `
const crypto = require('node:crypto');
const Database = require('better-sqlite3');
const db = new Database(${JSON.stringify(snapshot.containerPath)}, { readonly: true });
const counts = {};
for (const table of ${JSON.stringify(COUNTED_TABLES.map(([table]) => table))}) {
  counts[table] = db.prepare(${JSON.stringify(COUNT_SQL('__TABLE__'))}.replace('__TABLE__', table)).get().n;
}
const row = db.prepare(${JSON.stringify(SCHEMA_SQL)}).get();
const schemaHash = row && row.schema ? crypto.createHash('sha1').update(row.schema).digest('hex') : null;
console.log(JSON.stringify({ counts, schemaHash }));
`
  );
  return JSON.parse(output.split('\n').at(-1) ?? '{}') as DatabaseInfo;
};

const getServerUploadNames = async ({ host, sshArgs }: RemoteSsh): Promise<Set<string>> => {
  const { stdout } = await execa('ssh', [
    ...sshArgs,
    host,
    `docker exec ${STRAPI_CONTAINER} ls -1 ${CONTAINER_UPLOADS_DIR}`,
  ]);
  return new Set(stdout.split('\n').map((line) => line.trim()).filter(Boolean));
};

/** Only an exact "yes" confirms */
const askYes = async (question: string): Promise<boolean> => {
  if (!process.stdin.isTTY) {
    throw new Error('Not an interactive terminal: pushing to production must be confirmed by typing "yes"');
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return (await rl.question(question)).trim() === 'yes';
  } finally {
    rl.close();
  }
};

const formatComparison = (server: DatabaseInfo, local: DatabaseInfo): string[] => {
  const rows = COUNTED_TABLES.map(([table, label]) => {
    const before = server.counts[table] ?? 0;
    const after = local.counts[table] ?? 0;
    const diff = after - before;
    const change = diff === 0 ? '' : `  (${diff > 0 ? '+' : ''}${diff})`;
    return `    ${label.padEnd(12)} ${String(before).padStart(6)}  →  ${String(after).padStart(5)}${change}`;
  });
  return [`    ${''.padEnd(12)} ${'server'.padStart(6)}     ${'local'.padStart(5)}`, ...rows];
};

const main = async () => {
  process.chdir(fileURLToPath(new URL('..', import.meta.url)));

  loadEnv();
  const remote = getRemoteSsh();
  const ssh = async (command: string) =>
    (await execa('ssh', [...remote.sshArgs, remote.host, command])).stdout.trim();

  // The host folder mounted as the container sqlite folder, for messages only
  const hostSqliteDir = process.env.BACKUP_REMOTE_SQLITE_DIR?.trim().replace(/\/+$/, '') || null;
  const localDatabase = getLocalDatabasePath();
  if (!existsSync(localDatabase)) {
    throw new Error(`The local database ${localDatabase} does not exist`);
  }

  const timestamp = getTimestamp();
  const localCopy = join(dirname(localDatabase), `.push-${timestamp}.db`);
  let snapshot: Snapshot | null = null;
  let keepSnapshot = false;
  try {
    console.log('› Copying the local database');
    const source = new DatabaseSync(localDatabase, { readOnly: true });
    try {
      await backup(source, localCopy);
    } finally {
      source.close();
    }
    const check = new DatabaseSync(localCopy, { readOnly: true });
    const integrity = (check.prepare('PRAGMA integrity_check').get() as Record<string, string>)
      .integrity_check;
    check.close();
    if (integrity !== 'ok') {
      throw new Error(`The local database is corrupted (integrity_check: ${integrity})`);
    }
    const local = getLocalInfo(localCopy);

    console.log(`› Backing up the server database (${remote.host})`);
    snapshot = await createSnapshot(
      remote,
      hostSqliteDir ?? '',
      timestamp,
      'Strapi is not running on the server: start it (pnpm run deploy) before pushing'
    );
    const server = await getServerInfo(remote, snapshot);

    const serverUploads = await getServerUploadNames(remote);
    const missingUploads = getLocalUploadNames(localCopy).filter((name) => !serverUploads.has(name));

    const containerDir = posix.dirname(snapshot.containerPath);
    const containerDatabase = posix.join(containerDir, snapshot.databaseName);
    const backupName = `${basename(snapshot.databaseName, '.db')}-before-push-${timestamp}.db`;
    const backupPath = posix.join(containerDir, 'backups', backupName);
    const backupLocation = hostSqliteDir
      ? `${hostSqliteDir}/backups/${backupName} on the host (${backupPath} in the container)`
      : `${backupPath} (in the container, the sqlite folder on the host)`;
    const restoreInstructions = [
      `  Backup of the previous production database: ${backupLocation}`,
      '  To restore it, on the server:',
      `    docker stop ${STRAPI_CONTAINER}`,
      `    docker run --rm --volumes-from ${STRAPI_CONTAINER} --entrypoint sh "$(docker inspect --format '{{.Image}}' ${STRAPI_CONTAINER})" -c 'cp "${backupPath}" "${containerDatabase}" && rm -f "${containerDatabase}-wal" "${containerDatabase}-shm"'`,
      `    docker start ${STRAPI_CONTAINER}`,
    ];
    const schemaDiffers =
      local.schemaHash !== null && server.schemaHash !== null && local.schemaHash !== server.schemaHash;

    console.log(
      [
        '',
        '⚠  You are about to OVERWRITE THE PRODUCTION DATABASE with your local one.',
        '',
        `    Server     ${remote.host}, container ${STRAPI_CONTAINER}`,
        `    Database   ${containerDatabase}`,
        `    Replaced   by ${localDatabase}`,
        '',
        ...formatComparison(server, local),
        '',
        'What it means:',
        '  - Only the database (the content) is pushed: the server keeps its code and',
        '    docker image (`pnpm run deploy` deploys them) and its uploaded files.',
        '  - Everything in the production database is replaced by your local data:',
        '    pages, programmes, events, contact, media library entries, but also the',
        '    admin users and passwords, API tokens and permissions.',
        '  - Anything edited in the production admin since your last `pnpm pull:prod`',
        '    is lost (it stays in the backup below).',
        '  - Strapi is stopped during the copy: the site cannot load its content',
        '    for about a minute.',
        '  - A backup of the current production database is kept on the server:',
        `    ${backupLocation}`,
        ...(schemaDiffers
          ? [
              '',
              '⚠  The content types differ between your local strapi and the server.',
              '   The server runs the deployed code: on start, strapi adapts the database',
              '   to it and data of fields it does not know is lost.',
              '   Deploy first (pnpm run deploy) if you changed content types locally.',
            ]
          : []),
        ...(missingUploads.length > 0
          ? [
              '',
              `⚠  ${missingUploads.length} media file(s) of the local database are missing on the server`,
              '   (uploads are not copied, their images will be broken), ie:',
              ...missingUploads.slice(0, 5).map((name) => `     - ${name}`),
              ...(missingUploads.length > 5 ? [`     … and ${missingUploads.length - 5} more`] : []),
            ]
          : []),
        '',
      ].join('\n')
    );
    if (!(await askYes('Type "yes" to overwrite the production database, anything else aborts: '))) {
      console.log('Aborted, nothing changed on the server.');
      return;
    }

    console.log('› Keeping the backup on the server');
    await ssh(
      `docker exec ${STRAPI_CONTAINER} sh -c 'mkdir -p "${posix.dirname(backupPath)}" && mv "${snapshot.containerPath}" "${backupPath}"'`
    );
    keepSnapshot = true;

    try {
      console.log(`› Stopping ${STRAPI_CONTAINER}`);
      await ssh(`docker stop ${STRAPI_CONTAINER}`);
      try {
      console.log('› Replacing the server database');
      // A container sharing the strapi volumes (same paths), from the same
      // image: the uploaded copy keeps the owner and mode of the database it
      // replaces, stale sqlite companion files are removed
      const replace = [
        'set -e',
        `db="${containerDatabase}"`,
        `tmp="${containerDir}/.push-${timestamp}.db"`,
        'cat > "$tmp"',
        'chown --reference="$db" "$tmp"',
        'chmod --reference="$db" "$tmp"',
        'rm -f "$db-wal" "$db-shm" "$db-journal"',
        'mv "$tmp" "$db"',
      ].join('; ');
      await execa(
        'ssh',
        [
          ...remote.sshArgs,
          remote.host,
          `docker run --rm -i --volumes-from ${STRAPI_CONTAINER} --entrypoint sh "$(docker inspect --format '{{.Image}}' ${STRAPI_CONTAINER})" -c '${replace}'`,
        ],
        { inputFile: localCopy }
      );
      } finally {
        console.log(`› Starting ${STRAPI_CONTAINER}`);
        await ssh(`docker start ${STRAPI_CONTAINER}`);
      }
      console.log(`› Waiting for ${STRAPI_CONTAINER} to be healthy`);
      await waitForHealthy(ssh, STRAPI_CONTAINER);
    } catch (error) {
      console.error(['', '✖ The push failed.', ...restoreInstructions, ''].join('\n'));
      throw error;
    }

    console.log(
      ['', '✔ The production database is now your local one.', ...restoreInstructions].join('\n')
    );
  } finally {
    await rm(localCopy, { force: true });
    if (snapshot && !keepSnapshot) {
      await removeSnapshot(remote, snapshot).catch(() => {});
    }
  }
};

await main().catch(exitWithError);
