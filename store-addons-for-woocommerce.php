<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://programmelab.com/
 * @since             1.0.0
 * @package           Store_Addons_For_Woocommerce
 *
 * @wordpress-plugin
 * Plugin Name:       Store Addons for WooCommerce
 * Plugin URI:        https://programmelab.com/store-addons-for-woocommerce/
 * Description:       Store addons for woocommerce boilerplate for WordPress
 * Version:           1.0.0
 * Author:            Md. Mostak Shahid
 * Author URI:        https://programmelab.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       store-addons-for-woocommerce
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('STORE_ADDONS_FOR_WOOCOMMERCE_VERSION', '1.0.0');
define('STORE_ADDONS_FOR_WOOCOMMERCE_NAME', 'Store Addons for WooCommerce');

define('STORE_ADDONS_FOR_WOOCOMMERCE_PATH', plugin_dir_path(__FILE__));
define('STORE_ADDONS_FOR_WOOCOMMERCE_URL', plugin_dir_url(__FILE__));



/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-store-addons-for-woocommerce-activator.php
 */
function store_addons_for_woocommerce_activate()
{
	require_once STORE_ADDONS_FOR_WOOCOMMERCE_PATH . 'includes/class-store-addons-for-woocommerce-activator.php';
	Store_Addons_For_Woocommerce_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-store-addons-for-woocommerce-deactivator.php
 */
function store_addons_for_woocommerce_deactivate()
{
	require_once STORE_ADDONS_FOR_WOOCOMMERCE_PATH . 'includes/class-store-addons-for-woocommerce-deactivator.php';
	Store_Addons_For_Woocommerce_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'store_addons_for_woocommerce_activate');
register_deactivation_hook(__FILE__, 'store_addons_for_woocommerce_deactivate');

if (file_exists(STORE_ADDONS_FOR_WOOCOMMERCE_PATH . '/vendor/autoload.php')) {
	require_once STORE_ADDONS_FOR_WOOCOMMERCE_PATH . '/vendor/autoload.php';
}
/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require STORE_ADDONS_FOR_WOOCOMMERCE_PATH . 'includes/class-store-addons-for-woocommerce.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function store_addons_for_woocommerce_run()
{

	$plugin = new Store_Addons_For_Woocommerce();
	$plugin->run();
}
store_addons_for_woocommerce_run();

function store_addons_for_woocommerce_get_tabs()
{
	$store_addons_for_woocommerce_tabs = [];
	/*$store_addons_for_woocommerce_tabs = [
		'integration' => [
			'slug' => 'integration',
			'name' => 'Restrictions',
			'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
			'url' => 'store-addons-for-woocommerce',
			'sub' => [
				'security-for-woocommerce' => [
					'slug' => 'security-for-woocommerce',
					'name' => 'Settings',
					'description' => 'Below you will find all the settings you need to restrict specific countires and IP addressses that you wish to restrict for your WooCommerce site. The restrictons will be applied to your WooCommerce pages.',
					'url' => 'store-addons-for-woocommerce'
				],
				'customize' => [
					'slug' => 'customize',
					'name' => 'Customize',
					'description' => 'Below you will find all the settings you need to customize restriction pages including the images that the visitor will see if they are restricted from accessing the website. The customization will be applied to your WooCommerce pages.',
					'url' => 'store-addons-for-woocommerce-integration-customize'
				],
			],
		],
	];*/
	// Apply filter to allow modification of $variable by other plugins
	$store_addons_for_woocommerce_tabs = apply_filters('store_addons_for_woocommerce_tabs_modify', $store_addons_for_woocommerce_tabs);

	return $store_addons_for_woocommerce_tabs;
}

function store_addons_for_woocommerce_get_default_options()
{
	$store_addons_for_woocommerce_default_options = [
		'settings' => [
			'enable_buy_together' => 1,
			'enable_product_addons' => 1,
			'enable_product_badge' => 1,
		],
		'buy_together' => [
			'title' => 'Buy Together',
		],
		'product_addons' => [
			'title' => 'Product Addons',
		],
		'product_badge' => [
			'sale_badge' => 'badge-1',
		],
		'base_input' => [
			'text_input' => '',
			'email_input' => '',
			'color_input' => '',
			'date_input' => '',
			'datetime_local_input' => '',
			'textarea_input' => '',
			'switch_input' => '1',
			'radio_input' => 'radio-2',
			'datalist_input' => '',
			'select_input' => '',
		],
		'array_input' => [
			'checkbox_input' => [],
			'multi_select_input' => [],
		],
		'components' => [
			'basic' => [
				'ip' => '',
				'text_field' => 'this is a text field',
				'textarea_field' => 'this is a textarea field',
				'select_field' => 'select-1',
				'radio_field' => 'radio-1',
				'radio_field_2' => 'radio-2',
				'checkbox_field' => ['checkbox-1', 'checkbox-3'],
				'checkbox_field_2' => ['checkbox-2', 'checkbox-3'],
				'checkbox_field_3' => ['checkbox-1', 'checkbox-3'],
				'multiselect_field' => ['select-2', 'select-3'],
				'multiselect_field_2' => ['select-3', 'select-4'],
				'switch' => 0,
			],
			'advanced' => [
				'media_uploader' => [
					'url' => '',
					'id' => 0
				],
				'countries_list' => [
					['value' => "Albania", 'code' => "AL"],
					['value' => "Algeria", 'code' => "DZ"],
				],
				'ips' => ["111.111.111.111", "222.222.222.222"],
				'emails' => ["asd@asd.asd", "abc@abc.abc"],
				'repeatablesorter_group' => [
					[
						"enabler" => true,
						"title" => "123 Main St",
						"note" => "Leave at door",
						"enable" => true,
						"gender" => "male",
						"country" => "us",
						"languages" => ["en", "fr"],
						"hobbies" => ["reading", "sports"],
					]
				],
				'repeatablesorter' => [
					'https://www.facebook.com/',
					'https://web.whatsapp.com/',
					'https://www.youtube.com/',
					'https://web.skype.com/'
				]
			]
		]
		// 'editor-input' => '<p>Lorem</p>',

	];
	$store_addons_for_woocommerce_default_options = apply_filters('store_addons_for_woocommerce_default_options_modify', $store_addons_for_woocommerce_default_options);

	return $store_addons_for_woocommerce_default_options;
}

// update_option('store_addons_for_woocommerce_options', store_addons_for_woocommerce_get_default_options());

function store_addons_for_woocommerce_get_option()
{
	$store_addons_for_woocommerce_options_database = get_option('store_addons_for_woocommerce_options', []);
	$store_addons_for_woocommerce_options = array_replace_recursive(store_addons_for_woocommerce_get_default_options(), $store_addons_for_woocommerce_options_database);
	return $store_addons_for_woocommerce_options;
}
function store_addons_for_woocommerce_is_plugin_page()
{
	if (function_exists('get_current_screen')) {
		$current_screen = get_current_screen();
		$tabs = store_addons_for_woocommerce_get_tabs();
		$pages = [];
		if (isset($tabs) && sizeof($tabs)) {
			foreach ($tabs as $tab) {
				$pages[] = 'admin_page_' . $tab['url'];
				if (isset($tab['sub']) && sizeof($tab['sub'])) {
					foreach ($tab['sub'] as $subtab) {
						$pages[] = 'admin_page_' . $subtab['url'];
					}
				}
			}
		}

		if (
			$current_screen->id == 'toplevel_page_store-addons-for-woocommerce'
			|| $current_screen->id == 'store-addons-for-woocommerce_page_store-addons-for-woocommerce-react'
			|| in_array($current_screen->id, $pages)
		) {
			return true;
		}
	}
	return false;
}
/**
 * Load plugin textdomain.
 */
// function store_addons_for_woocommerce_load_textdomain() {
//     load_plugin_textdomain(
//         'store-addons-for-woocommerce',
//         false,
//         dirname( plugin_basename( __FILE__ ) ) . '/languages'
//     );
// }
// add_action( 'init', 'store_addons_for_woocommerce_load_textdomain' );
