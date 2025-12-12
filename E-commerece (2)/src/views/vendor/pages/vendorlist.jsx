import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../../shared/vendor/Navbar/navbar';
import Sidenav from '../../../shared/vendor/Sidenav/sidenav';
import './vendorlist.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { environment } from '../../../api/api';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import VENDORAPI from '../../../api/services/vendorLogin/vendorAPI';
import Footer from '../../../shared/footer';
import ModalWrapper from '../../../components/ModalWrapper';
import { useOverflowDetector } from '../../../components/useOverflowDetector';
import Preloader from '../../../components/Preloader';
import NoDataFounded from '../../../components/NoDataFound';

function VendorList() {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0); // Added state for totalRecords
  const navigate = useNavigate();
  const recordsPerPage = 10;
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Added state for deleteId
   const deleteIdRef = useRef(null)
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteId(id); // Set the id to be deleted
    setShow(true);
  };

  const fetchVendorList = async (page) => {
    setLoading(true);
    const totken = localStorage.getItem("token");
    if (!totken) {
      navigate("/vendorlogin");
      return;
    }
    const apidata={
    pageIndex: page - 1,
      dataLength: recordsPerPage
}
    try {
      const responseData = await VENDORAPI.vendorList(apidata);
      if (responseData.apiStatus.code === "200") {
        setList(responseData.result.VendorData);
        const totalRecords = responseData.result.totalRecordCount;
        setTotalRecords(totalRecords);
        setTotalPages(Math.ceil(totalRecords / recordsPerPage));
        console.log(totalPages,"vvvvvvvv");
        

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
  // over table
  const { ref, isOverflowing } = useOverflowDetector([list, loading]);
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
                  <i className="nav-icon bi-person-workspace menu-icon"></i>
                </span> Vendor List
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <button
                    onClick={() => navigate("/Vendor/create")}
                    style={{
                      padding: "15px 25px",
 }}
                    type="button"
                    className="btn btn-gradient-primary"
                  >
                    <span className="button__text">Add Item</span>
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
              <div ref={ref}
                className={`card-body ${isOverflowing ? 'over' : ''}`}>
                {loading ? (
                  <Preloader />

                ) : list.length === 0 ? (
                  <NoDataFounded />
                ):(
                  <>
                    <table className="table table-hover tableHost">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Avatar</th>
                            <th>Shop Name</th>
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
                            <td>
                              <img
                                className='rounded'
                                src={value.avatar ? `${environment.baseURL}${value.avatar}` : "/assets/images/noimages.jpg"}
                                alt="Product"
                                style={{ width: '70px', height: '50px' }}
                              />
                            </td>
                            <td>{value.shop_name}</td>
                           
                            <td>{value.shop_owner}</td>
                            <td>{value.contact}</td>
                            <td>{value.username}</td>
                            <td>{value.shop_type}</td>
                            <td>
                              <div
                                className={`badge badges ${value.status === "Active"
                                  ? "badge-success"
                                  : value.status === "Inactive"
                                    ? "badge-danger"
                                    : value.status === "Pending"
                                      ? "badge-secondary"
                                      : "badge-warning"
                                  }`}
                      
                              >
                                {value.status}
                              </div>
                            </td>
                            <td className="clients">
                              <div className="d-flex gap-3">
                                <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip>View</Tooltip>}>
                                  <a href="#">
                                    <Link to={{ pathname: `/vendorview/${value.id}` }} className="eye">
                                      <i className="fa-solid fa-eye eye text-primary"></i>
                                    </Link>

                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                  <a href="#">
                                    <Link to={`/vendor/Edit/${value.id}`} className="eye">
                                      <i className="fas fa-pen-to-square text-success"></i>
                                    </Link>
                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                  <a href="#" onClick={() => {
                                    deleteIdRef.current = value.id;
                                    handleShow();
                                  }}>
                                    <i className="fas fa-trash text-danger"></i>
                                  </a>
                                </OverlayTrigger>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                          {totalRecords === "10" ? null : <>  <Pagination>
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {renderPaginationItems()}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                          </Pagination></>}

                    
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer />

        </div>
      </div>


      {/* Vendor Delete Modal */}
      <ModalWrapper show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title>Are you sure you want to</Modal.Title>
          delete this Vendor data?
        </Modal.Body>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button variant="secondary" class="btn btn-light" onClick={handleClose}>
            Close
          </Button>
          <Button className='btn btn-gradient-primary me-2' variant="primary"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </ModalWrapper>
    </div>
  );
}

export default VendorList;
