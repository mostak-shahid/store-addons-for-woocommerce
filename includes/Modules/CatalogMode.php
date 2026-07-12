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
}