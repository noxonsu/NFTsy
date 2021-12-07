<?php


namespace NFTCY\Controllers;


use NFTCY\Controller;

class NftcyViewController
{
    public function __construct()
    {
        add_filter('single_template', [$this, 'template']);
    }

    public function template()
    {
        global $post;

        /* Checks for single template by post type */
        if ($post->post_type == 'nft') {
            return NFTCY_TEMPLATE_DIR . '/nft/single.php';
        }
    }


}