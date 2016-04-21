var connection = require('./db').connection();

const LOAD_ORDER = `SELECT * FROM Customer_Order WHERE id = ?`;

const LOAD_MENU =
    `SELECT menu_id AS id, amount, score, comment FROM Order_Menu WHERE order_id = ?`;

const CREATE_ORDER =
    `INSERT INTO Customer_Order VALUES (?, ?, ?, ?)`;

const CREATE_ORDER_MENU =
    `INSERT INTO Order_Menu VALUE`;

function loadOne(id, callback) {
    connection.query(LOAD_ORDER, [id], callback);
}

function loadMenus(id, callback) {
    connection.query(LOAD_MENU, [id], callback);
}

function loadOneWithMenus(id, callback) {
    loadOne(id, function(err, rows) {
        if (!err) {
            var data = rows[0];
            if (rows.length) {
                loadMenus(id, function(err, rows) {
                    if (!err) {
                        data.menus = rows;
                        callback(err, data);
                    } else callback(err);
                });
            } else {
                callback(err, []);
            }
        } else callback(err);
    });
}

module.exports = {
    loadOne,
    loadOneWithMenus
}
