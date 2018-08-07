var merge = require('webpack-merge')
var devEnv = require('./dev.env')
// testing必须是字符串
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})