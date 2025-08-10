<?php
class Store_Addons_For_Woocommerce_Buy_Together
{
	protected $options;
	public function __construct()
	{
		$this->options = store_addons_for_woocommerce_get_option();
		if (isset($this->options['buy_together']['enable_buy_together']) && $this->options['buy_together']['enable_buy_together'] == 1) {
			// Define hooks
			// Add custom tab to product data panel
			add_filter('woocommerce_product_data_tabs', [$this, 'add_buy_together_product_data_tab']);

			// Output custom fields in the custom tab
			add_action('woocommerce_product_data_panels', [$this, 'render_buy_together_product_data_fields']);

			// Save fields
			add_action('woocommerce_process_product_meta', [$this, 'save_product_meta_boxes']);

			add_action('woocommerce_before_add_to_cart_button', [$this, 'frontend_display_buy_together_fields']);
			add_action('woocommerce_add_to_cart_validation', [$this, 'add_to_cart'], 10, 6);
		}
	}

	/**
	 * Add a new tab in the Product Data panel
	 */
	public function add_buy_together_product_data_tab($tabs)
	{
		$tabs['buy_together'] = [
			'label'    => __('Buy Together', 'store-addons-for-woocommerce'),
			'target'   => 'buy_together_product_data', // ID for the panel
			'class'    => ['show_if_simple', 'show_if_variable'], // Show on these product types
			'priority' => 60,
		];
		return $tabs;
	}

	/**
	 * Render the custom fields inside the tab panel
	 */
	public function render_buy_together_product_data_fields()
	{
		global $post;
		$value = get_post_meta($post->ID, '_store_addons_for_woocommerce_related_products', true);
?>
		<div id="buy_together_product_data" class="panel woocommerce_options_panel">
			<div class="options_group">
				<?php
				wp_nonce_field('store_addons_for_woocommerce_action', 'store_addons_for_woocommerce_field');
				woocommerce_wp_text_input([
					'id'          => '_store_addons_for_woocommerce_related_products',
					'label'       => __('Related Product IDs', 'store-addons-for-woocommerce'),
					'description' => __('Enter comma-separated product IDs to recommend buying together.', 'store-addons-for-woocommerce'),
					'value'       => $value,
					'type'        => 'text',
				]);
				?>
			</div>
		</div>
<?php
	}

	/**
	 * Save custom meta field value
	 */
	public function save_product_meta_boxes($post_id)
	{
		if (isset($_POST['store_addons_for_woocommerce_field']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['store_addons_for_woocommerce_field'])), 'store_addons_for_woocommerce_action')) {
			if (isset($_POST['_store_addons_for_woocommerce_related_products'])) {
				update_post_meta(
					$post_id,
					'_store_addons_for_woocommerce_related_products',
					sanitize_text_field(wp_unslash($_POST['_store_addons_for_woocommerce_related_products']))
				);
			}
		}
	}
	public function frontend_display_buy_together_fields()
	{
		global $product;
		$buy_together_title = $this->options['buy_together']['title'] ?? __('Buy Together', 'store-addons-for-woocommerce');
		
		$related = explode(',', get_post_meta($product->get_id(), '_store_addons_for_woocommerce_related_products', true));
		wp_nonce_field('store_addons_for_woocommerce_action', 'store_addons_for_woocommerce_field');
		if (!empty($related)) {
			echo '<div class="store-addons-for-woocommerce-buy-together"><strong>'.esc_html($buy_together_title).'</strong><ul>';
			foreach ($related as $id) {
				$related_product = wc_get_product(trim($id));
				if ($related_product) {
					echo '<li><label><input type="checkbox" name="store_addons_for_woocommerce_related_products[]" value="' . esc_attr($id) . '"> ' . esc_html($related_product->get_name()) . ' (' . wp_kses_post(wc_price($related_product->get_price())) . ')</label></li>';
				}
			}
			echo '</ul></div>';
		}
		
	}
	public function add_to_cart($passed, $product_id, $quantity, $variation_id = '', $variations = '', $cart_item_data = [])
	{
		if (isset($_POST['store_addons_for_woocommerce_field']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['store_addons_for_woocommerce_field'])), 'store_addons_for_woocommerce_action')) {
			$safw_related_products = (!empty($_POST['store_addons_for_woocommerce_related_products']))?map_deep(wp_unslash($_POST['store_addons_for_woocommerce_related_products']), 'sanitize_text_field'):[];

			if (sizeof($safw_related_products)) {
				foreach ($safw_related_products as $related_id) {
					WC()->cart->add_to_cart((int)$related_id);
				}
			}
		}
		return $passed;
	}
}

new Store_Addons_For_Woocommerce_Buy_Together();
