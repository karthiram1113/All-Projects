import { useEffect, useState } from 'react';
import Navbar from '../../navbar/navbar';
import Sidenav from '../../navbar/sidenav';
import Productform from '../../product-form/productform';
import WorldForm from './form';
import Footer from '../../navbar/footer';

function WorldFormPage() {
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
                <i class="fa-regular fa-folder-open menu-icon"></i>
                </span>
                {currentVendorId} News
              </h3>
            </div>

            <WorldForm />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default WorldFormPage;
