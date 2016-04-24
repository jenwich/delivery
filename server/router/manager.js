
var router = require('express').Router();
var Store = require('../models/Store');

router.get('/', function(req, res) {
    res.render('manager', {
        username: req.session.username
    });
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
        res.render('manager-view', {
            username: req.session.username
        });
    }
})

module.exports = router;
