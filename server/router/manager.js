
var router = require('express').Router();
var Store = require('../models/Store');
var Order = require('../models/Order');
var Menu = require('../models/Menu');

router.get('/', function(req, res) {
    if (!req.session.store_id) {
        res.render('manager', {
            username: req.session.username
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
                res.redirect('/manager/view')
            } else {
                console.log('not match')
                res.send();
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
                else res.send(data);
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

module.exports = router;
