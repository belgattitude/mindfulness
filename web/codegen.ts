import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:1337/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**/*'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    './src/gql/': {
      preset: 'client',
      // documents: 'src/**/*.graphql',
      // plugins: ['typescript', 'typescript-operations'],
      plugins: [],
    },
  },
};

export default config;
