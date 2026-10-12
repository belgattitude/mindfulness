import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import dotenvx from '@dotenvx/dotenvx';

/**
 * The local sqlite database: DATABASE_FILENAME from the environment or the
 * local .env (as config/database.js), resolved from the strapi folder.
 */
export const getLocalDatabasePath = (): string => {
  const fromEnvFile = existsSync('.env')
    ? dotenvx.parse(readFileSync('.env'), { processEnv: {} }).DATABASE_FILENAME
    : undefined;
  const filename = process.env.DATABASE_FILENAME?.trim() || fromEnvFile?.trim();
  if (!filename) {
    throw new Error('Missing DATABASE_FILENAME in .env, see .env.example');
  }
  return resolve(filename);
};
