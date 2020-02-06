/**
 * All of the the JavaScript compile functionality 
 * for Block Data Attribute plugin reside in this file.
 *
 * @requires    Webpack
 * @package     block-data-attribute
 * @author      MyPreview (Github: @mahdiyazdani, @mypreview)
 */
const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const chalk = require( 'chalk' );
const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    entry: {
        'script': './assets/src/index.js'
    },
    output: {
        path: path.resolve( __dirname, './assets/dist/' ),
        filename: '[name].js',
        libraryTarget: 'this',
        // This fixes an issue with multiple webpack projects using chunking
        // See https://webpack.js.org/configuration/output/#outputjsonpfunction
        jsonpFunction: 'webpackBlockDataAttributeJsonp'
    },
    mode: NODE_ENV,
    performance: {
        hints: false
    },
    stats: {
        all: false,
        assets: true,
        builtAt: true,
        colors: true,
        errors: true,
        hash: true,
        timings: true
    },
    watchOptions: {
        ignored: /node_modules/
    },
    devtool: NODE_ENV === 'development'  ?  'source-map'  :  false,
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory'
            }
        ],
    },
    externals: {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    },
    optimization: {
        minimizer: [ 
            new UglifyJsPlugin( {
                cache: true,
                parallel: true,
                uglifyOptions: {
                    output: {
                        ie8: false,
                        comments: false
                    }
                }
            } )
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin( {
            format: chalk.blue( 'Build core script' ) + ' [:bar] ' + chalk.green( ':percent' ) + ' :msg (:elapsed seconds)',
        } ),
        new DependencyExtractionWebpackPlugin( { 
            injectPolyfill: true 
        } )
    ]
};

module.exports = config;