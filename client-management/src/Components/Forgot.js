import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Url from '../Api/Url';

function Forgot() {

  // Create Usestate
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const Navigate = useNavigate()


  //Otp Verify
  const handleOtpcheck = (e) => {
    const value = e.target.value;
    const otp = value.replace(/[^0-9-+()]/g, '');
    setOtp(otp);
  }
  // Forgot Api Start
  const forgot = async (e) => {
    e.preventDefault();
   
    // setLoading(true)
    if (!email) {
      setSubmit(true)
      return
    };
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.forgot, {
      method: "POST",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        "emailId": email
      }),
    });

    localStorage.setItem("email", email)
    try {
      const responceData = await response.json();
      console.log(responceData);
      if (responceData.apiStatus.code == "200") {
        setSubmit(false)
        toast.success(responceData.apiStatus.message)
        // Navigate("/superdashboard")
      }
      else {
        toast.warn(responceData.apiStatus.message)
      }
      setSubmit(false)
      setLoading(false)

    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // Otp Verify Api Start
  const Otp = async (e) => {
    e.preventDefault();

    // setLoading(true)
    if (!otp) {
      setError(true)
      return
    };
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.OTP, {
      method: "POST",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        "email": email,
        "Otp": otp
      }),
    });
    try {
      const responceData = await response.json();
      console.log(responceData);
      if (responceData.apiStatus.code == "200") {
        setError(false)
        toast.success(responceData.apiStatus.message)
       Navigate("/NewPassword")
      }
      else {
        toast.warn(responceData.apiStatus.message)
      }
      setSubmit(false)
      setLoading(false)

    } catch (error) {
      console.log("Error handled =" + error);
    }
  };
  // Resent Api Start

  const resend = async (e) => {
    e.preventDefault();
    setSubmit(true)
    if (!email) {
      return
    };
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.resendMail, {
      method: "POST",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        "emailId": email
      }),
    });
    try {
      const responceData = await response.json();
      console.log(responceData);
      if (responceData.code == "200") {
        toast.success(responceData.message)
      }
      else {
        toast.error(responceData.message)
      }
      setSubmit(false)

    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  return (
    <div>
      <main>
        <div class="container">
          <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center hhh">
                  <div class="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      class="logo d-flex align-items-center w-auto"
                    >

                      <span class="d-none d-lg-block">Forgot Password</span>
                    </a>
                  </div>
                  {/* <!-- End Logo --> */}

                  <div class="card mb-3">
                    <div class="card-body">


                      <form class="needs-validation" novalidate>
                        <div className='row'>

                          <div class="col-9">
                            <label class="form-label">
                              Email
                            </label>
                            <input
                              type="text"
                              class="form-control mb-2"

                              onChange={(e) => setEmail(e.target.value)}
                              style={
                                submit && !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
                                  ? { borderColor: "red" }
                                  : {}
                              }
                            />
                            {submit && email.length === 0 ? (
                              <div className="text-danger">Email is required</div>
                            ) : (
                              <>
                                {submit && !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) && (
                                  <div className="text-danger">Invalid email format</div>
                                )}
                              </>
                            )}
                          </div>

                          {/* <Link to="/Login" style={{textAlign:"right",fontSize:"14px"}}>Sign In </Link> */}
                          <div class="col-3">
                            <button onClick={forgot} class="btn btn-primary" style={{
                              marginTop: "57%",
                              padding: "9px",
                              fontSize: "small"
                            }}>
                              Submit
                            </button>
                            <span>

                            </span>




                          </div>
                        </div>
                        <div className='row'>

                          <div class="col-9">
                            <label class="form-label">
                              Otp
                            </label>
                            <input
                              type="text"
                              class="form-control mb-2"
                              maxLength={6}
                              value={otp}
                              onChange={handleOtpcheck}
                              style={
                                error && (otp.length < 6 || otp.length === 0)
                                  ? { borderColor: 'red' }
                                  : {}
                              }
                            />
                            {/* {submit &&  ? <div className='text-danger'></div> : <></>}
                          {submit &&  (
                            <div className="text-danger"></div>
                          )} */}
                            {error && otp.length == 0 ? (
                              <div className='text-danger'>Otp is required</div>
                            ) : (
                              <>
                                {error && otp.length < 6 && (
                                  <div className="text-danger">Otp should be at least 6 digits</div>
                                )}</>
                            )}
                          </div>
                          <div class="col-3">
                            <button class="btn btn-success" style={{
                              marginTop: "57%",
                              padding: "8px 12px 6px",
                              fontSize: "small"
                            }}
                              onClick={Otp}
                            >
                              Verify
                            </button>
                            <span>

                            </span>




                          </div>
                        </div>



                      
                        
                        
                        {/* <div class="col-6">
                          <p class="small mb-0">
                            Didn't receive mail?{" "}
                            <Link onClick={resend} >Resend Mail</Link>
                          </p>
                        </div> */}
                        <div >
                          <p class="small mb-0">
                            Back to 
                            <Link to="/AdminLogin">  Sign In</Link>
                          </p>
                        </div>
                      </form>
                      {/* style={{float:"right",marginLeft:"5px"}}  */}

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

export default Forgot
