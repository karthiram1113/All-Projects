import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidenav() {

  const userName = localStorage.getItem("userName")
  const location = useLocation();
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(() =>
    location.pathname.includes('/adminshoplist') ||
    location.pathname.includes('/adminuserlist') ||
    location.pathname.includes('/Adminshop') ||
    location.pathname.includes('/adminshop') ||
    location.pathname.includes('/adminuserget') ||
    location.pathname.includes('/adminuserview') ||
    location.pathname.includes('/Adminuser/Create') ||

    location.pathname.includes('/adminsetting')
  );
  const [isReportsOpen, setIsReportsOpen] = useState(() =>
    location.pathname.includes('/adminreport')
  );
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
    <div className='side-box'>


{/* <!-- partial:partials/_sidebar.html --> */}
      <nav 
      style={{ paddingTop: "80px" }}
       className="sidebar sidebar-icon-only" id="sidebar">
    
  <ul className="nav">
    {/* <li className="nav-item nav-profile">
      <a href="#" className="nav-link d-flex align-items-center gap-2">
        <div className="nav-profile-image">
        <img src="/assets/images/praveen.jpg" alt="image"/>
          <span className="login-status online"></span>
      
        </div>
        <div className="nav-profile-text d-flex flex-column">
          <span className="font-weight-bold mb-2">{userName}</span>
          <span className="text-secondary text-small">Web Developer</span>
        </div>
        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
      </a>
    </li> */}

          <li className={`nav-item  ${location.pathname.includes('/admindashboard') ? 'active' : 'collapsed'}`}>
            <Link to="/admindashboard" className="nav-link d-flex align-items-center gap-2" onClick={closeSidebarOnMobile} >
              <i className="nav-icon fa-solid fa-layer-group menu-icon"></i>
        <span className="menu-title">Dashboard</span>
     
      </Link>
    </li>
    
          <li className={`nav-item ${location.pathname.includes('/adminproductlist') || location.pathname.includes('/Adminproductview') ? 'active' : 'collapsed'}`}>
            <Link to="/adminproductlist" className="nav-link d-flex align-items-center gap-2" onClick={closeSidebarOnMobile} >
              <i className="nav-icon fas fa-store menu-icon"></i>
        <span className="menu-title" >Product List</span>
    
      </Link>
    </li>
          <li className={`nav-item ${location.pathname.includes('/adminorderlist') || location.pathname.includes('/Adminorderview') ? 'active' : 'collapsed'}`}>
            <Link to="/adminorderlist" className="nav-link d-flex align-items-center gap-2" onClick={closeSidebarOnMobile}>
              <i className="nav-icon fa-solid fa-cart-shopping menu-icon"></i>
              <span className="menu-title" >Order List</span>
      
      </Link>
    </li>
          <li className={`nav-item ${location.pathname.includes('/adminvendorlist') || location.pathname.includes('/adminvendorview') || location.pathname.includes('/adminvendorget') ? 'active' : 'collapsed'}`}>
            <Link to="/adminvendorlist" className="nav-link d-flex align-items-center gap-2" onClick={closeSidebarOnMobile}>
              {/* <i className="nav-icon fa-solid fa-user-secret menu-icon"></i> */}
              <i class="nav-icon bi-person-workspace menu-icon"></i>
              {/* <svg xmlns="/assets/images/vendor-list.svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge nav-icon menu-icon" viewBox="0 0 16 16"></svg>  */}
              <span className="menu-title" >Vendor List</span>
      
      </Link>
    </li>
          <li className={`nav-item ${location.pathname.includes('/adminclientlist') || location.pathname.includes('/Adminclient') ? 'active' : 'collapsed'}`}>
            <Link to="/adminclientlist" className="nav-link d-flex align-items-center gap-2" onClick={closeSidebarOnMobile}>
      <i className="nav-icon fas fa-user-friends menu-icon"></i>
              <span className="menu-title" >Client List</span>
        
      </Link>
    </li>

          <li className={`nav-item ${location.pathname.includes('/adminshoplist') || location.pathname.includes('/adminuserlist') || location.pathname.includes('/adminsetting') || location.pathname.includes('/Adminshop') || location.pathname.includes('/adminshop') || location.pathname.includes('/Adminuser/Create') || location.pathname.includes('/adminuserget') || location.pathname.includes('/adminuserview') ? 'active' : 'collapsed'}`}>
            <div
              className={`nav-link d-flex justify-content-between align-items-center ${isMaintenanceOpen ? '' : 'collapsed'} ${isChildActive ? 'active' : ''}`}
              role="button"
              onClick={toggleMaintenance}
            >
              <div className='d-flex align-items-center gap-2'>
                <i className="nav-icon fa-solid fa-wrench menu-icon"></i>
                <span className="menu-title">Maintenance</span>
              </div>
              <i className={`menu-arrow ${isMaintenanceOpen ? 'rotate-60' : ''}`}></i>
            </div>
          </li>

            <div className={`collapse ${isMaintenanceOpen ? 'show' : ''}`} id="maintenanceModule">
              <ul className="nav flex-column mb-0">
              <li className={`nav-item ${location.pathname.includes('/adminshoplist') || location.pathname.includes('/Adminshop') || location.pathname.includes('/adminshop') ? 'sub-active' : 'collapsed'}`}>

                  <Link to="/adminshoplist" onClick={closeSidebarOnMobile} className="nav-link d-flex align-items-center gap-2">
                  <i className="nav-icon fa-solid fa-shop menu-icon"></i>
                  <span className="menu-title" >Shop Type List</span>
                  </Link>
                </li>
              <li className={`nav-item ${location.pathname.includes('/adminuserlist') || location.pathname.includes('/Adminuser/Create') || location.pathname.includes('/adminuserget') || location.pathname.includes('/adminuserview') ? 'sub-active' : 'collapsed'}`}>
                  <Link to="/adminuserlist" onClick={closeSidebarOnMobile} className="nav-link d-flex align-items-center gap-2">
                  <i className="nav-icon fa-solid fa-user menu-icon"></i>
                  <span className="menu-title">User List</span>  
                  </Link>
                </li>
                <li className={`nav-item ${location.pathname.includes('/adminsetting') ? 'sub-active' : 'collapsed'}`}>
                  <Link to="/adminsetting" onClick={closeSidebarOnMobile} className="nav-link d-flex align-items-center gap-2">
                  <i className="nav-icon fa-solid fa-gear menu-icon"></i>
                  <span className="menu-title">Setting</span>
                  </Link>
                </li>
              </ul>
            </div>
          <li className={`nav-item ${location.pathname.includes('/adminreport') ? 'active' : 'collapsed'}`}>
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
       
              <li className={`nav-item ${location.pathname.includes('/adminreport') ? 'sub-active' : 'collapsed'}`}>

                  <Link to={"/adminreport"} onClick={closeSidebarOnMobile} className="nav-link d-flex align-items-center gap-2" >
                  <i className="nav-icon fa fa-calendar menu-icon"></i>
                  <span className="menu-title" >Monthly Report</span>
                  </Link>
        </li>
      </ul>
    </div>
  </ul>
        <div className="mobile-sidebar-overlay"></div>

</nav>


     
    </div>
  )
}

export default Sidenav
