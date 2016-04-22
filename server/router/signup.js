
var router = require('express').Router();
var Customer = require('../models/Customer');

router.get('/', function(req, res) {
    res.render('signup', {
        username: req.session.username
    });
})

router.post('/req', function(req, res) {
    Customer.createAccount(req.body, function(err) {
        if (!err) {
            message = "success";
            redirect = "/account";
            req.session.username = req.body.username;
            console.log(req.session.username, "registered");
            res.send({ message, redirect });
        } else {
            if (err.code == 'ER_DUP_ENTRY') {
                res.send({ message: "Some fields are duplicate" });
            } else {
                console.error(err);
                res.send({ message: "Error" });
            }
        };
    });
});

module.exports = router;
