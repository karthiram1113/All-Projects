import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../createcss/create.css";
import Navbar from "../../shared/Header";
import DashboardLayout from "../../layouts/DashboardLayout";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../../api/api";

const AboutCreate = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [imgId, setImgId] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [aboutType, setAboutType] = useState("all");
  const [existingImage, setExistingImage] = useState(null); // For displaying existing image in edit mode
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Check if we're in edit mode
  const isEditMode = !!id;

  // Fetch About details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchAboutDetails();
    }
  }, [id]);

  const fetchAboutDetails = async () => {
    setLoading(true);
    try {
      const res = await LoginAPI.aboutGet(id);

      if (res.apiStatus.code === "200") {
        const about = res.result.aboutInfo;
        setHeading(about.heading);
        setDescription(about.description);
        setImgId(about.img_id);
        setStatus(about.activeStatus === "1");
        setAboutType(about.aboutType || "all");

        // Store existing image info for display
        if (about.path && about.altered_file_name) {
          setExistingImage({
            url: `${baseURL}${about.path}${about.altered_file_name}`,
            name: about.altered_file_name,
          });
        }
      } else {
        toast.error("Failed to load about details");
        navigate("/about/list");
      }
    } catch {
      toast.error("Something went wrong!");
      navigate("/about/list");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Upload Image ----------------
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setExistingImage(null);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await LoginAPI.aboutSingleBanner(formData);

      console.log("Image upload response:", response);

      if (response.apiStatus.code === "200") {
        setImgId(response.responseData.img_id);
        toast.success(response.responseData.message);
      } else {
        toast.error("Image upload failed");
        setImage(null);
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      toast.error("Image upload failed");
      setImage(null);
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
      aboutType,
      activeStatus: status ? "1" : "0",
    };

    // Add id for edit mode
    if (isEditMode) {
      apiData.id = id;
    }

    try {
      const response = isEditMode
        ? await LoginAPI.aboutUpdate(apiData)
        : await LoginAPI.aboutCreate(apiData);

      if (response.apiStatus.code === "200") {
        toast.success(
          isEditMode ? response.apiStatus.message : response.apiStatus.message
        );
        navigate("/about-list");
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
      navigate(`/about/view/${id}`);
    } else {
      setHeading("");
      setDescription("");
      setImgId("");
      setImage(null);
      setExistingImage(null);
      setStatus(true);
      setAboutType("all");
    }
  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <DashboardLayout />
          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y text-start">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>About – {isEditMode ? "Edit" : "Create"}</h4>

                  <button
                    type="button"
                    className="btn btn-secondary px-4 "
                    onClick={() => navigate("/about-list")}
                  >
                    Back
                  </button>
                </div>

                <div className="whole-container">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex gap-4 align-items-center">
                      {/* Heading Input */}
                      <div className="input-container" style={{ width: "20%" }}>
                        <input
                          id="heading"
                          className="input"
                          type="text"
                          placeholder=" "
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
                    </div>

                    {/* About Type */}

                    {/* Description */}
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

                    {/* Upload Image */}
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
                              {isEditMode ? "Change Image" : "Upload a File"}
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 mt-4 mt-md-0">
                          {/* Show newly uploaded image */}
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

                    {/* Status */}
                    <div style={{ marginTop: "30px" }}>
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
                      <label className="switch">
                        <input
                          className="ch"
                          type="checkbox"
                          checked={status}
                          onChange={() => setStatus(!status)}
                        />
                        <span className="slider"></span>
                      </label>
                      {/* <span className="ms-2">
                        {status ? "Active" : "Inactive"}
                      </span> */}
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 d-flex justify-content-end gap-3">
                      <button type="submit" className="btn btn-success px-4">
                        {isEditMode ? "Update" : "Submit"}
                      </button>
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

export default AboutCreate;
