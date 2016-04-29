
var connection = require('./db').connection();

const LOAD_ONE = 'SELECT * FROM Coupon WHERE customer = ? AND store_id = ?'

const LOAD_BY_STORE = 'SELECT * FROM Coupon WHERE store_id = ?'

const LOAD_BY_CUSTOMER =
    `SELECT Store.name AS store_name, rate
    FROM Coupon INNER JOIN Store
    ON Coupon.store_id = Store.store_id
    WHERE Coupon.customer = ?`

const INSERT =
    `INSERT INTO Coupon VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE rate = ?`;

const DELETE = 'DELETE FROM Coupon WHERE store_id = ? AND customer = ?';

function loadOne(values, callback) {
    connection.query(LOAD_ONE, [values.customer, values.store_id], function(err, rows) {
        callback(err, rows[0])
    });
}

function loadByStore(store_id, callback) {
    connection.query(LOAD_BY_STORE, [store_id], callback);
}

function loadByCustomer(customer, callback) {
    connection.query(LOAD_BY_CUSTOMER, [customer], callback);
}

function insertCoupon(values, callback) {
    var arr = [ values.customer, values.store_id, values.rate, values.rate ]
    connection.query(INSERT, arr, callback);
}

function deleteCoupon(values, callback) {
    connection.query(DELETE, [values.store_id, values.customer], callback);
}

module.exports = {
    loadOne,
    loadByStore,
    loadByCustomer,
    insertCoupon,
    deleteCoupon
}
