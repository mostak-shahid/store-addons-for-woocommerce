import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { MediaUploader } from '../components';
export default function ProfileApp() {
    const [userMeta, setUserMeta] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSettingTheme = async () => {
            setLoading(true);
            try {
                // const params = new URLSearchParams({
                //     id: store_addons_for_woocommerce_ajax_obj.get_current_user_id,
                // });
                const id = store_addons_for_woocommerce_profile_obj.user_id;
                const response = await apiFetch({
                    // path: `store-addons-for-woocommerce/v1/profile/metas/?${params.toString()}`,
                    path: `store-addons-for-woocommerce/v1/profile/metas/${id}`,
                    method: 'GET'
                });
                console.log(response);
                if (response.success) {
                    setUserMeta(response.data);
                }
                
            } catch (err) {
                console.error('API error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettingTheme();
    }, []);


    
    
    const handleChange = (fieldPath, value) => {
        // console.log("Field changed:", fieldPath, "New value:", value);
        setUserMeta(prev => {
            const updatedOptions = setNestedValue(prev, fieldPath, value);
            return { ...updatedOptions }; // Ensure React detects the update
        });
    };
    return (
        <>
            <h2>{__('Store Addons for WooCommerce', 'store-addons-for-woocommerce')}</h2>
            <table className="form-table" role="presentation">
					<tbody>
                        <tr className="user-media-uploader-wrap">
                            <th><label for="media-uploader">Media</label></th>
                            <td>
                                <MediaUploader 
                                    defaultValues={userMeta?.media_uploader} 
                                    name='media_uploader' 
                                    onChange={(value) => handleChange(media_uploader, value)}
                                    options = {{
                                        frame:{
                                            title: __("Select or Upload Image", "store-addons-for-woocommerce"),
                                        },
                                        library: {type: 'image'},
                                        buttons: {
                                            upload: __("Upload Image", "store-addons-for-woocommerce"),
                                            remove: __("Remove", "store-addons-for-woocommerce"),
                                            select: __("Use this image", "store-addons-for-woocommerce")                                            
                                        }
                                    }}
                                />
                            </td>
					</tr>
                    </tbody>
            </table>
        </>
    )
}
