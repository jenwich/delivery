
var router = require('express').Router();
var Menu = require('../models/Menu');
var Recipe = require('../models/Recipe');
var Store = require('../models/Store');
var Order = require('../models/Order');

router.get('/', function(req, res) {

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

router.post('/recipe', function(req, res) {
    Recipe.loadOne(req.body.id, function(err, rows) {
        res.send(rows[0]);
    });
})

router.post('/store', function(req, res) {
    Store.loadOneWithRecipes(req.body.id, function(err, data) {
        if (err) console.error(err);
        else {
            res.send(data);
        }
    });
})

router.post('/store/update', function(req, res) {
    Store.increaseStock(req.body.store_id, req.body.recipe_id, req.body.amount, function(err, rows) {
        if (err) console.error(err);
        else {
            res.send('success');
        }
    });
})

router.post('/store/decrease', function(req, res) {
    Store.decreaseStock(req.body.store_id, req.body.recipe_id, req.body.amount, function(err, rows) {
        if (err) console.error(err);
        else {
            res.send('success');
        }
    });
})

router.post('/order', function(req, res) {
    Order.loadOneWithMenus(req.body.id, function(err, data) {
        if (err) console.error(err);
        else res.send(data);
    });
})

module.exports = router;
