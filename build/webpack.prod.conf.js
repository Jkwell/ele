var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'test' ? require('../config/test.env') : config.build.env

module.exports = {
  devtool: config.build.productionSourceMap ? '#source-map':false,
  output: {
    path: config.build.assetsRoot,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
}

