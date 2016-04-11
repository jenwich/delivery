
var path = require('path');
var express = require('express');
var app = express();
var PORT = 3000;

app.listen(PORT, function() {
    console.log("Listening PORT", PORT);
});

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, '../public/jade'));
app.use('/js', express.static(path.resolve(__dirname, '../public/js')));

app.use(function(req, res, next) {
    app.locals.pretty = true;
    next();
});

app.get('/', function(req, res) {
    res.render('index');
})
