<?php


namespace RARIBLE\Controllers;


use RARIBLE\Controller;

class MenuPageController extends Controller {




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
            esc_html__('NFT Marketplace', 'rarible'),
            esc_html__('NFT Marketplace', 'rarible'),
            'manage_options',
            'nft',
            [$this, 'page'],
            'dashicons-admin-site-alt3',
            81
        );
    }

    public function page()
    {

        $this->handleRequest();

        return $this->view->display('/settings.php');
    }

    public function handleRequest()
    {


        if ( ! empty($_POST['rarible_nft_networkName'])) {
            update_option("rarible_nft_networkName",$_POST['rarible_nft_networkName']);
        }



        if (!empty($_POST)) {
            ?>
            <div id="message" class="notice notice-success is-dismissible">
                <p><?php esc_html_e('Settings saved','rarible'); ?></p>
                <button type="button" class="notice-dismiss"><span
                        class="screen-reader-text"><?php esc_html_e('Dismiss this notice.','rarible'); ?></span>
                </button>
            </div>
            <?php
        }

    }
}