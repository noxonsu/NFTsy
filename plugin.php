<?php
/**
 * Plugin Name: Rarible NFT Marketplace
 * Description: Rarible NFT Marketplace
 * Author:  Victor Lerner
 * Requires PHP: 7.2
 * Text Domain: de-finance
 * Domain Path: /lang
 * Version: 1.0.0
 */

/* Define Plugin Constants */
defined('ABSPATH') || exit;
const RARIBLE_TEMPLATE_DIR = __DIR__.'/templates';
const RARIBLE_BASE_DIR    = __DIR__;
const RARIBLE_BASE_FILE = __FILE__;
const RARIBLE_VER       = '1.0.0';
const RARIBLE_NFT_ADDUSER = 1;
/**
 * Plugin Init
 */
require __DIR__.'/App/autoload.php';

/**
 * Load the plugin text domain for translation.
 */
function rarible_load_plugin_textdomain()
{
    load_plugin_textdomain('rarible', false,
        dirname(plugin_basename(__FILE__)).'/lang/');
}

add_action('plugins_loaded', 'rarible_load_plugin_textdomain');

function dd($var)
{
    var_dump($var);
    die;
}

