import { defineConfig } from 'vitest/config';

const testFiles = ['./src/**/*.test.{js,ts}', './test/**/*.test.{js,ts}'];

export default defineConfig({
  // plugins: [tsconfigPaths()],
  esbuild: {
    target: ['node14'],
  },
  test: {
    globals: true,
    environment: 'node',
    passWithNoTests: false,
    setupFiles: './test/_setup/setupVitest.ts',
    include: testFiles,
    exclude: [
      '**/node_modules/**',
      'dist/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
});
