var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'production'
? require('./webpack.prod.conf')
: require('./webpack.dev.conf')

var port = process.env.PORT || config.dev.port

var proxyTable = config.dev.proxyTable

var app = express()

var appData = require('../data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

// 设置路由
var apiRoutes = express.Router()

apiRoutes.get('./seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

apiRoutes.get('/goods', function (req, res) {
	res.json({
		errno: 0,
		data: goods
	});
});

apiRoutes.get('/ratings', function (req, res) {
	res.json({
		errno: 0,
		data: ratings
	});
});

app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(
	compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true,
			chunks: false
		}
	})

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// 强制页面刷新，当html-webpack-plugin模板改变
compiler.plugin('compilation', function(compilation) {
	// 注册html-webpack-plugin的事件
	compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
		// 发布事件
		hotMiddleware.publish({action: 'reload'})
		cb()
	})
})

// 代理api请求
Object.keys(proxyTable).forEach(function(context) {
	var options = proxyTable[context]
	if (typeof options === 'string') {
		options = {target: options}
	}
	app.use(proxyMiddleware(context, options))
})
// 处理html5history api
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

// 设置静态资源目录
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function(err) {
	if (err) return
	console.log('Listening at http://localhost:'+ port +'\n')
})