<?php

namespace NFTCY\Controllers\Api;

use NFTCY\ApiController;

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
        if (isset($_POST['IPFS'][1])) {
            update_post_meta(
                $this->postId,
                'nftcy_IPFS',
                sanitize_text_field($_POST['IPFS'])
            );
        }

        if (isset($_POST['price'])) {
            update_post_meta(
                $this->postId,
                'price',
                sanitize_text_field($_POST['price'] ?? 0)
            );
        }

        if (isset($_POST['tx']) && !empty($_POST['tx'])) {
            update_post_meta($this->postId, 'nftcy_tx', $_POST['tx']);

        }
        update_post_meta(
            $this->postId,
            'nftcy_tx_item_id',
            sanitize_text_field($_POST['tx_item_id'] ?? '')
        );
        update_post_meta(
            $this->postId,
            'order_hash',
            sanitize_text_field($_POST['order_hash'] ?? '')
        );

        if ($_POST['type'] ?? false) {
            update_post_meta(
                $this->postId,
                '_type',
                sanitize_text_field($_POST['type'] ?? '')
            );
        }
    }

}

