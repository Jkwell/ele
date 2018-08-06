var path = require('path')

// 针对不同的环境执行不同的操作
module.exports = {
  // 生产环境
  build: {
    env: require('./pro.env'),
    // dist目录
    index: path.resolve(__dirname, '../dist/index.html'),
    // 指向包含应用程序的所有静态资产的根目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    //这个是通过http服务器运行的url路径。在大多数情况下，这个是根目录(/)。如果你的后台框架对静态资源url前缀要求，你仅需要改变这个参数
    assetsPublicPath: '/',
    productionSourceMap: true,
    // gzip应该是服务端提供的
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    port: 9000
  },
  dev: {
    env: require('./dev.env'),
		port: 8080,
		assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 代理配置
    proxyTable: {},
    cssSourceMap: false
  }
}