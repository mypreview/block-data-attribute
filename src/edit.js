/**
 * External dependencies
 */
import includes from 'lodash/includes';

/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter, applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import Constants from './constants';
import { Inspector } from './components';

/**
 * Override the default edit UI to include toolbar controls or Inspector controls.
 *
 * @param     {JSX.Element}    BlockEdit    Original component.
 * @return    {JSX.Element}                 Wrapped component.
 */
const withInspectorControl = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { name } = props;
		const allowedBlocks = applyFilters( 'mypreview.blockDataAttributeAllowedBlocks', Constants.ALLOWED_BLOCKS );

		return (
			<>
				<BlockEdit { ...props } />
				<Inspector { ...props } doRender={ includes( allowedBlocks, name ) } />
			</>
		);
	},
	'withInspectorControl'
);
addFilter( 'editor.BlockEdit', 'mypreview/block-data-attribute/inspector', withInspectorControl );
