<?php

namespace RARIBLE\Controllers\Api;

use RARIBLE\ApiController;

class  UpdateNftPost extends ApiController
{
    private $postId;

    public function action()
    {

        $this->postId = $_POST['postId'];
        $this->updatePostMeta();
        $return = array(
            'success' => true,

        );

        wp_send_json($return);
    }


    private function updatePostMeta()
    {


        update_post_meta($this->postId, 'rarible_IPFS',
            sanitize_text_field($_POST['IPFS'] ?? 0));
        update_post_meta($this->postId, 'rarible_tx',
            ($_POST['tx'] ?? ''));
        update_post_meta($this->postId, 'rarible_tx_item_id',
            sanitize_text_field($_POST['tx_item_id'] ?? ''));
        update_post_meta($this->postId, 'order_hash',
            sanitize_text_field($_POST['order_hash'] ?? ''));

        if($_POST['type'] ?? false){
            update_post_meta($this->postId, '_type',
                sanitize_text_field($_POST['type'] ?? ''));
        }
    }

}

