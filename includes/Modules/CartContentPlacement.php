<?php

namespace MosPress\StoreAddonsForWoocommerce\Modules;

if (! defined('ABSPATH')) exit;

use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;

class CartContentPlacement
{
    protected $options;
    public function __construct()
    {
        $this->options = Utils::store_addons_for_woocommerce_get_option();
        if (isset($this->options['cart']['content_placement']['enabled']) && $this->options['cart']['content_placement']['enabled'] == 1) {
            add_action('woocommerce_after_cart_table', [$this, 'cart_content_placement']);
        }
    }
    public function cart_content_placement()
    {
        $content_blocks = isset($this->options['cart']['content_placement']['content']) ? $this->options['cart']['content_placement']['content'] : array();
        $layout = isset($this->options['cart']['content_placement']['layout']) ? $this->options['cart']['content_placement']['layout'] : '1';
        echo '<div class="store-addons-for-woocommerce-cart-content">';
        if (!empty($content_blocks)) {
            foreach ($content_blocks as $block) {
                echo '<div class="card content-layout content-layout-' . esc_attr($layout) . '">';
                    if (isset($block['icon']['id']) && !empty($block['icon']['id'])) {
                        echo '<div class="img-con">';
                        echo wp_get_attachment_image($block['icon']['id'], $size = 'full', $icon = false, $attr = array());
                        echo '</div>';
                    }
                    echo '<div class="text-con">';
                        if (isset($block['title']) && !empty($block['title'])) {
                            echo '<h3 class="card-title">' . esc_html($block['title']) . '</h3>';
                        }
                        if (isset($block['note']) && !empty($block['note'])) {
                            echo '<div class="card-content">' . esc_html($block['note']) . '</div>';
                        }
                        if (isset($block['button_text']) && !empty($block['button_text']) && isset($block['button_url']) && !empty($block['button_url'])) {
                            echo '<a href="' . esc_url($block['button_url']) . '" class="button card-btn">' . esc_html($block['button_text']) . '</a>';
                        }
                    echo '</div>';
                echo '</div>';
            }
        }
        echo '</div>';
    }
}
