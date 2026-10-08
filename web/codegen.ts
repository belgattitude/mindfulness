import type { CodegenConfig } from "@graphql-codegen/cli";

const schemaUrl = process?.env?.GRAPHQL_INTROSPECTION_URL ?? "";

if (schemaUrl.trim() === "") {
  throw new Error(`Missing 'GRAPHQL_INTROSPECTION_URL' env.`);
}

const config: CodegenConfig = {
  documents: ["src/**/*.tsx", "src/**/*.ts", "!src/gql/**/*"],
  generates: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "./src/gql/": {
      preset: "client",
      plugins: [],
      // https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#config-api
      config: {
        useTypeImports: true,
        defaultScalarType: "unknown",
        scalars: {
          DateTime: "string",
          Date: "string",
        },
        // fragmentMasking: false,
        // useTypeImports: true,
        // enumsAsTypes: true,
      },
    },
    "./src/gql/hooks.ts": {
      // Generated from the printed schema (yarn codegen-schema)
      schema: "./schema.graphql",
      config: {
        useTypeImports: true,
        reactQueryVersion: 5,
      },
      // typescript-operations generates the input and enum types it needs since
      // @graphql-codegen 7, adding the "typescript" plugin would duplicate them
      plugins: ["typescript-operations", "typescript-react-query"],
    },
  },
  // for better experience with the watcher
  ignoreNoDocuments: true,
  overwrite: true,
  schema: schemaUrl,
};

export default config;
