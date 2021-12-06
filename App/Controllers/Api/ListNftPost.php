<?php

namespace NFTCY\Controllers\Api;

use NFTCY\ApiController;

class  ListNftPost extends ApiController
{

    public function action()
    {
        $items = [];
        $paged = (int) sanitize_text_field( $_GET['page_number'] ?? 1);

        $args  = array(
           'paged' => $paged,
            'post_type'      => 'nft',
            'posts_per_page' => 20,
        );
        $query = new \WP_Query($args);
        if ($query->have_posts()) {
            while ($query->have_posts()) : $query->the_post();
                $tx = get_post_meta(get_the_ID(),'nftcy_tx',1);
                $items['items'][] = [
                    'title' => get_the_title(),
                    'id' => get_the_ID(),
                    'img'  =>           get_the_post_thumbnail_url(),
                    'content'  =>           get_the_excerpt(),
                    'ipfs' =>  get_post_meta(get_the_ID(),'nftcy_IPFS',true),
                    'price' =>  get_post_meta(get_the_ID(),'price',true),
                    'nftcy_tx_item_id' =>  get_post_meta(get_the_ID(),'nftcy_tx_item_id',true),
                    'order_hash'              => get_post_meta(get_the_ID(), 'order_hash', true),
                    'owner'               => $tx['item']['owners'][0] ?? '',
                ];
            endwhile;

            $items['max_num_pages'] = $query->max_num_pages;
            $items['page_number'] = $query->query_vars['paged'];

            wp_reset_postdata();
        }
        wp_send_json($items);

    }


}
