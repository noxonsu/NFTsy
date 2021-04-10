<?php
/**
Plugin Name: NFT Marketplace
Description: NFT Marketplace
Author: NoxonThemes
Requires PHP: 7.1
Text Domain: nft
Domain Path: /lang
Version: 1.0.32
/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'NFT_TEMPLATE_DIR', __DIR__ );
define( 'NFT_BASE_DIR', __DIR__ );
define( 'NFT_BASE_FILE', __FILE__ );
define( 'NFT_VER', "1.0.6");
define( 'NFT_ADDUSER', 1);

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
    $my_css_ver2  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'build/list.css' ));

	wp_enqueue_script( 'nft-js', plugins_url( 'build/main.js', __FILE__ ), array(), $my_js_ver , true);

	wp_register_style( 'nft-css',    plugins_url( 'build/main.css',    __FILE__ ), false,   $my_css_ver );
	wp_register_style( 'nft-css2',    plugins_url( 'build/list.css',    __FILE__ ), false,   $my_css_ver2 );
	wp_enqueue_style ( 'nft-css' );
	wp_enqueue_style ( 'nft-css2' );
}

add_action('wp_enqueue_scripts', 'nft_load_scripts');


add_shortcode( 'nft_addform', 'nft_add_shortcode' );
function nft_add_shortcode( $atts ){
	ob_start();
	include(NFT_TEMPLATE_DIR."/add.php");
	return ob_get_clean();
	//return '<div id="root"></div><script>alert("network:"'.get_option("nft_networkName").')</script>';
}



add_shortcode( 'nft_view_shortcode', 'nft_view_shortcode' );
function nft_view_shortcode( $atts ){
	ob_start();
	include(NFT_TEMPLATE_DIR."/list.php");
	return ob_get_clean();
	//return '<div id="root"></div><script>alert("network:"'.get_option("nft_networkName").')</script>';
}


add_action('init', 'nft_custom_init');
function nft_custom_init(){
	register_post_type('nft', array(
		'labels'             => array(
			'name'               => esc_html__('NFTs', 'nft' ), // Основное название типа записи
			'singular_name'      => esc_html__('NFT', 'nft' ), // отдельное название записи типа Book
			'add_new'            => esc_html__('Add new', 'nft' ),
			'add_new_item'       => esc_html__('Add new NFT', 'nft' ),
			'edit_item'          => esc_html__('Edit NFT', 'nft' ),
			'new_item'           => esc_html__('New NFT', 'nft' ),
			'view_item'          => esc_html__('View NFT', 'nft' ),
			'search_items'       => esc_html__('Find NFT', 'nft' ),
			'not_found'          => esc_html__('No NFT found', 'nft' ),
			'not_found_in_trash' => esc_html__('No NFT found in Trash', 'nft' ),
			'parent_item_colon'  => '',
			'menu_name'          => esc_html__('NFTs')

		  ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => true,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array('title','editor','author','thumbnail','excerpt','comments')
	) );
}


