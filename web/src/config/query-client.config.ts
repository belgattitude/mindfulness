import type { QueryClientConfig } from '@tanstack/query-core';

const isServer = typeof window === 'undefined';
const isProd = process.env.NODE_ENV === 'production';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: isServer ? false : 2,
      retryDelay: isProd ? 1_000 : 250,
    },
  },
};
