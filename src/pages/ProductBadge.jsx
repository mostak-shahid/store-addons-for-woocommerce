import { __ } from "@wordpress/i18n";
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const ProductBadge = ({handleChange}) => {
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
        </>
    )
}
export default withForm(ProductBadge);