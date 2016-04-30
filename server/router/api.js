
var router = require('express').Router();
var Customer = require('../models/Customer');
var Menu = require('../models/Menu');
var Store = require('../models/Store');
var Order = require('../models/Order');
var Cart = require('../models/Cart');
var Store_Review = require('../models/Store_Review');
var Menu_Review = require('../models/Menu_Review');
var Coupon = require('../models/Coupon');

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

router.post('/customer/balance', function(req, res) {
    Customer.loadBalance(req.body.username, function(err, balance) {
        if (err) console.error(err);
        else {
            res.send({balance});
        }
    })
})

router.post('/customer/addbalance', function(req, res) {
    Customer.addBalance(req.body.username, req.body.amount, function(err, rows) {
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

router.post('/menu/store', function(req, res) {
    Menu.loadByStore(req.body.store_id, function(err, rows) {
        if (err) console.error(err);
        else {
            res.send(rows);
        }
    });
})

router.post('/menu/store/change', function(req, res) {
    Menu.changeAvailable(req.body.menu_id, req.body.value, function(err, rows) {
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

router.post('/order/store', function(req, res) {
    Order.loadByStore(req.body.store_id, function(err, data) {
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

router.post('/order/receive', function(req, res) {
    Order.receiveOrder(req.body.order_id, function(err, data) {
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

router.post('/storereview/store', function(req, res) {
    Store_Review.loadByStore(req.body.store_id, function(err, rows) {
        if (!err) {
            res.send(rows);
        } else console.error(err);
    });
})

router.post('/storereview/insert', function(req, res) {
    Store_Review.insertReview(req.body, function(err, rows) {
        if (!err) {
            res.send(rows);
        } else console.error(err);
    });
})

router.post('/menureview/menu', function(req, res) {
    Menu_Review.loadByMenu(req.body.menu_id, function(err, rows) {
        if (!err) {
            res.send(rows);
        } else console.error(err);
    });
})

router.post('/menureview/insert', function(req, res) {
    Menu_Review.insertReview(req.body, function(err, rows) {
        if (!err) {
            res.send(rows);
        } else console.error(err);
    });
})

router.post('/menureview/sum', function(req, res) {
    Menu_Review.getPopularMenus(function(err, rows) {
        if (!err) {
            res.send(rows);
        } else console.error(err);
    });
})

router.post('/coupon/load', function(req, res) {
    Coupon.loadByStore(req.body.store_id, function(err, rows) {
        if (!err) {
            res.send(rows);
        } else console.error(err);
    });
})

router.post('/coupon/insert', function(req, res) {
    Coupon.insertCoupon(req.body, function(err, rows) {
        if (!err) {
            res.send(rows);
        } else console.error(err);
    });
})

module.exports = router;
