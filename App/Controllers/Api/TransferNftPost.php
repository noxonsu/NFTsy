<?php

namespace NFTCY\Controllers\Api;

use NFTCY\ApiController;

class  TransferNftPost extends ApiController
{

    /**
     * get from api ETH owner
     */
    public function action()
    {
        $postID             = $_POST['postId'];
        $basePathMainNet    = "https://ethereum-api.rarible.org";
        $basePathRopstenNet = "https://ethereum-api-dev.rarible.org";
        $nft_network        = get_option('nftcy_nft_networkName', 'ropsten');
        $basePath           = $nft_network == 'ropsten' ? $basePathRopstenNet
            : $basePathMainNet;


        $nftId    = get_post_meta(
            $postID,
            'nftcy_tx_item_id',
            true
        );
        $response = wp_remote_get(
            $basePath.'/v0.1/nft/items/'.$nftId,
            array(
                'timeout'     => 5,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking'    => true,
                'headers'     => array(),
                'body'        => null, //
                'cookies'     => array(),
            )
        );
        if (wp_remote_retrieve_response_code($response) === 200) {
            $body         = json_decode(
                wp_remote_retrieve_body($response),
                true
            );
            $currentOwner = $body['owners'][0];

            $tx           = get_post_meta($postID, 'nftcy_tx', 1);

            if ($currentOwner != $tx['item']['owners'][0]) {
                $tx['item']['owners'][0] = $currentOwner;

                update_post_meta(
                    $postID,
                    'order_hash',
                    ''
                );
                 update_post_meta(
                     $postID,
                     'nftcy_tx',
                     $tx
                 );

                wp_send_json(
                    [
                        'success' => true,
                        'changed' => true,

                    ]
                );
            } else {
                wp_send_json(
                    [
                        'success' => true,
                        'changed' => false,

                    ]
                );
            }
        }

        wp_send_json(
            [
                'success' => false,

            ]
        );
    }


}
