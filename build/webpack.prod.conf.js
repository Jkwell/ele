var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'test' ? require('../config/test.env') : config.build.env

module.exports = {
  devtool: config.build.productionSourceMap ? '#source-map':false,
  output: {
    path: config.build.assetsRoot,
    // 导出的文件名
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 非入口文件的文件名，而又需要被打包出来的文件命名配置，如按需加载的模块
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // js文件压缩插件
    new webpack.optimize.UglifyJsPlugin({
      // 压缩配置
      sourceMap: true,
      compress: {
        warnings: false // 不显示警告
      }
    }),
    // 提取css到自己的文件中
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
      ? 'index.html'
      : config.build.index,
      template: 'index.html',
      // 默认值，script标签位于html文件的 body 底部
      inject: true,
      // 压缩html文件
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'dependency'
    })
  ]
}

