import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";

function sidenav(props) {
  return (
    <div>
      {/* <Navbar /> */}

      {/* product */}

      <div className="container-fluid page-body-wrapper">
        <nav
          style={{ paddingTop: "80px" }}
          className="sidebar sidebar-offcanvas"
          id="sidebar"
        >
          <ul className="nav">
            <li className="nav-item nav-profile">
              <a href="#" className="nav-link">
                <div className="nav-profile-image">
                  <img src="/assets/images/praveen.jpg" alt="image" />
                  <span className="login-status online"></span>
                  {/* <!--change to offline or busy as needed--> */}
                </div>
                <div className="nav-profile-text d-flex flex-column">
                  <span className="font-weight-bold mb-2">Bose Praveen</span>
                  <span className="text-secondary text-small">
                    Web Developer
                  </span>
                </div>
                <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </a>
            </li>
            <li className="nav-item">
              <Link
                to="/vendordashboard"
                className="nav-link justify-content-between"
              >
                <span className="menu-title">Dashboard</span>
                <i className="nav-icon fas fa-tachometer-alt menu-icon"></i>
              </Link>
            </li>
            {/* <li className="nav-item">
                            <Link to="/orderlist" className="nav-link" >
                            <span className="menu-title">Order List</span>
                            <i className="nav-icon fas fa-boxes menu-icon"></i>
                            </Link>
                        </li> */}
            <li className="nav-item">
              <Link
                to="/vendor/orderlist"
                className="nav-link d-flex justify-content-between"
              >
                <span className="menu-title">Order List</span>
                <i className="nav-icon fas fa-boxes menu-icon"></i>
              </Link>
            </li>
            {/* <li className="nav-item">
                            <Link to="/Vendorlist" className="nav-link justify-content-between" >
                            <span className="menu-title">Vendor List</span>
                            <i className="nav-icon fas fa-users menu-icon"></i>
                            </Link>
                        </li> */}
            <li className="nav-item">
              <Link
                to="/Vendorlist"
                className="nav-link d-flex justify-content-between"
              >
                <span className="menu-title">Vendor List</span>
                <i className="nav-icon fas fa-users menu-icon"></i>
              </Link>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#maintenanceModule"
                aria-expanded="false"
                aria-controls="maintenanceModule"
              >
                <span class="menu-title">Maintenance</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-crosshairs-gps menu-icon"></i>
              </a>
              <div class="collapse" id="maintenanceModule">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <Link to={"/categorylist"} class="nav-link">
                      Category List
                    </Link>
                  </li>

                  {/* <li class="nav-item">
                                        <a class="nav-link" href="#">User List</a>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Setting</a>
                                    </li> */}
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#reportsModule"
                aria-expanded="false"
                aria-controls="reportsModule"
              >
                <span class="menu-title">Reports</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-contacts menu-icon"></i>
              </a>
              <div class="collapse" id="reportsModule">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <Link to={"/vendor/monthlyreport"} class="nav-link">
                      Monthly Order Report
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default sidenav;
