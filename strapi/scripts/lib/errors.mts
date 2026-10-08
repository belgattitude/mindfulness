import { ExecaError } from 'execa';

/** Prints a failed script error without stack trace and exits */
export const exitWithError = (error: unknown): never => {
  if (error instanceof ExecaError) {
    // stderr is only captured for non-streamed commands (ie: ssh, docker exec)
    const stderr = String(error.stderr ?? '').trim();
    console.error(`✖ ${error.shortMessage}${stderr ? `\n${stderr}` : ''}`);
  } else {
    console.error(`✖ ${(error as Error).message}`);
  }
  process.exit(1);
};
