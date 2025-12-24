import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import Navbar from "../../shared/Header";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";
import { baseURL } from "../../api/api";

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const res = await LoginAPI.projectget(id);

      if (res.apiStatus.code === "200") {
        setViewData(res.result.projectInfo);
      } else {
        toast.error("Failed to load details");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <DashboardLayout />
        <div className="layout-page">
          <Navbar />

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y text-start">
              <div className="d-flex justify-content-between align-items-center mb-4">
                {/* <h4>View Project</h4> */}
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">Project</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      View
                    </li>
                  </ol>
                </nav>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/project-list")}
                >
                  Back
                </Button>
              </div>

              <div className="card">
                <div className="card-body">
                  {loading ? (
                    <p>Loading...</p>
                  ) : viewData ? (
                    <>
                      <img
                        src={`${baseURL}${viewData.path}${viewData.altered_file_name}`}
                        alt={viewData.heading}
                        className="img-fluid mb-4"
                        style={{
                          borderRadius: "10px",
                          maxHeight: "400px",
                          objectFit: "cover",
                        }}
                      />

                      <h3 className="mb-3">{viewData.heading}</h3>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: viewData.description,
                        }}
                      ></div>

                      <div className="mt-4 d-flex">
                        <strong>Status: </strong>
                        {/* <label className="switch">
                          <input
                            className="ch"
                            type="checkbox"
                            checked={viewData.activeStatus === "1"}
                            readOnly
                          />
                          <span className="slider"></span>
                        </label> */}
                        <label
                          className="switch"
                          style={{ marginLeft: "10px" }}
                        >
                          <input
                            type="checkbox"
                            checked={viewData.activeStatus === "1"}
                            readOnly
                          />

                          <div className="slider">
                            <div className="circle">
                              {/* Cross Icon */}
                              <svg
                                className="cross"
                                xmlSpace="preserve"
                                style={{ enableBackground: "new 0 0 512 512" }}
                                viewBox="0 0 365.696 365.696"
                                height="6"
                                width="6"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g>
                                  <path
                                    fill="currentColor"
                                    d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25z"
                                  />
                                </g>
                              </svg>

                              {/* Checkmark Icon */}
                              <svg
                                className="checkmark"
                                xmlSpace="preserve"
                                style={{ enableBackground: "new 0 0 512 512" }}
                                viewBox="0 0 24 24"
                                height="10"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g>
                                  <path
                                    fill="currentColor"
                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                  />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </label>
                      </div>
                    </>
                  ) : (
                    <p>No data found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
