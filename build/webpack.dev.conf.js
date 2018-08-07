
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 添加hot-middle-ware到入口文件中
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

//
module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  plugins: [
    // 全局定义，允许不同的行为非常有用
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // webpack为每个模块指定唯一的id，通过该插件，webpack会分析和为模块按优先级排序，为最经常使用的分配一个最小的ID 
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 启用热替换模块(Hot Module Replacement)，也被称为 HMR。
    new webpack.HotModuleReplacementPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})