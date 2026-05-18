<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Elementor_Buy_Now_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'buy_now_button';
	}

	public function get_title() {
		return esc_html__( 'Buy Now Button', 'elementor-buy-now-button' );
	}

	public function get_icon() {
		return 'eicon-cart';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	protected function register_controls() {

		$this->start_controls_section(
			'content_section',
			[
				'label' => esc_html__( 'Button Settings', 'elementor-buy-now-button' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'product_id',
			[
				'label' => esc_html__( 'Product ID', 'elementor-buy-now-button' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'input_type' => 'number',
				'placeholder' => '123',
				'description' => esc_html__( 'Enter the simple or parent variable product ID.', 'elementor-buy-now-button' ),
			]
		);

		$this->add_control(
			'button_text',
			[
				'label' => esc_html__( 'Button Text', 'elementor-buy-now-button' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Buy Now', 'elementor-buy-now-button' ),
				'placeholder' => esc_html__( 'Buy Now', 'elementor-buy-now-button' ),
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
        $product_id = $settings['product_id'] != '' ? $settings['product_id'] : get_the_ID();

        // var_dump($product_id);

		if ( empty( $product_id ) || ! function_exists( 'wc_get_checkout_url' ) ) {
			return;
		}

		$url = add_query_arg( 'quick_buy_id', $product_id, wc_get_checkout_url() );
		?>
		<a href="<?php echo esc_url( $url ); ?>" class="button alt buy-now-button" data-base-url="<?php echo esc_url( $url ); ?>">
			<?php echo esc_html( $settings['button_text'] ); ?>
		</a>
		<?php
	}
}
