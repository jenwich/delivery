
var moment = require('moment')
var query = require('./db').query;

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const LOAD_ORDER = `SELECT * FROM Order_ WHERE order_id = ?`;

const LOAD_MENUS =
    `SELECT menu_id, amount FROM Order_Menu WHERE order_id = ?`;

const LOAD_BY_CUSTOMER =
    `SELECT order_id, Store.name AS store_name, Order_.address, price, discount,
        UNIX_TIMESTAMP(time_ordered) AS time_ordered,
        UNIX_TIMESTAMP(time_cooked) AS time_cooked,
        UNIX_TIMESTAMP(time_received) AS time_received
    FROM Order_ INNER JOIN Store
        ON Order_.store_id = Store.store_id
    WHERE customer = ? ORDER BY order_id DESC`

const LOAD_BY_CUSTOMER_MENU =
    `SELECT Order_Menu.order_id, Order_Menu.menu_id, Order_Menu.amount, Menu.name, Menu.price
    FROM Order_ INNER JOIN Order_Menu ON Order_.order_id = Order_Menu.order_id
    INNER JOIN Menu ON Order_Menu.menu_id = Menu.menu_id
    WHERE Order_.customer = ?`

const LOAD_BY_STORE =
    `SELECT order_id, customer, address, price, discount,
        UNIX_TIMESTAMP(time_ordered) AS time_ordered,
        UNIX_TIMESTAMP(time_cooked) AS time_cooked,
        UNIX_TIMESTAMP(time_received) AS time_received
    FROM Order_ WHERE store_id = ? ORDER BY order_id DESC`;

const LOAD_BY_STORE_MENU =
    `SELECT Order_Menu.order_id, Order_Menu.menu_id, Order_Menu.amount, Menu.name, Menu.price
    FROM Order_ INNER JOIN Order_Menu ON Order_.order_id = Order_Menu.order_id
    INNER JOIN Menu ON Order_Menu.menu_id = Menu.menu_id
    WHERE Order_.store_id = ?`

const CREATE_ORDER =
    `INSERT INTO Order_ (store_id, customer, address, price, discount, time_ordered)
    VALUES (?, ?, ?, ?, ?, ?)`

const COOK_ORDER =
    `UPDATE Order_ SET time_cooked = ? WHERE order_id = ?`;

const RECEIVE_ORDER =
    `UPDATE Order_ SET time_received = ? WHERE order_id = ?`;

function loadOne(id, callback) {
    query(LOAD_ORDER, [id], callback);
}

function loadMenus(id, callback) {
    query(LOAD_MENUS, [id], callback);
}

function loadByCustomerWithMenu(customer, callback) {
    query(LOAD_BY_CUSTOMER_MENU, [customer], function(err, rows) {
        callback(err, rows)
    });
}

function checkProcess(data) {
    if (data.time_cooked && !data.time_received) return "sending";
    else if (data.time_received) return "received";
    else return "ordered"
}

function changeTimeFormat(time) {
    return time? moment.unix(time, DATE_FORMAT).format('D MMM YYYY HH:mm'): time;
}

function loadByCustomer(customer, callback) {
    query(LOAD_BY_CUSTOMER, [customer], function(err, rows) {
        if (!err) {
            var data = rows;
            data.forEach(function(row) {
                row.process = checkProcess(row);
                row.menus = [];
                row.time_ordered = changeTimeFormat(row.time_ordered);
                row.time_cooked = changeTimeFormat(row.time_cooked);
                row.time_received = changeTimeFormat(row.time_received);
            })
            loadByCustomerWithMenu(customer, function(err, rows) {
                if (!err) {
                    rows.forEach(function(row) {
                        data.forEach(function(row2) {
                            if (row.order_id == row2.order_id) {
                                row2.menus.push(row)
                            }
                        })
                    });
                    callback(err, data)
                } else callback(err)
            })
        } else callback(err);
    });
}

function loadByStoreWithMenu(store_id, callback) {
    query(LOAD_BY_STORE_MENU, [store_id], function(err, rows) {
        callback(err, rows)
    });
}

function loadByStore(store_id, callback) {
    query(LOAD_BY_STORE, [store_id], function(err, rows) {
        if (!err) {
            var data = rows;
            data.forEach(function(row) {
                row.process = checkProcess(row);
                row.menus = [];
                row.time_ordered = changeTimeFormat(row.time_ordered);
                row.time_cooked = changeTimeFormat(row.time_cooked);
                row.time_received = changeTimeFormat(row.time_received);
            })
            loadByStoreWithMenu(store_id, function(err, rows) {
                if (!err) {
                    rows.forEach(function(row) {
                        data.forEach(function(row2) {
                            if (row.order_id == row2.order_id) {
                                row2.menus.push(row)
                            }
                        })
                    });
                    callback(err, data)
                } else callback(err)
            })
        } else callback(err)
    })
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
        query(sql, callback);
    } else callback(null, [])
}

function createOrder(values, callback) {
    var params = [
        values.store_id,
        values.customer,
        values.address,
        values.price,
        values.discount,
        moment().format(DATE_FORMAT)
    ];
    query(CREATE_ORDER, params, function(err, rows) {
        if (!err) {
            var order_id = rows.insertId;
            insertOrderMenu({ order_id, menus: values.menus }, function(err, rows2) {
                if (!err) {
                    callback(err, rows)
                } else callback(err);
            })
        } else callback(err)
    })
}

function cookOrder(order_id, callback) {
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    query(COOK_ORDER, [time, order_id], callback);
}

function receiveOrder(order_id, callback) {
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    query(RECEIVE_ORDER, [time, order_id], callback);
}

module.exports = {
    loadOne,
    loadOneWithMenus,
    loadByCustomer,
    loadByStore,
    createOrder,
    cookOrder,
    receiveOrder
}
