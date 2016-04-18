
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('stores', {
        username: req.session.username
    });
})

module.exports = router;
