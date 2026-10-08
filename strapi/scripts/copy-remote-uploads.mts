/**
 * Copy the server uploads into the local public/uploads with rsync, so the
 * local strapi serves the same media as the server database.
 *
 * Only adds or updates files: local files missing on the server are kept.
 *
 * Configuration: REMOTE_SSH and REMOTE_UPLOADS_DIR in .env.deploy, see .env.deploy.example.
 *
 * Usage: yarn copy-remote-uploads
 */

import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import { loadEnv, requireEnv } from './lib/env.mts';
import { exitWithError } from './lib/errors.mts';
import { getRemoteSsh } from './lib/remote.mts';

const LOCAL_UPLOADS_DIR = 'public/uploads';

const main = async () => {
  process.chdir(fileURLToPath(new URL('..', import.meta.url)));

  loadEnv();
  const remote = getRemoteSsh();
  const remoteDir = requireEnv('REMOTE_UPLOADS_DIR', 'absolute path on the server').replace(
    /\/+$/,
    ''
  );

  // Trailing slash on the source: copies the folder content into public/uploads
  await execa({ stdio: 'inherit' })('rsync', [
    '-avz',
    '--progress',
    ...remote.rsyncArgs,
    `${remote.host}:${remoteDir}/`,
    `${LOCAL_UPLOADS_DIR}/`,
  ]);

  console.log(`✔ Copied the server uploads to ${LOCAL_UPLOADS_DIR}`);
};

await main().catch(exitWithError);
