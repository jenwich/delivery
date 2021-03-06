
var moment = require('moment')
var query = require('./db').query;
var Customer = require('./Customer');

const LOAD_BY_STORE =
    `SELECT store_id, customer, score, comment, UNIX_TIMESTAMP(time_review) AS time, firstname, lastname
    FROM Store_Review INNER JOIN Customer
    ON Customer.username = Store_Review.customer
    WHERE store_id = ?
    ORDER BY time_review`

const LOAD_BY_CUSTOMER = `SELECT * FROM Store_Review WHERE customer = ?`

const INSERT =
    `INSERT INTO Store_Review VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE score = ?, comment = ?, time_review = ?`;

function loadByStore(store_id, callback) {
    query(LOAD_BY_STORE, [store_id], callback);
}

function loadByCustomer(customer, callback) {
    query(LOAD_BY_CUSTOMER, [customer], callback);
}

function insertReview(values, callback) {
    var time = moment().format('YYYY-MM-DD HH:mm:ss')
    var arr = [
        values.store_id,
        values.customer,
        values.score,
        values.comment,
        time,
        values.score,
        values.comment,
        time
    ];
    query(INSERT, arr, callback);
}

module.exports = {
    loadByStore,
    loadByCustomer,
    insertReview
}
