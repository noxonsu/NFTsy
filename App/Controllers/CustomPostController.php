<?php


namespace RARIBLE\Controllers;


class CustomPostController {

	const INFO_URL = 'https://rarible.wpmix.net/info.json';
	const PLUGIN_SLUG = 'rarible';
	const TRANSIENT_SLUG = 'rarible_upgrade_plugin';

	public function __construct() {
        add_action('init',  [$this,'customPost']);


	}

	public function customPost(){

        register_post_type('nft', array(
            'labels'             => array(
                'name'               => esc_html__('NFTs', 'rarible' ), //
                'singular_name'      => esc_html__('rarible', 'rarible' ), // \
                'add_new'            => esc_html__('Add new', 'rarible' ),
                'add_new_item'       => esc_html__('Add new NFT', 'rarible' ),
                'edit_item'          => esc_html__('Edit NFT', 'rarible' ),
                'new_item'           => esc_html__('New NFT', 'rarible' ),
                'view_item'          => esc_html__('View NFT', 'rarible' ),
                'search_items'       => esc_html__('Find NFT', 'rarible' ),
                'not_found'          => esc_html__('No NFT found', 'rarible' ),
                'not_found_in_trash' => esc_html__('No NFT found in Trash', 'rarible' ),
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
            'capabilities' => array(
                'create_posts' => false, // Removes support for the "Add New" function ( use 'do_not_allow' instead of false for multisite set ups )
            ),
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array('title','editor','author','thumbnail','excerpt','comments')
        ) );
    }



}