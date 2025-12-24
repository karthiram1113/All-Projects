import React, { useEffect, useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import DasherTippy from "../Common/dashertippy";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import "../listcss/list.css";
import { toast } from "react-toastify";
import LoginAPI from "../../api/services/LoginApi";
import { baseURL } from "../../api/api";
import Navbar from "../../shared/Header";
import DashboardLayout from "../../layouts/DashboardLayout";
import Footer from "../../shared/Footer";
import { useNavigate } from "react-router-dom";

const Aboutlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  const fetchList = async (pageIndex = 0) => {
    setLoading(true);
    const apiData = {
      pageIndex: pageIndex.toString(),
      dataLength: itemsPerPage.toString(),
    };

    try {
      const res = await LoginAPI.aboutList(apiData);

      if (res.apiStatus.code === "200") {
        setData(res.result.aboutInfo || []);
        setTotalItems(res.result.totalRecordCount || 0);
        console.log(
          "Current Page:",
          pageIndex + 1,
          "Total Records:",
          res.result.totalRecordCount
        );
      } else {
        toast.error("Failed to fetch list");
        setData([]);
        setTotalItems(0);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Something went wrong!");
      setData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching page:", currentPage);
    fetchList(currentPage - 1);
  }, [currentPage, itemsPerPage]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await LoginAPI.aboutDelete(deleteId);

      if (res.apiStatus.code === "200") {
        toast.success("Deleted successfully!");
        setDeleteModal(false);
        fetchList(currentPage - 1);
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const res = await LoginAPI.aboutActiveStatus(id);

      if (res.apiStatus.code === "200") {
        toast.success(res.apiStatus.message);
        fetchList(currentPage - 1);
      } else {
        toast.error("Status update failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // Pagination handlers
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setLoading(true);
    }
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    let items = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
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
    return items;
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>About List</h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/about-create")}
                  >
                    Add
                  </button>
                </div>
                <div className="whole-container">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <Table striped bordered hover responsive>
                        <thead className="bg-light">
                          <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Heading</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {data?.length > 0 ? (
                            data.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>

                                <td>
                                  <img
                                    src={`${baseURL}${item.path}${item.altered_file_name}`}
                                    width={70}
                                    height={50}
                                    style={{
                                      objectFit: "cover",
                                      borderRadius: "6px",
                                    }}
                                    alt={item.heading}
                                  />
                                </td>

                                <td>{item.heading}</td>

                                <td
                                  dangerouslySetInnerHTML={{
                                    __html: item.description,
                                  }}
                                ></td>

                                <td>
                                  <label className="switch">
                                    <input
                                      className="ch"
                                      type="checkbox"
                                      checked={item.activeStatus === "1"}
                                      onChange={() =>
                                        handleStatusToggle(
                                          item.id,
                                          item.activeStatus
                                        )
                                      }
                                    />
                                    <span className="slider"></span>
                                  </label>
                                </td>

                                <td
                                  className="d-flex gap-2"
                                  style={{
                                    height: "70px",
                                    alignItems: "center",
                                  }}
                                >
                                  <DasherTippy content="View">
                                    <Button
                                      variant="ghost btn-icon"
                                      size="sm"
                                      className="rounded-circle"
                                      onClick={() =>
                                        navigate(`/about/view/${item.id}`)
                                      }
                                    >
                                      <IconEye size={16} />
                                    </Button>
                                  </DasherTippy>

                                  <DasherTippy content="Edit">
                                    <Button
                                      variant="ghost btn-icon"
                                      size="sm"
                                      className="rounded-circle"
                                      onClick={() =>
                                        navigate(`/about/edit/${item.id}`)
                                      }
                                    >
                                      <IconEdit size={16} />
                                    </Button>
                                  </DasherTippy>

                                  <DasherTippy content="Delete">
                                    <Button
                                      variant="ghost btn-icon"
                                      size="sm"
                                      className="rounded-circle"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      <IconTrash size={16} />
                                    </Button>
                                  </DasherTippy>
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

                      {/* Pagination Section */}
                      {data?.length > 0 && (
                        <div className="d-flex justify-content-center mt-3">
                          <Pagination className="mb-0">
                            {/* <Pagination.First
                              onClick={() => handlePageChange(1)}
                              disabled={currentPage === 1}
                            /> */}
                            <Pagination.Prev
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            />

                            {renderPaginationItems()}

                            <Pagination.Next
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            />
                            {/* <Pagination.Last
                              onClick={() => handlePageChange(totalPages)}
                              disabled={currentPage === totalPages}
                            /> */}
                          </Pagination>
                        </div>
                      )}
                    </>
                  )}

                  {/* DELETE MODAL */}
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

                      <div
                        className="modal-backdrop"
                        onClick={() => setDeleteModal(false)}
                      ></div>
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

export default Aboutlist;
