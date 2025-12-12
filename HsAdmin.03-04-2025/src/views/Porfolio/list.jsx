import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "../../assets/css/Login/page-auth.css";
import "../../assets/css/Login/perfect-scrollbar.css";
import "../../assets/css/Login/core.css";
import "../../assets/css/Login/theme-default.css";
import "../../assets/css/Login/demo.css";
import "../../assets/css/Dash/apex-charts.css";
import "../../assets/fonts/boxicons.css";
// import "./index.css";
import Footer from "../../shared/Footer";
import Navbar from "../../shared/Header";
import CaseStudy_Image from "../../assets/images/download.jpeg";
import CaseStudy_Image2 from "../../assets/images/case2.webp";
import CaseStudy_Image3 from "../../assets/images/case-3.jpeg";
import CaseStudy_Image4 from "../../assets/images/case4.webp";
import { Link } from "react-router-dom";

function Portfolio() {
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
                  <Link to={'/dashboard'}> <span class="text-muted fw-light">Dashboard /</span></Link> Portfolio
                </h4>
                <div class="card pb-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 class="card-header">Portfolio List</h5>
                    </div>
                    <div className="p-3">
                      <Link to={"/portfolio-form"}>
                        <button class="btn btn-primary">Add +</button>
                      </Link>
                    </div>
                  </div>
                  <div class="table-responsive text-nowrap">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>
                            {" "}
                            <i class="fab fa-react fa-lg text-info me-3"></i>{" "}
                            Title
                          </th>
                          <th>Image</th>
                          <th>Platform</th>
                          <th>Discription</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="border-top-0">
                        <tr>
                          <td>
                            <i class="fab fa-react fa-lg text-info me-3"></i>{" "}
                            <strong>React Project</strong>
                          </td>
                          <td>
                            <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                              <li
                                data-bs-toggle="tooltip"
                                data-popup="tooltip-custom"
                                data-bs-placement="top"
                                class="pull-up"
                                title="Lilian Fuller"
                              >
                                <img
                                  src={CaseStudy_Image2}
                                  alt="Avatar"
                                  width="70"
                                />
                              </li>
                            </ul>
                          </td>
                          <td>Barry Hunter</td>
                          <td>lorem100</td>
                          <td>
                            <div class="form-check form-switch mb-2">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="dropdown">
                              <button
                                type="button"
                                class="btn p-0 dropdown-toggle hide-arrow"
                                data-bs-toggle="dropdown"
                              >
                                <i class="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a
                                  class="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <i class="bx bx-show"></i> View
                                </a>

                                <Link
                                  to={"/portfolio-form"}
                                  class="dropdown-item"
                                >
                                  <i class="bx bx-edit-alt me-1"></i> Edit
                                </Link>
                                <a
                                  class="dropdown-item"
                                data-bs-toggle="modal" data-bs-target="#CaseStudyDelete"
                                >
                                  <i class="bx bx-trash me-1"></i> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i class="fab fa-vuejs fa-lg text-success me-3"></i>{" "}
                            <strong>VueJs Project</strong>
                          </td>
                          <td>
                            <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                              <li
                                data-bs-toggle="tooltip"
                                data-popup="tooltip-custom"
                                data-bs-placement="top"
                                class="pull-up"
                                title="Lilian Fuller"
                              >
                                <img
                                  src={CaseStudy_Image3}
                                  alt="Avatar"
                                  width="70"
                                />
                              </li>
                            </ul>
                          </td>
                          <td>Trevor Baker</td>
                          <td>lorem100</td>
                          <td>
                            <div class="form-check form-switch mb-2">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                                checked
                              />
                            </div>
                          </td>
                          <td>
                            <div class="dropdown">
                              <button
                                type="button"
                                class="btn p-0 dropdown-toggle hide-arrow"
                                data-bs-toggle="dropdown"
                              >
                                <i class="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a
                                  class="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <i class="bx bx-show"></i> View
                                </a>

                                <Link
                                  to={"/portfolio-form"}
                                  class="dropdown-item"
                                >
                                  <i class="bx bx-edit-alt me-1"></i> Edit
                                </Link>
                                <a
                                  class="dropdown-item"
                                data-bs-toggle="modal" data-bs-target="#CaseStudyDelete"
                                >
                                  <i class="bx bx-trash me-1"></i> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                            <strong>Bootstrap Project</strong>
                          </td>
                          <td>
                            <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                              <li
                                data-bs-toggle="tooltip"
                                data-popup="tooltip-custom"
                                data-bs-placement="top"
                                class="pull-up"
                                title="Lilian Fuller"
                              >
                                <img
                                  src={CaseStudy_Image4}
                                  alt="Avatar"
                                  width="70"
                                />
                              </li>
                            </ul>
                          </td>
                          <td>Jerry Milton</td>
                          <td>lorem100</td>
                          <td>
                            <div class="form-check form-switch mb-2">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="dropdown">
                              <button
                                type="button"
                                class="btn p-0 dropdown-toggle hide-arrow"
                                data-bs-toggle="dropdown"
                              >
                                <i class="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a
                                  class="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <i class="bx bx-show"></i> View
                                </a>

                                <Link
                                  to={"/portfolio-form"}
                                  class="dropdown-item"
                                >
                                  <i class="bx bx-edit-alt me-1"></i> Edit
                                </Link>
                                <a
                                  class="dropdown-item"
                                data-bs-toggle="modal" data-bs-target="#CaseStudyDelete"
                                >
                                  <i class="bx bx-trash me-1"></i> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i>{" "}
                            <strong>Angular Project</strong>
                          </td>
                          <td>
                            <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                              <li
                                data-bs-toggle="tooltip"
                                data-popup="tooltip-custom"
                                data-bs-placement="top"
                                class="pull-up"
                                title="Lilian Fuller"
                              >
                                <img
                                  src={CaseStudy_Image}
                                  alt="Avatar"
                                  width="70"
                                />
                              </li>
                            </ul>
                          </td>
                          <td>Albert Cook</td>
                          <td>lorem100</td>
                          <td>
                            <div class="form-check form-switch mb-2">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                                checked
                              />
                            </div>
                          </td>
                          <td>
                            <div class="dropdown">
                              <button
                                type="button"
                                class="btn p-0 dropdown-toggle hide-arrow"
                                data-bs-toggle="dropdown"
                              >
                                <i class="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a
                                  class="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <i class="bx bx-show"></i> View
                                </a>

                                <Link
                                  to={"/portfolio-form"}
                                  class="dropdown-item"
                                >
                                  <i class="bx bx-edit-alt me-1"></i> Edit
                                </Link>
                                <a
                                  class="dropdown-item"
                                data-bs-toggle="modal" data-bs-target="#CaseStudyDelete"
                                >
                                  <i class="bx bx-trash me-1"></i> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-end mt-3">
                      <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                          <a class="page-link">
                            <span>&laquo;</span>
                          </a>
                        </li>
                        <li class="page-item active">
                          <a class="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            4
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            5
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            <span>&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* View Popup */}
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5 " id="exampleModalLabel">
                            Portfolio Details
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="title" className="fw-bold">
                                Title
                              </label>
                              <p className="fst-italic" id="title">
                                React Project
                              </p>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="title" className="fw-bold">
                                {" "}
                                Platform
                              </label>
                              <p className="fst-italic" id="title">
                                React.jsx
                              </p>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="title" className="fw-bold mb-2">
                                Image
                              </label>
                              <div className="card">
                              <img src={CaseStudy_Image} alt="example" />
                              </div>
                            </div>

                            <div className="col-md-12 mt-2">
                              <label htmlFor="title" className="fw-bold">
                                {" "}
                                Discription
                              </label>
                              <p className="fst-italic" id="title">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Mollitia, at officia
                                perferendis sit atque accusamus eum molestias
                                rerum fuga ratione eaque soluta, tempora iste
                                reprehenderit laboriosam deleniti iure.
                                Officiis, earum unde. Pariatur dolorem
                                accusantium, expedita minima ad non doloremque
                                ipsum porro, incidunt eum at reiciendis quaerat
                                assumenda placeat ullam voluptatem!
                              </p>
                            </div>
                            <div className="col-md-12">
                              <label htmlFor="title" className="fw-bold">
                                Gallery Image
                              </label>
                              <div className="row mt-3">
                                <div className="col-md-4">
                                <div className="card">
                                <img src={CaseStudy_Image} alt="example"/>
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="card">
                                <img src={CaseStudy_Image2} alt="example" />
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="card">
                                <img src={CaseStudy_Image3} alt="example" /> 
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          {/* <button type="button" class="btn btn-primary">
                            Save changes
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Delete Popup */}
                  <div
                    class="modal fade"
                    id="CaseStudyDelete"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="staticBackdropLabel">
                            {/* Delete List */}
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body text-center">
                          <h4>Are You Sure</h4> <br />
                          <h6 className="mt-n4">You want to Delete the Data?</h6>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" class="btn btn-primary">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Portfolio;
