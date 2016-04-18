
var connection = require('./db').connection();

module.exports = {
    insert: function(values, callback) {
        connection.query('INSERT INTO Account VALUE (?, ?, ?, ?, ?, "customer")', values, callback);
    },
    select: function(selector, callback) {
        connection.query('SELECT * FROM Account WHERE username = ? AND password = ?', selector, callback);
    }
}
