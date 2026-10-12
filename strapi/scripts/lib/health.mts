import { setTimeout as sleep } from 'node:timers/promises';

const HEALTH_TIMEOUT_MS = 5 * 60_000;
const HEALTH_POLL_MS = 5_000;

/**
 * Waits for the docker healthcheck of a container on the server to report
 * healthy, throws with its last logs when unhealthy or after 5 minutes.
 *
 * @param remote runs a command on the server and returns its stdout
 */
export const waitForHealthy = async (
  remote: (command: string) => Promise<string>,
  container: string
): Promise<void> => {
  const deadline = Date.now() + HEALTH_TIMEOUT_MS;
  let status = 'unknown';
  while (Date.now() < deadline) {
    status = await remote(`docker inspect --format '{{.State.Health.Status}}' ${container}`).catch(
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
  const logs = await remote(`docker logs --tail 50 ${container} 2>&1`).catch(() => '');
  throw new Error(`${container} is not healthy (status: ${status}), last logs:\n${logs}`);
};
