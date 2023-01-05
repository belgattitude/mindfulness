/*
module.exports =  ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
		host: env('DATABASE_HOST', 'localhost'),
			port: env.int('DATABASE_PORT', 5432),
			database: env('DATABASE_NAME', 'mindfulness-strapi'),
			user: env('DATABASE_USERNAME', 'strapi'),
			password: env('DATABASE_PASSWORD', 'strapi'),
			ssl: env.bool('DATABASE_SSL', false)
		}
	}
});
 */

const path = require('path');


module.exports = ({ env }) => {
	const db = path.join(__dirname, '../../../', env('DATABASE_FILENAME', '.tmp/data.db'));

	console.log('db', db)

	return {
		connection: {
			client: 'sqlite',
			connection: {
				filename: db,
			},
			useNullAsDefault: true,
		}
	}
};

