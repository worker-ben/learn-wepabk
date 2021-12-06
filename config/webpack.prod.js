const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production',
}

exports.default = merge(baseConfig, prodConfig);