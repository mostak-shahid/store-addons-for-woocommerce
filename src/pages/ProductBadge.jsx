import { __ } from "@wordpress/i18n";
import Radio from '../components/Radio/Radio';
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const ProductBadge = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();

    const options = settingData?.product_badge?.sale_badges.map(url => ({
        value: url,
        label: 
            `<img src="${url}" alt="Badge" />`
        ,
    }));
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Enable product badge", "store-addons-for-woocommerce")}</h4>
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
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Select Badge", "store-addons-for-woocommerce")}</h4>
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
                            <Radio
                                defaultValue={settingData?.product_badge?.sale_badge}
                                // defaultValue='radio-1'
                                // options={[
                                //     { value: 'badge-1', label: `<img src="${store_addons_for_woocommerce_ajax_obj.image_url}badge-01.svg" alt="" />` },
                                //     { value: 'badge-2', label: `<img src="${store_addons_for_woocommerce_ajax_obj.image_url}badge-02.svg" alt="" />` },
                                //     { value: 'badge-3', label: `<img src="${store_addons_for_woocommerce_ajax_obj.image_url}badge-03.svg" alt="" />` },
                                //     { value: 'badge-4', label: `<img src="${store_addons_for_woocommerce_ajax_obj.image_url}badge-04.svg" alt="" />` },
                                // ]}
                                options={options}
                                name="product_badge.sale_badge"
                                handleChange= {handleChange}
                                type="inline" // block
                                hasMedia="1"
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
                            : <h4>{__("Badge Size", "store-addons-for-woocommerce")}</h4>
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
                            <div class="input-group">
                                <input 
                                    className="form-control"
                                    type="number"
                                    value={settingData?.product_badge?.sale_badge_size}
                                    onChange={(e) => handleChange('product_badge.sale_badge_size', e.target.value)}
                                />
                                <span class="input-group-text">px</span>
                            </div>                            
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Badge Position", "store-addons-for-woocommerce")}</h4>
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
                            <select 
                                className="form-select"
                                value={settingData?.product_badge?.sale_badge_position} 
                                onChange={(e) => handleChange('product_badge.sale_badge_position', e.target.value)}
                            >
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>                         
                        </div>
                    }
                </div>
            </div>      
        </>
    )
}
export default withForm(ProductBadge);