import { __ } from "@wordpress/i18n";
import logo from '../../assets/images/logo.svg';
import Checkbox from '../components/Checkbox/Checkbox';
import MultiSelect from '../components/MultiSelect/MultiSelect';
import NativeMultiSelect from '../components/NativeMultiSelect/NativeMultiSelect';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const ArrayInput = ({handleChange}) => {
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
                            : <h4>{__("Checkbox Input", "store-addons-for-woocommerce")}</h4>
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
                            <Checkbox 
                                options={[
                                    { value: 'checkbox-1', label: 'Checkbox 1', hint: 'This is Checkbox 1' },
                                    { value: 'checkbox-2', label: 'Checkbox 2', hint: 'This is Checkbox 2' },
                                    { value: 'checkbox-3', label: 'Checkbox 3', hint: 'This is Checkbox 3' },
                                    { value: 'checkbox-4', label: 'Checkbox 4', hint: 'This is Checkbox 4' },
                                    { value: 'checkbox-5', label: 'Checkbox 5', hint: 'This is Checkbox 5' }
                                ]}
                                defaultValues={settingData?.array_input?.checkbox_input}
                                name="array_input.checkbox_input"
                                handleChange= {handleChange}
                                type="block"
                            />                           
                            <Checkbox 
                                options={[
                                    { value: 'checkbox-1', label: 'Checkbox 1', hint: 'This is Checkbox 1' },
                                    { value: 'checkbox-2', label: 'Checkbox 2', hint: 'This is Checkbox 2' },
                                    { value: 'checkbox-3', label: 'Checkbox 3', hint: 'This is Checkbox 3' },
                                    { value: 'checkbox-4', label: 'Checkbox 4', hint: 'This is Checkbox 4' },
                                    { value: 'checkbox-5', label: 'Checkbox 5', hint: 'This is Checkbox 5' }
                                ]}
                                defaultValues={settingData?.array_input?.checkbox_input}
                                name="array_input.checkbox_input_2"
                                handleChange= {handleChange}
                                type="inline"
                            />                           
                            <Checkbox 
                                options={[
                                    { value: 'checkbox-1', label: `<img src=${logo} alt="" />`, hint: 'This is badge 1' },
                                    { value: 'checkbox-2', label: `<img src=${logo} alt="" />`, hint: 'This is badge 2' },
                                    { value: 'checkbox-3', label: `<img src=${logo} alt="" />`, hint: 'This is badge 3' },
                                ]}
                                defaultValues={settingData?.array_input?.checkbox_input}
                                name="array_input.checkbox_input_3"
                                handleChange= {handleChange}
                                type="block"
                                hasMedia="1"
                            />                           
                            <Checkbox 
                                options={[
                                    { value: 'checkbox-1', label: `<img src=${logo} alt="" />`, hint: 'This is badge 1' },
                                    { value: 'checkbox-2', label: `<img src=${logo} alt="" />`, hint: 'This is badge 2' },
                                    { value: 'checkbox-3', label: `<img src=${logo} alt="" />`, hint: 'This is badge 3' },
                                ]}
                                defaultValues={settingData?.array_input?.checkbox_input}
                                name="array_input.checkbox_input_4"
                                handleChange= {handleChange}
                                type="inline"
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
                            : <h4>{__("Multi Select Input", "store-addons-for-woocommerce")}</h4>
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
                            <NativeMultiSelect 
                                options={[
                                    { value: 'select-1', label: 'Select 1' },
                                    { value: 'select-2', label: 'Select 2' },
                                    { value: 'select-3', label: 'Select 3' },
                                    { value: 'select-4', label: 'Select 4' },
                                    { value: 'select-5', label: 'Select 5' },
                                    { value: 'select-6', label: 'Select 6' },
                                    { value: 'select-7', label: 'Select 7' },
                                    { value: 'select-8', label: 'Select 8' },
                                    { value: 'select-9', label: 'Select 9' },
                                    { value: 'select-10', label: 'Select 10' }
                                ]}
                                defaultValues={settingData?.array_input?.multi_select_input}
                                name="array_input.multi_select_input"
                                size={6}
                                handleChange={handleChange}
                            />                            
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
                            : <h4>{__("Multi Select Input", "store-addons-for-woocommerce")}</h4>
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
                            <MultiSelect 
                                options={[
                                    { value: 'select-1', label: 'Select 1' },
                                    { value: 'select-2', label: 'Select 2' },
                                    { value: 'select-3', label: 'Select 3' },
                                    { value: 'select-4', label: 'Select 4' },
                                    { value: 'select-5', label: 'Select 5' },
                                    { value: 'select-6', label: 'Select 6' },
                                    { value: 'select-7', label: 'Select 7' },
                                    { value: 'select-8', label: 'Select 8' },
                                    { value: 'select-9', label: 'Select 9' },
                                    { value: 'select-10', label: 'Select 10' }
                                ]}
                                // defaultValues={['javascript', 'python', 'rust']}
                                defaultValues={settingData?.array_input?.multi_select_input}
                                name="array_input.multi_select_input"
                                placeholder="Choose languages..."
                                handleChange= {handleChange}
                            />                            
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(ArrayInput);