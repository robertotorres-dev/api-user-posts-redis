const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore, injectedCache) {
	let store = injectedStore;
	let cache = injectedCache;

	if (!store) {
		store = require('../../../store/dummy');
	}

	if (!cache) {
		cache = require('../../../store/dummy');
	}

	async function list() {
		let users = await cache.list(TABLA);

		if (!users) {
			console.log('No estaba en cache. Buscando en BD');
			users = await store.list(TABLA);
			await cache.upsert(TABLA, users);
		} else {
			console.log('Datos de cache');
		}

		return users;
	}

	async function get(id) {
		user = await cache.get(TABLA, id);

		if (!user) {
			console.log('No estaba en cache. Buscando en BD');
			user = await store.get(TABLA, id);
			await cache.upsert(TABLA, user);
		} else {
			console.log('Datos de cache');
		}

		return user;
	}

	async function upsert(body) {
		const user = {
			name: body.name,
			username: body.username,
		};
		if (body.id) {
			user.id = body.id;
		} else {
			user.id = nanoid();
		}

		if (body.password || body.username) {
			await auth.upsert({
				id: user.id,
				username: user.username,
				password: body.password,
			});
		}

		return await store.upsert(TABLA, user);
	}

	function follow(from, to) {
		return store.upsert(TABLA + '_follow', {
			user_from: from,
			user_to: to,
		});
	}

	async function following(user) {
		const join = {};
		join[TABLA] = 'user_to';
		const query = { user_from: user };

		return await store.query(TABLA + '_follow', query, join);
	}

	return {
		list,
		get,
		upsert,
		follow,
		following,
	};
};
