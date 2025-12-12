import React, { useState } from "react";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import HsLogo_Image from "../../assets/images/HS Icon.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginAPI from "../../api/services/LoginApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!email) {
      tempErrors.email = "*Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "*Invalid email format";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "*Password is required";
      isValid = false;
    } else if (password.length < 4) {
      tempErrors.password = "*Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const apiData = {
      loginType: "admin",
      userName: email,
      password: password,
    };
    try {
      const responseData = await LoginAPI.signInAPI(apiData);
      if (responseData.apiStatus.code === "200") {
        setLoading(false);
        localStorage.setItem("userToken", responseData.responseData.token);
        localStorage.setItem(
          "userName",
          responseData.responseData.userDetail.userName
        );
        toast.success(responseData.apiStatus.message);
        navigate("/dashboard");
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };

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
                <h4 class="mb-2 text-start">Welcome to Hermon Solutions!</h4>
                <p class="mb-4 text-start">
                  Please sign-in to your account and start the adventure
                </p>

                <form
                  id="formAuthentication"
                  class="mb-3"
                  action="index.html"
                  method="POST"
                  onSubmit={handleAdminLogin}
                >
                  <div class="mb-3 text-start position-form">
                    <label for="email" class="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email-username"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autofocus
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="loading-position">
                    {loading && <span className="loader"></span>}
                  </div>
                  <div class="mb-3 form-password-toggle position-form">
                    <div class="d-flex justify-content-between">
                      <label class="form-label" for="password">
                        Password
                      </label>
                      <Link to={"/forget-password"}>
                        <small>Forgot Password?</small>
                      </Link>
                    </div>
                    <div class="input-group input-group-merge">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        name="password"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        aria-describedby="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span class="input-group-text cursor-pointer">
                        <i
                          className={`bx ${
                            showPassword ? "bx-show" : "bx-hide"
                          }`}
                          id="togglePassword"
                          onClick={togglePasswordVisibility}
                        ></i>
                      </span>
                      {errors.password && (
                      <div className="invalid-feedback text-start">{errors.password}</div>
                    )}
                    </div>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary d-grid w-100" type="submit">
                      Log in
                    </button>
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

export default Login;
