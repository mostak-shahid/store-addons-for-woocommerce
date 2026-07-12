<?php

namespace MosPress\StoreAddonsForWoocommerce;

defined('ABSPATH') || exit;

use MosPress\StoreAddonsForWoocommerce\API\Ajax_API;
use MosPress\StoreAddonsForWoocommerce\API\Rest_API;
use MosPress\StoreAddonsForWoocommerce\Hook\Action_Hook;
use MosPress\StoreAddonsForWoocommerce\Hook\Filter_Hook;
use MosPress\StoreAddonsForWoocommerce\Core\Tools;
use MosPress\StoreAddonsForWoocommerce\Core\Upgrader;
use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;
// use MosPress\StoreAddonsForWoocommerce\Profile\Profile;
use MosPress\StoreAddonsForWoocommerce\Modules\ProductBadge;
use MosPress\StoreAddonsForWoocommerce\Modules\BuyNow;
use MosPress\StoreAddonsForWoocommerce\Modules\BuyTogether;
use MosPress\StoreAddonsForWoocommerce\Modules\ProductAddons;
use MosPress\StoreAddonsForWoocommerce\Modules\CartContentPlacement;
use MosPress\StoreAddonsForWoocommerce\Modules\CheckoutProductPlacement;
use MosPress\StoreAddonsForWoocommerce\Modules\MyAccountDashboard;

class Plugin {
	public function __construct() {

		$this->define_admin_hooks();
		$this->define_public_hooks();

		Ajax_API::get_instance();
		Rest_API::get_instance();
		Action_Hook::get_instance();
		Filter_Hook::get_instance();
		Upgrader::get_instance();
		// Profile::get_instance();
		
		// Instantiate additional core classes
		new Utils();
		new Tools();
		new ProductBadge();
		new BuyNow();
		new BuyTogether();
		new ProductAddons();
		new CartContentPlacement();
		new CheckoutProductPlacement();
		new MyAccountDashboard();
	}
	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.3
	 * @access   private
	 */
	private function define_admin_hooks()
	{
		add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts'], 9999);
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.3
	 * @access   private
	 */
	private function define_public_hooks()
	{
		add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts']);
		// Save settings by ajax
		// add_action('wp_ajax_store_addons_for_woocommerce_ajax_callback', [$this, 'store_addons_for_woocommerce_ajax_callback']);
		// add_action('wp_ajax_nopriv_store_addons_for_woocommerce_ajax_callback', [$this, 'store_addons_for_woocommerce_ajax_callback']);
	}
	public function admin_enqueue_scripts()
	{
		wp_enqueue_style('store-addons-for-woocommerce-admin-styles', STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/css/admin.css', [], STORE_ADDONS_FOR_WOOCOMMERCE_VERSION);
	}
	public function wp_enqueue_scripts()
	{
		// wp_enqueue_style('store-addons-for-woocommerce-public-styles', STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/css/public.css', [], STORE_ADDONS_FOR_WOOCOMMERCE_VERSION);
	}
}
