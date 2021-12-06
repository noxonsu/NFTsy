<?php

namespace NFTCY\Controllers\Api;

use NFTCY\ApiController;

class  NftPost extends ApiController
{

    public function action()
    {


        $postID = (int) $_GET['post_id'];


        $tx = get_post_meta($postID,'nftcy_tx',1);
        $item = [
            'title'              => get_the_title($postID),
            'id'                 => $postID,
            'tokenId'                 => $tx['tokenId'] ?? '',
            'img'                => get_the_post_thumbnail_url($postID, 'nftcy-nft-image-370x245-croped'),
            'content'            => apply_filters('the_content', get_post_field('post_content', $postID)),
            'ipfs'               => get_post_meta($postID, 'nftcy_IPFS',
                true),
            'owner'               => $tx['item']['owners'][0] ?? '',
            'price'              => get_post_meta($postID, 'price', true),
            'order_hash'              => get_post_meta($postID, 'order_hash', true),
            'nftcy_tx_item_id' => get_post_meta($postID,
                'nftcy_tx_item_id', true),
            'properties' => $tx["item"]["meta"]['attributes'] ?? [],
            'contract' =>  $tx['item']['contract'] ?? [],



        ];


        wp_send_json($item);
    }


}
