
var router = require('express').Router();
var Customer = require('../models/Customer');
var Store = require('../models/Store');
var Menu = require('../models/Menu');
var Cart = require('../models/Cart');
var Order = require('../models/Order');

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
    Cart.loadOneCustomer(req.session.username, function(err, rows) {
        loadCart(req.session.username, "", function(data) {
            res.send(data);
        });
    })
});

router.post('/add_cart', function(req, res) {
    if (req.session.username) {
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
            } else console.error(err)
        })
    } else {
        loadCart(req.session.username, "Please signin", function(data) {
            res.send(data);
        });
    }
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
    if (req.session.username) {
        loadCart(req.session.username, "", function(cart) {
            var menuArr = cart.menus.map(row => row.menu_id);
            Menu.getStoreOfMenus(menuArr, function(err, stores) {
                var store_id = stores[0];
                var data = {
                    store_id,
                    customer: req.session.username,
                    address: req.body.address,
                    price: cart.summary,
                    discount: cart.discount,
                    menus: cart.menus
                }
                Customer.decreaseBalance(req.session.username, data.price, function(err, data_) {
                    if (!err) {
                        console.log(data_);
                        if (data_.message_) {
                            res.send({ message: data_.message_ })
                        } else {
                            Order.createOrder(data, function(err, rows) {
                                if (!err) {
                                    Cart.clearCart(req.session.username, function(err, rows) {
                                        res.send({ message: "success", redirect: "/account/order" })
                                    });
                                } else console.error(err);
                            });
                        }
                    } else console.error(err)
                });
            });
        });
    } else {
        res.send({ message: "Please signin" })
    }
});


function loadCart(username, message, callback) {
    if (!message) message = "";
    if (username) {
        Cart.loadOneCustomer(username, function(err, rows) {
            calculatePrice(rows, function(data) {
                rows.forEach((row) => row.price *= row.amount)
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
    } else {
        callback({ menus: [], total: 0, discount: 0, summary: 0, message: "Please sign in" })
    }
}

function calculatePrice(data, callback) {
    var sum = data.reduce((sum, item) => sum + item.price * item.amount, 0);
    callback({
        total: sum,
        discount: 0,
        summary: sum
    });
}

module.exports = router;
