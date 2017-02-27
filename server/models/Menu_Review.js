
var moment = require('moment')
var connection = require('./db').connection();
var query = require('./db').query
var Customer = require('./Customer');
var Menu = require('./Menu');

const LOAD_BY_MENU =
    `SELECT menu_id, customer, score, comment, UNIX_TIMESTAMP(time_review) AS time, firstname, lastname
    FROM Menu_Review INNER JOIN Customer
    ON Customer.username = Menu_Review.customer
    WHERE menu_id = ?
    ORDER BY time_review`

const LOAD_BY_CUSTOMER = `SELECT * FROM Menu_Review WHERE customer = ?`

const INSERT =
    `INSERT INTO Menu_Review VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE score = ?, comment = ?, time_review = ?`;

const SUM_OF_MENUS =
    `SELECT Menu.menu_id, Store.store_id, Menu.name AS menu_name, Store.name AS store_name, Menu.description, price, score, count
    FROM Menu
    INNER JOIN (
        SELECT menu_id, ROUND(SUM(score)/COUNT(*), 1) AS score, COUNT(*) AS count FROM Menu_Review
        GROUP BY menu_id
    ) AS Review
    ON Menu.menu_id = Review.menu_id
    INNER JOIN Store
    ON Store.store_id = Menu.Store_id
    ORDER BY score DESC, count DESC
    LIMIT 10`

function loadByMenu(menu_id, callback) {
    query(LOAD_BY_MENU, [menu_id], callback);
}

function loadByCustomer(customer, callback) {
    query(LOAD_BY_CUSTOMER, [customer], callback);
}

function insertReview(values, callback) {
    var time = moment().format('YYYY-MM-DD HH:mm:ss')
    var arr = [
        values.menu_id,
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

function getPopularMenus(callback) {
    query(SUM_OF_MENUS, callback);
}

module.exports = {
    loadByMenu,
    loadByCustomer,
    insertReview,
    getPopularMenus
}
