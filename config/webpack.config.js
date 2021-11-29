const path = require('path');

module.exports = {
  entry: path.resolve(__dirname,'../src/demo2/index.js'),
  output: {
    path: path.resolve(__dirname, '../src/demo2/dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      }
    }]
  },
  cache: false,
};