var connection = require('./db').connection();

const SELECT_ONE = `SELECT * FROM Store WHERE id = ?`;

const SELECT_RECIPES =
    `SELECT Stock.recipe_id AS id, Stock.amount AS amount
    FROM Store INNER JOIN Stock ON Store.id = Stock.store_id
    WHERE Store.id = ?`;

const INCREASE_RECIPE =
    `INSERT INTO Stock VALUES (?, ?, ?)
    ON DUPLICATE KEY
        UPDATE amount = amount + ?`;

const DECREASE_RECIPE = `UPDATE Stock SET amount = amount-? WHERE store_id = ? AND recipe_id = ?`;

function loadOne(id, callback) {
    connection.query(SELECT_ONE, [id], callback);
}

function loadRecipes(id, callback) {
    connection.query(SELECT_RECIPES, [id], function(err, rows) {
        if (!err) {
            data.recipe = rows;
            callback(err, data);
        } else callback(err);
    });
}

function loadOneWithRecipes(id, callback) {
    loadOne(id, function(err, rows) {
        if (!err) {
            var data = rows[0];
            if (rows.length) {
                loadRecipes(id, callback);
            } else {
                callback(err, []);
            }
        } else callback(err);
    });
}

function increaseStock(stock_id, recipe_id, amount, callback) {
    connection.query(INCREASE_RECIPE, [stock_id, recipe_id, amount, amount], function(err, rows) {
        callback(err, rows);
    });
}

function decreaseStock(stock_id, recipe_id, amount, callback) {
    connection.query(DECREASE_RECIPE, [amount, stock_id, recipe_id, amount], function(err, rows) {
        callback(err, rows);
    });
}

module.exports = {
    loadOne,
    loadRecipes,
    loadOneWithRecipes,
    increaseStock,
    decreaseStock
}
