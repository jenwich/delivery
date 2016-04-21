
var connection = require('./db').connection();

module.exports = {
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
