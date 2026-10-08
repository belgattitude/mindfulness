/**
 * Build the strapi image and deploy it to a server over SSH, without a registry.
 *
 * Uses docker pussh (https://github.com/psviderski/unregistry), which only
 * uploads the layers missing on the server. docker-compose.yml is uploaded to
 * DEPLOY_DIR, the server .env (strapi secrets) is never deployed.
 *
 * Configuration: copy .env.deploy.example to .env.deploy and fill it in. It is
 * loaded with dotenvx, so values can be encrypted (`yarn dotenvx encrypt -f .env.deploy`),
 * the private key being read from the OS keychain or DOTENV_PRIVATE_KEY_DEPLOY.
 *
 * Usage: yarn deploy
 */

import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import { execa } from 'execa';
import { loadEnv, requireEnv } from './lib/env.mts';
import { exitWithError } from './lib/errors.mts';
import { getRemoteSsh, type RemoteSsh } from './lib/remote.mts';

const IMAGE = 'mindfulness-strapi';
const SERVICE = 'mindfulness-strapi';
const HEALTH_TIMEOUT_MS = 5 * 60_000;
const HEALTH_POLL_MS = 5_000;

type Config = {
  remote: RemoteSsh;
  dir: string;
};

const log = (message: string) => console.log(`› ${message}`);

const run = execa({ stdio: 'inherit' });

const loadConfig = (): Config => {
  loadEnv();
  return {
    remote: getRemoteSsh(),
    dir: requireEnv('DEPLOY_DIR', 'directory holding docker-compose.yml on the server'),
  };
};

const createSsh = ({ host, port, keyArgs, sshArgs }: RemoteSsh) => {
  return {
    keyArgs,
    // ssh takes the port as -p, docker pussh as user@host:port
    pusshDest: port ? `${host}:${port}` : host,
    /** Runs a command on the server and returns its output */
    remote: async (command: string): Promise<string> => {
      const { stdout } = await execa('ssh', [...sshArgs, host, command]);
      return stdout;
    },
    /** Runs a command on the server, streaming its output */
    remoteInherit: async (command: string): Promise<void> => {
      await run('ssh', [...sshArgs, host, command]);
    },
  };
};

const ensurePussh = async () => {
  const { failed } = await execa('docker', ['pussh', '--help'], { reject: false });
  if (failed) {
    throw new Error(
      [
        'docker pussh is not installed: brew install psviderski/tap/docker-pussh',
        'then: ln -sf $(brew --prefix)/bin/docker-pussh ~/.docker/cli-plugins/docker-pussh',
      ].join('\n')
    );
  }
};

/**
 * Git commit, suffixed with -dirty for uncommitted changes, so a previous
 * version can be restored on the server with `docker tag`.
 */
const getVersion = async (): Promise<string> => {
  const { stdout: sha } = await execa('git', ['rev-parse', '--short', 'HEAD']);
  const { stdout: changes } = await execa('git', ['status', '--porcelain', '--', '.']);
  return changes.trim() === '' ? sha : `${sha}-dirty`;
};

const getPlatform = async (remote: (command: string) => Promise<string>): Promise<string> => {
  const arch = (await remote('uname -m')).trim();
  switch (arch) {
    case 'x86_64':
      return 'linux/amd64';
    case 'aarch64':
    case 'arm64':
      return 'linux/arm64';
    default:
      throw new Error(`Unsupported server architecture: ${arch}`);
  }
};

const waitForHealthy = async (remote: (command: string) => Promise<string>): Promise<void> => {
  const deadline = Date.now() + HEALTH_TIMEOUT_MS;
  let status = 'unknown';
  while (Date.now() < deadline) {
    status = await remote(`docker inspect --format '{{.State.Health.Status}}' ${SERVICE}`).catch(
      () => 'unknown'
    );
    if (status === 'healthy') {
      return;
    }
    if (status === 'unhealthy') {
      break;
    }
    await sleep(HEALTH_POLL_MS);
  }
  const logs = await remote(`docker logs --tail 50 ${SERVICE} 2>&1`).catch(() => '');
  throw new Error(`${SERVICE} is not healthy (status: ${status}), last logs:\n${logs}`);
};

const main = async () => {
  process.chdir(fileURLToPath(new URL('..', import.meta.url)));

  const config = loadConfig();
  const { keyArgs, pusshDest, remote, remoteInherit } = createSsh(config.remote);

  await ensurePussh();
  const version = await getVersion();

  log('Detecting server architecture');
  const platform = await getPlatform(remote);

  // Fail before the build: compose needs the server .env (strapi secrets),
  // which is not deployed, see `yarn backup:env` to keep a copy
  log(`Checking ${config.dir} on the server`);
  await remote(`test -f '${config.dir}/.env'`).catch(() => {
    throw new Error(
      `Missing ${config.dir}/.env on the server: create it from .env.example with the production secrets`
    );
  });

  log(`Building ${IMAGE}:${version} for ${platform}`);
  await run('docker', [
    'buildx',
    'build',
    ...['--platform', platform],
    ...['--tag', `${IMAGE}:${version}`],
    ...['--tag', `${IMAGE}:latest`],
    '--load',
    '.',
  ]);

  log(`Uploading to ${pusshDest}`);
  await run('docker', ['pussh', ...keyArgs, `${IMAGE}:${version}`, pusshDest]);
  await remote(`docker tag ${IMAGE}:${version} ${IMAGE}:latest`);

  // Done after the image upload, so a failed build never leaves a newer
  // docker-compose.yml with the previous image
  log(`Uploading docker-compose.yml to ${config.dir}`);
  await run('rsync', [
    '-avz',
    ...config.remote.rsyncArgs,
    'docker-compose.yml',
    `${config.remote.host}:${config.dir}/docker-compose.yml`,
  ]);

  log(`Restarting ${SERVICE}`);
  await remoteInherit(`cd '${config.dir}' && docker compose up -d --no-build ${SERVICE}`);

  log(`Waiting for ${SERVICE} to be healthy`);
  await waitForHealthy(remote);

  console.log(`✔ Deployed ${IMAGE}:${version}`);
};

await main().catch(exitWithError);
