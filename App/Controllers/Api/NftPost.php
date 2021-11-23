<?php

namespace RARIBLE\Controllers\Api;

use RARIBLE\ApiController;

class  NftPost extends ApiController
{

    public function action()
    {
        $items = [];

        $postID = (int) $_GET['post_id'];

        $tx = get_post_meta($postID,'rarible_tx',1);
        $item = [
            'title'              => get_the_title($postID),
            'id'                 => $postID,
            'img'                => get_the_post_thumbnail_url($postID, 'rarible-nft-image-370x245-croped'),
            'content'            => apply_filters('the_content', get_post_field('post_content', $postID)),
            'ipfs'               => get_post_meta($postID, 'rarible_IPFS',
                true),
            'owner'               => $tx['owner'] ?? '',
            'price'              => get_post_meta($postID, 'price', true),
            'order_hash'              => get_post_meta($postID, 'order_hash', true),
            'rarible_tx_item_id' => get_post_meta($postID,
                'rarible_tx_item_id', true),

        ];
//dd($tx);


        wp_send_json($item);
    }


}
