<?php


namespace nftcy\Controllers\Shortcodes;




use nftcy\Controller;
class ShortcodeMarketList extends Controller
{

    public function handle()
    {

        add_shortcode( 'nftcy_view', [$this, 'shortcode'] );


    }

    public function shortcode($atts, $content)
    {
        return $this->view->render('/shortcodes/nftcy_view_shortcode.php', $atts);
    }


}