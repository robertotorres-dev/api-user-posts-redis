const request = require('request');

function createRemoteDB(host, port) {
	const URL = 'http://' + host + ':' + port;

	function list(table) {
		return req('GET', table);
	}

	function get(table, id) {
		return req('GET', table, '', id);
	}

	function upsert(table, data) {
		return req('POST', table, data);
	}

	/* 
  function upsert(table, data) {
    
  }

  function query(table, query, join) {
    
  } */

	function req(method, table, data, id) {
		let url;
		if (id) {
			url = URL + '/' + table + '/' + id;
		} else {
			url = URL + '/' + table;
		}

		if (data) {
			body = data;
		} else {
			body = '';
		}

		if (method == 'GET') {
			return new Promise((resolve, reject) => {
				request(
					{
						method,
						url,
						headers: {
							'content-type': 'application/json',
						},
					},
					(err, req, body) => {
						if (err) {
							console.error('Error con la base de datos remota', err);
							return reject(err.message);
						}

						const resp = JSON.parse(body);
						return resolve(resp.body);
					}
				);
			});
		} else if (method == 'POST') {
			return new Promise((resolve, reject) => {
				request.post(
					{
						url,
						headers: {
							'content-type': 'application/json',
						},
						body,
						json: true
					},
					(err, req, body) => {
						if (err) {
							console.error('Error con la base de datos remota', err);
							return reject(err.message);
						}
						console.log(body);
						const resp = body;
						return resolve(resp.body);
					}
				);
			});
		}
	}

	return {
		list,
		get,
		upsert,
	};
}

module.exports = createRemoteDB;
