<?php
namespace MosPress\StoreAddonsForWoocommerce\Core;
if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;
class Upgrader {

    const OPTION_DB_VERSION = 'store_addons_for_woocommerce_db_version';

    /**
     * Current database version.
     */
    const DB_VERSION = 2;
    private static $instance = null;
    public static function get_instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public function __construct()
    {  
        add_action( 'plugins_loaded', [ __CLASS__, 'maybe_upgrade' ], 5 );
    }

    /**
     * Upgrade if needed.
     */
    public static function maybe_upgrade() {

        $installed = (int) get_option(
            self::OPTION_DB_VERSION,
            1 // Existing installs are version 1.
        );

        if ( $installed >= self::DB_VERSION ) {
            return;
        }

        self::upgrade( $installed );

        update_option(
            self::OPTION_DB_VERSION,
            self::DB_VERSION,
            false
        );
    }

    /**
     * Run sequential upgrades.
     */
    protected static function upgrade( $installed ) {

        if ( $installed < 2 ) {
            self::upgrade_to_v2();
        }

        /*
        if ( $installed < 3 ) {
            self::upgrade_to_v3();
        }

        if ( $installed < 4 ) {
            self::upgrade_to_v4();
        }
        */
    }

    /**
     * 1.0.2 -> 1.0.3
     */
    protected static function upgrade_to_v2() {

        $old = get_option(
            'store_addons_for_woocommerce_options',
            []
        );

        if ( empty( $old ) ) {
            return;
        }

        $new = Utils::store_addons_for_woocommerce_get_option();

        /*
         * Product Badge
         */

        if ( isset( $old['product_badge'] ) ) {

            $badge = $old['product_badge'];

            $new['archive']['product_badge']['enabled']
                = (int) ( $badge['enable_product_badge'] ?? 1 );

            $new['archive']['product_badge']['badge_size']
                = $badge['sale_badge_size'] ?? '50';

            $new['archive']['product_badge']['badge_position']
                = $badge['sale_badge_position'] ?? 'left';

            $new['archive']['product_badge']['sale_badge']
                = self::map_sale_badge( $badge['sale_badge'] ?? '' );

            $new['archive']['product_badge']['sold_badge']
                = self::map_sold_badge( $badge['sold_badge'] ?? '' );
        }

        /*
         * Buy Now
         */

        if ( isset( $old['buy_now'] ) ) {

            $buy = $old['buy_now'];

            $new['product']['buy_now_button']['enabled']
                = (int) ( $buy['enable_buy_now'] ?? 1 );

            $new['product']['buy_now_button']['button_title']
                = $buy['title'] ?? 'Buy Now';
        }

        /*
         * Buy Together
         */

        if ( isset( $old['buy_together'] ) ) {

            $buy = $old['buy_together'];

            $new['product']['buy_together']['enabled']
                = (int) ( $buy['enable_buy_together'] ?? 1 );

            $new['product']['buy_together']['box_title']
                = $buy['title'] ?? 'Buy Together';
        }

        /*
         * Product Addons
         */

        if ( isset( $old['product_addons'] ) ) {

            $addon = $old['product_addons'];

            $new['product']['addon_items']['enabled']
                = (int) ( $addon['enable_product_addons'] ?? 1 );

            $new['product']['addon_items']['box_title']
                = $addon['title'] ?? 'Addon Items';
        }

        /*
         * Checkout Addons
         */

        if ( isset( $old['checkout_addons'] ) ) {

            $checkout = $old['checkout_addons'];

            $new['checkout']['product_placement']['enabled']
                = (int) ( $checkout['enable_checkout_addons'] ?? 1 );

            $new['checkout']['product_placement']['box_title']
                = $checkout['title'] ?? '';

            $new['checkout']['product_placement']['intro']
                = $checkout['intro'] ?? '';

            $new['checkout']['product_placement']['button_text']
                = $checkout['button_text'] ?? '';

            $new['checkout']['product_placement']['select_product']
                = $checkout['product'] ?? [];

            $new['checkout']['product_placement']['enable_for_products']
                = $checkout['products'] ?? [];
        }

        /*
         * Utilities
         */

        if ( isset( $old['more'] ) ) {

            $more = $old['more'];

            $new['utilities']['tools']['hide_plugin']
                = (int) ( $more['enable_scripts'] ?? 0 );

            // If you still use these values elsewhere,
            // consider creating a new "custom_code" section
            // instead of discarding them.
        }

        update_option(
            'store_addons_for_woocommerce_options',
            $new,
            false
        );
    }

    protected static function map_sale_badge( $url ) {

        $map = [
            'sale-badge-01.svg' => '1',
            'sale-badge-02.svg' => '2',
            'sale-badge-03.svg' => '3',
            'sale-badge-04.svg' => '4',
        ];

        foreach ( $map as $file => $id ) {
            if ( str_contains( $url, $file ) ) {
                return $id;
            }
        }

        return '1';
    }

    protected static function map_sold_badge( $url ) {

        $map = [
            'sold-badge-01.svg' => '1',
            'sold-badge-02.svg' => '2',
            'sold-badge-03.svg' => '3',
            'sold-badge-04.svg' => '4',
        ];

        foreach ( $map as $file => $id ) {
            if ( str_contains( $url, $file ) ) {
                return $id;
            }
        }

        return '1';
    }

}