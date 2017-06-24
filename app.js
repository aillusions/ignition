'use strict';

const express = require('express');
const log4js = require('./lib/log4js');
const logger = log4js.getLogger('express');

var app = express();
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
app.use('/disc', require('./routes'));
var server = require('http').Server(app).listen(8888, '127.0.0.1', function() {
    logger.info('Start server at %s:%d', this.address().address, this.address().port);
});
app.use(function(req, res) {
    res.status(404);
    res.json({status: 'error', message: 'Page not found'});
});
app.use(function(err, req, res, next) {
    logger.error('Catch error:', err);
    res.status(500);
    res.json({status: 'error', message: err.message});
});

module.exports = app;
