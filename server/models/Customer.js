
var connection = require('./db').connection();

module.exports = {
    insert: function(values, callback) {
        connection.query('INSERT INTO Customer VALUE (?, 0)', values, callback);
    },
}
