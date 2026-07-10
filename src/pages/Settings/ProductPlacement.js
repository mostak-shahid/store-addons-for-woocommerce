import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import MultiSelect from '../../components/MultiSelect/MultiSelect';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // Import the editor's skin styles

// Define custom toolbar options
const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        // ['link', 'image'],
        ['link'],
        ['clean'], // Removes formatting
    ],
};

// Define supported formats
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    // 'link', 'image',
    'link',
];
const ProductPlacement = () => {
    const { settings, settingsDetails, settingsLoading, handleChange } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (settings?.checkout?.product_placement) {
            const savedProducts = [
                ...(settings.checkout.product_placement.select_product || []),
                ...(settings.checkout.product_placement.enable_for_products || [])
            ];

            if (savedProducts.length > 0) {
                setProducts(prevProducts => {
                    const newProducts = [...prevProducts];
                    savedProducts.forEach(savedProduct => {
                        // Ensure we use the structure {id, name}
                        const product = {
                            id: savedProduct.value || savedProduct.id,
                            name: savedProduct.label || savedProduct.name
                        };
                        if (!newProducts.find(p => p.id === product.id)) {
                            newProducts.push(product);
                        }
                    });
                    return newProducts;
                });
            }
        }
    }, [settings]);

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
            // Merge with existing products to keep selected ones
            setProducts(prevProducts => {
                const newProducts = [...prevProducts];
                result.forEach(newProduct => {
                    if (!newProducts.find(p => p.id === newProduct.id)) {
                        newProducts.push(newProduct);
                    }
                });
                return newProducts;
            });

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
                                <ReactQuill
                                    theme="snow"
                                    value={settings?.checkout?.product_placement?.intro}
                                    onChange={(value) => handleChange('checkout.product_placement.intro', value)}
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Write something amazing here..."
                                    style={{ height: '250px', marginBottom: '50px' }}
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
                                <MultiSelect
                                    name="checkout_product_placement_select_product"
                                    options={products.map(product => ({ value: product.id, label: product.name }))}
                                    defaultValues={settings?.checkout?.product_placement?.select_product?.map(p => p.value || p.id) || []}
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
                                <MultiSelect
                                    name="checkout_product_placement_enable_for_products"
                                    options={products.map(product => ({ value: product.id, label: product.name }))}
                                    defaultValues={settings?.checkout?.product_placement?.enable_for_products?.map(p => p.value || p.id) || []}
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