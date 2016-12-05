var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');

module.exports = {
    devtool: 'sourcemap',
    entry: {
        app: path.join(__dirname,'src/index.jsx'),
        react: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        root: path.join(__dirname,'src'),
        modulesDirectories: ["src", "node_modules"],
        extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src')},
            {test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src')},
            {test: /\.scss$/, loaders: ['style', 'css', 'sass']}
        ]
    },
    plugins: [  new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"react", /* filename= */"react.bundle.js"),
                commonsPlugin,
                new webpack.HotModuleReplacementPlugin({hot: true})]
};