
var router = require('express').Router();
var Customer = require('../models/Customer');
var Menu = require('../models/Menu');
var Store = require('../models/Store');
var Order = require('../models/Order');
var Cart = require('../models/Cart');

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

router.post('/menu/category', function(req, res) {
    Menu.loadCategoryByStore(req.body.store_id, function(err, rows) {
        if (err) console.error(err);
        else {
            res.send(rows);
        }
    });
})

router.post('/menu/price', function(req, res) {
    Menu.getPriceOfMenus([1, 2, 3], function(err, rows) {
        if (err) console.error(err);
        else {
            res.send(rows);
        }
    });
})

router.post('/store/all', function(req, res) {
    Store.loadAll(function(err, rows) {
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

router.post('/store/load2', function(req, res) {
    Store.loadMenusAndCategory(req.body.store_id, function(err, data) {
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

router.post('/order/customer', function(req, res) {
    Order.loadByCustomer(req.body.customer, function(err, data) {
        if (err) console.error(err);
        else res.send(data);
    });
})

router.post('/order/cook', function(req, res) {
    Order.cookOrder(req.body.order_id, function(err, data) {
        if (err) console.error(err);
        else res.send(data);
    });
})

router.post('/order/recieve', function(req, res) {
    Order.recieveOrder(req.body.order_id, function(err, data) {
        if (err) console.error(err);
        else res.send(data);
    });
})

router.post('/order/create', function(req, res) {
    Order.createOrder(req.body, function(err, data) {
        if (err) console.error(err);
        else res.send(data);
    });
})

router.post('/cart/store', function(req, res) {
    Cart.getStoreOfCart(req.body.customer, function(err, rows) {
        if (err) console.error(err);
        else {
            res.send(rows);
        }
    });
})

router.post('/cart/load', function(req, res) {
    Cart.loadOneCustomer(req.body.customer, function(err, rows) {
        if (err) console.error(err);
        else res.send(rows);
    });
})

router.post('/cart/add', function(req, res) {
    Cart.addMenu(req.body, function(err, rows) {
        if (err) console.error(err);
        else res.send(rows);
    });
})

router.post('/cart/remove', function(req, res) {
    Cart.decreaseMenu(req.body, function(err, rows) {
        if (err) console.error(err);
        else res.send(rows);
    });
})

router.post('/manager/signin', function(req, res) {
    console.log(req.body)
})

module.exports = router;
