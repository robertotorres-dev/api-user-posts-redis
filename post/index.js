const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// ROUTER
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
	console.log('Servicio de posts escuhando en el puerto', config.post.port);
});
