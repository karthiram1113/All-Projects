import { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import Sidenav from '../navbar/sidenav';
import Productform from '../product-form/productform';

function VendorFormPage() {
  const [currentVendorId, setVendorId] = useState('');
  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setVendorId(myArray[2]);
    console.log(myArray, "s");

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
                News {currentVendorId}
              </h3>
            </div>

            <Productform />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorFormPage;
