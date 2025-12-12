import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginAPI from '../../api/services/LoginApi';
import '../Forms/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/araciyal logo.png'
function Login_Components () {
  const Navigate = useNavigate();

  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Error state for validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const Loginvendors = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const responseData = await LoginAPI.signInAPI({email_id, password,loginType: "Super_admin"});
console.log(responseData,'loginvenders')
      if (responseData.apiStatus.code === "200") {
        localStorage.setItem("token", responseData.responseData.token);
        localStorage.setItem("user_name", responseData.responseData.userDetail.user_name);
        Navigate("/admin-dashboard");
        toast.success(responseData.apiStatus.message);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
        setErrorMessage('* Failed to connect to the server. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!email_id.trim()) {
      setEmailError('* Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('* Password is required');
      valid = false;
    } else if (password.length < 3) {
      setPasswordError('* Password must be at least 3 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      Loginvendors();
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo text-center">
                  <img src={logo} alt="logo" />
                  <h4 className="text-center">Hello! let's get started</h4>
                  <h6 className="font-weight-light text-center">Sign in to continue.</h6>
                </div>

                <form className="pt-3" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="email"
                      value={email_id} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className={`form-control form-control-lg ${emailError ? 'border-danger' : ''}`} 
                      placeholder="Email" 
                    />
                    {emailError && <div className="text-danger">{emailError}</div>}
                  </div>

                  <div className="form-group">
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className={`form-control form-control-lg ${passwordError ? 'border-danger' : ''}`} 
                      placeholder="Password" 
                    />
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                  </div>

                  {loading && <p>Loading...</p>}
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}

                  <div className="mt-3 d-grid gap-2">
                    <button type="submit" className="btn-donate" onClick={Loginvendors}>
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  );
}

export default Login_Components;
