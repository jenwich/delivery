
var path = require('path');
var express = require('express');
var session = require('express-session');
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

app.use(session({
    secret: secret.session,
    saveUninitialized: true,
    resave: true,
}));

app.use(function(req, res, next) {
    app.locals.pretty = true;
    next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/signin', function(req, res) {
    if (req.session.username) {
        res.end("You already sign in.");
    } else {
        res.render('signin');
    }
});

app.get('/customer', function(req, res) {
    if (!req.session.username) {
        res.end("You are not allow to see this page.");
    } else {
        res.render('customer', {
            username: req.session.username
        });
    }
});

app.get('/signout', function(req, res) {
    if (req.session.username) {
        console.log(req.session.username, "logged out");
        req.session.destroy(function() {
            res.redirect('/signin')
        });
    } else {
        res.redirect('/');
    }
})

app.post('/signin/signin_req', function(req, res) {
    connection.query(`SELECT * FROM Account WHERE username='${req.body.username}' AND password='${req.body.password}'`, function(err, rows) {
        if (!err) {
            var message, redirect;
            if (rows.length) {
                message = "success";
                redirect = "/" + rows[0].account_type;
            } else {
                message = "Username or password unmatch";
            }
            req.session.username = req.body.username;
            console.log(req.session.username, "logged in");
            res.send({ message, redirect });
        }
        res.end();
    });
})
