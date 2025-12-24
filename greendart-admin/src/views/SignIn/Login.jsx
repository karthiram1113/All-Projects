import React, { useState } from "react";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import brand_logo from "../../assets/images/brand_logo.png";
import Login_Field from "../../components/Forms/loginForm";

function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="login-bg-img">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">

          <div className="card position-relative">

            {/* 🔥 Loader Overlay */}
            {loading && (
              <div className="card-loader-overlay">
                <svg className="loader">
                  <rect className="boxes"></rect>
                </svg>
              </div>
            )}

            {/* Card Content */}
            <div className={`card-body ${loading ? "blur-content" : ""}`}>
              <div className="app-brand justify-content-center mb-0">
                <img src={brand_logo} alt="" width="200" />
              </div>

              <h4 className="mb-2">Welcome to Greendart!</h4>
              <p className="mb-4">
                Greendart helps you manage content smarter and faster. Sign in
                to take control of your digital workspace.
              </p>

              <Login_Field loading={loading} setLoading={setLoading} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
