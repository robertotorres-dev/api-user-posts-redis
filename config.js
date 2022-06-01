module.exports = {
	api: {
		port: process.env.API_PORT || 3000,
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'secretKey',
	},
	mysql: {
		host: process.env.MYSQL_HOST || '127.0.0.1',
		user: process.env.MYSQL_USER || 'root',
		password: process.env.MYSQL_PASSWORD || 'password',
		database: process.env.MYSQL_DB || 'example_user_auth',
	},
	mysqlService: {
		host: process.env.MYSQL_SRV_HOST || 'localhost',
		port: process.env.MYSQL_SRV_PORT || 3001,
	},
	post: {
		port: process.env.POST_PORT || 3002,
	},
};
