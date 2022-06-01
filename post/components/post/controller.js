const { nanoid } = require('nanoid');

const TABLA = 'post';

module.exports = function (injectedStore) {
	let store = injectedStore;
	if (!store) {
		store = require('../../../store/dummy');
	}

	function list() {
		return store.list(TABLA);
	}

	function get(id) {
		return store.get(TABLA, id);
	}

	function upsert(body, userId) {
		const post = {
			text: body.text,
			user: userId,
		};

		if (body.id) {
			post.id = body.id;
		} else {
			post.id = nanoid();
		}
		
		return store.upsert(TABLA, post);
	}

	return {
		list,
		get,
		upsert,
	};
};
