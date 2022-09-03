const express = require('express');

const api = express.Router();

api.use('/', require('./index'));
api.use('/users', require('./users'));
api.use('/subscribers', require('./subscriberApi'));
api.use('/session',require('./sessionApi'));


module.exports = api;