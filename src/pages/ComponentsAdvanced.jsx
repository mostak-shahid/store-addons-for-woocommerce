import '@coreui/icons/css/all.css';
import { __ } from "@wordpress/i18n";
import React from 'react';
import MediaUploader from '../components/MediaUploader/MediaUploader';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const ComponentsAdvanced = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Media Uploader", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <MediaUploader 
                                data={settingData?.components?.advanced?.media_uploader} 
                                name='components.advanced.media_uploader' 
                                handleChange={handleChange}
                                options = {{
                                    frame:{
                                        title: __("Select or Upload Image", "store-addons-for-woocommerce-for-woocommerce"),
                                    },
                                    library: {type: 'image'},
                                    buttons: {
                                        upload: __("Upload Image", "store-addons-for-woocommerce-for-woocommerce"),
                                        remove: __("Remove", "store-addons-for-woocommerce-for-woocommerce"),
                                        select: __("Use this image", "store-addons-for-woocommerce-for-woocommerce")                                            
                                    }
                                }}
                            />                           
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Media Uploader", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <MediaUploader 
                                data={settingData?.components?.advanced?.media_uploader} 
                                name='components.advanced.media_uploader' 
                                handleChange={handleChange}
                                options = {{
                                    frame:{
                                        title: __("Select or Upload Image", "store-addons-for-woocommerce-for-woocommerce"),
                                    },
                                    library: {type: 'image'},
                                    buttons: {
                                        upload: __("Upload Image", "store-addons-for-woocommerce-for-woocommerce"),
                                        remove: __("Remove", "store-addons-for-woocommerce-for-woocommerce"),
                                        select: __("Use this image", "store-addons-for-woocommerce-for-woocommerce")                                            
                                    }
                                }}
                            />                           
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(ComponentsAdvanced);