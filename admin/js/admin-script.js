jQuery(document).ready(function($) {    
    var $tabs = $("#store-addons-for-woocommerce-settings-tabs").tabs();

    // On tab change, store index in hidden input
    $tabs.on("tabsactivate", function(event, ui){
        var active = $tabs.tabs("option", "active");
        $("#active_tab_input").val(active);
    });

    // Read from hidden input to set the tab on load
    var activeIndex = parseInt($("#active_tab_input").val());
    if(!isNaN(activeIndex)) {
        $tabs.tabs("option", "active", activeIndex);
    }
});