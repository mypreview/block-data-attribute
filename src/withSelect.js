/**
 * External dependencies
 */
const { withSelect } = wp.data;

/**
 * Generate block data.
 */
const applyWithSelect = withSelect( ( select ) => {
	const { getSelectedBlock } = select( 'core/block-editor' );

	return {
		getSelectedBlock: getSelectedBlock(),
	};
} );

export default applyWithSelect;
