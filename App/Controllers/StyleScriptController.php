<?php


namespace NFTCY\Controllers;


class StyleScriptController
{


    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'frontendScriptsStyle'], 500);
        add_action('admin_enqueue_scripts', [$this, 'adminScriptsStyle'], 500);
        add_action( 'admin_print_scripts-' . 'nft_page_nft-add', [$this, 'frontendScriptsStyle'] );

    }
    public function adminScriptsStyle(){
        wp_enqueue_style('nftcy_main_css',   plugins_url('/assets/css/main.css', NFTCY_BASE_FILE));
    }

    public function frontendScriptsStyle()
    {
        if ($this->isDevelopServer()) {
            wp_enqueue_script('nftcy_vue_prod',
                'http://localhost:8080/js/chunk-vendors.js', array('jquery'),
                '1', true);
            wp_enqueue_script('nftcy_vue_dev', 'http://localhost:8080/js/app.js',
                array('jquery'), '1', true);
            wp_enqueue_style('nftcy_vue-style', 'http://localhost:8080/css/app.css');
            wp_enqueue_style('nftcy_vue-style-chunk',
                'http://localhost:8080/css/chunk-vendors.css');
        } else {
            wp_enqueue_script('nftcy_vue_prod',
                plugins_url('/vendor/dist', NFTCY_BASE_FILE)
                .'/js/chunk-vendors.js',
                array('jquery'), md5(time()), true);
            wp_enqueue_script('nftcy_vue_prod2',
                plugins_url('/vendor/dist', NFTCY_BASE_FILE).'/js/app.js',
                array('jquery'),     md5(time()), true);
            wp_enqueue_style('nftcy_vue-style',
                plugins_url('/vendor/dist', NFTCY_BASE_FILE).'/css/app.css',
                [], md5(time()));
            wp_enqueue_style('nftcy_vue-style-vendor',
                plugins_url('/vendor/dist', NFTCY_BASE_FILE)
                .'/css/chunk-vendors.css' , [], md5(time()));
        }
        wp_enqueue_style('fonts-google-Roboto',
            urldecode($this->googleFontsUrl('Roboto:400,100italic,100,300,300italic,400italic,500,500italic,700,700italic,900,900italic')));
        $args_obj = array(
            'ajaxurl'  => esc_url(site_url()).'/wp-admin/admin-ajax.php',
            'site_url' => esc_url(site_url()),
            'networkName' => get_option('nftcy_nft_networkName','ropsten'),
            'collection' => get_option('nftcy_nft_collection','0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05'),
            'enable_bid' =>  get_option('nftcy_nft_bid',0),

        );

        wp_localize_script('nftcy_vue_prod', 'nftcy_obj', $args_obj);
    }

    function isDevelopServer(): bool
    {
        return boolval(@fsockopen('localhost', '8080'));
    }

    function googleFontsUrl($fonts_param)
    {
        $font_url = '';
        /*
        Translators: If there are characters in your language that are not supported
        by chosen font(s), translate this to 'off'. Do not translate into your own language.
         */
        if ('off' !== esc_html_x('on', 'Google font: on or off', 'city2')) {
            $font_url = add_query_arg('family', urlencode($fonts_param),
                "//fonts.googleapis.com/css");
        }
        $font_url = str_replace('%2B', '+', $font_url);

        return $font_url;
    }


}