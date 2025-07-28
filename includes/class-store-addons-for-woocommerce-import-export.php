<?php
class Store_Addons_For_Woocommerce_Import_Export
{
	protected $options;

	public function __construct()
	{
		$this->options = store_addons_for_woocommerce_get_option();
		add_action('rest_api_init', [$this, 'register_rest_routes']);
	}
	public function register_rest_routes()
	{
		register_rest_route('store-addons/v1', '/settings', [
			'methods' => 'GET',
			'callback' => function () {
				return get_option('store_addons_for_woocommerce_options');
			},
			'permission_callback' => function () {
				return current_user_can('manage_options');
			},
		]);

		register_rest_route('store-addons/v1', '/settings', [
			'methods' => 'POST',
			'callback' => function ($request) {
				$data = $request->get_json_params();
				update_option('store_addons_for_woocommerce_options', $data);
				return rest_ensure_response(['success' => true]);
			},
			'permission_callback' => function () {
				return current_user_can('manage_options');
			},
		]);
	}
}

new Store_Addons_For_Woocommerce_Import_Export();
