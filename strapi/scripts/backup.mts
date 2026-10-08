/**
 * Backup the server sqlite database or .env with rsync, into a timestamped
 * folder: backup/{database,env}/<YYYY-MM-DD_HH-mm-ss>/
 *
 * Database backups first make a consistent copy inside the running strapi
 * container with the sqlite online backup API (better-sqlite3 .backup(), same
 * as the sqlite3 `.backup` command), then download it and remove it from the
 * server. With --no-snapshot, the sqlite folder is copied as is instead, which
 * can be inconsistent if strapi writes during the copy (fine when it is stopped).
 *
 * The .env backup copies DEPLOY_DIR/.env (strapi secrets), readable only by
 * the current user.
 *
 * Configuration: REMOTE_SSH, DEPLOY_DIR and BACKUP_* variables in .env.deploy,
 * see .env.deploy.example.
 *
 * Usage: yarn backup:db [--no-snapshot] | yarn backup:env
 */

import { chmod, mkdir, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa, ExecaError } from 'execa';
import { loadEnv, requireEnv } from './lib/env.mts';
import { exitWithError } from './lib/errors.mts';
import { getRemoteSsh, type RemoteSsh } from './lib/remote.mts';

const BACKUP_DIR = 'backup';
/** docker compose container_name of strapi on the server */
const STRAPI_CONTAINER = 'mindfulness-strapi';

/** file: backup a single file of the remote dir instead of the whole dir */
const targets = {
  db: { type: 'database', remoteDirEnv: 'BACKUP_REMOTE_SQLITE_DIR', file: null },
  env: { type: 'env', remoteDirEnv: 'DEPLOY_DIR', file: '.env' },
} as const;

type Target = keyof typeof targets;

const isTarget = (value: unknown): value is Target =>
  typeof value === 'string' && Object.hasOwn(targets, value);

/** Local time, sortable and filesystem safe: 2026-10-08_14-05-09 */
const getTimestamp = (date = new Date()): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`,
  ].join('_');
};

type Snapshot = {
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

const createSnapshot = async (
  { host, sshArgs }: RemoteSsh,
  remoteDir: string,
  timestamp: string
): Promise<Snapshot> => {
  const snapshotName = `.snapshot-${timestamp}.db`;
  // The script is sent on stdin to avoid nested shell quoting
  const { stdout } = await execa(
    'ssh',
    [...sshArgs, host, `docker exec -i ${STRAPI_CONTAINER} node -`],
    { input: getSnapshotScript(snapshotName) }
  );
  const { databaseName, containerPath } = JSON.parse(stdout.trim().split('\n').at(-1) ?? '{}') as {
    databaseName?: string;
    containerPath?: string;
  };
  if (!databaseName || !containerPath) {
    throw new Error(`Unexpected snapshot output: ${stdout}`);
  }
  return { remotePath: `${remoteDir}/${snapshotName}`, containerPath, databaseName };
};

const removeSnapshot = async ({ host, sshArgs }: RemoteSsh, snapshot: Snapshot) => {
  // Created by the container (root), so removed from the container too
  await execa('ssh', [
    ...sshArgs,
    host,
    `docker exec ${STRAPI_CONTAINER} rm -f '${snapshot.containerPath}'`,
  ]);
};

const main = async () => {
  process.chdir(fileURLToPath(new URL('..', import.meta.url)));

  const args = process.argv.slice(2);
  const target = args.find((arg) => !arg.startsWith('--'));
  if (!isTarget(target)) {
    throw new Error(
      `Usage: node scripts/backup.mts <${Object.keys(targets).join('|')}> [--no-snapshot]`
    );
  }
  const useSnapshot = target === 'db' && !args.includes('--no-snapshot');
  const { type, remoteDirEnv, file } = targets[target];

  loadEnv();
  const remote = getRemoteSsh();
  const remoteDir = requireEnv(remoteDirEnv, 'absolute path on the server').replace(/\/+$/, '');

  const typeDir = join(BACKUP_DIR, type);
  const timestamp = getTimestamp();
  const destination = join(typeDir, timestamp);
  await mkdir(destination, { recursive: true });

  const rsync = async (source: string, target: string) => {
    await execa({ stdio: 'inherit' })('rsync', [
      '-avz',
      '--progress',
      ...remote.rsyncArgs,
      `${remote.host}:${source}`,
      target,
    ]);
  };

  try {
    if (useSnapshot) {
      console.log(`› Creating a snapshot in the ${STRAPI_CONTAINER} container`);
      const snapshot = await createSnapshot(remote, remoteDir, timestamp).catch(
        (error: unknown) => {
          const stderr = error instanceof ExecaError ? String(error.stderr ?? '').trim() : '';
          if (/is not running|No such container/.test(stderr)) {
            throw new Error(
              `${stderr}\nStrapi is not running, copy the file directly with: yarn backup:db --no-snapshot`
            );
          }
          throw error;
        }
      );
      try {
        await rsync(snapshot.remotePath, join(destination, snapshot.databaseName));
      } finally {
        await removeSnapshot(remote, snapshot);
      }
    } else if (file) {
      const localFile = join(destination, file);
      await rsync(`${remoteDir}/${file}`, localFile);
      // Secrets: readable by the current user only
      await chmod(localFile, 0o600);
      await chmod(destination, 0o700);
    } else {
      // Trailing slash on the source: copies the folder content into the destination
      await rsync(`${remoteDir}/`, `${destination}/`);
    }
  } catch (error) {
    // Remove the timestamp folder when nothing was copied (ie: ssh failure)
    await rmdir(destination).catch(() => {});
    throw error;
  }

  console.log(`✔ Backed up ${type}${useSnapshot ? ' (snapshot)' : ''} to ${destination}`);
};

await main().catch(exitWithError);
