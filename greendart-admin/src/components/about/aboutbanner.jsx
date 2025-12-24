import React, { Fragment, useState, useRef } from "react";
import "../bannercss/banner.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import Navbar from "../../shared/Header";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";

const AboutBanner = () => {
  const [preview, setPreview] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // const token = localStorage.getItem("token");

  const handleUpload = (e) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...urls]);

    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {
      const res = await LoginAPI.aboutBanner(formData);

      // const data = await res.json();

      if (res.apiStatus.code === "200") {
        alert(res.apiStatus.message);
        setPreview([]);
        setFiles([]);
      } else {
        alert("Upload failed.");
        console.log("Error:", res);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <DashboardLayout />
        <div className="layout-page">
          <Navbar />

          <div class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y">
              <h1 style={{ marginBottom: "60px" }}>
                Banner for About Banner – Upload Images
              </h1>
              <div className="whole-container">

                {/* Upload UI */}
                <div className="container">
                  <div className="folder">
                    <div className="front-side">
                      <div className="tip"></div>
                      <div className="cover"></div>
                    </div>
                    <div className="back-side cover"></div>
                  </div>

                  <label className="custom-file-upload">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleUpload}
                    />
                    Upload File
                  </label>
                </div>

                {/* Image Preview */}
                {preview.length > 0 && (
                  <div className="preview-box">
                    {preview.map((img, index) => (
                      <div key={index} className="preview-item">
                        <span className="preview-number">{index + 1}</span>

                        <button
                          className="remove-icon"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>

                        <img src={img} alt={`preview-${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Buttons */}
                {preview.length > 0 && (
                  <>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="add-btn"
                    >
                      Add
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="add-btn"
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
