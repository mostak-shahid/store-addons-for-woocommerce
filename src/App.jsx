import { __ } from "@wordpress/i18n";
import "./App.css";
import Header from "./layouts/Header/Header";
// import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import ArrayInput from "./pages/ArrayInput";
import BaseInput from "./pages/BaseInput";
import BuyTogether from "./pages/BuyTogether";
import ComponentsAdvanced from "./pages/ComponentsAdvanced";
import ComponentsBasic from "./pages/ComponentsBasic";
import Dashboard from "./pages/Dashboard/Dashboard";
import Explore from "./pages/Explore";
import Page from "./pages/Page";
import ProductAddons from "./pages/ProductAddons";
import ProductBadge from "./pages/ProductBadge";
const NotFound = () => (
  <div>
    <h2>{__("404 - Page Not Found", "store-addons-for-woocommerce")}</h2>
    <p>{__("The page you are looking for does not exist.", "store-addons-for-woocommerce")}</p>
    <Link to="/">{__("Go back to Home", "store-addons-for-woocommerce")}</Link>
  </div>
);
function App() {

  return (
    <div className="store-addons-for-woocommerce-settings-container">
      <Header />
      <Routes>
        {/* <Route path="/" element={<RestrictionsSettings handleChange={handleChange} />} /> */}
        {/* <Route path="/"  element={<Navigate to="/restrictions/settings" />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/settings" element={<Navigate to="/settings/buy_together" />} />
        <Route path="/settings/buy_together" element={<BuyTogether />} />
        <Route path="/settings/product_addons" element={<ProductAddons />} />
        <Route path="/settings/product_badge" element={<ProductBadge />} />

        <Route path="/settings/dropdown" element={<Navigate to="/settings/dropdown/dropdown-1" />} />
        <Route path="/settings/dropdown/dropdown-1" element={<ProductBadge />} />
        <Route path="/settings/dropdown/dropdown-2" element={<ProductBadge />} />

        <Route path="/settings/components" element={<Navigate to="/settings/components/basic" />} />
        <Route path="/settings/components/basic" element={<ComponentsBasic />} />
        
        <Route path="/settings/components/advanced" element={<ComponentsAdvanced />} />
        <Route path="/settings/components/advanced/advanced-1" element={<ComponentsAdvanced />} />
        <Route path="/settings/components/advanced/advanced-2" element={<ComponentsAdvanced />} />

        <Route path="/settings/base_input" element={<BaseInput />} />
        <Route path="/settings/array_input" element={<ArrayInput />} />
        <Route path="/page" element={<Page />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
