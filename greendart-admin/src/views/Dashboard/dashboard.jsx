import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import "../../assets/css/Dash/apex-charts.css";
import "../../assets/fonts/boxicons.css";
import Dash_img1 from "../../assets/images/account.png";
import Dash_img2 from "../../assets/images/gallery.png";
import Dash_img3 from "../../assets/images/planning.png";
import Dash_img4 from "../../assets/images/contacts-book.png";
import Dash_img5 from "../../assets/images/social.png";
import Footer from "../../shared/Footer";
import Navbar from "../../shared/Header";
import LoginAPI from "../../api/services/LoginApi";
import { Helmet } from "react-helmet";

function Dashboard() {
  const [counts, setCounts] = useState({
    banner_count: 0,
    gallery_count: 0,
    our_team_count: 0,
    project_count: 0,
    contact_us_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  const fetchDashboardCounts = async () => {
    try {
      const response = await LoginAPI.count();
      if (response.apiStatus.code === "200") {
        setCounts(response.responseData);
      } else {
        throw new Error(response.apiStatus.message);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard counts:", err);
    } finally {
      setLoading(false);
    }
  };

  const iconStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#c8fad6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "0px !important",
  };

  const iconInnerStyle = {
    fontSize: "23px",
    color: "rgb(0, 167, 111)",
    marginRight: "0",
  };

  const countStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#566a7f",
    marginTop: "8px",
    marginBottom: "0px",
  };

  return (
    <>

    <Helmet>
        <title>Dashboard | GreenDart</title>
      </Helmet>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <DashboardLayout />

          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                {/* {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )} */}

                {/* <div className="row"> */}
                  <div className="row">
                    {/* Home Banner Card */}
                    <div className="col-4 mb-4">
                      <div className="card">
                        <div className="card-body text-start">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div
                              className="avatar flex-shrink-0"
                              style={iconStyle}
                            >
                              <i
                                className="menu-icon tf-icons bx bx-video"
                                style={iconInnerStyle}
                              ></i>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt4"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt4"
                              >
                                <a
                                  className="dropdown-item"
                                  href="/home-banner"
                                >
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <h3 style={countStyle}>{counts.banner_count}</h3>
                          <span className="fw-semibold d-block dashname mt-1">
                            Home Banner
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Gallery Card */}
                    <div className="col-4 mb-4">
                      <div className="card">
                        <div className="card-body text-start">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div
                              className="avatar flex-shrink-0"
                              style={iconStyle}
                            >
                              <i
                                className="menu-icon tf-icons bx bx-collection"
                                style={iconInnerStyle}
                              ></i>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt4"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt4"
                              >
                                <a
                                  className="dropdown-item"
                                  href="/gallery-list"
                                >
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <h3 style={countStyle}>{counts.gallery_count}</h3>
                          <span className="fw-semibold d-block dashname mt-1">
                            Gallery
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Project Card */}
                    <div className="col-4 mb-4">
                      <div className="card">
                        <div className="card-body text-start">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div
                              className="avatar flex-shrink-0"
                              style={iconStyle}
                            >
                              <i
                                className="menu-icon tf-icons bx bx-briefcase"
                                style={iconInnerStyle}
                              ></i>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt1"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="cardOpt1"
                              >
                                <a
                                  className="dropdown-item"
                                  href="/project-list"
                                >
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <h3 style={countStyle}>{counts.project_count}</h3>
                          <span className="fw-semibold d-block mt-1 dashname">
                            Project
                          </span>
                          
                        </div>
                      </div>
                    </div>

                    {/* Contact Us Card */}
                    <div className="col-4 mb-4">
                      <div className="card">
                        <div className="card-body text-start">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div
                              className="avatar flex-shrink-0"
                              style={iconStyle}
                            >
                              <i
                                className="menu-icon tf-icons bx bx-phone"
                                style={iconInnerStyle}
                              ></i>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt1"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="cardOpt1"
                              >
                                <a
                                  className="dropdown-item"
                                  href="/contact-list"
                                >
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <h3 style={countStyle}>{counts.contact_us_count}</h3>
                          <span className="fw-semibold d-block mt-1 dashname">
                            Contact Us
                          </span>
                          
                        </div>
                      </div>
                    </div>

                    {/* Teams Card */}
                    <div className="col-4 mb-4">
                      <div className="card">
                        <div className="card-body text-start">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div
                              className="avatar flex-shrink-0"
                              style={iconStyle}
                            >
                              <i
                                className="menu-icon tf-icons bx bx-group"
                                style={iconInnerStyle}
                              ></i>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt1"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="cardOpt1"
                              >
                                <a className="dropdown-item" href="/teams-list">
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <h3 style={countStyle}>{counts.our_team_count}</h3>
                          <span className="fw-semibold d-block mt-1 dashname">
                            Teams
                          </span>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                {/* </div> */}
              </div>
            </div>
            <Footer />
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>

      <div className="layout-overlay layout-menu-toggle"></div>
    </>
  );
}

export default Dashboard;
