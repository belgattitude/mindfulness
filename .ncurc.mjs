// @ts-check

import { defineConfig } from 'npm-check-updates';

export default defineConfig({
  workspaces: true,
  mergeConfig: true,
  root: true,
  deprecated: false,
  packageManager: 'pnpm',
  reject: [
  ],
});
