import { __ } from "@wordpress/i18n";
import "./App.css";
import Header from "./layouts/Header/Header";
// import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import BuyTogether from "./pages/BuyTogether";
import Dashboard from "./pages/Dashboard/Dashboard";
import ImportExport from "./pages/ImportExport";
import More from "./pages/More";
import ProductAddons from "./pages/ProductAddons";
import ProductBadge from "./pages/ProductBadge";
import Feedback from "./pages/Feedback";
import Footer from "./layouts/Footer/Footer";
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
        <Route path="/settings" element={<Navigate to="/settings/buy_together" />} />
        <Route path="/settings/buy_together" element={<BuyTogether />} />
        <Route path="/settings/product_addons" element={<ProductAddons />} />
        <Route path="/settings/product_badge" element={<ProductBadge />} />
        <Route path="/settings/import_export" element={<ImportExport />} />
        <Route path="/settings/more" element={<More />} />
        <Route path="/settings/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
