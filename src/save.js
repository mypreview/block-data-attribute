/**
 * External dependencies
 */
import { normalizeJsonify } from '@mypreview/unicorn-js-utils';
import { assign, map, isUndefined } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * A filter that applies to the block returning a WP Element in the save function.
 * This filter is used to add extra props to the root element of the save function.
 *
 * @param  	  {Object}    extraProps    Additional props applied to save element.
 * @param  	  {Object}    blockType     Block type.
 * @param  	  {Object}    attributes    Current block attributes.
 * @return    {Object}               	Filtered props applied to save element.
 */
function addSaveProps( extraProps, blockType, attributes ) {
	const { blockDataAttribute } = attributes;

	// Bail early, in case block has no border attribute associated with it.
	if ( isUndefined( blockDataAttribute ) ) {
		return extraProps;
	}

	return assign( {}, extraProps, ...map( normalizeJsonify( blockDataAttribute ), ( { name: attrName, value } ) => ( { [ `data-${ attrName }` ]: value } ) ) );
}
addFilter( 'blocks.getSaveContent.extraProps', 'mypreview/block-data-attribute/save', addSaveProps );
