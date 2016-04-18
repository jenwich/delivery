
var router = require('express').Router();
var Account = require('../models/Account');

router.get('/', function(req, res) {
    res.render('signin', {
        username: req.session.username
    });
})

router.post('/req', function(req, res) {
    Account.select([ req.body.username, req.body.password ], function(err, rows) {
        if (err) console.error(err);
        else {
            var message, redirect;
            if (rows.length) {
                message = "success";
                redirect = "/account";
                req.session.type = rows[0].account_type;
                req.session.username = req.body.username;
                console.log(req.session.username, "logged in");
            } else {
                message = "Username or password unmatch";
            }
            res.send({ message, redirect });
        }
    });
});

module.exports = router;
