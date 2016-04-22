
var router = require('express').Router();
var Customer = require('../models/Customer');

router.get('/', function(req, res) {
    if (!req.session.username) {
        res.redirect('/signin');
    } else {
        Customer.loadAccountWithAddress(req.session.username, function(err, data) {
            res.render('account', {
                username: req.session.username,
                user: data
            });
        });
    }
})

module.exports = router;
