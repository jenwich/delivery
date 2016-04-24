
var connection = require('./db').connection();
var Customer = require('./Customer');

const LOAD_BY_MENU =
    `SELECT menu_id, customer, score, comment, firstname, lastname
    FROM Menu_Review INNER JOIN Customer
    ON Customer.username = Menu_Review.customer
    WHERE menu_id = ?`

const LOAD_BY_CUSTOMER = `SELECT * FROM Menu_Review WHERE customer = ?`

function loadByMenu(menu_id, callback) {
    connection.query(LOAD_BY_MENU, [menu_id], callback);
}

function loadByCustomer(customer, callback) {
    connection.query(LOAD_BY_CUSTOMER, [customer], callback);
}

const INSERT =
    `INSERT INTO Menu_Review VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE score = ?, comment = ?`;

function insertReview(values, callback) {
    var arr = [ values.menu_id, values.customer, values.score, values.comment, values.score, values.comment ];
    connection.query(INSERT, arr, callback);
}

module.exports = {
    loadByMenu,
    loadByCustomer,
    insertReview
}
