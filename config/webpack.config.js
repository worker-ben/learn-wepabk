const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 三方库
const vendor = [
  'node_modules/react',
  'node_modules/react-dom',
  'node_modules/antd',
  'node_modules/@ant-design',
  'node_modules/lodash',
];

// 自己写的 component
const component = ['src/demo3/component/'];

module.exports = {
  entry: path.resolve(__dirname, '../src/demo5/index.js'),
    // manager: path.resolve(__dirname, '../src/demo3/manager/index.js'),
    // student: path.resolve(__dirname, '../src/demo3/student/index.js'),
  
  output: {
    path: path.resolve(__dirname, '../src/demo5/dist'),
    filename: '[name]_bundle_[chunkhash:8].js',
    crossOriginLoading: 'use-credentials',
  },
  mode: 'production',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: "babel-loader"
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
  optimization: {
    // 如果没有 splitChunks 打出来的将会是一份大JS
    splitChunks: {
      minSize: 1024,
      cacheGroups: {
        // 分离基础包
        lodash: {
          test(module) {
            if (module.resource) {
              const result = module.resource.indexOf('/node_modules/lodash/') > -1 || module.resource.indexOf('/node_modules/react-dom/') > -1;
              console.log('in lodash', module.resource, result);
              return result;
            } else {
              return false;
            }
          },
          name: 'lodash',
          chunks: 'all', // 同步引入的包
        },
        antd: {
          test: /(node_modules\/antd|node_modules\/@ant-design)/,
          name: 'antd',
          chunks: 'all', // 同步引入的包
        },
        // 分离公共代码
        common: {
          test(module) {
            const exclude = [...vendor, ...component];
            if (module.resource) {
              return (
                // 在 node_modules 里面且不在 exclude 里面
                module.resource.indexOf('node_modules') > -1 &&
                exclude.every(vendor => module.resource.indexOf(vendor) === -1)
              );
            } else {
              return false;
            }
          },
          name: 'common',
          chunks: 'all', // 同步引入的包
          // minChunks: 2, // 最小引用次数
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'student.html',
    //   hash: true,
    //   chunks: ['student'],
    //   minify: false, // production 默认开启
    //   template: path.resolve(__dirname, '../template/index.html'),
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'manager.html',
    //   hash: true,
    //   chunks: ['manager'],
    //   minify: false, // production 默认开启
    //   template: path.resolve(__dirname, '../template/index.html'),
    // }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    }),
    new OptimizeCSSAssetsPlugin(),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  cache: false,
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/, // 不监听的文件
  //   aggregateTimeout: 300, // 监听到变化后，延迟 300ms 后执行，默认 300ms
  //   poll: 1000, // 每秒检查一次变动
  // },
};


