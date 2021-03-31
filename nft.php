<?php
/**
Plugin Name: NFT Marketplace
Description: NFT Marketplace
Author: NoxonThemes
Requires PHP: 7.1
Text Domain: nft
Domain Path: /lang
Version: 1.0.4
 */
/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'NFT_TEMPLATE_DIR', __DIR__ );
define( 'NFT_BASE_DIR', __DIR__ );
define( 'NFT_BASE_FILE', __FILE__ );
define( 'NFT_VER', "1.0.5");

/**
 * Plugin Init
 */
require __DIR__ . '/App/autoload.php';

/**
 * Never worry about cache again!
 */
function nft_load_scripts($hook) {

    // create my own version codes

    $my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'build/main.css' ));
    $my_css_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'build/main.js' ));

	wp_enqueue_script( 'nft-js', plugins_url( 'build/main.js', __FILE__ ), array(), $my_js_ver , true);

	wp_register_style( 'nft-css',    plugins_url( 'build/main.css',    __FILE__ ), false,   $my_css_ver );
	wp_enqueue_style ( 'nft-css' );
}

add_action('wp_enqueue_scripts', 'nft_load_scripts');


add_shortcode( 'nft_addform', 'nft_add_shortcode' );
function nft_add_shortcode( $atts ){
	if ( isset( $_GET['delete_offer']{1} ) ) {
		wp_delete_post( sanitize_text_field( $_GET['delete_offer'] ) );
		wp_safe_redirect( esc_url( home_url( '/' ) ) );
	}
	
	return '<div id="root"></div><script>alert("network:"'.update_option("nft_networkName").')</script>';
}
