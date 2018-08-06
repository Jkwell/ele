var path = require('path')
var config = require('../config')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js','.json','.css','.vue'],
    // 如果webpack 在 resolve.root 或者 resolve.modulesDirectories 实在找不到某个模块了，会去这个（些）目录中找。
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname,'../src/common'),
      'components': path.resolve(__dirname,'../src/components')
    }
  },
  // resolveLoader相当于是针对webpack Loader 的单独 resolve 配置，
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    rules: [
      {
        enforce: 'pre', // ESLint 优先级高于其他 JS 相关的 loader
        test: /\.vue?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
       },
       {
        enforce: 'pre', // ESLint 优先级高于其他 JS 相关的 loader
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
       },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8042
        }
      }
    ]
  }
}