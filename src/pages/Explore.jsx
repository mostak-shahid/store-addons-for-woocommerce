import { __ } from "@wordpress/i18n";
import axios from "axios";
import { useEffect } from 'react';
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import { formDataPost, setNestedValue } from "../lib/Helpers"; // Import utility function
const Explore = () => {
    const {
        settingData, 
        setSettingData,
        settingLoading,
        setSettingLoading,
        settingsMenu,
        settingReload,
        setSettingReload
    } = useMain();
    useEffect(() => {
        const baseURL = '/wp-json/store-addons-for-woocommerce/v1';        
        const fetchSettingData = async () => {
            try {
                const response = await axios.get(`${baseURL}/options`);
                setSettingData(response.data);
                setSettingLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchSettingData();
    }, [settingReload]);
    // Handle changes from child components
        const handleChange = (fieldPath, value) => {
            // console.log("Field changed:", fieldPath, "New value:", value);
            setSettingData(prev => {
                const updatedOptions = setNestedValue(prev, fieldPath, value);
                return { ...updatedOptions }; // Ensure React detects the update
            });
        };
        const handleSave = () => {
            setProcessing(true);
            setSaveLoading(true);
            setSaveError(null);
            axios.post(OPTIONS_API_URL, {'store_addons_for_woocommerce_options': settingData})
            .then(response => {
                window.scrollTo(0, 0);
                console.log("Settings saved successfully:", response.data);
                setSaveLoading(false)        
                setProcessing(false)
                setShowFormNotice(true)
                setTimeout(()=> {
                    setShowFormNotice(false)
                },3000)
            })
            .catch(
                error => console.error("Error saving settings:", error)
            );
        };
        const handleReset = async (name) => {
            console.log(name)
            const confirmation = window.confirm(__( "Are you sure you want to proceed?", "store-addons-for-woocommerce" ));
            let result;
            if (confirmation) {       
                setProcessing(true);     
                setResetLoading(true);
                setResetError(null);            
                try {
                    result = await formDataPost('store_addons_for_woocommerce_reset_settings', {name:name}); 
                    setSettingReload(Math.random);
                } catch (error) {
                    setResetError(error.message);
                } finally {
                    setResetLoading(false);
                    setProcessing(false);
                }
            }
        };
        const handleResetAll = async () => {
            const confirmation = window.confirm(__( "Are you sure you want to proceed?", "store-addons-for-woocommerce" ));
            let result;
            if (confirmation) {       
                setProcessing(true);     
                setResetAllLoading(true);
                setResetAllError(null);         
                try {
                    result = await formDataPost('store_addons_for_woocommerce_reset_all_settings', {}); 
                    setSettingReload(Math.random);
                } catch (error) {
                    setResetError(error.message);
                } finally {
                    setProcessing(false);     
                    setResetAllLoading(false);
                }
            }
        };
    return (
        <>
        <div className="store-addons-for-woocommerce-settings">

            <div className="container">
                <div className="card mt-0 rounded-0">
                    <div className="card-body">
                        <div className="setting-unit py-1">
                            <div className="row justify-content-between">
                                <div className="col-lg-7">
                                    {
                                        settingLoading 
                                        ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                        : <h4>{__("Buy Together", "store-addons-for-woocommerce")}</h4>
                                    }
                                    {
                                        settingLoading 
                                        ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                        : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "store-addons-for-woocommerce")}</p>
                                    }
                                </div>    
                                {
                                    !settingLoading &&                               
                                    <div className="col-auto">
                                        <Switch 
                                            name="settings.enable_buy_together"
                                            checked={settingData?.settings.enable_buy_together} // Pass "1"/"0" from API 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="setting-unit py-1">
                            <div className="row justify-content-between">
                                <div className="col-lg-7">
                                    {
                                        settingLoading 
                                        ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                        : <h4>{__("Product Addons", "store-addons-for-woocommerce")}</h4>
                                    }
                                    {
                                        settingLoading 
                                        ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                        : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "store-addons-for-woocommerce")}</p>
                                    }
                                </div>    
                                {
                                    !settingLoading &&                               
                                    <div className="col-auto">
                                        <Switch 
                                            name="settings.enable_product_addons"
                                            checked={settingData?.settings.enable_product_addons} // Pass "1"/"0" from API 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="setting-unit pt-1">
                            <div className="row justify-content-between">
                                <div className="col-lg-7">
                                    {
                                        settingLoading 
                                        ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                        : <h4>{__("Product Badge", "store-addons-for-woocommerce")}</h4>
                                    }
                                    {
                                        settingLoading 
                                        ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                        : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "store-addons-for-woocommerce")}</p>
                                    }
                                </div>    
                                {
                                    !settingLoading &&                               
                                    <div className="col-auto">
                                        <Switch 
                                            name="settings.enable_product_badge"
                                            checked={settingData?.settings.enable_product_badge} // Pass "1"/"0" from API 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Explore;