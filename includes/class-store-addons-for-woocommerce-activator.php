<?php
if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * Fired during plugin activation
 *
 * @link       https://mostak-shahid.github.io/
 * @since      1.0.0
 *
 * @package    Store_Addons_For_Woocommerce
 * @subpackage Store_Addons_For_Woocommerce/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Store_Addons_For_Woocommerce
 * @subpackage Store_Addons_For_Woocommerce/includes
 * @author     Programmelab <mostak.shahid@gmail.com>
 */
class Store_Addons_For_Woocommerce_Activator
{

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate()
	{
		$store_addons_for_woocommerce_options = store_addons_for_woocommerce_get_option();
		update_option('store_addons_for_woocommerce_options', $store_addons_for_woocommerce_options);
		add_option('store_addons_for_woocommerce_do_activation_redirect', true);
	}
}
