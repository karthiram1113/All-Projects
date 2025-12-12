import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Malaysiacreate,
  MalaysiaUpdate,
  Sub_cate_dropdown,
  Spec_dropdown,
} from "../../service/apiserver";
import { environment } from "../../environment/environment";
import { API_URL } from "../../service/api-endpoint";
import { CKEditor } from "ckeditor4-react";
import "../../productlist/productlist.css";

function MLForm() {
  const navigate = useNavigate();
  const API_BASE_URL = environment.apiBaseUrl;
  const [productId, setProductId] = useState("");
  const [title, settitle] = useState("");
  const [list, setList] = useState([]);
  const [list1, setSpec] = useState([]);
  const [news_id, setNewsId] = useState("");
  const [sub_title, setsub_title] = useState("");
  const [description, setdescription] = useState("");
  const [news_category, setnews_category] = useState("news");
  const [news_sub_category, setnews_sub_category] = useState("");
  const [date, setdate] = useState("");
  const [tags, setdtags] = useState("");
  const [specification, setspecification] = useState("");
  const [news_reporter, setnews_reporter] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [video_link, setnews_video_link] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setValue(myArray[2]);
    console.log(myArray[3], "kkkkkkkk");

    setNewsId(myArray[3]);
    getMethod(myArray[3]);
    console.log(myArray[2], "s");
  }, []);

  //create

  const saveButton = async (e) => {
    e.preventDefault();

     let isValid = true;
            let errors = {};
        
            if (!title) {
              errors.title = "*Title is required.";
              isValid = false;
            }
            if (!sub_title) {
              errors.sub_title = "*Sub-title is required.";
              isValid = false;
            }
            if (!description) {
              toast.error("*Description is required.");
              isValid = false;
            }
            if (!video_link) {
              errors.video_link = "*Video link is required.";
              isValid = false;
            }
            if (!news_category) {
              errors.news_category = "*News category is required.";
              isValid = false;
            }
            if (!news_sub_category) {
              errors.news_sub_category = "*News sub-category is required.";
              isValid = false;
            }
            if (!date) {
              errors.date = "*Date is required.";
              isValid = false;
            }
            if (!tags) {
              errors.tags = "*Tags are required.";
              isValid = false;
            }
            if (!specification) {
              errors.specification = "*Specification is required.";
              isValid = false;
            }
            if (!news_reporter) {
              errors.news_reporter = "*Reporter name is required.";
              isValid = false;
            }
        
            setErrors(errors);
        
            if (!isValid) {
              return;
            }

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    setLoading(true);

    try {
      const responseData = await Malaysiacreate(
        title,
        sub_title,
        description,
        news_category,
        news_sub_category,
        date,
        tags,
        specification,
        news_reporter,
        image,
        video_link
      );

      if (responseData.apiStatus?.code === "200") {
        toast.success(
          responseData.apiStatus.message || "News created successfully!"
        );
        Navigate("/MalysiaNews-list/6");
      } else {
        toast.error(
          responseData.apiStatus.message || "Failed to create the News."
        );
      }
    } catch (error) {
      toast.error("An error occurred while creating the News.");
    } finally {
      setLoading(false);
    }
  };

  // update function
  const updateFunction = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updateStatus = currentStatus === "Active" ? 1 : 0;
    try {
      const responseData = await MalaysiaUpdate(
        news_id,
        title,
        sub_title,
        description,
        news_category,
        news_sub_category,
        date,
        tags,
        specification,
        news_reporter,
        image,
        video_link,
        updateStatus
      );

      if (responseData.apiStatus.code === "200") {
        toast.success(responseData.apiStatus.message);

        navigate("/MalysiaNews-list/6");
      } else {
        console.error("API response error:", responseData.apiStatus.message);
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.error("Error in updateFunction:", error);
      toast.error("An error occurred while updating the News.");
    } finally {
      setLoading(false);
    }
  };

  // image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // News-get method

  const getMethod = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_URL.tamilnaduGet}${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responceData = await response.json();
      const data = responceData.result.newsData;

      console.log(data, "data");
      setNewsId(data.news_id);
      settitle(data.title);
      setsub_title(data.sub_title);
      setdescription(data.description);
      setnews_category(data.category_slug);
      setnews_sub_category(data.sub_category_slug);
      setdate(data.date);
      setdtags(data.tags);
      setspecification(data.speciality_name);
      setnews_reporter(data.news_reporter);
      setnews_video_link(data.news_video_link);
      setCurrentStatus(
        data.publish_status == 0
          ? "Inactive"
          : "" || data.publish_status == 1
          ? "Active"
          : ""
      );
    } catch (errors) {
      console.error("Error handled =", errors);
    }
  };

  // dropdownlist,
  useEffect(() => {
    let multiTimeApiCall = false;

    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const responseData = await Sub_cate_dropdown(1);

        if (!multiTimeApiCall) {
          if (responseData.apiStatus.code === "200") {
            setList(responseData.result.subategoryData);
            console.log("Thaslim", responseData.result.subategoryData);
          } else {
            toast.error(responseData.apiStatus.message);
          }
        }
      } catch (error) {
        if (!multiTimeApiCall) {
          console.error("Error handled:", error);
          toast.error("An error occurred while fetching the News list.");
        }
      } finally {
        if (!multiTimeApiCall) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      multiTimeApiCall = true;
    };
  }, []);

  useEffect(() => {
    let multiTimeApiCall = false;

    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const responseData = await Spec_dropdown(0, 10);

        if (!multiTimeApiCall) {
          if (responseData.apiStatus.code === "200") {
            setSpec(responseData.result.SubcategoryData);
            console.log("Thaslim", responseData.result.SubcategoryData);
          } else {
            toast.error(responseData.apiStatus.message);
          }
        }
      } catch (error) {
        if (!multiTimeApiCall) {
          console.error("Error handled:", error);
          toast.error("An error occurred while fetching the News list.");
        }
      } finally {
        if (!multiTimeApiCall) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      multiTimeApiCall = true;
    };
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <form className="forms-sample" onSubmit={saveButton}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="productName">Title</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.title ? "border-danger" : ""
                  }`}
                  id="productName"
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                  placeholder="title"
                />
                {errors.title && (
                  <span className="text-danger">{errors.title}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cost">Reporter Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.news_reporter ? "border-danger" : ""
                  }`}
                  id="cost"
                  onChange={(e) => setnews_reporter(e.target.value)}
                  value={news_reporter}
                  placeholder="Reporter Name"
                />
                {errors.news_reporter && (
                  <span className="text-danger">{errors.news_reporter}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="img">Image</label>
                <input
                  type="file"
                  className={`form-control ${
                    errors.title ? "border-danger" : ""
                  }`}
                  id="img"
                  onChange={handleImageChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cost">Video Link</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.video_link ? "border-danger" : ""
                  }`}
                  id="cost"
                  onChange={(e) => setnews_video_link(e.target.value)}
                  value={video_link}
                  placeholder="Specification"
                />
                {errors.video_link && (
                  <span className="text-danger">{errors.video_link}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="cost">Tags</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.tags ? "border-danger" : ""
                  }`}
                  id="cost"
                  onChange={(e) => setdtags(e.target.value)}
                  value={tags}
                  placeholder="tags"
                />
                {errors.tags && (
                  <span className="text-danger">{errors.tags}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="categoryname">Sub-Title</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.sub_title ? "border-danger" : ""
                  }`}
                  id="categoryname"
                  onChange={(e) => setsub_title(e.target.value)}
                  value={sub_title}
                  placeholder="Sub-Title"
                />
                {errors.sub_title && (
                  <span className="text-danger">{errors.sub_title}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="subCategory">Sub Category</label>
                <select
                  className={`form-control ${
                    errors.news_sub_category ? "border-danger" : ""
                  }`}
                  id="subCategory"
                  onChange={(e) => setnews_sub_category(e.target.value)}
                  value={news_sub_category}
                  style={{ height: "47px", cursor: "pointer" }}
                >
                  <option value="">Select Sub Category</option>
                  {list.map((value, index) => (
                    <option key={index} value={value.sub_category_slug}>
                      {value.sub_category_slug}
                    </option>
                  ))}
                </select>
                {errors.news_sub_category && (
                  <span className="text-danger">
                    {errors.news_sub_category}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cost">Date</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.date ? "border-danger" : ""
                  }`}
                  id="cost"
                  onChange={(e) => setdate(e.target.value)}
                  value={date}
                  placeholder="Date"
                />
                {errors.date && (
                  <span className="text-danger">{errors.date}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subCategory">Specification</label>
                <select
                  className={`form-control ${
                    errors.specification ? "border-danger" : ""
                  }`}
                  id="subCategory"
                  onChange={(e) => setspecification(e.target.value)}
                  value={specification}
                  style={{ height: "47px", cursor: "pointer" }}
                >
                  <option value="">Select Specification</option>
                  {list1.map((value, index) => (
                    <option key={index} value={value.topic_name}>
                      {value.topic_name}
                    </option>
                  ))}
                </select>
                {errors.specification && (
                  <span className="text-danger">{errors.specification}</span>
                )}
              </div>

              {value === "Edit" && (
                <div>
                  <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="statusInput">Publish Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="statusInput"
                      onChange={(e) => setCurrentStatus(e.target.value)}
                      value={currentStatus}
                      placeholder="Hover to select status"
                      readOnly
                      style={{ cursor: "pointer" }}
                      onMouseOver={(e) => setShowDropdown(true)}
                      onMouseOut={(e) => setShowDropdown(false)}
                    />
                    {showDropdown && (
                      <ul
                        className="dropdown-menu"
                        style={{
                          display: "block",
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          zIndex: 1000,
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          listStyle: "none",
                          padding: "10px",
                          width: "100%",
                        }}
                        onMouseOver={() => setShowDropdown(true)}
                        onMouseOut={() => setShowDropdown(false)}
                      >
                        <li
                          style={{ padding: "2px", cursor: "pointer" }}
                          onClick={() => setCurrentStatus("Active")}
                        >
                          Active
                        </li>
                        <li
                          style={{ padding: "2px", cursor: "pointer" }}
                          onClick={() => setCurrentStatus("Inactive")}
                        >
                          Inactive
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <CKEditor
                  key={description}
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
                      ["NumberedList", "BulletedList", "Outdent", "Indent"],
                      ["JustifyLeft", "JustifyCenter", "JustifyRight"],
                      ["Styles", "Format", "Font", "FontSize"],
                    ],
                    resize_enabled: false,
                    removePlugins: "about",
                    ignoreUnsupportedBanner: true,
                  }}
                  initData={description}
                  onChange={(event) => setdescription(event.editor.getData())}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate("/MalysiaNews-list/6")}
          >
            Cancel
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {value === "Edit" ? (
            <button className="btn btn-primary" onClick={updateFunction}>
              update
            </button>
          ) : (
            <button onClick={saveButton} className="btn btn-primary">
              Create
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default MLForm;
