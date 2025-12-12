import React, { useEffect, useState } from 'react'
import Sidebar from '../../../shared/Sidebar';
import Footer from '../../../shared/Footer';
import Userimg from "../../../assets/img/team-2.jpg"
import Userimg1 from "../../../assets/img/small-logos/logo-spotify.svg"
import DashboardLayout from '../../../layouts/DashboardLayout';
import TopNav from '../../../shared/TopNav';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import VendorAPI from '../../../api/services/vendorLogin/vendorApi';
import { toast } from 'react-toastify';
function VendorProfile() {
   const [redirect, setRedirect] = React.useState<string | null>(null);
   const[username,setUsername]=useState("");
   const[firstname,setFirstname]=useState("");
   const[lastname,setLastname]=useState("");
   const[email,setEmail]=useState("");
   const[mobile,setMobile]=useState("");
   const[oldPassword,setoldPassword]=useState("");
   const[newPassword,setnewPassword]=useState("");
   const[confirmPassword,setconfirmPassword]=useState("");
   const [showPassword, setShowPassword] = useState(false);
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
   const [newshowPassword, setnewShowPassword] = useState(false);
   const toggleNewPasswordVisibility = () => {
      setnewShowPassword(!newshowPassword);
    };
   const [confshowPassword, setConfShowPassword] = useState(false);
   const toggleConfPasswordVisibility = () => {
      setConfShowPassword(!confshowPassword);
    };
   const navigate=useNavigate();
   const handleupdateMyProfile = () => {
         const apiData = {
            firstName: firstname,
            lastName: lastname,
            userName: username,
            phone: mobile,
            emailId: email
         };
          VendorAPI.commonupdateMyProfileAPI(apiData) 
            .then((responseData: any) => {
               if (responseData.apiStatus.code === '200') {
                  toast.success(responseData.apiStatus.message);
                  localStorage.setItem("userVendorName",username);
                  navigate('/vendor/dashboard')
               } else {
                  toast.error(responseData.apiStatus.message);
               }
            })
            .catch((error: any) => {
             
               console.error("Error during login:", error);
               toast.error("An error occurred during login.");
            });
      };
   const handlechangePassword = () => {
         const apiData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
         };
          VendorAPI.commonchangePasswordAPI(apiData) 
            .then((responseData: any) => {
               if (responseData.apiStatus.code === '200') {
                  toast.success(responseData.apiStatus.message);
                  navigate('/vendor/dashboard')
               } else {
                  toast.error(responseData.apiStatus.message);
               }
            })
            .catch((error: any) => {
             
               console.error("Error during login:", error);
               toast.error("An error occurred during login.");
            });
      };
   const handleGetStore = () => {
         VendorAPI.commongetMyProfileAPI()
            .then((responseData: any) => {
               if (responseData.apiStatus.code === '200') {
                  setFirstname(responseData?.UserData?.first_name);
                  setLastname(responseData?.UserData?.last_name);
                  setUsername(responseData?.UserData?.username);
                  setEmail(responseData?.UserData?.email);
                  setMobile(responseData?.UserData?.mobile);
               } else {
                  toast.error(responseData.apiStatus.message);
               }
            })
            .catch((error: any) => {
               console.error("Error during login:", error);
               toast.error("An error occurred during login.");
            });
      };
      useEffect(()=>{
         handleGetStore();
      },[])
   if (redirect) {
      return <Navigate to={redirect} />;
   }
   return (
      <>
         <DashboardLayout>
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
               <TopNav />
               <div className="vendor-breadcrumbs container-fluid py-1 px-3">
                  <nav aria-label="breadcrumb">
                     <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to={"/vendor/dashboard"}>Dashboard</Link></li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">My Profile</li>
                     </ol>
                     <h6 className="text-start font-weight-bolder mb-0">My Profile</h6>
                  </nav>
               </div>
               <div className="myprofile-maincontent container-fluid py-4">
                  <div className="row myprofile-content">
                     <div className="col-md-6">
                        <h5 className="text-start">Vendor Edit Profile</h5>
                        <div className="col-md-12 login-input-group">
                           <div className="edit-container">
                              <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e)=>setUsername(e.target.value)} value={username} className="vendor-crt-input" placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-user-secret"></i> Username</label>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-6 edit-name login-input-group">
                              <div className="edit-container">
                                 <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e)=>setFirstname(e.target.value)} value={firstname} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-user"></i> First Name</label>
                              </div>
                           </div>
                           <div className="col-md-6 login-input-group">
                              <div className="edit-container">
                                 <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e)=>setLastname(e.target.value)} value={lastname} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-user"></i> Last Name</label>
                              </div>
                           </div>
                           <div className="col-md-6 login-input-group">
                              <div className="edit-container">
                                 <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e)=>setMobile(e.target.value)} value={mobile} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-mobile-screen-button"></i> Mobile Number</label>
                              </div>
                           </div>
                           <div className="col-md-6 login-input-group">
                              <div className="edit-container">
                                 <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e)=>setEmail(e.target.value)} value={email} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-at"></i> Email</label>
                              </div>
                           </div>
                        </div>
                        {/* <div className="col-md-12 login-input-group">
                           <div className="edit-container">
                              <input type="file" id="vendor-crt-input" className="vendor-crt-input" placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-file-image"></i> Profile Image</label>
                           </div>
                        </div> */}
                           <div className="col-md-12 edit-button text-end">
                              <button onClick={handleupdateMyProfile}>Save</button>
                           </div>
                     </div>
                     <div className="col-md-6">
                        <h5 className="text-start">Password</h5>
                        <div className="col-md-12 login-input-group staff-passwordInput">
                           <div className="edit-container">
                              <input type={showPassword ? 'text' : 'password'} id="vendor-crt-input" autoComplete="off" onChange={(e)=>setoldPassword(e.target.value)} className="vendor-crt-input" placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-unlock"></i> Current Password</label>
                           </div>
                           <i
                            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-eye sadmin-passwordInputicon`}
                            id="togglePassword"
                            onClick={togglePasswordVisibility}
                          ></i>
                        </div>
                        <div className="col-md-12 new-password login-input-group staff-passwordInput">
                           <div className="edit-container">
                              <input type={newshowPassword ? 'text' : 'password'} id="vendor-crt-input" autoComplete="off" onChange={(e)=>setnewPassword(e.target.value)} className="vendor-crt-input" placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-lock-open"></i> New Password</label>
                           </div>
                           <i
                            className={`fas ${newshowPassword ? 'fa-eye-slash' : 'fa-eye'} password-eye sadmin-passwordInputicon`}
                            id="togglePassword"
                            onClick={toggleNewPasswordVisibility}
                          ></i>
                        </div>
                        <div className="col-md-12 new-password login-input-group staff-passwordInput">
                           <div className="edit-container">
                              <input type={confshowPassword ? 'text' : 'password'} id="vendor-crt-input" autoComplete="off" onChange={(e)=>setconfirmPassword(e.target.value)} className="vendor-crt-input" placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-lock"></i> Confirm New Password</label>
                           </div>
                           {confirmPassword !== newPassword && confirmPassword.length !== 0 && <div className='text-danger error-message-required'>Password and confirm password should be same</div>}
                           <i
                            className={`fas ${confshowPassword ? 'fa-eye-slash' : 'fa-eye'} password-eye sadmin-passwordInputicon`}
                            id="togglePassword"
                            onClick={toggleConfPasswordVisibility}
                          ></i>
                        </div>
                        <div className="col-md-12 edit-button text-end">
                           <button onClick={handlechangePassword}>Change Password</button>
                        </div>
                     </div>
                  </div>
                  <Footer />
               </div>
            </main>
         </DashboardLayout>
      </>
   )
}
export default VendorProfile;