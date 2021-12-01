<?php

namespace RARIBLE\Controllers\Api;

use RARIBLE\ApiController;

class  TrashNftPost extends ApiController
{

    public function action()
    {
        $postId = intval($_REQUEST['postId']);

        $salt = get_post_meta($postId, '_salt', true);
        if ($salt == $_REQUEST['salt']) {
            wp_send_json(
                ['success' => true,]
            );
        }
        wp_send_json(['success' => false], 403);
    }

}
