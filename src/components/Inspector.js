/**
 * External dependencies
 */
import { HtmlAttrs } from '@mypreview/unicorn-react-components';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { ifCondition } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Inspector Controls appear in the post settings sidebar when a block is being edited.
 *
 * @see 	  https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar/
 * @param 	  {Object} 	       props 				  Block meta-data properties.
 * @param 	  {Object} 	       props.attributes 	  Available block attributes and their corresponding values.
 * @param     {Function}       props.setAttributes    Function to update individual attributes based on user interactions.
 * @return    {JSX.Element} 						  Inspector element to render.
 */
function Inspector( { attributes, setAttributes } ) {
	const { blockDataAttribute } = attributes;

	return (
		<InspectorControls>
			<PanelBody initialOpen title={ __( 'Block Data Attribute', 'block-data-attribute' ) }>
				<HtmlAttrs
					onChange={ ( value ) => setAttributes( { blockDataAttribute: value } ) }
					otherAddButtonProps={ {
						label: __( 'Add attribute', 'block-data-attribute' ),
					} }
					otherNameProps={ {
						label: __( 'Name', 'block-data-attribute' ),
					} }
					otherValueProps={ {
						label: __( 'Value', 'block-data-attribute' ),
					} }
					value={ blockDataAttribute }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

Inspector.propTypes = {
	attributes: PropTypes.object.isRequired,
	setAttributes: PropTypes.func.isRequired,
	colors: PropTypes.array.isRequired,
};

Inspector.defaultProps = {
	attributes: {},
	setAttributes: () => {},
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( Inspector );
