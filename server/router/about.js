
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('about', {
        username: req.session.username
    });
})

module.exports = router;
