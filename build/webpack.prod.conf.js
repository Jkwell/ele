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
    new webpack.optimize.OccurrenceOrderPlugin(),
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
    }),
    // 分割vendor文件到自己的文件中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
       // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
       minChunks: function(module, count) {
         return (
           // 声明公共的模块来自node_modules文件夹
           module.resource && /\.js$/.test(module.resource) && module.resource.indexOf
           (path.join(__dirname, '../node_modules'))
         ) === 0
       } 
    }),
    //上面虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化。
    //下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
}

