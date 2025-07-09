<?php
namespace MostakShahid\StoreAddonsForWoocommerce\Admin;

class Admin
{
    public static function register()
    {

        add_action('admin_notices', array(__CLASS__, 'ultimate_security_required_plugin_notice'));
    }

    //Ultimate Security not installed/activated notice

    public static function ultimate_security_required_plugin_notice()
    {
        // Change this to your required plugin's slug and name
        $plugin_slug = 'ultimate-security/ultimate-security.php';
        $plugin_name = 'Ultimate Security';

        if (!is_plugin_active($plugin_slug)) {
            // Check if user can activate plugins
            if (current_user_can('activate_plugins')) {
                // Admin notice markup
                echo '<div class="notice notice-error"><p>';
                echo esc_html(sprintf(__('The "%s" plugin is not installed or activated. Please install and activate it to use all features of this plugin.', 'ultimate-security'), $plugin_name));
                echo '</p></div>';
            }
        }
    }

}