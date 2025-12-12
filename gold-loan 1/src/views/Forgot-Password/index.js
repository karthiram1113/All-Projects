import React, { useState } from 'react';
import RameshLogo from '../../assets/img/Media.jpeg';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [userName, setUserName] = useState('');
  const [submit, setSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    if (userName.trim() === '') {
      setSuccessMessage('');
      return;
    }

    // Simulated API call for password reset (replace with your backend call)
    setTimeout(() => {
      setSuccessMessage(`Password reset link sent to the registered email for "${userName}".`);
      setUserName('');
      setSubmit(false);
    }, 1000);
  };

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              
              {/* Logo Section */}
              <div className="d-flex justify-content-center py-4">
                <a href="#" className="logo d-flex align-items-center w-auto">
                  {/* optional brand name */}
                </a>
              </div>

              {/* Forgot Password Card */}
              <div className="card mb-2 shadow custom-card" style={{ padding: '20px 20px' }}>
                <div className="card-body text-center">
                  <img
                    src={RameshLogo}
                    alt="Ramesh Finance Logo"
                    className="img-fluid mb-3 ramesh-logo"
                  />

                  <h6 className="welcome-content text-left mb-3">
                    Forgot your password? Don’t worry — enter your number below and we’ll send a reset link to your registered email address.
                  </h6>

                  <form className="row g-3 text-start mt-3 overlay-text" onSubmit={handleSubmit}>
                    <div className="col-12">
                      <label className="form-label" htmlFor="username">
                        Phone No
                      </label>
                      <input
                        type="number"
                        placeholder="Enter your mobile no"
                        className="form-control"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        maxLength={12}
                        // style={submit && userName.trim() === '' ? { borderColor: 'red' } : {}}
                      />
                      {submit && userName.trim() === '' && (
                        <small className="text-danger">Email is required</small>
                      )}
                    </div>

                    <div className="col-12 text-center mt-3">
                      <button className="btn btn-warning  mt-4 btns" type="submit">
                        Send Reset Link
                      </button>
                    </div>
                  </form>

                 

                  {/* Back to Login Link */}
                  <div className="mt-3">
                    <Link to="/" className="small text-decoration-none">
                      ← Back to Login
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
