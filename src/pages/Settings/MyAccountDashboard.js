import { useMemo, useState, useCallback } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

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
    'link'
];

const MyAccountDashboard = () => {
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
                                    {settingsDetails?.account?.dashboard?.enabled?.title &&
                                        <h6 className="h6">
                                            {settingsDetails.account.dashboard.enabled.title}
                                            {settingsDetails?.account?.dashboard?.enabled?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.account.dashboard.enabled.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.account?.dashboard?.enabled?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.account.dashboard.enabled.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.account?.dashboard?.enabled?.before &&
                                    <Form.Label htmlFor="account_dashboard_enabled" dangerouslySetInnerHTML={{ __html: settingsDetails.account.dashboard.enabled.before }} />
                                }
                                <Form.Check
                                    id="account_dashboard_enabled"
                                    type="switch"
                                    // label="" 
                                    onChange={(e) => handleChange('account.dashboard.enabled', e.target.checked)}
                                    checked={settings?.account?.dashboard?.enabled ? true : false}

                                />
                                {settingsDetails?.account?.dashboard?.enabled?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.account.dashboard.enabled.after }} />
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
                                    {settingsDetails?.account?.dashboard?.content?.title &&
                                        <h6 className="h6">
                                            {settingsDetails.account.dashboard.content.title}
                                            {settingsDetails?.account?.dashboard?.content?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.account.dashboard.content.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </OverlayTrigger>
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.account?.dashboard?.content?.intro &&
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: settingsDetails.account.dashboard.content.intro }} />
                                    }
                                </>
                        }
                    </Col>

                    <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.account?.dashboard?.content?.before &&
                                    <Form.Label htmlFor="account_dashboard_content" dangerouslySetInnerHTML={{__html: settingsDetails.account.dashboard.content.before}} />
                                }
                                {/* Editor Component */}
                                <ReactQuill
                                    theme="snow"
                                    value={settings?.account?.dashboard?.content}
                                    onChange={(value) => handleChange('account.dashboard.content', value)}
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Write something amazing here..."
                                    style={{ height: '250px', marginBottom: '50px' }}
                                />
                                {settingsDetails?.account?.dashboard?.content?.after &&
                                    <Form.Text className="text-muted" dangerouslySetInnerHTML={{ __html: settingsDetails.account.dashboard.content.after }} />
                                }
                            </Form.Group>
                        }
                    </Col>

                </Row>
            </div>
        </>
    );
};

export default MyAccountDashboard;

/*
Uses
<?php
// 1. Define the original template string
$template_content = '<p>Hello <strong>{{username}}</strong> (not <strong>{{username}}</strong>? {{logout_url}})</p><p>From your account dashboard you can view your {{recent_orders}}, manage your {{edit_address}}, and {{edit_account}}.</p>';

// 2. Define your custom replacements mapping placeholder => replacement text/HTML
$replacements = [
    '{{username}}'      => 'admin',
    '{{logout_url}}'    => '<a href="http://localhost:10003/wp-login.php?action=logout&amp;redirect_to=http%3A%2F%2Flocalhost%3A10003%2Fmy-account%2F&amp;_wpnonce=37beddc0d2">Log out</a>',
    '{{recent_orders}}' => '<a href="http://localhost:10003/my-account/orders/">recent orders</a>',
    '{{edit_address}}'  => '<a href="http://localhost:10003/my-account/edit-address/">shipping and billing addresses</a>',
    '{{edit_account}}'  => '<a href="http://localhost:10003/my-account/edit-account/">edit your password and account details</a>',
];

// 3. Swap the placeholders with the actual values
$final_output = strtr($template_content, $replacements);

// 4. Output the converted string safely in WordPress
echo wp_kses_post($final_output);
*/