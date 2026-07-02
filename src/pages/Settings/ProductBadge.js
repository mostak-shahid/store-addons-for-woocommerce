import { useState, useEffect } from '@wordpress/element';
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ImageSelector } from "../../components";
const ProductBadge = () => {
    const { settings, settingsDetails, settingsLoading, handleChange } = useOutletContext();
    const [ saleImages, setSaleImages ] = useState([]);
    const [ soldImages, setSoldImages ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                // Both requests start at the exact same time
                const [saleBadges, soldBadges] = await Promise.all([
                    apiFetch({ path: '/store-addons-for-woocommerce/v1/sale-badges' }),
                    apiFetch({ path: '/store-addons-for-woocommerce/v1/sold-badges' })
                ]);

                // Access the parsed JSON results instantly
                // console.log('data:', data);
                // console.log('dataDetails:', dataDetails);
                if (saleBadges && soldBadges) {
                    setSaleImages(saleBadges);
                    setSoldImages(soldBadges);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                // setDataToast({
                //     title: __("Error", "store-addons-for-woocommerce"),
                //     content: __("Error fetching settings", "store-addons-for-woocommerce"),
                //     type: 'danger'
                // });
                // setShowToast(true);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

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
                    <Col lg={6} className="mb-3">

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
                        !settingsLoading && !loading && saleImages.length > 0 &&
                        <Col lg={6}>
                            <ImageSelector
                                name='archive.product_badge.sale_badge'
                                defaultImages={saleImages}
                                selectedValue={settings?.archive?.product_badge?.sale_badge}
                                onChange={(value) => {
                                    // console.log(value);
                                    handleChange('archive.product_badge.sale_badge', value);
                                }}
                                grid="3"
                            />
                        </Col>
                    }
                </Row>
            </div>

            <div className="setting-unit pt-3">
                <Row>
                    <Col lg={6} className="mb-3">

                        {
                            settingsLoading
                                ?
                                <>
                                    <div className="loading-skeleton h4" style={{ width: '60%' }}></div>
                                    <div className="loading-skeleton p" style={{ width: '70%' }}></div>
                                </>
                                :
                                <>
                                    {settingsDetails?.archive?.product_badge?.sold_badge?.title &&
                                        <h6 className="h6">
                                            {settingsDetails.archive.product_badge.sold_badge.title}
                                            {settingsDetails?.archive?.product_badge?.sold_badge?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.archive.product_badge.sold_badge.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.archive?.product_badge?.sold_badge?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.archive.product_badge.sold_badge.intro }} />
                                    }
                                </>
                        }
                    </Col>
                    {
                        !settingsLoading && !loading && soldImages.length > 0 &&
                        <Col lg={6}>
                            <ImageSelector
                                name='archive.product_badge.sold_badge'
                                defaultImages={soldImages}
                                selectedValue={settings?.archive?.product_badge?.sold_badge}
                                // onChange={(value) => {
                                //     // console.log(value);
                                //     handleChange('archive.product_badge.sold_badge', value);
                                // }}
                                grid="3"
                            />
                        </Col>
                    }
                </Row>
            </div>
        </>
    );
};

export default ProductBadge;