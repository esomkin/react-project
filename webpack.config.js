const path = require('path')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

	entry: './public/src/index.js',
	output: {

		path: path.resolve(__dirname, './public/build/'),
		publicPath: '/build/',
		filename: 'index.js'
	},
	module: {

		loaders: [

			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/, use: ExtractTextPlugin.extract({

				fallback: 'style-loader', 
				use: 'css-loader'
			}) },
			// { test: /\.(gif|png|jpg|svg)$/, loader: 'url-loader' },
			{ test: /\.(gif|png|jpg|svg)$/, loader: 'file-loader' },
		]
	},
	devServer: {

		contentBase: './public',
		historyApiFallback: {

			index: 'index.html'
		},
		setup: (app) => {

			app.set('views', './application/views')
			app.set('view engine', 'pug')

			app.use(bodyParser.urlencoded({ 

				extended: false 
			}))
			app.use(bodyParser.json())

			const routes = require('./application/controllers')

			app.use(routes)
		}
	},
	plugins: [

		new webpack.ProvidePlugin({

			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		}),
		new ExtractTextPlugin('index.css')
		/*,
		new webpack.DefinePlugin({

			'process.env': {

				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({

			minimize: true
		})
		*/
	]
}