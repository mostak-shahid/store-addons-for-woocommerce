import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import SortableAccordion from '../../components/SortableAccordion/SortableAccordion';
const ContentPlacement = () => {
    const { settings, settingsDetails, settingsLoading, handleChange } = useOutletContext();

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
                                    {settingsDetails?.cart?.content_placement?.enabled?.title &&
                                        <h6 className="h6">
                                            {settingsDetails.cart.content_placement.enabled.title}
                                            {settingsDetails?.cart?.content_placement?.enabled?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.cart.content_placement.enabled.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.cart?.content_placement?.enabled?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.cart.content_placement.enabled.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.cart?.content_placement?.enabled?.before &&
                                    <Form.Label htmlFor="cart_content_placement_enabled" dangerouslySetInnerHTML={{ __html: settingsDetails.cart.content_placement.enabled.before }} />
                                }
                                <Form.Check
                                    id="cart_content_placement_enabled"
                                    type="switch"
                                    // label="" 
                                    onChange={(e) => handleChange('cart.content_placement.enabled', e.target.checked)}
                                    checked={settings?.cart?.content_placement?.enabled ? true : false}

                                />
                                {settingsDetails?.cart?.content_placement?.enabled?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.cart.content_placement.enabled.after }} />
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>
            <div className="setting-unit mt-3">
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
                                    {settingsDetails?.cart?.content_placement?.content?.title &&
                                        <h6 className="h6">
                                            {settingsDetails.cart.content_placement.content.title}
                                            {settingsDetails?.cart?.content_placement?.content?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.cart.content_placement.content.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.cart?.content_placement?.content?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.cart.content_placement.content.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.cart?.content_placement?.content?.before &&
                                    <Form.Label htmlFor="cart_content_placement_content" dangerouslySetInnerHTML={{ __html: settingsDetails.cart.content_placement.content.before }} />
                                }

                                <SortableAccordion
                                    name='cart_content_placement_content'
                                    options={{
                                        addButton: __("Add New Block", 'store-addons-for-woocommerce'),
                                        titlePrefix: __("Content Block", 'store-addons-for-woocommerce'),
                                        enabler: true,
                                    }}
                                    fields={[
                                        { type: "input", name: "title", placeholder: __("Title", 'store-addons-for-woocommerce'), className: "input-field", label: __("Title", 'store-addons-for-woocommerce') },
                                        { type: "textarea", name: "note", placeholder: __("Note", 'store-addons-for-woocommerce'), className: "textarea-field", label: __("Note", 'store-addons-for-woocommerce') },
                                        { type: "checkbox", name: "enable", placeholder: __("Enable", 'store-addons-for-woocommerce'), className: "checkbox-field", label: __("Enable", 'store-addons-for-woocommerce') },
                                        { type: "input", name: "button_text", placeholder: __("Button Text", 'store-addons-for-woocommerce'), className: "input-field", label: __("Button Text", 'store-addons-for-woocommerce') },
                                        { type: "input", name: "button_url", placeholder: __("Button URL", 'store-addons-for-woocommerce'), className: "input-field", label: __("Button URL", 'store-addons-for-woocommerce') },
                                        { type: "media-uploader", name: "icon", placeholder: __("Address 1", 'store-addons-for-woocommerce'), className: "input-field", label: __("Image", 'store-addons-for-woocommerce') },
                                        
                                    ]}
                                    defaultValues={settings?.cart?.content_placement?.content}
                                    onChange={(value) => {
                                        // console.log(value);
                                        handleChange('cart.content_placement.content', value);
                                    }}
                                />
                                {settingsDetails?.cart?.content_placement?.content?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.cart.content_placement.content.after }} />
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>
        </>
    );
};

export default ContentPlacement;