var connection = require('./db').connection();

module.exports = {
    loadOne: function(id, callback) {
        connection.query('SELECT * FROM Recipe WHERE id = ?', [id], callback);
    }
}
