import dotenvx from '@dotenvx/dotenvx';

/**
 * Loads .env.deploy (git ignored) with dotenvx, so values can be encrypted
 * (`yarn dotenvx encrypt -f .env.deploy`), the private key being read from the
 * OS keychain or DOTENV_PRIVATE_KEY_DEPLOY.
 * Variables already defined in the environment take precedence.
 */
export const loadEnv = (): void => {
  dotenvx.config({
    path: '.env.deploy',
    quiet: true,
    // throw on decryption errors, variables can still come from the environment
    strict: true,
    ignore: ['MISSING_ENV_FILE'],
  });
};

export const requireEnv = (name: string, hint: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name} (${hint}), see .env.deploy.example`);
  }
  return value;
};
