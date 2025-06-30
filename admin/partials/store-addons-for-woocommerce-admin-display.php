<?php
// If this file is called directly, abort.
if (!defined('ABSPATH')) die;
$store_addons_for_woocommerce_options = store_addons_for_woocommerce_get_option();
// var_dump($store_addons_for_woocommerce_options);
$actual_link = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://" . (isset($_SERVER['HTTP_HOST']) && isset($_SERVER['REQUEST_URI'])) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_HOST'])) . sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';

$dataOptions = [
    'option-1' => esc_html__('Option 1', 'store-addons-for-woocommerce'),
    'option-2' => esc_html__('Option 2', 'store-addons-for-woocommerce'),
    'option-3' => esc_html__('Option 3', 'store-addons-for-woocommerce'),
    'option-4' => esc_html__('Option 4', 'store-addons-for-woocommerce'),
]

?>
<div class="store-addons-for-woocommerce-settings-wrapper">
    <form method='post'>
        <?php wp_nonce_field('options_form_action', 'options_form_field'); ?>
        <div class="store-addons-for-woocommerce-settings-container">
            <div class="store-addons-for-woocommerce-settings">
                <div class="part-title">
                    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
                </div>
                <div class="part-options">
                    <?php
                    if (isset($_POST['options_form_field']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['options_form_field'])), 'options_form_action')) {
                        if (isset($_POST['settings-updated'])) {
                            add_settings_error('store-addons-for-woocommerce-messages', 'store-addons-for-woocommerce-message', esc_html__('All changes have been applied correctly, ensuring your preferences are now in effect.', 'store-addons-for-woocommerce'), 'updated');
                        }
                        settings_errors('store-addons-for-woocommerce-messages');
                    }
                    ?>
                    <table class="form-table" role="presentation">
                        <tbody>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="text_input"><?php echo esc_html__('Text Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative input_text">
                                        <label for="text_input">
                                            <input type="text" name="store_addons_for_woocommerce_options[base_input][text_input]" id="text_input" value="<?php echo isset($store_addons_for_woocommerce_options['base_input']['text_input']) ? esc_html($store_addons_for_woocommerce_options['base_input']['text_input']) : '' ?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="email_input"><?php echo esc_html__('Email Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative input_email">
                                        <label for="email_input">
                                            <input type="email" name="store_addons_for_woocommerce_options[base_input][email_input]" id="email_input" value="<?php echo isset($store_addons_for_woocommerce_options['base_input']['email_input']) ? esc_html($store_addons_for_woocommerce_options['base_input']['email_input']) : '' ?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="color_input"><?php echo esc_html__('Color Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative input_color">
                                        <label for="color_input">
                                            <input type="color" name="store_addons_for_woocommerce_options[base_input][color_input]" id="color_input" value="<?php echo isset($store_addons_for_woocommerce_options['base_input']['color_input']) ? esc_html($store_addons_for_woocommerce_options['base_input']['color_input']) : '' ?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="date_input"><?php echo esc_html__('Date Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative input_date">
                                        <label for="date_input">
                                            <input type="date" name="store_addons_for_woocommerce_options[base_input][date_input]" id="date_input" value="<?php echo isset($store_addons_for_woocommerce_options['base_input']['date_input']) ? esc_html($store_addons_for_woocommerce_options['base_input']['date_input']) : '' ?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="datetime_local_input"><?php echo esc_html__('Datetime local Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative input_datetime_local">
                                        <label for="datetime_local_input">
                                            <input type="datetime-local" name="store_addons_for_woocommerce_options[base_input][datetime_local_input]" id="datetime_local_input" value="<?php echo isset($store_addons_for_woocommerce_options['base_input']['datetime_local_input']) ? esc_html($store_addons_for_woocommerce_options['base_input']['datetime_local_input']) : '' ?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="textarea_input"><?php echo esc_html__('Textarea', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative textarea">
                                        <label for="textarea_input">
                                            <textarea type="text" name="store_addons_for_woocommerce_options[base_input][textarea_input]" id="textarea_input"><?php echo isset($store_addons_for_woocommerce_options['base_input']['textarea_input']) ? esc_html($store_addons_for_woocommerce_options['base_input']['textarea_input']) : '' ?></textarea>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="switch_input"><?php echo esc_html__('Enable Product Tabs', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative store-addons-for-woocommerce-switcher">
                                        <label for="store_addons_for_woocommerce_options_switch_input">
                                            <input type="checkbox" name="store_addons_for_woocommerce_options[base_input][switch_input]" id="store_addons_for_woocommerce_options_switch_input" value="1" <?php checked( $store_addons_for_woocommerce_options['base_input']['switch_input'] ?? null, 1 ); ?>>
                                            <em data-on="on" data-off="off"></em>
                                            <span></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="radio_input"><?php echo esc_html__('Radio Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative radio">
                                        <div class="radio-wrapper">
                                            <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                <?php foreach ($dataOptions as $key => $value) : ?>
                                                    <div class="radio-unit">
                                                        <input class="radio_input radio_input-1" name="store_addons_for_woocommerce_options[base_input][radio_input]" id="radio_input-<?php echo esc_html(sanitize_title($key)) ?>" type="radio" value="<?php echo esc_html($key) ?>" <?php checked($store_addons_for_woocommerce_options['base_input']['radio_input'] ?? null, $key) ?>>
                                                        <label for="radio_input-<?php echo esc_html(sanitize_title($key)) ?>"><span></span> <?php echo esc_html($value) ?></label>
                                                    </div>
                                                <?php endforeach ?>
                                            <?php endif ?>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="datalist_input"><?php echo esc_html__('Datalist Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative datalist">
                                        <label for="datalist_input">
                                            <input list="store_addons_for_woocommerce_options_datalist_input" name="store_addons_for_woocommerce_options[base_input][datalist_input]" id="datalist_input" value="<?php echo isset($store_addons_for_woocommerce_options['base_input']['datalist_input']) ? esc_html($store_addons_for_woocommerce_options['base_input']['datalist_input']) : '' ?>">
                                        </label>
                                        <datalist id="store_addons_for_woocommerce_options_datalist_input">
                                            <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                <?php foreach ($dataOptions as $key => $value) : ?>
                                                    <option><?php echo esc_html($value) ?></option>
                                                <?php endforeach ?>
                                            <?php endif ?>
                                        </datalist>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="select_input"><?php echo esc_html__('Select Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative select">

                                        <label for="select_input">
                                            <select name="store_addons_for_woocommerce_options[base_input][select_input]" id="select_input">
                                                <option value=""><?php echo esc_html__('Select One', 'store-addons-for-woocommerce') ?></option>
                                                <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                    <?php foreach ($dataOptions as $key => $value) : ?>
                                                        <option value="<?php echo esc_html($key) ?>" <?php selected($store_addons_for_woocommerce_options['base_input']['select_input'] ?? null, $key) ?>><?php echo esc_html($value) ?></option>
                                                    <?php endforeach ?>
                                                <?php endif ?>
                                            </select>
                                        </label>
                                    </div>
                                </td>
                            </tr>

                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="checkbox_input"><?php echo esc_html__('Checkbox Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative select">
                                        <div class="checkbox-group" id="checkbox_input">
                                            <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                <?php foreach ($dataOptions as $key => $value) : ?>
                                                    <div class="checkbox-unit">
                                                        <label>
                                                            <input type="checkbox" value="<?php echo esc_html($key) ?>" name="store_addons_for_woocommerce_options[array_input][checkbox_input][]" <?php checked( in_array( $key, $store_addons_for_woocommerce_options['array_input']['checkbox_input'] ?? [] ) ); ?>>
                                                            <span><?php echo esc_html($value) ?></span>
                                                        </label>
                                                    </div>
                                                <?php endforeach ?>
                                            <?php endif ?>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="multi-select_input"><?php echo esc_html__('Multi Select Input', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative select">
                                        <label for="multi-select_input">
                                            <select name="store_addons_for_woocommerce_options[array_input][multi-select_input][]" id="multi-select_input" multiple>
                                                <?php if (isset($dataOptions) && sizeof($dataOptions)) : ?>
                                                    <?php foreach ($dataOptions as $key => $value) : ?>
                                                        <option value="<?php echo esc_html($key) ?>" <?php selected(in_array($key, $store_addons_for_woocommerce_options['array_input']['multi-select_input'] ?? [] )) ?>><?php echo esc_html($value) ?></option>
                                                    <?php endforeach ?>
                                                <?php endif ?>
                                            </select>
                                        </label>
                                    </div>
                                </td>
                            </tr>

                            <!-- <tr class="store_addons_for_woocommerce_row">
                                <th scope="row"><label for="editor_input"><?php echo esc_html__('Editor', 'store-addons-for-woocommerce') ?></label></th>
                                <td>
                                    <div class="position-relative textarea">
                                        <label for="editor_input">
                                            <?php
                                            // $editor_id = esc_html(sanitize_title('editor_input'));
                                            // $arg = array(
                                            //     'textarea_name' => esc_html('store_addons_for_woocommerce_options[editor_input]'),
                                            // );
                                            // wp_editor($store_addons_for_woocommerce_options['editor_input'], $editor_id, $arg);
                                            ?>
                                        </label>
                                    </div>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php //submit_button(); 
        ?>
        <p class="submit">
            <input type="submit" name="submit" id="submit" class="button button-primary" value="<?php echo esc_html__('Save Changes', 'store-addons-for-woocommerce') ?>">
            <button class="button store-addons-for-woocommerce-button-reset button-secondary" data-name="base_input" data-url="<?php echo esc_url($actual_link) ?>"><?php echo esc_html__('Reset', 'store-addons-for-woocommerce') ?></button>


            <button type="button" data-sub_action="install_activate" data-plugin_source="external" data-download_url="https://github.com/mostak-shahid/mos-woocommerce-protected-categories/archive/refs/heads/main.zip" data-plugin_slug="mos-woocommerce-protected-categories-main" data-plugin_file="mos-woocommerce-protected-categories-main/mos-woocommerce-protected-categories.php" id="mos-install-activate" class="store-addons-for-woocommerce-install-github-plugin button button-primary">Install & Activate Plugin</button>
            <button type="button" data-sub_action="install" data-plugin_source="external" data-download_url="https://github.com/mostak-shahid/mos-woocommerce-protected-categories/archive/refs/heads/main.zip" data-plugin_slug="mos-woocommerce-protected-categories-main" data-plugin_file="mos-woocommerce-protected-categories-main/mos-woocommerce-protected-categories.php" id="mos-install" class="store-addons-for-woocommerce-install-github-plugin button">Install Plugin</button>
            <button type="button" data-sub_action="activate" data-plugin_source="external" data-download_url="https://github.com/mostak-shahid/mos-woocommerce-protected-categories/archive/refs/heads/main.zip" data-plugin_slug="mos-woocommerce-protected-categories-main" data-plugin_file="mos-woocommerce-protected-categories-main/mos-woocommerce-protected-categories.php" id="mos-activate" class="store-addons-for-woocommerce-install-github-plugin button">Activate Plugin</button>

            <!-- mos-product-specifications-tab -->
            <button type="button" data-sub_action="install_activate"  data-plugin_source="internal" data-plugin_slug="mos-product-specifications-tab" id="mos-install-activate" class="store-addons-for-woocommerce-install-github-plugin button button-primary">Install & Activate Plugin</button>
            <button type="button" data-sub_action="install"  data-plugin_source="internal" data-plugin_slug="mos-product-specifications-tab" id="mos-install" class="store-addons-for-woocommerce-install-github-plugin button">Install Plugin</button>
            <button type="button" data-sub_action="activate"  data-plugin_source="internal" data-plugin_slug="mos-product-specifications-tab" id="mos-activate" class="store-addons-for-woocommerce-install-github-plugin button">Activate Plugin</button>


        </p>
    </form>
</div>