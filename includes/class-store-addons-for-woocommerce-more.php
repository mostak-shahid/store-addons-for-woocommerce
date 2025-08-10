<?php
class Store_Addons_For_Woocommerce_More
{
	protected $options;

	public function __construct()
	{
		$this->options = store_addons_for_woocommerce_get_option();
		if (isset($this->options['more']['enable_scripts']) && $this->options['more']['enable_scripts'] == 1) {
			// Add custom tab to product data panel
			add_action('wp_head', [$this, 'add_header_script'], 9999);
			add_action('wp_footer', [$this, 'add_footer_script'], 9999);
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
			echo '<style id="store_addons_for_woocommerce_style">' . wp_kses_post($this->options['more']['css']) . '</style>';
		}
		if (isset($this->options['more']['js']) && !empty($this->options['more']['js'])) {
			echo '<script id="store_addons_for_woocommerce_script">' . wp_kses_post($this->options['more']['js']) . '</script>';
		}
	}
}

new Store_Addons_For_Woocommerce_More();
