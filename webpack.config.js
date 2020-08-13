/**
 * All of the the JavaScript compile functionality
 * for Block Data Attribute plugin reside in this file.
 *
 * @requires    Webpack
 * @package     block-data-attribute
 */
const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const WebpackNotifierPlugin = require( 'webpack-notifier' );
const chalk = require( 'chalk' );
const package = 'Block Data Attribute';
const jsonp = 'webpackBlockDataAttributeJsonp';
const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
	entry: {
		script: './src',
	},
	output: {
		path: path.resolve( __dirname, './dist/' ),
		filename: '[name].js',
		libraryTarget: 'this',
		// This fixes an issue with multiple webpack projects using chunking
		// See https://webpack.js.org/configuration/output/#outputjsonpfunction
		jsonpFunction: jsonp,
	},
	mode: NODE_ENV,
	performance: {
		hints: false,
	},
	stats: {
		all: false,
		assets: true,
		builtAt: true,
		colors: true,
		errors: true,
		hash: true,
		timings: true,
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	devtool: NODE_ENV === 'development' ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					require.resolve( 'thread-loader' ),
					{
						loader: require.resolve( 'babel-loader' ),
						options: {
							cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,
						},
					},
				],
			},
		],
	},
	externals: {
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				extractComments: false,
			} ),
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new BundleAnalyzerPlugin( {
			openAnalyzer: false,
			analyzerPort: 4001,
		} ),
		new ProgressBarPlugin( {
			format:
				chalk.blue( 'Build core script' ) + ' [:bar] ' + chalk.green( ':percent' ) + ' :msg (:elapsed seconds)',
		} ),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: true,
		} ),
		new WebpackNotifierPlugin( {
			title: package,
			alwaysNotify: true,
			skipFirstNotification: true,
		} ),
	],
};

module.exports = config;
