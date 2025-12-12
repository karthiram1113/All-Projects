import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Preloader from '../../shared/preloader';
import OVERALLAPI from '../../api/over-all-api';

function Login() {


  const [submit, setSubmit] = useState(false)

  // Login Create Usestate Method
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmit(true);
    if (!email || !password) {
      setLoading(false);
      return;
    }
    if (password?.length < 6) {
      setLoading(false);
      return;
    }

    const apiData = {
      user_name: email,
      password: password
    };

    try {
      const responseData = await OVERALLAPI.sAdminsignInAPI(apiData);
      console.log(responseData, "usertoken");
      if (responseData.apiStatus.code === 200) {
        navigate("/dashboard")
        localStorage.setItem("token", responseData.responseData.userDetail.token);
        console.log(responseData.responseData.userDetail.token, "11111");

        localStorage.setItem("userName", responseData.responseData.userDetail.userName);
        localStorage.setItem("imgPath", responseData.responseData.userDetail.imgPath);
        localStorage.setItem("role", responseData.responseData.userDetail.role);
        toast.success(responseData.apiStatus.message)
      }
      else {
        toast.warning(responseData.apiStatus.message)

      }

    } catch (error) {
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
          <div className="content-wrapper d-flex align-items-center auth" style={{boxShadow : "none"}}>
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5" style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
                  <div className="brand-logo d-flex justify-content-center mb-4">
                    <img style={{ width: "80%", height: "80%" }} src="../../assets/images/hs-logo-hermon.png" />
                    {/* <h1 className='h1-hermon text-center'>HERMON</h1> */}
                  </div>

                  <h4 className='text-center'>Hello! let's get started</h4>
                  <h6 className="font-weight-light text-center">Sign in to continue.</h6>
                  <form className="pt-3">
                    <div className="form-group">

                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                        {loading ? (
                          <Preloader />

                        ) : (
                          <>
                          
                          
                          
                          </>
                        )}
                      </div>
                      
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
                            <div style={{ textAlign: "left" }} className="text-danger">*invalid email format</div>
                          )} */}
                        </>
                      )}
                    </div>
                    <div className="form-group position-relative">
                      <div class="coolinput">
                        <label for="input" class="text">Password</label>
                        <input type={showPassword ? "text" : "password"} id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder="******" name="input" class="input"
                          style={submit && (password?.length === 0 || password?.length <= 6) ? { borderColor: "red" } : {}}
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
                      > {showPassword ? <i class="fa-solid fa-eye-slash eye-icon"></i> : <i class="fa-solid fa-eye eye-icon"></i>}
                      </span>
                      {submit && password?.length == 0 ? <div style={{ textAlign: "left" }} className="text-danger">*password is required</div> : <></>}
                      {submit && password?.length <= 6 && password?.length != 0 ? <div style={{ textAlign: "left" }} className="text-danger">*password must be 6 charater</div> : <></>}
                    </div>
                    <div className="mt-3 d-grid gap-2">
                      {/* <Link
                        to={"/dashboard"}
                        style={{ textDecoration: "none", textAlign: "center" }}
                        type="button"
                        className="btn-donate"
                      >
                        LOGIN
                      </Link> */}
                      <button
                            onClick={(e)=>handleAdminLogin(e)}
                            className="btn-donate">
                            LOGIN
                          </button>
                    </div>
                  </form>

                </div>

              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
