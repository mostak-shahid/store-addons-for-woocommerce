import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import {Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
const BuyNow = () => {
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
                                {settingsDetails?.product?.buy_now_button?.enabled?.title && 
                                    <h6 className="h6">
                                        {settingsDetails.product.buy_now_button.enabled.title}
                                        {settingsDetails?.product?.buy_now_button?.enabled?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.product.buy_now_button.enabled.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.product?.buy_now_button?.enabled?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.product.buy_now_button.enabled.intro }}/>
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.product?.buy_now_button?.enabled?.before &&  
                                <Form.Label htmlFor="product-basic-product-enabled">{settingsDetails.product.buy_now_button.enabled.before}</Form.Label>
                            }
                            <Form.Check 
                                id="product_buy_now_button_enabled"
                                type="switch" 
                                // label="" 
                                onChange={(e) => handleChange('product.buy_now_button.enabled', e.target.checked)}
                                checked={settings?.product?.buy_now_button?.enabled ? true : false}

                            />
                            {settingsDetails?.product?.buy_now_button?.enabled?.after &&                                
                                <Form.Text className="enabled-muted">{settingsDetails.product.buy_now_button.enabled.after}</Form.Text>
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
                                {settingsDetails?.product?.buy_now_button?.title?.title && 
                                    <h6 className="h6">
                                        {settingsDetails?.product?.buy_now_button?.title?.title}
                                        {settingsDetails?.product?.buy_now_button?.title?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.product.buy_now_button.title.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.product?.buy_now_button?.title?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.product.buy_now_button.title.intro }}/> 
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.product?.buy_now_button?.title?.before &&  
                                <Form.Label htmlFor="product-basic-product-title">{settingsDetails.product.buy_now_button.title.before}</Form.Label>
                            }
                            <Form.Control 
                                id="product-basic-product-title"
                                type="text"                                     
                                value={settings?.product?.buy_now_button?.title || ''}
                                onChange={(e) => handleChange('product.buy_now_button.title', e.target.value)}
                            />
                            {settingsDetails?.product?.buy_now_button?.title?.after &&                                
                                <Form.Text className="text-muted">{settingsDetails.product.buy_now_button.title.after}</Form.Text>
                            }
                        </Form.Group>
                    }
                    </Col>

                </Row>                
            </div>              
        </>
    );
};

export default BuyNow;