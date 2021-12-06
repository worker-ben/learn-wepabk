const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const threadLoader = require('thread-loader');
// 速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 预热
const jsWorkerPool = {
  // options

  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
  workers: 2,

  // 闲置时定时删除 worker 进程
  // 默认为 500ms
  poolTimeout: 2000
};

// 预热
threadLoader.warmup(jsWorkerPool, ['babel-loader']);

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
  entry: {
    manager1: path.resolve(__dirname, '../src/demo3/manager1/index.js'),
    manager2: path.resolve(__dirname, '../src/demo3/manager2/index.js'),
    manager3: path.resolve(__dirname, '../src/demo3/manager3/index.js'),
    manager4: path.resolve(__dirname, '../src/demo3/manager4/index.js'),
    manager5: path.resolve(__dirname, '../src/demo3/manager5/index.js'),
    manager6: path.resolve(__dirname, '../src/demo3/manager6/index.js'),
    manager7: path.resolve(__dirname, '../src/demo3/manager7/index.js'),
    manager8: path.resolve(__dirname, '../src/demo3/manager8/index.js'),
    manager9: path.resolve(__dirname, '../src/demo3/manager9/index.js'),
    manager10: path.resolve(__dirname, '../src/demo3/manager10/index.js'),
    manager11: path.resolve(__dirname, '../src/demo3/manager11/index.js'),
    student: path.resolve(__dirname, '../src/demo3/student/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../src/demo3/dist'),
    filename: '[name]_bundle_[hash:8].js',
    crossOriginLoading: 'use-credentials',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
      {
        loader: 'thread-loader',
        options: jsWorkerPool
      },
        "babel-loader?cacheDirectory=true"
      ]
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
              // console.log('in lodash', module.resource, result);
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
      filename: 'manager.html',
      chunks: ['manager'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager1.html',
      chunks: ['manager1'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager2.html',
      chunks: ['manager2'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager3.html',
      chunks: ['manager3'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager4.html',
      chunks: ['manager4'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager5.html',
      chunks: ['manager5'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager6.html',
      chunks: ['manager6'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager7.html',
      chunks: ['manager7'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager8.html',
      chunks: ['manager8'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager9.html',
      chunks: ['manager9'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager10.html',
      chunks: ['manager10'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manager11.html',
      chunks: ['manager11'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'student.html',
      chunks: ['student'],
      hash: true,
      minify: false, // production 默认开启
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    }),
    new OptimizeCSSAssetsPlugin(),
    new CleanWebpackPlugin(),
    new SpeedMeasurePlugin(),
  ],
  cache: false,
  // devServer: {
  //   static: {
  //     directory: path.resolve(__dirname, '../src/demo2/dist'),
  //   },
  //   port: 3009,
  //   host: '127.0.0.1',
  //   hot: true,
  // }
};


