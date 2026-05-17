<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
class Store_Addons_For_Woocommerce_Buy_Now
{
	protected $options;
	public function __construct()
	{
		$this->options = store_addons_for_woocommerce_get_option();
		// if (isset($this->options['buy_together']['enable_buy_together']) && $this->options['buy_together']['enable_buy_together'] == 1) {
		// 	// Define hooks
		// 	// Add custom tab to product data panel
		// 	add_filter('woocommerce_product_data_tabs', [$this, 'add_buy_together_product_data_tab']);

		// 	// Output custom fields in the custom tab
		// 	add_action('woocommerce_product_data_panels', [$this, 'render_buy_together_product_data_fields']);

		// 	// Save fields
		// 	add_action('woocommerce_process_product_meta', [$this, 'save_product_meta_boxes']);

		// 	add_action('woocommerce_before_add_to_cart_button', [$this, 'frontend_display_buy_together_fields']);
		// 	add_action('woocommerce_add_to_cart_validation', [$this, 'add_to_cart'], 10, 6);
		// }
        add_action('template_redirect', [$this, 'add_product_a_to_cart_programmatically']);
        add_shortcode('buy_now_btn', [$this, 'custom_buy_now_shortcode']);
        add_action('template_redirect', [$this, 'handle_custom_buy_now_logic']);
        add_action('template_redirect', [$this, 'restore_original_cart_if_abandoned']);
        add_action('woocommerce_thankyou', [$this, 'clear_cart_backup_on_success']);

        add_action('woocommerce_single_product_summary', [$this, 'handle_quick_buy_redirect'], 30);
	}
    // add_action('template_redirect', 'add_product_a_to_cart_programmatically');

    function add_product_a_to_cart_programmatically() {
        // Check if our custom parameter is in the URL
        if (isset($_GET['add_to_cart_custom']) && !empty($_GET['add_to_cart_custom'])) {
            $product_id = intval($_GET['add_to_cart_custom']);
            $quantity = 1;

            // Use WooCommerce's global cart object to add the product
            if (WC()->cart->add_to_cart($product_id, $quantity)) {
                // Optional: Redirect to cart or checkout after adding
                wp_safe_redirect(wc_get_checkout_url());
                exit;
            }
        }
    }

    //Buy Now
    /**
     * 1. Shortcode to display the Buy Now Button
     * Usage: [buy_now_btn id="YOUR_PRODUCT_ID" text="Buy Product A Now"]
     */
    // add_shortcode('buy_now_btn', 'custom_buy_now_shortcode');
    function custom_buy_now_shortcode($atts) {
        $atts = shortcode_atts(array(
            'id'   => '',
            'text' => 'Buy Now',
        ), $atts);

        if (empty($atts['id'])) return '';

        // Create a link with a custom trigger parameter
        $url = add_query_arg('quick_buy_id', $atts['id'], wc_get_checkout_url());
        
        return '<a href="' . esc_url($url) . '" class="button alt buy-now-button">' . esc_html($atts['text']) . '</a>';
    }

    /**
     * 2. Handle the "Buy Now" click: Backup cart, empty it, and add new product
     */
    // add_action('template_redirect', 'handle_custom_buy_now_logic');
    function handle_custom_buy_now_logic() {
        if (is_admin() || !isset($_GET['quick_buy_id'])) return;

        $product_id = intval($_GET['quick_buy_id']);
        
        // Ensure WooCommerce session is started
        if (!WC()->session->has_session()) {
            WC()->session->set_customer_session_cookie(true);
        }

        // Backup current cart to session if not empty
        if (!WC()->cart->is_empty()) {
            $cart_data = WC()->cart->get_cart();
            WC()->session->set('original_cart_backup', $cart_data);
        }

        // Clear cart and add the specific product
        WC()->cart->empty_cart();
        WC()->cart->add_to_cart($product_id);

        // Redirect to checkout to strip the query string from URL
        wp_safe_redirect(wc_get_checkout_url());
        exit;
    }

    /**
     * 3. Restore the old cart if the user leaves the checkout page
     */
    // add_action('template_redirect', 'restore_original_cart_if_abandoned');
    function restore_original_cart_if_abandoned() {
        // Only run if we are NOT on checkout or order-received pages
        if (is_checkout() || is_wc_endpoint_url('order-received') || is_admin()) return;

        $backup = WC()->session->get('original_cart_backup');

        if ($backup) {
            WC()->cart->empty_cart();
            foreach ($backup as $item) {
                WC()->cart->add_to_cart($item['product_id'], $item['quantity'], $item['variation_id'], $item['variation']);
            }
            // Clear the backup after restoring
            WC()->session->set('original_cart_backup', null);
        }
    }

    /**
     * 4. Clear the backup if the purchase is successfully completed
     */
    // add_action('woocommerce_thankyou', 'clear_cart_backup_on_success');
    function clear_cart_backup_on_success() {
        WC()->session->set('original_cart_backup', null);
    }
    function handle_quick_buy_redirect() {
        if (
                is_product() 
                // && isset($_GET['quick_buy_id']) 
                // && intval($_GET['quick_buy_id']) === get_the_ID()
            ) {
            // wp_safe_redirect(wc_get_checkout_url());
            // exit;
            echo do_shortcode('[buy_now_btn id="' . get_the_ID() . '"]');
        }
    }
}

new Store_Addons_For_Woocommerce_Buy_Now();
