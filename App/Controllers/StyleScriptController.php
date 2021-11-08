<?php


namespace RARIBLE\Controllers;


class StyleScriptController
{


    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'frontendScriptsStyle'], 500);
    }

    public function frontendScriptsStyle()
    {

        if ($this->isDevelopServer()) {
            wp_enqueue_script('vue_prod',
                'http://localhost:8080/js/chunk-vendors.js', array('jquery'),
                '1', true);
            wp_enqueue_script('vue_dev', 'http://localhost:8080/js/app.js',
                array('jquery'), '1', true);
            wp_enqueue_style('vue-style', 'http://localhost:8080/css/app.css');
            wp_enqueue_style('vue-style-chunk',
                'http://localhost:8080/css/chunk-vendors.css');
        } else {
            wp_enqueue_script('vue_prod',
                plugins_url('/vendor/dist', RARIBLE_BASE_FILE)
                .'/js/chunk-vendors.js',
                array('jquery'), '1', true);
            wp_enqueue_script('vue_prod2',
                plugins_url('/vendor/dist', RARIBLE_BASE_FILE).'/js/app.js',
                array('jquery'),
                '1', true);
            wp_enqueue_style('vue-style',
                plugins_url('/vendor/dist', RARIBLE_BASE_FILE).'/css/app.css');
            wp_enqueue_style('vue-style-vendor',
                plugins_url('/vendor/dist', RARIBLE_BASE_FILE).'/css/chunk-vendors.css');
        }
        $args_obj = array(
            'ajaxurl' => esc_url( site_url() ) . '/wp-admin/admin-ajax.php',
            'site_url' => esc_url( site_url() ),

        );

        wp_localize_script('vue_prod', 'rarible_obj', $args_obj);
    }

    function isDevelopServer(): bool
    {
        return boolval(@fsockopen('localhost', '8080'));
    }


}