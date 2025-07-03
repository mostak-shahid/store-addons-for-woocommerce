import { __ } from "@wordpress/i18n";
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const BuyTogether = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {console.log(settingData)}
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Title", "store-addons-for-woocommerce")}</h4>
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
                            <input 
                                className="form-control"
                                type="text"
                                value={settingData?.buy_together?.title}
                                onChange={(e) => handleChange('buy_together.title', e.target.value)}
                            />                          
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(BuyTogether);