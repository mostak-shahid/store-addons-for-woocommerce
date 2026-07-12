<?php
namespace MosPress\StoreAddonsForWoocommerce\Hook;

if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\StoreAddonsForWoocommerce\Helpers\Utils;

class Filter_Hook {

    private $plugin_slug;      // store-addons-for-woocommerce
    private $plugin_basename;  // store-addons-for-woocommerce/store-addons-for-woocommerce.php
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {

        // Automatically detect plugin slug + basename
        $this->plugin_basename = plugin_basename( STORE_ADDONS_FOR_WOOCOMMERCE_MAIN_FILE ); 
        $this->plugin_slug     = dirname( $this->plugin_basename );

        /**
         * Now supports:
         * plugin_action_links_store-addons-for-woocommerce/store-addons-for-woocommerce.php
         * WITHOUT hard-coding strings.
         */
        add_filter(
            "plugin_action_links_{$this->plugin_basename}",
            [ $this, 'store_addons_for_woocommerce_add_action_links' ]
        );

        add_filter('admin_body_class', [ $this, 'store_addons_for_woocommerce_admin_body_class' ]);

        add_filter('store_addons_for_woocommerce_default_options_modify', [ $this, 'modify_store_addons_for_woocommerce_default_options' ]);
        add_filter('store_addons_for_woocommerce_default_options_details_modify', [ $this, 'modify_store_addons_for_woocommerce_default_options_details' ]);
        add_filter('store_addons_for_woocommerce_default_colors_modify', [ $this, 'modify_store_addons_for_woocommerce_default_colors' ]);
        add_filter('store_addons_for_woocommerce_default_gradients_modify', [ $this, 'modify_store_addons_for_woocommerce_default_gradients' ]);

        add_filter('store_addons_for_woocommerce_default_sale_badges_modify', [ $this, 'modify_store_addons_for_woocommerce_default_sale_badges' ]);
        add_filter('store_addons_for_woocommerce_default_sold_badges_modify', [ $this, 'modify_store_addons_for_woocommerce_default_sold_badges' ]);

        /**
         * Allow PRO add-ons or Module Federation remotes to inject links dynamically
         */
        add_filter('store_addons_for_woocommerce_action_links_extra', '__return_empty_array');

        

    }

    /**
     * Add Settings link + dynamic injected links
     */
    public function store_addons_for_woocommerce_add_action_links( $links ) {

        $default_links = [
            '<a href="' . admin_url("admin.php?page={$this->plugin_slug}") . '">' .
                esc_html__('Settings', 'store-addons-for-woocommerce') .
            '</a>',
            '<a href="https://mostak-shahid.github.io/plugins/store-addons-for-woocommerce.html" target="_blank">' .
                esc_html__('Docs', 'store-addons-for-woocommerce') .
            '</a>',
            '<a href="https://www.facebook.com/mospressbd" target="_blank">' .
                esc_html__('Community', 'store-addons-for-woocommerce') .
            '</a>',
        ];

        /**
         * Dynamic links injected from PRO plugin or remote MF
         * Example:
         * add_filter( 'store_addons_for_woocommerce_action_links_extra', function($links) {
         *     $links[] = '<a href="https://example.com/pro">Go Pro</a>';
         *     return $links;
         * });
         */
        $extra_links = apply_filters('store_addons_for_woocommerce_action_links_extra', []);

        return array_merge( $default_links, $extra_links, $links );
    }

    /**
     * Add body classes on plugin pages
     */
    public function store_addons_for_woocommerce_admin_body_class( $classes ) {
        if (Utils::store_addons_for_woocommerce_is_plugin_page()) {
            $classes .= ' ' . sanitize_html_class( $this->plugin_slug . '-settings-template' ) . ' ';
        }
        return $classes;
    }

