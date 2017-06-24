'use strict';

const express = require('express');
const router = express.Router();
const log4js = require('../lib/log4js');
const logger = log4js.getLogger('index');

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    return res.status(200).json({status: 'ok', message: "fine"});
});

module.exports = router;
