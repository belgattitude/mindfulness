import { homedir } from 'node:os';
import { requireEnv } from './env.mts';

export type RemoteSsh = {
  /** user@host or an ~/.ssh/config alias */
  host: string;
  port: string | null;
  key: string | null;
  /** ssh options for the key only (docker pussh takes the port in the destination) */
  keyArgs: string[];
  /** ssh options for the key and port */
  sshArgs: string[];
  /** rsync options to use the key and port (paths must not contain spaces) */
  rsyncArgs: string[];
};

/**
 * SSH access to the server, shared by deploy and backup scripts.
 * Call loadEnv() first.
 */
export const getRemoteSsh = (): RemoteSsh => {
  const host = requireEnv('REMOTE_SSH', 'ie: user@1.2.3.4 or an ~/.ssh/config alias');
  const port = process.env.REMOTE_SSH_PORT?.trim() || null;
  // dotenv files do not expand ~
  const key = process.env.REMOTE_SSH_KEY?.trim().replace(/^~(?=\/|$)/, homedir()) || null;
  const keyArgs = key ? ['-i', key] : [];
  const sshArgs = [...keyArgs, ...(port ? ['-p', port] : [])];
  return {
    host,
    port,
    key,
    keyArgs,
    sshArgs,
    rsyncArgs: sshArgs.length > 0 ? ['-e', ['ssh', ...sshArgs].join(' ')] : [],
  };
};