    /**
     * Default options filter (still dynamic)
     */
    public function modify_store_addons_for_woocommerce_default_options( $opts ) {
        $defaults = [
            'general' => [
                'catalog_mode' => [
                    'enabled' => 0,
                    'query_button_enabled' => 0,
                    'query_button_text' => 'Request for a Quote',
                    'query_button_url' => '',
                    'hide_product_price' => 0,
                    'hide_product_variations' => 0,
                ],
            ],
            'archive' => [
                'product_badge' => [
                    'enabled' => 1,
                    'badge_size' => '50',
                    'badge_size_unit' => 'px',
                    'badge_position' => 'left',
                    'sale_badge' => '1',
                    'sold_badge' => '1',

                    // 'backorder_badge' => '1',

                    // 'low_stock_count' => '5',
                    // 'low_stock_badge' => '1',

                    // 'new_arrived_badge' => '1',
                    // 'free_shipping_badge' => '1',
                    // 'pre_order_badge' => '1',
                    // 'eco_friendly_badge' => '1',
                ],
            ],
            'product' => [
                'buy_now_button' => [
                    'enabled' => 1,
                    'button_title' => 'Buy Now',
                ],
                'buy_together' => [
                    'enabled' => 1,
                    'box_title' => 'Buy Together',
                ],
                'addon_items' => [
                    'enabled' => 1,
                    'box_title' => 'Addon Items',
                ],
            ],
            'cart' => [
                'content_placement' => [
                    'enabled' => 1,
                    'content' => [],
                    'layout' => 1,
                ],
            ],
            'checkout' => [
                'product_placement' => [
                    'enabled' => 1,
                    'box_title' => 'Special Offer For You',
                    'intro' => '',
                    'button_text' => 'Add to Cart',
                    'select_product' => [],
                    'enable_for_products' => [],
                ],
            ],
            'account' => [
                'dashboard' => [
                    'enabled' => 1,
                    'content' => '<p>Hello <strong>{{username}}</strong> (not <strong>{{username}}</strong>? {{logout_url}})</p><p>From your account dashboard you can view your {{recent_orders}}, manage your {{edit_address}}, and {{edit_account}}.</p>',
                ],
            ],

            // 'inputs' => [
            //     'basic_inputs' => [
            //         'text' => '',
            //     ],
            // ],
            'utilities' => [
                'tools' => [
                    'hide_plugin' => 0, // delete, uninstall, none
                    // 'self_defense' => false, // delete, uninstall, none
                    // 'delete_data_on' => 'none', // delete, uninstall, none
                ],
            ]
        ];
        return wp_parse_args( $opts, $defaults );
    }
    /**
     * Default options details filter (still dynamic)
     */
    public function modify_store_addons_for_woocommerce_default_options_details( $opts ) {
        $defaults = [ 
            'general' => [
                'catalog_mode' => [
                    'enabled' => [
                        'title' => __('Enable Catalog Mode', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn catalog mode on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to catalog mode on products.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/general/catalog_mode',
                    ],
                    'query_button_enabled' => [
                        'title' => __('Enable Query Button', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn query button on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to query button on products.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/general/catalog_mode',
                    ],
                    'query_button_text' => [                        
                        'title' => __('Query Button Button Text', 'store-addons-for-woocommerce'),
                        'intro' => __('Set the button label.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter the text shown on the button.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/general/catalog_mode',
                    ],
                    'query_button_url' => [                        
                        'title' => __('Query Button Button URL', 'store-addons-for-woocommerce'),
                        'intro' => __('Set the button link.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter the link for the query button.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/general/catalog_mode',
                    ],                    
                    'hide_product_price' => [ 
                        'title' => __('Hide product price', 'store-addons-for-woocommerce'),
                        'intro' => __('Use this option to hide product price where "Add to cart" is hidden.', 'store-addons-for-woocommerce'),
                        'hint' => __('This will hide the product price from variable products.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/general/catalog_mode',
                    ],                 
                    'hide_product_variations' => [ 
                        'title' => __('Hide product variations', 'store-addons-for-woocommerce'),
                        'intro' => __('Use this option to hide product variations where "Add to cart" is hidden.', 'store-addons-for-woocommerce'),
                        'hint' => __('This will hide the product variation from variable products.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/general/catalog_mode',
                    ],      
                ],
            ],
            
            'archive' => [
                'product_badge' => [
                    'enabled' => [
                        'title' => __('Enable Product Badges', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn product badges on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to display badges on products.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/archive/product_badge',
                    ],
                    'badge_size' => [                        
                        'title' => __('Badge Size', 'store-addons-for-woocommerce'),
                        'intro' => __('Set the badge display size.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter the badge size and unit.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/archive/product_badge',
                    ],
                    'badge_position' => [                        
                        'title' => __('Badge Position', 'store-addons-for-woocommerce'),
                        'intro' => __('Choose where badges appear.', 'store-addons-for-woocommerce'),
                        'hint' => __('Select the badge placement on product images.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/archive/product_badge',
                    ],
                    'sale_badge' => [                        
                        'title' => __('Sale Badge', 'store-addons-for-woocommerce'),
                        'intro' => __('Select the Sale badge image.', 'store-addons-for-woocommerce'),
                        'hint' => __('Choose an image for sale products.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/archive/product_badge',
                    ],
                    'sold_badge' => [                        
                        'title' => __('Sold Badge', 'store-addons-for-woocommerce'),
                        'intro' => __('Select the Sold Out badge image.', 'store-addons-for-woocommerce'),
                        'hint' => __('Choose an image for out-of-stock products.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/archive/product_badge',
                    ],
                ],
            ],          
            'product' => [
                'buy_now_button' => [
                    'enabled' => [
                        'title' => __('Enable Buy Now', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn the Buy Now feature on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to add a Buy Now button.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/product/buy_now_button',
                    ],
                    'button_title' => [
                        'title' => __('Buy Now button title', 'store-addons-for-woocommerce'),
                        'intro' => __('Set the Buy Now button label.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter the text shown on the button.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/product/buy_now_button',
                    ],
                ],
                'buy_together' => [
                    'enabled' => [
                        'title' => __('Enable Buy Together', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn Buy Together on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to show recommended products.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/product/buy_together',
                    ],
                    'box_title' => [
                        'title' => __('Buy Together box Title', 'store-addons-for-woocommerce'),
                        'intro' => __('Set the recommendation box title.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter a heading for the recommendation box.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/product/buy_together',
                    ],
                ],
                'addon_items' => [
                    'enabled' => [
                        'title' => __('Enable Addon Items', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn addon items on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to display addon items.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/product/addon_items',
                    ],
                    'box_title' => [
                        'title' => __('Addon Items box Title', 'store-addons-for-woocommerce'),
                        'intro' => __('Set the addon section title.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter a heading for the addon items box.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/product/addon_items',
                    ],
                ],
            ],

            'cart' => [
                'content_placement' => [
                    'enabled' => [
                        'title' => __('Cart Content Placement', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn cart content placement on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to display custom cart content.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/cart/content_placement',
                    ],
                    'content' => [
                        'title' => __('Cart extra Content', 'store-addons-for-woocommerce'),
                        'intro' => __('Manage custom content blocks.', 'store-addons-for-woocommerce'),
                        'hint' => __('Add, reorder, or remove content sections.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/cart/content_placement',
                    ],
                    'layout' => [
                        'title' => __('Cart Content Placement Layout', 'store-addons-for-woocommerce'),
                        'intro' => __('Choose a display layout.', 'store-addons-for-woocommerce'),
                        'hint' => __('Select the preferred content layout.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/cart/content_placement',
                    ],
                ]
            ],

            'checkout' => [
                'product_placement' => [
                    'enabled' => [
                        'title' => __('Checkout Product Placement', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn checkout product placement on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to promote products during checkout.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/checkout/product_placement',
                    ],
                    'box_title' => [
                        'title' => __('Product Placement Title', 'store-addons-for-woocommerce'),
                        'intro' => __('Set the section title.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter a heading for the product box.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/checkout/product_placement',
                    ],
                    'intro' => [
                        'title' => __('Product Placement Intro', 'store-addons-for-woocommerce'),
                        'intro' => __('Add introductory content.', 'store-addons-for-woocommerce'),
                        'hint' => __('Write a short message for customers.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/checkout/product_placement',
                    ],
                    'button_text' => [
                        'title' => __('Product Placement Button Text', 'store-addons-for-woocommerce'),
                        'intro' => __('Set the button label.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter the text shown on the button.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/checkout/product_placement',
                    ],
                    'select_product' => [
                        'title' => __('Select Product', 'store-addons-for-woocommerce'),
                        'intro' => __('Choose a product to display.', 'store-addons-for-woocommerce'),
                        'hint' => __('Select the product to promote.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/checkout/product_placement',
                    ],
                    'enable_for_products' => [
                        'title' => __('Enable for Products', 'store-addons-for-woocommerce'),
                        'intro' => __('Choose eligible products.', 'store-addons-for-woocommerce'),
                        'hint' => __('Select products where this box appears.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/checkout/product_placement',
                    ],
                ],
            ],

            'account' => [
                'dashboard' => [
                    'enabled' => [
                        'title' => __('Account Dashboard', 'store-addons-for-woocommerce'),
                        'intro' => __('Turn dashboard customization on or off.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enable to customize the dashboard page.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/account/dashboard',
                    ],
                    'content' => [
                        'title' => __('Dashboard Content', 'store-addons-for-woocommerce'),
                        'intro' => __('Add custom dashboard content.', 'store-addons-for-woocommerce'),
                        'hint' => __('Enter the content shown on the dashboard.', 'store-addons-for-woocommerce'),
                        'after' => __('You can use these dynamic phrases', 'store-addons-for-woocommerce') . ': <strong>{{username}}</strong>, <strong>{{user_email}}</strong>, <strong>{{user_id}}</strong>, <strong>{{user_role}}</strong>, <strong>{{user_registered_date}}</strong>,  <strong>{{logout_url}}</strong>, <strong>{{recent_orders}}</strong>, <strong>{{edit_address}}</strong>, <strong>{{edit_account}}</strong>',
                        'url' => '/settings/account/dashboard',
                    ],
                ]
            ],

            // 'inputs' => [
            //     'basic_inputs' => [
            //         'text' => [
            //             'title' => __('Text Input', 'store-addons-for-woocommerce'),
            //             'intro' => __('This is a intro for Text Input', 'store-addons-for-woocommerce'),
            //             'hint' => __('This is a hints for Text Input', 'store-addons-for-woocommerce'),
            //             'before' => __('This is a before text for Text Input', 'store-addons-for-woocommerce'),
            //             'after' => __('This is a after text for Text Input', 'store-addons-for-woocommerce'),
            //             'url' => '/settings/inputs/basic_inputs',
            //         ],
            //     ],
            // ],
            'utilities' => [
                'tools' => [
                    'hide_plugin' => [
                        'title' => __('Hide Plugin', 'store-addons-for-woocommerce'),
                        'intro' => __('Hide this plugin from plugin list.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/utilities/tools',
                    ],
                    // 'self_defense' => false, // delete, uninstall, none
                    // 'delete_data_on' => 'none', // delete, uninstall, none
                ],
            ],
            'feedback' => [
                'title' => __('Feedback', 'store-addons-for-woocommerce'),
                'intro' => __('Share feedback, report issues, or suggest improvements.', 'store-addons-for-woocommerce'),
                'url' => '/feedback',

            ]
        ];
        return wp_parse_args( $opts, $defaults );
    }

    /**
     * Default options filter (still dynamic)
     */
    public function modify_store_addons_for_woocommerce_default_colors( $opts ) {
        $defaults = [
            ['name' => esc_html__('Black', 'store-addons-for-woocommerce'), 'color' => '#000000'],
            ['name' => esc_html__('Blue', 'store-addons-for-woocommerce'), 'color' => '#0073AA'],
            ['name' => esc_html__('Cyan', 'store-addons-for-woocommerce'), 'color' => '#00A0D2'],
            ['name' => esc_html__('Deep Blue', 'store-addons-for-woocommerce'), 'color' => '#005075'],
            ['name' => esc_html__('Deep Purple', 'store-addons-for-woocommerce'), 'color' => '#23036A'],
            ['name' => esc_html__('Gold', 'store-addons-for-woocommerce'), 'color' => '#FFB900'],
            ['name' => esc_html__('Gray', 'store-addons-for-woocommerce'), 'color' => '#888888'],
            ['name' => esc_html__('Green', 'store-addons-for-woocommerce'), 'color' => '#008000'],
            ['name' => esc_html__('Light Gray', 'store-addons-for-woocommerce'), 'color' => '#E6E6E6'],
            ['name' => esc_html__('Lime Green', 'store-addons-for-woocommerce'), 'color' => '#82C91E'],
            ['name' => esc_html__('Navy Blue', 'store-addons-for-woocommerce'), 'color' => '#001F3F'],
            ['name' => esc_html__('Orange', 'store-addons-for-woocommerce'), 'color' => '#FF6600'],
            ['name' => esc_html__('Pink', 'store-addons-for-woocommerce'), 'color' => '#FF4081'],
            ['name' => esc_html__('Purple', 'store-addons-for-woocommerce'), 'color' => '#800080'],
            ['name' => esc_html__('Red', 'store-addons-for-woocommerce'), 'color' => '#FF0000'],
            ['name' => esc_html__('Silver', 'store-addons-for-woocommerce'), 'color' => '#C0C0C0'],
            ['name' => esc_html__('White', 'store-addons-for-woocommerce'), 'color' => '#FFFFFF'],
            ['name' => esc_html__('Yellow', 'store-addons-for-woocommerce'), 'color' => '#FFFF00'],
        ];
        return wp_parse_args( $opts, $defaults );
    }

    /**
     * Default options filter (still dynamic)
     */
    public function modify_store_addons_for_woocommerce_default_gradients( $opts ) {
        $defaults = [
            ['name' => esc_html__('Blue to Purple', 'store-addons-for-woocommerce'), 'gradient' => 'linear-gradient(135deg, #0064fa 0%, #800080 100%)'],
            ['name' => esc_html__('Pink to Orange', 'store-addons-for-woocommerce'), 'gradient' => 'linear-gradient(135deg, #ff4081 0%, #ff6600 100%)'],
            ['name' => esc_html__('Cyan to Blue', 'store-addons-for-woocommerce'), 'gradient' => 'linear-gradient(135deg, #00a0d2 0%, #0073aa 100%)'],
            ['name' => esc_html__('Lime Green to Green', 'store-addons-for-woocommerce'), 'gradient' => 'linear-gradient(135deg, #82c91e 0%, #008000 100%)'],
            ['name' => esc_html__('Gold to Orange', 'store-addons-for-woocommerce'), 'gradient' => 'linear-gradient(135deg, #ffb900 0%, #ff6600 100%)'],
            ['name' => esc_html__('Red to Deep Purple', 'store-addons-for-woocommerce'), 'gradient' => 'linear-gradient(135deg, #ff0000 0%, #23036a 100%)'],
            ['name' => esc_html__('Yellow to Lime Green', 'store-addons-for-woocommerce'), 'gradient' => 'linear-gradient(135deg, #ffff00 0%, #82c91e 100%)'],
            ['name' => esc_html__('Silver to Gray', 'store-addons-for-woocommerce'), 'gradient' => 'linear-gradient(135deg, #c0c0c0 0%, #888888 100%)'],
	    ];
        return wp_parse_args( $opts, $defaults );
    }
    

    /**
     * Default sale badge (still dynamic)
     */
    public function modify_store_addons_for_woocommerce_default_sale_badges( $opts ) {
        $defaults = [
            ['id' => 1, 'src' =>STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sale-badge-01.svg'],
            ['id' => 2, 'src' =>STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sale-badge-02.svg'],
            ['id' => 3, 'src' =>STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sale-badge-03.svg'],
            ['id' => 4, 'src' =>STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sale-badge-04.svg'],
	    ];
        return wp_parse_args( $opts, $defaults );
    }
    

    /**
     * Default sold badge (still dynamic)
     */
    public function modify_store_addons_for_woocommerce_default_sold_badges( $opts ) {
        $defaults = [
            ['id' => 1, 'src' =>STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sold-badge-01.svg'],
            ['id' => 2, 'src' =>STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sold-badge-02.svg'],
            ['id' => 3, 'src' =>STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sold-badge-03.svg'],
            ['id' => 4, 'src' =>STORE_ADDONS_FOR_WOOCOMMERCE_URL . 'assets/images/sold-badge-04.svg'],
	    ];
        return wp_parse_args( $opts, $defaults );
    }
}