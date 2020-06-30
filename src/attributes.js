/**
 * External dependencies
 */
import { assign, includes, isUndefined } from 'lodash';
import allowedBlocks from './allowedBlocks';

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
	if ( isUndefined( blockSettings.attributes ) || ! includes( allowedBlocks, blockSettings.name ) )
		return blockSettings;

	return assign( {}, blockSettings, {
		attributes: assign( {}, blockSettings.attributes, {
			bdaLimit: {
				type: 'number',
				default: 1,
			},
			bdaData: {
				type: 'array',
				default: [],
			},
		} ),
	} );
}

addFilter( 'blocks.registerBlockType', 'block-data-attribute/attributes', addAttributes );
