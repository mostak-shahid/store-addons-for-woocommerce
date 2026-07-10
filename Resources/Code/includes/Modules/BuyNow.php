<?php
namespace MosPress\StoreAddonsForWoocommerce\Modules;
if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;
class BuyNow
{
	protected $options;
	public function __construct()
	{
		$this->options = Utils::store_addons_for_woocommerce_get_option();
		if (isset($this->options['product']['buy_now_button']['enabled']) && $this->options['product']['buy_now_button']['enabled'] == 1) {

            add_action('template_redirect', [$this, 'add_product_a_to_cart_programmatically']);
            add_shortcode('buy_now_btn', [$this, 'buy_now_shortcode']);
            add_action('template_redirect', [$this, 'handle_buy_now_logic']);
            add_action('template_redirect', [$this, 'restore_original_cart_if_abandoned']);
            add_action('woocommerce_thankyou', [$this, 'clear_cart_backup_on_success']);

            // add_action('woocommerce_single_product_summary', [$this, 'handle_quick_buy_redirect'], 31);
            // add_action('woocommerce_before_add_to_cart_form', [$this, 'handle_quick_buy_redirect'], 31);
            add_action('woocommerce_after_add_to_cart_form', [$this, 'handle_quick_buy_redirect'], 31);

            // add_action('wp_footer', [$this, 'custom_buy_now_variation_script']);
            add_action('wp_enqueue_scripts', [$this, 'enqueue_custom_buy_now_inline_script']);
            }
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
     * Usage: [buy_now_btn id="YOUR_product_ID" text="Buy product A Now"]
     */
    // add_shortcode('buy_now_btn', 'buy_now_shortcode');
    function buy_now_shortcode($atts) {
        $atts = shortcode_atts(array(
            'id'   => '', // This can be the parent variable ID or simple product ID
            'text' => 'Buy Now',
        ), $atts);

        if (empty($atts['id'])) return '';

        // Create a base link with the product ID. JavaScript will append variation variables dynamically.
        $url = add_query_arg('quick_buy_id', $atts['id'], wc_get_checkout_url());
        
        return '<a href="' . esc_url($url) . '" class="button alt buy-now-button" data-base-url="' . esc_url($url) . '">' . esc_html($atts['text']) . '</a>';
    }

    /**
     * 2. Handle the "Buy Now" click using URL-passed attributes
     */
    // add_action('template_redirect', 'handle_buy_now_logic');
    function handle_buy_now_logic() {
        if (is_admin() || !isset($_GET['quick_buy_id'])) return;

        $product_id   = intval($_GET['quick_buy_id']);
        $variation_id = isset($_GET['variation_id']) ? intval($_GET['variation_id']) : 0;
        
        $product = wc_get_product($variation_id ? $variation_id : $product_id);
        if (!$product) return;

        $variation_attributes = array();

        // Loop through URL query arguments to collect any selected variation attributes (prefixed with attribute_)
        foreach ($_GET as $key => $value) {
            if (strpos($key, 'attribute_') === 0) {
                $variation_attributes[sanitize_key($key)] = sanitize_text_field($value);
            }
        }

        // Ensure WooCommerce session is active
        if (!WC()->session->has_session()) {
            WC()->session->set_customer_session_cookie(true);
        }

        // Backup current cart
        if (!WC()->cart->is_empty()) {
            $cart_data = WC()->cart->get_cart();
            WC()->session->set('original_cart_backup', $cart_data);
        }

        // Clear cart entirely
        WC()->cart->empty_cart();

        // Add to cart prioritizing explicitly chosen dynamic attributes
        if ($variation_id > 0) {
            WC()->cart->add_to_cart($product_id, 1, $variation_id, $variation_attributes);
        } else {
            WC()->cart->add_to_cart($product_id, 1);
        }

        // Safely redirect to checkout screen
        // wp_safe_redirect(wc_get_checkout_url());
        // exit;
    }


    /**
     * 3. Restore the old cart if the user leaves the checkout page
     */
    // add_action('template_redirect', 'restore_original_cart_if_abandoned');
    function restore_original_cart_if_abandoned() {
        // Only run if we are NOT on checkout or order-received pages
        if (
            is_checkout() 
            || is_wc_endpoint_url('order-received') 
            || is_admin()
        ) return;

        // Get the actual ID assigned to the checkout page
        $checkout_page_id = wc_get_page_id( 'checkout' );
        $current_page_id  = get_queried_object_id();

        // if ( $checkout_page_id && $current_page_id == $checkout_page_id ) {
        //     error_log('SUCCESS: This is definitely the checkout page');
        // }

        // error_log('Checking for cart restoration...'.wc_get_checkout_url());

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
            $product = wc_get_product( get_the_ID() );
            $type = $product->get_type(); 
            if ($type !== 'external' && $type !== 'grouped'
            ) {
                $btn_text = $this->options['product']['buy_now_button']['button_title'] ?? __('Buy Now', 'store-addons-for-woocommerce');
                echo do_shortcode('[buy_now_btn id="' . get_the_ID() . '" text="'.$btn_text.'"]');
            }
            // echo '<p>product Type: ' . esc_html($type) . '</p>';
        }
    }
    /**
     * 5. Frontend JavaScript: Dynamically map selected variables to the shortcode link button
     */
    // add_action('wp_footer', 'custom_buy_now_variation_script');
    function custom_buy_now_variation_script() {
        if (!is_product()) return;
        ?>
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            
            function updateBuyNowLink() {
                var $button = $('.buy-now-button');
                if ($button.length === 0) return;

                var baseUrl = $button.data('base-url');
                var urlObj = new URL(baseUrl);
                
                // Target the hidden field WooCommerce populates with the variation ID
                var variationId = $('form.cart input[name="variation_id"]').val();
                if (variationId && variationId != '0') {
                    urlObj.searchParams.set('variation_id', variationId);
                } else {
                    urlObj.searchParams.delete('variation_id');
                }

                // Loop through all dropdowns matching attribute_pa_ (like attribute_pa_color, attribute_pa_size)
                $("select[name^='attribute_pa_']").each(function() {
                    var name = $(this).attr('name');
                    var value = $(this).val();

                    if (value) {
                        urlObj.searchParams.set(name, value);
                    } else {
                        // Remove param if user switches back to "Choose an option"
                        urlObj.searchParams.delete(name);
                    }
                });

                // Apply updated string to the button
                $button.attr('href', urlObj.toString());
            }

            // Run logic immediately when dropdown options change
            $(document).on('change', "select[name^='attribute_pa_']", function() {
                // Tiny timeout allows WooCommerce internal scripts to finish calculating the variation ID first
                setTimeout(updateBuyNowLink, 100);
            });
            
            // Secondary trigger for full compatibility with WooCommerce core variation engine
            $(document).on('found_variation check_variations', 'form.cart', function() {
                updateBuyNowLink();
            });
        });
        </script>
        <?php
    }

    // add_action('wp_enqueue_scripts', 'enqueue_custom_buy_now_inline_script');
    function enqueue_custom_buy_now_inline_script() {
        // Only load the script dependencies on active single product pages
        if ( ! is_product() ) return;

        $product = wc_get_product( get_the_ID() );
        if ( ! $product ) return;

        $type = $product->get_type(); 
        
        // Only inject the JS tracking layer if the product is simple or variable
        if ( $type !== 'external' && $type !== 'grouped' ) {
            
            // Define your custom tracking jQuery logic string cleanly
            $custom_js = "
                jQuery(document).ready(function($) {
                    function updateBuyNowLink() {
                        var \$button = $('.buy-now-button');
                        if (\$button.length === 0) return;

                        var baseUrl = \$button.data('base-url');
                        var urlObj = new URL(baseUrl);
                        
                        var variationId = $('form.cart input[name=\"variation_id\"]').val();
                        if (variationId && variationId != '0') {
                            urlObj.searchParams.set('variation_id', variationId);
                        } else {
                            urlObj.searchParams.delete('variation_id');
                        }

                        $(\"select[name^='attribute_pa_']\").each(function() {
                            var name = \$(this).attr('name');
                            var value = \$(this).val();

                            if (value) {
                                urlObj.searchParams.set(name, value);
                            } else {
                                urlObj.searchParams.delete(name);
                            }
                        });

                        \$button.attr('href', urlObj.toString());
                    }

                    \$(document).on('change', \"select[name^='attribute_pa_']\", function() {
                        setTimeout(updateBuyNowLink, 100);
                    });
                    
                    \$(document).on('found_variation check_variations', 'form.cart', function() {
                        updateBuyNowLink();
                    });
                });
            ";

            // Safely register the script inline immediately following the core jquery payload block
            wp_add_inline_script('jquery', $custom_js);
        }
    }
}

// new BuyNow();
