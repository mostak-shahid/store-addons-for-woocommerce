<?php
namespace MostakShahid\StoreAddonsForWoocommerce\Core;

if (!defined('ABSPATH')) {
    exit;
}

class Deactivator {
    public static function deactivate() {

        //Delete options or settings
        // delete_option('ultimate_security_pro_plugin_activated');
    }
}