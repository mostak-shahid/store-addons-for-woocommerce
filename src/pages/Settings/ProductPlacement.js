import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
const OPTIONS = [
    { 'value': 'option-1', 'label': 'Option 1' },
    { 'value': 'option-2', 'label': 'Option 2' },
    { 'value': 'option-3', 'label': 'Option 3' },
    { 'value': 'option-4', 'label': 'Option 4' },
    { 'value': 'option-5', 'label': 'Option 5' },
    { 'value': 'option-6', 'label': 'Option 6' },
    { 'value': 'option-7', 'label': 'Option 7' },
    { 'value': 'option-8', 'label': 'Option 8' },
];
const PRODUCTS = [
    [
    {
        "id": 172,
        "value": 172,
        "name": "This will be the gift Product",
        "label": "This will be the gift Product",
        "price": "0.99",
        "image": ""
    },
    {
        "id": 45,
        "value": 45,
        "name": "WordPress Pennant",
        "label": "WordPress Pennant",
        "price": "11.05",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/pennant-1-150x150.jpg"
    },
    {
        "id": 44,
        "value": 44,
        "name": "Logo Collection",
        "label": "Logo Collection",
        "price": "18",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/logo-1-150x150.jpg"
    },
    {
        "id": 43,
        "value": 43,
        "name": "Beanie with Logo",
        "label": "Beanie with Logo",
        "price": "18",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/beanie-with-logo-1-150x150.jpg"
    },
    {
        "id": 42,
        "value": 42,
        "name": "T-Shirt with Logo",
        "label": "T-Shirt with Logo",
        "price": "18",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/t-shirt-with-logo-1-150x150.jpg"
    },
    {
        "id": 35,
        "value": 35,
        "name": "Single",
        "label": "Single",
        "price": "2",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/single-1-150x150.jpg"
    },
    {
        "id": 34,
        "value": 34,
        "name": "Album",
        "label": "Album",
        "price": "15",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/album-1-150x150.jpg"
    },
    {
        "id": 33,
        "value": 33,
        "name": "Polo",
        "label": "Polo",
        "price": "20",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/polo-2-150x150.jpg"
    },
    {
        "id": 32,
        "value": 32,
        "name": "Long Sleeve Tee",
        "label": "Long Sleeve Tee",
        "price": "25",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/long-sleeve-tee-2-150x150.jpg"
    },
    {
        "id": 31,
        "value": 31,
        "name": "Hoodie with Zipper",
        "label": "Hoodie with Zipper",
        "price": "45",
        "image": "http://localhost:10003/wp-content/uploads/2026/04/hoodie-with-zipper-2-150x150.jpg"
    }
]
];
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
                                    <Form.Label htmlFor="checkout_product_placement_enabled" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.enabled.before }} />
                                }
                                <Form.Check
                                    id="checkout_product_placement_enabled"
                                    type="switch"
                                    // label="" 
                                    onChange={(e) => handleChange('checkout.product_placement.enabled', e.target.checked)}
                                    checked={settings?.checkout?.product_placement?.enabled ? true : false}

                                />
                                {settingsDetails?.checkout?.product_placement?.enabled?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.enabled.after }} />
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
                                    {settingsDetails?.checkout?.product_placement?.box_title?.title &&
                                        <h6 className="h6">
                                            {settingsDetails?.checkout?.product_placement?.box_title?.title}
                                            {settingsDetails?.checkout?.product_placement?.box_title?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.checkout.product_placement.box_title.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.checkout?.product_placement?.box_title?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.box_title.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.checkout?.product_placement?.box_title?.before &&
                                    <Form.Label htmlFor="checkout_product_placement_box_title" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.box_title.before }} />
                                }
                                <Form.Control
                                    id="checkout_product_placement_box_title"
                                    type="text"
                                    value={settings?.checkout?.product_placement?.box_title || ''}
                                    onChange={(e) => handleChange('checkout.product_placement.box_title', e.target.value)}
                                />
                                {settingsDetails?.checkout?.product_placement?.box_title?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.box_title.after }} />
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
                                    <Form.Label htmlFor="checkout_product_placement_intro" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.intro.before }} />
                                }
                                <Form.Control
                                    id="checkout_product_placement_intro"
                                    as="textarea"
                                    rows={3}
                                    value={settings?.checkout?.product_placement?.intro || ''}
                                    onChange={(e) => handleChange('checkout.product_placement.intro', e.target.value)}
                                />
                                {settingsDetails?.checkout?.product_placement?.intro?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.intro.after }} />
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
                                    <Form.Label htmlFor="checkout_product_placement_button_text" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.button_text.before }} />
                                }
                                <Form.Control
                                    id="checkout_product_placement_button_text"
                                    type="text"
                                    value={settings?.checkout?.product_placement?.button_text || ''}
                                    onChange={(e) => handleChange('checkout.product_placement.button_text', e.target.value)}
                                />
                                {settingsDetails?.checkout?.product_placement?.button_text?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.button_text.after }} />
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
                                    <Form.Label htmlFor="checkout_product_placement_select_product" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.select_product.before }} />
                                }
                                {console.log('Product: ', settings?.checkout?.product_placement?.select_product)}
                                {/* <MultiSelect
                                    name="checkout_product_placement_select_product"
                                    options={products.map(product => ({ value: product.value, label: product.label }))}
                                    defaultValues={settings?.checkout?.product_placement?.select_product.map(p => p.value) || []}
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
                                /> */}
                                {settingsDetails?.checkout?.product_placement?.select_product?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.select_product.after }} />
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
                                    <Form.Label htmlFor="checkout_product_placement_enable_for_products" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.enable_for_products.before }} />
                                }
                                {console.log('Products: ', settings?.checkout?.product_placement?.enable_for_products)}
                                {/* <MultiSelect
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
                                /> */}
                                <MultiSelect
                                    name="checkout_product_placement_enable_for_products"
                                    options={PRODUCTS}
                                    defaultValues={settings?.checkout?.product_placement?.enable_for_products?.map(p => p.value) || []}
                                    onChange={(optioned) => {
                                        // Filter the local PRODUCTS array based on selected values
                                        const optionedItems = PRODUCTS.filter(opt => optioned.includes(opt.value));
                                        handleChange('checkout.product_placement.enable_for_products', optionedItems);
                                    }}
                                    placeholder="Select multiselect"
                                />
                                {settingsDetails?.checkout?.product_placement?.enable_for_products?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.checkout.product_placement.enable_for_products.after }} />
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