
var router = require('express').Router();

router.get('/', function(req, res) {
    if (!req.session.username) {
        res.redirect('/signin');
    } else {
        res.render(req.session.type, {
            username: req.session.username,
        });
    }
})

module.exports = router;
