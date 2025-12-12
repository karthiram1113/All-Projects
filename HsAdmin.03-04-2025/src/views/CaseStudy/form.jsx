import React, { useState } from "react";
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

function CaseStudy_Form() {
  const [images, setImages] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const imagePreviews = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const preventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

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
                  <Link to={"/casestudy"}>
                    <span class="text-muted fw-light">Case study /</span>
                  </Link>{" "}
                  Create
                </h4>
                <div class="card p-4">
                  {/* <h5>Create CaseStudy</h5> */}
                  <div className="row">
                    <div className="col-md-6">
                      <label for="defaultFormControlInput" class="form-label">
                        Category
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="defaultFormControlInput"
                        placeholder="Category Name"
                        aria-describedby="defaultFormControlHelp"
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="defaultFormControlInput" class="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="defaultFormControlInput"
                        placeholder="Project Title"
                        aria-describedby="defaultFormControlHelp"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label for="formFile" class="form-label">
                        Image
                      </label>
                      <input class="form-control" type="file" id="formFile" />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label for="defaultFormControlInput" class="form-label">
                        Platform
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="defaultFormControlInput"
                        placeholder="Platform"
                        aria-describedby="defaultFormControlHelp"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label for="largeSelect" class="form-label">
                        Gallery Image
                      </label>
                      <div
                        className="case-study-drop"
                        style={{
                          backgroundColor: "#f8f9fa",
                          cursor: "pointer",
                        }}
                        onDragOver={preventDefaults}
                        onDragEnter={preventDefaults}
                        onDrop={handleDrop}
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                      >
                        <p className="mb-0">
                          Drag & drop images here or click to select
                        </p>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          multiple
                          className="d-none"
                          onChange={handleFileSelect}
                        />
                      </div>

                      {images.length > 0 && (
                        <div className="mt-3 row">
                          {images.map((image, index) => (
                            <div key={index} className="col-md-3 mb-3">
                              <img
                                src={image.preview}
                                alt="Preview"
                                className="img-fluid rounded shadow"
                                style={{ width: "100%", height: "auto" }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 mt-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Discription
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="2"
                      ></textarea>
                      <div className="mt-2">
                      <label for="largeSelect" class="form-label">
                        Status
                      </label>
                      <div class="form-check form-switch mb-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                      </div>
                    </div>
                    </div>
                    
                  </div>
                  <div className="d-flex gap-2 justify-content-center mt-3">
                    <Link to={"/casestudy"}>
                      <button className="btn btn-secondary">Cancel</button>
                    </Link>
                    <button className="btn btn-primary">Add</button>
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

export default CaseStudy_Form;
