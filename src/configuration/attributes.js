/**
 * External dependencies
 */
import { get, assign, includes, isUndefined } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter, applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import Constants from '../constants';

/**
 * Filters registered block settings.
 * Registering border attribute for the blocks.
 *
 * @param     {Object}    settings    Original block settings.
 * @param     {string}    name        Block name.
 * @return    {Object} 				  Filtered block settings.
 */
function addAttributes( settings, name ) {
	// Bail early, in case block as no attributes associated with.
	if ( isUndefined( get( settings, 'attributes' ) ) ) {
		return settings;
	}

	const allowedBlocks = applyFilters( 'mypreview.blockDataAttributeAllowedBlocks', Constants.ALLOWED_BLOCKS );

	// Bail early, in case the block is not supposed to have a border module.
	if ( ! includes( allowedBlocks, name ) ) {
		return settings;
	}

	return assign( {}, settings, {
		attributes: assign( {}, get( settings, 'attributes' ), {
			blockDataAttribute: {
				type: 'string',
			},
		} ),
	} );
}
addFilter( 'blocks.registerBlockType', 'mypreview/block-data-attribute/attribute', addAttributes, 99 );
