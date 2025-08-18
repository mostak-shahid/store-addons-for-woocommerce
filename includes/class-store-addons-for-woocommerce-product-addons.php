<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
class Store_Addons_For_Woocommerce_Product_Addons
{
	protected $options;

	public function __construct()
	{
		$this->options = store_addons_for_woocommerce_get_option();
		if (isset($this->options['product_addons']['enable_product_addons']) && $this->options['product_addons']['enable_product_addons'] == 1) {
			// Add custom tab to product data panel
			add_filter('woocommerce_product_data_tabs', [$this, 'product_addons_product_data_tab']);

			// Output custom fields in the custom tab
			add_action('woocommerce_product_data_panels', [$this, 'render_product_addons_product_data_fields']);

			// Save fields
			add_action('woocommerce_process_product_meta', [$this, 'save_product_meta_boxes']);

			add_action('woocommerce_before_add_to_cart_button', [$this, 'frontend_display_product_addons_fields']);

			add_filter('woocommerce_add_cart_item_data', [$this, 'add_cart_item_data'], 10, 2);
			add_filter('woocommerce_get_item_data', [$this, 'get_item_data'], 10, 2);
			add_action('woocommerce_before_calculate_totals', [$this, 'adjust_cart_item_price'], 10, 1);
			// add_action('admin_footer', [$this, 'admin_js']);
			add_action( 'admin_enqueue_scripts', [$this, 'add_footer_script'] );
		}
	}

	/**
	 * Add a new tab in the Product Data panel
	 */
	public function product_addons_product_data_tab($tabs)
	{
		$tabs['product_addons'] = [
			'label'    => __('Product Addons', 'store-addons-for-woocommerce'),
			'target'   => 'product_addons_product_data', // ID for the panel
			'class'    => ['show_if_simple', 'show_if_variable'], // Show on these product types
			'priority' => 60,
		];
		return $tabs;
	}

