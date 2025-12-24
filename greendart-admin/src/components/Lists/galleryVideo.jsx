import React, { useEffect, useState } from "react";
import LoginAPI from "../../api/services/AdminLogin/adminlogin";
import { baseURL } from "../../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CaseStudy_Image from "../../assets/images/download.jpeg";
import CaseStudy_Image2 from "../../assets/images/case2.webp";
import CaseStudy_Image3 from "../../assets/images/case-3.jpeg";
import No_image from "../../assets/images/noimage.jpeg";
import { Pagination } from "react-bootstrap";

function GalleryVideo_Component() {
  const [list, setVideoList] = useState([]);
  const [id, setGetId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 5;
  const [loading, setLoading] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [platform, setPlatform] = useState("");
  const [Image, setImage] = useState("");
  const [MulImage, setMulImage] = useState([]);
  function stripHtmlTags(str) {
    if (!str) return "";
    return str.replace(/<[^>]*>/g, "");
  }
  
  // casestudy-list,

  const VideoList = async (page) => {
    setLoading(true);
    try {
      const responseData = await LoginAPI.videoList({
        pageIndex: page - 1,
        dataLength: recordsPerPage,
      });
      if (responseData.apiStatus.code === "200") {
        setVideoList(responseData.responseData.ContantList);
        setGetId(responseData.responseData.ContantList.id);
        const totalRecords = responseData.responseData.totalRecordCount;
        setTotalRecords(totalRecords);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch {
      toast.error("An error occurred while fetching the list.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    VideoList(currentPage);
  }, [currentPage]);

  // Pagination Method
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    let items = [];
    const maxPageNumbersToShow = 3;
    const halfRange = Math.floor(maxPageNumbersToShow / 2);

    let startPage, endPage;
    if (totalPages <= maxPageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfRange) {
      startPage = 1;
      endPage = maxPageNumbersToShow;
    } else if (currentPage + halfRange >= totalPages) {
      startPage = totalPages - maxPageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfRange;
      endPage = currentPage + halfRange;
    }

    if (startPage > 1) {
      items.push(
        <Pagination.Item
          key="1"
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }
      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  // Pagination Method end

  //delete,

  const handledelete = async () => {
    try {
      const response = await LoginAPI.videoDeleteAPI(id);
      if (response.apiStatus.code === "200") {
        toast.success(response.apiStatus.message);
        VideoList(currentPage);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while trying to delete the data.");
    }
  };

  // getapi,

  const GetApiUpdate = async (id) => {
    try {
      const response = await LoginAPI.videoGet(id);
      const data = response.responseData.ContentView;

      setGetId(data.id);
      setTitle(data.title);
      setDescription(data.description);
      setVideo(data.video);
    } catch {}
  };
  useEffect(() => {
    GetApiUpdate(id);
  }, []);

  // active,deactive

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await LoginAPI.videoActive(id);
      if (response?.apiStatus?.code === "200") {
        setVideoList((prevList) =>
          prevList.map((item) =>
            item.id === id
              ? {
                  ...item,
                  active_status: currentStatus === "1" ? "0" : "1",
                }
              : item
          )
        );
        toast.success(response?.apiStatus.message);
      } else {
        toast.error(response?.apiStatus?.message || "Status change failed");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("An error occurred while toggling status.");
    }
  };

  // truncate

  const [expandedItems, setExpandedItems] = useState({});
  const truncateText = (text, wordLimit, expandedLimit, id, key) => {
    if (!text) return "";
    const words = text.split(" ");

    if (words.length <= wordLimit || expandedItems[`${id}-${key}`]) {
      if (words.length > wordLimit && expandedItems[`${id}-${key}`]) {
        return (
          <>
            {words.slice(0, wordLimit).join(" ")}
            <br />
            {words.slice(wordLimit, expandedLimit).join(" ")}
          </>
        );
      }
      return text;
    }

    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const toggleExpand = (id, key) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${id}-${key}`]: !prev[`${id}-${key}`],
    }));
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center p-5">
          <span className="loader"></span>
        </div>
      ) : (
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <i class="fab fa-react fa-lg text-info me-3"></i>
                  Title
                </th>
                <th>Videos</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="border-top-0">
              {list?.length > 0 ? (
                list.map((value, index) => (
                  <tr key={index}>
                    <td>
                      <i class="fab fa-react fa-lg text-info me-3"></i>
                      <strong>{value.title}</strong>
                    </td>
                    <td>
                      <iframe
                        src={value.video.replace("/shorts/", "/embed/")}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </td>
                    <td>
                      {truncateText(
                        stripHtmlTags(value.description),
                        5,
                        12,
                        value.id,
                        "description"
                      )}
                      {stripHtmlTags(value.description).split(" ").length > 5 && (
                        <span
                          className="text-primary mt-1"
                          style={{
                            cursor: "pointer",
                            display: "block",
                          }}
                          onClick={() => toggleExpand(value.id, "description")}
                        >
                          {expandedItems[`${value.id}-description`] ? "Show less" : "Show more"}
                        </span>
                      )}
                    </td>

                    <td>
                      <div class="form-check form-switch mb-2">
                        <input
                          className="form-check-input cursor-pointer"
                          type="checkbox"
                          id={`switch-${value.id}`}
                          checked={value.active_status === "1"}
                          onChange={() =>
                            handleToggleStatus(value.id, value.active_status)
                          }
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
                            onClick={() => {
                              GetApiUpdate(value.id);
                            }}
                          >
                            <i class="bx bx-show"></i> View
                          </a>

                          <Link
                            to={`/galleryvideo-form/${value.id}`}
                            class="dropdown-item"
                          >
                            <i class="bx bx-edit-alt me-1"></i> Edit
                          </Link>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#CaseStudyDelete"
                            onClick={() => {
                              setGetId(value.id);
                            }}
                          >
                            <i class="bx bx-trash me-1"></i> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center table-list-nodata">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-end mt-3">
            <div className="store-pagination">
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {renderPaginationItems()}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </div>
        </div>
      )}
      {/* View Popup */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 " id="exampleModalLabel">
                Video Details
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
                    {title}
                  </p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="title" className="fw-bold">
                    Description
                  </label>
                  <p className="fst-italic" id="title">
                    {stripHtmlTags(description)}
                  </p>
                </div>
                <div className="col-md-12 mt-3">
                  <label htmlFor="video" className="fw-bold mb-2">
                    Video
                  </label>
                  <div className="ratio ratio-16x9">
                    <iframe
                      id="video"
                      src={video ? video.replace("shorts/", "embed/") : ""}
                      title="YouTube video"
                      allowFullScreen
                    ></iframe>
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
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handledelete()}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryVideo_Component;
