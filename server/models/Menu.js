var connection = require('./db').connection();

const LOAD_ONE = 'SELECT * FROM Menu WHERE menu_id = ?';

const LOAD_BY_STORE = 'SELECT * FROM Menu WHERE store_id = ?';

function loadOne(menu_id, callback) {
    connection.query(LOAD_ONE, [menu_id], function(err, rows) {
        callback(err, rows[0]);
    });
}

function loadByStore(store_id, callback) {
    connection.query(LOAD_BY_STORE, [store_id], callback);
}

module.exports = {
    loadOne, loadByStore
}
