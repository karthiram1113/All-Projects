import React, { useState } from 'react';
import './index.css';
import RameshLogo from '../../assets/img/Media.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import superAdminApis from '../../api/services/admin-pages/superAdmin';
import { toast } from 'react-toastify';

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const regexValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

 


  const adminLogin = async (e) => {
    e.preventDefault();
    setSubmit(true);

    // Simple validation
    if (!userName.trim() || !password.trim()) {
      // toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    const apiData = {
      loginType: 'admin',
      user_name: userName.trim(),
      password: password,
    };

    try {
      const responseData = await superAdminApis.superAdminLoginAPI(apiData);

      if (responseData.apiStatus?.code === '200') {
        const userDetail = responseData?.responseData?.userDetail?.userName;
        console.log(userDetail);
        

        localStorage.setItem('userName', userDetail || '');
        localStorage.setItem('roleName', userDetail?.roles?.roleName || '');
        localStorage.setItem('token', responseData.responseData?.token || '');
        localStorage.setItem('studentloginid', userDetail?.id || '');

        toast.success(responseData.apiStatus.message || 'Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(responseData.apiStatus?.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <a href="#" className="logo d-flex align-items-center w-auto">
                  {/* <span className="gold-text d-none d-lg-block">Gold Loan</span> */}
                </a>
              </div>

              <div className="card mb-2 shadow custom-card" style={{ padding: '20px 20px' }}>
                <div className="card-body text-center login-page">
                  <img src={RameshLogo} alt="Ramesh Finance Logo" className="img-fluid mb-3 ramesh-logo" />
                  <h6 className="welcome-content text-left">
                  Shine brighter with SMR Gold Loan Finance — login to get started.
                  </h6>

                  <form className="row g-3 text-start mt-3 overlay-text" >
                   <div className="col-12">
  <label className="form-label required-star" htmlFor="username">
    Username
  </label>
  <input
    type="text"
    placeholder="Your Username"
    className="form-control"
    value={userName}
    onChange={(e) => setUserName(e.target.value)}
    style={submit && userName.length === 0 ? { borderColor: 'red' } : {}}
  />
  {submit && userName.length === 0 && (
    <div className="text-danger">Username is required</div>
  )}
</div>

                    <div className="col-12">
                      <label className="form-label required-star" htmlFor="password">
                        Password
                      </label>
                      <div className="password-input-wrapper position-relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={submit && password.length === 0 ? { borderColor: 'red' } : {}}
                        />
                        <span
                          className="toggle-password position-absolute end-0 top-50 translate-middle-y me-3"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye login-eye'}`} />
                        </span>
                      </div>
                      {submit && password.length === 0 && <div className="text-danger">Password is required</div>}
                    </div>

<div className='forgot-password mb-0'><Link to="/forgot-password">Forgot Password</Link></div>
                    <div className="col-12 mt-3">
                      <button className="btn btn-warning  mt-4 btns" onClick={adminLogin} type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>

{/* <div className='register-content'>
<p>Don't Have An Account   <Link to="/sign-up">Register Now</Link></p>

</div> */}


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
