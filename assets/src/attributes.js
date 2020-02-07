/**
 * Internal dependencies
 */
import includes from 'lodash/includes';
import allowedBlocks from './allowedBlocks';
require( 'es6-object-assign/auto' );

/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;

/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param 	{Object}   blockSettings    Original block settings.
 * @return 	{Object} 			   		Filtered block settings.
 */
function addAttributes( blockSettings ) {
	if ( 'undefined' === typeof blockSettings.attributes || ! allowedBlocks.includes( blockSettings.name ) ) return blockSettings;

	return lodash.assign( {}, blockSettings, {
        attributes: lodash.assign( {}, blockSettings.attributes, {
            bdaLimit: {
				type: 'number',
				default: 1
			},
			bdaData: {
		        type: 'array',
		        default: []
		    }
        } )
    } );
}

addFilter(
	'blocks.registerBlockType',
	'block-data-attribute/attributes',
	addAttributes
);