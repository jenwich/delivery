
var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";

var entryPoints = {
    "index": ['./index.js'],
    "signin": ['./signin.js'],
    "register": ['./register.js'],
    "order": ['../Order/index.js'],
    "customerOrder": ['../CustomerOrder/index.js'],
    "managerOrder": ['../ManagerOrder/index.js'],
    "managerMenus": ['../ManagerMenus/index.js'],
};

var vendors = ['react'];

var getEntry = function(entryPoints, debug) {
    if (debug) {
        for (var i in entryPoints) {
            entryPoints[i].unshift('webpack/hot/dev-server');
        }
    }
    entryPoints['vendors'] = vendors;
    return entryPoints;
};

module.exports = {
    context: path.join(__dirname, './src/entry'),
    entry: getEntry(entryPoints, debug),
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                },
                include: [
                    path.resolve(__dirname, './src')
                ],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: debug? []: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};
