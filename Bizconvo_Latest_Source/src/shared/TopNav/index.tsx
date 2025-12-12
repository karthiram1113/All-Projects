import React, { useEffect } from 'react';
import Userimg from "../../assets/img/team-2.jpg"
import Userimg1 from "../../assets/img/small-logos/logo-spotify.svg";
import { Link, useNavigate } from 'react-router-dom';
import LoginAPI from '../../api/services/loginApi';
import { toast } from 'react-toastify';
import { baseURL } from '../../api/api';
import noImage from '../../assets/img/no_Image.png';
function TopNav() {
   const navigate = useNavigate();
   const handleBacktoSadmin = (e: any) => {
      e.preventDefault();
      navigate("/super-admin/dashboard", { replace: true });
   };

   const profileImage=sessionStorage.getItem('profileImage');
   const isValidImage = profileImage && 
   profileImage.trim() !== "" &&
   profileImage.trim().toLowerCase() !== "null" && profileImage.trim().toLowerCase() !== "undefined";

   const imageSrc = isValidImage
   ? `${baseURL}${profileImage}`
   : noImage;

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
           keysToRemove.forEach(key => sessionStorage.removeItem(key));
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
   const userVendorName = sessionStorage.getItem("userVendorName")
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   return (
      <>
         <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl my-2 ms-4" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1">
               <div className="ms-md-auto d-flex align-items-center">
                  <div className="input-group custom-input-group">
                     {/* <span>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                           width="32px" height="32px" viewBox="0 0 512.000000 512.000000"
                           preserveAspectRatio="xMidYMid meet">

                           <defs>
                              <linearGradient id="gradient310" gradientTransform="rotate(360)">
                                 <stop offset="0%" stop-color="#004aad"/>
                                 <stop offset="100%" stop-color="#0dc0df"/>
                              </linearGradient>
                           </defs>

                           <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="url(#gradient310)" stroke="none">
                              <path d="M160 4800 l0 -160 1120 0 1120 0 0 160 0 160 -1120 0 -1120 0 0 -160z"/>
                              <path d="M3775 4946 c-41 -18 -83 -69 -90 -109 -3 -18 -5 -255 -3 -527 l3 -495 25 -45 c14 -24 40 -55 59 -67 l35 -24 527 3 c515 3 528 3 555 24 73 54 87 123 60 299 -74 487 -452 867 -936 940 -117 18 -195 18 -235 1z"/>
                              <path d="M160 4160 l0 -160 720 0 720 0 0 160 0 160 -720 0 -720 0 0 -160z"/>
                              <path d="M3025 4306 c-237 -39 -447 -146 -616 -315 -483 -483 -427 -1277 120 -1693 86 -65 265 -152 364 -178 293 -74 570 -44 829 92 325 170 539 481 589 855 20 153 5 215 -65 267 -26 20 -44 21 -369 26 -307 4 -346 7 -379 24 -42 20 -103 83 -121 124 -8 18 -13 136 -17 369 -5 325 -6 343 -26 369 -41 56 -69 69 -152 71 -42 1 -113 -4 -157 -11z"/>
                              <path d="M800 3187 c-49 -16 -133 -102 -148 -153 -9 -31 -12 -306 -12 -1138 l0 -1096 480 0 480 0 0 1096 c0 818 -3 1107 -12 1136 -6 22 -31 62 -55 88 -69 77 -88 80 -417 79 -174 -1 -294 -5 -316 -12z"/>
                              <path d="M2240 1907 c-49 -16 -133 -102 -148 -153 -9 -30 -12 -169 -12 -498 l0 -456 480 0 480 0 0 456 c0 324 -3 468 -12 496 -6 22 -31 62 -55 88 -69 77 -88 80 -417 79 -174 -1 -294 -5 -316 -12z"/>
                              <path d="M3680 1427 c-49 -16 -133 -102 -148 -153 -8 -27 -12 -117 -12 -258 l0 -216 480 0 480 0 0 216 c0 139 -4 231 -12 256 -6 22 -31 62 -55 88 -69 77 -88 80 -417 79 -174 -1 -294 -5 -316 -12z"/>
                              <path d="M160 320 l0 -160 2400 0 2400 0 0 160 0 160 -2400 0 -2400 0 0 -160z"/>
                           </g>
                        </svg>
                        <span
                           className="fw-bold"
                           style={{
                              background: 'linear-gradient(210deg, #004aad, #0dc0df)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              display: 'inline-block'
                           }}
                           > Dashboard
                           </span>


                     </span> */}
                     <span className="input-group-text text-body transparent"><i className="fas fa-search transparent" aria-hidden="true"></i></span>
                     <input type="text" className="form-control transparent no-focus-borde input-disable" placeholder=""  disabled />
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
                           {/* <i className="navbar-notification-icon fa-regular fa-bell cursor-pointer"></i> */}
                           <i className="navbar-notification-icon fa-regular fa-bell-slash cursor-pointer"></i>
                        </a>
                        <ul className="dropdown-menu  dropdown-menu-end  px-1 py-1 me-sm-n4" aria-labelledby="dropdownMenuButton">
                           <li className="mb-2">
                              <Link className="dropdown-item border-radius-md" to={""}>
                                 <div className="d-flex py-1">
                                    <div>
                                        {/* <img src={Userimg} className="avatar avatar-sm  me-3 " /> */}
                                        <i className="fa-solid fa-ban p-0"></i>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                       <h6 className="text-sm font-weight-normal mb-1">
                                          <span className="font-weight-bold mx-2"> No notification</span>
                                          {/* <span className="font-weight-bold">New message</span> from Laur */}
                                       </h6>
                                       {/* <p className="text-xs text-secondary mb-0 ">
                                          <i className="fa fa-clock me-1"></i>
                                          13 minutes ago
                                       </p> */}
                                    </div>
                                 </div>
                              </Link>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <div className="dropdown sadmin-content">
                           <button className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              <img
                                 src={imageSrc}
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