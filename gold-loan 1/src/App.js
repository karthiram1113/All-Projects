import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './views/Admin-Login';
import Navbars from './common/Navbar';
import CustomerDetails from './views/Customer-Details';
import Page404 from './views/Page-404';
import CustomerDetailsList from './views/Customer-Details-List';
import ForgotPassword from './views/Forgot-Password';
import Dashboard from './views/Dashboard';
import { ToastContainer } from 'react-toastify';
import PayPage from './views/Payment-Page';
import { useState } from 'react';
import CustomerView from './views/Customer-View';
import Collections from './views/Collections';
import ClosedLoans from './views/Reports/Closed-Loans';
import AdminRegister from './views/Admin-Register';
import ProtectedRoute from './common/ProtecteRoute';
import AddInvestor from './views/Add-Investor-Details';

function App() {

  const [customerList, setCustomerList] = useState([]);

  return (
    <div className="App">
    <BrowserRouter>
  <Routes>

    {/* PUBLIC ROUTES */}
    <Route path="/" element={<AdminLogin />} />
    <Route path="/sign-up" element={<AdminRegister />} />
    <Route path='/forgot-password' element={<ForgotPassword/>}/>

    {/* <Route path="/customer-details/create" element={<CustomerDetails />} /> 
    <Route path="/customer-details/edit/:id" element={<CustomerDetails />} /> */}

    {/* PROTECTED ROUTES */}
    <Route
      path="/navbar"
      element={
        <ProtectedRoute>
          <Navbars />
        </ProtectedRoute>
      }
    />

    <Route
      path="/customer-details/create"
      element={
        <ProtectedRoute>
          <CustomerDetails />
        </ProtectedRoute>
      }
    />

    <Route
      path="/customer-details/edit/:id"
      element={
        <ProtectedRoute>
          <CustomerDetails />
        </ProtectedRoute>
      }
    />

    <Route
      path="/customer-view/:id"
      element={
        <ProtectedRoute>
          <CustomerView />
        </ProtectedRoute>
      }
    />

    <Route
      path="/customer-details-list"
      element={
        <ProtectedRoute>
          <CustomerDetailsList
            customerList={customerList}
            setCustomerList={setCustomerList}
          />
        </ProtectedRoute>
      }
    />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard 
           customerList={customerList}
            setCustomerList={setCustomerList}
          />
        </ProtectedRoute>
      }
    />

    <Route
      path="/customer-pay/:customerId"
      element={
        <ProtectedRoute>
          <PayPage
            customerList={customerList}
            setCustomerList={setCustomerList}
          />
        </ProtectedRoute>
      }
    />

    <Route
      path="/customer-collections"
      element={
        <ProtectedRoute>
          <Collections />
        </ProtectedRoute>
      }
    />

    <Route
      path="/reports/closed-loans"
      element={
        <ProtectedRoute>
          <ClosedLoans />
        </ProtectedRoute>
      }
    />

    <Route
    path='/add-investor'
    element={
       <ProtectedRoute>
    <AddInvestor/>
       </ProtectedRoute>
  }
    />

    {/* 404 PAGE */}
    <Route path="*" element={<Page404 />} />

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
        theme="dark"
        style={{ width: "500px" }}
      // #00D26E
      />

    </div>
  );
}

export default App;
