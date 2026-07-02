import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from '@wordpress/element';
import {Card, Button, Container, Row, Col, Form, FloatingLabel, Spinner} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../layouts';
import {PageInfo} from '../components';
import {OnlineSurvey, OnlineSurveyDark} from '../lib/Illustrations';
import menuItems from '../data/menu.json';
import ToastControl from "../components/ToastControl/ToastControl";
import BreadcrumbControl from "../components/BreadcrumbControl/BreadcrumbControl";
const Feedback = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        
        setValidated(true);
        handleForm();
    };



    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        phone: '',
        message: '',
    });
    const [processing, setProcessing] = useState(false);

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const [showToast, setShowToast] = useState(false);
    const [dataToast, setDataToast] = useState({title: '', content: '', type: 'success'});
    const toggleShowToast = () => setShowToast(!showToast);

    const handleForm = async () => {
        console.log(formData);
        if (formData.email && formData.email.trim() !== '' && formData.message && formData.message.trim() !== '' && formData.name && formData.name.trim() !== '') {
            setProcessing(true);
            try {
                const result = await apiFetch({
                    path: "/store-addons-for-woocommerce/v1/feedback",
                    method: "POST",
                    data: {
                        name: formData.name,
                        subject: formData.subject,
                        email: formData.email,
                        phone: formData.phone,
                        message: formData.message
                    },
                    headers: {
                        'X-WP-Nonce': store_addons_for_woocommerce_ajax_obj.api_nonce
                    }
                });
                console.log(result);
                if (result.success) {
                    setValidated(false);
                    setFormData({
                        name: '',
                        subject: '',
                        email: '',
                        phone: '',
                        message: '',
                    });
                    setDataToast({
                        title: __("Success", "store-addons-for-woocommerce"),
                        content: __("Feedback sent successfully!", "store-addons-for-woocommerce"),
                        type: 'success'
                    });
                    setShowToast(true);
                }

            } catch (error) {
                console.error("Mail Sending Error:", error);
                setDataToast({
                    title: __("Error", "store-addons-for-woocommerce"),
                    content: __("Please try again!", "store-addons-for-woocommerce"),
                    type: 'danger'
                });
                setShowToast(true);
            } finally {
                setProcessing(false);
            }
        } else {
            setDataToast({
                title: __("Warning", "store-addons-for-woocommerce"),
                content: __("Email and message are required", "store-addons-for-woocommerce"),
                type: 'warning'
            });
            setShowToast(true);
        }
    };
    return (        
        <Layout sidebarPosition="none">  
                <BreadcrumbControl menu={menuItems} url="/feedback"  className='mb-3 border rounded-0 py-2 px-3' />
                <div className='mb-3 border rounded-0 p-3'>
                    <PageInfo menu={menuItems} url="/feedback"  />
                </div>
                <Card>
                    {/* <Card.Header>
                        <PageInfo menu={menuItems} url="/feedback"  /> 
                    </Card.Header> */}
                    <Card.Body>                              
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="align-items-center">
                                <Col lg={6}>
                                    <OnlineSurvey/>
                                </Col>
                                <Col lg={6}>
                                    <FloatingLabel
                                        controlId="floatingName"
                                        label={__('Name', 'store-addons-for-woocommerce')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder={__('Name', 'store-addons-for-woocommerce')}
                                            value={formData.name}
                                            onChange={(e) => handleFieldChange('name', e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingSubject"
                                        label={__('Subject', 'store-addons-for-woocommerce')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder={__('Subject', 'store-addons-for-woocommerce')}
                                            value={formData.subject}
                                            onChange={(e) => handleFieldChange('subject', e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label={__('Email address', 'store-addons-for-woocommerce')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder={__('Email address', 'store-addons-for-woocommerce')}
                                            value={formData.email}
                                            onChange={(e) => handleFieldChange('email', e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingPhone"
                                        label={__('Phone', 'store-addons-for-woocommerce')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="tel"
                                            placeholder={__('Phone', 'store-addons-for-woocommerce')}
                                            value={formData.phone}
                                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingMessage"
                                        label={__('Message', 'store-addons-for-woocommerce')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            required
                                            as="textarea"
                                            rows={15}
                                            placeholder={__('Message', 'store-addons-for-woocommerce')}
                                            value={formData.message}
                                            onChange={(e) => handleFieldChange('message', e.target.value)}
                                        />
                                    </FloatingLabel>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                /> {__('Sending...', 'store-addons-for-woocommerce')}
                                            </>
                                        ) : (
                                            <>
                                                 <FontAwesomeIcon icon={faPaperPlane} /> {__('Send', 'store-addons-for-woocommerce')}
                                            </>
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form> 
                    </Card.Body>
                </Card>            
            <ToastControl
                show={showToast}
                onClose={toggleShowToast}
                data={dataToast}
            />
        </Layout>
    );
};
export default Feedback;