
var router = require('express').Router();
var Customer = require('../models/Customer');
var Store = require('../models/Store');
var Menu = require('../models/Menu');
var Cart = require('../models/Cart');

router.get('/', function(req, res) {
    res.render('menus', {
        username: req.session.username
    });
})

router.post('/init', function(req, res) {
    var data = {};
    Store.loadAll(function(err, rows) {
        data.stores = rows;
        Customer.loadAddress(req.session.username, function(err, rows) {
            data.address = rows;
            res.send(data);
        })
    });
})

router.post('/load_store', function(req, res) {
    Store.loadMenusAndCategory(req.body.store_id, function(err, data) {
        res.send(data);
    })
});

router.post('/load_cart', function(req, res) {
    Cart.loadOneCustomerWithMenuName(req.session.username, function(err, rows) {
        loadCart(req.session.username, "", function(data) {
            res.send(data);
        });
    })
});

router.post('/add_cart', function(req, res) {
    Cart.addMenu({
        customer: req.session.username,
        menu_id: req.body.menu_id,
        store_id: req.body.store_id
    }, function(err, data) {
        if (!err) {
            var message = (data.message)? data.message: "";
            loadCart(req.session.username, message, function(data) {
                res.send(data);
            });
        }
    })
});

router.post('/decrease_cart', function(req, res) {
    Cart.decreaseMenu({
        customer: req.session.username,
        menu_id: req.body.menu_id
    }, function(err, data) {
        if (!err) {
            loadCart(req.session.username, "", function(data) {
                res.send(data);
            });
        }
    })
});

router.post('/purchase', function(req, res) {
    console.log(req.body.address);
    res.send({
        "message": "success"
    })
});


function loadCart(username, message, callback) {
    if (!message) message = "";
    Cart.loadOneCustomerWithMenuName(username, function(err, rows) {
        calculatePrice(rows, function(data) {
            var data = {
                menus: rows,
                total: data.total,
                discount: data.discount,
                summary: data.summary,
                message
            }
            callback(data)
        });
    });
}

function calculatePrice(data, callback) {
    var menuArr = data.map(menu => menu.menu_id);
    var amountArr = data.map(menu => menu.amount);
    Menu.getPriceOfMenus(menuArr, function(err, rows) {
        var sum = 0;
        for (var i in rows) {
            sum += rows[i] * amountArr[i];
        }
        var result = {
            total: sum,
            discount: 0,
            summary: sum
        }
        callback(result);
    })
}

module.exports = router;
