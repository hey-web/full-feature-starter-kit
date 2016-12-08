var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    devtool: 'sourcemap',
    entry: {
        app: path.join(__dirname, './src/index.jsx'),
        react: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'www'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: "index.js"
    },
    resolve: {
     extensions: ['', '.js', '.jsx', '.scss', 'jpg', 'jpeg', 'gif', 'png', 'svg']
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src'), exclude: /node_modules|lib/},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass'), include: path.join(__dirname, 'src'), exclude: /node_modules|lib/ },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file?name=images/[name].[ext]&publicPath=/&outputPath=www/images/'}
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"react", /* filename= */"react.bundle.js"),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("development") 
            }
        }),
        new CopyWebpackPlugin([ { from: 'lib/'} ]),
        commonsPlugin,
        new webpack.HotModuleReplacementPlugin()
    ]

}
