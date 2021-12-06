<?php

namespace NFTCY\Controllers\Api;

use NFTCY\ApiController;

class  TrashNftPost extends ApiController
{

    public function action()
    {

        $postId = intval($_REQUEST['postId']);

        $salt = get_post_meta($postId, '_salt', true);

        if ($salt == $_REQUEST['salt']) {
            wp_trash_post($postId);
            wp_send_json(
                ['success' => true,]
            );

        }
        wp_send_json(['success' => false], 403);
    }

}
