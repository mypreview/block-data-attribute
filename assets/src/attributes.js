/**
 * Internal dependencies
 */
import includes from 'lodash/includes';
import allowedBlocks from './allowedBlocks';

/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;
const { hasBlockSupport } = wp.blocks;

/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param 	{Object}   settings    Original block settings.
 * @return 	{Object} 			   Filtered block settings.
 */
function addAttributes( settings ) {
	if ( 'undefined' !== typeof settings.attributes ) {
		if ( allowedBlocks.includes( settings.name ) ) {
			settings.attributes = Object.assign( settings.attributes, {
				bdaLimit: {
					type: 'number',
					default: 1
				},
				bdaData: {
			        type: 'array',
			        default: []
			    }
			} );
		}
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'block-data-attribute/attributes',
	addAttributes
);