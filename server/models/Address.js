
var connection = require('./db').connection();

module.exports = {
    insert: function(values, callback) {
        connection.query('INSERT INTO Address VALUE (?, 0)', values, callback);
    },
    insertMultiple: function(values, callback) {
        var sql = 'INSERT INTO Address(username, address_value) VALUES ';
        values.address.forEach(function(item, index) {
            if (index != 0) sql += ',';
            sql += `('${ values.username }', '${ item }')`;
        });
        if (values.address.length > 0) {
            connection.query(sql, callback);
        } else callbock()
    }
}
