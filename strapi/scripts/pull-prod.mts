/**
 * Replace the local sqlite database and public/uploads with the server ones,
 * to start locally from the production content. Nothing is backed up: the
 * local database and uploads are overwritten (use `pnpm backup:db` first to
 * keep a copy of the server database).
 *
 * - Database: consistent snapshot made in the running strapi container (see
 *   lib/snapshot.mts), downloaded next to the local database, then renamed
 *   over it. Stale -wal, -shm and -journal files are removed.
 * - Uploads: rsync --delete, local files missing on the server are removed.
 *
 * Refuses to run when the local database is open by a process (ie: a running
 * `pnpm develop`) or locked, replacing it under a running strapi would corrupt it.
 *
 * Configuration: REMOTE_SSH, BACKUP_REMOTE_SQLITE_DIR and REMOTE_UPLOADS_DIR in
 * .env.deploy (see .env.deploy.example), DATABASE_FILENAME in .env.
 *
 * Usage: pnpm pull:prod [--yes]
 */

import { existsSync, readFileSync } from 'node:fs';
import { rename, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import dotenvx from '@dotenvx/dotenvx';
import { execa } from 'execa';
import { loadEnv, requireEnv } from './lib/env.mts';
import { exitWithError } from './lib/errors.mts';
import { getRemoteSsh } from './lib/remote.mts';
import { createSnapshot, getTimestamp, removeSnapshot } from './lib/snapshot.mts';

const LOCAL_UPLOADS_DIR = 'public/uploads';
/** sqlite companion files, stale ones would be applied to the new database */
const SQLITE_SUFFIXES = ['-wal', '-shm', '-journal'];

/** DATABASE_FILENAME from the environment or the local .env (as config/database.js) */
const getLocalDatabasePath = (): string => {
  const fromEnvFile = existsSync('.env')
    ? dotenvx.parse(readFileSync('.env'), { processEnv: {} }).DATABASE_FILENAME
    : undefined;
  const filename = process.env.DATABASE_FILENAME?.trim() || fromEnvFile?.trim();
  if (!filename) {
    throw new Error('Missing DATABASE_FILENAME in .env, see .env.example');
  }
  return resolve(filename);
};

type LocalProcess = { pid: string; command: string };

/**
 * Processes having one of the files open (lsof), null when lsof is not
 * available. Strapi keeps the database open while running.
 */
const findProcessesUsing = async (files: string[]): Promise<LocalProcess[] | null> => {
  const existing = files.filter((file) => existsSync(file));
  if (existing.length === 0) {
    return [];
  }
  // -F pc: one field per line, p<pid> then c<command>. Exits 1 when no process matches
  const result = await execa('lsof', ['-F', 'pc', '--', ...existing], { reject: false });
  if (result.failed && result.exitCode === undefined) {
    return null; // lsof not installed
  }
  const processes = new Map<string, LocalProcess>();
  let current: LocalProcess | null = null;
  for (const line of result.stdout.split('\n')) {
    if (line.startsWith('p')) {
      current = { pid: line.slice(1), command: '' };
      processes.set(current.pid, current);
    } else if (line.startsWith('c') && current) {
      current.command = line.slice(1);
    }
  }
  return [...processes.values()];
};

const getCommandLine = async (pid: string): Promise<string | null> => {
  const { stdout, failed } = await execa('ps', ['-o', 'command=', '-p', pid], { reject: false });
  return failed ? null : stdout.trim() || null;
};

/** Message of the sqlite error when an exclusive lock cannot be taken, null when free */
const getSqliteLockError = (databasePath: string): string | null => {
  let db: DatabaseSync | null = null;
  try {
    // timeout 0: fail immediately with SQLITE_BUSY instead of waiting for the lock
    db = new DatabaseSync(databasePath, { timeout: 0 });
    db.exec('BEGIN EXCLUSIVE');
    db.exec('ROLLBACK');
    return null;
  } catch (error) {
    return (error as Error).message;
  } finally {
    db?.close();
  }
};

/** Throws when the local database is open by a process or locked */
const assertDatabaseNotInUse = async (databasePath: string) => {
  const files = [databasePath, ...SQLITE_SUFFIXES.map((suffix) => databasePath + suffix)];
  const processes = await findProcessesUsing(files);
  if (processes === null) {
    console.warn('⚠ lsof not found, only checking the sqlite lock');
  } else if (processes.length > 0) {
    const lines = await Promise.all(
      processes.map(
        async ({ pid, command }) => `  - pid ${pid}: ${(await getCommandLine(pid)) ?? command}`
      )
    );
    throw new Error(
      [
        `The local database ${databasePath} is open by:`,
        ...lines,
        'Stop it (ie: the running `pnpm develop`) and try again.',
      ].join('\n')
    );
  }
  if (existsSync(databasePath)) {
    const lockError = getSqliteLockError(databasePath);
    if (lockError) {
      throw new Error(
        `The local database ${databasePath} is locked (${lockError}).\nStop the process using it and try again.`
      );
    }
  }
};

const confirm = async (message: string): Promise<boolean> => {
  if (!process.stdin.isTTY) {
    throw new Error('Not an interactive terminal, confirm with --yes');
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return /^y(es)?$/i.test((await rl.question(`${message} [y/N] `)).trim());
  } finally {
    rl.close();
  }
};

const main = async () => {
  process.chdir(fileURLToPath(new URL('..', import.meta.url)));
  const args = process.argv.slice(2);

  loadEnv();
  const remote = getRemoteSsh();
  const trimSlash = (dir: string) => dir.replace(/\/+$/, '');
  const remoteSqliteDir = trimSlash(
    requireEnv('BACKUP_REMOTE_SQLITE_DIR', 'absolute path on the server')
  );
  const remoteUploadsDir = trimSlash(requireEnv('REMOTE_UPLOADS_DIR', 'absolute path on the server'));
  const localDatabase = getLocalDatabasePath();

  // Fail before downloading anything
  await assertDatabaseNotInUse(localDatabase);

  if (!args.includes('--yes')) {
    console.log(
      [
        `This replaces, without backup, with the content of ${remote.host}:`,
        `  - the local database ${localDatabase}`,
        `  - the local ${LOCAL_UPLOADS_DIR} (local only files are deleted)`,
      ].join('\n')
    );
    if (!(await confirm('Continue?'))) {
      console.log('Aborted');
      return;
    }
  }

  // Downloaded in the database folder, so the final rename is atomic
  const timestamp = getTimestamp();
  const download = join(dirname(localDatabase), `.pull-${timestamp}.db`);
  try {
    console.log('› Creating a snapshot of the server database');
    const snapshot = await createSnapshot(
      remote,
      remoteSqliteDir,
      timestamp,
      'Strapi is not running on the server, start it to pull the database'
    );
    try {
      await execa({ stdio: 'inherit' })('rsync', [
        '-avz',
        '--progress',
        ...remote.rsyncArgs,
        `${remote.host}:${snapshot.remotePath}`,
        download,
      ]);
    } finally {
      await removeSnapshot(remote, snapshot);
    }

    // Strapi may have been started during the download
    await assertDatabaseNotInUse(localDatabase);
    await Promise.all(SQLITE_SUFFIXES.map((suffix) => rm(localDatabase + suffix, { force: true })));
    await rename(download, localDatabase);
  } finally {
    await rm(download, { force: true });
  }
  console.log(`✔ Replaced the local database ${localDatabase}`);

  // Trailing slash on the source: syncs the folder content into public/uploads.
  // Excluded files are not deleted by --delete
  await execa({ stdio: 'inherit' })('rsync', [
    '-avz',
    '--delete',
    '--exclude=.gitkeep',
    '--progress',
    ...remote.rsyncArgs,
    `${remote.host}:${remoteUploadsDir}/`,
    `${LOCAL_UPLOADS_DIR}/`,
  ]);
  console.log(`✔ Replaced the local ${LOCAL_UPLOADS_DIR}`);
};

await main().catch(exitWithError);
