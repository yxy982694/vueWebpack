const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === 'development'
let config
const devServer = {
	port: 8081,
	host: '0.0.0.0',// 可以用localhost可以访问，ip也可以访问
	overlay: {
		errors: true
	},
	hot: true
}
const defaultPlugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: isDev?'"development"':'"production"'
		}
	}),
	new HTMLPlugin({
    template: path.join(__dirname,'template.html'),
  }),
  new VueClientPlugin()
]
if (isDev) { // 开发环境
	config = merge(baseConfig,{
		devtool: 'cheap-module-eval-source-map',
		module: {
			rules: [{
				test: /\.styl/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					'stylus-loader'
				]
			}]
		},
		devServer,
		plugins: defaultPlugins.concat([
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		  ]	
		)
	})
} else { // 生产环境
	config = merge(baseConfig,{
		entry: {
			app: path.join(__dirname,'../client/index.js'),
			vendor: ['vue']
		},
		output: {
			filename: '[name].[chunkhash:5].js'
		},
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
		plugins: defaultPlugins.concat([
			new ExtractTextPlugin({
			  filename: 'sytles.[contenthash:5].css',
			  allChunks: true,
			}),
			new webpack.optimize.CommonsChunkPlugin({
			  name: 'vendor'
			}),
			new webpack.optimize.CommonsChunkPlugin({
			  name: 'runtime'
			})
		  ]	
		)
	})
}
module.exports = config