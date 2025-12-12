import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./views/Admin/Login/login";
import Superadmindashboard from "./views/Admin/Dasboard/admin-dashboard";

import Product from "./views/Admin/admin-product/product";
import Order from "./views/Admin/admin-product/order";
import Adminproductview from "./views/Admin/view-pages/admin-product-view-page";
import Adminorderview from "./views/Admin/view-pages/admin-order-view-page";

import Category from "./views/Admin/admin-product/category";

import Adminvendorview from "./views/Admin/view-pages/admin-vendor-view-page";
import Vendorformpage from "./views/Admin/common-form-routing/vendorformpage";

import Clientformpage from "./views/Admin/common-form-routing/clientformpage";
import Shoptypelist from "./views/Admin/shoptype-list/shoptype";
import Shoptypeformpage from "./views/Admin/common-form-routing/shoptypeformpage";
import Userlist from "./views/Admin/user-list/userlist";
import Userformpage from "./views/Admin/common-form-routing/userformpage";
import AdminUserview from "./views/Admin/view-pages/admin-user-view-page copy";
import Settingformpage from "./views/Admin/common-form-routing/settingformpage";
import Reports from "./views/Admin/admin-product/reports";
import AdminShopView from "./views/Admin/view-pages/admin-shop-view-page copy";

import ProductFormPage from "./views/Admin/common-form-routing/productfrompage";
import Customer from "./views/Admin/admin-product/customer";


function Apps() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* //admin */}
          <Route path="/" element={<Login />} />
          <Route path="/admindashboard" element={<Superadmindashboard />} />
          <Route path="/admin-product-list" element={<Product />} />
          <Route path="/adminorderlist" element={<Order />} />
          <Route path="/adminproductview/:id" element={<Adminproductview />} />
          <Route path="/adminorderview/:id" element={<Adminorderview />} />
          <Route path="/adminvendorget/:id" element={<Adminvendorview />} />
          <Route path="/adminvendorlist" element={<Category />} />
          <Route path="/adminvendorview/:id" element={<Vendorformpage />} />
          <Route path="/admin-product/edit/:id" element={<ProductFormPage />} />
          <Route path="/admin-product/Create" element={<ProductFormPage />} />

          <Route path="/adminclientlist" element={<Customer />} />
          <Route path="/adminclient/Edit/:id" element={<Clientformpage />} />
          <Route path="/adminshoplist" element={<Shoptypelist />} />
          <Route path="/adminshop/Edit/:id" element={<Shoptypeformpage />} />
          <Route path="/adminshopview/:id" element={<AdminShopView />} />
          <Route path="/adminshop/Create" element={<Shoptypeformpage />} />
          <Route path="/adminuserlist" element={<Userlist />} />
          <Route path="/adminuserview/:id" element={<AdminUserview />} />
          <Route path="/adminuser/Create" element={<Userformpage />} />
          <Route path="/adminuserget/Edit/:id" element={<Userformpage />} />
          <Route path="/adminsetting" element={<Settingformpage />} />
          <Route path="/adminreport" element={<Reports />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer
        className="toast-position"
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="dark"
        style={{ width: "500px" }}
        // #00D26E
      />
    </div>
  );
}

export default Apps;
