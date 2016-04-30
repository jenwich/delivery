
var router = require('express').Router();
var Store = require('../models/Store');
var Order = require('../models/Order');
var Menu = require('../models/Menu');
var Coupon = require('../models/Coupon');
var moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

router.get('/', function(req, res) {
    if (req.session.username) {
       res.redirect('/');
    } else if (!req.session.store_id) {
        res.render('manager', {
            username: req.session.username,
            store_name: req.session.store_name
        });
    } else {
        res.redirect('/manager/view');
    }
})

router.post('/signin', function(req, res) {
    Store.checkStoreAccount(req.body, function(err, rows) {
        if (!err) {
            if (rows.length) {
                req.session.store_id = rows[0].store_id;
                req.session.store_name = rows[0].name;
                console.log(`[${moment().format(DATE_FORMAT)}]`, req.session.store_name, 'logged in');
                res.redirect('/manager/view')
            } else {
                console.log(`[${moment().format(DATE_FORMAT)}] loggin fail (${req.body.username})`);
                res.redirect('/manager')
            }
        } else console.error(err)
    })
})

router.get('/view', function(req, res) {
    if (!req.session.store_id) {
        res.redirect('/');
    } else {
        Store.loadOne(req.session.store_id, function(err, data) {
            res.render('manager-view', {
                username: req.session.username,
                store_name: req.session.store_name,
                name: data.name
            });
        });
    }
})

router.get('/view/order', function(req, res) {
    if (!req.session.store_id) {
        res.redirect('/');
    } else {
        Store.loadOne(req.session.store_id, function(err, data) {
            res.render('manager-view-order', {
                username: req.session.username,
                store_name: req.session.store_name,
                name: data.name
            });
        });
    }
})

router.post('/view/order/load', function(req, res) {
    Order.loadByStore(req.session.store_id, function(err, data) {
        if (err) console.error(err);
        else res.send(data);
    });
})

router.post('/view/order/cook', function(req, res) {
    Order.cookOrder(req.body.order_id, function(err, data) {
        if (err) console.error(err);
        else {
            Order.loadByStore(req.session.store_id, function(err, data) {
                if (err) console.error(err);
                else {
                    console.log(`[${moment().format(DATE_FORMAT)}]`, `order#${req.body.order_id} cooked`)
                    res.send(data);
                }
            });
        }
    });
})

router.get('/view/menus', function(req, res) {
    if (!req.session.store_id) {
        res.redirect('/');
    } else {
        Store.loadOne(req.session.store_id, function(err, data) {
            res.render('manager-view-menus', {
                username: req.session.username,
                store_name: req.session.store_name,
                name: data.name
            });
        });
    }
})

router.post('/view/menus/load', function(req, res) {
    Menu.loadByStore(req.session.store_id, function(err, rows) {
        if (err) console.error(err);
        else res.send(rows);
    });
})

router.post('/view/menus/change_available', function(req, res) {
    Menu.changeAvailable(req.body.menu_id, req.body.value, function(err, rows) {
        if (err) console.error(err);
        else {
            Menu.loadByStore(req.session.store_id, function(err, rows) {
                if (err) console.error(err);
                else res.send(rows);
            });
        }
    });
})

router.get('/view/coupon', function(req, res) {
    if (!req.session.store_id) {
        res.redirect('/');
    } else {
        Store.loadOne(req.session.store_id, function(err, data) {
            Coupon.loadByStore(req.session.store_id, function(err, rows) {
                res.render('manager-view-coupon', {
                    username: req.session.username,
                    store_name: req.session.store_name,
                    name: data.name,
                    coupons: rows
                });
            });
        });
    }
})

router.post('/view/coupon/add', function(req, res) {
    var data = {
        store_id: req.session.store_id,
        customer: req.body.username.trim(),
        rate: (req.body.rate)? parseFloat(req.body.rate): 0
    }
    if (data.rate) {
        Coupon.insertCoupon(data, function(err, rows) {
            if (!err) {
                res.redirect('/manager/view/coupon');
            } else console.error(err)
        });
    } else {
        Coupon.deleteCoupon(data, function(err, rows) {
            if (!err) {
                res.redirect('/manager/view/coupon');
            } else console.error(err)
        })
    }
})

module.exports = router;
