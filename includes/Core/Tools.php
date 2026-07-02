<?php

namespace MosPress\StoreAddonsForWoocommerce\Core;
if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\StoreAddonsForWoocommerce\API\Ajax_API;
use MosPress\StoreAddonsForWoocommerce\Hook\Filter_Hook;
use MosPress\StoreAddonsForWoocommerce\Hook\Action_Hook;
use MosPress\StoreAddonsForWoocommerce\Core\Deactivator;
use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;
class Tools
{
    protected $options;

	public function __construct()
	{
		$this->options = Utils::store_addons_for_woocommerce_get_option();
        // error_log($this->options['utilities']['tools']['hide_plugin']);
        if (isset($this->options['utilities']['tools']['hide_plugin']) && $this->options['utilities']['tools']['hide_plugin'] == 1) {
            // Hide plugin from plugins list
            add_filter('all_plugins', [Utils::class,'store_addons_for_woocommerce_hide_plugin_from_list']);
        }
        // if (isset($this->options['utilities']['tools]['self_defense']) && $this->options['utilities']['tools]['self_defense'] == 1) {
        //     add_action('admin_footer', [Action_Hook::class, 'store_addons_for_woocommerce_deactivation_scripts']);
        //     // AJAX handler to verify password
        //     add_action('wp_ajax_verify_user_password', [Ajax_API::class, 'verify_user_password_ajax']);
        // }

        // // if (isset($this->options['utilities']['tools]['delete_data_on']) && $this->options['utilities']['tools]['delete_data_on'] == 'deactivate') {
        // //     // Cleaning up on Deactive
        // // } else if (isset($this->options['utilities']['tools]['delete_data_on']) && $this->options['utilities']['tools]['delete_data_on'] == 'delete') {
        // //     // Cleaning up on Delete
        // // }

        // add_action('wp_ajax_store_addons_for_woocommerce_reset_all_settings', [Ajax_API::class, 'store_addons_for_woocommerce_reset_all_settings']);	
        
    }
}