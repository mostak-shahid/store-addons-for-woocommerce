jQuery(function ($) {
    // Set initial button state from PHP-localized data
    if (giftWrapData.already_in_cart) {
        $('.gift-wrap-btn')
            .text('Remove Gift Wrap')
            .addClass('added')
            .attr('data-action', 'remove');
    }

    $(document).on('click', '.gift-wrap-btn', function () {
        const $btn     = $(this);
        const $msg     = $btn.siblings('.gift-wrap-message');
        const action   = $btn.attr('data-action'); // 'add' or 'remove'
        const button_text = $btn.attr('data-button_text');
        const ajaxAction = action === 'add'
            ? 'add_gift_wrap_to_cart'
            : 'remove_gift_wrap_from_cart';

        $btn.prop('disabled', true).text('Please wait...');
        $msg.hide();

        $.post(giftWrapData.ajax_url, {
            action: ajaxAction,
            nonce:  giftWrapData.nonce,
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