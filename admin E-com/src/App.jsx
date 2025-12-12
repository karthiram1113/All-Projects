import React from 'react';
import logo from './logo.svg';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Superadmindashboard from './Layout/Dashboard/admin-dashboard';
import Navbar from './Common/Navbar/navbar';
import Login from './admin-login/login';
// import Product from './pages/admin-product/product';
import Sidenav from './Common/Sidenav/sidenav'
import Product from './pages/admin-product/product';
import Vendor from './pages/admin-product/vendor';
import Client from './pages/admin-product/client';
import Order from './pages/admin-product/order';
import Vendorform from './forms/vendorList/vendorform';
import Vendorformpage from './common-form-routing/vendorformpage';
import Clientformpage from './common-form-routing/clientformpage';
import Clientforms from './forms/clientList/clientforms';
import Shoptype from './shoptype-list/shoptype';
import Shoptypelist from './shoptype-list/shoptype';
import Shoptypeform from './forms/shoptype-list/shoptypeform';
import Shoptypeformpage from './common-form-routing/shoptypeformpage';
import Userlist from './user-list/userlist';
import Userformpage from './common-form-routing/userformpage';
import Setting from './settings/setting';
import Settingformpage from './common-form-routing/settingformpage';
import Adminproductview from './view-pages/admin-product-view-page';
import Adminorderview from './view-pages/admin-order-view-page';
import Adminvendorview from './view-pages/admin-vendor-view-page';
import Adminclientview from './view-pages/admin-client-view-page';
import Reports from './pages/reports';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Routes>
      
          <Route path='/' element={<Login/>}/>  
          <Route path='/Navbar' element={<Navbar/>}/>        
          <Route path='/Sidenav' element={<Sidenav/>}/> 
          <Route path='/admin-dashboard' element={<Superadmindashboard/>}/>  
          <Route path='/Product-list' element={<Product/>}/>        
          <Route path='/Vendor-list' element={<Vendor/>}/>        
          <Route path='/Client-list' element={<Client/>}/>        
          <Route path='/Order-list' element={<Order/>}/>
          <Route path='/Vendorform' element={<Vendorform/>}/>
          <Route path='/Clientform' element={<Clientforms/>}/>
          <Route path='/Monthly-reports' element={<Reports/>}/>


          <Route path='/Vendorformpage' element={<Vendorformpage/>}/>
          <Route path='/Vendorformpage/Edit/:id' element={<Vendorformpage/>}/>
          <Route path='/Clientformpage' element={<Clientformpage/>}/>
          <Route path='/Clientformpage/Edit/:id' element={<Clientformpage/>}/>
          <Route path='/Shoptypeform' element={<Shoptypeformpage/>}/>
          <Route path='/Shoptypeformpage/Edit/:id' element={<Shoptypeformpage/>}/>
          <Route path='/Shoptypeformpage/Create' element={<Shoptypeformpage/>}/>
          <Route path='/Userformpage/Create' element={<Userformpage/>}/>
          <Route path='/Userformpage/Edit/:id' element={<Userformpage/>}/>



          <Route path='/Shoptype-list' element={<Shoptypelist/>}/>
          <Route path='/Userlist' element={<Userlist/>}/>

          <Route path='/Setting' element={<Setting/>}/>
          <Route path='/Settingformpage' element={<Settingformpage/>}/>

          {/* View Page */}
          
          <Route path='/admin-product-view/:id' element={<Adminproductview/>}/>
          <Route path='/admin-order-view/:id' element={<Adminorderview/>}/>
          <Route path='/admin-vendor-view/:id' element={<Adminvendorview/>}/>
          <Route path='/admin-client-view/:id' element={<Adminclientview/>}/>



        </Routes>
      {/* </BrowserRouter> */}

        <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        // progress={undefined}
        theme="colored"
      />

    </div>
  );
}

export default App;
