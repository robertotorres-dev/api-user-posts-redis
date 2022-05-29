const express = require('express');

const middlewareSecure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.post('/follow/:id', middlewareSecure('follow'), follow);
router.get('/:id/following', following);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', middlewareSecure('update'), upsert);

function list(req, res, next) {
	Controller.list()
		.then((lista) => {
			response.success(req, res, lista, 200);
		})
		.catch(next);
}

function get(req, res, next) {
	Controller.get(req.params.id)
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
}

function upsert(req, res, next) {
	Controller.upsert(req.body)
		.then((userAdded) => {
			response.success(req, res, userAdded, 201);
		})
		.catch(next);
}

function follow(req, res, next) {
	Controller.follow(req.user.id, req.params.id)
		.then((data) => {
			response.success(req, res, data, 201);
		})
		.catch(next);
}

function following(req, res, next) {
	return Controller.following(req.params.id)
		.then((data) => {
			return response.success(req, res, data, 200);
		})
		.catch(next);
}

module.exports = router;
