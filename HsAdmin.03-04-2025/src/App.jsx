import logo from "./logo.svg";
import "./App.css";
import Login from "./views/SignIn/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard/dashboard";
import CaseStudy from "./views/CaseStudy";
import CaseStudy_Form from "./views/CaseStudy/form";
import Portfolio from "./views/Porfolio/list";
import Portfolio_Form from "./views/Porfolio/form";
import { ToastContainer } from 'react-toastify';
import ForgetPassword from "./views/ForgetPassword/forget";
import MyProfile from "./views/MyProfile/profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/account/my-profile" element={<MyProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/casestudy" element={<CaseStudy />} />
          <Route path="/casestudy-form" element={<CaseStudy_Form />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio-form" element={<Portfolio_Form />} />
        </Routes>
      </BrowserRouter>
      
      <ToastContainer 
       position="bottom-right"
       autoClose={1500}
       hideProgressBar={false}
       closeOnClick={true}
       pauseOnHover={true}
       draggable={true}
       theme="colored"
       toastStyle={{
        background: "rgb(14, 169, 153)",
        color: "white",
        fontFamily: "Roboto Slab, Arial, Helvetica, sans-serif",
        borderRadius: "10px",
        padding: "12px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        // rgba(0,173,238,255)
      }}
     />
    </div>
  );
}

export default App;
