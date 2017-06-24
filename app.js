'use strict';

const Sequelize = require('sequelize');
const express = require('express');
const log4js = require('./lib/log4js');
const logger = log4js.getLogger('express');
const http = require('http');
var parseUrl = require('parseurl');
var send = require('send');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler')

var app = express();
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
app.use('/disc', require('./routes'));
var server = http.Server(app).listen(8888, '127.0.0.1', function() {
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

/*const sequelize = new Sequelize('mysql://root@localhost:3306/market');

sequelize
    .authenticate()
    .then(() => {
    console.log('DB connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});


var server = http.createServer(function onRequest (req, res) {
    send(req, parseUrl(req).pathname).pipe(res)
});

server.listen(3000);*/

// Serve up public/ftp folder
var serve = serveStatic('static', {'index': ['index.html', 'index.htm']})

// Create server
var server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res))
});

// Listen
server.listen(3000);

module.exports = app;
