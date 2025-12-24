import React from "react";
// import Profile_img from "../../assets/images/J.Selvakumar - CEO.jpg";
import Profile_img from "../../assets/images/profile-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import LoginAPI from "../../api/services/AdminLogin/adminlogin";
import { toast } from "react-toastify";

function Navbar() {
 let UserName = localStorage.getItem("userName");

//  Log-out,

const navigate = useNavigate();

const AdminLogout = async () => {

  try{
   const responseData = await LoginAPI.signOutAPI();
   console.log("Api response", responseData);

   if (responseData.apiStatus.code === '200') {
    toast.success(responseData.apiStatus.message);
    navigate("/");
    localStorage.clear();
   }else{
    toast.error(`Logout failed: ${responseData.apiStatus.message}`);
   }
  }catch (error) {
    console.error("Error during API call:", error);
    toast.error("An error occurred during the logout process.");
  }
}


  return (
    <>
      <nav
        class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a class="nav-item nav-link px-0 me-xl-4">
            <i class="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div
          class="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          {/* <div class="navbar-nav align-items-center">
            <div class="nav-item d-flex align-items-center">
              <i class="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                class="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div> */}

          <ul class="navbar-nav flex-row align-items-center ms-auto">
            <li className="cursor-pointer" data-bs-toggle="dropdown">
              <h6 className="mt-3 dropdown-toggle">{UserName}</h6>
            </li>
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                class="nav-link dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
              >
                <div class="avatar avatar-online">
                  <img
                    src={Profile_img}
                    alt
                    class="w-100 h-100 rounded-circle"
                  />
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                          <img src={Profile_img} alt class="rounded-circle" />
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-semibold d-block">{UserName}</span>
                        <small class="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <Link to={'/account/my-profile'} class="dropdown-item">
                    <i class="bx bx-user me-2"></i>
                    <span class="align-middle">My Profile</span>
                  </Link>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="bx bx-cog me-2"></i>
                    <span class="align-middle">Settings</span>
                  </a>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li className="cursor-pointer" >
                  <a
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#logout"
                  >
                    <i class="bx bx-power-off me-2"></i>
                    <span class="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <div
        class="modal fade"
        id="logout"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                {/* Delete List */}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">
              <h4>Are You Sure</h4> <br />
              <h6 className="mt-n4">You want to Logout the Account?</h6>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              
                <button type="button" class="btn btn-primary" onClick={AdminLogout} data-bs-dismiss="modal">
                  Yes
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
