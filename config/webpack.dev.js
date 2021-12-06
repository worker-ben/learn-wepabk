const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');
// 速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const devConfig = {
  mode: 'development',
  // devServer: {
  //   static: {
  //     directory: path.resolve(__dirname, '../src/demo5/dist'),
  //   },
  //   port: 3009,
  //   host: '127.0.0.1',
  //   hot: true,
  // },
  plugins: [new SpeedMeasurePlugin()]
};

exports.default = merge(baseConfig, devConfig);
