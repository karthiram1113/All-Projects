import React, { useState } from 'react'
import RameshLogo from '../../assets/img/Media.jpeg';
import './index.css'
import { Link, useNavigate } from 'react-router-dom';
import superAdminApis from '../../api/services/admin-pages/superAdmin';
import { toast } from 'react-toastify';

function AdminRegister() {

const [showPass, setShowPass] = useState(false);
const [showCPass, setShowCPass] = useState(false);
 const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [userName,setUserName] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [cPassword,setCPassword] = useState("")
  const [email,setEmail] = useState("")

    const navigate = useNavigate();
  

const adminRegister =async (e)=> {
     e.preventDefault();
    setSubmit(true);

if (!userName ) {
      return;
    }

  if (password !== cPassword) {
  return; 
}
  
    setLoading(true);

    const apiData = {
       "type":"user",
      user_name: userName.trim(),
      email_id:email,
      phone:phone,
      confirmPassword:cPassword,
      password: password,
    };

  try {
      const responseData = await superAdminApis.superAdminRegisterAPI(apiData);

      if (responseData.apiStatus?.code === '200') {

        toast.success(responseData.apiStatus.message || 'Register successful!');
        navigate('/');
      } else {
        toast.error(responseData.apiStatus?.message || 'Register failed!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login.');
    } finally {
      setLoading(false);
    }
}


  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
 <div className="card mb-2 shadow custom-card" style={{ padding: '20px 20px' }}>
                <div className="card-body text-center">
                  <img src={RameshLogo} alt="Ramesh Finance Logo" className="img-fluid mb-3 ramesh-logo" />
<h6 className="welcome-content text-left">
  Welcome! Create a new account to get started with SMR Gold Loan Finance.
</h6>

 <form className="row g-3 text-start mt-3 register-field overlay-text" >

  {/* Username */}
  <div className="form-group  text-left">
    <label className="form-label required-star">Username</label>
    <input
      type="text"
      className="form-control"
      placeholder="Enter your username"
      onChange={(e)=>{setUserName(e.target.value)}}
       style={submit && userName.length === 0 ? { borderColor: "red" } : {}}
    />
 {submit && userName.length == 0 ? <div className='text-danger'>Name is required</div> : <></>}

  </div>

   {/* Email */}
  <div className="form-group  text-left">
    <label className="form-label">Email</label>
    <input
      type="text"
      className="form-control"
      placeholder="Enter your email"
      onChange={(e)=>{setEmail(e.target.value)}}
    />
  </div>

  {/* Phone Number */}
  <div className="form-group  text-left">
    <label className="form-label">Phone Number</label>
    <input
      type="tel"
      className="form-control"
      maxLength={12}
      placeholder="Enter your phone number"
       onChange={(e)=>{setPhone(e.target.value)}}
    />
  </div>

{/* Password */}
<div className="form-group">
  <label className="form-label required-star">Password</label>

  <div className="position-relative">
    <input
      type={showPass ? "text" : "password"}
      className="form-control"
      placeholder="Enter password"
       onChange={(e)=>{setPassword(e.target.value)}}
                    style={submit && password.length == 0 && password < 3 ? { borderColor: "red" } : { borderColor: "" }}

    />

    <i
      className={`fa ${showPass ? "fa-eye-slash" : "fa-eye"} password-icon`}
      onClick={() => setShowPass(!showPass)}
    ></i>
  </div>
   {submit && password.length == 0 ? <div className='text-danger'>Password is required</div> : <></>}
                {submit && password.length < 3 && password.length != 0 ? <div className="text-danger">Password must be 3 charater</div> : <></>}
</div>


{/* Confirm Password */}
<div className="form-group mt-3">
  <label className="form-label required-star">Confirm Password</label>

  <div className="position-relative">
    <input
      type={showCPass ? "text" : "password"}
      className="form-control"
      placeholder="Confirm password"
       onChange={(e)=>{setCPassword(e.target.value)}}
    style={submit && (cPassword.length === 0 || cPassword !== password || cPassword.length < 3) ? { borderColor: "red" } : {}}

    />

    <i
      className={`fa ${showCPass ? "fa-eye-slash" : "fa-eye"} password-icon`}
      onClick={() => setShowCPass(!showCPass)}
    ></i>
  </div>
  {submit && cPassword.length === 0 && <div className='text-danger'>Confirm Password is required</div>}
                {submit && cPassword.length < 3 && cPassword.length != 0 ? <div className="text-danger">Password must be 3 charater</div> : <></>}
{submit && cPassword !== password && cPassword.length !== 0 && <div className='text-danger'>Password and confirm password should be same</div>}

</div>


  <div className="col-12 mt-3">
  <button type="submit" className="btn btn-warning  mt-4 btns" onClick={adminRegister} >
    Sign Up
  </button>
  </div>


 <div className="register-content text-center mt-3">
  <p className="mb-0">
    Already have an account?{" "}
    <Link to="/" >
      Back to Login
    </Link>
  </p>
</div>


</form>


                </div>

                </div>

            </div>
        </div>
        </div>
        </section>
        </div>
  )
}

export default AdminRegister
