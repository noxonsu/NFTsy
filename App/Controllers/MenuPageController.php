<?php
namespace NFT\Controllers;

use NFT\Controller;

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
            esc_html__('NFT Marketplace', 'nft'),
            esc_html__('NFT Marketplace', 'nft'),
            'manage_options',
            'NFT',
            [$this, 'page'],
            'dashicons-admin-site-alt3',
            81
        );
    }

    public function page()
    {
		
        $this->handleRequest();
		include(NFT_TEMPLATE_DIR."/settings.php");
		
    }

    public function handleRequest()
    {

		if ( ! empty($_POST['nft_networkName'])) update_option("nft_networkName",$_POST['nft_networkName']);



		if (!empty($_POST)) {
            ?>
            <div id="message" class="notice notice-success is-dismissible">
            <p><?php esc_html_e('Settings saved','nft'); ?></p>
                <button type="button" class="notice-dismiss"><span
                            class="screen-reader-text"><?php esc_html_e('Dismiss this notice.','nft'); ?></span>
                </button>
            </div>
            <?php
		}

    }


}
