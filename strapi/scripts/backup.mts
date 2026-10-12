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
 * Usage: pnpm backup:db [--no-snapshot] | pnpm backup:env
 */

import { chmod, mkdir, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import { loadEnv, requireEnv } from './lib/env.mts';
import { exitWithError } from './lib/errors.mts';
import { getRemoteSsh } from './lib/remote.mts';
import { createSnapshot, getTimestamp, removeSnapshot, STRAPI_CONTAINER } from './lib/snapshot.mts';

const BACKUP_DIR = 'backup';

/** file: backup a single file of the remote dir instead of the whole dir */
const targets = {
  db: { type: 'database', remoteDirEnv: 'BACKUP_REMOTE_SQLITE_DIR', file: null },
  env: { type: 'env', remoteDirEnv: 'DEPLOY_DIR', file: '.env' },
} as const;

type Target = keyof typeof targets;

const isTarget = (value: unknown): value is Target =>
  typeof value === 'string' && Object.hasOwn(targets, value);

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
      const snapshot = await createSnapshot(
        remote,
        remoteDir,
        timestamp,
        'Strapi is not running, copy the file directly with: pnpm backup:db --no-snapshot'
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
