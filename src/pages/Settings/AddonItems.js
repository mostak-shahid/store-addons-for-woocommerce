import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import {Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
const AddonItems = () => {
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
                                <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            </>
                            : 
                            <>
                                {settingsDetails?.product?.addon_items?.enabled?.title && 
                                    <h6 className="h6">
                                        {settingsDetails.product.addon_items.enabled.title}
                                        {settingsDetails?.product?.addon_items?.enabled?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.product.addon_items.enabled.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.product?.addon_items?.enabled?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.product.addon_items.enabled.intro }}/>
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.product?.addon_items?.enabled?.before &&  
                                <Form.Label htmlFor="product-basic-product-enabled">{settingsDetails.product.addon_items.enabled.before}</Form.Label>
                            }
                            <Form.Check 
                                id="product_addon_items_enabled"
                                type="switch" 
                                // label="" 
                                onChange={(e) => handleChange('product.addon_items.enabled', e.target.checked)}
                                checked={settings?.product?.addon_items?.enabled ? true : false}

                            />
                            {settingsDetails?.product?.addon_items?.enabled?.after &&                                
                                <Form.Text className="enabled-muted">{settingsDetails.product.addon_items.enabled.after}</Form.Text>
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
                                <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            </>
                            : 
                            <>
                                {settingsDetails?.product?.addon_items?.title?.title && 
                                    <h6 className="h6">
                                        {settingsDetails?.product?.addon_items?.title?.title}
                                        {settingsDetails?.product?.addon_items?.title?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.product.addon_items.title.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.product?.addon_items?.title?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.product.addon_items.title.intro }}/> 
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.product?.addon_items?.title?.before &&  
                                <Form.Label htmlFor="product-basic-product-title">{settingsDetails.product.addon_items.title.before}</Form.Label>
                            }
                            <Form.Control 
                                id="product-basic-product-title"
                                type="text"                                     
                                value={settings?.product?.addon_items?.title || ''}
                                onChange={(e) => handleChange('product.addon_items.title', e.target.value)}
                            />
                            {settingsDetails?.product?.addon_items?.title?.after &&                                
                                <Form.Text className="text-muted">{settingsDetails.product.addon_items.title.after}</Form.Text>
                            }
                        </Form.Group>
                    }
                    </Col>

                </Row>                
            </div>               
        </>
    );
};

export default AddonItems;