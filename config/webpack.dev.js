const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');

const devConfig = {
  mode: 'development',
};

exports.default = merge(baseConfig, devConfig);
