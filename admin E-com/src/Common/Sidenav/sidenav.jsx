import React from 'react'
import { Link } from 'react-router-dom'

function Sidenav() {

  const userName = localStorage.getItem("userName")
  return (
    <div>


{/* <!-- partial:partials/_sidebar.html --> */}
<nav  style={{paddingTop:"80px"}} className="sidebar sidebar-offcanvas" id="sidebar">
    
  <ul className="nav">
    <li className="nav-item nav-profile">
      <a href="#" className="nav-link">
        <div className="nav-profile-image">
        <img src="/assets/images/praveen.jpg" alt="image"/>
          <span className="login-status online"></span>
          {/* <!--change to offline or busy as needed--> */}
        </div>
        <div className="nav-profile-text d-flex flex-column">
          <span className="font-weight-bold mb-2">{userName}</span>
          <span className="text-secondary text-small">Web Developer</span>
        </div>
        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
      </a>
    </li>
    <li className="nav-item">
      <Link to="/admin-dashboard" className="nav-link" >
      <i className="nav-icon fas fa-tachometer-alt menu-icon"></i>
        <span className="menu-title">Dashboard</span>
     
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/Product-list" className="nav-link" >
      <i className="nav-icon fas fa-boxes menu-icon"></i>
        <span className="menu-title">Product List</span>
    
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/Order-list" className="nav-link" >
      <i className="nav-icon fas fa-list menu-icon"></i>
        <span className="menu-title">Order List</span>
      
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/Vendor-list" className="nav-link" >
      <i className="nav-icon fas fa-users menu-icon"></i>
        <span className="menu-title">Vendor List</span>
      
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/Client-list" className="nav-link" >
      <i className="nav-icon fas fa-user-friends menu-icon"></i>
        <span className="menu-title">Client List</span>
        
      </Link>
    </li>




    {/* <li className="nav-item">
      <Link to={''} className="nav-link" data-bs-toggle="collapse"  aria-expanded="false" aria-controls="ui-basic">
        <span className="menu-title">Maintainance</span>
        <i className="menu-arrow"></i>
      </Link>
      <div className="collapse" id="ui-basic">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            <a className="nav-link" href="pages/ui-features/buttons.html">Monthly Order Report</a>
          </li>
          
        </ul>
      </div>
    </li> */}

<li class="nav-item">
    <a class="nav-link" data-bs-toggle="collapse" href="#maintenanceModule" aria-expanded="false" aria-controls="maintenanceModule">
    <i class="mdi mdi-crosshairs-gps menu-icon"></i>
      <span class="menu-title">Maintenance</span>
      {/* <i class="menu-arrow"></i> */}

    </a>
    <div class="collapse" id="maintenanceModule">
      <ul class="nav flex-column sub-menu">
      
        <li class="nav-item">
          <Link to={"/Shoptype-list"} class="nav-link" >Shop Type List</Link>
        </li>
      
        <li class="nav-item">
          <Link to={"/Userlist"} class="nav-link" href="#">User List</Link>
        </li>
      
        <li class="nav-item">
          <Link to={"/Settingformpage"} class="nav-link" href="#">Setting</Link>
        </li>
      </ul>
    </div>
  </li>
    
            <li class="nav-item">
    <a class="nav-link" data-bs-toggle="collapse" href="#reportsModule" aria-expanded="false" aria-controls="reportsModule">
    <i class="mdi mdi-contacts menu-icon"></i>
      <span class="menu-title">Reports</span>
      {/* <i class="menu-arrow"></i> */}
  
    </a>
    <div class="collapse" id="reportsModule">
      <ul class="nav flex-column sub-menu">
       
        <li class="nav-item">
           <Link to={"/Monthly-reports"} class="nav-link" href="#">Monthly Order Report</Link>
        </li>
      </ul>
    </div>
  </li>
  

    {/* <li className="nav-item">
              <Link to={''} className="nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="charts">
                <span className="menu-title">Maintainance</span>
                <i className="menu-arrow"></i>
              </Link>
              <div className="collapse" id="charts">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="pages/charts/chartjs.html">Shop Type List</a>
                    <i className='nav-icon fas fa-th-list'></i>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/charts/chartjs.html">User List</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/charts/chartjs.html">Setting</a>
                  </li>
                </ul>
              </div>
            </li> */}


   
  </ul>
</nav>


     
    </div>
  )
}

export default Sidenav
