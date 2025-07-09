<?php
/**
 * Plugin Name:     Store Addons For Woocommerce
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     store-addons-for-woocommerce
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Store_Addons_For_Woocommerce
 */

// Your code starts here.
if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Load Composer autoloader
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
}

// Register activation and deactivation hooks
register_activation_hook(__FILE__, ['MostakShahid\\StoreAddonsForWoocommerce\\Core\\Activator', 'activate']);
register_deactivation_hook(__FILE__, ['MostakShahid\\StoreAddonsForWoocommerce\\Core\\Deactivator', 'deactivate']);

// Initialize the plugin
use MostakShahid\StoreAddonsForWoocommerce\Core\Plugin;

Plugin::init();
