import React, { useEffect, useRef, useState } from "react";
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
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginAPI from "../../api/services/AdminLogin/adminlogin";
import { toast } from "react-toastify";
import { CKEditor } from "ckeditor4-react";

function _Form() {
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [categorydrop, setCategoryDropdown] = useState([]);
  const [platformdrop, setPlateformDropdown] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState("");
  const [getid, setGetId] = useState("");
  const Navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [subcategorydrop, setsubCategoryDropdown] = useState([]);
  const editorInstanceRef = useRef(null);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [editorReady, setEditorReady] = useState(true);
  const [editloading, seteditLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setMainImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // getid params,

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setGetId(myArray[2]);
    GetApiUpdate(myArray[2]);
  }, []);

  // create,

  const PortfolioCreate = async () => {
    setSubmit(true);
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (mainImage) {
      formData.append("main_image", mainImage.file);
      console.log("main image", mainImage.file);
    }

    // galleryImages.forEach((img, index) => {
    //   formData.append(`gallary_image[${index}]`, img.file);
    //   console.log(`gallery image [${index}]`, img.file);
    // });

    try {
      const response = await LoginAPI.mediaCreate(formData);
      if (response.apiStatus.code === "200") {
        toast.success(response.apiStatus.message);
        Navigate("/gallery-media");
      } else {
        toast.error(response.apiStatus.message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    processGalleryFiles(files);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    processGalleryFiles(files);
  };

  const processGalleryFiles = (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const imagePreviews = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryImages((prev) => [...prev, ...imagePreviews]);
  };

  // getapi,

  const GetApiUpdate = async (id) => {
    seteditLoading(true);
    try {
      const response = await LoginAPI.mediaGet(id);
      const data = response.responseData.MediaView;

      setGetId(data.id);
      setTitle(data.title);
      setDescription(data.description);
      // setPlatform(data.platform_name);
      setCurrentStatus(
        data.active_status == 0
          ? "Inactive"
          : "" || data.active_status == 1
          ? "Active"
          : ""
      );
      setHasUserTyped(false);
      seteditLoading(false);
    } catch {
      seteditLoading(false);
    }
  };

  // update,

  const portfolioUpdate = async () => {
    const updateStatus = currentStatus === "Active" ? 1 : 0;

    const formData = new FormData();
    formData.append("media_id", getid);
    // formData.append("category_id", category);
    // formData.append("sub_category_id", subCategory);
    // formData.append("platform_id", platform);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("active_status", updateStatus);

    if (mainImage && mainImage.file) {
      formData.append("main_image", mainImage.file);
    }

    // galleryImages.forEach((img, index) => {
    //   formData.append(`gallary_image[${index}]`, img.file);
    // });

    try {
      const response = await LoginAPI.mediaUpdate(formData);

      if (response.apiStatus.code === "200") {
        toast.success(response.apiStatus.message);
        Navigate("/gallery-media");
      } else {
        toast.error(response.apiStatus.message);
      }
    } catch {
      toast.error("An error occurred while updating the News.");
    }
  };
  useEffect(() => {
    if (editorInstanceRef.current && !hasUserTyped && description !== undefined) {
      editorInstanceRef.current.setData(description);
    }
  }, [description,hasUserTyped]);
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
                  <Link to={"/gallery-media"}>
                    <span class="text-muted fw-light">Gallery Media /</span>
                  </Link>{" "}
                  {getid ? <span>Update</span> : <span>Create</span>}
                </h4>
                {editloading ? (
                  <div className="d-flex justify-content-center p-5">
                    <span className="loader"></span>
                  </div>
                  ) : (
                  <>
                <div class="card p-4">
                  <div className="row">
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
                        value={title}
                        style={
                          submit && title.length == 0
                            ? { borderColor: "red" }
                            : { borderColor: "" }
                        }
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {submit && title.length == 0 ? (
                        <div className="text-danger error-message-required">
                          *Title is required{" "}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label for="formFile" class="form-label">
                        Image
                      </label>
                      <input
                        class="form-control"
                        // style={
                        //   submit && image.length == 0
                        //     ? { borderColor: "red" }
                        //     : { borderColor: "" }
                        // }
                        type="file"
                        id="formFile"
                        onChange={handleFileChange}
                      />
                      {/* {submit && image.length == 0 ? (
                        <div className="text-danger error-message-required">
                          *Image is required{" "}
                        </div>
                      ) : (
                        <></>
                      )} */}
                    </div>
                    <div className="col-md-6 mt-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Description
                      </label>
                      {editorReady && (
                        <CKEditor
                          config={{
                            toolbar: [
                              [
                                "Bold",
                                "Italic",
                                "Underline",
                                "Strike",
                                "Image",
                                "Table",
                                "Link",
                                "Unlink",
                                "Anchor",
                              ],
                              [
                                "NumberedList",
                                "BulletedList",
                                "Outdent",
                                "Indent",
                              ],
                              ["JustifyLeft", "JustifyCenter", "JustifyRight"],
                              ["Styles", "Format", "Font", "FontSize"],
                            ],
                            versionCheck: false,
                            resize_enabled: false,
                            removePlugins: "about",
                            ignoreUnsupportedBanner: true,
                          }}
                          onInstanceReady={(event) => {
                            editorInstanceRef.current = event.editor;
                            if (description) {
                              event.editor.setData(description);
                            }
                          }}
                          onChange={(event) => {
                            setHasUserTyped(true);
                            setDescription(event.editor.getData());
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {getid && (
                      <div>
                        <div className="mt-2">
                          <label for="largeSelect" class="form-label">
                            Status
                          </label>
                          <div class="form-check form-switch mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              checked={currentStatus === "Active"}
                              onChange={(e) =>
                                setCurrentStatus(
                                  e.target.checked ? "Active" : "Inactive"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="d-flex gap-2 justify-content-center mt-3">
                    <Link to={"/gallery-media"}>
                      <button className="btn btn-secondary">Cancel</button>
                    </Link>
                    {getid ? (
                      <button
                        className="btn btn-primary"
                        onClick={portfolioUpdate}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={PortfolioCreate}
                      >
                        Create
                      </button>
                    )}
                  </div>
                </div>
                </>
                )}
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

export default _Form;
