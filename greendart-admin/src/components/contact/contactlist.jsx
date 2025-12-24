import React, { useEffect, useState } from "react";
import { Table, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import "../listcss/list.css";

// import BASE_URL from "../../../components/api/base_url";
// import END_POINT from "../../../components/api/end_point";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import Navbar from "../../shared/Header";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";
import { useNavigate, useParams } from "react-router-dom";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import DasherTippy from "../Common/dashertippy";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Contactlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  // ------------------------------
  // Fetch Contact List (POST + body)
  // ------------------------------

  const listContacts = async () => {

    const apiData = {
      pageIndex: 0,
      dataLength: 100,
    };

    try {
      const res = await LoginAPI.contactList(apiData);

      // const json = await res.json();

      if (res.apiStatus.code === "200") {
        setData(res.responseData.ContantList);
      } else {
        toast.error(res.apiStatus.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    listContacts();
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await LoginAPI.contactDelete(deleteId);

      if (res.apiStatus.code === "200") {
        toast.success(res.apiStatus.message);
        setDeleteModal(false);
        listContacts();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  //   // ------------------------------
  //   // Update Status Toggle
  //   // ------------------------------
  //   const updateStatus = async (id, status) => {
  //     try {
  //       const res = await LoginAPI.contactStatus(id, { active_status: status });

  // const json = await res.json();

  //       if (json.status) {
  //         toast.success("Status updated");
  //         fetchContacts();
  //       } else {
  //         toast.error("Failed to update");
  //       }
  //     } catch (error) {
  //       console.error("Error updating status:", error);
  //       toast.error("Error updating status");
  //     }
  //   };

  //   useEffect(() => {
  //     fetchContacts();
  //   }, []);

  return (
    <>
    <Helmet>
        <title>Contact | GreenDart</title>
      </Helmet>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <DashboardLayout />
          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y text-start">
                <h4>Contact List</h4>

                <div className="whole-container">
                  {loading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <Table striped className="table-custom table-borderless"
                      hover responsive>
                      <thead>
                        <tr>
                          <th className="fw-bold text-center">S.No</th>
                          <th className="fw-bold text-center">Name</th>
                          <th className="fw-bold text-center">Email</th>
                          <th className="fw-bold text-center">Phone Number</th>
                          <th className="fw-bold text-center">Message</th>
                          {/* <th>Status</th> */}
                          <th className="fw-bold text-center">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((item, index) => (
                          <tr key={item.id}>
                            <td className="text-center">{index+1}</td>
                            <td className="text-center">{item.Name}</td>
                            <td className="text-center">{item.Email}</td>
                            <td className="text-center">{item.Phone}</td>
                            <td className="text-center">{item.Message}</td>

                            <td
                              className="text-center"
                            >
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
                                  onClick={() => (navigate(`/contact/view/${item.id}`))}
                                >
                                  <IconEye size={20} />
                                </Button>
                              </OverlayTrigger>

                              {/* <DasherTippy content="Edit">
                                  <Button
                                    variant="ghost btn-icon"
                                    size="sm"
                                    className="rounded-circle"
                                    onClick={() => (navigate(`//edit/${item.id}`))}
                                  >
                                    <IconEdit size={16} />
                                  </Button>
                                </DasherTippy> */}

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

                            {/* <td>
                              <label className="switch">
                                <input
                                  className="ch"
                                  type="checkbox"
                                  checked={item.active_status === "1"}
                                //   onChange={(e) =>
                                //     updateStatus(item.id, e.target.checked ? 1 : 0)
                                //   }
                                />
                                <span className="slider"></span>
                              </label>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}

                  {/* ---------------- DELETE MODAL ---------------- */}
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
                        // className="modal-backdrop"
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

export default Contactlist;
