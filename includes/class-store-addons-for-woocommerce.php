<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://wp-test.test/
 * @since      1.0.0
 *
 * @package    Store_Addons_For_Woocommerce
 * @subpackage Store_Addons_For_Woocommerce/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Store_Addons_For_Woocommerce
 * @subpackage Store_Addons_For_Woocommerce/includes
 * @author     Programmelab <mostak.shahid@gmail.com>
 */
class Store_Addons_For_Woocommerce
{

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Store_Addons_For_Woocommerce_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct()
	{

		if (defined('STORE_ADDONS_FOR_WOOCOMMERCE_VERSION')) {
			$this->version = STORE_ADDONS_FOR_WOOCOMMERCE_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'store-addons-for-woocommerce';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Store_Addons_For_Woocommerce_Loader. Orchestrates the hooks of the plugin.
	 * - Store_Addons_For_Woocommerce_i18n. Defines internationalization functionality.
	 * - Store_Addons_For_Woocommerce_Admin. Defines all hooks for the admin area.
	 * - Store_Addons_For_Woocommerce_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies()
	{

		require_once(ABSPATH . 'wp-admin/includes/plugin.php');

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-store-addons-for-woocommerce-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-store-addons-for-woocommerce-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-store-addons-for-woocommerce-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-store-addons-for-woocommerce-public.php';

		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-store-addons-for-woocommerce-buy-together.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-store-addons-for-woocommerce-product-addons.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-store-addons-for-woocommerce-badge.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-store-addons-for-woocommerce-import-export.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-store-addons-for-woocommerce-more.php';

		$this->loader = new Store_Addons_For_Woocommerce_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Store_Addons_For_Woocommerce_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale()
	{

		$plugin_i18n = new Store_Addons_For_Woocommerce_i18n();

		$this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks()
	{
		$plugin_admin = new Store_Addons_For_Woocommerce_Admin($this->get_plugin_name(), $this->get_version());
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');

		$this->loader->add_action('admin_menu', $plugin_admin, 'store_addons_for_woocommerce_admin_menu');

		// Add Settings link to the plugin
		$plugin_basename = plugin_basename(plugin_dir_path(__DIR__) . $this->plugin_name . '.php');
		$this->loader->add_filter('plugin_action_links_' . $plugin_basename, $plugin_admin, 'store_addons_for_woocommerce_add_action_links');

		$this->loader->add_filter('admin_body_class', $plugin_admin, 'store_addons_for_woocommerce_admin_body_class');

		$this->loader->add_action('admin_init', $plugin_admin, 'store_addons_for_woocommerce_do_activation_redirect');

		$this->loader->add_action('current_screen', $plugin_admin, 'store_addons_for_woocommerce_hide_admin_notices');

		//add_action('admin_head', 'store_addons_for_woocommerce_option_form_submit');
		$this->loader->add_action('admin_head', $plugin_admin, 'store_addons_for_woocommerce_option_form_submit');

		// Reset settings by ajax
		$this->loader->add_action('wp_ajax_store_addons_for_woocommerce_reset_settings', $plugin_admin, 'store_addons_for_woocommerce_reset_settings');
		$this->loader->add_action('wp_ajax_store_addons_for_woocommerce_reset_all_settings', $plugin_admin, 'store_addons_for_woocommerce_reset_all_settings');



		$this->loader->add_action('wp_ajax_store_addons_for_woocommerce_ajax_install_plugins', $plugin_admin, 'store_addons_for_woocommerce_ajax_install_plugins');
		$this->loader->add_action('wp_ajax_nopriv_store_addons_for_woocommerce_ajax_install_plugins', $plugin_admin, 'store_addons_for_woocommerce_ajax_install_plugins');

		$this->loader->add_action('wp_ajax_store_addons_for_woocommerce_ajax_plugins_status', $plugin_admin, 'store_addons_for_woocommerce_ajax_plugins_status');
		$this->loader->add_action('wp_ajax_nopriv_store_addons_for_woocommerce_ajax_plugins_status', $plugin_admin, 'store_addons_for_woocommerce_ajax_plugins_status');

		// add_action( 'upgrader_process_complete', 'store_addons_for_woocommerce_update_completed', 10, 2 );
		$this->loader->add_action('upgrader_process_complete', $plugin_admin, 'store_addons_for_woocommerce_update_completed', 10, 2);

		$this->loader->add_action('rest_api_init', $plugin_admin, 'store_addons_for_woocommerce_rest_api_init');
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks()
	{

		$plugin_public = new Store_Addons_For_Woocommerce_Public($this->get_plugin_name(), $this->get_version());
		$this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
		$this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
		// Save settings by ajax
		$this->loader->add_action('wp_ajax_store_addons_for_woocommerce_ajax_callback', $plugin_public, 'store_addons_for_woocommerce_ajax_callback');
		$this->loader->add_action('wp_ajax_nopriv_store_addons_for_woocommerce_ajax_callback', $plugin_public, 'store_addons_for_woocommerce_ajax_callback');
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run()
	{
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name()
	{
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Store_Addons_For_Woocommerce_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader()
	{
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version()
	{
		return $this->version;
	}
}
