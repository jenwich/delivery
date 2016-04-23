
var connection = require('./db').connection();
var Menu = require('./Menu');

const LOAD_ONE = 'SELECT * FROM Cart WHERE customer = ? AND menu_id = ?'

const LOAD_ONE_CUSTOMER = 'SELECT menu_id, amount FROM Cart WHERE customer = ?';

const ADD =
    `INSERT INTO Cart VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE amount = amount+1`;

const DECREASE = 'UPDATE Cart SET amount = amount - 1 WHERE customer = ? AND menu_id = ?'

const DELETE = 'DELETE FROM Cart WHERE customer = ? AND menu_id = ?';

function loadOne(values, callback) {
    connection.query(LOAD_ONE, [values.customer, values.menu_id], callback);
}

function loadOneCustomer(customer, callback) {
    connection.query(LOAD_ONE_CUSTOMER, [customer], callback);
}

function loadOneCustomerWithMenuName(customer, callback) {
    loadOneCustomer(customer, function(err, rows) {
        var menuArr = rows.map(row => row.menu_id);
        Menu.getNameOfMenus(menuArr, function(err, names) {
            for (var i in rows) {
                rows[i].name = names[i];
            }
            callback(err, rows);
        });
    });
}

function getStoreOfCart(customer, callback) {
    loadOneCustomer(customer, function(err, rows) {
        var arr = rows.map(row => row.menu_id);
        if (arr.length > 0) {
            Menu.getStoreOfMenus(arr, function(err, rows) {
                if (!err) {
                    callback(err, rows)
                } else return callback(err)
            });
        } else {
            callback(err, [])
        }
    })
}

function addMenu(values, callback) {
    getStoreOfCart(values.customer, function(err, rows) {
        if (!rows.length || values.store_id == rows[0]) {
            // console.log(values.store_id, rows[0])
            connection.query(ADD, [values.customer, values.menu_id], callback);
        } else {
            callback(err, { "message": "Unmatch store" })
        }
    });
}

function deleteOne(values, callback) {
    connection.query(DELETE, [values.customer, values.menu_id], callback);
}

function decreaseMenu(values, callback) {
    loadOne(values, function(err, rows) {
        var amount = (rows[0])? rows[0].amount: 0;
        if (amount > 1) {
            connection.query(DECREASE, [values.customer, values.menu_id], callback);
        } else if (amount == 1) {
            deleteOne(values, callback)
        } else callback(err, rows)
    });
}

module.exports = {
    loadOneCustomer,loadOneCustomerWithMenuName, addMenu, decreaseMenu
}
