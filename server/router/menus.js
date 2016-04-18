
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('menus', {
        username: req.session.username
    });
})

module.exports = router;
