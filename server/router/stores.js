
var router = require('express').Router();
var moment = require('moment')
var Store = require('../models/Store')
var Store_Review = require('../models/Store_Review')
var Menu_Review = require('../models/Menu_Review')
var Menu = require('../models/Menu')

router.get('/', function(req, res) {
    Store.loadAll(function(err, rows) {
        res.render('stores', {
            username: req.session.username,
            data: rows
        });
    })
})

router.get('/:store_id', function(req, res) {
    Store.loadOneWithMenus(req.params.store_id, function(err, data) {
        Store_Review.loadByStore(req.params.store_id, function(err, rows) {
            rows.forEach(function(row) {
                row.time = moment.unix(row.time).format('D MMM YYYY HH:mm')
            })
            res.render('stores-view', {
                username: req.session.username,
                data: data,
                reviews: rows
            });
        })
    })
})

router.post('/:store_id/store_review', function(req, res) {
    if (req.session.username) {
        var data = {
            store_id: parseInt(req.params.store_id),
            customer: req.session.username,
            score: parseInt(req.body.score),
            comment: req.body.comment
        };
        Store_Review.insertReview(data, function(err) {
            if (!err) {
                res.redirect('/stores/' + req.params.store_id);
            } else console.error(err);
        })
    } else {
        res.redirect('/');
    }
})

router.get('/menu/:menu_id', function(req, res) {
    Menu.loadOne(req.params.menu_id, function(err, data) {
        Menu_Review.loadByMenu(req.params.menu_id, function(err, rows) {
            rows.forEach(function(row) {
                row.time = moment.unix(row.time).format('D MMM YYYY HH:mm')
            })
            res.render('stores-menu', {
                username: req.session.username,
                data: data,
                reviews: rows
            });
        })
    })
})

router.post('/menu/:menu_id/menu_review', function(req, res) {
    if (req.session.username) {
        var data = {
            menu_id: parseInt(req.params.menu_id),
            customer: req.session.username,
            score: parseInt(req.body.score),
            comment: req.body.comment
        };
        Menu_Review.insertReview(data, function(err) {
            if (!err) {
                res.redirect('/stores/menu/' + req.params.menu_id );
            } else console.error(err);
        })
    } else {
        res.redirect('/');
    }
})

module.exports = router;
