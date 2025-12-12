import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Url from '../Api/Url';

function Password() {

    const Navigate= useNavigate()
      //  const [email, setEmail] = useState("")
     const [password,setPassword]=useState("")
     const [password1,setPassword1]=useState("")
     const [password2,setPassword2]=useState("")
     const [submit,setSubmit]=useState(false)
     
    const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);


    // Reset Api Start
     const changee = async (e) => {
        e.preventDefault();
        setSubmit(true)
        if(!password || !password1){
          return;
          
        }

        let email = localStorage.getItem("email")
        let token = localStorage.getItem("token");
       const response = await fetch(Url.start + Url.reset,{
          method: "POST",
          headers: {
            "content-type": "appilication/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            "email": email,
            "newPassword": password,
            "confirmPassword": password1
          }),
        });
        try {
          const responceData = await response.json();
          console.log(responceData);
          
            setSubmit(false)
          if (responceData.apiStatus.code === "200"){
            toast.success(responceData.apiStatus.message)
              Navigate("/AdminLogin")
            }
            else{
            toast.warn(responceData.apiStatus.message)
            }
          
    
        } catch (error) {
          console.log("Error handled =" + error);
        }
      };

            // Password Eyes
   const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  return (
    <div>
       <main>
        <div class="container">
          <section class="sss section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div class="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      class="logo d-flex align-items-center w-auto"
                    >
                     
                      <span class="d-none d-lg-block">New Password</span>
                    </a>
                  </div>
                  {/* <!-- End Logo --> */}

                  <div class="card mb-3">
                    <div class="card-body">
                     

                      <form class="row  g-3 needs-validation" novalidate>
                        <div class="col-12">
                          <label class="form-label required">
                            Password
                          </label>
                          <div className='password-input-container'>
                            <input
                            autoComplete='new-password'
                              value={password}
                              type={showPassword ? "text" : "password"}
                              class="form-control"
                              style={submit && password.length == 0 ||  password !== password1 ? { borderColor: "red" } : { borderColor: "" }}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                              className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                              id="togglePassword"
                              onClick={togglePasswordVisibility}

                            ></i>
                          </div>
                          {submit && password.length === 0 ? (
                            <div className="text-danger">Password is required</div>
                          ) : (
                            <>
                              {/* {submit && password !== password1 && (
                                  <div className="text-danger">Password Confirm Password does not match</div>
                              )} */}
                            </>
                          )}
                        
                        </div>
                        <div class="col-12 mb-3">
                          <label  class="form-label required">
                            Confirm Password
                          </label>
                          <div className='password-input-container'>
                          <input
                          value={password1}
                          onChange={(e)=>setPassword1(e.target.value)}
                          type={showPassword1 ? "text" : "password"}
                            class="form-control"
                            required
                              style={submit && password1.length == 0 || password1 !== password ? { borderColor: "red" } : { borderColor: "" }}
                            />
                            <i
                  className={`bi ${showPassword1 ? "bi-eye" : "bi-eye-slash"}`}
                  
                              onClick={togglePasswordVisibility1}
              
                ></i>
                          </div>
                          {submit && password1.length === 0 ? (
                            <div className="text-danger">Confirm Password is required</div>
                          ) : (
                            <>
                              {submit && password1 !== password && (
                                <div className="text-danger">Password Confirm Password does not match</div>
                              )}
                            </>
                          )}
                          
                        </div>
                        
                        {/* <Link to="/Forgot" style={{textAlign:"right",fontSize:"14px"}}>Forgot Password </Link> */}
                        <div class="col-12">
                          <button onClick={changee}  class="btn btn-primary w-100">
                            Submit
                          </button>
                       
                        </div>
                       
                      </form>

                      
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
        </main>
    </div>
  )
}

export default Password;
