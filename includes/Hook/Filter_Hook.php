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
        add_filter('store_addons_for_woocommerce_default_tables_modify', [ $this, 'modify_store_addons_for_woocommerce_default_tables' ]);

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
            'inputs' => [
                'basic_inputs' => [
                    'text' => '',
                    'textarea' => '',
                    'radio' => 'radio-1',
                    'select' => 'select-2',
                    'number' => '10',
                    'range' => '100',
                    'color' => '#ff0000',
                    'checkbox' => 0,
                    'switch' => 1,
                    'date' => '',
                    'time' => '',
                    'datetime' => '',
                ],
                'array_inputs' => [
                    'checkbox' => ['checkbox-1', 'checkbox-3']
                ],
                'complex_inputs' => [
                    'multiselect' => [],
                    'media' => [],
                    'repeater' => [],
                    'sortableaccordion' => [],
                    'imageselector' => '10',
                    'colorpicker' => '#ffffff',
                    'background' => [
                        'color' => '#ffffff',
                        'image' => [
                            'id' => '9',
                            'url' => 'http://localhost:10003/wp-content/uploads/2026/04/people-surfing-coasts-varkala-near-trivandrum-scaled.jpg',
                        ],
                        'position' => "left center",
                        'size' => "cover",
                        'repeat' => "no-repeat",
                        'origin' => "border-box",
                        'clip' => "content-box",
                        'attachment' => "scroll"
                    ],
                ],

            ],
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
            'inputs' => [
                'basic_inputs' => [
                    'text' => [
                        'title' => esc_html__('Text Input', 'store-addons-for-woocommerce'),
                        'intro' => esc_html__('This is a intro for Text Input', 'store-addons-for-woocommerce'),
                        'hint' => esc_html__('This is a hints for Text Input', 'store-addons-for-woocommerce'),
                        'before' => esc_html__('This is a before text for Text Input', 'store-addons-for-woocommerce'),
                        'after' => esc_html__('This is a after text for Text Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'textarea' => [
                        'title' => esc_html__('Textarea Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'radio' => [
                        'title' => esc_html__('Radio Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'select' => [
                        'title' => esc_html__('Select Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'number' => [
                        'title' => esc_html__('Number Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'range' => [
                        'title' => esc_html__('Range Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'color' => [
                        'title' => esc_html__('Color Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'checkbox' => [
                        'title' => esc_html__('Checkbox Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'switch' => [
                        'title' => esc_html__('Switch Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'date' => [
                        'title' => esc_html__('Date Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'time' => [
                        'title' => esc_html__('Time Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'datetime' => [
                        'title' => esc_html__('Datetime Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                ],
                'array_inputs' => [
                    'checkbox' => [
                        'title' => esc_html__('Checkbox Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/array_inputs',
                    ],
                ],
                'complex_inputs' => [
                    'multiselect' => [
                        'title' => esc_html__('Multiselect Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/complex_inputs',
                    ],
                    'media' => [
                        'title' => esc_html__('Media Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/complex_inputs',
                    ],
                    'repeater' => [
                        'title' => esc_html__('Repeater Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/complex_inputs',
                    ],
                    'sortableaccordion' => [
                        'title' => esc_html__('Sortable Accordion Input', 'store-addons-for-woocommerce'),
                        'url' => '/settings/inputs/complex_inputs',
                    ],
                ],

            ],
            'utilities' => [
                'tools' => [
                    'hide_plugin' => [
                        'title' => esc_html__('Hide Plugin', 'store-addons-for-woocommerce'),
                        'intro' => esc_html__('Hide this plugin from plugin list.', 'store-addons-for-woocommerce'),
                        'url' => '/settings/utilities/tools',
                    ],
                    // 'self_defense' => false, // delete, uninstall, none
                    // 'delete_data_on' => 'none', // delete, uninstall, none
                ],
            ],
            'feedback' => [
                'title' => esc_html__('Feedback', 'store-addons-for-woocommerce'),
                'intro' => esc_html__('Share feedback, report issues, or suggest improvements.', 'store-addons-for-woocommerce'),
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
     * Default options filter (still dynamic)
     */
    public function modify_store_addons_for_woocommerce_default_tables( $opts ) {
        $defaults = [
            ['store_addons_for_woocommerce_logs'],
	    ];
        return wp_parse_args( $opts, $defaults );
    }
}