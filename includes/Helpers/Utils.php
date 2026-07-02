<?php
namespace MosPress\StoreAddonsForWoocommerce\Helpers;
if ( ! defined( 'ABSPATH' ) ) exit;
use WP_Roles;
class Utils {
	public static function store_addons_for_woocommerce_is_plugin_page()
	{
		if (function_exists('get_current_screen')) {
			$current_screen = get_current_screen();
			// var_dump($current_screen->id);
			$pages = [];
			if (
				$current_screen->id == 'toplevel_page_store-addons-for-woocommerce'
				|| in_array($current_screen->id, $pages)
			) {
				return true;
			}
		}
		return false;
	}
	/**
	 * Get the client's IP address.
	 *
	 * @return string The client's IP address.
	 */
	public static function get_client_ip()
	{
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			return sanitize_text_field( wp_unslash($_SERVER['HTTP_CLIENT_IP']));
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			return sanitize_text_field( wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
		} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
			return sanitize_text_field( wp_unslash($_SERVER['REMOTE_ADDR']));
		}
	}


	public static function get_header_footer_kses() {
		return array(
			'script' => array(
				'type' => true,
				'src' => true,
				'async' => true,
				'defer' => true,
				'crossorigin' => true,
				'integrity' => true,
				'nonce' => true,
			),
			'style' => array(
				'type' => true,
				'media' => true,
			),
			'link' => array(
				'rel' => true,
				'href' => true,
				'type' => true,
				'media' => true,
				'crossorigin' => true,
				'integrity' => true,
			),
			'meta' => array(
				'name' => true,
				'content' => true,
				'charset' => true,
				'http-equiv' => true,
				'property' => true,
			),
		);
	}

	public static function store_addons_for_woocommerce_get_default_options()
	{
		$store_addons_for_woocommerce_default_options = [];
		$store_addons_for_woocommerce_default_options = apply_filters('store_addons_for_woocommerce_default_options_modify', $store_addons_for_woocommerce_default_options);
		return $store_addons_for_woocommerce_default_options;
	}

	public static function store_addons_for_woocommerce_get_default_options_details()
	{
		$store_addons_for_woocommerce_default_options_details = [];
		$store_addons_for_woocommerce_default_options_details = apply_filters('store_addons_for_woocommerce_default_options_details_modify', $store_addons_for_woocommerce_default_options_details);
		return $store_addons_for_woocommerce_default_options_details;
	}
	public static function store_addons_for_woocommerce_get_default_colors()
	{
		$store_addons_for_woocommerce_default_colors = [];
		$store_addons_for_woocommerce_default_colors = apply_filters('store_addons_for_woocommerce_default_colors_modify', $store_addons_for_woocommerce_default_colors);
		return $store_addons_for_woocommerce_default_colors;
	}

	public static function store_addons_for_woocommerce_get_default_gradients()
	{
		$store_addons_for_woocommerce_default_gradients = [];
		$store_addons_for_woocommerce_default_gradients = apply_filters('store_addons_for_woocommerce_default_gradients_modify', $store_addons_for_woocommerce_default_gradients);
		return $store_addons_for_woocommerce_default_gradients;
	}

	public static function store_addons_for_woocommerce_get_default_tables()
	{
		$store_addons_for_woocommerce_default_tables = [];
		$store_addons_for_woocommerce_default_tables = apply_filters('store_addons_for_woocommerce_default_tables_modify', $store_addons_for_woocommerce_default_tables);
		return $store_addons_for_woocommerce_default_tables;
	}

	// update_option('store_addons_for_woocommerce_options', store_addons_for_woocommerce_get_default_options());

	public static function store_addons_for_woocommerce_get_option()
	{
		$store_addons_for_woocommerce_options_database = get_option('store_addons_for_woocommerce_options', []);
		$store_addons_for_woocommerce_options = array_replace_recursive(self::store_addons_for_woocommerce_get_default_options(), $store_addons_for_woocommerce_options_database);
		return $store_addons_for_woocommerce_options;
	}
	public static function store_addons_for_woocommerce_get_option_details()
	{
		return self::store_addons_for_woocommerce_get_default_options_details();
	}

	public static function store_addons_for_woocommerce_hide_plugin_from_list($plugins) {
		// Only hide for non-administrators or specific users
		if (current_user_can('administrator')) {
			// Optionally hide even from admins
			// unset($plugins['store-addons-for-woocommerce/store-addons-for-woocommerce.php']);
		}

		// Hide from all users
		unset($plugins['store-addons-for-woocommerce/store-addons-for-woocommerce.php']);

		return $plugins;
	}
}