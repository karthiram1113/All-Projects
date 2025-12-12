import React, { useEffect, useRef, useState } from 'react'

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import OVERALLAPI from '../../api/over-all-api';
import Navbar from '../../shared/navbar';
import Sidenav from '../../shared/sidenav';
import Preloader from '../../shared/preloader';
import Nodatafounded from '../../shared/NoDataFound';
import Footer from '../../shared/footer';
import Modalwrapper from '../../shared/ModalWrapper';
import IndexLayout from '../../views';



function OrderList() {

  // Order Usestate

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const deleteIdRef = useRef(null)
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Pagination Usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    orderList(currentPage);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [currentPage]);

  // Pagination Method

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };







  //status active inactive
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const handleToggleClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleStatusChange = () => {

    const newStatus = selectedItem.status === "Active" ? "Inactive" : "Active";

    setShowModal(false);
  };










  // Order List



  const orderList = async (page) => {
    // e.preventDefault();
    setLoading(true);
    const totken = localStorage.getItem("token");
    if (!totken) {
      navigate("/");
      return;
    }
    const apiData = {
      pageIndex: page - 1,
      dataLength: recordsPerPage,
    };

    try {
      const responseData = await OVERALLAPI.adminOrderList(apiData);
      if (responseData.apiStatus.code === "400") {
        setList([]);
        // setNoData(true);
      } else if (responseData.apiStatus.code === "200") {
        // toast.success(responseData.apiStatus.message);
        setList(responseData.result.OrderData);
        setTotalRecords(responseData.result.totalRecordCount);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };



  // Pagination Method

  const renderPaginationItems = () => {
    let items = [];
    const maxPageNumbersToShow = 7;
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


  const cardRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const isMobile = window.innerWidth <= 1024;
  useEffect(() => {
    const el = cardRef.current;
    if (el) {
      requestAnimationFrame(() => {
        setIsOverflowing(loading || el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth || isMobile);
      });
    }
  }, [list, loading]);


  return (
    <div>
      {/* <Navbar /> */}

      {/* Vendor */}

      {/* <div className="container-fluid page-body-wrapper"> */}


        {/* <Sidenav /> */}

        {/* <!-- partial --> */}
        {/* <div style={{ paddingTop: "80px" }} className="main-panel"> */}
      <IndexLayout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fa-solid fa-cart-shopping menu-icon"></i>
                </span> Order List
              </h3>
              <button onClick={() => navigate("/order" + "/Create")} style={{

                padding: "15px 25px",

              }} type="button" class="btn btn-gradient-primary">
                <span class="button__text">Add Item</span>
              </button>
            </div>

            {/* Table */}


            <div className="card">
              <div ref={cardRef}
                className={`card-body ${isOverflowing && isMobile ? "over" : ""}`}>
                {loading ? (
                  <Preloader />

                ) : list.length === 0 ? (
                  <Nodatafounded />

                ) : (
                  <>
                <table className="table table-hover tableHost">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Ordered Date</th>
                      <th>delevery date</th>
                      <th>Ref.Code</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, ind) => (
                    <tr >
                      <th scope="row">
                        {(currentPage - 1) * recordsPerPage + ind + 1}
                      </th>
                      <td>
                        {item.created_date}
                      </td>
                      <td>
                        {item.created_date}
                      </td>
                      <td>
                        {item.code}
                      </td>
                      <td>
                        {item.total_amount}
                      </td>
                      {/* <td>
                        <div
                          className={`badge badges ${list.status === "Active"
                            ? "badge-success"
                            : list.status === "Inactive"
                              ? "badge-danger"
                              : list.status === "Pending"
                                ? "badge-secondary"
                                : "badge-warning"
                            }`}
                        >
                      
                          Active
                        </div>





                      </td> */}
                      <td>
                        <button
                          className={`toggle-icon-btn ${list.status === "Active" ? "btn-active" : "btn-inactive"}`}
                          onClick={() => handleToggleClick(list)}
                        >
                          {list.status === "Active" ? (
                            <span className="icon-check">✓</span>
                          ) : (
                            <span className="icon-cross">✕</span>
                          )}
                        </button>
                      </td>
                      {/* <td className="clients ps-4">
                        <div className="d-flex gap-3">
                          <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip className="tooltip-view">View</Tooltip>}>
                            <a href="#">
                              <Link to={{ pathname: `/orderview/${list.id}` }} className="eye">
                                <i className="fa-solid fa-eye eye text-primary"></i>
                              </Link>

                            </a>
                          </OverlayTrigger>

                          <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-edit">Edit</Tooltip>}>
                            <a href="#">
                              <Link
                                to={{ pathname: `/order/Edit/` }} className="edit"
                              >
                                <i className="fas fa-pen-to-square text-success"></i>
                              </Link>
                            </a>
                          </OverlayTrigger>

                          <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-delete">Delete</Tooltip>}>
                            <a href="#" onClick={() => {
                              deleteIdRef.current = list.id;
                              handleShow();
                            }}>
                              <i className="fas fa-trash text-danger"></i>
                            </a>
                          </OverlayTrigger>
                        </div>
                      </td> */}


                      <td>
                        <div className="button-box">
                          {/* Hover/Click Touch Zones */}
                          <div className="touch left"></div>
                          <div className="touch middle"></div>
                          <div className="touch right"></div>

                          {/* View Button */}
                          <div className="button">
                            <Link to={{ pathname: `/orderview/${list.id}` }}>
                              <i className="fas fa-eye icon text-white"></i>
                            </Link>
                          </div>

                          {/* Edit Button */}
                          <div className="button">
                            <Link to={{ pathname: `/order/Edit/` }} >
                              <i className="fas fa-pen-to-square icon text-white"></i>
                            </Link>
                          </div>

                          {/* Delete Button */}
                          <div className="button">
                            <a
                              href="#"
                              onClick={() => {
                                deleteIdRef.current = list.id;
                                handleShow();
                              }}
                            >
                              <i className="fas fa-trash icon text-white"></i>
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                     ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                      {totalRecords === "10" ? null : <> <Pagination>
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
      </IndexLayout>
          {/* <Footer /> */}

          {/* <!-- partial --> */}
        {/* </div> */}
        {/* <!-- main-panel ends --> */}

      {/* </div> */}


      {/* status  */}
      <Modalwrapper show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title> Are you sure you want to{" "}
          </Modal.Title>
          {selectedItem === "Active" ? "deactivate" : "activate"} this
          order?
        </Modal.Body>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button variant="secondary" className="btn btn-light" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className='btn btn-gradient-primary me-2' variant="primary"
            onClick={handleStatusChange}
          >
            {selectedItem === "Active" ? "Deactivate" : "Activate"}
          </Button>
        </Modal.Footer>
      </Modalwrapper>
 {/* order delete */}
      <Modalwrapper show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title>Are you sure you want to</Modal.Title>
          delete this Order data?
        </Modal.Body>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button variant="secondary" className="btn btn-light" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='btn btn-gradient-primary me-2' variant="primary"
          // onClick={vendorDeleteApi}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modalwrapper>
    </div>
  )
}

export default OrderList
