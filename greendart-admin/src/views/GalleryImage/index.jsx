import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import "../../assets/css/Dash/apex-charts.css";
import "../../assets/fonts/boxicons.css";
import "./index.css";
import Footer from "../../shared/Footer";
import Navbar from "../../shared/Header";
import { Link } from "react-router-dom";
import Casestudy_List from "../../components/Lists/galleryImage";

function Gallery_Image() {

  return (
    <>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <DashboardLayout />
          <div class="layout-page">
            <Navbar />
            <div class="content-wrapper">
              <div class="container-xxl flex-grow-1 container-p-y text-start">
                <h4 class="fw-bold py-3 mb-4">
                  <Link to={"/dashboard"}>
                    {" "}
                    <span class="text-muted fw-light">Dashboard /</span>
                  </Link>{" "}
                  Gallery Images
                </h4>
                <div class="card pb-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 class="card-header">Gallery Images</h5>
                    </div>
                    <div className="p-3">
                      <Link to={"/galleryimage-form"}>
                        <button class="btn btn-primary">Add +</button>
                      </Link>
                    </div>
                  </div>
                  
                  <Casestudy_List />

                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <div class="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
}

export default Gallery_Image;
