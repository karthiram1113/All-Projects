import React, { useState } from 'react'
import '../vendor-logins/login.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Vendorlogin } from '../service/apiserver';



function  Login() {

  const Navigate = useNavigate()

  const [submit, setSubmit] = useState(false)

  // Login Create Usestate Method
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('');

    // State to track loading status during login
    const [loading, setLoading] = useState(false)

  // Admin Login

  const Loginvendors = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
        const responseData = await Vendorlogin(password,email);

        if (responseData.apiStatus.code === "200") {
           localStorage.setItem("token", responseData.responseData.userDetail.token);
         localStorage.setItem("userName", responseData.responseData.userDetail.userName);
        localStorage.setItem("vendorId", responseData.responseData.userDetail.loginid);

            Navigate("/vendordashboard");
            toast.success(responseData.apiStatus.message);
        } else {
            toast.error(responseData.apiStatus.message);
        }
    } catch (error) {
        setErrorMessage('Failed to connect to the server. Please try again later.');
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
};



  return (
    <div>
        <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  {/* <img src="../../assets/images/logo.svg"/> */}
                <h1 className="text-center ">HERMON</h1>
                </div>
                <h4 className="text-center ">Hello! let's get started</h4>
                <h6 className="font-weight-light text-center">Sign in to continue.</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                    
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                {loading ? (
                  <div className="spinner" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <></>
                )}
              </div>

                 

                  <div className="form-group">
                    <input type="password"  onChange={(e)=>setPassword(e.target.value)} className="form-control form-control-lg" 
                    id="exampleInputPassword1" placeholder="Password"  style={(submit && password.length == 0) || (submit && password.length < 3) ? { borderColor: "red" } : { borderColor: "" }}  />
                    {submit && password.length == 0 ? <div style={{textAlign:"left"}} className="text-danger">Password is required</div> : <></>}
                    {submit && password.length < 3 && password.length != 0 ? <div style={{textAlign:"left"}} className="text-danger">Password must be 3 charater</div> : <></>}
                  </div>
                  <div className="mt-3 d-grid gap-2">
                    {/* <a className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" href="http://localhost:3000/super-admin-dashboard">SIGN IN</a> */}
                    <button  onClick={Loginvendors} className="btn-donate">
   LOGIN
</button>
                  </div>
                  {loading && <p>Loading...</p>}
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      
                    </div>
                    <a href="#" className="auth-link text-primary">Forgot password?</a>
                  </div>
                  <div className="mb-2 d-grid gap-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook me-2"></i>Connect using facebook </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light"> Don't have an account? <a href="register.html" className="text-primary">Create</a>
                  </div>
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

export default Login;
