<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Store_Addons_For_Woocommerce_Checkout_Addons
{
    protected $options;
    // Define your array of allowed product IDs here
    protected $allowed_product_ids=[]; 

    public function __construct()
    {
        $this->options = store_addons_for_woocommerce_get_option();
        
        if (isset($this->options['checkout_addons']['enable_checkout_addons']) && $this->options['checkout_addons']['enable_checkout_addons'] == 1) {
            add_action( 'woocommerce_checkout_order_review', [$this, 'custom_checkout_section_after_summary'], 19 );
            $this->allowed_product_ids = array_map('intval', array_column($this->options['checkout_addons']['products'], 'value'));
        }

        // Auto-remove addon if requirements aren't met
        add_action( 'woocommerce_before_calculate_totals', [$this, 'auto_remove_addon_if_ineligible'], 10, 1 );
        
        // Final fallback validation to block checkout order processing
        add_action( 'woocommerce_after_checkout_validation', [$this, 'validate_checkout_requirements'], 10, 2 );

        add_action( 'wp_ajax_add_gift_wrap_to_cart', [$this, 'add_gift_wrap_to_cart'] );
        add_action( 'wp_ajax_nopriv_add_gift_wrap_to_cart', [$this, 'add_gift_wrap_to_cart'] );
        add_action( 'wp_ajax_remove_gift_wrap_from_cart', [$this, 'remove_gift_wrap_from_cart'] );
        add_action( 'wp_ajax_nopriv_remove_gift_wrap_from_cart', [$this, 'remove_gift_wrap_from_cart'] );

        add_action( 'wp_enqueue_scripts', [$this, 'enqueue_scripts'] );
    }

    public function enqueue_scripts() {
        // Only enqueue if checkout and requirements are met
        if ( is_checkout() && $this->has_allowed_product_in_cart() ) {
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

    private function get_gift_wrap_product_id() {
        return $this->options['checkout_addons']['product']['id'] ?? 0;
    }

    private function is_gift_wrap_in_cart() {
        $gift_wrap_id = $this->get_gift_wrap_product_id();
        if ( ! $gift_wrap_id || ! WC()->cart ) return false;

        foreach ( WC()->cart->get_cart() as $cart_item ) {
            if ( $cart_item['product_id'] === $gift_wrap_id ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if at least one required product is in the cart.
     */
    private function has_allowed_product_in_cart() {
        if ( ! WC()->cart ) return false;

        foreach ( WC()->cart->get_cart() as $cart_item ) {
            if ( in_array( $cart_item['product_id'], $this->allowed_product_ids ) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Auto-removes the gift wrap if required products are removed from cart.
     */
    public function auto_remove_addon_if_ineligible( $cart ) {
        if ( is_admin() && ! defined( 'DOING_AJAX' ) ) return;
        if ( ! $this->is_gift_wrap_in_cart() ) return;

        // If none of the target products are present, wipe the addon out
        if ( ! $this->has_allowed_product_in_cart() ) {
            $gift_wrap_id = $this->get_gift_wrap_product_id();
            foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) {
                if ( $cart_item['product_id'] === $gift_wrap_id ) {
                    $cart->remove_cart_item( $cart_item_key );
                }
            }
        }
    }

    /**
     * Hard validation rule to prevent order placement if conditions break.
     */
    public function validate_checkout_requirements( $data, $errors ) {
        if ( $this->is_gift_wrap_in_cart() && ! $this->has_allowed_product_in_cart() ) {
            $button_text = $this->options['checkout_addons']['button_text'] ?? 'Gift Wrap';
            $errors->add( 'validation', sprintf( __( 'The "%s" option is only available with specific products. It has been removed.', 'woocommerce' ), esc_html($button_text) ) );
        }
    }

    public function custom_checkout_section_after_summary() {
        // Exit early if required products are missing from cart
        if ( ! $this->has_allowed_product_in_cart() ) {
            return;
        }

        $title = $this->options['checkout_addons']['title'] ?? 'Special Offer For You';
        $intro = $this->options['checkout_addons']['intro'] ?? 'Add a mystery gift wrap to your order for only $2.99!';
        $button_text = $this->options['checkout_addons']['button_text'] ?? 'Gift Wrap';

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

    public function add_gift_wrap_to_cart() {
        check_ajax_referer( 'gift_wrap_nonce', 'nonce' );
        $button_text = $this->options['checkout_addons']['button_text'] ?? 'Gift Wrap';

        // Block AJAX injection attempts if required products are missing
        if ( ! $this->has_allowed_product_in_cart() ) {
            wp_send_json_error( ['message' => 'This offer is not eligible for your current cart items.'] );
        }

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

    public function remove_gift_wrap_from_cart() {
        check_ajax_referer( 'gift_wrap_nonce', 'nonce' );
        $button_text = $this->options['checkout_addons']['button_text'] ?? 'Gift Wrap';

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

new Store_Addons_For_Woocommerce_Checkout_Addons();
