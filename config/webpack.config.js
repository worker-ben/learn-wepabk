const path = require('path');

module.exports = {
  entry: path.resolve(__dirname,'../src/demo1/index.js'),
  output: {
    path: path.resolve(__dirname, '../src/demo1/dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  cache: false,
};