import { execa, ExecaError } from 'execa';
import type { RemoteSsh } from './remote.mts';

/** docker compose container_name of strapi on the server */
export const STRAPI_CONTAINER = 'mindfulness-strapi';

/** Local time, sortable and filesystem safe: 2026-10-08_14-05-09 */
export const getTimestamp = (date = new Date()): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`,
  ].join('_');
};

export type Snapshot = {
  /** snapshot path on the server, in the database folder (mounted volume) */
  remotePath: string;
  /** snapshot path in the container */
  containerPath: string;
  /** database file name, used for the local copy */
  databaseName: string;
};

/**
 * Runs in the strapi container (node, better-sqlite3). The snapshot is written
 * next to the database, in the mounted folder, so it can be fetched by rsync.
 */
const getSnapshotScript = (snapshotName: string) => `
const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');
const dbPath = path.resolve('/app', process.env.DATABASE_FILENAME);
const snapshotPath = path.join(path.dirname(dbPath), ${JSON.stringify(snapshotName)});
const db = new Database(dbPath, { readonly: true, fileMustExist: true });
db.backup(snapshotPath)
  .then(() => {
    const result = new Database(snapshotPath, { readonly: true }).pragma('integrity_check', { simple: true });
    if (result !== 'ok') throw new Error('integrity_check: ' + result);
    console.log(JSON.stringify({ databaseName: path.basename(dbPath), containerPath: snapshotPath }));
  })
  .catch((e) => {
    fs.rmSync(snapshotPath, { force: true });
    console.error(e.message);
    process.exit(1);
  });
`;

/**
 * Makes a consistent copy of the server database inside the running strapi
 * container, with the sqlite online backup API (better-sqlite3 .backup(), same
 * as the sqlite3 `.backup` command). Remove it with removeSnapshot().
 *
 * @param remoteDir server directory holding the database (mounted in the container)
 * @param notRunningHint appended to the error when the container is not running
 */
export const createSnapshot = async (
  { host, sshArgs }: RemoteSsh,
  remoteDir: string,
  timestamp: string,
  notRunningHint: string
): Promise<Snapshot> => {
  const snapshotName = `.snapshot-${timestamp}.db`;
  // The script is sent on stdin to avoid nested shell quoting, and written to a
  // file in the container: bun (the image runtime) cannot run `node -` from stdin
  // (.cjs: the script uses require)
  const runScript = `f=/tmp/strapi-snapshot-$$.cjs && cat > "$f" && node "$f"; rc=$?; rm -f "$f"; exit $rc`;
  const { stdout } = await execa(
    'ssh',
    [...sshArgs, host, `docker exec -i ${STRAPI_CONTAINER} sh -c '${runScript}'`],
    { input: getSnapshotScript(snapshotName) }
  ).catch((error: unknown) => {
    const stderr = error instanceof ExecaError ? String(error.stderr ?? '').trim() : '';
    if (/is not running|No such container/.test(stderr)) {
      throw new Error(`${stderr}\n${notRunningHint}`);
    }
    throw error;
  });
  const { databaseName, containerPath } = JSON.parse(stdout.trim().split('\n').at(-1) ?? '{}') as {
    databaseName?: string;
    containerPath?: string;
  };
  if (!databaseName || !containerPath) {
    throw new Error(`Unexpected snapshot output: ${stdout}`);
  }
  return { remotePath: `${remoteDir}/${snapshotName}`, containerPath, databaseName };
};

export const removeSnapshot = async ({ host, sshArgs }: RemoteSsh, snapshot: Snapshot) => {
  // Created by the container (root), so removed from the container too
  await execa('ssh', [
    ...sshArgs,
    host,
    `docker exec ${STRAPI_CONTAINER} rm -f '${snapshot.containerPath}'`,
  ]);
};
