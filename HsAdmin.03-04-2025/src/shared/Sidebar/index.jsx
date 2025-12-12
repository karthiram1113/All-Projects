import React, { useState } from "react";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import "../../assets/css/Dash/apex-charts.css";
import "../../assets/fonts/boxicons.css";
import Logo_image from "../../assets/images/logo-hs.png";
import { Link, useLocation } from "react-router-dom";
import './index.css';

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  return (
    <>
     
    </>
  );
}

export default Sidebar;
