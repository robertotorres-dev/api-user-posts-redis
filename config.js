module.exports = {
	api: {
		port: process.env.API_PORT || 3000,
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'secretKey',
	},
	mysql: {
		host: process.env.MYSQL_HOST || '',
		user: process.env.MYSQL_USER || '',
		password: process.env.MYSQL_PASSWORD || '',
		database: process.env.MYSQL_DB || 'example_user_auth',
	},
	mysqlService: {
		host: process.env.MYSQL_SRV_HOST || 'localhost',
		port: process.env.MYSQL_SRV_PORT || 3001,
	},
	remoteDB: process.env.REMOTE_DB || false,
	post: {
		port: process.env.POST_PORT || 3002,
	},
};
