import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import "../../create/input.css";

// import BASE_URL from "../../../components/api/base_url";
// import END_POINT from "../../../components/api/end_point";
import DashboardLayout from "../../layouts/DashboardLayout";
import Navbar from "../../shared/Header";
import "..//.//createcss/create.css";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";
import { baseURL } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Gallerycreate = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [imgId, setImgId] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [galleryType, setGalleryType] = useState("all");
  const [existingImage, setExistingImage] = useState(null); // For displaying existing image in edit mode
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  // const token = localStorage.getItem("token");

  // Fetch Gallery details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchGalleryDetails();
    }
  }, [id]);

  const fetchGalleryDetails = async () => {
    setLoading(true);
    try {
      const res = await LoginAPI.galleryGet(id);

      if (res.apiStatus.code === "200") {
        const project = res.result.galleryInfo;
        setHeading(project.heading);
        setDescription(project.description);
        setImgId(project.img_id);
        setStatus(project.activeStatus === "1");
        setGalleryType(project.projectType || "all");

        // Store existing image info for display
        if (project.path && project.altered_file_name) {
          setExistingImage({
            url: `${baseURL}${project.path}${project.altered_file_name}`,
            name: project.altered_file_name,
          });
        }
      } else {
        toast.error(res.apiStatus.message);
        navigate("/gallery/list");
      }
    } catch {
      toast.error("Something went wrong!");
      navigate("/gallery/list");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- IMAGE UPLOAD ----------------
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await LoginAPI.gallerySingleBanner(formData);

      // const result = await response.json();

      if (res.apiStatus.code === "200") {
        setImgId(res.responseData.img_id);
        toast.success(res.apiStatus.message);
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      alert("Image upload failed");
    }
  };

  // ---------------- Submit Form ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgId) {
      toast.error("Please upload an image");
      return;
    }

    const apiData = {
      heading,
      description,
      img_id: imgId,
      galleryType,
      activeStatus: status ? "1" : "0",
    };

    // Add id for edit mode
    if (isEditMode) {
      apiData.id = id;
    }

    try {
      const response = isEditMode
        ? await LoginAPI.galleryUpdate(apiData)
        : await LoginAPI.galleryCreate(apiData);

      if (response.apiStatus.code === "200") {
        toast.success(
          isEditMode ? response.apiStatus.message : response.apiStatus.message
        );
        navigate("/gallery-list");
      } else {
        toast.error(
          isEditMode ? response.apiStatus.message : response.apiStatus.message
        );
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!");
    }
  };

  // ---------------- Cancel/Reset ----------------
  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/gallery/view/${id}`);
    } else {
      setHeading("");
      setDescription("");
      setImgId("");
      setImage(null);
      setExistingImage(null);
      setStatus(true);
      setGalleryType("all");
    }
  };

  return (
    <>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <DashboardLayout />
          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y text-start">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  {/* <h4>Create Gallery Page</h4> */}
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </li>
                      <li class="breadcrumb-item">
                        <a href="#">Gallery</a>
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        {isEditMode ? "Update" : "Create"}
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="whole-container">
                  <form onSubmit={handleSubmit}>
                    {/* HEADING INPUT */}
                    <div className="input-container">
                      <input
                        id="heading"
                        className="input"
                        type="text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        required
                      />
                      <label className="label" htmlFor="heading">
                        Enter Heading
                      </label>
                      <div className="topline"></div>
                      <div className="underline"></div>
                    </div>

                    {/* DESCRIPTION */}
                    <div style={{ marginTop: "20px" }}>
                      <label className="fw-bold">Description</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onChange={(event, editor) =>
                          setDescription(editor.getData())
                        }
                      />
                    </div>

                    {/* IMAGE UPLOAD */}
                    <div style={{ marginTop: "30px" }}>
                      <label className="fw-bold">Upload Image</label>

                      <div className="row align-items-center">
                        <div className="col-md-6">
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
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                              />
                              Upload a File
                            </label>
                          </div>
                        </div>

                        {/* PREVIEW */}
                        <div className="col-md-6 mt-4 mt-md-0">
                          {image ? (
                            <div
                              className="p-3 border rounded shadow-sm d-flex align-items-center justify-content-between"
                              style={{
                                width: "100%",
                                height: "150px",
                                marginTop: "10px",
                                background: "rgba(240, 245, 240, 0.6)",
                                borderRadius: "15px",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />

                              <p className="mt-2 small mb-0 px-3 flex-grow-1">
                                {image.name}
                              </p>

                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ height: "35px" }}
                                onClick={() => {
                                  setImage(null);
                                  // Restore existing image ID if in edit mode
                                  if (isEditMode && existingImage) {
                                    // Keep the original imgId
                                  } else {
                                    setImgId("");
                                  }
                                }}
                              >
                                Remove
                              </button>

                              {/* <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ height: "35px" }}
                                onClick={() => setImage(null)}
                              >
                                Remove
                              </button> */}
                            </div>
                          ) : existingImage ? (
                            // Show existing image in edit mode
                            <div
                              className="p-3 border rounded shadow-sm d-flex align-items-center justify-content-between"
                              style={{
                                width: "100%",
                                height: "150px",
                                marginTop: "10px",
                                background: "rgba(240, 245, 240, 0.6)",
                                borderRadius: "15px",
                              }}
                            >
                              <img
                                src={existingImage.url}
                                alt="Current"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />

                              <p className="mt-2 small mb-0 px-3 flex-grow-1">
                                Current Image: {existingImage.name}
                              </p>
                            </div>
                          ) : (
                            <p className="text-muted">No image selected</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="d-flex" style={{ marginTop: "30px" }}>
                      <label>Status:</label>

                      {/* <label className="switch" style={{ marginLeft: "10px" }}>
                        <input
                          className="ch"
                          type="checkbox"
                          checked={status}
                          onChange={() => setStatus(!status)}
                        />
                        <span className="slider"></span>
                      </label> */}
                      <label className="switch" style={{ marginLeft: "10px" }}>
                        <input
                          type="checkbox"
                          checked={status}
                          onChange={() => setStatus(!status)}
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

                    {/* BUTTONS */}
                    <div className="mt-4 d-flex justify-content-center gap-3">
                      <button
                        type="button"
                        className="btn btn-secondary px-4 "
                        onClick={() => navigate("/gallery-list")}
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-success px-4">
                        Submit
                      </button>

                      {/* <button
                        type="button"
                        className="btn btn-secondary px-4"
                        onClick={() => {
                          setHeading("");
                          setDescription("");
                          setImgId("");
                          setImage(null);
                          setStatus(true);
                        }}
                      >
                        Cancel
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallerycreate;
