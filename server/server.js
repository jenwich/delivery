
var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var secret = require('./secret');

require('./models/db').createConnection(secret.mysqlConfig);

var app = express();

const PORT = 3000;

app.listen(PORT, function() {
    console.log("Listening PORT", PORT);
});

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, '../public/jade'));
app.use('/js', express.static(path.resolve(__dirname, '../public/js')));
app.use('/css', express.static(path.resolve(__dirname, '../public/css')));
app.use('/jquery', express.static(path.resolve(__dirname, '../node_modules/jquery/dist')));
app.use('/bootstrap', express.static(path.resolve(__dirname, '../node_modules/bootstrap/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: secret.session,
    saveUninitialized: true,
    resave: true,
}));
app.use(function(req, res, next) {
    req.session.username = 'theuser';
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.locals.pretty = true;
    next();
});

app.use('/', require('./router/index'));
