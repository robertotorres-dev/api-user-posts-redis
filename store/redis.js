// TODO LO DE REDIS
const redis = require('redis');
const config = require('../config');

const client = redis.createClient({
	host: config.redis.host,
	port: config.redis.port,
	password: config.redis.password,
});

(async () => {
	await client.connect();
	console.log('Conectado a REDIS');
})();

async function list(table) {
	try {
		const data = await client.get(table);

		if (data) {
			res = JSON.parse(data);
		} else {
			res = data;
		}

		return res;
	} catch (err) {
		if (err) return err;
	}
}

function get(table, id) {}

async function upsert(table, data) {
	let key = table;
	if (data && data.id) {
		key = key + '_' + data.id;
	}

	await client.setEx(key, 10, JSON.stringify(data));

	return true;
}

module.exports = {
	list,
	get,
	upsert,
};
