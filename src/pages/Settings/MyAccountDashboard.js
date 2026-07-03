import { useMemo, useState, useCallback } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// 1. Define the initial state structure required by Slate
const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
    // {
    //     type: 'paragraph',
    //     children: [
    //         { text: 'You can format this text as ' },
    //         { text: 'bold', bold: true },
    //         { text: ' or ' },
    //         { text: 'italic', italic: true },
    //         { text: '.' },
    //     ],
    // },
];

const MyAccountDashboard = () => {
    const { settings, settingsDetails, settingsLoading, handleChange } = useOutletContext();


    // 2. Initialize a stable Slate editor instance using useMemo
    const editor = useMemo(() => withReact(createEditor()), []);
    
    // 3. Keep track of the current JSON state value
    const [value, setValue] = useState(initialValue);

    // 4. Custom rendering rule for text formatting (Marks like Bold/Italic)
    const renderLeaf = useCallback((props) => {
        let { attributes, children, leaf } = props;

        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }
        if (leaf.italic) {
            children = <em>{children}</em>;
        }
        if (leaf.code) {
            children = <code style={{ background: '#f4f4f4', padding: '2px 4px' }}>{children}</code>;
        }

        return <span {...attributes}>{children}</span>;
    }, []);

    // 5. Custom rendering rule for structural layout elements (Blocks)
    const renderElement = useCallback((props) => {
        const { attributes, children, element } = props;
        switch (element.type) {
            case 'code':
                return <pre {...attributes}><code>{children}</code></pre>;
            case 'heading':
                return <h3 {...attributes}>{children}</h3>;
            default:
                return <p {...attributes}>{children}</p>;
        }
    }, []);

    // 6. Helper function to toggle a text formatting format
    const toggleMark = (format) => {
        const isActive = isMarkActive(format);
        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    };

    const isMarkActive = (format) => {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    };

    // 7. Save data to WordPress
    const handleSave = () => {
        // Convert the JSON object structure to a string to send to your PHP DB
        const stringifiedData = JSON.stringify(value);
        console.log('Save this string to WordPress Option:', stringifiedData);
        
        // Example: wp.apiFetch({ path: '/my-plugin/v1/save', method: 'POST', data: { content: stringifiedData } })
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
                                <Slate 
                                    editor={editor} 
                                    initialValue={settings?.account?.dashboard?.content || initialValue} 
                                    // onChange={newValue => setValue(newValue)}
                                    onChange={(newValue) => handleChange('account.dashboard.content', newValue)}
                                >
                                    {/* Formatting Toolbar Layout */}
                                    <div style={{
                                        border: '1px solid #ccc',
                                        borderBottom: 'none',
                                        padding: '8px',
                                        background: '#f6f7f7',
                                        display: 'flex',
                                        gap: '5px'
                                    }}>
                                        <button type="button" onClick={() => toggleMark('bold')} style={{ fontWeight: 'bold', padding: '4px 8px' }}>B</button>
                                        <button type="button" onClick={() => toggleMark('italic')} style={{ fontStyle: 'italic', padding: '4px 8px' }}>I</button>
                                        <button type="button" onClick={() => toggleMark('code')} style={{ fontFamily: 'monospace', padding: '4px 8px' }}>&lt;/&gt;</button>
                                    </div>

                                    {/* Editable Area Input Field */}
                                    <div style={{
                                        border: '1px solid #ccc',
                                        padding: '15px',
                                        minHeight: '150px',
                                        fontFamily: 'sans-serif'
                                    }}>
                                        <Editable
                                            renderElement={renderElement}
                                            renderLeaf={renderLeaf}
                                            placeholder="Enter some rich text content..."
                                        />
                                    </div>
                                </Slate>
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