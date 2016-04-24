
var router = require('express').Router();
var Customer = require('../models/Customer');
var Order = require('../models/Order')

function routeHandler(req, res, view, data) {
    if (!req.session.username) {
        res.redirect('/signin');
    } else {
        Customer.loadAccountWithAddress(req.session.username, function(err, userData) {
            res.render(view, {
                username: req.session.username,
                user: userData,
                view,
                data
            });
        });
    }
}

router.get('/', function(req, res) {
    routeHandler(req, res, 'account');
})

router.get('/order', function(req, res) {
    Order.loadByCustomer(req.session.username, function(err, rows) {
        routeHandler(req, res, 'account-order', rows);
    });
})

module.exports = router;