	/**
	 * Render the custom fields inside the tab panel
	 */
	public function render_product_addons_product_data_fields()
	{
		global $post;
		wp_nonce_field('store_addons_for_woocommerce_action', 'store_addons_for_woocommerce_field');
?>
		<div id="product_addons_product_data" class="panel woocommerce_options_panel">
			<div class="options_group">
				<?php
				echo '<p class="form-field"><label>';
				echo esc_html__('Product Addons', 'store-addons-for-woocommerce');
				echo '</label></p>';
				echo '<div id="store_addons_for_woocommerce_addon_repeater">';

				$addons = get_post_meta($post->ID, '_store_addons_for_woocommerce_addon_repeater', true);
				// var_dump($addons);
				if (!empty($addons) && is_array($addons)) {
					foreach ($addons as $index => $addon) {
						echo '<div class="store-addons-for-woocommerce-addon-row">';
						echo '<input type="text" name="store_addons_for_woocommerce_addons[' . esc_attr($index) . '][label]" value="' . esc_attr($addon['label']) . '" placeholder="Label" />';
						echo '<input type="number" step="0.01" name="store_addons_for_woocommerce_addons[' . esc_attr($index) . '][price]" value="' . esc_attr($addon['price']) . '" placeholder="Price" />';
						echo '<button class="store-addons-for-woocommerce-remove-addon button">Remove</button>';
						echo '</div>';
					}
				}

				echo '</div>';
				echo '<button type="button" class="button store-addons-for-woocommerce-add-addon">+ Add Addon</button>';
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
			if (isset($_POST['store_addons_for_woocommerce_addons']) && is_array($_POST['store_addons_for_woocommerce_addons'])) {
				// $cleaned = array_values(array_filter($_POST['store_addons_for_woocommerce_addons'], function ($addon) {
				// 	return !empty($addon['label']);
				// }));
				update_post_meta(
					$post_id,
					'_store_addons_for_woocommerce_addon_repeater',
					// sanitize_text_field(wp_unslash($_POST['store_addons_for_woocommerce_addons']))
					map_deep(wp_unslash($_POST['store_addons_for_woocommerce_addons']), 'wp_kses_post')
				);
				// update_post_meta($post_id, '_store_addons_for_woocommerce_addon_repeater', $_POST['store_addons_for_woocommerce_addons']);
			}
		}
	}
	public function frontend_display_product_addons_fields()
	{
		global $product;

		$product_addons_title = $this->options['product_addons']['title'] ?? __('Product Addons', 'store-addons-for-woocommerce');
		$addons = get_post_meta($product->get_id(), '_store_addons_for_woocommerce_addon_repeater', true);
		if (!empty($addons)) {
			wp_nonce_field('store_addons_for_woocommerce_action', 'store_addons_for_woocommerce_field');
			echo '<div class="store-addons-for-woocommerce-addons"><strong>'.esc_html($product_addons_title).'</strong><ul>';
			foreach ($addons as $addon) {
				$label = $addon['label'];
				$price = floatval($addon['price']);
				echo '<li><label>';
				echo '<input type="checkbox" name="store_addons_for_woocommerce_addons[]" value="' . esc_html($label) . '|' . esc_html($price) . '">';
				echo esc_html($label) . ' (+' . wp_kses_post(wc_price($price)) . ')';
				echo '</label></li>';
			}
			echo '</ul></div>';
		}
		
	}

	// Add to cart item with addon data and price increase
	public function add_cart_item_data($cart_item_data, $product_id)
	{
		if (isset($_POST['store_addons_for_woocommerce_field']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['store_addons_for_woocommerce_field'])), 'store_addons_for_woocommerce_action')) {
			$safw_woocommerce_addons = !empty($_POST['store_addons_for_woocommerce_addons'])?map_deep(wp_unslash($_POST['store_addons_for_woocommerce_addons']), 'wp_kses_post'):[];
			if (sizeof($safw_woocommerce_addons)) {
				$addons = [];
				$addon_price = 0;

				foreach ($safw_woocommerce_addons as $addon_raw) {
					list($label, $price) = array_map('sanitize_text_field', explode('|', $addon_raw));
					$addons[] = ['label' => $label, 'price' => floatval($price)];
					$addon_price += floatval($price);
				}

				$cart_item_data['store_addons_for_woocommerce_addons'] = $addons;
				$cart_item_data['store_addons_for_woocommerce_addon_price'] = $addon_price;
			}
		}
		return $cart_item_data;
	}

	// Display addon metadata
	public function get_item_data($item_data, $cart_item)
	{
		if (!empty($cart_item['store_addons_for_woocommerce_addons'])) {
			foreach ($cart_item['store_addons_for_woocommerce_addons'] as $addon) {
				$item_data[] = [
					'key'   => esc_html($addon['label']),
					'value' => wc_price($addon['price']),
				];
			}
		}
		return $item_data;
	}

	// Adjust cart item price with addon total
	public function adjust_cart_item_price($cart)
	{
		if (is_admin() && !defined('DOING_AJAX')) return;

		foreach ($cart->get_cart() as $cart_item) {
			if (!empty($cart_item['store_addons_for_woocommerce_addon_price'])) {
				$original_price = $cart_item['data']->get_price();
				$cart_item['data']->set_price($original_price + $cart_item['store_addons_for_woocommerce_addon_price']);
			}
		}
	}
	// Admin JS
	public function add_footer_script() {
    if ( get_post_type() !== 'product' ) {
        return;
    }

    // ✅ Inline JavaScript
    $custom_js  = wp_kses_post( $this->options['more']['js'] ?? '' );
    $custom_js .= "
        jQuery(document).ready(function($) {
            let index = $('#store_addons_for_woocommerce_addon_repeater .store-addons-for-woocommerce-addon-row').length || 0;

            $('.store-addons-for-woocommerce-add-addon').click(function(e) {
                e.preventDefault();
                $('#store_addons_for_woocommerce_addon_repeater').append(
                    `<div class=\"store-addons-for-woocommerce-addon-row\">
                        <input type=\"text\" name=\"store_addons_for_woocommerce_addons[\${index}][label]\" placeholder=\"Label\" />
                        <input type=\"number\" step=\"0.01\" name=\"store_addons_for_woocommerce_addons[\${index}][price]\" placeholder=\"Price\" />
                        <button class=\"store-addons-for-woocommerce-remove-addon button\">Remove</button>
                    </div>`
                );
                index++;
            });

            $(document).on('click', '.store-addons-for-woocommerce-remove-addon', function(e) {
                e.preventDefault();
                $(this).closest('.store-addons-for-woocommerce-addon-row').remove();
            });
        });
    ";

    wp_register_script( 'store-addons-for-woocommerce-addon-script', false );
    wp_enqueue_script( 'store-addons-for-woocommerce-addon-script' );
    wp_add_inline_script( 'store-addons-for-woocommerce-addon-script', $custom_js );

    // ✅ Inline CSS
    $custom_css  = wp_kses_post( $this->options['more']['css'] ?? '' );
    $custom_css .= "
        #store_addons_for_woocommerce_addon_repeater .store-addons-for-woocommerce-addon-row {
            margin-bottom: 10px;
        }
        .store-addons-for-woocommerce-addon-row input {
            margin-right: 10px;
            width: 200px;
        }
    ";

    wp_register_style( 'store-addons-for-woocommerce-addon-style', false );
    wp_enqueue_style( 'store-addons-for-woocommerce-addon-style' );
    wp_add_inline_style( 'store-addons-for-woocommerce-addon-style', $custom_css );
}

}

new Store_Addons_For_Woocommerce_Product_Addons();
