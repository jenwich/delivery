
var mysql = require('mysql');
var connection;

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
    connection = mysql.createConnection(config);
    addDisconnectHandler(connection);
    connection.connect(function(err) {
        if (err) console.log(err.stack);
        else {
            console.log("Database connected");
        }
    });
}

module.exports = {
    connection: function() {
        return connection;
    },
    createConnection: function(config) {
        initializeConnection(config);
        return connection;
    },
    query: function() {
        connection.query.apply(connection, arguments)
    }
}

