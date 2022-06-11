const mysql = require('mysql2');
const config = require('../config');

const dbconf = {
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
};

//Conection
let connection;

function handleCon() {
	connection = mysql.createConnection(dbconf);
	connection.connect((err) => {
		if (err) {
			console.error('[db err]', err);
			setTimeout(handleCon, 2000);
		}
		console.log('DB Connectada!');
	});

	connection.on('error', (err) => {
		console.error('[db err]', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleCon();
		} else {
			throw err;
		}
	});
}

handleCon();

function list(table) {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${table}`, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
}

function get(table, id) {
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM ${table} WHERE id = '${id}'`,
			(err, data) => {
				if (err) return reject(err);
				if (data.size = 1) {
					data = data[0];
				}
				resolve(data);
			}
		);
	});
}

function insert(table, data) {
	return new Promise((resolve, reject) => {
		connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

async function remove(table, id) {
	return true;
}

async function query(table, q) {
	let col = await list(table);
	let keys = Object.keys(q);
	let key = keys[0];

	return col.filter((item) => item[key] === q[key])[0] || null;
}

function update(table, data) {
	console.log(table);
	console.log(data);
	return new Promise((resolve, reject) => {
		connection.query(
			`UPDATE ${table} SET ? WHERE id=?`,
			[data, data.id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
}

const upsert = async function (table, data) {
	let alreadyExist = [];
	if (data && data.id) {
		alreadyExist = await get(table, data.id);
	}

	if (alreadyExist.length === 0) {
		return insert(table, data);
	} else {
		return update(table, data);
	}
};

function query(table, query, join) {
	let joinQuery = '';
	if (join) {
		const key = Object.keys(join)[0];
		const val = join[key];
		joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
	}

	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
			query,
			(err, result) => {
				if (err) return reject(err);
				resolve(result[0] || null);
			}
		);
	});
}

module.exports = {
	list,
	get,
	upsert,
	query,
};
