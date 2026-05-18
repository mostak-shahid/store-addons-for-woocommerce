<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
class Store_Addons_For_Woocommerce_More
{
	protected $options;

	public function __construct()
	{
		$this->options = store_addons_for_woocommerce_get_option();
		if (isset($this->options['more']['enable_scripts']) && $this->options['more']['enable_scripts'] == 1) {
			// Add custom tab to product data panel
			add_action('wp_head', [$this, 'add_header_script'], 9999);
			// add_action('wp_footer', [$this, 'add_footer_script'], 9999);
			add_action( 'wp_enqueue_scripts', [$this, 'add_footer_script'] );
		}
	}

	//add_action('woocommerce_init', $plugin_public, 'ultimate_product_badge_for_woocommerce_add_badge', 9);
	public function add_header_script()
	{
		echo wp_kses_post($this->options['more']['header_content']) ?? '';
	}
	public function add_footer_script()
	{
		echo wp_kses_post($this->options['more']['footer_content']) ?? '';
		if (isset($this->options['more']['css']) && !empty($this->options['more']['css'])) {

			wp_register_style( 'store-addons-for-woocommerce-custom-style', false ); // dummy handle
			wp_enqueue_style( 'store-addons-for-woocommerce-custom-style' );
			wp_add_inline_style( 'store-addons-for-woocommerce-custom-style', wp_kses_post($this->options['more']['css']) );
		}
		if (isset($this->options['more']['js']) && !empty($this->options['more']['js'])) {
			wp_register_script( 'store-addons-for-woocommerce-custom-script', false ); // dummy handle
			wp_enqueue_script( 'store-addons-for-woocommerce-custom-script' );
			wp_add_inline_script( 'store-addons-for-woocommerce-custom-script', wp_kses_post($this->options['more']['js']) );
		}
	}
}

new Store_Addons_For_Woocommerce_More();
