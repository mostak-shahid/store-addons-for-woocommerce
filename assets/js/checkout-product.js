jQuery(function ($) {
    // Set initial button state from PHP-localized data
    if (checkutProductData.already_in_cart) {
        $('.checkout-product-btn')
            .text('Remove Gift Wrap')
            .addClass('added')
            .attr('data-action', 'remove');
    }

    $(document).on('click', '.checkout-product-btn', function () {
        const $btn     = $(this);
        const $msg     = $btn.siblings('.checkout-product-message');
        const action   = $btn.attr('data-action'); // 'add' or 'remove'
        const button_text = $btn.attr('data-button_text');
        const ajaxAction = action === 'add'
            ? 'add_checkut_product_to_cart'
            : 'remove_checkut_product_from_cart';

        $btn.prop('disabled', true).text('Please wait...');
        $msg.hide();

        $.post(checkutProductData.ajax_url, {
            action: ajaxAction,
            nonce:  checkutProductData.nonce,
        })
        .done(function (response) {
            if (response.success) {
                $msg.text(response.data.message).css('color', 'green').show();

                // Toggle button for next click
                if (action === 'add') {
                    $btn.text('Added').addClass('added').attr('data-action', 'remove');
                } else {
                    $btn.text(button_text).removeClass('added').attr('data-action', 'add');
                }

                // Refresh WooCommerce order review totals
                $( document.body ).trigger( 'update_checkout' );
            } else {
                $msg.text(response.data.message).css('color', 'red').show();
                $btn.prop('disabled', false).text(
                    action === 'add' ? button_text : 'Added'
                );
            }
        })
        .fail(function () {
            $msg.text('Something went wrong. Please try again.').css('color', 'red').show();
            $btn.prop('disabled', false).text(
                action === 'add' ? button_text : 'Added'
            );
        });
    });
});