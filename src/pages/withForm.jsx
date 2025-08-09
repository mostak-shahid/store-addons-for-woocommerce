
import { __ } from "@wordpress/i18n";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MultiLevelListGroup from "../components/MultiLevelListGroup/MultiLevelListGroup";
import PageInfo from "../components/PageInfo/PageInfo";
import { useMain } from "../contexts/MainContext";
import Notice from "../layouts/Notice/Notice";
import { formDataPost, setNestedValue, urlToArr } from "../lib/Helpers"; // Import utility function
const withForm = (OriginalComponent) => {     
    function NewComponent() {
        const {
            settingData, 
            setSettingData,
            settingLoading,
            setSettingLoading,
            settingsMenu,
            settingReload,
            setSettingReload
        } = useMain();
        
        const [saveLoading, setSaveLoading] = useState(false)
        const [saveError, setSaveError] = useState(null)

        const [showFormNotice, setShowFormNotice] = useState(false)

        const [resetLoading, setResetLoading] = useState(false)
        const [resetError, setResetError] = useState(null)

        const [resetAllLoading, setResetAllLoading] = useState(false)
        const [resetAllError, setResetAllError] = useState(null)
        
        const [processing, setProcessing] = useState(false)

        const urlArr = urlToArr();

        const location = useLocation();
        
        const OPTIONS_API_URL = "/wp-json/store-addons-for-woocommerce/v1/options";

        useEffect(() => {
            const baseURL = '/wp-json/store-addons-for-woocommerce/v1';        
            const fetchSettingData = async () => {
                try {
                    const response = await axios.get(`${baseURL}/options`, {headers: {'X-WP-Nonce': store_addons_for_woocommerce_ajax_obj.api_nonce }});
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
            axios.post(
                OPTIONS_API_URL, 
                {'store_addons_for_woocommerce_options': settingData},
                {
                    headers: {
                        'X-WP-Nonce': store_addons_for_woocommerce_ajax_obj.api_nonce,
                        'Content-Type': 'application/json'
                    }
                }
            )
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
        useEffect(() => {
        }, [])
        return (
            <>
                {
                    showFormNotice && 
                    <div className="container mt-4"><Notice /></div>
                }
                <div className="store-addons-for-woocommerce-settings">
                    <div className="container">
                        <div className="row g-0">
                            <div className="col-lg-3 d-none d-lg-block">
                                <div className="store-addons-for-woocommerce-sidebar card mt-0 py-3 rounded-0" style={{marginRight:'-1px', height: "100%"}}>                            
                                    <MultiLevelListGroup  data={settingsMenu}/>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="card mt-0 rounded-0" style={{height: "100%"}}>
                                    <PageInfo url={location.pathname} />
                                    <div className="card-body">        
                                        <OriginalComponent handleChange={handleChange} />
                                    </div>
                                    {/* {console.log(location.pathname)} */}
                                    {
                                        (location.pathname!='/settings/feedback' && location.pathname!='/settings/import_export') && 
                                            <div className="card-footer d-flex gap-2">
                                                <button 
                                                    type="button" 
                                                    className="button button-primary" 
                                                    onClick={handleSave}
                                                    disabled={processing}
                                                >
                                                    {
                                                        saveLoading ? __( "Saving...", "store-addons-for-woocommerce" ) : __( "Save Changes", "store-addons-for-woocommerce" )
                                                    }
                                                </button>
                                                {/* <button 
                                                    className="button button-secondary"
                                                    data-menu={`${urlArr[0]}.${ urlArr[urlArr.length-1]}`}
                                                    onClick={() => handleReset(`${urlArr[0]}.${ urlArr[urlArr.length-1]}`)}
                                                    disabled={processing}
                                                >
                                                    {resetLoading ? __( "Resetting...", "store-addons-for-woocommerce" ) : __( "Reset Settings", "store-addons-for-woocommerce" )}
                                                </button> */}
                                                <button 
                                                    className="button button-secondary"
                                                    onClick={handleResetAll}
                                                    disabled={processing}
                                                >
                                                    {resetAllLoading ? __( "Resetting...", "store-addons-for-woocommerce" ) : __( "Reset", "store-addons-for-woocommerce" )}
                                                </button>

                                                {resetAllError && <div className="store-addons-for-woocommerce-error">{resetAllError}</div>}
                                                {resetError && <div className="store-addons-for-woocommerce-error">{resetError}</div>}
                                                {saveError && <div className="store-addons-for-woocommerce-error">{saveError}</div>}
                                            </div>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return NewComponent;    
}
export default withForm;