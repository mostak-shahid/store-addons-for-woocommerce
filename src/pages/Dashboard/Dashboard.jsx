import { __ } from "@wordpress/i18n";
import axios from 'axios';
import { useEffect, useState } from 'react';
import PluginCard from "../../components/PluginCard/PluginCard";
import { useMain } from '../../contexts/MainContext';
import Details from '../../data/details.json';
import './Dashboard.scss';
export default function Dashboard() {
    const {
        settingsMenu,
    } = useMain();
    const [plugins, setPlugins] = useState([]);
    const [pluginsLoading, setPluginsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPlugins = async () => {
        try {
            const response = await axios.get('https://raw.githubusercontent.com/mostak-shahid/update/refs/heads/master/plugin-details.json');
            // https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[author]=mostakshahid&request[per_page]=24
            setPlugins(response.data);
        } catch (error) {
            setError('Error fetching plugin data:', error);
        } finally {
            setPluginsLoading(false);
        }
        };
        fetchPlugins();
    }, []);
    
    return (
        <div className="store-addons-for-woocommerce-settings">
            <div className="container">
                <div className="card mt-0 mb-3 rounded-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-7">
                                    <h2 className="card-title">{__(`Welcome to ${Details?.name}`, "store-addons-for-woocommerce")}</h2>
                                    <div className="card-text">
                                        <p>
                                            {__("Are you a WooCommerce store owner looking to offer personalized products? Store Addons for WooCommerce is your ultimate solution for crafting custom store options and addons tailored to customer needs. This powerful plugin simplifies adding a variety of custom options directly to your wocommerce pages. Enhancing the shopping experience and meeting diverse customer preferences.", "store-addons-for-woocommerce")}
                                        </p>
                                        <p>                                            
                                            {__("Store Addons for WooCommerce is an all-in-one toolkit to enhance your WooCommerce store. This is a highly effective plugin developed for assisting online businesses in improving sales and profits.", "store-addons-for-woocommerce")}
                                        </p>
                                    </div>
                            </div>
                            <div className="col-lg-5"><div className="d-flex align-items-center justify-content-center w-100 h-100 bg-secondary text-white">Image</div></div>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                        <div className="dashboard-features-card card mt-0 mb-3 rounded-0">
                            <div className="card-header">
                                {__("Features", "store-addons-for-woocommerce")}
                            </div>
                            <div className="card-body ">
                                {Object.values(settingsMenu).map(feature => (
                                    <div className="feature">
                                        <h4 className="feature-title">{feature?.title}</h4>
                                        <div className="feature-intro">{feature?.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card mt-0 mb-3 rounded-0">
                            <div className="card-header">
                                {__("Extend Your Website", "store-addons-for-woocommerce")}
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        pluginsLoading 
                                        ? 
                                        <div className="row g-2 mb-3">                                    
                                            <div className="col-auto">
                                                <div className="loading-skeleton" style={{width:'60px', height:'60px'}}></div>
                                            </div>
                                            <div className="col">
                                                <div className="loading-skeleton h4" style={{width:'60%', height: '15px', marginBottom: '5px'}}></div>
                                                <div className="loading-skeleton p" style={{width:'80%',height: '15px', marginBottom: '5px'}}></div>
                                                <div className="action"><div className="loading-skeleton p mb-0" style={{width:'80%',height: '24px', marginBottom: '5px'}}></div></div>
                                            </div>
                                        </div>
                                        : <>
                                        {Object.entries(plugins).map(([slug, plugin]) => ( 
                                            <div className="col-lg-6">
                                                <PluginCard 
                                                    key={slug} 
                                                    image={plugin.image} 
                                                    name={plugin.name} 
                                                    intro={plugin.intro} 
                                                    plugin_source={plugin.source} 
                                                    plugin_slug={slug} 
                                                    plugin_file={plugin.file} 
                                                    download_url={plugin.download}
                                                /> 
                                            </div> 
                                        ))}
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        
                        <div className="card mt-0 mb-3 rounded-0">
                            <div className="card-body">                                
                                <h4 className="card-title">
                                    {__("VIP Priority Support", "store-addons-for-woocommerce")}
                                </h4>
                                <p className="card-text">
                                    {__("Faster and exclusive support service designed for VIP assistance and benefits.", "store-addons-for-woocommerce")}                                    
                                </p>
                                <a href="#" className="card-link">
                                    {__("Support", "store-addons-for-woocommerce")}
                                </a>
                            </div>
                        </div>
                        <div className="card mt-0 mb-3 rounded-0">
                            <div className="card-body">                                
                                <h4 className="card-title">
                                    {__("Join the Community", "store-addons-for-woocommerce")}                                    
                                </h4>
                                <p className="card-text">
                                    {__("Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!", "store-addons-for-woocommerce")}                                    
                                </p>
                                <a href="#" className="card-link">
                                    {__("Join", "store-addons-for-woocommerce")}
                                </a>
                            </div>
                        </div>
                        <div className="card mt-0 mb-3 rounded-0">
                            <div className="card-body">                                
                                <h4 className="card-title">
                                    {__("Rate Us", "store-addons-for-woocommerce")}                                    
                                </h4>
                                <p className="card-text">
                                    {__("We love to hear from you, we would appreciate every single review.", "store-addons-for-woocommerce")}                                    
                                </p>
                                <a href="#" className="card-link">
                                    {__("Rate", "store-addons-for-woocommerce")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
