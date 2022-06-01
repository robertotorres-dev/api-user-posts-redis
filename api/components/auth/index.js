const ctrl = require('./controller');
const config = require('../../../config');

let store;
if (config.remoteDB == false) {
	store = require('../../../store/mysql');
} else {
	store = require('../../../store/remote-mysql');
}

module.exports = ctrl(store);
