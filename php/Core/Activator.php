<?php

namespace MostakShahid\StoreAddonsForWoocommerce\Core;

if (!defined('ABSPATH')) {
    exit;
}

class Activator
{
    public static function activate()
    {
        // // Example: Store plugin version in the options table
        // update_option('ultimate_security_pro_plugin_activated', time());

        // global $wpdb;

        // $table = $wpdb->prefix . 'ultimate_security_passkey_logs';
        // $charset = $wpdb->get_charset_collate();

        // $sql = "CREATE TABLE $table (   
        //     id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        //     keyId VARCHAR(45) NOT NULL,
        //     user_email VARCHAR(45) NOT NULL,
        //     is_active TINYINT(1) NOT NULL DEFAULT 1,
        //     description TEXT NOT NULL,
        //     action VARCHAR(20) NOT NULL,
        //     ip_address VARCHAR(45) NOT NULL,
        //     created_at DATETIME NOT NULL,
        //     PRIMARY KEY (id)
        // ) $charset;";

        // require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        // dbDelta($sql);
    }
}