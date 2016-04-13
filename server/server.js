
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    app.locals.pretty = true;
    next();
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/signin', function(req, res) {
    res.render('signin');
});

app.post('/signin/signin_req', function(req, res) {
    console.log(req.body);
    connection.query(`SELECT * FROM Account WHERE username='${req.body.username}' AND password='${req.body.password}'`, function(err, rows) {
        if (!err) {
            var message = rows.length? "success": "Username or password unmatch";
            res.send({ message });
        }
        res.end();
    });
})
