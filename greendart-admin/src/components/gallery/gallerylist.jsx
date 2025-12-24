import React, { useEffect, useState } from "react";
import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import DasherTippy from "../Common/dashertippy";
import "../listcss/list.css";
import { toast } from "react-toastify";
import {
  IconEdit,
  IconEye,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Navbar from "../../shared/Header";
import Footer from "../../shared/Footer";
import { useNavigate } from "react-router-dom";
import LoginAPI from "../../api/services/LoginApi";
import { baseURL } from "../../api/api";
import { Helmet } from "react-helmet";

const Gallerylist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [expanded, setExpanded] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const fetchList = async (pageIndex = 0) => {
    const apiData = {
      pageIndex: pageIndex,
      dataLength: itemsPerPage,
    };

    try {
      const res = await LoginAPI.galleryList(apiData);

      if (res.apiStatus.code === "200") {
        setData(res.result.galleryInfo);
        // Assuming the API returns total count - adjust based on your API response
        setTotalItems(res.result.totalCount || res.result.galleryInfo.length);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(currentPage - 1);
  }, [currentPage]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await LoginAPI.galleryDelete(deleteId);

      if (res.apiStatus.code === "200") {
        toast.success(res.apiStatus.message);
        setDeleteModal(false);
        fetchList(currentPage - 1);
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const res = await LoginAPI.galleryStatus(id);

      if (res.apiStatus.code === "200") {
        toast.success(res.apiStatus.message);
        fetchList(currentPage - 1);
      } else {
        toast.error("Status update failed");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalItems > itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpanded(null); // Reset expanded state when changing pages
  };

  return (
    <>
      <Helmet>
        <title>Gallery | GreenDart</title>
      </Helmet>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <DashboardLayout />
          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y text-start">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>Gallery List</h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/gallery-create")}
                  >
                    Add
                  </button>
                </div>

                <div className="whole-container" style={{ padding: loading ? "0px" : ""}}>
                
                  <div
                    style={{
                      color: "black",
                      width: "100%",
                      height: "100%",
                      backdropFilter: "blur(4px)",
                      backgroundColor: "rgba(255, 255, 255, 0.85)",
                      display: "flex",
                      flexDirection: "column",    
                      justifyContent: "center",    
                      alignItems: "center",        
                      textAlign: "center",            
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      width={250}
                      height={250}
                    >
                      <source
                        src={require("../../assets/images/animation-loader.webm")}
                        type="video/webm"
                      />
                    </video>

                    <span style={{ fontWeight: "700", fontSize: "15px" }}>
                      Loading.....
                    </span>
                  </div>
                  {loading ? (
                    <div
                      style={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgb(0 0 0 / 15%)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <video
                        marginTop={"197px"}
                        autoPlay
                        loop
                        muted
                        playsInline
                        width={200}
                        height={200}
                      >
                        <source
                          src={require("../../assets/images/animation-loader.webm")}
                          type="video/webm"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <>
                      <Table
                        striped
                        className="table-custom table-borderless"
                        hover
                        responsive
                      >
                        <thead>
                          <tr>
                            <th className="fw-bold text-center">S.no</th>
                            <th className="fw-bold text-center">Image</th>
                            <th className="fw-bold text-center">Heading</th>
                            <th className="fw-bold text-center">Description</th>
                            <th className="fw-bold text-center">Status</th>
                            <th className="fw-bold text-center">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {data?.length > 0 ? (
                            data.map((item, index) => (
                              <tr key={item.id}>
                                <td className="text-center">
                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>

                                <td className="text-center">
                                  <img
                                    src={`${baseURL}${item.path}${item.altered_file_name}`}
                                    alt={item.heading}
                                    width={70}
                                    height={50}
                                    style={{
                                      objectFit: "cover",
                                      borderRadius: "6px",
                                    }}
                                  />
                                </td>

                                <td className="text-center">{item.heading}</td>

                                <td className="txt-just w-25" key={index}>
                                  <div
                                    style={{
                                      display: "-webkit-box",
                                      WebkitLineClamp:
                                        expanded === index ? "unset" : 1,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  />
                                  <span
                                    className="text-primary mt-1 fw-bold text-end"
                                    onClick={() =>
                                      setExpanded(
                                        expanded === index ? null : index
                                      )
                                    }
                                    style={{
                                      cursor: "pointer",
                                      display: "block",
                                    }}
                                  >
                                    {expanded === index
                                      ? "Show less"
                                      : "Show more"}
                                  </span>
                                </td>

                                <td className="text-center">
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={item.activeStatus === "1"}
                                      onChange={() =>
                                        handleStatusToggle(
                                          item.id,
                                          item.activeStatus
                                        )
                                      }
                                    />

                                    <div className="slider">
                                      <div className="circle">
                                        <svg
                                          className="cross"
                                          xmlSpace="preserve"
                                          style={{
                                            enableBackground: "new 0 0 512 512",
                                          }}
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

                                        <svg
                                          className="checkmark"
                                          xmlSpace="preserve"
                                          style={{
                                            enableBackground: "new 0 0 512 512",
                                          }}
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
                                </td>

                                <td className="text-center">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip className="tooltip-view">
                                        View
                                      </Tooltip>
                                    }
                                  >
                                    <Button
                                      variant="ghost btn-icon"
                                      size="sm"
                                      className="rounded-circle table-icon-btn view"
                                      onClick={() =>
                                        navigate(`/gallery/view/${item.id}`)
                                      }
                                    >
                                      <IconEye size={20} />
                                    </Button>
                                  </OverlayTrigger>

                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip className="tooltip-update">
                                        Update
                                      </Tooltip>
                                    }
                                  >
                                    <Button
                                      variant="ghost btn-icon"
                                      size="sm"
                                      className="rounded-circle table-icon-btn edit"
                                      onClick={() =>
                                        navigate(`/gallery/edit/${item.id}`)
                                      }
                                    >
                                      <IconEdit size={20} />
                                    </Button>
                                  </OverlayTrigger>

                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip className="tooltip-delete">
                                        Delete
                                      </Tooltip>
                                    }
                                  >
                                    <Button
                                      variant="ghost btn-icon"
                                      size="sm"
                                      className="rounded-circle table-icon-btn delete"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      <IconTrash size={20} />
                                    </Button>
                                  </OverlayTrigger>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      {/* Pagination */}
                      {showPagination && (
                        <div className="d-flex justify-content-end align-items-center mt-3 mb-3">
                          <nav>
                            <ul className="pagination mb-0">
                              <li
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageChange(currentPage - 1)
                                  }
                                  disabled={currentPage === 1}
                                >
                                  <IconChevronLeft size={16} />
                                </button>
                              </li>

                              {[...Array(totalPages)].map((_, index) => (
                                <li
                                  key={index + 1}
                                  className={`page-item ${
                                    currentPage === index + 1 ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageChange(index + 1)}
                                  >
                                    {index + 1}
                                  </button>
                                </li>
                              ))}

                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageChange(currentPage + 1)
                                  }
                                  disabled={currentPage === totalPages}
                                >
                                  <IconChevronRight size={16} />
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      )}
                    </>
                  )}

                  {/* Delete Modal */}
                  {deleteModal && (
                    <div className="modal" style={{ display: "block" }}>
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button
                              className="btn-close"
                              onClick={() => setDeleteModal(false)}
                            ></button>
                          </div>

                          <div className="modal-body">
                            <p>Are you sure you want to delete this item?</p>
                          </div>

                          <div className="modal-footer">
                            <Button
                              variant="secondary"
                              onClick={() => setDeleteModal(false)}
                            >
                              Cancel
                            </Button>
                            <Button variant="danger" onClick={confirmDelete}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div onClick={() => setDeleteModal(false)}></div>
                    </div>
                  )}
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

export default Gallerylist;
