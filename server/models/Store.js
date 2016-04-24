
var connection = require('./db').connection();
var Menu = require('./Menu');

const LOAD_ONE = 'SELECT * FROM Store WHERE store_id = ?';

const LOAD_ALL = 'SELECT store_id, name FROM Store';

const CHECK_ACCOUNT = 'SELECT * FROM Store WHERE username = ? AND password = ?';

function loadOne(store_id, callback) {
    connection.query(LOAD_ONE, [store_id], function(err, rows) {
        callback(err, rows[0])
    });
}

function loadAll(callback) {
    connection.query(LOAD_ALL, function(err, rows) {
        callback(err, rows)
    });
}

function loadOneWithMenus(store_id, callback)  {
    loadOne(store_id, function(err, data) {
        if (!err) {
            if (data) {
                Menu.loadByStore(store_id, function(err, rows) {
                    if (!err) {
                        console.log(data)
                        data.menus = rows;
                        callback(err, data);
                    } else callback(err);
                })
            }
        } else callback(err);
    });
}

function loadMenusAndCategory(store_id, callback) {
    var data = {};
    Menu.loadByStore(store_id, function(err, rows) {
        if (!err) {
            data.menus = rows;
            Menu.loadCategoryByStore(store_id, function(err, rows) {
                if (!err) {
                    data.category = rows;
                    callback(err, data)
                } else callback(err);
            });
        } else callback(err);
    });
}

function checkStoreAccount(values, callback) {
    connection.query(CHECK_ACCOUNT, [values.username, values.password], callback)
}

module.exports = {
    loadOne, loadAll, loadOneWithMenus, loadMenusAndCategory, checkStoreAccount
}
