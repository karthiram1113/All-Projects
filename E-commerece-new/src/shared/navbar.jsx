import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OVERALLAPI from '../api/over-all-api';
import { environment } from '../api/api';




function Navbar() {
  // const [userName, setUserNameState] = useState("fggggggggggggg");
  const userName = localStorage.getItem("userName")
  const id = localStorage.getItem("id")
  const imgPath = localStorage.getItem("imgPath")
  const token = localStorage.getItem("token")

  

  const navigate = useNavigate(); 
  const role = localStorage.getItem("role");

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate("/");
    //     }
    // }, [navigate]);

  const handleLogout = async (e) =>{
  e.preventDefault();
  try{
    const responseData = await OVERALLAPI.sAdminsignOutAPI();
   if (responseData.apiStatus.code == "200") {
         localStorage.removeItem("token");
         localStorage.removeItem("userName");
         localStorage.removeItem("imgPath");
         localStorage.removeItem("role");
         localStorage.removeItem("id");
         navigate("/");
         toast.success(responseData.apiStatus.message);

       } else {
         console.error("Logout failed:", await responseData.text());
           toast.warning("Logout failed. Please try again.");
       }
     } catch (error) {
       console.error("Logout error:", error);
         toast.warning("Something went wrong. Please try again.");
     }
}




  return (
    <div>


           {/* <!-- partial:partials/_navbar.html --> */}
       <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <button className="navbar-toggler navbar-toggler mini-logo align-self-center" type="button" data-toggle="minimize">
            <span id="sidebarToggleIcon" className="mdi mdi-menu "></span>
          </button>

     
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <a className="navbar-brand brand-logo ps-4"><img src="/assets/images/hs.logo.png" alt="logo" /></a>
          <a className="navbar-brand brand-logo-mini" style={{paddingLeft:"12px"}}  href="#"><img src="/assets/images/hermon-logo.png" alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper  d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span id="sidebarToggleIcon" className="mdi mdi-menu "></span>
          </button>
          {/* <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects"/>
              </div>
            </form>
          </div> */}
          <ul className="navbar-nav navbar-nav-right">
        
            {/* <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="mdi mdi-email-outline"></i>
                <span className="count-symbol bg-warning"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                <h6 className="p-3 mb-0">Messages</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="assets/images/faces/face4.jpg" alt="image" className="profile-pic"/>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                    <p className="text-gray mb-0"> 1 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="assets/images/faces/face2.jpg" alt="image" className="profile-pic"/>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                    <p className="text-gray mb-0"> 15 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="assets/images/faces/face3.jpg" alt="image" className="profile-pic"/>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                    <p className="text-gray mb-0"> 18 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <h6 className="p-3 mb-0 text-center">4 new messages</h6>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                <i className="mdi mdi-bell-outline"></i>
                <span className="count-symbol bg-danger"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <h6 className="p-3 mb-0">Notifications</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="mdi mdi-calendar"></i>
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Event today</h6>
                    <p className="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="mdi mdi-cog"></i>
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Settings</h6>
                    <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="mdi mdi-link-variant"></i>
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                    <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <h6 className="p-3 mb-0 text-center">See all notifications</h6>
              </div>
            </li> */}

            <li className="nav-item d-none d-lg-block full-screen-link">
              <a className="nav-link" style={{ cursor: "pointer" , marginRight:"10px" }} >
                <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
              </a>
            </li>
            {/* <li className="nav-item nav-logout d-none d-lg-block">
              <a className="nav-link" href="#">
                <i className="mdi mdi-power"></i>
              </a>
            </li>
            <li className="nav-item nav-settings d-none d-lg-block">
              <a className="nav-link" href="#">
                <i className="mdi mdi-format-line-spacing"></i>
              </a>
            </li> */}
            <li className="nav-item nav-profile dropdown">
              
              <a className="nav-link dropdown-toggle me-0" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                
                
                <div className="nav-profile-img">
                  {/* <img src="/assets/images/noimages.jpg" alt="profile image" /> */}
                  <img src={imgPath ? `${environment.baseURL}${imgPath}` : "/assets/images/noimages.jpg"} />
                  {imgPath ? 
                    <span className="availability-status online"></span>
                  : null}
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">
                    {userName}
                    </p>
                </div>
              </a>
              <div className="dropdown-menu navbar-dropdown" style={userName ? { left: "0px" } : {}} aria-labelledby="profileDropdown">
                {/* <a className="dropdown-item" href="#">
                  <i className="mdi mdi-cached me-2 text-success"></i> Activity Log </a>
                <div className="dropdown-divider"></div> */}
                <a className="dropdown-item" href="#"
                  onClick={(e) => handleLogout(e)}
                  // onClick={() => navigate("/")}
                >
                  <i className="mdi mdi-logout me-2" style={{ color:"#00acf0"}}></i> Signout </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* <!-- partial --> */}
    </div>
  )
}

export default Navbar
