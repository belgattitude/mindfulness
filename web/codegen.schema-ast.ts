// Generates ./schema.graphql
import type { CodegenConfig } from '@graphql-codegen/cli';

const schemaUrl = process.env?.GRAPHQL_INTROSPECTION_URL ?? '';

if (schemaUrl.trim() === '') {
  throw new Error(`Missing 'GRAPHQL_INTROSPECTION_URL' env.`);
}

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaUrl,
  documents: [],
  generates: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    './schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
