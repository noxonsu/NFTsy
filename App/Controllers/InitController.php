<?php


namespace RARIBLE\Controllers;


class InitController
{


    public function __construct()
    {
        add_action('init', [$this, 'init'], 500);
    }

    public function init()
    {
        add_image_size( 'rarible-nft-image-370x245-croped', 370, 245, true );

    }



}