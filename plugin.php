<?php
/**
 * Plugin Name: nftcy NFT Marketplace
 * Description: nftcy NFT Marketplace
 * Author:  Victor Lerner
 * Requires PHP: 7.2
 * Text Domain: de-finance
 * Domain Path: /lang
 * Version: 1.0.0
 */

/* Define Plugin Constants */
defined('ABSPATH') || exit;
const NFTCY_TEMPLATE_DIR = __DIR__.'/templates';
const NFTCY_BASE_DIR    = __DIR__;
const NFTCY_BASE_FILE = __FILE__;
const NFTCY_VER       = '1.0.0';
const NFTCY_NFT_ADDUSER = 1;
/**
 * Plugin Init
 */
require __DIR__.'/App/autoload.php';

/**
 * Load the plugin text domain for translation.
 */
function nftcy_load_plugin_textdomain()
{
    load_plugin_textdomain('nftcy', false,
        dirname(plugin_basename(__FILE__)).'/lang/');
}

add_action('plugins_loaded', 'nftcy_load_plugin_textdomain');

function dd($var)
{
    var_dump($var);
    die;
}

