import path from 'node:path';

// https://docs.strapi.io/dev-docs/configurations/database#connection-parameters

export default ({ env }) => {
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(import.meta.dirname, '..', env('DATABASE_FILENAME')),
        timezone: 'utc'
      },
      useNullAsDefault: true,
    }
  }
}
