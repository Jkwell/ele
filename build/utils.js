var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' 
  ? config.build.assetsSubDirectory
  : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.styleLoaders = function(options) {
  var output = [] // 定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
  var loaders = exports.cssLoaders(options) // 调用cssloaders方法返回各类型的样式对象
  for (var extension in loaders) { //循环遍历loaders
      var loader = loaders[extension] // 根据extension来获得loader
      output.push({
        test: new RegExp('\\.'+extension+'$'), // 处理的文件类型
        use: loader // 用loader来处理
      })
  }
  return output
}

exports.cssLoaders = function(options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: { //options是loader的选型配置
      minimize: process.env.NODE_ENV === 'production', // 生产环境下压缩文件
      sourceMap: options.sourceMap
    }
  }
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader] // 默认是css-loader
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, { // 将loaderOptions和sourceMap组成一个对象
          sourceMap: options.sourceMap
        })
      })
    }
    if (options.extract) { // 如果传入的options存在extract且为true
      return ExtractTextPlugin.extract({
        use: loader, //要处理的loader
        fallback: 'vue-style-loader' // 没有被提取分离使用的loader
      })
    } else {
      return ['vue-style-loader'].concat(loader)
    }
  }
  return { // 返回css类型对应的loader组成的对象 generateLoaders()来生产loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}