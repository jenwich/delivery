
var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var secret = require('./secret');

var app = express();
var connection = mysql.createConnection(secret.mysqlOptions);
var query = require('./query')(connection);

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
    app.locals.pretty = true;
    next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.render('index', {
        username: req.session.username
    });
});

app.get('/menus', function(req, res) {
    res.render('menus', {
        username: req.session.username
    });
});

app.get('/stores', function(req, res) {
    res.render('stores', {
        username: req.session.username
    });
});

app.get('/about', function(req, res) {
    res.render('about', {
        username: req.session.username
    });
});

app.get('/signin', function(req, res) {
    if (req.session.username) {
        res.redirect('/account');
    } else {
        res.render('signin');
    }
});

app.get('/signup', function(req, res) {
    if (req.session.username) {
        res.redirect('/account');
    } else {
        res.render('signup');
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
});

app.get('/account', function(req, res) {
    if (!req.session.username) {
        res.redirect('/signin');
    } else {
        res.render(req.session.type, {
            username: req.session.username,
        });
    }
});

app.post('/signin/signin_req', function(req, res) {
    query.signin([req.body.username, req.body.password], function(rows) {
        var message, redirect;
        if (rows.length) {
            message = "success";
            redirect = "/account";
            req.session.type = rows[0].account_type;
            req.session.username = req.body.username;
            console.log(req.session.username, "logged in");
        } else {
            message = "Username or password unmatch";
        }
        res.send({ message, redirect });
    }, function(err) {
        console.error(err);
        res.end();
    });
});

app.post('/signup/req', function(req, res) {
    query.signup(req.body, function() {
        message = "success";
        redirect = "/account";
        req.session.type = 'customer';
        req.session.username = req.body.username;
        console.log(req.session.username, "registered");
        res.send({ message, redirect });
    }, function(err) {
        console.log(err);
        if (err.code == 'ER_DUP_ENTRY') res.end({ error: 'Duplicate username'})
    });
});
