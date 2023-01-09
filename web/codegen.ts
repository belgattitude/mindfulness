import type { CodegenConfig } from '@graphql-codegen/cli';

let schemaUrl = process.env?.NEXT_PUBLIC_STRAPI_API_URL ?? '';

if (schemaUrl.trim().length === 0) {
  schemaUrl = 'http://localhost:1337/graphql';
}
const config: CodegenConfig = {
  overwrite: true,
  schema: schemaUrl,
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
