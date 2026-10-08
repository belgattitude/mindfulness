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
      // The live schema declares @deprecated on DIRECTIVE_DEFINITION, which graphql@16
      // can't parse here; the printed schema.graphql (yarn codegen-schema) omits built-ins
      schema: "./schema.graphql",
      config: {
        useTypeImports: true,
        reactQueryVersion: 5,
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
    },
  },
  ignoreNoDocuments: true, // for better experience with the watcher
  overwrite: true,
  schema: schemaUrl,
};

export default config;
