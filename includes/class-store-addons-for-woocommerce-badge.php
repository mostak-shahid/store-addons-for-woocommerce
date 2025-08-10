<?php
class Store_Addons_For_Woocommerce_Product_Badge
{
	protected $options;

	public function __construct()
	{
		$this->options = store_addons_for_woocommerce_get_option();
		if (isset($this->options['product_badge']['enable_product_badge']) && $this->options['product_badge']['enable_product_badge'] == 1) {
			// Add custom tab to product data panel
			add_action('woocommerce_before_shop_loop_item_title', [$this, 'add_thumbnail_wrapper'], 9);
			add_action('woocommerce_before_shop_loop_item_title', [$this, 'add_sale_badge'], 11);
			add_action('woocommerce_before_shop_loop_item_title', [$this, 'close_thumbnail_wrapper'], 12);

			remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20);
			add_action('wp_footer', [$this, 'add_sale_badge_style'], 9999);
		}
	}

	//add_action('woocommerce_init', $plugin_public, 'ultimate_product_badge_for_woocommerce_add_badge', 9);
	public function add_thumbnail_wrapper()
	{
		echo '<span class="woocommerce-loop-product__thumbnail-wrapper">';
	}

	public function add_sale_badge()
	{
		global $product;
		$select_badge_type = $this->options['product_badge']['sale_badge'] ?? 'badge-1';
		$select_position = $this->options['product_badge']['sale_badge_position'] ?? 'left';
		$text = '';
		echo '<span class="store-addons-for-woocommerce-sale-badge-wrapper badge-position-' . esc_html($select_position) . '"><span class="store-addons-for-woocommerce-sale-badge"><span class="store-addons-for-woocommerce-sale-badge-text">' . esc_html($text) . '</span></span></span>';
	}
	public function close_thumbnail_wrapper()
	{
		echo '</span>';
	}
	public function add_sale_badge_style()
	{
		$sale_badge = $this->options['product_badge']['sale_badge'] ?? STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sale-badge-01.svg';
		$sold_badge = $this->options['product_badge']['sold_badge'] ?? STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sold-badge-01.svg';
		$select_position = $this->options['product_badge']['sale_badge_position'] ?? 'left';
		$select_color = $this->options['product_badge']['sale_badge_color'] ?? '#000000';
		$select_size = $this->options['product_badge']['sale_badge_size'] ?? '150';
		$text = '';
?>
		<style>
			.product .store-addons-for-woocommerce-sale-badge-wrapper {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
				width: <?php echo esc_html($select_size); ?>px;
				height: <?php echo esc_html($select_size); ?>px;
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center;
			}

			.product .store-addons-for-woocommerce-sale-badge-wrapper.badge-position-right {
				left: auto;
				right: 0;
			}

			.product.sale .store-addons-for-woocommerce-sale-badge-wrapper {
				background-image: url('<?php echo esc_url($sale_badge); ?>');
			}

			.product.outofstock .store-addons-for-woocommerce-sale-badge-wrapper {
				background-image: url('<?php echo esc_url($sold_badge); ?>');
			}
		</style>
<?php
	}
}

new Store_Addons_For_Woocommerce_Product_Badge();
