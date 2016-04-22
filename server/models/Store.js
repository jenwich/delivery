var connection = require('./db').connection();
var Menu = require('./Menu');

const LOAD_ONE = 'SELECT * FROM Store WHERE store_id = ?';

function loadOne(store_id, callback) {
    connection.query(LOAD_ONE, [store_id], function(err, rows) {
        callback(err, rows[0])
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

module.exports = {
    loadOne, loadOneWithMenus
}
