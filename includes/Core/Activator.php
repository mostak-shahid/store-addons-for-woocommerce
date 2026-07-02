<?php

namespace MosPress\StoreAddonsForWoocommerce\Core;
/**
 * Fired during plugin activation
 *
 * @link       https://mostak-shahid.github.io/
 * @since      1.0.3
 *
 * @package    StoreAddonsForWoocommerce
 * @subpackage StoreAddonsForWoocommerce/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.3
 * @package    StoreAddonsForWoocommerce
 * @subpackage StoreAddonsForWoocommerce/includes
 * @author     Md. Mostak Shahid <mostak.shahid@gmail.com>
 */
class Activator
{

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.3
	 */
	public static function activate()
	{
		// $store_addons_for_woocommerce_options = store_addons_for_woocommerce_get_option();
		// update_option('store_addons_for_woocommerce_options', $store_addons_for_woocommerce_options);
		add_option('store_addons_for_woocommerce_do_activation_redirect', true);

        // Flush rewrite rules
        flush_rewrite_rules();

        // Set activation flag for any one-time notices
        set_transient( 'store_addons_for_woocommerce_activation_notice', true, 30 );
	}
}



