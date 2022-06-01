const express = require('express');
const middlewareSecure = require('./secure');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', middlewareSecure('insert'), upsert);
router.put('/', middlewareSecure('update'), upsert);

function list(req, res, next) {
	Controller.list()
		.then((data) => {
			response.success(req, res, data, 200);
		})
		.catch(next);
}

function get(req, res, next) {
	Controller.get(req.params.id)
		.then((post) => {
			response.success(req, res, post, 200);
		})
		.catch(next);
}

function upsert(req, res, next) {
	Controller.upsert(req.body, req.user.id)
		.then((post) => {
			response.success(req, res, post, 201);
		})
		.catch(next);
}

module.exports = router;
