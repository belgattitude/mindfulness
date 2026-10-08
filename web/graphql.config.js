// @ts-check

/** @type {import('graphql-config').IGraphQLConfig} */
module.exports = {
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
  name: "Mindfulness graphql schema",
  schemaPath: "schema.graphql",
};
