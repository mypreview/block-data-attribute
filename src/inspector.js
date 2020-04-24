/**
 * External dependencies
 */
import get from 'lodash/get';
import times from 'lodash/times';
// eslint-disable-next-line no-unused-vars
import includes from 'lodash/includes';
import withSelect from './withSelect';
import allowedBlocks from './allowedBlocks';
require( 'es6-object-assign/auto' );

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, BaseControl, HorizontalRule, TextControl, RangeControl } = wp.components;

/**
 * Used to modify the block’s edit component.
 * It receives the original block BlockEdit component and returns a new wrapped component.
 *
 * @param  	{Function} 	BlockEdit 		Original component.
 * @return 	{string}            					Wrapped component.
 */
const addControls = createHigherOrderComponent( ( BlockEdit ) => {
	return withSelect( ( { ...props } ) => {
		const { attributes, setAttributes, isSelected, getSelectedBlock } = props;

		const { bdaLimit: limit, bdaData: data } = attributes;

		const onChange = ( value, key, index ) => {
			const oldData = attributes.bdaData,
				newData = oldData.slice();

			newData[ index ] = Object.assign( {}, oldData[ index ] );
			newData[ index ][ key ] = value;
			setAttributes( { bdaData: [ ...newData ] } );
		};

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
										onChange={ ( value ) => setAttributes( { bdaLimit: value } ) }
										readonly="readonly"
										step="1"
										min="1"
										max="5"
									/>
									{ times( limit, ( index ) => {
										const key = get( data, [ index, 'key' ] ),
											value = get( data, [ index, 'value' ] );

										return (
											<Fragment>
												<HorizontalRule />
												<BaseControl>
													<TextControl
														label={ __( 'Key', 'block-data-attribute' ) }
														value={ key }
														onChange={ ( newValue ) => onChange( newValue, 'key', index ) }
													/>
													<TextControl
														label={ __( 'Value', 'block-data-attribute' ) }
														value={ value }
														onChange={ ( newValue ) =>
															onChange( newValue, 'value', index )
														}
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
addFilter( 'editor.BlockEdit', 'block-data-attribute/controls', addControls );
