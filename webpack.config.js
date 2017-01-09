var webpack = require('webpack');
var path = require('path');

const hrm = 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'

module.exports = {
    devtool: 'sourcemap',
    entry: {
        app: [hrm, './src/index'],
        vendor: [hrm, 'react', 'react-dom', 'redux', 'redux-logger', 'redux-thunk', 'react-redux']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/js/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.json', '.jpg', '.png']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot','babel'], include: path.join(__dirname, 'src') },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: path.join(__dirname, 'src') },
            { test: /.(png|jpg|jpeg|svg)$/, loader: 'file' }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(chunkName="vendor", filename="vendor.js"),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        // Webpack 1.0
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("development") 
            }
        }),
    ]
};
