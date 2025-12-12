import React from "react";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import HsLogo_Image from "../../assets/images/HS Icon.jpg";
import { Link } from "react-router-dom";

function ForgetPassword() {
  return (
    <>
      <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
          <div class="authentication-inner">
            <div class="card">
              <div class="card-body">
                <div class="app-brand justify-content-center">
                  <a href="index.html" class="app-brand-link gap-2">
                    <img src={HsLogo_Image} alt="" width="100" />
                  </a>
                </div>
                <h4 class="mb-2 text-start">Forgot Password? 🔒</h4>
                <p class="mb-4 text-start">
                  Enter your email and we'll send you instructions to reset your
                  password
                </p>

                <form
                  id="formAuthentication"
                  class="mb-3"
                  action="index.html"
                  method="POST"
                >
                  <div class="mb-3 text-start">
                    <label for="email" class="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      name="email-username"
                      placeholder="Enter your email"
                      autofocus
                    />
                  </div>
                  <div class="mb-3">
                      <button
                        class="btn btn-primary d-grid w-100"
                        type="submit"
                      >
                        Send Reset Link
                      </button>
                  </div>
                  <div class="mb-3">
                    <Link to={'/'}>
                    <small>⇐ Back To Login</small>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
