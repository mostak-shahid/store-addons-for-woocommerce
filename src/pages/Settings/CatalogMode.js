import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import {Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
const CatalogMode = () => {
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
                                {settingsDetails?.general?.catalog_mode?.enabled?.title && 
                                    <h6 className="h6">
                                        {settingsDetails.general.catalog_mode.enabled.title}
                                        {settingsDetails?.general?.catalog_mode?.enabled?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.general.catalog_mode.enabled.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.general?.catalog_mode?.enabled?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.enabled.intro }}/>
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.general?.catalog_mode?.enabled?.before &&  
                                <Form.Label htmlFor="general_catalog_mode_enabled" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.enabled.before }} />
                            }
                            <Form.Check 
                                id="general_catalog_mode_enabled"
                                type="switch" 
                                // label="" 
                                onChange={(e) => handleChange('general.catalog_mode.enabled', e.target.checked)}
                                checked={settings?.general?.catalog_mode?.enabled ? true : false}

                            />
                            {settingsDetails?.general?.catalog_mode?.enabled?.after &&                                
                                <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.enabled.after }} />
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
                                {settingsDetails?.general?.catalog_mode?.query_button_enabled?.title && 
                                    <h6 className="h6">
                                        {settingsDetails.general.catalog_mode.query_button_enabled.title}
                                        {settingsDetails?.general?.catalog_mode?.query_button_enabled?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.general.catalog_mode.query_button_enabled.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.general?.catalog_mode?.query_button_enabled?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_enabled.intro }}/>
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.general?.catalog_mode?.query_button_enabled?.before &&  
                                <Form.Label htmlFor="general_catalog_mode_query_button_enabled" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_enabled.before }} />
                            }
                            <Form.Check 
                                id="general_catalog_mode_query_button_enabled"
                                type="switch" 
                                // label="" 
                                onChange={(e) => handleChange('general.catalog_mode.query_button_enabled', e.target.checked)}
                                checked={settings?.general?.catalog_mode?.query_button_enabled ? true : false}

                            />
                            {settingsDetails?.general?.catalog_mode?.query_button_enabled?.after &&                                
                                <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_enabled.after }} />
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
                                {settingsDetails?.general?.catalog_mode?.query_button_text?.title && 
                                    <h6 className="h6">
                                        {settingsDetails?.general?.catalog_mode?.query_button_text?.title}
                                        {settingsDetails?.general?.catalog_mode?.query_button_text?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.general.catalog_mode.query_button_text.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.general?.catalog_mode?.query_button_text?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_text.intro }}/> 
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.general?.catalog_mode?.query_button_text?.before &&  
                                <Form.Label htmlFor="general_catalog_mode_title" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_text.before }} />
                            }
                            <Form.Control 
                                id="general_catalog_mode_title"
                                type="text"                                     
                                value={settings?.general?.catalog_mode?.query_button_text || ''}
                                onChange={(e) => handleChange('general.catalog_mode.query_button_text', e.target.value)}
                            />
                            {settingsDetails?.general?.catalog_mode?.query_button_text?.after &&                                
                                <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_text.after }} />
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
                                {settingsDetails?.general?.catalog_mode?.query_button_url?.title && 
                                    <h6 className="h6">
                                        {settingsDetails?.general?.catalog_mode?.query_button_url?.title}
                                        {settingsDetails?.general?.catalog_mode?.query_button_url?.hint &&
                                            <OverlayTrigger overlay={<Tooltip>{settingsDetails.general.catalog_mode.query_button_url.hint}</Tooltip>}>
                                                <FontAwesomeIcon icon={faQuestionCircle}/>
                                            </OverlayTrigger>                                            
                                        }
                                    </h6>
                                }
                                {settingsDetails?.general?.catalog_mode?.query_button_url?.intro && 
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_url.intro }}/> 
                                }
                            </>
                        }               
                    </Col>

                    <Col lg={6}>
                    {
                        !settingsLoading &&

                        <Form.Group>
                            {settingsDetails?.general?.catalog_mode?.query_button_url?.before &&  
                                <Form.Label htmlFor="general_catalog_mode_title" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_url.before }} />
                            }
                            <Form.Control 
                                id="general_catalog_mode_title"
                                type="url"                                     
                                value={settings?.general?.catalog_mode?.query_button_url || ''}
                                onChange={(e) => handleChange('general.catalog_mode.query_button_url', e.target.value)}
                            />
                            {settingsDetails?.general?.catalog_mode?.query_button_url?.after &&                                
                                <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.general.catalog_mode.query_button_url.after }} />
                            }
                        </Form.Group>
                    }
                    </Col>

                </Row>                
            </div>              
        </>
    );
};

export default CatalogMode;