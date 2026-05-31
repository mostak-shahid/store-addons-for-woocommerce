import { __ } from "@wordpress/i18n";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';

import Switch from '../components/Switch/Switch';
import MultiSelect from '../components/MultiSelect/MultiSelect';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { useEffect, useState } from "react";
const CartAddons = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();

    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        if(product.id){
            handleChange('checkout_addons.product', { id: product.id, name: product.name });
        }
    }, [product]);

    useEffect(() => {
        const getAllProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/wp-json/store-addons-for-woocommerce/v1/products`);
                const data = await response.json();
                setAllProducts(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                console.error('Search error:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        getAllProducts();
        
    }, []);

    useEffect(() => {
        // 1. Don't search if the input is empty
        if (!searchTerm.trim()) {
            setProducts([]);
            return;
        }

        // 2. Create an AbortController to cancel this request if input changes again
        const controller = new AbortController();
        const { signal } = controller;

        // 3. Set up the debounce timer
        const delayDebounceFn = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/wp-json/store-addons-for-woocommerce/v1/products?search=${searchTerm}&limit=10`, { signal });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                console.error('Search error:', error);
                }
            } finally {
                setIsLoading(false);
            }
        }, 300); // 300ms wait time

        // 4. Cleanup function: runs when searchTerm changes or component unmounts
        return () => {
            clearTimeout(delayDebounceFn);
            controller.abort();
        };
    }, [searchTerm]);
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Enable cart addons", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Enable/Disable \"Checkout Addons\" functionalities", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <Switch 
                                name="checkout_addons.enable_checkout_addons"
                                checked={settingData?.checkout_addons.enable_checkout_addons} // Pass "1"/"0" from API 
                                onChange={handleChange} 
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
                            : <h4>{__("Title", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("The title show on \"Checkout Addons\" box", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <input 
                                className="form-control"
                                type="text"
                                value={settingData?.checkout_addons?.title}
                                onChange={(e) => handleChange('checkout_addons.title', e.target.value)}
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
                            : <h4>{__("Intro", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("The intro text show on \"Checkout Addons\" box", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <textarea
                                className="form-control"
                                rows={3}
                                value={settingData?.checkout_addons?.intro}
                                onChange={(e) => handleChange('checkout_addons.intro', e.target.value)}
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
                            : <h4>{__("Button Text", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("The text for the action button in the \"Checkout Addons\" box", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <input 
                                className="form-control"
                                type="text"
                                value={settingData?.checkout_addons?.button_text}
                                onChange={(e) => handleChange('checkout_addons.button_text', e.target.value)}
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
                            : <h4>{__("Select Product", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("The product to be added as an addon", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <SplitButton
                                align={{ lg: 'start' }}
                                title={
                                    settingData?.checkout_addons?.product && settingData?.checkout_addons?.product?.name || __("Select a product", "store-addons-for-woocommerce")}
                            >
                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                />
                                {isLoading && <p>Loading...</p>}
                                
                                <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                                    {products.map((product) => (
                                    <li 
                                        key={product.id} 
                                        style={{ padding: '5px 0', borderBottom: '1px solid #eee',cursor: 'pointer' }}
                                        onClick={() => setProduct(product)}
                                    >
                                        {product.name}
                                    </li>
                                    ))}
                                </ul>
                            </SplitButton>                       
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
                            : <h4>{__("Select Products", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("The products where addons can be added", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <MultiSelect
                                name="checkout_addons.products"
                                options={allProducts.map(product => ({ value: product.id, label: product.name }))}
                                defaultValues={settingData?.checkout_addons?.products?.map(p => p.value || p.id) || []}
                                onChange={(selected) => {
                                    const selectedProducts = allProducts.filter(product => selected.includes(product.id)).map(p => ({ value: p.id, label: p.name }));
                                    handleChange('checkout_addons.products', selectedProducts);
                                }}
                                placeholder="Select products"
                            />                      
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CartAddons);