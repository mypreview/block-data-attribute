<?php
/**
 * The `Block Data Attribute` bootstrap file.
 *
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
 * @link              		https://www.mypreview.one
 * @since             		1.0.0
 * @package           		block-data-attribute
 * @author     		  		MyPreview (Github: @mahdiyazdani, @mypreview)
 * @copyright 		  		© 2015 - 2020 MyPreview. All Rights Reserved.
 *
 * @wordpress-plugin
 * Plugin Name:       		Block Data Attribute
 * Plugin URI:        		https://www.mypreview.one
 * Description:       		XXXXXXXX
 * Version:           		1.0.0
 * Author:            		MyPreview
 * Author URI:        		https://www.upwork.com/o/profiles/users/_~016ad17ad3fc5cce94
 * License:           		GPL-3.0
 * License URI:       		http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:       		block-data-attribute
 * Domain Path:       		/languages
 */
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    wp_die();
} // End If Statement

/**
 * Gets the path to a plugin file or directory.
 * @see 	https://codex.wordpress.org/Function_Reference/plugin_basename
 * @see 	http://php.net/manual/en/language.constants.predefined.php
 */
$plugin_data = get_file_data( __FILE__, array( 'author_uri' => 'Author URI', 'version' => 'Version' ), 'plugin' );
define( 'BLOCK_DATA_ATTRIBUTE_VERSION', $plugin_data['version'] );
define( 'BLOCK_DATA_ATTRIBUTE_AUTHOR_URI', $plugin_data['author_uri'] );
define( 'BLOCK_DATA_ATTRIBUTE_SLUG', 'block-data-attribute' );
define( 'BLOCK_DATA_ATTRIBUTE_FILE', __FILE__ );
define( 'BLOCK_DATA_ATTRIBUTE_BASENAME', basename( BLOCK_DATA_ATTRIBUTE_FILE ) );
define( 'BLOCK_DATA_ATTRIBUTE_PLUGIN_BASENAME', plugin_basename( BLOCK_DATA_ATTRIBUTE_FILE ) );
define( 'BLOCK_DATA_ATTRIBUTE_DIR_URL', plugin_dir_url( BLOCK_DATA_ATTRIBUTE_FILE ) );
define( 'BLOCK_DATA_ATTRIBUTE_DIR_PATH', plugin_dir_path( BLOCK_DATA_ATTRIBUTE_FILE ) ); 

if ( ! class_exists( 'Container_Block' ) ) :

	/**
	 * The Block Data Attribute - Class
	 */
	final class Container_Block {

		/**
         * Instance of the class.
         * 
         * @var  object   $_instance
         */
		private static $_instance = NULL;

		/**
		 * Main `Container_Block` instance
		 * Ensures only one instance of `Container_Block` is loaded or can be loaded.
		 *
		 * @access 	public
		 * @return  instance
		 */
		public static function instance() {

			if ( is_null( self::$_instance ) ) {
				self::$_instance = new self();
			} // End If Statement

			return self::$_instance;

		}

		/**
		 * Setup class.
		 *
		 * @access 	protected
		 * @return  void
		 */
		protected function __construct() {

			add_action( 'init', 																	array( $this, 'textdomain' ), 			   10 );
			add_action( 'enqueue_block_editor_assets', 												array( $this, 'editor_enqueue' ), 		   10 );
			add_filter( sprintf( 'plugin_action_links_%s', BLOCK_DATA_ATTRIBUTE_PLUGIN_BASENAME ), 	array( $this, 'additional_links' ), 	10, 1 );

		}

		/**
		 * Cloning instances of this class is forbidden.
		 *
		 * @access 	protected
		 * @return  void
		 */
		protected function __clone() {

			_doing_it_wrong( __FUNCTION__, _x( 'Cloning instances of this class is forbidden.', 'clone', 'block-data-attribute' ) , BLOCK_DATA_ATTRIBUTE_VERSION );

		}

		/**
		 * Unserializing instances of this class is forbidden.
		 *
		 * @access 	public
		 * @return  void
		 */
		public function __wakeup() {

			_doing_it_wrong( __FUNCTION__, _x( 'Unserializing instances of this class is forbidden.', 'wakeup', 'block-data-attribute' ) , BLOCK_DATA_ATTRIBUTE_VERSION );

		}

		/**
		 * Load languages file and text domains.
		 * Define the internationalization functionality.
		 *
		 * @access 	public
		 * @return  void
		 */
		public function textdomain() {

			load_plugin_textdomain( 'block-data-attribute', FALSE, dirname( dirname( BLOCK_DATA_ATTRIBUTE_PLUGIN_BASENAME ) ) . '/languages/' );

		}

		/**
	     * Register the stylesheets and JavaScript for the Gutenberg (editor) side of the site.
	     *
	     * @access   public
	     * @return   void
	     */
		public function editor_enqueue() {

			$script_path = sprintf( '%sassets/dist/script.js', BLOCK_DATA_ATTRIBUTE_DIR_PATH );
			$script_asset_path = sprintf( '%sassets/dist/script.asset.php', BLOCK_DATA_ATTRIBUTE_DIR_PATH );
			$script_asset = file_exists( $script_asset_path )  ?  require( $script_asset_path )  :  array( 'dependencies' => array( 'wp-blocks', 'wp-dom-ready' ), 'version' => filemtime( $script_path ) );
			$script_url = sprintf( '%sassets/dist/script.js', BLOCK_DATA_ATTRIBUTE_DIR_URL );
			// Enqueue the script.
			wp_enqueue_script( BLOCK_DATA_ATTRIBUTE_SLUG, $script_url, $script_asset['dependencies'], $script_asset['version'], TRUE );

		}

		/**
		 * Display additional links in plugins table page.
		 * Filters the list of action links displayed for a specific plugin in the Plugins list table.
		 *
		 * @access 	public
		 * @param   array 	$links
		 * @return  array 	$links
		 */
		public function additional_links( $links ) {

			$plugin_links = array();
			$plugin_links[] = sprintf( _x( '%sHire Me!%s', 'plugin link', 'block-data-attribute' ) , sprintf( '<a href="%s" class="button-link-delete" target="_blank" rel="noopener noreferrer nofollow" title="%s">', esc_url( BLOCK_DATA_ATTRIBUTE_AUTHOR_URI ), esc_attr_x( 'Looking for help? Hire Me!', 'upsell', 'block-data-attribute' ) ), '</a>' );

			return array_merge( $plugin_links, $links );

		}

	}
endif;

/**
 * Returns the main instance of Container_Block to prevent the need to use globals.
 *
 * @return  object(class) 	Container_Block::instance
 */
if ( ! function_exists( 'container_block_init' ) ) :
	
	function container_block_init() {

		return Container_Block::instance();

	}

	container_block_init();
endif;