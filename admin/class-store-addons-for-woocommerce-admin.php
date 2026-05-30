<?php
if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://mostak-shahid.github.io/
 * @since      1.0.0
 *
 * @package    Store_Addons_For_Woocommerce
 * @subpackage Store_Addons_For_Woocommerce/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Store_Addons_For_Woocommerce
 * @subpackage Store_Addons_For_Woocommerce/admin
 * @author     Md. Mostak Shahid <mostak.shahid@gmail.com>
 */
class Store_Addons_For_Woocommerce_Admin
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Store_Addons_For_Woocommerce_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Store_Addons_For_Woocommerce_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_style($this->plugin_name . '-google-font', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name . 'hint.min', STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/plugins/cool-hint-css/src/hint.min.css', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name . 'jquery-ui', STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/css/jquery-ui.css', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name, STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/css/style.css', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name . '-admin', STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'admin/css/admin-style.css', array(), $this->version, 'all');
		// wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/store-addons-for-woocommerce-admin.css', array(), $this->version, 'all');			
		// wp_enqueue_style( $this->plugin_name, plugin_dir_url(__DIR__) . 'admin/css/store-addons-for-woocommerce-admin.css', array(), $this->version, 'all' );


	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Store_Addons_For_Woocommerce_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Store_Addons_For_Woocommerce_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_script($this->plugin_name, STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/js/script.js', array('jquery'), $this->version, false);

		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_media();
		$current_screen = get_current_screen();
		if ($current_screen->id == 'toplevel_page_store-addons-for-woocommerce') {
			wp_enqueue_script(
				$this->plugin_name . '-react',
				STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'build/index.js',
				array('wp-element', 'wp-components', 'wp-api-fetch', 'wp-i18n', 'wp-media-utils', 'wp-block-editor', 'react', 'react-dom'),
				$this->version,
				true
			);
		}

		wp_enqueue_script($this->plugin_name . '-admin-ajax', plugin_dir_url(__FILE__) . 'js/admin-ajax.js', array('jquery'), $this->version, false);
		wp_enqueue_script($this->plugin_name . '-admin-script', plugin_dir_url(__FILE__) . 'js/admin-script.js', array('jquery', 'jquery-ui-tabs'), $this->version, false);
		$ajax_params = array(
			'admin_url' => admin_url(),
			'ajax_url' => admin_url('admin-ajax.php'),
			'image_url' => STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/',
			'_admin_nonce' => esc_attr(wp_create_nonce('store_addons_for_woocommerce_admin_nonce')),
			'api_nonce' => esc_attr(wp_create_nonce('wp_rest')),
			// 'install_plugin_wpnonce' => esc_attr(wp_create_nonce('updates')),
		);
		wp_localize_script($this->plugin_name . '-admin-ajax', 'store_addons_for_woocommerce_ajax_obj', $ajax_params);
	}


	/**
	 * Adding menu to admin menu.
	 *
	 * @since    1.0.0
	 */
	public function store_addons_for_woocommerce_admin_menu()
	{
		add_menu_page(
			esc_html(STORE_ADDONS_FOR_WOOCOMMERCE_NAME),
			esc_html(STORE_ADDONS_FOR_WOOCOMMERCE_NAME),
			'manage_options',
			$this->plugin_name,
			array($this, 'store_addons_for_woocommerce_dashboard_react_page_html'),
			plugin_dir_url(__DIR__) . 'admin/images/menu-icon.svg',
			57
		);
	}
	/**
	 * Loading plugin Welcome page.
	 *
	 * @since    1.0.0
	 */
	public function store_addons_for_woocommerce_dashboard_php_page_html()
	{
		if (!current_user_can('manage_options')) {
			return;
		}
		include_once('partials/' . $this->plugin_name . '-admin-display.php');
	}
	public function store_addons_for_woocommerce_dashboard_react_page_html()
	{
		if (!current_user_can('manage_options')) {
			return;
		}
		include_once('partials/' . $this->plugin_name . '-admin-display-react.php');
	}

	/**
	 * Add settings action link to the plugins page.
	 *
	 * @since    1.0.0
	 */
	public function store_addons_for_woocommerce_add_action_links($links)
	{

		/**
		 * Documentation : https://codex.wordpress.org/Plugin_API/Filter_Reference/plugin_action_links_(plugin_file_name)
		 * The "plugins.php" must match with the previously added add_submenu_page first option.
		 * For custom post type you have to change 'plugins.php?page=' to 'edit.php?post_type=your_custom_post_type&page='
		 * 
		 */
		$settings_link = array(
			'<a href="' . admin_url('admin.php?page=' . $this->plugin_name) . '">' . esc_html__('Settings', 'store-addons-for-woocommerce') . '</a>',
			// '<a href="' . admin_url('admin.php?page=' . $this->plugin_name . '-settings') . '">' . esc_html__('Settings', 'store-addons-for-woocommerce') . '</a>'
		);
		return array_merge($settings_link, $links);
	}

	/**
	 * Add body classes to the settings pages.
	 *
	 * @since    1.0.0
	 */
	public function store_addons_for_woocommerce_admin_body_class($classes)
	{

		$current_screen = get_current_screen();
		// var_dump($current_screen->id);
		if (store_addons_for_woocommerce_is_plugin_page()) {
			$classes .= ' ' . $this->plugin_name . '-settings-template ';
		}
		return $classes;
	}

	/**
	 * Redirect to the welcome pages.
	 *
	 * @since    1.0.0
	 */
	public function store_addons_for_woocommerce_do_activation_redirect()
	{
		if (get_option('store_addons_for_woocommerce_do_activation_redirect')) {
			delete_option('store_addons_for_woocommerce_do_activation_redirect');
			wp_safe_redirect(admin_url('admin.php?page=' . $this->plugin_name));
		}
	}

	/**
	 * Removing all notieces from settings page.
	 *
	 * @since    1.0.0
	 */
	public function store_addons_for_woocommerce_hide_admin_notices()
	{
		// $current_screen = get_current_screen();
		// var_dump($current_screen->id);
		if (store_addons_for_woocommerce_is_plugin_page()) {
			remove_all_actions('user_admin_notices');
			remove_all_actions('admin_notices');
		}
	}
	public function store_addons_for_woocommerce_option_form_submit()
	{
		$store_addons_for_woocommerce_options = array_replace_recursive(store_addons_for_woocommerce_get_option(), get_option('store_addons_for_woocommerce_options', []));
		if (isset($_POST['store_addons_for_woocommerce_options_form_field']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['store_addons_for_woocommerce_options_form_field'])), 'store_addons_for_woocommerce_options_form_action')) {

			$err = 0;
			if (isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["submit"])) {

				$store_addons_for_woocommerce_options["base_input"]["text_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["text_input"]) ? sanitize_text_field(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["text_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["email_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["email_input"]) ? sanitize_email(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["email_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["color_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["color_input"]) ? sanitize_hex_color(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["color_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["date_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["date_input"]) ? sanitize_text_field(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["date_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["datetime_local_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["datetime_local_input"]) ? sanitize_text_field(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["datetime_local_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["textarea_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["textarea_input"]) ? sanitize_textarea_field(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["textarea_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["switch_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["switch_input"]) ? sanitize_text_field(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["switch_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["radio_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["radio_input"]) ? sanitize_text_field(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["radio_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["datalist_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["datalist_input"]) ? sanitize_text_field(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["datalist_input"])) : '';

				$store_addons_for_woocommerce_options["base_input"]["select_input"] = isset($_POST["store_addons_for_woocommerce_options"]["base_input"]["select_input"]) ? sanitize_text_field(wp_unslash($_POST["store_addons_for_woocommerce_options"]["base_input"]["select_input"])) : '';
			}
			if (isset($_POST["store_addons_for_woocommerce_options"]["array_input"]["submit"])) {

				$store_addons_for_woocommerce_options["array_input"]["checkbox_input"] = isset($_POST["store_addons_for_woocommerce_options"]["array_input"]["checkbox_input"]) ? array_map('sanitize_text_field', wp_unslash($_POST["store_addons_for_woocommerce_options"]["array_input"]["checkbox_input"])) : [];

				$store_addons_for_woocommerce_options["array_input"]["multi-select_input"] = isset($_POST["store_addons_for_woocommerce_options"]["array_input"]["multi-select_input"]) ? array_map('sanitize_text_field', wp_unslash($_POST["store_addons_for_woocommerce_options"]["array_input"]["multi-select_input"])) : [];
			}
			$store_addons_for_woocommerce_options["editor_input"] = isset($_POST["store_addons_for_woocommerce_options"]["editor_input"]) ? wp_kses_post(wp_unslash($_POST["store_addons_for_woocommerce_options"]["editor_input"])) : '';

			if (!$err) {
				$_POST['settings-updated'] = true;
			}

			// var_dump($_POST);
		}
		update_option('store_addons_for_woocommerce_options', $store_addons_for_woocommerce_options);
	}
	// add_action('admin_head', 'store_addons_for_woocommerce_option_form_submit');
	private function reset_option_by_path(&$options, $defaults, $path)
	{
		$keys = explode('.', $path);
		$target = &$options;
		$default = $defaults;

		foreach ($keys as $key) {
			if (!isset($target[$key]) || !isset($default[$key])) {
				return false; // path not found
			}
			$target = &$target[$key];
			$default = $default[$key];
		}

		// Set the value at the final nested level
		$target = $default;
		return true;
	}

	public function store_addons_for_woocommerce_reset_settings()
	{
		// wp_send_json_success($_POST['_admin_nonce']);
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'store_addons_for_woocommerce_admin_nonce')) {
			$name = isset($_POST['name'])?sanitize_text_field(wp_unslash($_POST['name'])):'';
			$store_addons_for_woocommerce_options = store_addons_for_woocommerce_get_option();
			$store_addons_for_woocommerce_default_options = store_addons_for_woocommerce_get_default_options();

			$success = $this->reset_option_by_path($store_addons_for_woocommerce_options, $store_addons_for_woocommerce_default_options, $name);

			if ($success) {
				update_option('store_addons_for_woocommerce_options', $store_addons_for_woocommerce_options);
				wp_send_json_success(['message' => __('Settings reset successfully.', 'store-addons-for-woocommerce')]);
			} else {
				wp_send_json_error(['error_message' => __('Invalid settings path.', 'store-addons-for-woocommerce')]);
			}
		} else {
			wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'store-addons-for-woocommerce')));
			// wp_die(esc_html__('Nonce verification failed. Please try again.', 'store-addons-for-woocommerce'));
		}
		wp_die();
	}
	public function store_addons_for_woocommerce_reset_all_settings()
	{
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'store_addons_for_woocommerce_admin_nonce')) {
			// wp_send_json_success(array('variation_id' => $variation_id, 'price' => $price));
			$store_addons_for_woocommerce_default_options = store_addons_for_woocommerce_get_default_options();
			update_option('store_addons_for_woocommerce_options', $store_addons_for_woocommerce_default_options);
			wp_send_json_success();
		} else {
			wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'store-addons-for-woocommerce')));
			// wp_die(esc_html__('Nonce verification failed. Please try again.', 'store-addons-for-woocommerce'));
		}
		wp_die();
	}
	function store_addons_for_woocommerce_update_completed($upgrader_object, $options)
	{

		// If an update has taken place and the updated type is plugins and the plugins element exists
		if ($options['action'] == 'update' && $options['type'] == 'plugin' && isset($options['plugins'])) {
			foreach ($options['plugins'] as $plugin) {
				// Check to ensure it's my plugin
				if ($plugin == plugin_basename(__FILE__)) {
					// do stuff here
					$store_addons_for_woocommerce_options = array_replace_recursive(store_addons_for_woocommerce_get_option(), get_option('store_addons_for_woocommerce_options', []));
					update_option('store_addons_for_woocommerce_options', $store_addons_for_woocommerce_options);
				}
			}
		}
	}

	// add_action('admin_init', 'store_addons_for_woocommerce_product_category_data');
	/*
	* Add custom routes to the Rest API
	*
	* @since    1.0.8
	*/
	//add_action('rest_api_init', 'store_addons_for_woocommerce_rest_api_init');
	public function store_addons_for_woocommerce_rest_api_init()
	{
		register_rest_route(
			'store-addons-for-woocommerce/v1',
			'/options',
			array(
				'methods'  => 'GET',
				'callback' => [$this, 'rest_store_addons_for_woocommerce_get_options'],
				// 'permission_callback' => '__return_true', // Allow public access
				'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
			)
		);

		//Add the POST 'store-addons-for-woocommerce/v1/options' endpoint to the Rest API
		register_rest_route(
			'store-addons-for-woocommerce/v1',
			'/options',
			array(
				'methods'             => 'POST',
				'callback'            => [$this, 'rest_store_addons_for_woocommerce_update_options'],
				// 'permission_callback' => '__return_true'
				'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
			)
		);
		register_rest_route(
            'store-addons-for-woocommerce/v1',
            '/feedback',
            array(
                'methods' => 'POST',
                'callback' => [$this, 'rest_store_addons_for_woocommerce_feedback'],
				// 'permission_callback' => '__return_true'
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
            )
        );
		register_rest_route(
			'store-addons-for-woocommerce/v1', 
			'/products', 
			array(	
				'methods'             => 'GET',
				'callback'            => [$this, 'rest_store_addons_for_woocommerce_search_products'],
				'permission_callback' => '__return_true', // Publicly accessible
				'args'                => [
					'search' => [
						'required'          => false,
						'sanitize_callback' => 'sanitize_text_field',
						'default'           => '',
					],
					'limit' => [
						'required'          => false,
						'sanitize_callback' => 'sanitize_text_field',
						'default'           => -1,
					],
				],
			)
		);
	}
	public function rest_store_addons_for_woocommerce_get_options(WP_REST_Request $request)
	{
		// if (!current_user_can('manage_options')) {
		// 	return new WP_Error(
		// 		'rest_update_error',
		// 		'Sorry, you are not allowed to update the DAEXT UI Test options.',
		// 		array('status' => 403)
		// 	);
		// }
		$store_addons_for_woocommerce_options = store_addons_for_woocommerce_get_option();
		return new WP_REST_Response($store_addons_for_woocommerce_options, 200);
	}
	public function rest_store_addons_for_woocommerce_update_options(WP_REST_Request $request) //WP_REST_Request $request
	{
		if (!current_user_can('manage_options')) {
			return new WP_Error(
				'rest_update_error',
				'Sorry, you are not allowed to update options.'.get_current_user_id(),
				array('status' => 403)
			);
		}
		$store_addons_for_woocommerce_options_old = store_addons_for_woocommerce_get_option();

		$store_addons_for_woocommerce_options = map_deep(wp_unslash($request->get_param('store_addons_for_woocommerce_options')), function($value) {
            return is_string($value) ? sanitize_text_field($value) : $value;
        });

		$store_addons_for_woocommerce_options ? update_option('store_addons_for_woocommerce_options', $store_addons_for_woocommerce_options) : '';
		$response = [
			'success' => true,
			'msg'	=> esc_html__('Data successfully added.', 'store-addons-for-woocommerce')
		];

		// return $response;
		return new WP_REST_Response($response, 200);

		/*
		
		return new WP_REST_Response([
			'success' => true,
			'message' => 'Plugin installed successfully.'
		], 200);
		

		return new WP_REST_Response([
			'success' => false,
			'message' => 'Installed plugin could not be identified'
		], 404);
		*/
	}
	
    public static function rest_store_addons_for_woocommerce_feedback($request)
    {
        $subject = sanitize_text_field(wp_unslash($request->get_param('subject')));
        $message = sanitize_textarea_field(wp_unslash($request->get_param('message')));

        if (empty($message)) {
            return new WP_Error('empty_message', __('Message cannot be empty.', 'store-addons-for-woocommerce'), array('status' => 400));
        }

        if (empty($subject)) {
            return new WP_Error('empty_subject', __('Subject cannot be empty.', 'store-addons-for-woocommerce'), array('status' => 400));
        }

        $email = 'mostak.shahid@gmail.com';
        // $subject = sprintf(
        //     /* translators: %s = site URL */
        //     esc_html__('Error notification for %s', 'store-addons-for-woocommerce'),
        //     get_home_url()
        // );
        $output = '<strong>Subject:</strong> ' . $subject . '<br/><strong>Message:</strong> ' . $message;
        $headers = array(
            'From: ' . get_bloginfo('name') . ' <' . get_option('admin_email') . '>',
            'Content-Type: text/html; charset=UTF-8'
        );

        wp_mail($email, 'Feedback from Store Addons for WooCommerce', $output, $headers);
        $response = [
            'success' => true,
            'msg' => esc_html__('Email Send successfully.', 'store-addons-for-woocommerce'),
            'subject' => $subject,
            'message' => $message
        ];
        return new WP_REST_Response($response, 200);
    }
	/**
	 * Callback function to handle the product search request.
	 */
	function rest_store_addons_for_woocommerce_search_products($data) {
		$search_query = $data['search'];
		$limit_query = $data['limit'];

		// Define query arguments
		$args = [
			'post_type'      => 'product', // Uses WooCommerce 'product' post type
			'post_status'    => 'publish',
			'posts_per_page' => $limit_query,         // Limit results for better performance
			's'              => $search_query, // The search keyword
		];

		// Execute the query
		$query = new WP_Query($args);
		$products = [];

		if ($query->have_posts()) {
			while ($query->have_posts()) {
				$query->the_post();
				global $product;

				// Build a clean, lightweight payload for your React frontend
				$products[] = [
					'id'    => get_the_ID(),
					'name'  => get_the_title(),
					'price' => function_exists('wc_get_product') ? wc_get_product(get_the_ID())->get_price() : '',
					'image' => get_the_post_thumbnail_url(get_the_ID(), 'thumbnail') ?: '',
				];
			}
			wp_reset_postdata();
		}

		// Return the clean array. WordPress automatically encodes this to JSON with proper headers.
		return new WP_REST_Response($products, 200);
	}
}
