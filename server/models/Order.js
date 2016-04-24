
var moment = require('moment')
var connection = require('./db').connection();

const LOAD_ORDER = `SELECT * FROM Order_ WHERE order_id = ?`;

const LOAD_MENUS =
    `SELECT menu_id, amount FROM Order_Menu WHERE order_id = ?`;

const LOAD_BY_CUSTOMER = `SELECT * FROM Order_ WHERE customer = ?`

const CREATE_ORDER =
    `INSERT INTO Order_ (store_id, customer, address, price, discount, time_ordered)
    VALUES (?, ?, ?, ?, ?, ?)`

function loadOne(id, callback) {
    connection.query(LOAD_ORDER, [id], callback);
}

function loadMenus(id, callback) {
    connection.query(LOAD_MENUS, [id], callback);
}

function loadByCustomer(customer, callback) {
    connection.query(LOAD_BY_CUSTOMER, [customer], callback);
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

function insertOrderMenu(values, callback) {
    var sql = 'INSERT INTO Order_Menu VALUES ';
    values.menus.forEach(function(item, index) {
        if (index != 0) sql += ',';
        sql += `(${values.order_id}, ${item.menu_id}, ${item.amount})`;
    });
    if (values.menus.length > 0) {
        connection.query(sql, callback);
    } else callback(null, [])
}

function createOrder(values, callback) {
    var params = [
        values.store_id,
        values.customer,
        values.address,
        values.price,
        values.discount,
        moment().format('YYYY-MM-DD HH:mm:ss')
    ];
    connection.query(CREATE_ORDER, params, function(err, rows) {
        if (!err) {
            var order_id = rows.insertId;
            insertOrderMenu({ order_id, menus: values.menus }, function(err, rows) {
                if (!err) {
                    callback(err, rows)
                } else callback(err);
            })
        } else callback(err)
    })
}

module.exports = {
    loadOne,
    loadOneWithMenus,
    loadByCustomer,
    createOrder
}
