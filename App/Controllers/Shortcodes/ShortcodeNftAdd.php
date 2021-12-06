<?php


namespace RARIBLE\Controllers\Shortcodes;




use RARIBLE\Controller;
use RARIBLE\ControllerShortCode;

class ShortcodeNftAdd extends Controller
{


    public function handle()
    {

        add_shortcode( 'nftcy_addform', [$this, 'nft_add_shortcode'] );


    }
    public function nft_add_shortcode(){
        return $this->view->render('/shortcodes/rarible_nft_add.php');
    }



}
