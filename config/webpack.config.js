const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, '../src/demo2/index.js'),
  output: {
    path: path.resolve(__dirname, '../src/demo2/dist'),
    filename: 'bundle_[chunkhash:8].js',
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
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    },
    {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: 'img/[name]_[hash].[ext]'
        }
      }]
    }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    }),
  ],
  cache: false,
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/, // 不监听的文件
  //   aggregateTimeout: 300, // 监听到变化后，延迟 300ms 后执行，默认 300ms
  //   poll: 1000, // 每秒检查一次变动
  // },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../src/demo2/dist'),
    },
    port: 3009,
    host: '127.0.0.1',
    hot: true,
  }
};


