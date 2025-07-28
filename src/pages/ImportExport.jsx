import { __ } from "@wordpress/i18n";
import { useEffect, useState } from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
const ImportExport = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
	const [settings, setSettings] = useState({});
  const [importData, setImportData] = useState('');

  // Fetch settings on load
  useEffect(() => {
    fetch('/wp-json/store-addons/v1/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  // Export settings as a downloadable JSON file
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'store-addons-settings.json';
    link.click();
  };

  // Import settings from uploaded JSON
  const handleImport = async () => {
    try {
      const parsed = JSON.parse(importData);
      const response = await fetch('/wp-json/store-addons/v1/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });

      const result = await response.json();
      if (result.success) {
        alert('Settings imported successfully!');
        setSettings(parsed);
      } else {
        alert('Import failed.');
      }
    } catch (e) {
      alert('Invalid JSON.');
    }
  };
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Export Settings", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Export your current settings", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <button onClick={handleExport}>Export Settings</button>
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Import Settings", "store-addons-for-woocommerce")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Copy and paste here", "store-addons-for-woocommerce")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <textarea
								rows="10"
								style={{ width: '100%' }}
								placeholder="Paste JSON here..."
								value={importData}
								onChange={(e) => setImportData(e.target.value)}
							></textarea>
							<br />
							<button onClick={handleImport}>Import Settings</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(ImportExport);