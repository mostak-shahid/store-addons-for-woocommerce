<?php

namespace MosPress\StoreAddonsForWoocommerce\Modules;

if (! defined('ABSPATH')) exit;

use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;

class CatalogMode
{
    protected $options;
    public function __construct()
    {
        $this->options = Utils::store_addons_for_woocommerce_get_option();
        if (isset($this->options['general']['catalog_mode']['enabled']) && $this->options['general']['catalog_mode']['enabled'] == 1) {
            // Remove Add to Cart buttons on the Shop page
            add_action( 'wp', [$this, 'remove_woocommerce_add_to_cart_buttons'] );
            // Ensure products are marked as not purchasable to prevent any system bypasses
            add_filter( 'woocommerce_is_purchasable', '__return_false' );
            // Redirect Cart and Checkout pages to Homepage
            add_action( 'template_redirect', [$this, 'disable_cart_and_checkout_pages'] );
            if (isset($this->options['general']['catalog_mode']['query_button_enabled']) && $this->options['general']['catalog_mode']['query_button_enabled'] == 1) {
                add_action( 'woocommerce_single_product_summary', [$this, 'add_custom_inquiry_button'], 30 );
            }
            if (isset($this->options['general']['catalog_mode']['hide_product_price']) && $this->options['general']['catalog_mode']['hide_product_price'] == 1) {
                add_filter( 'woocommerce_get_price_html', [$this, 'hide_all_product_prices'], 10, 2 );
            }
            if (isset($this->options['general']['catalog_mode']['hide_product_variations']) && $this->options['general']['catalog_mode']['hide_product_variations'] == 1) {
                add_filter( 'woocommerce_variation_is_visible', [$this, 'hide_specific_product_variations'], 10, 4 );
            }
        }
    }
    function remove_woocommerce_add_to_cart_buttons() {
        remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
        remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
    }
    function disable_cart_and_checkout_pages() {
        if ( is_cart() || is_checkout() ) {
            wp_safe_redirect( home_url() );
            exit;
        }
    }

    function add_custom_inquiry_button() {
        $button_title = isset($this->options['general']['catalog_mode']['query_button_text'])?sanitize_text_field(wp_unslash($this->options['general']['catalog_mode']['query_button_text'])):'Request for a Quote';
        $button_url = isset($this->options['general']['catalog_mode']['query_button_url'])?sanitize_text_field(wp_unslash($this->options['general']['catalog_mode']['query_button_url'])):'';

        if ($button_url) 
        echo '<a href="' . esc_url( $button_url ) . '" class="single_add_to_cart_button button alt wp-element-button" style="margin-top:15px;display: inline-block">'.esc_html($button_title).'</a>';
    }
    function hide_all_product_prices( $price, $product ) {
        // Keep prices visible inside the WordPress admin dashboard
        // if ( is_admin() ) {
        //     return $price; 
        // }
        
        // Return empty string to hide price completely on the frontend
        return ''; 
    }
    function hide_specific_product_variations () {
        return false; // Hides the variation
    }
}


// //Method 1: Hide Specific Variation IDs
// /**
//  * Hide specific product variations from the frontend dropdown.
//  */
// add_filter( 'woocommerce_variation_is_visible', 'hide_specific_product_variations', 10, 4 );
// function hide_specific_product_variations( $is_visible, $id, $product, $variation ) {
    
//     // Define an array of variation IDs you want to hide
//     $hidden_ids = array( 1024, 1025 ); // Replace with your actual variation IDs

//     if ( in_array( $id, $hidden_ids ) ) {
//         return false; // Hides the variation
//     }

//     return $is_visible;
// }

// // Method 2: Hide Variations by Custom Field (Admin-Controlled)
// // 1. Add custom checkbox to WooCommerce variation options
// add_action( 'woocommerce_product_after_variable_attributes', 'add_hide_variation_checkbox', 10, 3 );
// function add_hide_variation_checkbox( $loop, $variation_data, $variation ) {
//     woocommerce_wp_checkbox( array(
//         'id'          => '_hide_from_frontend[' . $loop . ']',
//         'label'       => __( 'Hide from frontend?', 'woocommerce' ),
//         'value'       => get_post_meta( $variation->ID, '_hide_from_frontend', true ) ? 'yes' : 'no',
//         'desc_tip'    => true,
//         'description' => __( 'Check this box to hide this specific variation from customers.', 'woocommerce' )
//     ) );
// }

// // 2. Save the checkbox value when saving the product variations
// add_action( 'woocommerce_save_product_variation', 'save_hide_variation_checkbox', 10, 2 );
// function save_hide_variation_checkbox( $variation_id, $i ) {
//     $hide_val = isset( $_POST['_hide_from_frontend'][$i] ) ? 'yes' : 'no';
//     update_post_meta( $variation_id, '_hide_from_frontend', $hide_val );
// }

// // 3. Apply the visibility rule on the frontend
// add_filter( 'woocommerce_variation_is_visible', 'apply_hide_variation_checkbox', 10, 4 );
// function apply_hide_variation_checkbox( $is_visible, $id, $product, $variation ) {
//     $is_hidden = get_post_meta( $id, '_hide_from_frontend', true );
    
//     if ( 'yes' === $is_hidden ) {
//         return false;
//     }
    
//     return $is_visible;
// }


// // Method 1: Hide All Prices Globally
// /**
//  * Hide all WooCommerce product prices from the front-end.
//  */
// add_filter( 'woocommerce_get_price_html', 'hide_all_product_prices', 10, 2 );
// function hide_all_product_prices( $price, $product ) {
//     // Keep prices visible inside the WordPress admin dashboard
//     if ( is_admin() ) {
//         return $price; 
//     }
    
//     // Return empty string to hide price completely on the frontend
//     return ''; 
// }

// // Method 2: Hide Prices Only for Guest Users (Show to Logged-In Members)
// /**
//  * Hide prices for non-logged-in guest users and show a login link.
//  */
// add_filter( 'woocommerce_get_price_html', 'hide_prices_for_guests', 10, 2 );
// function hide_prices_for_guests( $price, $product ) {
//     if ( is_admin() ) {
//         return $price;
//     }

//     // Check if the current visitor is logged out
//     if ( ! is_user_logged_in() ) {
//         $login_url = wp_login_url( get_permalink() );
//         return '<a href="' . esc_url( $login_url ) . '" class="login-to-see-price">Login to see prices</a>';
//     }

//     return $price;
// }

// // Method 3: Hide Price for Specific Product IDs
// /**
//  * Hide prices on explicit product IDs.
//  */
// add_filter( 'woocommerce_get_price_html', 'hide_price_on_specific_products', 10, 2 );
// function hide_price_on_specific_products( $price, $product ) {
//     // Array of product IDs where prices should be hidden
//     $hidden_price_ids = array( 412, 589 ); // Replace with your target product IDs

//     if ( in_array( $product->get_id(), $hidden_price_ids ) ) {
//         return 'Contact us for pricing'; // Custom replacement text
//     }

//     return $price;
// }
