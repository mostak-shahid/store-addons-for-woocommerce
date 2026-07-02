import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
const ProductPlacement = () => {
    const { settings, settingsDetails, settingsLoading, handleChange } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchProducts = async () => {
        try {
            const params = new URLSearchParams({
                search: searchTerm,
                limit: 10
            });
            const result = await apiFetch({
                path: `/store-addons-for-woocommerce/v1/products?${params.toString()}`,
                method: 'GET'
            });
            // console.log('API result:', result);
            setProducts(result);

        } catch (err) {
            console.error('API error:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
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
                                    {settingsDetails?.checkout?.product_placement?.enabled?.title &&
                                        <h6 className="h6">
                                            {settingsDetails.checkout.product_placement.enabled.title}
                                            {settingsDetails?.checkout?.product_placement?.enabled?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.checkout.product_placement.enabled.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.checkout?.product_placement?.enabled?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.enabled.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.checkout?.product_placement?.enabled?.before &&
                                    <Form.Label htmlFor="checkout-product_placement-enabled">{settingsDetails.checkout.product_placement.enabled.before}</Form.Label>
                                }
                                <Form.Check
                                    id="checkout_product_placement_enabled"
                                    type="switch"
                                    // label="" 
                                    onChange={(e) => handleChange('checkout.product_placement.enabled', e.target.checked)}
                                    checked={settings?.checkout?.product_placement?.enabled ? true : false}

                                />
                                {settingsDetails?.checkout?.product_placement?.enabled?.after &&
                                    <Form.Text className="text-muted">{settingsDetails.checkout.product_placement.enabled.after}</Form.Text>
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>

            <div className="setting-unit pt-3">
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
                                    {settingsDetails?.checkout?.product_placement?.title?.title &&
                                        <h6 className="h6">
                                            {settingsDetails?.checkout?.product_placement?.title?.title}
                                            {settingsDetails?.checkout?.product_placement?.title?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.checkout.product_placement.title.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.checkout?.product_placement?.title?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.title.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.checkout?.product_placement?.title?.before &&
                                    <Form.Label htmlFor="checkout_product_placement_title">{settingsDetails.checkout.product_placement.title.before}</Form.Label>
                                }
                                <Form.Control
                                    id="checkout_product_placement_title"
                                    type="text"
                                    value={settings?.checkout?.product_placement?.title || ''}
                                    onChange={(e) => handleChange('checkout.product_placement.title', e.target.value)}
                                />
                                {settingsDetails?.checkout?.product_placement?.title?.after &&
                                    <Form.Text className="text-muted">{settingsDetails.checkout.product_placement.title.after}</Form.Text>
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>

            <div className="setting-unit pt-3">
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
                                    {settingsDetails?.checkout?.product_placement?.intro?.title &&
                                        <h6 className="h6">
                                            {settingsDetails?.checkout?.product_placement?.intro?.title}
                                            {settingsDetails?.checkout?.product_placement?.intro?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.checkout.product_placement.intro.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.checkout?.product_placement?.intro?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.intro.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.checkout?.product_placement?.intro?.before &&
                                    <Form.Label htmlFor="checkout_product_placement_intro">{settingsDetails.checkout.product_placement.intro.before}</Form.Label>
                                }
                                <Form.Control
                                    id="checkout_product_placement_intro"
                                    as="textarea"
                                    rows={3}
                                    value={settings?.checkout?.product_placement?.intro || ''}
                                    onChange={(e) => handleChange('checkout.product_placement.intro', e.target.value)}
                                />
                                {settingsDetails?.checkout?.product_placement?.intro?.after &&
                                    <Form.Text className="text-muted">{settingsDetails.checkout.product_placement.intro.after}</Form.Text>
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>

            <div className="setting-unit pt-3">
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
                                    {settingsDetails?.checkout?.product_placement?.button_text?.title &&
                                        <h6 className="h6">
                                            {settingsDetails?.checkout?.product_placement?.button_text?.title}
                                            {settingsDetails?.checkout?.product_placement?.button_text?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.checkout.product_placement.button_text.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.checkout?.product_placement?.button_text?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.button_text.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.checkout?.product_placement?.button_text?.before &&
                                    <Form.Label htmlFor="checkout_product_placement_button_text">{settingsDetails.checkout.product_placement.button_text.before}</Form.Label>
                                }
                                <Form.Control
                                    id="checkout_product_placement_button_text"
                                    type="text"
                                    value={settings?.checkout?.product_placement?.button_text || ''}
                                    onChange={(e) => handleChange('checkout.product_placement.button_text', e.target.value)}
                                />
                                {settingsDetails?.checkout?.product_placement?.button_text?.after &&
                                    <Form.Text className="text-muted">{settingsDetails.checkout.product_placement.button_text.after}</Form.Text>
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>

            <div className="setting-unit pt-3">
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
                                    {settingsDetails?.checkout?.product_placement?.select_product?.title &&
                                        <h6 className="h6">
                                            {settingsDetails?.checkout?.product_placement?.select_product?.title}
                                            {settingsDetails?.checkout?.product_placement?.select_product?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.checkout.product_placement.select_product.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.checkout?.product_placement?.select_product?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.select_product.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.checkout?.product_placement?.select_product?.before &&
                                    <Form.Label htmlFor="checkout_product_placement_select_product">{settingsDetails.checkout.product_placement.select_product.before}</Form.Label>
                                }
                                <MultiSelect
                                    name="checkout_product_placement_select_product"
                                    options={products.map(product => ({ value: product.id, label: product.name }))}
                                    defaultValues={settings?.checkout?.product_placement?.select_product.map(p => p.value || p.id) || []}
                                    onSearch={(term) => {
                                        setSearchTerm(term);
                                        fetchProducts();
                                    }}
                                    onChange={(selected) => {
                                        const selectedProducts = products.filter(product => selected.includes(product.id)).map(p => ({ value: p.id, label: p.name }));
                                        handleChange('checkout.product_placement.select_product', selectedProducts);
                                    }}
                                    placeholder="Select product"
                                    max={1}
                                />
                                {settingsDetails?.checkout?.product_placement?.select_product?.after &&
                                    <Form.Text className="text-muted">{settingsDetails.checkout.product_placement.select_product.after}</Form.Text>
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>

            <div className="setting-unit pt-3">
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
                                    {settingsDetails?.checkout?.product_placement?.enable_for_products?.title &&
                                        <h6 className="h6">
                                            {settingsDetails?.checkout?.product_placement?.enable_for_products?.title}
                                            {settingsDetails?.checkout?.product_placement?.enable_for_products?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.checkout.product_placement.enable_for_products.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.checkout?.product_placement?.enable_for_products?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.enable_for_products.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.checkout?.product_placement?.enable_for_products?.before &&
                                    <Form.Label htmlFor="checkout_product_placement_enable_for_products">{settingsDetails.checkout.product_placement.enable_for_products.before}</Form.Label>
                                }

                                <MultiSelect
                                    name="checkout_product_placement_enable_for_products"
                                    options={products.map(product => ({ value: product.id, label: product.name }))}
                                    defaultValues={settings?.checkout?.product_placement?.enable_for_products.map(p => p.value || p.id) || []}
                                    onSearch={(term) => {
                                        setSearchTerm(term);
                                        fetchProducts();
                                    }}
                                    onChange={(selected) => {
                                        const selectedProducts = products.filter(product => selected.includes(product.id)).map(p => ({ value: p.id, label: p.name }));
                                        handleChange('checkout.product_placement.enable_for_products', selectedProducts);
                                    }}
                                    placeholder="Select products"
                                />
                                {settingsDetails?.checkout?.product_placement?.enable_for_products?.after &&
                                    <Form.Text className="text-muted">{settingsDetails.checkout.product_placement.enable_for_products.after}</Form.Text>
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>
        </>
    );
};

export default ProductPlacement;