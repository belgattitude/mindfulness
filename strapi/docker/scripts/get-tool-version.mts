/**
 * Print the version of a monorepo tool as declared in the root package.json,
 * so docker images don't need to apt-get install jq.
 *
 * Runs natively with node >= 22.18 (type stripping) or bun, no dependencies.
 *
 * @example
 * ```bash
 * bun ./get-tool-version.mts pnpm ./package.json # ie: 12.10.1
 * ```
 */
import { readFileSync } from 'node:fs';

type RootPackageJson = {
  devEngines?: { packageManager?: { name?: string; version?: string } };
};

const versionGetters = {
  pnpm: (pkg) =>
    pkg.devEngines?.packageManager?.name === 'pnpm'
      ? pkg.devEngines.packageManager.version
      : undefined,
} as const satisfies Record<string, (pkg: RootPackageJson) => string | undefined>;

type Tool = keyof typeof versionGetters;

const isTool = (value: string | undefined): value is Tool =>
  value !== undefined && Object.hasOwn(versionGetters, value);

const [tool, packageJsonPath = './package.json'] = process.argv.slice(2);

if (!isTool(tool)) {
  console.error(`Usage: get-tool-version.mts <${Object.keys(versionGetters).join('|')}> [package.json]`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as RootPackageJson;
const version = versionGetters[tool](pkg);

// Only accept exact versions, ranges would make the docker build non reproducible
if (version === undefined || !/^\d+\.\d+\.\d+(?:-[\w.]+)?$/.test(version)) {
  console.error(`Cannot find an exact ${tool} version in ${packageJsonPath}, got: ${String(version)}`);
  process.exit(1);
}

process.stdout.write(version);
