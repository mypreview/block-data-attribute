/**
 * External dependencies
 */
import { get, times, includes, escape, filter, assign } from 'lodash';
import allowedBlocks from './allowedBlocks';

/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;

/**
 * A filter that applies to the block returning a WP Element in the save function.
 * This filter is used to add extra props to the root element of the save function.
 *
 * @param  	{Object} 	extraProps 		Additional props applied to save element.
 * @param  	{Object} 	blockType  		Block type.
 * @param  	{Object} 	attributes 		Current block attributes.
 * @return 	{Object}            		Filtered props applied to save element.
 */
function addSaveProps( extraProps, blockType, attributes ) {
	const extraAttrs = {};
	const { bdaLimit: limit, bdaData: data } = attributes;

	if ( includes( allowedBlocks, blockType.name ) ) {
		const filterData = filter( data, ( o ) => o.value );
		{
			times( limit, ( index ) => {
				const key = get( filterData, [ index, 'key' ] ),
					value = get( filterData, [ index, 'value' ] );

				if ( !! key && !! value ) extraAttrs[ `data-${ escape( key ) }` ] = escape( value );
			} );
		}
	} // End If Statement

	return assign( extraProps, extraAttrs );
}

addFilter( 'blocks.getSaveContent.extraProps', 'block-data-attribute/save', addSaveProps );
