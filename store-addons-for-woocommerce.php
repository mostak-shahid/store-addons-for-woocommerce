<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://mostak-shahid.github.io/
 * @since             1.0.3
 * @package           StoreAddonsForWoocommerce\
 *
 * @wordpress-plugin
 * Plugin Name:       Store Addons for WooCommerce
 * Plugin URI:        https://mostak-shahid.github.io/plugins/store-addons-for-woocommerce.html
 * Description:       Store Addons for WooCommerce help you increase your sales with personalized products and store.
 * Version:           1.0.3
 * Author:            Md. Mostak Shahid
 * Author URI:        https://mostak-shahid.github.io/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       store-addons-for-woocommerce
 * Domain Path:       /languages
 * Requires Plugins: 		woocommerce
 * Requires at least: 		6.0
 * Tested up to:      		7.1
 * WC requires at least: 	3.0
 * WC tested up to: 		10.9
 * GitHub Plugin URI:   	mdmostakshahid/store-addons-for-woocommerce
 * GitHub Branch:       	main
 * GitHub Plugin Assets: 	true
 */

defined('ABSPATH') || exit;

/**
 * Currently plugin version.
 * Start at version 1.0.3 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('STORE_ADDONS_FOR_WOOCOMMERCE_VERSION', '1.0.3');
define('STORE_ADDONS_FOR_WOOCOMMERCE_NAME', 'Store Addons for WooCommerce');
define('STORE_ADDONS_FOR_WOOCOMMERCE_PATH', plugin_dir_path(__FILE__));
define('STORE_ADDONS_FOR_WOOCOMMERCE_URL', plugin_dir_url(__FILE__));
define('STORE_ADDONS_FOR_WOOCOMMERCE_MAIN_FILE', __FILE__);

/**
 * The core class that is used to define internationalization, 
 * caching, and others.
 */
if (file_exists(STORE_ADDONS_FOR_WOOCOMMERCE_PATH . '/vendor/autoload.php')) {
    require_once STORE_ADDONS_FOR_WOOCOMMERCE_PATH . '/vendor/autoload.php';
}

/**
 * The code that runs during plugin activation.
 * This action is documented in src/Core/Activator.php
 */
function store_addons_for_woocommerce_activate()
{
	\MosPress\StoreAddonsForWoocommerce\Core\Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in src/Core/Deactivator.php
 */
function store_addons_for_woocommerce_deactivate()
{
	\MosPress\StoreAddonsForWoocommerce\Core\Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'store_addons_for_woocommerce_activate');
register_deactivation_hook(__FILE__, 'store_addons_for_woocommerce_deactivate');

/**
 * Register WP-CLI commands only if file exists
 */
if ( defined( 'WP_CLI' ) && WP_CLI && file_exists( plugin_dir_path( __FILE__ ) . 'includes/CLI/CLI_Command.php' ) ) {
    $store_addons_for_woocommerce_cli_file = plugin_dir_path( __FILE__ ) . 'includes/CLI/CLI_Command.php';

    if ( file_exists( $store_addons_for_woocommerce_cli_file ) ) {
        WP_CLI::add_command( 'store-addons-for-woocommerce', 'MosPress\StoreAddonsForWoocommerce\CLI\CLI_Command' );
    }
}


function store_addons_for_woocommerce_run() {
    new \MosPress\StoreAddonsForWoocommerce\Plugin();
}
add_action('plugins_loaded', 'store_addons_for_woocommerce_run');



add_action( 'before_woocommerce_init', function() {
    if (
        class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class )
    ) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'cart_checkout_blocks', __FILE__, true );
    }
} );