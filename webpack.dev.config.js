const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config({ path: './app.env' });

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: [
    path.resolve(process.env.ENTRY),
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://${process.env.DEV_SERVER_HOST}:${process.env.DEV_SERVER_PORT}`,
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true, 
    hotOnly: true,
    host: process.env.DEV_SERVER_HOST,
    port: +process.env.DEV_SERVER_PORT,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,             
        use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            'postcss-loader'
        ]
      }, 
      {
          test: /\.scss$/,
          use: [
              'style-loader',
              'css-loader', 
              'postcss-loader',
              'resolve-url-loader',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                    resources: path.resolve(process.env.SCSS_VARIABLES_PATH)
                }
              }
          ]
      },
    ]
  },  
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template:  path.join(path.resolve(process.env.SOURCE_DIR), 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: '"development"'
      }
    }),  
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ]
});