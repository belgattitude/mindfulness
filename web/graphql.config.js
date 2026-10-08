// @ts-check

/** @type {import('graphql-config').IGraphQLConfig} */
export default {
  schema: "schema.graphql",
  documents: ["src/**/*.{ts,tsx}"],
  extensions: {
    endpoints: {
      "Local GraphQL Endpoint": {
        headers: {
          "user-agent": "JS GraphQL",
        },
        introspect: true,
        url: "http://localhost:1337/graphql",
      },
    },
  },
};
