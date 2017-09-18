const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'), // Path of client-side code directory
  entry: ['./index.js'], // (Start file)
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    publicPath: '/assets/',
    filename: 'app.js'
  },
  module: {
    rules: [
      // For all files...
      {
        test: /\.js$/, // If .js extension then
        exclude: /node_modules/, // (but not node_modules)
        use: ['babel-loader'] // Run through babel
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./style.css') // outputs css to public directory (relative to output path)
  ],
  resolve: {
    modules: [path.join(__dirname, 'node_modules')] // Where should webpack look for files referenced by import/require?
  }
};
