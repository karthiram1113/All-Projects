import React, { useEffect, useState } from 'react';
import Navbar from '../../../shared/vendor/Navbar/navbar';
import Sidenav from '../../../shared/vendor/Sidenav/sidenav';
import { Link } from 'react-router-dom';
import VendorForm from './vendorform';
import Footer from '../../../shared/footer';


function VendorForms() {
  // const { vendorId } = useParams(); // Get the vendor ID from the URL params
  // const location = useLocation(); // Get the current location object
  // const [vendorData, setVendorData] = useState(null); // Store fetched vendor data
  const [currentVendorId, setVendorId] = useState('');// dymaically change state

  

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setVendorId(myArray[2]);
    console.log(myArray,"s");
    

   
}, []);

  return (
    <div>
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidenav />
        <div style={{ paddingTop: "80px" }} className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon bi-person-workspace menu-icon"></i>
                </span> 
           Vendor {currentVendorId} Form
              </h3>

              
            </div>

         <VendorForm/>
          </div>
          <Footer />

        </div>
      </div>
    </div>
  );
}

export default VendorForms;
