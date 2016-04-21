var connection = require('./db').connection();

const SELECT_ONE = `SELECT * FROM Menu WHERE id = ?`;

const SELECT_RECIPES =
    `SELECT Menu_Recipe.recipe_id AS id, Menu_Recipe.amount AS amount
    FROM Menu INNER JOIN Menu_Recipe ON Menu.id = Menu_Recipe.menu_id
    WHERE Menu.id = ?`;

function loadOne(id, callback) {
    connection.query(SELECT_ONE, [id], callback);
}

function loadRecipes(id, callback) {
    connection.query(SELECT_RECIPES, [id], callback);
}

function loadOneWithRecipes(id, callback) {
    loadOne(id, function(err, rows) {
        if (!err) {
            var data = rows[0];
            if (rows.length) {
                loadRecipes(id, function(err, rows) {
                    if (!err) {
                        data.recipe = rows;
                        callback(err, data);
                    } else callback(err);
                });
            } else {
                callback(err, []);
            }
        } else callback(err);
    });
}

module.exports = {
    loadOne,
    loadRecipes,
    loadOneWithRecipes
}
