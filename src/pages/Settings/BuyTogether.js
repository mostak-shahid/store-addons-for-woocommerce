import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import {Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
const BuyTogether = () => {
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
                                {settingsDetails?.product?.buy_together?.enabled?.title && 
                                    <h6 className="h6">
                                        {settingsDetails.product.buy_together.enabled.title}
                                        {settingsDetails?.product?.buy_together?.enabled?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.product.buy_together.enabled.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.product?.buy_together?.enabled?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.product.buy_together.enabled.intro }}/>
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.product?.buy_together?.enabled?.before &&  
                                <Form.Label htmlFor="product_buy_together_enabled" dangerouslySetInnerHTML={{ __html: settingsDetails.product.buy_together.enabled.before }} />
                            }
                            <Form.Check 
                                id="product_buy_together_enabled"
                                type="switch" 
                                // label="" 
                                onChange={(e) => handleChange('product.buy_together.enabled', e.target.checked)}
                                checked={settings?.product?.buy_together?.enabled ? true : false}

                            />
                            {settingsDetails?.product?.buy_together?.enabled?.after &&                                
                                <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.product.buy_together.enabled.after }} />
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
                                {settingsDetails?.product?.buy_together?.box_title?.title && 
                                    <h6 className="h6">
                                        {settingsDetails?.product?.buy_together?.box_title?.title}
                                        {settingsDetails?.product?.buy_together?.box_title?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.product.buy_together.box_title.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.product?.buy_together?.box_title?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.product.buy_together.box_title.intro }}/> 
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.product?.buy_together?.box_title?.before &&  
                                <Form.Label htmlFor="product_buy_together_box_title" dangerouslySetInnerHTML={{ __html: settingsDetails.product.buy_together.box_title.before }} />
                            }
                            <Form.Control 
                                id="product_buy_together_box_title"
                                type="text"                                     
                                value={settings?.product?.buy_together?.box_title || ''}
                                onChange={(e) => handleChange('product.buy_together.box_title', e.target.value)}
                            />
                            {settingsDetails?.product?.buy_together?.box_title?.after &&                                
                                <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.product.buy_together.box_title.after }} />
                            }
                        </Form.Group>
                    }
                    </Col>

                </Row>                
            </div>               
        </>
    );
};

export default BuyTogether;