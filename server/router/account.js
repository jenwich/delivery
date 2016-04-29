
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
        routeHandler(req, res, 'account-order');
    });
})

router.get('/history', function(req, res) {
    Order.loadByCustomer(req.session.username, function(err, rows) {
        routeHandler(req, res, 'account-history', rows.filter(row => row.process == 'recieved'));
    });
})

router.post('/order/load', function(req, res) {
    Order.loadByCustomer(req.session.username, function(err, data) {
        if (err) console.error(err);
        else res.send(data);
    });
})

router.post('/order/recieve', function(req, res) {
    Order.recieveOrder(req.body.order_id, function(err, data) {
        if (err) console.error(err);
        else {
            Order.loadByCustomer(req.session.username, function(err, data) {
                if (err) console.error(err);
                else res.send(data);
            });
        }
    });
})

router.get('/balance', function(req, res) {
    routeHandler(req, res, 'account-balance');
})

router.post('/balance/load', function(req, res) {
    Customer.loadBalance(req.session.username, function(err, balance) {
        res.send({ balance });
    });
})

router.post('/balance/add', function(req, res) {
    Customer.addBalance(req.session.username, req.body.amount, function(err) {
        if (!err) {
            Customer.loadBalance(req.session.username, function(err, balance) {
                res.send({ balance });
            });
        } else console.error(err);
    })
})

module.exports = router;
