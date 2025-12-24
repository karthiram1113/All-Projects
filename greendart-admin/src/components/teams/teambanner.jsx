import React, { Fragment, useState, useRef } from "react";
import "../bannercss/banner.css";
import Navbar from "../../shared/Header";
import DashboardLayout from "../../layouts/DashboardLayout";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";

const TeamBanner = () => {
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
      const res = await LoginAPI.teamBanner(formData);

      // const data = await res.json();

      if (res.apiStatus.code === "200") {
        alert(res.apiStatus.message);
        setPreview([]);
        setFiles([]);
      } else {
        alert("Upload failed. Check console.");
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

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y text-start">
              <h4>Banner for TeamsBanner – Upload Files</h4>

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

                        <img
                          src={img}
                          alt={`preview-${index + 1}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                          }}
                        />
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

                    <button onClick={handleSubmit} className="add-btn">
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

export default TeamBanner;
