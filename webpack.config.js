const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
dotenv.config({ path: './app.env' });

module.exports = {
  output: {
    path: path.resolve(process.env.OUTPUT_DIR),
    publicPath: process.env.PUBLIC_PATH,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
        '@': path.resolve(process.env.SOURCE_DIR)
    },
    plugins: [
        new TsconfigPathsPlugin({
            configFile: path.resolve('./tsconfig.json')
        })
    ]
  },
  performance: {
      hints: false
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/       
        }, 
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'awesome-typescript-loader']
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'awesome-typescript-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            outputPath: 'img/',
            name: '[name].[ext]'
          }
        }, 
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/', 
            name: '[name].[ext]'
          }
        }            
    ]
  }
}; 