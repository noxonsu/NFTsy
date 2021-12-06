<?php


namespace RARIBLE\Controllers;


class CustomPostController {

	public function __construct() {
        add_action('init',  [$this,'customPost']);


	}

	public function customPost(){

        register_post_type('nft', array(
            'labels'             => array(
                'name'               => esc_html__('NFTs', 'nftcy' ), //
                'singular_name'      => esc_html__('nftcy', 'nftcy' ), // \
                'add_new'            => esc_html__('Add new', 'nftcy' ),
                'add_new_item'       => esc_html__('Add new NFT', 'nftcy' ),
                'edit_item'          => esc_html__('Edit NFT', 'nftcy' ),
                'new_item'           => esc_html__('New NFT', 'nftcy' ),
                'view_item'          => esc_html__('View NFT', 'nftcy' ),
                'search_items'       => esc_html__('Find NFT', 'nftcy' ),
                'not_found'          => esc_html__('No NFT found', 'nftcy' ),
                'not_found_in_trash' => esc_html__('No NFT found in Trash', 'nftcy' ),
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