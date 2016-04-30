
var router = require('express').Router();
var Customer = require('../models/Customer');
var moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

router.get('/', function(req, res) {
    if (req.session.username) {
        res.redirect('/account');
    } else if (req.session.store_id) {
        res.redirect('/manager');
    } else {
        res.render('signup', {
            username: req.session.username,
            store_name: req.session.store_name
        });
    }
})

router.post('/req', function(req, res) {
    Customer.createAccount(req.body, function(err) {
        if (!err) {
            message = "success";
            redirect = "/account";
            req.session.username = req.body.username;
            console.log(`[${moment().format(DATE_FORMAT)}]`, req.session.username, "registered");
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
