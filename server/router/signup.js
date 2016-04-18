
var router = require('express').Router();
var Account = require('../models/Account');
var Customer = require('../models/Customer');
var Address = require('../models/Address');

router.get('/', function(req, res) {
    res.render('signup', {
        username: req.session.username
    });
})

router.post('/req', function(req, res) {
    function handle(err) {
        if (!err) {
            message = "success";
            redirect = "/account";
            req.session.type = 'customer';
            req.session.username = req.body.username;
            console.log(req.session.username, "registered");
            res.send({ message, redirect });
        }
    }

    var account_arr = [req.body.username, req.body.password, req.body.email, req.body.firstName, req.body.lastName];
    Account.insert(account_arr, function(err) {
        if (!err) {
            Customer.insert([req.body.username], function(err) {
                if (!err) {
                    Address.insertMultiple({
                        username: req.body.username,
                        address: req.body.address
                    }, handle);
                }
            });
        } else {
            if (err.code == 'ER_DUP_ENTRY') {
                res.send({ message: "Some fields are duplicate" });
            } else {
                console.error(err);
                res.end();
            }
        };
    });
});

module.exports = router;
