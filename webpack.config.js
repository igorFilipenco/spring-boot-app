const path = require('path');
const webpack = require('webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

const BUILD_DIR = path.resolve(__dirname, 'src/main/resources/static/build');
const ASSETS_PATH = path.resolve(__dirname, 'src/main/resources/static/assets');
const TEMPLATE_PATH = path.join(ASSETS_PATH, '/templates');
const VIEWS_PATH = path.resolve(__dirname, 'src/main/resources/templates');


var webpack_config = {
	context: ASSETS_PATH,

	entry: {
		main: [
			"react",
			"react-dom",
			"react-router"
		],
		react_app: path.join(ASSETS_PATH, "/js/index.jsx"),
	},

	output: {
		path: BUILD_DIR,
		filename: 'js/[name].min.js',
		publicPath: '/build',
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
				exclude: /node_modules/
			},
			{
				test: /\.(ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}
			},
			{
				test: /\.(eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'media/'
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
						outputPath: 'images/'
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
							publicPath: '/css/'
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
		new WebpackManifestPlugin(),
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: [
				BUILD_DIR,
				VIEWS_PATH
			]
		}),
		new HtmlWebpackPlugin({
			title: ' React-APP | Spring-Boot-React-App ',
			template: path.join(TEMPLATE_PATH, '/index.html'),
			filename: path.join(VIEWS_PATH, '/index.html'),
			chunks: ['main', 'react_app']
		}),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.join(ASSETS_PATH, '/media/favicon'),
				to: path.join(BUILD_DIR, '/media/favicon'),
				toType: 'dir',
			}]
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: '[id].css',
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {discardComments: {removeAll: true}},
			canPrint: true
		}),
	],

	stats: {
		env: true,
		colors: true,
		builtAt: true,
		warnings: true,
		errors: true,
		errorDetails: true,
		children: false,

		assets: true,
		entrypoints: true,
		chunks: true,
		chunksSort: "size",

		modules: false,
		modulesSort: "size",
		logging: true,
		loggingTrace: true,
		moduleTrace: true,
	},
};

module.exports = webpack_config;