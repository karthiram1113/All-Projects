import React, { useState } from "react";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import "../../assets/css/Dash/apex-charts.css";
import "../../assets/fonts/boxicons.css";
import brand_logo from "../../assets/images/brand_logo.png";
import { Link, useLocation } from "react-router-dom";

import "./index.css";

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const isNewsActive = ["/galleryimage-form"].includes(location.pathname);
  const isNewsActive1 = ["/galleryvideo-form"].includes(location.pathname);
  const isNewsActive2 = ["/gallerymedia-form"].includes(location.pathname);

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const isPathActive = (paths) => {
    return paths.includes(location.pathname);
  };

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme h-100"
      >
        <div className="app-brand demo mb-3">
          <Link to={"/dashboard"} className="app-brand-link">
            <img src={brand_logo} alt="Brand Logo" width="200" />
          </Link>

          <a
            href="javascript:void(0);"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          {/* Dashboard */}
          <li
            className={`menu-item mt-2 ${
              activeItem === "/dashboard" ? "active" : ""
            }`}
          >
            <Link
              to="/dashboard"
              className="menu-link"
              onClick={() => setActiveItem("/dashboard")}
            >
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </Link>
          </li>

          <li
            className={`menu-item mt-2 ${
              location.pathname.startsWith("/home") ? "active" : ""
            }`}
          >
            <Link to="/home/bannerList" className="menu-link">
              <i className="menu-icon tf-icons bx bx-image"></i>
              <div data-i18n="List ">Home Banner</div>
            </Link>
          </li>

          <li
            className={`menu-item mt-2 ${
              location.pathname.startsWith("/gallery") ? "active" : ""
            }`}
          >
            <Link to="/gallery-list" className="menu-link">
              <i className="menu-icon tf-icons bx bx-collection"></i>
              <div data-i18n="List">Gallery</div>
            </Link>
          </li>

          <li
            className={`menu-item mt-2 ${
              location.pathname.startsWith("/project") ? "active" : ""
            }`}
          >
            <Link to="/project-list" className="menu-link">
              <i className="menu-icon tf-icons bx bx-briefcase"></i>
              <div data-i18n="List">Project</div>
            </Link>
          </li>

          <li
            className={`menu-item mt-2 ${
              location.pathname.startsWith("/teams") ? "active" : ""
            }`}
          >
            <Link to="/teams-list" className="menu-link">
              <i className="menu-icon tf-icons bx bx-group"></i>
              <div data-i18n="List">Teams</div>
            </Link>
          </li>

          <li
            className={`menu-item mt-2 ${
              location.pathname.startsWith("/contact") ? "active" : ""
            }`}
          >
            <Link to="/contact-list" className="menu-link">
              <i className="menu-icon tf-icons bx bx-phone"></i>
              <div data-i18n="List">Contact Us</div>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
