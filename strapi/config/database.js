const path = require('path')

// https://docs.strapi.io/dev-docs/configurations/database#connection-parameters

module.exports = ({ env }) => {
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME')),
        timezone: 'utc'
      },
      useNullAsDefault: true,
    }
  }
}
