import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import Sidenav from '../sidenav/sidenav';
import './vendorlist.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { environment } from '../../../api/api';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Modal } from 'react-bootstrap';
import VENDORAPI from '../../../api/services/vendorLogin/vendorAPI';

function VendorList() {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0); // Added state for totalRecords
  const navigate = useNavigate();
  const recordsPerPage = 3;
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Added state for deleteId

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteId(id); // Set the id to be deleted
    setShow(true);
  };

  const fetchVendorList = async (page) => {
    setLoading(true);
    const apidata={
    pageIndex: page - 1,
    dataLength: 3
}
    try {
      const responseData = await VENDORAPI.vendorList(apidata);
      if (responseData.apiStatus.code === "200") {
        setList(responseData.result.VendorData);
        const totalRecords = responseData.result.totalRecords;
        setTotalRecords(totalRecords);
        setTotalPages(Math.ceil(totalRecords / recordsPerPage));

      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.error("Error fetching vendor list:", error);
      toast.error("An error occurred while fetching the vendor list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorList(currentPage);
  }, [currentPage]);

  //delete

  const handleDelete = async () => {
    // if (deleteId === null) return;
    // setLoading(true);
    try {
      const result = await VENDORAPI.vendorOrderDelete(deleteId);
      if (result.apiStatus.code === "200") {
        toast.success(result.apiStatus.message);
        fetchVendorList(currentPage); 
        handleClose(); 
      } else {
        toast.error(result.apiStatus.message);
      }
    } catch (error) {
      console.error("Error during vendor deletion:", error);
      toast.error("An error occurred while trying to delete the vendor.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Pagination Method
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
        <Pagination.Item key="1" active={1 === currentPage} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }
      items.push(
        <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidenav />
        <div style={{ paddingTop: "80px" }} className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fas fa-users menu-icon"></i>
                </span> Vendor List
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <button
                    onClick={() => navigate("/vendor/create")}
                    // style={{ float: "right", marginBottom: "20px" }}
                    type="button"
                    className="button"
                  >
                    <span className="button__text">Add</span>
                    {/* <span className="button__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        stroke="currentColor"
                        height="24"
                        fill="none"
                        className="svg"
                      >
                        <line y2="19" y1="5" x2="12" x1="12"></line>
                        <line y2="12" y1="12" x2="19" x1="5"></line>
                      </svg>
                    </span> */}
                  </button>
                </ul>
              </nav>
            </div>
            <div className="card">
              <div className="card-body over">
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "100vh",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      zIndex: 9999,
                    }}
                  >
                    <div className="spinner">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <table className="table table-hover tableHost">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Shop Name</th>
                          <th>Avatar</th>
                          <th>Shop Owner</th>
                          <th>Contact</th>
                          <th>Username</th>
                          <th>Shop Type</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((value, ind) => (
                          <tr key={value.id}>
                            <th scope="row">
                              {(currentPage - 1) * recordsPerPage + ind + 1}
                            </th>
                            <td>{value.shop_name}</td>
                            <td>
                              <img
                                src={value.avatar ? `${environment.baseURL}${value.avatar}` : "trty"}
                                alt="Product"
                                style={{ width: '50px', height: '50px' }}
                              />
                            </td>
                            <td>{value.shop_owner}</td>
                            <td>{value.contact}</td>
                            <td>{value.username}</td>
                            <td>{value.shop_type}</td>
                            <td>
                              <div
                                className={`badge ${
                                  value.status === "Active"
                                    ? "badge-success"
                                    : value.status === "Inactive"
                                    ? "badge-danger"
                                    : "badge-secondary"
                                }`}
                                style={{
                                  backgroundColor:
                                    value.status === "Active"
                                      ? "green"
                                      : value.status === "Inactive"
                                      ? "red"
                                      : "gray",
                                }}
                              >
                                {value.status}
                              </div>
                            </td>
                            <td className="clients">
                              <li>
                                <Link
                                  to={{ pathname: `/vendorview/${value.id}` }}
                                  className="eye"
                                >
                                  <i className="fa-solid fa-eye eye"></i>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/vendor/Edit/${value.id}`}
                                  className="edit"
                                >
                                  <i className="fa-regular fa-pen-to-square edit-font"></i>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="delete"
                                  onClick={() => handleShow(value.id)} // Pass id to handleShow
                                >
                                  <i className="fa-solid fa-trash delete-font"></i>
                                </Link>
                              </li>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                      <Pagination>
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                      </Pagination>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vendor Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='delete-btn' variant="primary" 
          onClick={handleDelete}
           >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VendorList;
