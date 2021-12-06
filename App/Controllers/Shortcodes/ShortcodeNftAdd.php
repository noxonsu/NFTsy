<?php


namespace NFTCY\Controllers\Shortcodes;




use NFTCY\Controller;
use NFTCY\ControllerShortCode;

class ShortcodeNftAdd extends Controller
{


    public function handle()
    {

        add_shortcode( 'nftcy_addform', [$this, 'nft_add_shortcode'] );


    }
    public function nft_add_shortcode(){
        return $this->view->render('/shortcodes/nftcy_nft_add.php');
    }



}