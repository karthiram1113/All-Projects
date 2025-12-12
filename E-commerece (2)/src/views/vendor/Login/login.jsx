import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginAPI from '../../../api/services/loginApi';
import Preloader from '../../../components/Preloader';



function  VendorLogin() {

  const Navigate = useNavigate()

  const [submit, setSubmit] = useState(false)

  // Login Create Usestate Method
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    // State to track loading status during login
    const [loading, setLoading] = useState(false)
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  // vendor Login
const Loginvendors = async (e) =>{
  e.preventDefault();
  setSubmit(true);
  setLoading(true);
  if (email.length === 0 || password.length === 0 || password.length < 3) {
    setLoading(false);
    return;
  }

 const apiData = {
     email: email,
     password: password
   };

  try{
    const responseData = await LoginAPI.vendorSignInAPI(apiData);
    if(responseData.apiStatus.code === "200"){
      Navigate("/vendordashboard")
       localStorage.setItem("token", responseData.responseData.userDetail.token);
         localStorage.setItem("userName", responseData.responseData.userDetail.userName);
        localStorage.setItem("vendorId", responseData.responseData.userDetail.loginid);
      toast.success(responseData.apiStatus.message)
    }
    else{
      toast.warning(responseData.apiStatus.message)

    }

  }catch (error) {
     console.error("Error during login:", error);
     toast.error("An error occurred during login.");
   } finally {
     setLoading(false);
   }
}


  return (
    <div>
        <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            
            <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5" style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
                
                  <div className="brand-logo  d-flex justify-content-center mb-4">
                    <img style={{ width: "80%", height: "80%" }} src="../../assets/images/hs-logo-hermon.png"/>
                {/* <h1 className="text-center ">HERMON</h1> */}
                </div>
                <h4 className="text-center ">Hello! let's get started</h4>
                <h6 className="font-weight-light text-center">Sign in to continue.</h6>
                <form className="pt-3">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                      {loading ? (
                        <Preloader />
                      ) : (
                        <></>
                      )}
                    </div>

                  <div className="form-group">
                    {/* <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" 
                        style={submit && email.length === 0
                          ? { borderColor: "red" }
                          : {}}
                    /> */}
                      <div class="coolinput">
                        <label for="input" class="text">User Name</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder="Enter your username" name="input" class="input" 
                          style={submit && email?.length === 0  ? { borderColor: "red" } : {}}
                        />
                      </div>
                      {submit && email.length === 0 ? (
                        <div style={{ textAlign: "left" }} className="text-danger">*username is required</div>
                      ) : (
                        <>
                          {/* {submit && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) && (
                            <div style={{ textAlign: "left" }} className="text-danger">*Invalid email format</div>
                          )} */}
                        </>
                      )} 
                  </div>

                   
                 

                    <div className="form-group  position-relative">
                      {/* <input type={showPassword ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} className="form-control form-control-lg" 
                    id="exampleInputPassword1" placeholder="Password"  style={(submit && password.length == 0) || (submit && password.length < 3) ? { borderColor: "red" } : { borderColor: "" }}  /> */}
                      <div class="coolinput">
                        <label for="input" class="text">Password</label>
                        <input type={showPassword ? "text" : "password"} id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder="******" name="input" class="input" 
                          style={submit && (password?.length === 0 || password?.length < 3) ? { borderColor: "red" } : {}}
                        />
                      </div>
                      <span
                        onClick={toggleShowPassword}
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "79px",
                          transform: "translateY(-50px)",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <i class="fa-solid fa-eye-slash eye-icon"></i> : <i class="fa-solid fa-eye eye-icon"></i>}
                      </span>
                    {submit && password.length == 0 ? <div style={{textAlign:"left"}} className="text-danger">*password is required</div> : <></>}
                    {submit && password.length < 3 && password.length != 0 ? <div style={{textAlign:"left"}} className="text-danger">*password must be 3 charater</div> : <></>}
                  </div>
                  <div className="mt-3 d-grid gap-2">
                    {/* <a className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" href="http://localhost:3000/super-admin-dashboard">SIGN IN</a> */}
                    <button  
                    onClick={(e)=>Loginvendors(e)} 
                    className="btn-donate">
   LOGIN
</button>

                  </div>
                  {/* {loading && <p>Loading...</p>} */}
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                  {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      
                    </div>
                    <a href="#" className="auth-link text-primary">Forgot password?</a>
                  </div> */}
                  {/* <div className="mb-2 d-grid gap-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook me-2"></i>Connect using facebook </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light"> Don't have an account? <a href="register.html" className="text-primary">Create</a>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- content-wrapper ends --> */}
      </div>
      {/* <!-- page-body-wrapper ends --> */}
    </div>
    </div>
  )
}

export default VendorLogin;
