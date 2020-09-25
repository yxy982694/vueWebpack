const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
let config

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: '#source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname,'../server-build')
  },
  // 不打包这些文件
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
      	test: /\.styl/,
      	use: ExtractTextPlugin.extract({
      		fallback: 'vue-style-loader',
      		use: [
      			'css-loader',
      			{
      				loader: 'postcss-loader',
      				options: {
      					sourceMap: true
      				}
      			},
      			'stylus-loader'
      		]
      	})
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"server"'
      }
    }),
    new ExtractTextPlugin('sytles.[contenthash:5].css'),
    new VueServerPlugin()
  ]
})

module.exports = config
