
var connection = require('./db').connection();

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
    connection.query('SELECT * FROM Customer WHERE username = ? AND password = ?', values, callback);
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

module.exports = {
    checkAccount,
    loadAddress,
    loadAccount,
    loadAccountWithAddress,
    createAccount
}
