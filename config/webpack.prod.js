const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const TerserPlugin = require("terser-webpack-plugin");


const prodConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 2,
        cache: true,
      })
    ]
  },
}

exports.default = merge(baseConfig, prodConfig);