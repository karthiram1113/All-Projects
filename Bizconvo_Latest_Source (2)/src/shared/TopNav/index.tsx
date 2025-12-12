import React, { useEffect } from 'react';
import Userimg from "../../assets/img/team-2.jpg"
import Userimg1 from "../../assets/img/small-logos/logo-spotify.svg";
import { Link, useNavigate } from 'react-router-dom';
import LoginAPI from '../../api/services/loginApi';
import { toast } from 'react-toastify';
function TopNav() {
   const navigate = useNavigate();
   const handleBacktoSadmin = (e: any) => {
      e.preventDefault();
      navigate("/super-admin/dashboard", { replace: true });
   };


   const handleLogout = async () => {
      try {
         const responseData = await LoginAPI.logoutAPI();
         if (responseData.apiStatus.code === '200') {
            toast.success(responseData.apiStatus.message);
            navigate("/")
            const keysToRemove = [
               "userVendorName",
               "vendorToken",
           ];
       
           keysToRemove.forEach(key => localStorage.removeItem(key));
         } else {
            toast.error(`Logout failed: ${responseData.apiStatus.message}`);
            navigate("/")
         }
      } catch (error) {
         console.error("Error during API call:", error);
         navigate("/")
         toast.error("An error occurred during the logout process.");
      }
   };
   const userVendorName = localStorage.getItem("userVendorName")
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   return (
      <>
         <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl my-2 ms-4" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1">
               <div className="ms-md-auto d-flex align-items-center">
                  <div className="input-group">
                     <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                     <input type="text" className="form-control" placeholder="Type here..." />
                  </div> 
               </div>
               <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                  <div className="ms-md-auto d-flex align-items-center">
                     {/*
                  <div class="input-group">
                     <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                     <input type="text" class="form-control" placeholder="Type here..."/>
                  </div>
                  */}
                  </div>
                  <ul className="navbar-nav  justify-content-end">
                     <li className="nav-item dropdown notification-bell pe-2 d-flex align-items-center">
                        <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                           <i className="navbar-notification-icon fa-regular fa-bell cursor-pointer"></i>
                        </a>
                        <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                           <li className="mb-2">
                              <a className="dropdown-item border-radius-md" href="javascript:;">
                                 <div className="d-flex py-1">
                                    <div className="my-auto">
                                       <img src={Userimg} className="avatar avatar-sm  me-3 " />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                       <h6 className="text-sm font-weight-normal mb-1">
                                          <span className="font-weight-bold">New message</span> from Laur
                                       </h6>
                                       <p className="text-xs text-secondary mb-0 ">
                                          <i className="fa fa-clock me-1"></i>
                                          13 minutes ago
                                       </p>
                                    </div>
                                 </div>
                              </a>
                           </li>
                           <li className="mb-2">
                              <a className="dropdown-item border-radius-md" href="javascript:;">
                                 <div className="d-flex py-1">
                                    <div className="my-auto">
                                       <img src={Userimg1} className="avatar avatar-sm bg-gradient-dark  me-3 " />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                       <h6 className="text-sm font-weight-normal mb-1">
                                          <span className="font-weight-bold">New album</span> by Travis Scott
                                       </h6>
                                       <p className="text-xs text-secondary mb-0 ">
                                          <i className="fa fa-clock me-1"></i>
                                          1 day
                                       </p>
                                    </div>
                                 </div>
                              </a>
                           </li>
                           <li>
                              <a className="dropdown-item border-radius-md" href="javascript:;">
                                 <div className="d-flex py-1">
                                    <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                       <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1">
                                          <title>credit-card</title>
                                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                             <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                                <g transform="translate(1716.000000, 291.000000)">
                                                   <g transform="translate(453.000000, 454.000000)">
                                                      <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                                      <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                                   </g>
                                                </g>
                                             </g>
                                          </g>
                                       </svg>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                       <h6 className="text-sm font-weight-normal mb-1">
                                          Payment successfully completed
                                       </h6>
                                       <p className="text-xs text-secondary mb-0 ">
                                          <i className="fa fa-clock me-1"></i>
                                          2 days
                                       </p>
                                    </div>
                                 </div>
                              </a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <div className="dropdown sadmin-content">
                           <button className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              <img
                                 src={Userimg}
                                 alt="Profile"
                                 className="profile-navbar-img"
                              /> <span className="MuiTypography-root MuiTypography-button css-1w3klud nav-user-name">
                                 {userVendorName}
                              </span>
                           </button>
                           <ul className="dropdown-menu vendor-dropdown" aria-labelledby="dropdownMenuButton1">

                              <li>
                                 <Link className="dropdown-item pl-3" to={"/vendor/profile"}>
                                    <i className="fa-solid fa-user-tie"></i> <span className='ms-1'>My Profile</span>
                                 </Link>
                              </li>
                              {/* <li>
                                 <Link className="dropdown-item" to={"#"}>
                                    <i className="fa fa-cog me-2"></i>Settings
                                 </Link>
                              </li> */}
                              <li >
                                 <Link className="dropdown-item" onClick={handleLogout} to={""}>
                                    <i className="fa fa-sign-out-alt me-2"></i>Logout
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </>
   );
}
export default TopNav;