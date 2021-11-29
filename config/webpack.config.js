const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/demo2/index.js'),
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
    },
    {
      test: /\.css$/,
      use: [{
        loader: "style-loader",
        options: { injectType: "styleTag" }
      }, "css-loader"]
    },
    {
      test: /\.less$/,
      use: [{
        loader: "style-loader",
        options: { injectType: "styleTag" }
      }, "css-loader", "less-loader"]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    }
    ]
  },
  cache: false,
  watch: true,
  watchOptions: {
    ignored: /node_modules/, // 不监听的文件
    aggregateTimeout: 300, // 监听到变化后，延迟 300ms 后执行，默认 300ms
    poll: 1000, // 每秒检查一次变动
  }
};

  
