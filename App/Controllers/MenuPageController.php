<?php


namespace NFTCY\Controllers;


use NFTCY\Controller;

class MenuPageController extends Controller
{


    /**
     *
     */
    public function handle()
    {
        add_action('admin_menu', array($this, 'menu'));
    }

    public function menu()
    {
        add_menu_page(
            esc_html__('NFT Marketplace', 'nftcy'),
            esc_html__('NFT Marketplace', 'nftcy'),
            'manage_options',
            'nft',
            [$this, 'page'],
            'dashicons-admin-site-alt3',
            81
        );




        add_submenu_page(
            'edit.php?post_type=nft', //$parent_slug
            'Tutorial Subpage Example',  //$page_title
            esc_html__('Add nft', 'nftcy'),        //$menu_title
            'manage_options',           //$capability
            'nft-add',//$menu_slug
            [$this, 'addNftInAdmin'] //$function,

        );

    }

    public function addNftInAdmin()
    {

        echo do_shortcode('[nftcy_nft_addform]');
    }

    public function page()
    {
        $this->handleRequest();

        return $this->view->display('/settings.php');
    }

    public function handleRequest()
    {
        if ( ! empty($_POST)) {
            if ( ! empty($_POST['nftcy_nft_networkName'])) {
                update_option(
                    "nftcy_nft_networkName",
                    sanitize_text_field($_POST['nftcy_nft_networkName'])
                );
            }
            if ( ! empty($_POST['nftcy_nft_collection'])) {
                update_option(
                    "nftcy_nft_collection",
                    sanitize_text_field($_POST['nftcy_nft_collection'])
                );
            }

            if ( ! empty($_POST['nftcy_nft_bid'])) {
                update_option(
                    "nftcy_nft_bid",
                    sanitize_text_field($_POST['nftcy_nft_bid'])
                );
            } else {
                update_option("nftcy_nft_bid", 0);
            }
        }

        if ( ! empty($_POST)) {
            ?>
            <div id="message" class="notice notice-success is-dismissible">
                <p><?php
                    esc_html_e('Settings saved', 'nftcy'); ?></p>
                <button type="button" class="notice-dismiss"><span
                        class="screen-reader-text"><?php
                        esc_html_e('Dismiss this notice.', 'nftcy'); ?></span>
                </button>
            </div>
            <?php
        }
    }
}