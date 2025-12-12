import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import Sidenav from '../sidenav/sidenav';
import { Link } from 'react-router-dom';
import CategoryForm from './categoryform';


function CategoryForms() {
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
            {currentVendorId}  New Category
              </h3>

              <div style={{textAlign:"right"}}>
            <Link
                to={"/categorylist"}
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

         <CategoryForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryForms;
