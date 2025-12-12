import React, { useEffect, useRef, useState } from 'react';

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

// import { environment } from '../environments/enviornments';
import Navbar from '../../../shared/vendor/Navbar/navbar';
import Sidenav from '../../../shared/vendor/Sidenav/sidenav';
import './vendorlist.css';
import VENDORAPI from '../../../api/services/vendorLogin/vendorAPI';
import { Button, Modal, OverlayTrigger, Pagination, Tooltip } from 'react-bootstrap';
import Footer from '../../../shared/footer';
import ModalWrapper from '../../../components/ModalWrapper';
import { useOverflowDetector } from '../../../components/useOverflowDetector';
import Preloader from '../../../components/Preloader';
import NoDataFounded from '../../../components/NoDataFound';

function Orderlist({ setPendingOrders }) {

  // const API_BASE_URL = environment.apiBaseUrl;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
  // const [PendingOrders, setPendingOrders] = useState(0);
   const deleteIdRef = useRef(null)
       const [show, setShow] = useState(false);
     
       const handleClose = () => setShow(false);
       const handleShow = () => setShow(true);
      const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const navigate = useNavigate();
  // const [expandedDescription, setExpandedDescription] = useState(null); // Track which description is expanded

  //Product list
  useEffect(() => {
    let multiTimeApiCall = false;

    const fetchData = async (page) => {
      const totken = localStorage.getItem("token");
      if (!totken) {
        navigate("/vendorlogin");
        return;
      }
      setLoading(true);
      const vendorId = localStorage.getItem("vendorId");
      console.log("Vendor ID:", vendorId);
      const apidata={
        pageIndex: page - 1,
        dataLength: recordsPerPage,
              vendor_id:vendorId,
      } 

      try {
        const responseData = await VENDORAPI.vendorOrderList(apidata); // Pass correct parameters

        if (!multiTimeApiCall) { // Only update state if the component is still mounted
          if (responseData.apiStatus.code === "200") {
            setList(responseData.result.OrderData);
            console.log(responseData.result.OrderData, 'ddd');
            const totalRecords = responseData.result.totalRecordCount;
            setTotalRecords(totalRecords);
            setTotalPages(Math.ceil(totalRecords / recordsPerPage));
          } else {
            toast.error(responseData.apiStatus.message);
          }
        }
      } catch (error) {
        // if (!multiTimeApiCall) {
        //   console.error("Error handled:", error);
        //   toast.error("An error occurred while fetching the product list.");
        // }
      } finally {
        if (!multiTimeApiCall) {
          setLoading(false); // Ensure loading state is stopped
        }
      }
    };

    fetchData(currentPage);

    return () => {
      multiTimeApiCall = true; // Cancel any pending state updates if the component unmounts
    };

  }, [currentPage]);



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
  // over table
  const { ref, isOverflowing } = useOverflowDetector([list, loading]);
  return (
    <div>
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidenav/>
        <div style={{ paddingTop: "80px" }} className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fa-solid fa-cart-shopping menu-icon"></i>
                </span> Order List
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                 
                </ul>
              </nav>
            </div>
            <div className="card">
              <div className="table-responsive">
                <div ref={ref}
                  className={`card-body ${isOverflowing ? 'over' : ''}`}>
                 
                  {loading ? (
                    <Preloader />

                  ) : list.length === 0 ? (
                      <NoDataFounded />

    ) : (

                    <table className="table table-hover tableHost text-center">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          {/* <th>id</th> */}
                          <th>Date Ordered</th>
                          <th>Refer Code</th>
                          <th>Total Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((value, ind) => (
                          <tr key={value.id}>
                            <th scope="row">{(currentPage - 1) * recordsPerPage + ind + 1}</th>
                            {/* <td>{value.id}</td> */}
                            <td>{value.created_date}</td>
                            <td>{value.code}</td>
                            <td>{value.total_amount}</td>
                            <td>
                            <div
                              className={`badge ${value.status === "Active"
                                  ? "badge-success"
                                  : value.status === "Inactive" || value.status === "Cancelled"
                                    ? "badge-danger"
                                    : value.status === "Out of Delivery"
                                      ? "badge-warning"
                                      : value.status === "Delivered"
                                        ? "badge-dark"
                                        : value.status === "Pending"
                                          ? "badge-pending"
                                          : value.status === "Packed"
                                            ? "badge-packed"
                                            : value.status === "Confirmed"
                                              ? "badge-confirmed"
                                              : ""
                                }`}
                              style={
                                value.status === "Active"
                                  ? { backgroundColor: "green" }
                                  : value.status === "Inactive" || value.status === "Cancelled"
                                    ? { backgroundColor: "red" }
                                    : value.status === "Out of Delivery"
                                      ? { backgroundColor: "grey" }
                                      : value.status === "Delivered"
                                        ? { backgroundColor: "black" }
                                        : value.status === "Pending"
                                          ? { backgroundColor: "orange" }
                                          : value.status === "Packed"
                                            ? { backgroundColor: "violet" }
                                            : value.status === "Confirmed"
                                              ? { backgroundColor: "blue" }
                                              : {}
                              }
                            >
                              {value.status}
                            </div>





                          </td>
                            <td className="clients">
                              {/* <li>
                              <Link
                                  to={{ pathname: `/Vendor/orderview/${value.id}` }}
                                  className="eye"
                                >
                                  <i className="fa-solid fa-eye eye"></i>
                                </Link>
                              </li> */}
                              <div className="d-flex gap-3">
                                <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip>View</Tooltip>}>
                                  <a href="#">
                                    <Link to={{ pathname: `/Vendor/orderview/${value.id}` }} className="eye">
                                      <i className="fa-solid fa-eye eye text-primary"></i>
                                    </Link>

                                  </a>
                                </OverlayTrigger>

                                {/* <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                  <a href="#">
                                    <i className="fas fa-pen text-success"></i>
                                  </a>
                                </OverlayTrigger> */}

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
                     
                
                  )}
                  <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                    {totalRecords === "10" ? null : <>
                      <Pagination>
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                      </Pagination></>}

                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />

        </div>
      </div>
      <ModalWrapper show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title>Are you sure you want to</Modal.Title>
          delete this Order data?
        </Modal.Body>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button variant="secondary" class="btn btn-light" onClick={handleClose}>
            Close
          </Button>
          <Button className='btn btn-gradient-primary me-2' variant="primary"
          // onClick={vendorDeleteApi}
          >
            Delete
          </Button>
        </Modal.Footer>
      </ModalWrapper>
    </div>
  );
}

export default Orderlist;
