
var connection = require('./db').connection();
var Customer = require('./Customer');

const LOAD_BY_STORE =
    `SELECT store_id, customer, score, comment, firstname, lastname
    FROM Store_Review INNER JOIN Customer
    ON Customer.username = Store_Review.customer
    WHERE store_id = ?`

const LOAD_BY_CUSTOMER = `SELECT * FROM Store_Review WHERE customer = ?`

function loadByStore(store_id, callback) {
    connection.query(LOAD_BY_STORE, [store_id], callback);
}

function loadByCustomer(customer, callback) {
    connection.query(LOAD_BY_CUSTOMER, [customer], callback);
}

const INSERT =
    `INSERT INTO Store_Review VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE score = ?, comment = ?`;

function insertReview(values, callback) {
    var arr = [ values.store_id, values.customer, values.score, values.comment, values.score, values.comment ];
    connection.query(INSERT, arr, callback);
}

module.exports = {
    loadByStore,
    loadByCustomer,
    insertReview
}
