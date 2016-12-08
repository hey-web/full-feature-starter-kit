var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    entry: {
        app: path.join(__dirname, './src/index.jsx'),
        react: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'www'),
        filename: '[name].js',
        chunkFilename: "[name][hash].js"
    },
    resolve: {
        modulesDirectories: ["src", "assets", "node_modules"],
        extensions: ['', '.js', '.jsx', '.scss', 'jpg', 'jpeg', 'gif', 'png', 'svg']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel', include: path.join(__dirname, 'src')},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass'), include: path.join(__dirname, 'src'), exclude: /node_modules|lib/ },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file?name=[name][hash].[ext]&publicPath=/&outputPath=www/images/'}
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"react", /* filename= */"react.js"),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false    
            },
            comments: true,
            sourceMap: false,
            mangle: {
                except: ['$super', '$','exports','require','import']
            } 
        }),
        commonsPlugin
    ]
}
