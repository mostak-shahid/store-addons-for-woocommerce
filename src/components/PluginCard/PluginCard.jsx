import { __ } from "@wordpress/i18n";
import { useEffect, useState } from 'react';
import { formDataPost } from "../../lib/Helpers"; // Import utility function
import './PluginCard.scss';
export default function PluginCard({image, name, intro, plugin_source='internal', plugin_slug='', plugin_file='', download_url=''}) {
    /*
    data-sub_action="install_activate" 
    data-plugin_source="external" 
    data-download_url="https://github.com/mostak-shahid/mos-woocommerce-protected-categories/archive/refs/heads/main.zip"
    data-plugin_slug="mos-woocommerce-protected-categories-main" 
    data-plugin_file="mos-woocommerce-protected-categories.php" 

    data-sub_action="install_activate"  
    data-plugin_source="internal" 
    data-plugin_slug="mos-product-specifications-tab"
    */
    const [pluginStatus, setPluginStatus] = useState("checking");
    const [pluginFile, setPluginFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Check plugin status on component mount
    useEffect(() => {
        checkPluginStatus();
    }, [plugin_slug]);
    const checkPluginStatus = async () => {
        setPluginStatus("checking");
        setErrorMessage("");
        try {
            const result = await formDataPost('store_addons_for_woocommerce_ajax_plugins_status', {
                file:plugin_file,
            });
            console.log("Result:", result); // check structure here
            setPluginStatus(result?.data?.success_message); // Fix this line based on actual response
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            // setPluginStatusLoading(false);
        }
        // try {
        //     const response = await apiFetch({
        //         path: `/ultimate-security/v1/plugins/status`,
        //         method: "POST",
        //         data: {
        //             _wpnonce: window.ultimate_security_ajax_obj.security,
        //             slug: slug,
        //         },
        //     });

        //     if (response.status) {
        //         setPluginStatus(response.status);
        //         if (response.plugin_file) {
        //             setPluginFile(response.plugin_file);
        //         }
        //     } else {
        //         setPluginStatus("not_installed");
        //     }
        // } catch (error) {
        //     console.error("Error checking plugin status:", error);
        //     setPluginStatus("not_installed");
        // }
    };

    const handlePlugin = async () => {              
        // setProcessing(true);     
        // setActionError(null);   
        // setStatus(status === 'not_active'?'activating':'installing')         
        // try {
        //     const result = await formDataPost('store_addons_for_woocommerce_ajax_install_plugins', {
        //         sub_action:sub_action,
        //         download_url:download_url,                
        //         plugin_slug:plugin_slug,
        //         plugin_file:plugin_file,
        //         plugin_source:plugin_source,
        //     }); 
        //     console.log("Result:", result); // check structure here
        //     setStatus(result.data)
        // } catch (error) {
        //     setActionError(error.message);
        // } finally {
        //     setProcessing(false);
        //     // setStatus(status === 'activating'?'active':'not_active') 
        // }
    };
    
    
    const getButtonLabel = () => {
        switch (pluginStatus) {
            case "checking":
                return __("Checking...", "ultimate-security");
            case "not_installed":
                return __("Install Now", "ultimate-security");
            case "installed":
                return __("Activate", "ultimate-security");
            case "installing":
                return __("Installing...", "ultimate-security");
            case "installation_complete": // New state
                return __("Installed", "ultimate-security");
            case "activating":
                return __("Activating...", "ultimate-security");
            case "activated":
                return __("Activated", "ultimate-security");
            case "error":
                return __("Try Again", "ultimate-security");
            default:
                return __("Install Now", "ultimate-security");
        }
    };
    const handleButtonClick = () => {
		switch (pluginStatus) {
			case "not_installed":
				installPlugin();
				break;
			case "installed":
				activatePlugin();
				break;
			case "error":
				checkPluginStatus();
				break;
			default:
				break;
		}
	};       
    
    const installPlugin = async () => {
        setPluginStatus("installing");
        setErrorMessage("");
        setTimeout(() => {
            setPluginStatus("installed");
        }, 3000);
    };

    const activatePlugin = async () => {
        setPluginStatus("activating");
        setErrorMessage("");
        setTimeout(() => {
            setPluginStatus("activated");
        }, 3000);
    };
    const isButtonDisabled = ["checking", "installing", "activating","installation_complete"].includes(
		pluginStatus,
	);
    return (
        <div className="row g-2 PluginCard"> 
            <div>{name}</div>
            <button
                onClick={handleButtonClick}
                className={`install-button ${pluginStatus}`}
                disabled={isButtonDisabled}
            >
                {getButtonLabel()}
            </button>
        </div>
    )
}
