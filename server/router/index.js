
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index', {
        username: req.session.username
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
    } else {
        res.redirect('/');
    }
});

module.exports = router;
