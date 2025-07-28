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

    const sale_badge_options = settingData?.product_badge?.sale_badges.map(url => ({
        value: url,
        label: 
            `<img src="${url}" alt="Badge" />`
        ,
    }));
    const sold_badge_options = settingData?.product_badge?.sold_badges.map(url => ({
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
                            : <p>{__("Enable/Disable \"Product Badge\" functionalities", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <Switch 
                                name="product_badge.enable_product_badge"
                                checked={settingData?.product_badge.enable_product_badge} // Pass "1"/"0" from API 
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
                            : <h4>{__("Sale Badge", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Select Badge for On Sale Products.", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <Radio
                                defaultValue={settingData?.product_badge?.sale_badge}
                                options={sale_badge_options}
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
                            : <h4>{__("Sold Badge", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Select badge for Out of Stock products.", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <Radio
                                defaultValue={settingData?.product_badge?.sold_badge}
                                options={sold_badge_options}
                                name="product_badge.sold_badge"
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
                            : <p>{__("Set Badge size.", "store-addons-for-woocommerce")}</p>
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
                            : <p>{__("Set badge position.", "store-addons-for-woocommerce")}</p>
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