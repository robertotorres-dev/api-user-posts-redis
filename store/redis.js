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

		let res = data || null;
		if (data) {
			res = JSON.parse(data);
		}

		return res;
	} catch (err) {
		console.log(`Error: ${err}`);
		return err;
	}
}

async function get(table, id) {
	try {
		let key = `${table}_${id}`;
		const data = await client.get(key);

		let res = data || null;
		if (data) {
			res = JSON.parse(data);
		}
		return res;
	} catch (err) {
		console.log(`Error: ${err}`);
		return err;
	}
}

async function upsert(table, data) {
	let key = table;
	if (data && data.id) {
		key = key + '_' + data.id;
	}

	await client.setEx(key, 20, JSON.stringify(data));

	return true;
}

module.exports = {
	list,
	get,
	upsert,
};
