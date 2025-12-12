import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar/navbar";

function sidenav() {
  const userName = localStorage.getItem("userName");
  const location = useLocation();
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(() =>
    location.pathname.includes('/vendorCategorylist')
    || location.pathname.includes('/categoryview')
    || location.pathname.includes('/category')
);
  const [isReportsOpen, setIsReportsOpen] = useState(() => 
    location.pathname.includes('/vendorreport'));
  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 991) {
      document.body.classList.remove('mobile-sidebar-open');
    }
  };
  const toggleReports = () => {
    setIsReportsOpen(prev => !prev);
  };
  const toggleMaintenance = () => {
    setIsMaintenanceOpen(prev => !prev);
  };
  let isACtive =
    location.pathname.includes('/adminreport');

  const isChildActive =
    location.pathname.includes('/adminshoplist') ||
    location.pathname.includes('/adminuserlist') ||
    location.pathname.includes('/adminsetting');


  return (
    <div>
      {/* <Navbar /> */}

      {/* product */}

      <div className="container-fluid page-body-wrapper">
        <nav
          style={{ paddingTop: "80px" }}
          className="sidebar sidebar-icon-only"
          id="sidebar"
        >
          <ul className="nav">
            {/* <li className="nav-item nav-profile">
              <a href="#" className="nav-link">
                <div className="nav-profile-image">
                  <img src="/assets/images/praveen.jpg" alt="image" />
                  <span className="login-status online"></span>
 
                </div>
                <div className="nav-profile-text d-flex flex-column">
                  <span className="font-weight-bold mb-2">{userName}</span>
                  <span className="text-secondary text-small">
                    Web Developer
                  </span>
                </div>
                <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </a>
            </li> */}
            <li className={`nav-item  ${location.pathname.includes('/vendordashboard') ? 'active' : 'collapsed'}`}>

              <Link
                to="/vendordashboard"
                className="nav-link d-flex align-items-center gap-2"
                onClick={closeSidebarOnMobile}

              > <i className="nav-icon fa-solid fa-layer-group menu-icon"></i>
                <span className="menu-title" >Dashboard</span>

              </Link>
            </li>
            {/* <li className="nav-item">
                            <Link to="/orderlist" className="nav-link" >
                            <span className="menu-title">Order List</span>
                            <i className="nav-icon fas fa-boxes menu-icon"></i>
                            </Link>
                        </li> */}
            <li className={`nav-item ${location.pathname.includes('/vendorOrderlist') || location.pathname.includes('/Vendor/orderview') || location.pathname.includes('/adminsetting') ? 'active' : ''}`}>
              <Link
                to="/vendorOrderlist"
                className="nav-link d-flex align-items-center gap-2"
                onClick={closeSidebarOnMobile}
              ><i className="nav-icon fa-solid fa-cart-shopping menu-icon"></i>
                <span className="menu-title" >Order List</span>

              </Link>
            </li>
            {/* <li className="nav-item">
                            <Link to="/Vendorlist" className="nav-link justify-content-between" >
                            <span className="menu-title">Vendor List</span>
                            <i className="nav-icon fas fa-users menu-icon"></i>
                            </Link>
                        </li> */}
            <li className={`nav-item  ${location.pathname.includes('/Vendorlist') || location.pathname.includes('/Vendor/create') || location.pathname.includes('/vendor/Edit') || location.pathname.includes('/vendorview')  ? 'active' : 'collapsed'}`}>
              <Link
                to="/Vendorlist"
                className="nav-link d-flex align-items-center gap-2"
                onClick={closeSidebarOnMobile}
              ><i class="nav-icon bi-person-workspace menu-icon"></i>
                <span className="menu-title" >Vendor List</span>

              </Link>
            </li>

            {/* //toogle */}

            <li className={`nav-item ${location.pathname.includes('/vendorCategorylist') || location.pathname.includes('/categoryview') || location.pathname.includes('/category') ? 'active' : 'collapsed'}`}>
              <div
                className={`nav-link d-flex justify-content-between align-items-center ${isMaintenanceOpen ? '' : 'collapsed'} ${isChildActive ? 'active' : ''}`}
                role="button"
                onClick={toggleMaintenance}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="nav-icon fa-solid fa-wrench menu-icon"></i>
                  <span className="menu-title">Maintenance</span>
                </div>
                <i className={`menu-arrow ${isMaintenanceOpen ? 'rotate-60' : ''}`}></i>
              </div>
            </li>

              <div className={`collapse ${isMaintenanceOpen ? 'show' : ''}`} id="maintenanceModule">
                <ul className="nav flex-column mb-0">
                <li className={`nav-item ${location.pathname.includes('/vendorCategorylist') || location.pathname.includes('/categoryview') || location.pathname.includes('/category') ? 'sub-active' : 'collapsed'}`}>
                  <Link to="/vendorCategorylist" onClick={closeSidebarOnMobile} className="nav-link d-flex align-items-center gap-2">
                    <i className="nav-icon fa-solid fa-icons menu-icon"></i>
                    <span className="menu-title">Category List</span>
                    </Link>
                  </li>

                </ul>
              </div>
            <li className={`nav-item ${location.pathname.includes('/vendorreport') ? 'active' : 'collapsed'}`}>
              <div
                className={`nav-link d-flex justify-content-between align-items-center ${isReportsOpen ? '' : 'collapsed'} ${isACtive ? 'active' : ''}`}
                role="button"
                onClick={toggleReports}
              >
                <div className="d-flex align-items-center gap-2">
                  <i class="nav-icon fa fa-file menu-icon"></i>
                  <span className="menu-title" >Reports</span>
                </div>
                <i className={`menu-arrow ${isReportsOpen ? 'rotate-60' : ''}`}></i>
              </div>
            </li>


              <div className={`collapse ${isReportsOpen ? 'show' : ''}`} id="maintenanceModule">
                <ul class="nav flex-column mb-0">

                  <li className={`nav-item ${location.pathname.includes('/vendorreport') ? 'sub-active' : 'collapsed'}`} >
                  <Link to={"/vendorreport"} onClick={closeSidebarOnMobile} className="nav-link d-flex align-items-center gap-2" >
                    <i className="nav-icon fa fa-calendar menu-icon"></i>
                    <span className="menu-title"> Monthly Report</span>

                   </Link>
                  </li>
                </ul>
              </div>
          </ul>
          <div className="mobile-sidebar-overlay"></div>

        </nav>
      </div>
      
    </div>
  );
}

export default sidenav;
