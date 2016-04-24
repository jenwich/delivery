
var connection = require('./db').connection();

const CHECK_ACCOUNT = 'SELECT * FROM Customer WHERE username = ? AND password = ?'

const LOAD_ACCOUNT =
    `SELECT username, email, firstname, lastname, balance
    FROM Customer
    WHERE username = ?`

const LOAD_ADDRESS =
    `SELECT Address.address_value AS value
    FROM Customer INNER JOIN Address ON Customer.username = Address.customer
    WHERE Customer.username = ?`;

const INSERT_ACCOUNT =
    `INSERT INTO Customer (username, password, email, firstname, lastname, balance)
    VALUES (?, ?, ?, ?, ?, ?)`;

function checkAccount(values, callback) {
    connection.query(CHECK_ACCOUNT, values, callback);
}

function loadAccount(username, callback) {
    connection.query(LOAD_ACCOUNT, [username], function(err, rows) {
        callback(err, rows[0])
    });
}

function loadAddress(username, callback) {
    connection.query(LOAD_ADDRESS, [username], callback);
}

function loadAccountWithAddress(username, callback) {
    loadAccount(username, function(err, data) {
        if (!err) {
            if (data) {
                loadAddress(data.username, function(err, rows) {
                    if (!err) {
                        data.address = rows;
                        callback(err, data);
                    } else callback(err);
                });
            } else callback(err, data)
        } else callback(err);
    });
}

function insertAddress(values, callback) {
    var sql = 'INSERT INTO Address (customer, address_value) VALUES ';
    values.address.forEach(function(item, index) {
        if (index != 0) sql += ',';
        sql += `('${ values.username }', '${ item }')`;
    });
    if (values.address.length > 0) {
        connection.query(sql, callback);
    } else callback(null, [])
}

function createAccount(data, callback) {
    var arr = [ data.username, data.password, data.email, data.firstName, data.lastName, 0 ];
    connection.query(INSERT_ACCOUNT, arr, function(err, rows) {
        if (!err) {
            insertAddress({ username: data.username, address: data.address }, function(err, rows) {
                if (!err) {
                    callback(err, rows)
                } else callback(err);
            });
        } else callback(err);
    });
}

const DECREASE_BALANCE = 'UPDATE Customer SET balance = balance - ? WHERE username = ?'

function decreaseBalance_(username, price, callback) {
    connection.query(DECREASE_BALANCE, [price, username], callback)
}

const LOAD_BALANCE = 'SELECT balance FROM Customer WHERE username = ?'

function decreaseBalance(username, price, callback) {
    connection.query(LOAD_BALANCE, [username], function(err, rows) {
        if (!err) {
            var balance = rows[0].balance;
            if (price > balance) {
                callback(err, { message_: "Not enough money" })
            } else {
                decreaseBalance_(username, price, callback);
            }
        } else console.error(err)
    });
}

module.exports = {
    checkAccount,
    loadAddress,
    loadAccount,
    loadAccountWithAddress,
    createAccount,
    decreaseBalance
}
