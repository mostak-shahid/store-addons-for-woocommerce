import { useState } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tinymce/tinymce-react';

const MyAccountDashboard = () => {
    const { settings, settingsDetails, settingsLoading, handleChange } = useOutletContext();

    const [editorContent, setEditorContent] = useState('<p>Initial settings text...</p>');

    const handleSave = () => {
        // Use wp.apiFetch or native fetch to post 'editorContent' string to your options table API
        console.log('Saving content:', editorContent);
    };

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
                                    <Form.Label htmlFor="account-dashboard-enabled">{settingsDetails.account.dashboard.enabled.before}</Form.Label>
                                }
                                <Form.Check
                                    id="account_dashboard_enabled"
                                    type="switch"
                                    // label="" 
                                    onChange={(e) => handleChange('account.dashboard.enabled', e.target.checked)}
                                    checked={settings?.account?.dashboard?.enabled ? true : false}

                                />
                                {settingsDetails?.account?.dashboard?.enabled?.after &&
                                    <Form.Text className="text-muted">{settingsDetails.account.dashboard.enabled.after}</Form.Text>
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
                                    <Form.Label htmlFor="account_dashboard_content">{settingsDetails.account.dashboard.content.before}</Form.Label>
                                }
                                {/* Textarea/Rich Text Editor */}
                                <Form.Control
                                    as="textarea"
                                    id="account_dashboard_content"
                                    rows={5}
                                    onChange={(e) => handleChange('account.dashboard.content', e.target.value)}
                                    value={settings?.account?.dashboard?.content || ''}
                                />
                                <div className="my-custom-editor-container" style={{ border: '1px solid #ccc', minHeight: '150px' }}>
                                    <Editor
    apiKey="your-tinymce-cloud-api-key" // Register on tiny.cloud to get a free key
    value={editorContent}
    onEditorChange={(content) => setEditorContent(content)}
    init={{
        height: 250,
        menubar: false,
        plugins: ['link', 'lists', 'code'],
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    }}
/>
                                </div>
                                {settingsDetails?.account?.dashboard?.content?.after &&
                                    <Form.Text className="text-muted">{settingsDetails.account.dashboard.content.after}</Form.Text>
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