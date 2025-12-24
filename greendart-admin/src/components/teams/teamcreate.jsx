import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../createcss/create.css";
import Navbar from "../../shared/Header";
import DashboardLayout from "../../layouts/DashboardLayout";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../../api/api";

const Teamcreate = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [imgId, setImgId] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  // const [teamsType, setTeamsType] = useState("all");
  const [existingImage, setExistingImage] = useState(null); // For displaying existing image in edit mode
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Check if we're in edit mode
  const isEditMode = !!id;

  // Fetch project details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchTeamsDetails();
    }
  }, [id]);

  const fetchTeamsDetails = async () => {
    setLoading(true);
    try {
      const res = await LoginAPI.teamGet(id);

      if (res.apiStatus.code === "200") {
        const teams = res.responseData.TeamDetailsView;
        setName(teams.name);
        setRole(teams.role);
        setDescription(teams.description);
        setImgId(teams.img_id);
        setStatus(teams.active_status === "1");
        // setTeamsType(teams.teamsType || "all");

        // Store existing image info for display
        if (teams.imgData.path && teams.imgData.altered_file_name) {
          setExistingImage({
            url: `${baseURL}${teams.imgData.path}${teams.imgData.altered_file_name}`,
            name: teams.imgData.altered_file_name,
          });
        }
      } else {
        toast.error("Failed to load project details");
        navigate("/teams/list");
      }
    } catch {
      toast.error("Something went wrong!");
      navigate("/teams/list");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Upload Image ----------------
  // const handleUpload = async (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setImage(file);
  //   setExistingImage(null);

  //   const formData = new FormData();
  //   formData.append("main_image", file);

  //   try {
  //     const response = await LoginAPI.teamSingleBanner(formData);

  //     console.log("Image upload response:", response);

  //     if (response.apiStatus.code === "200") {
  //       setImgId(response.responseData.img_id);
  //       toast.success(response.apiStatus.message);
  //     } else {
  //       toast.error("Image upload failed");
  //       setImage(null);
  //     }
  //   } catch (error) {
  //     console.error("Image Upload Error:", error);
  //     toast.error("Image upload failed");
  //     setImage(null);
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    // setExistingImage(null);
  };

  // ---------------- Submit Form ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData and append the image
    const formData = new FormData();

    if (image) {
      formData.append("main_image", image);
    }
    //  else if (!isEditMode || (!image && !imgId)) {
    //   toast.error("Please upload an image");
    //   return;
    // }

    // Append other fields
    formData.append("name", name);
    formData.append("role", role);
    formData.append("description", description);
    formData.append("active_status", status ? "1" : "0");

    if (isEditMode) {
      formData.append("team_id", id);
      // formData.append("main_image", image);
      // formData.append("img_id", imgId); // existing image id
    }

    // If edit mode, append the id
    // if (isEditMode) {
    //   formData.append("id", id);
    //   // If no new image, keep the existing img_id
    //   if (!image && imgId) {
    //     formData.append("img_id", imgId);
    //   }
    // }

    // IMAGE VALIDATION
    if (!isEditMode && !image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const res = isEditMode
        ? await LoginAPI.teamUpdate(formData)
        : await LoginAPI.teamCreate(formData);

      if (res.apiStatus.code === "200") {
        toast.success(res.apiStatus.message);
        navigate("/teams-list");
      } else {
        toast.error(res.apiStatus.message);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!");
    }
  };

  // ---------------- Cancel/Reset ----------------
  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/teams/view/${id}`);
    } else {
      setRole("");
      setDescription("");
      setImgId("");
      setImage(null);
      setExistingImage(null);
      setStatus(true);
      // setTeamsType("all");
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
                  {/* <h4>Teams – {isEditMode ? "Edit" : "Create"}</h4> */}
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </li>
                      <li class="breadcrumb-item">
                        <a href="#">Teams</a>
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        {isEditMode ? "Update" : "Create"}
                      </li>
                    </ol>
                  </nav>

                  <button
                    type="button"
                    className="btn btn-secondary px-4 "
                    onClick={() => navigate("/teams-list")}
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
                          id="name"
                          className="input"
                          type="text"
                          placeholder=" "
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label className="label" htmlFor="heading">
                          Enter Name
                        </label>
                        <div className="topline"></div>
                        <div className="underline"></div>
                      </div>
                      <div className="input-container" style={{ width: "20%" }}>
                        <input
                          id="role"
                          className="input"
                          type="text"
                          placeholder=" "
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          required
                        />
                        <label className="label" htmlFor="heading">
                          Enter Role
                        </label>
                        <div className="topline"></div>
                        <div className="underline"></div>
                      </div>

                      {/* Project Type */}
                      <div
                        className="input-container"
                        style={{ width: "30%", marginLeft: "auto" }}
                      >
                        {/* <select
                          id="projectType"
                          className="input select-input"
                          value={teamsType}
                          onChange={(e) => setTeamsType(e.target.value)}
                          required
                        >
                          <option value="" disabled hidden></option>
                          <option value="all">All Teams</option>
                          <option value="ongoing">On-Going Teams</option>
                          <option value="upcoming">Upcoming Teams</option>
                          <option value="finished">Finished Teams</option>
                        </select> */}

                        {/* <label className="label" htmlFor="projectType">
                          Teams Type
                        </label> */}

                        <div className="topline"></div>
                        <div className="underline"></div>
                      </div>
                    </div>

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
                                onChange={handleImageChange}
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
                      {/* <label className="switch">
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

export default Teamcreate;
