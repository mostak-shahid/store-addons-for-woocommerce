import { __ } from '@wordpress/i18n';
// import axios from "axios";
import { createContext, useContext, useState } from "react";
// import { extractJSONFromHTML } from "../lib/Helpers";
// import menuData from "../data/pages.json"; // Load menu JSON
const MainContext = createContext();
const settingsMenu = {
    "buy_together": { 
        "title": __( "Buy Together", "store-addons-for-woocommerce" ), 
        "description": __( "The Buy Together feature drives customers to add more items to their cart means more sales for you and increase in revenue. This enables an upsell section on the product page, suggest related items (usually bought together), and increase conversions.", "store-addons-for-woocommerce" ), 
        "url":"/settings/buy_together"
    },
    "product_addons": { 
        "title": __( "Product Addons", "store-addons-for-woocommerce" ), 
        "description": __( "The Product Addons feature allows you to add customizable abilities to your product, you can add optional features with your product for your customers", "store-addons-for-woocommerce" ), 
        "url":"/settings/product_addons"
    },
    "product_badge": { 
        "title": __( "Product Badge", "store-addons-for-woocommerce" ), 
        "description": __( "Product Badges helps you showcase key product details, or important info directly on your product images. Choose from pre-made badges, upload your own, or create custom badges with text or code.", "store-addons-for-woocommerce" ), 
        "url":"/settings/product_badge"
    },
    "import_export": { 
        "title": __( "Import & Expport", "store-addons-for-woocommerce" ), 
        "description": __( "Import and Export your settings.", "store-addons-for-woocommerce" ), 
        "url":"/settings/import_export"
    },
    "more": { 
        "title": __( "More", "store-addons-for-woocommerce" ), 
        "description": __( "Import and Export your settings.", "store-addons-for-woocommerce" ), 
        "url":"/settings/more"
    },
};
  

export const MainProvider = ({ children }) => {
    const [settingData, setSettingData] = useState({});
    const [settingLoading, setSettingLoading] = useState(true);
    const [settingReload, setSettingReload] = useState(true);
    return (
        <MainContext.Provider
            value={{
                settingData, 
                setSettingData,
                settingLoading,
                setSettingLoading,
                settingsMenu,
                settingReload, 
                setSettingReload
            }}
        >
            {children}
            {/* {console.log('settingData from contex API', settingData)} */}
        </MainContext.Provider>
    );
};

export const useMain = () => useContext(MainContext);
