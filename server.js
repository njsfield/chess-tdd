const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware'); // webpack will re-run any time a JS file is changed
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();

// Init webpack config
const compiler = webpack(webpackConfig);

// Set public dir
app.use(express.static(__dirname + '/public'));

// Enable Dev Middleware
app.use(
  webpackDevMiddleware(compiler, {
    hot: true, // Reloading supported
    filename: 'app.js',
    publicPath: '/js/',
    stats: {
      colors: true
    },
    historyApiFallback: true
  })
);

// Main server
// Apply 'localhost' as IP context
const server = app.listen(3000, 'localhost', function() {
  const host = server.address().address || 'localhost'; // e.g localhost
  const port = server.address().port || 3000; // e.g. 3000
  console.log(`Example app listening at http://${host}:${port}`);
});
