
var router = require('express').Router();
var Customer = require('../models/Customer');

router.get('/', function(req, res) {
    if (req.session.username) {
        res.redirect('/account');
    } else if (req.session.store_id) {
        res.redirect('/manager');
    } else {
        res.render('signin', {
            username: req.session.username
        });
    }
})

router.post('/req', function(req, res) {
    Customer.checkAccount({
        username: req.body.username,
        password: req.body.password
    }, function(err, rows) {
        if (!err) {
            var message, redirect;
            if (rows.length) {
                message = "success";
                redirect = '/account';
                req.session.username = req.body.username;
                console.log(req.session.username, "logged in");
            } else {
                message = "Username or password unmatch";
            }
            res.send({ message, redirect });
        } else console.error(err);
    });
});

module.exports = router;
