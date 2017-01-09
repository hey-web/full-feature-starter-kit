var express = require('express')
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

var app = express();

app.use(require("webpack-dev-middleware")(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
  path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.use(express.static('www'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})