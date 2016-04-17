
var mysql = require('mysql');
var connection;

// username, password
const SIGNIN = 'SELECT * FROM Account WHERE username = ? AND password = ?';
// username, password, email
const SIGNUP_ACCOUNT = 'INSERT INTO Account VALUES (?, ?, ?, "customer")';
// username, firstName, lastName, balance
const SIGNUP_CUSTOMER = 'INSERT INTO Customer VALUES(?, ?, ?, ?)';

function query(sql, values, success, error) {
    connection.query({
        sql, timeout: 10000, values
    }, function(err, rows, fields) {
        if (err) error(err);
        else success(rows, fields);
    });
}

function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on('error', function (error) {
            if (error instanceof Error) {
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");
                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }
    var connection = mysql.createConnection(config);
    addDisconnectHandler(connection);
    connection.connect(function(err) {
        if (err) console.log(err);
        else {
            console.log("Database connected");
        }
    });
    return connection;
}

var exports = {
    signin: function(values, success, error) {
        query(SIGNIN, values, success, error);
    },
    signup: function(values, success, error) {
        var account_data = [values.username, values.password, values.email];
        query(SIGNUP_ACCOUNT, account_data, function() {
            var customer_data = [values.username, values.firstName, values.lastName, 0];
            query(SIGNUP_CUSTOMER, customer_data, function() {
                var SIGNUP_ADDRESS = 'INSERT INTO Address(username, address_value) VALUES '
                var address = values.address;
                for (var i in address) {
                    if (parseInt(i) != 0) SIGNUP_ADDRESS += ',';
                    SIGNUP_ADDRESS += `('${ values.username }', '${ address[i] }')`;
                }
                if (address.length > 0) {
                    query(SIGNUP_ADDRESS, [], success, error);
                } else success();
            }, error);
        }, error);
    }
};

module.exports = function(config) {
    connection = initializeConnection(config);
    return exports;
};
