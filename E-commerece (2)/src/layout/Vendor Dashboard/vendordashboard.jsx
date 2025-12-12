import React from "react";

import { Link, useLocation } from "react-router-dom";
import Navbar from "../../shared/vendor/Navbar/navbar";
import Sidenav from "../../shared/vendor/Sidenav/sidenav";
import Footer from "../../shared/footer";
// import Sidenav from "../../views/vendor/sidenav/sidenav";

function vendordashboard() {

  const userName = localStorage.getItem("userName");

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Sidenav */}
      <div
        // style={{ paddingTop: "80px" }}
        className="container-fluid page-body-wrapper"
      >
     <Sidenav/>

        {/* Dashboard */}

        {/* <!-- partial --> */}
      
          <div className="main-panel" style={{ paddingTop: "80px" }}>
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fa-solid fa-layer-group menu-icon"></i>
                  </span>{" "}
                  Dashboard
                </h3>
                {/* <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
          </li>
        </ul>
      </nav> */}
              </div>
              {/* // Dashboard-div-row */}
              <div className="row">
              <div className="col-md-4 col-xl-3 col-lg-4">
                <div class="dashboard-card blue">
                  <div class="splash"></div>
                  <div class="card-content ">
                    <h4> Order list</h4>
                    <div class="data">
                      <span class="value">2475</span>
                    </div>
                  </div>
                  <div className="nav-item nav-profile dropdown">
                    <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                      <div className="nav-profile-text">
                        <i className="fa-solid fa-ellipsis-vertical me-2 text-dark"></i>
                      </div>
                    </a>
                    <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                      <a className="dropdown-item" href="/vendorOrderlist"

                      >
                        View More</a>
                    </div>
                  </div>
                </div></div>
              <div className="col-md-4 col-xl-3 col-lg-4">
                <div class="dashboard-card green">
                  <div class="splash"></div>
                  <div class="card-content">
                    <h4> Vendor list</h4>
                    <div class="data">
                      <span class="value">2475</span>
                    </div>
                  </div>
                  <div className="nav-item nav-profile dropdown">
                    <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                      <div className="nav-profile-text">
                        <i className="fa-solid fa-ellipsis-vertical me-2 text-dark"></i>
                      </div>
                    </a>
                    <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                      <a className="dropdown-item" href="/Vendorlist"
                      >
                        View More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-3 col-lg-4">
                <div class="dashboard-card pink">
                  <div class="splash"></div>
                  <div class="card-content">
                    <h4>Category list</h4>
                    <div class="data">
                      <span class="value">2475</span>
                    </div>
                  </div>
                  <div className="nav-item nav-profile dropdown">
                    <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                      <div className="nav-profile-text">
                        <i className="fa-solid fa-ellipsis-vertical me-2 text-dark"></i>
                      </div>
                    </a>
                    <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                      <a className="dropdown-item" href="/vendorCategorylist"
                      >
                        View More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-3 col-lg-4">
                <div class="dashboard-card yellow">
                  <div class="splash"></div>
                  <div class="card-content">
                    <h4>Report list</h4>
                    <div class="data">
                      <span class="value">2475</span>
                    </div>
                  </div>
                  <div className="nav-item nav-profile dropdown">
                    <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                      <div className="nav-profile-text">
                        <i className="fa-solid fa-ellipsis-vertical me-2 text-dark"></i>
                      </div>
                    </a>
                    <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                      <a className="dropdown-item" href="/vendorreport"
                      >
                        View More</a>
                    </div>
                  </div>
                </div>
              </div>
              </div>



            </div>

          <Footer />


          </div>
    
     

        {/* <!-- partial --> */}
        {/* </div> */}
        {/* <!-- main-panel ends --> */}
      </div>


    </div>
  );
}

export default vendordashboard;
