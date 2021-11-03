<?php


namespace RARIBLE\Controllers\Shortcodes;




use RARIBLE\Controller;
class ShortcodeMarketList extends Controller
{

    public function handle()
    {

        add_shortcode( 'rarible_nft_view', [$this, 'shortcode'] );


    }

    public function shortcode($atts, $content)
    {
       return $this->view->render('/shortcodes/rarible_nft_view_shortcode.php', $atts);
    }


}