const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const dotenv = require('dotenv');
dotenv.config({ path: './app.env' });

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: [
    path.resolve(process.env.ENTRY)
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader', 
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader', 
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                  resources: path.resolve(process.env.SCSS_VARIABLES_PATH)
              }
            }
          ]
        })
      },
    ]
  },  
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2
        }
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          comments: false,
          compress: true,
          mangle: false
        },
        sourceMap: true
      })
    ]

  },
  plugins: [
    new ExtractTextPlugin('css/[name].[hash].css'), 
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),		
    new OptimizeCSSPlugin({
        cssProcessorOptions: {
            safe: true
        }
    }),	
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template:  path.join(path.resolve(process.env.SOURCE_DIR), 'index.html'),
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    }),																			
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'static'),
        to: path.resolve(process.env.OUTPUT_DIR),
        ignore: ['.*']
      }
    ])
  ]
});