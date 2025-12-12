import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";



function Page404() {


   const navigate = useNavigate();

   const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="page-404-container">
      <div className="page-404-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Oops! Page not found</h2>
        <p className="error-message">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to={""} onClick={handleBackClick} className="home-btn">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default Page404;
