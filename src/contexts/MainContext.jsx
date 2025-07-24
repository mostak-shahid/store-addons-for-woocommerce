import { __ } from '@wordpress/i18n';
// import axios from "axios";
import { createContext, useContext, useState } from "react";
// import { extractJSONFromHTML } from "../lib/Helpers";
// import menuData from "../data/pages.json"; // Load menu JSON
const MainContext = createContext();
const settingsMenu = {
    "buy_together": { 
        "title": __( "Buy Together", "store-addons-for-woocommerce" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "store-addons-for-woocommerce" ), 
        "url":"/settings/buy_together"
    },
    "product_addons": { 
        "title": __( "Product Addons", "store-addons-for-woocommerce" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "store-addons-for-woocommerce" ), 
        "url":"/settings/product_addons"
    },
    "product_badge": { 
        "title": __( "Product Badge", "store-addons-for-woocommerce" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "store-addons-for-woocommerce" ), 
        "url":"/settings/product_badge"
    },
    "base_input": { 
        "title": __( "Base Input", "store-addons-for-woocommerce" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "store-addons-for-woocommerce" ), 
        "url":"/settings/base_input"
    },    
	"dropdown": { 
        "title": __( "Dropdown", "store-addons-for-woocommerce" ), 
        "url":"/settings/dropdown",      
        "sub": {
            "dropdown-1" : {
                "title": __( "Dropdown 1", "store-addons-for-woocommerce" ),                
                "url":"/settings/dropdown/dropdown-1",
            },
            "dropdown-2" : {
                "title": __( "Dropdown 2", "store-addons-for-woocommerce" ),
                "url":"/settings/dropdown/dropdown-2",
            }
        }
    },
    'array_input': {
        "title": __( "Array Input", "store-addons-for-woocommerce" ),
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "store-addons-for-woocommerce" ), 
        "url":"/settings/array_input",
    },
    "components": { 
        "title": __( "Components", "store-addons-for-woocommerce" ), 
        "url":"/settings/components",      
        "sub": {
            "basic" : {
                "title": __( "Basic", "store-addons-for-woocommerce" ),                
                "url":"/settings/components/basic",
            },
            "advanced" : {
                "title": __( "Advanced", "store-addons-for-woocommerce" ),
                "url":"/settings/components/advanced",
                "sub": {
                    "advanced-1" : {
                        "title": __( "Advanced 1", "store-addons-for-woocommerce" ),                
                        "url":"/settings/components/advanced/advanced-1",
                    },
                    "advanced-2" : {
                        "title": __( "Advanced 2", "store-addons-for-woocommerce" ),
                        "url":"/settings/components/advanced/advanced-2",                        
                    }
                }
            }
        }
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
