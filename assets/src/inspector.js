/**
 * Internal dependencies
 */
import get from 'lodash/get';
import times from 'lodash/times';
import includes from 'lodash/includes';
import withSelect from './withSelect';
import allowedBlocks from './allowedBlocks';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { compose, createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, BaseControl, HorizontalRule, TextControl, RangeControl } = wp.components;

/**
 * Used to modify the block’s edit component. 
 * It receives the original block BlockEdit component and returns a new wrapped component.
 *
 * @param  	{function|Component} 	BlockEdit 		Original component.
 * @return 	{string}            					Wrapped component.
 */
const addControls = createHigherOrderComponent( BlockEdit => {
	return withSelect( ( { ...props } ) => {
		const {
			attributes,
			setAttributes,
			isSelected,
			getSelectedBlock
		} = props;

		const { 
            bdaLimit: limit,
            bdaData: data } = attributes;

        const onChange = ( value, key, index ) => {
			const data = attributes.bdaData,
				  newData = data.slice();

			newData[index] = Object.assign( {}, data[index] );
			newData[index][key] = value;
			setAttributes( { bdaData: [...newData] } );
		}

		return (
            <Fragment>
                <BlockEdit { ...props } />
                { isSelected && (
                	<Fragment>
	                	{ allowedBlocks.includes( getSelectedBlock.name ) && (
		                	<InspectorControls>
		                		<PanelBody 
		                            title={ __( 'Data Attributes', 'block-data-attribute' ) }
		                            initialOpen={ false }
		                        >
		                        	<RangeControl
				                        label={ __( 'Number of Attributes', 'block-data-attribute' ) }
				                        value={ limit }
				                        onChange={ value => setAttributes( { bdaLimit: value } ) }
				                        readonly="readonly"
				                        step="1"
				                        min="1"
				                        max="5"
				                    />
		                        	{ times( limit, ( index ) => {
										const key = get( data, [index, 'key'] ),
											  value = get( data, [index, 'value'] );

										return (
											<Fragment>
												<HorizontalRule/>
												<BaseControl>
													<TextControl
												        label={ __( 'Key', 'block-data-attribute' ) }
												        value={ key }
												        onChange={ value => onChange( value, 'key', index ) }
												    />
												    <TextControl
												        label={ __( 'Value', 'block-data-attribute' ) }
												        value={ value }
												        onChange={ value => onChange( value, 'value', index ) }
												    />
												</BaseControl>
											</Fragment>
										);
									} ) }
		                        </PanelBody>
		                	</InspectorControls>
	                	) }
                	</Fragment>
                ) }
            </Fragment>
        );
	} );
}, 'addControls' );
addFilter( 
	'editor.BlockEdit', 
	'block-data-attribute/controls',
	addControls 
);