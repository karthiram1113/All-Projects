import { BrowserRouter, Routes, Route, Router, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Login from "./views/Admin/Login/login";
// import VendorLogin from "./views/vendor/Login/login";
// import VendorDashboard from "./layout/Vendor Dashboard/vendordashboard";
// import Orderlist from "./views/vendor/pages/orderlistlist";
// import Product from "./views/Admin/admin-product/product";
// import Order from "./views/Admin/admin-product/orderlist";
// import Adminproductview from "./views/Admin/view-pages/admin-product-view-page";
// import Adminorderview from "./views/Admin/view-pages/admin-order-view-page";
// import Vendor from "./views/Admin/admin-product/vendor";
// import Client from "./views/Admin/admin-product/client";
// import Adminvendorview from "./views/Admin/view-pages/admin-vendor-view-page";
// import Vendorformpage from "./views/Admin/common-form-routing/vendorformpage";
// import Clientformpage from "./views/Admin/common-form-routing/clientformpage";
// import Shoptypelist from "./views/Admin/shoptype-list/shoptype";
// import Shoptypeformpage from "./views/Admin/common-form-routing/shoptypeformpage";
// import Userlist from "./views/Admin/user-list/userlist";
// import Userformpage from "./views/Admin/common-form-routing/userformpage";
// import AdminUserview from "./views/Admin/view-pages/admin-user-view-page copy";
// import Settingformpage from "./views/Admin/common-form-routing/settingformpage";
// import Reports from "./views/Admin/admin-product/reports";
// import AdminShopView from "./views/Admin/view-pages/admin-shop-view-page copy";
// import VendorOrderViewPage from "./views/vendor/viewpage/vendororderviewpage";
// import VendorList from "./views/vendor/pages/vendorlist";
// import VendorForms from "./views/vendor/froms/vendorformpage";
// import VendorViewPage from "./views/vendor/viewpage/vendorviewpage";
// import MonthlyReports from "./views/vendor/pages/reports";
// import CategoriesLists from "./views/vendor/pages/categoryList";
// import CategoryForms from "./views/vendor/froms/categoryformpage";
// import Superadmindashboard from "./layout/Admin Dasboard/admin-dashboard";
// import PAGE404 from "./views/Page404/index";
import { useEffect, useState } from "react";
import Footer from "./shared/footer";
import Login from "./commponents/Login/login";
// import ProductList from "./views/product-layout/product-list-layout";
import Adminproductview from "./commponents/Product/view";
import Productform from "./commponents/Product/form";
import OrderList from "./commponents/Order/list";
import Orderform from "./commponents/Order/form";
import OrderView from "./commponents/Order/view";
import Vendor from "./commponents/Vendor/list";
import VendorView from "./commponents/Vendor/view";
import Vendorform from "./commponents/Vendor/form";
import ClientList from "./commponents/Client/list";
import Reports from "./commponents/Report/list";
import Userlist from "./commponents/User/list";
import UserView from "./commponents/User/view";
import Userform from "./commponents/User/form";
import ClientForm from "./commponents/Client/form";
import Adminclientview from "./commponents/Client/view";
import ClientView from "./commponents/Client/view";
import IndexLayout from "./views/index";
import Product from "./commponents/Product/list";
import Page404 from "./commponents/Page404";
import Dashboard from "./layouts/dashboard";

// import Productformpage from "./views/Admin/common-form-routing/productformpage";
// import CategoryViewPage from "./views/vendor/viewpage/categoryviewpage";
function TitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean); // removes empty strings
    const path = segments[0] ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1) : "";

    document.title = `Hermon${path ? " | " + path : ""}`;
  }, [location]);

  return null; // No UI
}
function Apps() {
  return (
    <div className="App">
      <BrowserRouter>
        <TitleUpdater />
        <Routes>
          {/*login */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* product */}
          <Route path="/productlist" element={<Product />} />
          <Route path="/productview/:id" element={<Adminproductview />} />
          <Route path="/product/:id" element={<Productform />} />
          {/* order */}
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/order/:id" element={<Orderform />} />
          <Route path="/orderview/:id" element={<OrderView />} />
          {/* vendor */}
          <Route path="/vendorlist" element={<Vendor />} />
          <Route path="/vendorview/:id" element={<VendorView />} />
          <Route path="/vendor/:id" element={<Vendorform />} />
          {/* client */}
          <Route path="/clientlist" element={<ClientList />} />
          <Route path="/client/:id" element={<ClientForm />} />
          <Route path="/clientview/:id" element={<ClientView />} />
          {/* User */}
          <Route path="/userlist" element={<Userlist />} />
          <Route path="/userview/:id" element={<UserView />} />
          <Route path="/user/Create" element={<Userform />} />
          <Route path="/user/:id" element={<Userform />} />








          {/* report */}
          <Route path="/monthlyreport" element={<Reports />} />
          {/* pagenotfound */}
          <Route path="*" element={<Page404 />} />

          {/* //admin */}
          {/* <Route path="/" element={<Login />} />
          <Route path="/admindashboard" element={<Superadmindashboard />} />
          <Route path="/productlist" element={<Product />} />
          <Route path="/orderlist" element={<Order />} />
          <Route path="/productview/:id" element={<Adminproductview />} />
          <Route path="/orderview/:id" element={<Adminorderview />} />
          <Route path="/vendorview/:id" element={<Adminvendorview />} />
          <Route path="/vendorlist" element={<Vendor />} />
          <Route path="/vendor/:id" element={<Vendorformpage />} />
          <Route path="/product/:id" element={<Productformpage />} />
          <Route path="/clientlist" element={<Client />} />
          <Route path="/Adminclient/Edit/:id" element={<Clientformpage />} />
          <Route path="/adminshoplist" element={<Shoptypelist />} />
          <Route path="/adminshop/Edit/:id" element={<Shoptypeformpage />} />
          <Route path="/Adminshopview/:id" element={<AdminShopView />} />
          <Route path="/Adminshop/Create" element={<Shoptypeformpage />} />
          <Route path="/userlist" element={<Userlist />} />
          <Route path="/userview/:id" element={<AdminUserview />} />
          <Route path="/user/Create" element={<Userformpage />} />
          <Route path="/user/:id" element={<Userformpage />} />
          <Route path="/adminsetting" element={<Settingformpage />} />
          <Route path="/monthlyreport" element={<Reports />} /> */}


          {/* //vendor */}
          {/* <Route path="/vendorlogin" element={<VendorLogin />} />
          <Route path="/vendordashboard" element={<VendorDashboard />} />
          <Route path="/vendorOrderlist" element={<Orderlist />} />
          <Route
            path="/Vendor/orderlistview/:id"
            element={<VendorOrderViewPage />}
          />
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="*" element={<PAGE404 />} />
          <Route path="/Vendor/create" element={<VendorForms />} />
          <Route path="/vendor/Edit/:id" element={<VendorForms />} />
          <Route path="/vendorview/:id" element={<VendorViewPage />} />
          <Route path="/vendorreport" element={<MonthlyReports />} />
          <Route path="/vendorCategorylist" element={<CategoriesLists />} />
          <Route path="/category/Create" element={<CategoryForms />} />
          <Route path="/category/Edit/:id" element={<CategoryForms />} />
          <Route path="/categoryview/:id" element={<CategoryViewPage />} /> */}

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
