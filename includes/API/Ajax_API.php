<?php
namespace MosPress\StoreAddonsForWoocommerce\API;
if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;
class Ajax_API
{
    private static $instance = null;
    public static function get_instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public function __construct()
	{
        add_action('wp_ajax_store_addons_for_woocommerce_reset_settings', [$this, 'store_addons_for_woocommerce_reset_settings']);			
		add_action('init', [$this, 'store_addons_for_woocommerce_maybe_flush_rules'], 99);   
		
    }   
	public function store_addons_for_woocommerce_reset_settings()
	{
		// wp_send_json_success($_POST['_admin_nonce']);
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'store_addons_for_woocommerce_admin_nonce')) {
			$name = isset($_POST['name'])?sanitize_text_field(wp_unslash($_POST['name'])):'';
			$store_addons_for_woocommerce_options = Utils::store_addons_for_woocommerce_get_option();
			$store_addons_for_woocommerce_default_options = Utils::store_addons_for_woocommerce_get_default_options();

			// wp_send_json_success(['name' => $name]);

			$success = $this->reset_option_by_path($store_addons_for_woocommerce_options, $store_addons_for_woocommerce_default_options, $name);

			if ($success) {
				update_option('store_addons_for_woocommerce_options', $store_addons_for_woocommerce_options);
				wp_send_json_success(['message' => __('Settings reset successfully.', 'store-addons-for-woocommerce')]);
			} else {
				wp_send_json_error(['error_message' => __('Invalid settings path.', 'store-addons-for-woocommerce')]);
			}
		} else {
			wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'store-addons-for-woocommerce')));
			// wp_die(esc_html__('Nonce verification failed. Please try again.', 'store-addons-for-woocommerce'));
		}
		wp_die();
	}
	private function reset_option_by_path(&$options, $defaults, $path)
	{
		$keys = explode('.', $path);
		$target = &$options;
		$default = $defaults;

		foreach ($keys as $key) {
			if (!isset($target[$key]) || !isset($default[$key])) {
				return false; // path not found
			}
			$target = &$target[$key];
			$default = $default[$key];
		}

		// Set the value at the final nested level
		$target = $default;
		return true;
	}
	public function store_addons_for_woocommerce_maybe_flush_rules() {
		if (get_option('store_addons_for_woocommerce_flush_rewrite', false)) {
			flush_rewrite_rules();
			delete_option('store_addons_for_woocommerce_flush_rewrite');
		}
	}	
}

// new Ajax_API();