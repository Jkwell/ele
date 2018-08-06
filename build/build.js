import { mkdir } from 'fs';

// 有全局模式，允许直接在脚本中写 shell 命令。
require('shelljs/global')
// 设置环境变量是production
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
// Elegant terminal spinner 终端显示的转轮loading
var ora = require('ora')
var rm = require('rimraf') //node环境下rm -rf的命令库
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('rf', assetsPath)
mkdir('p', assetsPath)
cp('-R','static/', assetsPath)
// 开始编译
webpack(webpackConfig, function(err, stats) {
  spinner.stop()
  if (err) throw err
  // 在编译完成的回调函数中，在终端输出编译的文件
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false 
  }) + '\n')
})
