import { useState, useEffect } from '@wordpress/element';

export const useBridge = () => {
    const [bridgeData, setBridgeData] = useState(window.StoreAddonsForWoocommerceBridge || null);

    useEffect(() => {
        // Poll for the bridge if it's not immediately available
        const interval = setInterval(() => {
            if (window.StoreAddonsForWoocommerceBridge) {
                setBridgeData(window.StoreAddonsForWoocommerceBridge);
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return bridgeData;
};