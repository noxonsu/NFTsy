<?php
/**
Plugin Name: NFT Marketplace
Description: NFT Marketplace
Author: NoxonThemes
Requires PHP: 7.1
Text Domain: nft
Domain Path: /lang
Version: 1.0.0
 */
/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'NFT_BASE_DIR', __DIR__ );
define( 'NFT_BASE_FILE', __FILE__ );
define( 'NFT_VER', "1.0.0");

/**
 * Plugin Init
 */


/**
 * Never worry about cache again!
 */
function nft_load_scripts($hook) {

    // create my own version codes
    $my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'lib/nft.js' ));
    $my_css_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'nft.css' ));

	wp_enqueue_script( 'nft-js', plugins_url( 'lib/nft.js', __FILE__ ), array(), $my_js_ver );

	wp_register_style( 'nfta-css',    plugins_url( 'nft.css',    __FILE__ ), false,   $my_css_ver );
	wp_enqueue_style ( 'nft-css' );
}
add_action('wp_enqueue_scripts', 'nft_load_scripts');


add_shortcode( 'nft', 'nft_addform' );
function nft_main_shortcode( $atts ){
	 return "тут форма";
}
