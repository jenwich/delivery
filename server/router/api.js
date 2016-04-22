
var router = require('express').Router();
var Customer = require('../models/Customer');
var Menu = require('../models/Menu');
var Store = require('../models/Store');
var Order = require('../models/Order');

router.get('/', function(req, res) {

})

router.post('/customer/create', function(req, res) {
    Customer.createAccount(req.body, function(err, rows) {
        if (err) console.error(err);
        else {
            res.send(rows);
        }
    })
})

router.post('/customer/check', function(req, res) {
    Customer.checkAccount([req.body.username, req.body.password], function(err, rows) {
        if (err) console.error(err);
        else {
            res.send(rows);
        }
    })
})

router.post('/customer/load', function(req, res) {
    Customer.loadAccountWithAddress(req.body.username, function(err, data) {
        if (err) console.error(err);
        else {
            res.send(data);
        }
    })
})

router.post('/customer/address', function(req, res) {
    Customer.loadAddress(req.body.username, function(err, rows) {
        if (err) console.error(err);
        else {
            res.send(rows);
        }
    })
})

router.post('/menu', function(req, res) {
    Menu.loadOneWithRecipes(req.body.id, function(err, data) {
        if (err) console.error(err);
        else {
            res.send(data);
        }
    });
})

router.post('/menu/recipe', function(req, res) {
    Menu.loadRecipes(req.body.id, function(err, rows) {
        if (err) console.error(err);
        else {
            res.send(rows);
        }
    });
})

router.post('/store/load', function(req, res) {
    Store.loadOneWithMenus(req.body.store_id, function(err, data) {
        if (err) console.error(err);
        else {
            res.send(data);
        }
    });
})

router.post('/order/load', function(req, res) {
    Order.loadOneWithMenus(req.body.order_id, function(err, data) {
        if (err) console.error(err);
        else res.send(data);
    });
})

module.exports = router;
