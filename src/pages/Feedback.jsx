import { __ } from "@wordpress/i18n";
import Switch from '../components/Switch/Switch';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import axios from "axios";
import { useEffect, useState } from 'react';
const Feedback = () => {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [processing, setProcessing] = useState(false)
    const handleForm = async () => {
        if (subject && message) {
            setProcessing(true);
            try {
                const result = await axios.post(
                    "/wp-json/store-addons-for-woocommerce/v1/feedback",
                    {
                        subject: subject,
                        message: message
                    },
                    {
                        headers: {
                            'X-WP-Nonce': store_addons_for_woocommerce_ajax_obj.api_nonce,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                // You might want to handle success here
                // console.log("Mail sent successfully:", result.data);
            } catch (error) {
                console.error("Mail Sending Error:", error);
            } finally {
                setProcessing(false);
            }
        } else {
            alert('Subject or Message can\'t be Empty')
        }
    };

    // const handleForm = async () => {
    //     setProcessing(true);
    //     try {

    //         const result = await axios.post({
    //             "/store-addons-for-woocommerce/v1/feedback",
    //             {
    //                 _wpnonce: store_addons_for_woocommerce_ajax_obj.security,
    //                 subject: subject,
    //                 message: message
    //             }
    //         });
    //     } catch (error) {
    //         console.error("Mail Sending Error:", error);
    //         setProcessing(false)
    //     }
    //         // axios.post(OPTIONS_API_URL, {'store_addons_for_woocommerce_options': settingData})
    //         // .then(response => {
    //         //     // window.scrollTo(0, 0);
    //         //     console.log("Settings saved successfully:", response.data);       
    //         //     setProcessing(false)
    //         //     setTimeout(()=> {
    //         //         setShowFormNotice(false)
    //         //     },3000)
    //         // })
    //         // .catch(
    //         //     error => console.error("Error saving settings:", error)
    //         // );
    // };
    // const handleForm = async () => {
    //     setProcessing(true);
    //     try {
    //         const result = await formDataPost('store_addons_for_woocommerce_ajax_plugins_status', {
    //             file:plugin_file,
    //         });
    //         // console.log("Result:", result); // check structure here
    //         setPluginStatus(result?.data?.success_message); // Fix this line based on actual response
    //     } catch (error) {
    //         setErrorMessage(error.message);
    //     } finally {
    //         // setPluginStatusLoading(false);
    //     }
    // };

    // const handleForm = async () => {
    //     if (subject && message) {
    //         setProcessingSend(true)
    //         setProcessingSendRing(true)
    //         try {
    //             const result = await apiFetch({
    //                 path: "/store-addons-for-woocommerce/v1/feedback",
    //                 method: "POST",
    //                 data: {
    //                     _wpnonce: store_addons_for_woocommerce_ajax_obj.security,
    //                     subject: subject,
    //                     message: message
    //                 }
    //             });
    //             console.log(result)
    //             if (result.success) {  
    //                 setSubject("")
    //                 setMessage("")              
    //                 setProcessingSend(false)
    //                 setProcessingSendRing(false)
    //             }
    //         } catch (error) {
    //             console.error("Mail Sending Error:", error);
    //             setProcessingSend(false)
    //             setProcessingSendRing(false)
    //         }
    //     } else {
    //         alert('Subject or Message can\'t be Empty')
    //     }
        
    // };
    return (
        <>
            <div className="setting-unit">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img className="img-fluid" src={`${store_addons_for_woocommerce_ajax_obj.image_url}feedback.jpg`} alt="" />
                    </div> 
                    <div className="col-lg-6">
                        <div class="mb-3">
                            <label htmlFor="subject" class="form-label">{__("Subject", "store-addons-for-woocommerce")}</label>
                            <input 
                                id="subject"
                                className="form-control"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            /> 
                        </div>
                        <div class="mb-3">
                            <label htmlFor="message" class="form-label">{__("Message", "store-addons-for-woocommerce")}</label>
                            <textarea 
                                id="message"
                                className="form-control"
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            /> 
                        </div>
                        <button 
                            type="button" 
                            className="button button-primary" 
                            onClick={handleForm}
                            disabled={processing}
                        >
                            {
                                processing ? __( "Sending...", "store-addons-for-woocommerce" ) : __( "Send", "store-addons-for-woocommerce" )
                            }
                        </button>
                        
                    </div>  
                </div>
            </div>
        </>
    )
}
export default withForm(Feedback);