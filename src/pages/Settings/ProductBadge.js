import { useState, useEffect } from '@wordpress/element';
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ImageSelector } from "../../components";


// const defaultImages = [
//     { id: 1, title: "Alpine Meadow", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
//     { id: 2, title: "Forest Path", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80" },
//     { id: 3, title: "Ocean Waves", src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80" },
//     { id: 4, title: "Desert Dunes", src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80" },
//     { id: 5, title: "Glass Tower", src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" },
//     { id: 6, title: "Urban Bridge", src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80" },
//     { id: 7, title: "Old Cathedral", src: "https://images.unsplash.com/photo-1543459176-4426b37223ba?w=400&q=80" },
//     { id: 8, title: "Neon Grid", src: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80" },
//     { id: 9, title: "Color Burst", src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80" },
//     { id: 10, title: "Geometric Flow", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&q=80" },
//     { id: 11, title: "Silhouette", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
//     { id: 12, title: "Candid Moment", src: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&q=80" },
// ];
const ProductBadge = () => {
    const { settings, settingsDetails, settingsLoading, handleChange } = useOutletContext();
    const [ defaultImages, setDefaultImages ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    useEffect(() => {
        const fetchSettingTheme = async () => {
            setLoading(true);
            try {
                const images = await apiFetch({
                    path: '/store-addons-for-woocommerce/v1/sale-badges',
                    method: 'GET'
                });
                setDefaultImages(images);
            } catch (err) {
                console.error('API error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettingTheme();
    }, []);
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
    // }, []);

    return (
        <>
            <div className="setting-unit">
                <Row>
                    <Col lg={6}>
                        {
                            settingsLoading
                                ?
                                <>
                                    <div className="loading-skeleton h4" style={{ width: '60%' }}></div>
                                    <div className="loading-skeleton p" style={{ width: '70%' }}></div>
                                </>
                                :
                                <>
                                    {settingsDetails?.archive?.product_badge?.enabled?.title &&
                                        <h6 className="h6">
                                            {settingsDetails.archive.product_badge.enabled.title}
                                            {settingsDetails?.archive?.product_badge?.enabled?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.archive.product_badge.enabled.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.archive?.product_badge?.enabled?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.archive.product_badge.enabled.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.archive?.product_badge?.enabled?.before &&
                                    <Form.Label htmlFor="archive-basic-archive-enabled">{settingsDetails.archive.product_badge.enabled.before}</Form.Label>
                                }
                                <Form.Check
                                    id="archive_product_badge_enabled"
                                    type="switch"
                                    // label="" 
                                    onChange={(e) => handleChange('archive.product_badge.enabled', e.target.checked)}
                                    checked={settings?.archive?.product_badge?.enabled ? true : false}

                                />
                                {settingsDetails?.archive?.product_badge?.enabled?.after &&
                                    <Form.Text className="enabled-muted">{settingsDetails.archive.product_badge.enabled.after}</Form.Text>
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>

            <div className="setting-unit pt-3">
                <Row>
                    <Col lg={12} className="mb-3">

                        {
                            settingsLoading
                                ?
                                <>
                                    <div className="loading-skeleton h4" style={{ width: '60%' }}></div>
                                    <div className="loading-skeleton p" style={{ width: '70%' }}></div>
                                </>
                                :
                                <>
                                    {settingsDetails?.archive?.product_badge?.sale_badge?.title &&
                                        <h6 className="h6">
                                            {settingsDetails.archive.product_badge.sale_badge.title}
                                            {settingsDetails?.archive?.product_badge?.sale_badge?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.archive.product_badge.sale_badge.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.archive?.product_badge?.sale_badge?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.archive.product_badge.sale_badge.intro }} />
                                    }
                                </>
                        }
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={12}>
                            <ImageSelector
                                name='inputs.complex_inputs.imageselector'
                                defaultImages={defaultImages}
                                selectedValue={settings?.inputs?.complex_inputs?.imageselector}
                                onChange={(value) => {
                                    // console.log(value);
                                    handleChange('inputs.complex_inputs.imageselector', value);
                                }}
                            />
                        </Col>
                    }
                </Row>
            </div>
        </>
    );
};

export default ProductBadge;