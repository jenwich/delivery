
var router = require('express').Router();
var Menu_Review = require('../models/Menu_Review')

router.get('/', function(req, res) {
    Menu_Review.getPopularMenus(function(err, data) {
        res.render('index', {
            username: req.session.username,
            store_name: req.session.store_name,
            menus: data
        });
    });
})

router.use('/menus', require('./menus'));
router.use('/stores', require('./stores'));
router.use('/about', require('./about'));
router.use('/account', require('./account'));
router.use('/manager', require('./manager'));
router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));
router.use('/api', require('./api'));

router.get('/signout', function(req, res) {
    if (req.session.username) {
        console.log(req.session.username, "logged out");
        req.session.destroy(function() {
            res.redirect('/signin')
        });
    } else if (req.session.store_id) {
        console.log("store", req.session.store_id, "logged out");
        req.session.destroy(function() {
            res.redirect('/manager')
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
