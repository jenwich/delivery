
var path = require('path');
var express = require('express');
var mysql = require('mysql');
var secret = require('./secret');

var app = express();
var connection = mysql.createConnection(secret.mysqlOptions);

var PORT = 3000;

app.listen(PORT, function() {
    console.log("Listening PORT", PORT);
});

connection.connect(function(err) {
    if (err) console.log(err);
    else {
        console.log("Database connected");
    }
})

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, '../public/jade'));
app.use('/js', express.static(path.resolve(__dirname, '../public/js')));

app.use(function(req, res, next) {
    app.locals.pretty = true;
    next();
});

app.get('/', function(req, res) {
    connection.query('SELECT * FROM Account', function(err, rows) {
        if (!err) {
            console.log(rows);
            res.render('index');
        }
    });
})
