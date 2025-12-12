import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./views/Admin/Login/login";
import Superadmindashboard from "./views/Admin/Dasboard/admin-dashboard";
import VendorLogin from "./views/vendor/Login/login";
import VendorDashboard from "./views/vendor/Dashboard/vendordashboard";
import ProductList from "./views/vendor/productlist/productlist";
import Orderlist from "./views/vendor/pages/orderlist";
import Product from "./views/Admin/admin-product/product";
import Order from "./views/Admin/admin-product/order";
import Adminproductview from "./views/Admin/view-pages/admin-product-view-page";
import Adminorderview from "./views/Admin/view-pages/admin-order-view-page";
import Vendor from "./views/Admin/admin-product/vendor";
import Client from'./views/Admin/admin-product/client';
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
import VendorOrderViewPage from "./views/vendor/viewpage/vendororderviewpage";
import VendorList from "./views/vendor/pages/vendorlist";
import VendorForms from "./views/vendor/froms/vendorformpage";
import VendorViewPage from "./views/vendor/viewpage/vendorviewpage";
import MonthlyReports from "./views/vendor/pages/reports";
import CategoriesLists from "./views/vendor/pages/categoryList";
import CategoryForms from "./views/vendor/froms/categoryformpage";
import ProductFormPage from "./views/Admin/common-form-routing/productfrompage";

function Apps() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* //admin */}
          <Route path="/" element={<Login />} />
          <Route path="/admindashboard" element={<Superadmindashboard />} />
          <Route path="/adminproductlist" element={<Product />} />
          <Route path="/adminorderlist" element={<Order />} />
          <Route path="/adminproductview/:id" element={<Adminproductview />} />
          <Route path="/adminorderview/:id" element={<Adminorderview />} />
          <Route path="/adminvendorget/:id" element={<Adminvendorview />} />
          <Route path="/adminvendorlist" element={<Vendor />} />
          <Route path="/adminvendorview/:id" element={<Vendorformpage />} />
          <Route path="/adminproduct/Edit/:id" element={<ProductFormPage />} />

          <Route path="/adminclientlist" element={<Client />} />
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













          {/* //vendor */}
          <Route path="/vendorlogin" element={<VendorLogin />} />
          <Route path="/vendordashboard" element={<VendorDashboard />} />
          <Route path="/vendorproductlist" element={<ProductList />} />
          <Route path="/vendor/orderlist" element={<Orderlist />} />
          <Route path="/vendor/orderview/:id" element={<VendorOrderViewPage />} />
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="/vendor/create" element={<VendorForms />} />
          <Route path="/vendor/Edit/:id" element={<VendorForms />} />
          <Route path="/vendorview/:id" element={<VendorViewPage />} />
          <Route path="/vendor/monthlyreport" element={<MonthlyReports />} />
          <Route path="/categorylist" element={<CategoriesLists />} />
          <Route path="/category/Create" element={<CategoryForms />} />







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
