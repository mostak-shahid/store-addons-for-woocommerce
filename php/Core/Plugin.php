<?php
namespace MostakShahid\StoreAddonsForWoocommerce\Core;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Plugin
{
    /**
     * Initialize the plugin
     */
    public static function init()
    {
        self::define_constants();
        self::include_files();
        self::init_hooks();

    }

    /**
     * Define plugin constants
     */
    private static function define_constants()
    {
        define('ULTIMATE_SECURITY_PRO_PLUGIN_DIR', plugin_dir_path(dirname(__FILE__, 2))); // Root plugin directory
        define('ULTIMATE_SECURITY_PRO_PLUGIN_URL', plugin_dir_url(dirname(__FILE__, 2))); // Root plugin URL
        define('ULTIMATE_SECURITY_PRO_PLUGIN_VERSION', '1.0.0'); // Plugin version
    }

    /**
     * Include required files
     */
    private static function include_files()
    {
    }

    /**
     * Initialize hooks & filters
     */
    private static function init_hooks()
    {
        // \Programmelab\UltimateSecurityPro\Admin\Admin::register();
        // \Programmelab\UltimateSecurityPro\WebAuth\PlulscRestApi::register();
        // \Programmelab\UltimateSecurityPro\Passkeys\CronScheduler::register();

    }


}