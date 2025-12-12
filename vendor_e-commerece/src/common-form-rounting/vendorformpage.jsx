import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../common/navbar/navbar';
import Sidenav from '../common/sidenav/sidenav';
import Vendorform from '../forms/vendorlist/vendorform';
import VendorForm from '../forms/vendorlist/vendorform';
import { Vendorlogin } from '../service/apiserver';
import VendorList from '../page/vendorlist';
import { Link } from 'react-router-dom';


function VendorFormPage() {
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
                  <i className="nav-icon fas fa-users menu-icon"></i>
                </span> 
           Vendor {currentVendorId}
              </h3>

              <div style={{textAlign:"right"}}>
            <Link
                to={"/Vendorlist"}
                style={{
                  float: "right",
                  marginBottom: "1px",
                  backgroundColor:"linear-gradient(to right, #da8cff, #9a55ff)",
                }}
                type="button"
                class="btn btn-primary"
              >
                Back
              </Link>
            </div>
            </div>

         <VendorForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorFormPage;
