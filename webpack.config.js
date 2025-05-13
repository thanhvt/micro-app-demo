const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_NAME = 'micro-app-demo';
const APP_PATH = '/micro-app-demo'; // This should match the path in the host app

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      // Trong môi trường phát triển, sử dụng tên file cố định để dễ dàng tích hợp
      filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/main.js',
      // Đảm bảo publicPath luôn đúng trong mọi môi trường
      publicPath: isProduction ? APP_PATH + '/' : '/',
      clean: true,
      // Cấu hình để đảm bảo biến global được đăng ký đúng cách
      library: {
        name: 'micro_app_demo',
        type: 'window',
        export: 'default',
      },
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 3001,
      historyApiFallback: true,
      // Cấu hình CORS để cho phép host app truy cập
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
      // Cho phép tất cả các host truy cập
      allowedHosts: 'all',
      // Bật hot module replacement
      hot: true,
      // Cấu hình để log ít hơn
      devMiddleware: {
        stats: 'minimal',
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash:8][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),
    ],
  };
};
