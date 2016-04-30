
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('about', {
        username: req.session.username,
        store_name: req.session.store_name
    });
})

module.exports = router;
