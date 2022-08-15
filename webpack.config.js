const { resolve } = require( 'path' );
const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );

module.exports = {
	...defaultConfig,
	entry: {
		index: resolve( process.cwd(), 'src', 'index.js' ),
	},
};
