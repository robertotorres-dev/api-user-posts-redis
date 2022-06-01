const auth = require('../../../auth');

module.exports = function checkAuth(action) {
	function middleware(req, res, next) {
		switch (action) {
			case 'insert':
				auth.check.logged(req);
				next();
				break;
			case 'update':
				const owner = req.body.user;
				auth.check.own(req, owner);
			default:
				next();
		}
	}

	return middleware;
};
