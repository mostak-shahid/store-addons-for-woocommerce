import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { Outlet, useLocation } from 'react-router-dom';
import { Card, Button, Nav } from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faHome, faGear, faHeadphones, faCircleQuestion, faCircleUser, faStar } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../layouts';
import { VerticalMultiLevelNavbar } from '../../components/Menu/Menu';
import menuItems from '../../data/menu.json';
import { getMenu } from '../../data/menu.js';
// import { setNestedValue } from '../../lib/Helpers.js';
import BreadcrumbControl from '../../components/BreadcrumbControl/BreadcrumbControl';
import ToastControl from '../../components/ToastControl/ToastControl.js';
import { PageInfo } from '../../components/index.js';
import './Settings.css'
const Settings = ({settings, settingsDetails, settingsLoading, handleChange, settingsReload, setSettingsReload}) => {
    {console.log(settings)}
    // {console.log(settingsReload)}

    // const [settings, setSettings] = useState({});
    // const [settingsDetails, setSettingsDetails] = useState({});
    // const [settingsLoading, setSettingsLoading] = useState(false);
    // const [settingsReload, setSettingsReload] = useState(0);

    const location = useLocation();

    const [proItems, setProItems] = useState([]);
    const [remoteItems, setRemoteItems] = useState([]);


    const [saving, setSaving] = useState(false);
    const [reseating, setReseating] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [dataToast, setDataToast] = useState({ title: '', content: '', type: 'success' });
    const toggleShowToast = () => setShowToast(!showToast);

    useEffect(() => {
        // Check if the Pro version has loaded its global component hook
        if (window.StoreAddonsForWoocommerceProComponents && window.StoreAddonsForWoocommerceProComponents.menuItems) {
            setProItems(() => window.StoreAddonsForWoocommerceProComponents.menuItems);
        }
        // console.log('Feedback component mounted. ProContactForm available:', !!window.StoreAddonsForWoocommerceProComponents?.ContactForm);
    }, []);

    // Optional: load remote injected menu items
    useEffect(() => {
        if (store_addons_for_woocommerce_ajax_obj?.extraMenuItems) {
            setRemoteItems(store_addons_for_woocommerce_ajax_obj.extraMenuItems);
        }
    }, []);

    // Icon mapping
    const iconMap = {
        // 'page': <FontAwesomeIcon icon={faHome} />,
        'inputs': <FontAwesomeIcon icon={faHome} />,
        // 'basic-inputs': <FontAwesomeIcon icon={faGear} />,
        // 'array-inputs': <FontAwesomeIcon icon={faWebAwesome} />,
        // 'import-export': <FontAwesomeIcon icon={faWebAwesome} />,
        // 'more': <FontAwesomeIcon icon={faWebAwesome} />,
        // 'tools': <FontAwesomeIcon icon={faHome} />,
        // 'feedback': <FontAwesomeIcon icon={faComment} />,
    };

    // Get menu data from menu.js
    const menuData = getMenu({ menuItems: menuItems, proItems: proItems, remoteItems: remoteItems });

    // Add icons to menu items
    const menuItemsWithIcons = menuData.map(item => ({
        ...item,
        icon: iconMap[item.itemKey] || <FontAwesomeIcon icon={faGear} />
    }));
    const sidebar = (
        <>
            <VerticalMultiLevelNavbar
                MenuItems={menuItemsWithIcons}
                footerContent={(
                    <Nav className="flex-column">
                        <Nav.Link href="https://wordpress.org/support/plugin/store-addons-for-woocommerce/" target='_blank' className="d-flex align-items-center gap-2" style={{ paddingLeft: 16 }}>
                            <FontAwesomeIcon icon={faHeadphones} />
                            {__("VIP Priority Support", "store-addons-for-woocommerce")}
                        </Nav.Link>
                        <Nav.Link href="https://mostak-shahid.github.io/plugins/store-addons-for-woocommerce.html" target='_blank' className="d-flex align-items-center gap-2" style={{ paddingLeft: 16 }}>
                            <FontAwesomeIcon icon={faCircleQuestion} />
                            {__("Help Center", "store-addons-for-woocommerce")}
                        </Nav.Link>
                        <Nav.Link href="https://www.facebook.com/mospressbd" target='_blank' className="d-flex align-items-center gap-2" style={{ paddingLeft: 16 }}>
                            <FontAwesomeIcon icon={faCircleUser} />
                            {__("Community", "store-addons-for-woocommerce")}
                        </Nav.Link>
                        <Nav.Link href="https://wordpress.org/support/plugin/store-addons-for-woocommerce/reviews/" target='_blank' className="d-flex align-items-center gap-2" style={{ paddingLeft: 16 }}>
                            <FontAwesomeIcon icon={faStar} />
                            {__("Rate Us", "store-addons-for-woocommerce")}
                        </Nav.Link>
                    </Nav>
                )}
            />
        </>
    );


    // useEffect(() => {
    //     const fetchSettings = async () => {
    //         setSettingsLoading(true);
    //         try {
    //             // Both requests start at the exact same time
    //             const [data, dataDetails] = await Promise.all([
    //                 apiFetch({ path: '/store-addons-for-woocommerce/v1/options' }),
    //                 apiFetch({ path: '/store-addons-for-woocommerce/v1/options-details' })
    //             ]);

    //             // Access the parsed JSON results instantly
    //             // console.log('data:', data);
    //             // console.log('dataDetails:', dataDetails);
    //             if (data && dataDetails) {
    //                 setSettings(data);
    //                 setSettingsDetails(dataDetails);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching settings:", error);
    //             setDataToast({
    //                 title: __("Error", "store-addons-for-woocommerce"),
    //                 content: __("Error fetching settings", "store-addons-for-woocommerce"),
    //                 type: 'danger'
    //             });
    //             setShowToast(true);
    //         } finally {
    //             setSettingsLoading(false);
    //         }
    //     };
    //     fetchSettings();
    // }, [settingsReload]);


    // const handleChange = (fieldPath, value) => {
    //     // console.log("Field changed:", fieldPath, "New value:", value);
    //     setSettings(prev => {
    //         const updatedOptions = setNestedValue(prev, fieldPath, value);
    //         return { ...updatedOptions }; // Ensure React detects the update
    //     });
    // };

    // const handleSubmit = async (section, values) => {
    const handleSubmit = async () => {
        const saveRoot = store_addons_for_woocommerce_ajax_obj?.isPro ? 'store-addons-for-woocommerce-pro' : 'store-addons-for-woocommerce';
        try {
            setSaving(true);
            const result = await apiFetch({
                path: `/${saveRoot}/v1/options`,
                method: 'POST',
                // data: { store_addons_for_woocommerce_options: { ...settings, [section]: values } }
                data: { store_addons_for_woocommerce_options: settings }
            });
            if (result.success) {
                setSettingsReload(Math.random());
                setDataToast({
                    title: __("Success", "store-addons-for-woocommerce"),
                    content: __("Settings saved successfully!!!", "store-addons-for-woocommerce"),
                    type: 'success'
                });
                setShowToast(true);

            } else {
                setDataToast({
                    title: __("Error", "store-addons-for-woocommerce"),
                    content: __("Error saving settings. Please try again.", "store-addons-for-woocommerce"),
                    type: 'danger'
                });
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            setDataToast({
                title: __("Error", "store-addons-for-woocommerce"),
                content: __("Error saving settings. Please try again.", "store-addons-for-woocommerce"),
                type: 'danger'
            });
            setShowToast(true);
        } finally {
            setSettingsReload(prev => prev + 1);
            setSaving(false);
        }
    };

    const handleReset = async (section) => {
        try {
            setReseating(true);
            const result = await apiFetch({
                path: "/store-addons-for-woocommerce/v1/options/reset-settings",
                method: 'POST',
                data: { name: section }
            });
            if (result.success) {
                setSettingsReload(Math.random());
                setDataToast({
                    title: __("Success", "store-addons-for-woocommerce"),
                    content: __("Settings reset successfully!", "store-addons-for-woocommerce"),
                    type: 'success'
                });
                setShowToast(true);
            } else {
                setDataToast({
                    title: __("Error", "store-addons-for-woocommerce"),
                    content: __("Error resetting settings. Please try again.", "store-addons-for-woocommerce"),
                    type: 'danger'
                });
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error resetting settings:", error);
            setDataToast({
                title: __("Error", "store-addons-for-woocommerce"),
                content: __("Error resetting settings. Please try again.", "store-addons-for-woocommerce"),
                type: 'danger'
            });
            setShowToast(true);
        } finally {
            setSettingsReload(prev => prev + 1);
            setReseating(false)
        }
    };

    // Bridge + HOC setup, We will need a lib/Bridge.js too
    // 1. Add these to your imports
    // import { useRef } from '@wordpress/element';

    // 2. Add this inside your Settings component
    const listeners = useRef(new Set());
    const bridgeRef = useRef({ settings, settingsDetails, settingsLoading, handleChange, setSettingsReload });

    // 3. Update the bridge object whenever state changes
    useEffect(() => {
        bridgeRef.current = { settings, settingsDetails, settingsLoading, handleChange, setSettingsReload };
        // Notify all subscribers
        listeners.current.forEach(listener => listener(bridgeRef.current));
    }, [settings, settingsDetails, settingsLoading, handleChange, setSettingsReload]);

    // 4. Expose the subscribe method on the window object
    useEffect(() => {
        window.StoreAddonsForWoocommerceBridge = {
            get: () => bridgeRef.current,
            subscribe: (listener) => {
                listeners.current.add(listener);
                return () => listeners.current.delete(listener);
            }
        };
    }, []);

    return (
        <Layout sidebarPosition="left" sidebar={sidebar} fluid={true} className='settings-page-layout'>
            {/* {console.log(settingsReload)} */}
            {/* {console.log('Current settings:', settings)} */}
            <BreadcrumbControl menu={menuData} url={location.pathname} className='mb-3 border rounded-0 py-2 px-3' />
            <div className='mb-3 border rounded-0 p-3'>
                <PageInfo menu={menuData} url={location.pathname} />
            </div>
            <div className='p-3 border'>
                <Outlet
                    context={{ settings, settingsDetails, settingsLoading, handleChange, setSettingsReload }}
                />
                {/* {console.log(location.pathname)} */}
                {
                    (
                        location.pathname !== '/settings/utilities/import_export'
                        && location.pathname !== '/settings/utilities/logs/table'
                        && location.pathname !== '/settings/utilities/logs/analytics'
                    )
                    &&
                    <div className="d-flex align-items-center gap-2 mt-3">
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={saving}
                        >
                            {saving ? __('Saving', 'store-addons-for-woocommerce') : __('Save', 'store-addons-for-woocommerce')}
                        </Button>
                        <Button
                            variant="danger"
                            disabled={reseating}
                            onClick={() => handleReset(location.pathname.split('/').filter(Boolean).slice(1).join('.'))}
                        >
                            {reseating ? __('Reseting', 'store-addons-for-woocommerce') : __('Reset', 'store-addons-for-woocommerce')}
                            {/* {path.split('/').filter(Boolean).slice(1).join('.')} */}
                            {/* {result = path.replace(/^\/[^\/]+\//, '').replace(/\//g, '.');} */}
                            {/* {console.log(location.pathname.split('/').filter(Boolean).slice(1).join('.'))} */}
                        </Button>
                    </div>
                }
            </div>
            <ToastControl
                show={showToast}
                onClose={toggleShowToast}
                data={dataToast}
            />
        </Layout>
    );
};

export default Settings;