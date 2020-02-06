module.exports = {
	presets: [ '@wordpress/babel-preset-default' ],
	plugins: [
		[ "@babel/plugin-proposal-object-rest-spread", { 
			"loose": true, 
			"useBuiltIns": true 
		} ],
		[ "@wordpress/babel-plugin-makepot", {
		   "output": "languages/block-data-attribute-js.pot"
		} ]
	]
};