module.exports = {
	api: {
		port: process.env.API_PORT || 3000,
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'secretKey',
	},
	mysql: {
		host: process.env.MYSQL_HOST || 'localhost',
		user: process.env.MYSQL_USER || 'root',
		password: process.env.MYSQL_PASSWORD || 'password',
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
	cacheService: {
		host: process.env.CACHE_SRV_HOST || 'localhost',
		port: process.env.CACHE_SRV_PORT || 3003,
	},
	redis: {
		host: process.env.REDIS_HOST || '127.0.0.1',
		port: process.env.REDIS_PORT || 6379,
		password: process.env.REDIS_PASSWORD || '',
	},
};
