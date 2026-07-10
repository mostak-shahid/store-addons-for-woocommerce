<?php
namespace MosPress\StoreAddonsForWoocommerce\Modules;
if (! defined('ABSPATH')) exit;
use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;

class MyAccountDashboard
{
    protected $options;

    public function __construct()
    {
        $this->options = Utils::store_addons_for_woocommerce_get_option();      
        
        if (isset($this->options['account']['dashboard']['enabled']) && $this->options['account']['dashboard']['enabled'] == 1) {
            // Intercept WooCommerce's template routing engine
            add_filter( 'woocommerce_locate_template', [$this, 'override_dashboard_template'], 10, 3 );
            add_filter( 'woocommerce_account_dashboard', [$this, 'custom_woocommerce_dashboard_content'] );
        }
    }


    function custom_woocommerce_dashboard_content() {
        
        $content = isset($this->options['account']['dashboard']['content']) && $this->options['account']['dashboard']['content'] ? str_replace('&nbsp;', ' ', $this->options['account']['dashboard']['content']) : ''; 
        
        // 1. Get the current logged-in user object
        $current_user = wp_get_current_user();
        $user_roles = $current_user->roles;
        $primary_role = ! empty( $user_roles ) ? translate_user_role( ucfirst( reset( $user_roles ) ) ) : __( 'Customer', 'store-addons-for-woocommerce' );
        $registered_date = date_i18n( get_option( 'date_format' ), strtotime( $current_user->user_registered ) );


        // 2. Build dynamic, secure replacements
        $replacements = [
            '{{username}}'      => esc_html( $current_user->display_name ),
            '{{user_email}}'           => esc_html( $current_user->user_email ), 
            '{{user_id}}'              => absint( $current_user->ID ), 
            '{{user_role}}'            => esc_html( $primary_role ), 
            '{{user_registered_date}}' => esc_html( $registered_date ),

            '{{logout_url}}'    => '<a href="' . esc_url( wc_logout_url( wc_get_page_permalink( 'myaccount' ) ) ) . '">' . esc_html__( 'Log out', 'store-addons-for-woocommerce' ) . '</a>',
            '{{recent_orders}}' => '<a href="' . esc_url( wc_get_endpoint_url( 'orders' ) ) . '">' . esc_html__( 'recent orders', 'store-addons-for-woocommerce' ) . '</a>',
            '{{edit_address}}'  => '<a href="' . esc_url( wc_get_endpoint_url( 'edit-address' ) ) . '">' . esc_html__( 'shipping and billing addresses', 'store-addons-for-woocommerce' ) . '</a>',
            '{{edit_account}}'  => '<a href="' . esc_url( wc_get_endpoint_url( 'edit-account' ) ) . '">' . esc_html__( 'edit your password and account details', 'store-addons-for-woocommerce' ) . '</a>',
        ];

        // 3. Swap the placeholders with the actual values
        $final_output = strtr($content, $replacements);
        
        echo '<div class="my-account-dashboard-content">';
            echo '<div>' . wp_kses_post( $final_output ) . '</div>';
        echo '</div>';
    }

    /**
     * Intercept and hijack the default WooCommerce dashboard template
     */
    public function override_dashboard_template( $template, $template_name, $template_path ) {
        // If WooCommerce is trying to load 'myaccount/dashboard.php', swap it with our plugin file
        if ( $template_name === 'myaccount/dashboard.php' ) {
            // Point WooCommerce to a blank template file inside your own plugin directory
            // or directly trigger the content output.
            $plugin_template = plugin_dir_path( __FILE__ ) . 'templates/custom-dashboard.php';
            if ( file_exists( $plugin_template ) ) {
                return $plugin_template;
            }
        }
        
        return $template;
    }
}
