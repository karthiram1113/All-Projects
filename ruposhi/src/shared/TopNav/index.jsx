import React, { useEffect, useState } from "react";
import "./index.css";
import Logo from "../../assets/img/all/rup 500x500 png transparent.png";
import { NavLink } from "react-router-dom";

function TopNav() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Topbar */}
      <div className="container-fluid bg-light d-none d-lg-block">
        <div className="row align-items-center top-bar">
          <div className="col-lg-3 col-md-12 text-center text-lg-start">
            <a href="/" className="navbar-brand m-0 p-0">
              <img src={Logo} alt="" width="70" />
            </a>
          </div>
          <div className="col-lg-9 col-md-12 text-end">
            <div className="h-100 d-inline-flex align-items-center me-4">
              <i className="fa fa-map-marker-alt text-primary me-2"></i>
              <p className="m-0">123 Street, New York, USA</p>
            </div>
            <div className="h-100 d-inline-flex align-items-center me-4">
              <i className="far fa-envelope-open text-primary me-2"></i>
              <p className="m-0">info@example.com</p>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <a className="btn btn-sm-square bg-white text-primary me-1" href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-sm-square bg-white text-primary me-1" href="">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-sm-square bg-white text-primary me-1" href="">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="btn btn-sm-square bg-white text-primary me-0" href="">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="container-fluid nav-bar bg-light sticky-top shadow-sm">
        <nav
          className={`navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4 ${
            isSticky ? "container-fluid" : "container"
          }`}
        >
          <a
            href="/"
            className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none"
          >
             <img src={Logo} alt="" width="70" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav me-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/managed-it"
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
              >
                Managed IT
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/buy-tech"
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
              >
                Buy Tech
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
              >
                Contact
              </NavLink>
            </div>
            <div className="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center">
              <div
                className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                style={{ width: "45px", height: "45px" }}
              >
                <i className="fa fa-phone-alt text-primary"></i>
              </div>
              <div className="ms-3 text-start">
                <p className="mb-1 text-white">Get In Touch</p>
                <h5 className="m-0 text-secondary">+012 345 6789</h5>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default TopNav;
