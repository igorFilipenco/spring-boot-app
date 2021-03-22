const path = require('path');
const webpack = require('webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ASSETS_PATH = './assets';
const JS_PATH = 'src/main/resources/static/assets/js'
const TEMPLATE_PATH = 'src/main/resources/static/assets/templates'
const VIEWS_PATH = 'src/main/resources/templates'
const BUILD_DIR = path.resolve(__dirname, 'src/main/resources/static/build/');

var webpack_config = {

	context: path.resolve(__dirname, ASSETS_PATH),

	entry: {
		main: [
			"react",
			"react-dom",
			"react-router"
		],
		react_app: path.resolve(__dirname, JS_PATH) + "/index.jsx",
	},

	output: {
		filename: 'js/[name].min.js',
		publicPath: '/build',
		path: BUILD_DIR
	},

	resolve: {
		extensions: [' ', '.web.js', '.js', '.jsx', 'css'],
	},

	devtool: ("production" === process.env.NODE_ENV) ? "source-map" : "eval-source-map",

	watchOptions: {
		poll: true
	},

	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				loader: 'babel-loader?compact=true&comments=true&minified=true',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/react',
					],
					plugins: [
						'@babel/plugin-proposal-class-properties'
					],
					babelrc: false,
				},
				exclude: /node_modules/
			},
			{
				test: /\.(ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '/fonts/'
					}
				}
			},
			{
				test: /\.(eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '/media/'
					}
				}
			},
			{
				test: /\.jpe?g$|\.ico$|\.gif$|\.png$/,
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
					options: {
						limit: 1024 * 10,
						name: '[name].[ext]',
						outputPath: '/images/'
					}
				}
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/css'
						}
					}
					, 'css-loader'],
			},
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: [
				BUILD_DIR,
				VIEWS_PATH
			]
		}),
		new HtmlWebpackPlugin({
			title: ' React-APP | Spring-Boot-React-App ',
			template: path.resolve(__dirname, TEMPLATE_PATH) + '/index.html',
			filename: path.resolve(__dirname, VIEWS_PATH) + '/index.html',
			chunks: ['main', 'react_app']
		}),
		new CopyWebpackPlugin([
			{
				patterns: [
					{
					from: './images/favicon',
					to: './images/favicon',
					toType: 'dir'
				}
				]
			}
		]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {discardComments: {removeAll: true}},
			canPrint: true
		}),
	]
};

module.exports = webpack_config;