'use strict';

var meta = require('../package.json');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var app = module.exports = express();
var router = express.Router();

process.on('uncaughtException', function (err) {
    (app.get('logger') || console).error('Uncaught exception:\n', err.stack);
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('name', meta.name);
app.set('version', meta.version);
app.set('port', process.env.PORT || 5555);
app.set('root', path.resolve(__dirname, '../').replace(/\/+$/, ''));
app.set('logger', console);
app.enable('trust proxy');

router.get('/', function (req, res, next) {
    req.url = '/' + meta.name + '/' + meta.version + '/index.html' || '/';
    next();
});
app.use(router);
app.use(require('./static')());

if (require.main === module) {
    app.listen(app.get('port'), function () {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'));
    });
}
