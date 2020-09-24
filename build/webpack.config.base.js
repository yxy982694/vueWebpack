const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config.js')
const isDev = process.env.NODE_ENV === 'development'
let config = {
	target: 'web',
	entry: path.join(__dirname,'../client/index.js'),
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname,'../dist')
	},
	module: {
		rules: [
			{
				test:/\.(vue|js|jsx)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				enforce: 'pre'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: createVueLoaderOptions(isDev)
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(gif|jpg|png|jpeg|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'resources/[path][name]-[hash:5].[ext]'
					}
				}]
			},
		]
	}
}
module.exports = config