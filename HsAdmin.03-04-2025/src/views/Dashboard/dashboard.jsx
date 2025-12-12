import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import "../../assets/css/Dash/apex-charts.css";
import "../../assets/fonts/boxicons.css";
import Dash_img from "../../assets/images/man-with-laptop-light.png";
import Dash_img1 from "../../assets/images/chart-success.png";
import Dash_img2 from "../../assets/images/wallet-info.png";
import Dash_img3 from "../../assets/images/cc-primary.png";
import Dash_img4 from "../../assets/images/paypal.png";
import Chart from "react-apexcharts";
import Footer from "../../shared/Footer";
import Navbar from "../../shared/Header";

function Dashboard() {
  
  return (
    <>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <DashboardLayout />

          <div class="layout-page">
            <Navbar />

            <div class="content-wrapper">
              <div class="container-xxl flex-grow-1 container-p-y">
                
              </div>
              <Footer />
              <div class="content-backdrop fade"></div>
            </div>
          </div>
        </div>

        <div class="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
}

export default Dashboard;
