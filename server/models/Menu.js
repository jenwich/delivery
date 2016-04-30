var connection = require('./db').connection();

const LOAD_ONE = 'SELECT * FROM Menu WHERE menu_id = ?';

const LOAD_BY_STORE = 'SELECT * FROM Menu WHERE store_id = ?';

const LOAD_CATEGORY_BY_STORE =
    `SELECT category FROM Menu
    WHERE store_id = ?
    GROUP BY category
    ORDER BY category`

const LOAD_STORES = 'SELECT store_id FROM Menu WHERE menu_id IN ? GROUP BY store_id';

const LOAD_PRICE = 'SELECT price FROM Menu WHERE menu_id IN ?';

const LOAD_NAME = 'SELECT name FROM Menu WHERE menu_id IN ?';

const CHANGE_AVAILABLE = `UPDATE Menu SET available = ? WHERE menu_id = ?`

function loadOne(menu_id, callback) {
    connection.query(LOAD_ONE, [menu_id], function(err, rows) {
        callback(err, rows[0]);
    });
}

function loadByStore(store_id, callback) {
    connection.query(LOAD_BY_STORE, [store_id], callback);
}

function loadCategoryByStore(store_id, callback) {
    connection.query(LOAD_CATEGORY_BY_STORE, [store_id], function (err, rows) {
        if (rows.length) {
            rows = rows.map(item => item.category);
        }
        callback(err, rows)
    });
}

function getStoreOfMenus(menu_arr, callback) {
    connection.query(LOAD_STORES, [[menu_arr]], function(err, rows) {
        if (rows) rows = rows.map(row => row.store_id)
        callback(err, rows)
    });
}

function getPriceOfMenus(menu_arr, callback) {
    connection.query(LOAD_PRICE, [[menu_arr]], function(err, rows) {
        if (rows) rows = rows.map(row => row.price);
        callback(err, rows);
    });
}

function getNameOfMenus(menu_arr, callback) {
    connection.query(LOAD_NAME, [[menu_arr]], function(err, rows) {
        if (rows) rows = rows.map(row => row.name);
        callback(err, rows);
    });
}

function changeAvailable(menu_id, value, callback) {
    connection.query(CHANGE_AVAILABLE, [value, menu_id], callback);
}

module.exports = {
    loadOne,
    loadByStore,
    loadCategoryByStore,
    getStoreOfMenus,
    getPriceOfMenus,
    getNameOfMenus,
    changeAvailable
}
