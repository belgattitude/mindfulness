import type { CodegenConfig } from '@graphql-codegen/cli';

const env = process.env ?? {};

const schemaUrl = env.GRAPHQL_INTROSPECTION_URL || './schema.graphql';

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaUrl,
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**/*'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    './src/gql/': {
      preset: 'client',
      plugins: [],
      // https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#config-api
      presetConfig: {
        // fragmentMasking: false,
        // useTypeImports: true,
        // enumsAsTypes: true,
      },
    },
    /*
    './src/gql/hooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
    },
     */
  },
};

export default config;
