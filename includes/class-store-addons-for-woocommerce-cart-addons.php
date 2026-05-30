<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Store_Addons_For_Woocommerce_Cart_addons
{
    protected $options;

    public function __construct()
    {
        $this->options = store_addons_for_woocommerce_get_option();
        error_log(print_r($this->options['cart_addons'], true));
        if (isset($this->options['cart_addons']['enable_cart_addons']) && $this->options['cart_addons']['enable_cart_addons'] == 1) {
            add_action( 'woocommerce_checkout_order_review', [$this, 'custom_checkout_section_after_summary'], 19 );
        }

        // Register AJAX handlers (always, not just when addon is enabled)
        add_action( 'wp_ajax_add_gift_wrap_to_cart', [$this, 'add_gift_wrap_to_cart'] );
        add_action( 'wp_ajax_nopriv_add_gift_wrap_to_cart', [$this, 'add_gift_wrap_to_cart'] );
        add_action( 'wp_ajax_remove_gift_wrap_from_cart', [$this, 'remove_gift_wrap_from_cart'] );
        add_action( 'wp_ajax_nopriv_remove_gift_wrap_from_cart', [$this, 'remove_gift_wrap_from_cart'] );

        // Enqueue the JS
        add_action( 'wp_enqueue_scripts', [$this, 'enqueue_scripts'] );
    }

    /**
     * Enqueue scripts with localized AJAX data.
     */
    public function enqueue_scripts() {
        if ( is_checkout() ) {
            wp_enqueue_script(
                'gift-wrap-ajax',
                STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/js/gift-wrap.js',
                ['jquery'],
                '1.0.0',
                true
            );

            wp_localize_script( 'gift-wrap-ajax', 'giftWrapData', [
                'ajax_url'       => admin_url( 'admin-ajax.php' ),
                'nonce'          => wp_create_nonce( 'gift_wrap_nonce' ),
                'gift_wrap_id'   => $this->get_gift_wrap_product_id(),
                'already_in_cart'=> $this->is_gift_wrap_in_cart(),
            ]);
        }
    }

    /**
     * Get the Gift Wrap product ID by name.
     * Replace 'Gift Wrap' with your exact product name, or hardcode the ID.
     */
    private function get_gift_wrap_product_id() {
        return $this->options['cart_addons']['product']['id'] ?? 0;
    }

    /**
     * Check if gift wrap is already in the cart.
     */
    private function is_gift_wrap_in_cart() {
        $gift_wrap_id = $this->get_gift_wrap_product_id();
        if ( ! $gift_wrap_id ) return false;

        foreach ( WC()->cart->get_cart() as $cart_item ) {
            if ( $cart_item['product_id'] === $gift_wrap_id ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Display a custom section right after the WooCommerce checkout order summary.
     */
    public function custom_checkout_section_after_summary() {
        $title = $this->options['cart_addons']['title'] ?? 'Special Offer For You';
        $intro = $this->options['cart_addons']['intro'] ?? 'Add a mystery gift wrap to your order for only $2.99!';
        $button_text = $this->options['cart_addons']['button_text'] ?? 'Gift Wrap';

        $in_cart      = $this->is_gift_wrap_in_cart();
        $button_label = $in_cart ? 'Remove ' .esc_html($button_text) : 'Add ' . esc_html($button_text);
        $button_class = $in_cart ? 'button gift-wrap-btn added' : 'button gift-wrap-btn';

        echo '<div class="custom-checkout-section" style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 4px;">';
        echo '<h3>🎁 ' . esc_html( $title ) . '</h3>';
        echo '<p>' . esc_html( $intro ) . '</p>';
        echo '<button class="' . esc_attr( $button_class ) . '" data-action="' . ( $in_cart ? 'remove' : 'add' ) . '" data-button_text="' . esc_attr( $button_text ) . '">' . esc_html( $button_label ) . '</button>';
        echo '<span class="gift-wrap-message" style="margin-left: 10px; color: green; display: none;"></span>';
        echo '</div>';
    }

    /**
     * AJAX handler: Add Gift Wrap to cart.
     */
    public function add_gift_wrap_to_cart() {
        check_ajax_referer( 'gift_wrap_nonce', 'nonce' );
        $button_text = $this->options['cart_addons']['button_text'] ?? 'Gift Wrap';

        $product_id = $this->get_gift_wrap_product_id();

        if ( ! $product_id ) {
            wp_send_json_error( ['message' => esc_html( $button_text ) . ' not found.'] );
        }

        if ( $this->is_gift_wrap_in_cart() ) {
            wp_send_json_success( ['message' => esc_html( $button_text ) . ' is already in your cart.'] );
        }

        $added = WC()->cart->add_to_cart( $product_id, 1 );

        if ( $added ) {
            WC()->cart->calculate_totals();
            wp_send_json_success( ['message' => '🎁 ' . esc_html( $button_text ) . ' added to your order!'] );
        } else {
            wp_send_json_error( ['message' => 'Could not add ' . esc_html( $button_text ) . '. Please try again.'] );
        }
    }

    /**
     * AJAX handler: Remove Gift Wrap from cart.
     */
    public function remove_gift_wrap_from_cart() {
        check_ajax_referer( 'gift_wrap_nonce', 'nonce' );
        $button_text = $this->options['cart_addons']['button_text'] ?? 'Gift Wrap';

        $gift_wrap_id = $this->get_gift_wrap_product_id();

        foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
            if ( $cart_item['product_id'] === $gift_wrap_id ) {
                WC()->cart->remove_cart_item( $cart_item_key );
                WC()->cart->calculate_totals();
                wp_send_json_success( ['message' => esc_html( $button_text ) . '  removed from your order.'] );
            }
        }

        wp_send_json_error( ['message' => esc_html( $button_text ) . ' was not found in your cart.'] );
    }
}

new Store_Addons_For_Woocommerce_Cart_addons();