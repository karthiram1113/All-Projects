// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './Login';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

import Login from './vendor-logins/login';

// import Vendorform from './forms/vendorlist/vendorform';
import VendorList from './page/vendorlist';
// import VendorForm from './forms/vendorlist/vendorform';
// import VendorEdit from './forms/vendorlist/vendorEdit';
import Vendorformpage from './common-form-rounting/vendorformpage';
// import Viewpage from './forms/vendorlist/Viewpage';
// import VendorEdit from './forms/vendorlist/vendorEdit';
import Vendorviewpage from './viewpage/vendorviewpage';
import VendorViewPage from './viewpage/vendorviewpage';
import Vendordashboard from './layout/dashboard/vendordashboard';
import Orderlist from './page/orderlist';
import Vendororderviewpage from './viewpage/vendororderviewpage';



function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Login/>}/> 

        <Route path="/vendorlist" element={<VendorList/>}/>
        <Route path='/vendordashboard'element={<Vendordashboard/>}/>
        {/* <Route path='/vendoredit'element={<VendorEdit/>}/> */}
        {/* <Route path='/vendorform'element={<VendorForm/>}/> */}
        <Route path="/vendorformpage/Create" element={<Vendorformpage/>}/>
        <Route path="/vendorformpage/Edit/:id" element={<Vendorformpage/>}/>
        {/* <Route path='/viewpage/view/:id' element={<Viewpage/>}/> */}
        <Route path='/vendorview/:id' element={<VendorViewPage/>}/>
         

         {/* order */}
        <Route path='/orderlist' element={<Orderlist/>}/>
        <Route path='/vendororderview/:id'element={<Vendororderviewpage/>}/>
        
        

        

        
        
     
      </Routes>
      </BrowserRouter>


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
