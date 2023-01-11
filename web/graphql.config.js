// @ts-check

/** @type {import('graphql-config').IGraphQLConfig} */
module.exports = {
  name: 'Mindfulness graphql schema',
  schemaPath: 'schema.graphql',
  extensions: {
    endpoints: {
      'Local GraphQL Endpoint': {
        url: 'http://localhost:1337/graphql',
        headers: {
          'user-agent': 'JS GraphQL',
        },
        introspect: true,
      },
    },
  },
};
