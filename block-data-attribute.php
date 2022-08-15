<?php
/**
 * The `Block Data Attribute` bootstrap file.
 *
 * The plugin bootstrap file.
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * Block Data Attribute is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * @link                https://www.mypreview.one
 * @since               2.0.0
 * @package             block-data-attribute
 * @author              MyPreview (Github: @mahdiyazdani, @gooklani, @mypreview)
 * @copyright           © 2015 - 2022 MyPreview. All Rights Reserved.
 *
 * @wordpress-plugin
 * Plugin Name:         Block Data Attribute
 * Plugin URI:          https://www.mypreview.one
 * Description:         This plugin designed with extensibility in mind for data that should be associated with a particular block type but need not have any defined meaning.
 * Version:             2.0.0
 * Requires at least:   5.5
 * Requires PHP:        7.4
 * Author:              Mahdi Yazdani
 * Author URI:          https://www.mahdiyazdani.com
 * License:             GPL-3.0+
 * License URI:         http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:         block-data-attribute
 * Domain Path:         /languages
 */

namespace Block_Data_Attribute;

define(
	__NAMESPACE__ . '\PLUGIN',
	array(
		'basename' => plugin_basename( __FILE__ ),
		'dir_path' => untrailingslashit( plugin_dir_path( __FILE__ ) ),
		'dir_url'  => untrailingslashit( plugin_dir_url( __FILE__ ) ),
		'slug'     => 'block-data-attribute',
	)
);

/**
 * Load the plugin text domain for translation.
 *
 * @since     2.0.0
 * @return    void
 */
function textdomain(): void {
	load_plugin_textdomain( 'block-data-attribute', false, dirname( PLUGIN['basename'] ) . '/languages' );
}
add_action( 'init', __NAMESPACE__ . '\textdomain' );

/**
 * Enqueue the plugin script after block assets have been enqueued for the editing interface.
 *
 * @since     2.0.0
 * @return    void
 */
function enqueue(): void {
	$file_path       = PLUGIN['dir_path'] . '/build/index.js';
	$file_asset_path = PLUGIN['dir_path'] . '/build/index.asset.php';
	$asset           = file_exists( $file_asset_path ) ? require $file_asset_path : array(
		'dependencies' => $dependencies,
		'version'      => filemtime( $file_path ),
	);

	wp_enqueue_script( PLUGIN['slug'], PLUGIN['dir_url'] . '/build/index.js', $asset['dependencies'] ?? array(), $asset['version'] ?? '1.0', true );
	wp_set_script_translations( PLUGIN['slug'], 'block-data-attribute', PLUGIN['dir_path'] . '/languages/' );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue' );

/**
 * Add additional helpful links to the plugin’s metadata.
 *
 * @since     2.0.0
 * @param     array  $links    An array of the plugin’s metadata.
 * @param     string $file     Path to the plugin file relative to the plugins directory.
 * @return    array
 */
function add_meta_links( array $links, string $file ): array {
	if ( PLUGIN['basename'] !== $file ) {
		return $links;
	}

	$plugin_links = array();
	/* translators: 1: Open anchor tag, 2: Close anchor tag. */
	$plugin_links[] = sprintf( _x( '%1$sCommunity support%2$s', 'plugin link', 'block-data-attribute' ), sprintf( '<a href="https://wordpress.org/support/plugin/%s" target="_blank" rel="noopener noreferrer nofollow">', PLUGIN['slug'] ), '</a>' );
	/* translators: 1: Open anchor tag, 2: Close anchor tag. */
	$plugin_links[] = sprintf( _x( '%1$sDonate%2$s', 'plugin link', 'block-data-attribute' ), sprintf( '<a href="https://www.buymeacoffee.com/mahdiyazdani" class="button-link-delete" target="_blank" rel="noopener noreferrer nofollow" title="%s">☕ ', esc_attr__( 'Donate to support this plugin', 'block-data-attribute' ) ), '</a>' );

	return array_merge( $links, $plugin_links );
}
add_filter( 'plugin_row_meta', __NAMESPACE__ . '\add_meta_links', 10, 2 );
