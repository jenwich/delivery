
var query = require('./db').query;
var Menu = require('./Menu');

const LOAD_ONE = 'SELECT * FROM Cart WHERE customer = ? AND menu_id = ?'

const LOAD_ONE_CUSTOMER =
    `SELECT Cart.menu_id, name, price, amount, Menu.store_id, Menu.available FROM Cart INNER JOIN Menu
    ON Cart.menu_id = Menu.menu_id
    WHERE Cart.customer = ?`;

const LOAD_STORE =
    `SELECT store_id FROM Cart INNER JOIN Menu
    ON Cart.menu_id = Menu.menu_id
    WHERE Cart.customer = ?
    GROUP BY store_id`;

const ADD =
    `INSERT INTO Cart VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE amount = amount+1`;

const DECREASE = 'UPDATE Cart SET amount = amount - 1 WHERE customer = ? AND menu_id = ?'

const DELETE = 'DELETE FROM Cart WHERE customer = ? AND menu_id = ?';

const CLEAR_CART = 'DELETE FROM Cart WHERE customer = ?';

function loadOne(values, callback) {
    query(LOAD_ONE, [values.customer, values.menu_id], callback);
}

function loadOneCustomer(customer, callback) {
    query(LOAD_ONE_CUSTOMER, [customer], callback);
}

function getStoreOfCart(customer, callback) {
    query(LOAD_STORE, [customer], function(err, rows) {
        callback(err, rows.map(row => row.store_id))
    })
}

function addMenu(values, callback) {
    getStoreOfCart(values.customer, function(err, rows) {
        if (!rows.length || values.store_id == rows[0]) {
            query(ADD, [values.customer, values.menu_id], callback);
        } else {
            callback(err, { "message": "Unmatch store" })
        }
    });
}

function deleteOne(values, callback) {
    query(DELETE, [values.customer, values.menu_id], callback);
}

function decreaseMenu(values, callback) {
    loadOne(values, function(err, rows) {
        var amount = (rows[0])? rows[0].amount: 0;
        if (amount > 1) {
            query(DECREASE, [values.customer, values.menu_id], callback);
        } else if (amount == 1) {
            deleteOne(values, callback)
        } else callback(err, rows)
    });
}

function clearCart(customer, callback) {
    query(CLEAR_CART, [customer], callback)
}

module.exports = {
    loadOneCustomer,loadOneCustomer, addMenu, decreaseMenu, getStoreOfCart, clearCart
}
