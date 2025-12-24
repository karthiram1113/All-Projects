import React, { useState } from "react";
import LoginAPI from "../../api/services/LoginApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login_Field({ loading, setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState("");
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
      user_name: email,
      password: password,
    };
    try {
      const responseData = await LoginAPI.signInAPI(apiData);
      if (responseData.apiStatus.code === "200") {
        setLoading(true);
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
      setLoading(true);
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };
  return (
    <>
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
            style={{ backgroundColor: loading ? "rgb(0 0 0 / 15%)" : "", color: loading ? "white" : "" }}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
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
        {/* <div className="loading-position">
          {loading && (
            <svg class="loader">
              <rect class="boxes"></rect>
            </svg>
          )}
        </div> */}

        {/* {loading && (
            <svg className="loader">
              <rect className="boxes"></rect>
            </svg>
        )} */}
      
        <div class="mb-3 form-password-toggle position-form">
          <div class="d-flex justify-content-between">
            <label class="form-label" for="password">
              Password
            </label>
            {/* <Link to={"/forget-password"}>
              <small>Forgot Password?</small>
            </Link> */}
          </div>
          <div class="input-group input-group-merge">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              style={{ backgroundColor: loading ? "rgb(0 0 0 / 15%)" : "" , color: loading ? "white" : ""}}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
              aria-describedby="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span class="input-group-text cursor-pointer" style={{ backgroundColor: loading ? "rgb(0 0 0 / 18%)" : "" }}>
              <i
                className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}
                id="togglePassword"
                onClick={togglePasswordVisibility}
              ></i>
            </span>
            {errors.password && (
              <div className="invalid-feedback text-start">
                {errors.password}
              </div>
            )}
          </div>
        </div>
        <div class="mb-3">
          <button class="btn btn-primary d-grid w-100" type="submit">
            Log in
          </button>
        </div>
      </form>
    </>
  );
}

export default Login_Field;
