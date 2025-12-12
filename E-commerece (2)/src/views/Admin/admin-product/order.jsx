import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../../shared/admin/Navbar/navbar'
import Sidenav from '../../../shared/admin/Sidenav/sidenav'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import ADMINAPI from '../../../api/services/AdminLogin/adminAPI';
import Footer from '../../../shared/footer';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalWrapper from '../../../components/ModalWrapper';
import Preloader from '../../../components/Preloader';
import NoDataFounded from '../../../components/NoDataFound';


function Order() {

  // Order Usestate

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const deleteIdRef = useRef(null)
  const [show, setShow] = useState(false);

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

  // Order List

  // const orderList = async (page) => {
  //   // e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const responseData = await orderLists(page - 1, recordsPerPage);
  //     if (responseData.apiStatus.code === "404") {
  //       setList([]);


  //     } else if (responseData.apiStatus.code === "200") {
  //       setList(responseData.result.OrderData);
  //       setTotalRecords(responseData.result.totalRecordCount);

  //     }
  //   } catch (error) {
  //     console.log("Error handled =" + error);
  //   }
  // };


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
      const responseData = await ADMINAPI.adminOrderList(apiData);
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
      <Navbar />

      {/* Vendor */}

      <div className="container-fluid page-body-wrapper">


        <Sidenav />

        {/* <!-- partial --> */}
        <div style={{ paddingTop: "80px" }} className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fa-solid fa-cart-shopping menu-icon"></i>
                </span> Order List
              </h3>

            </div>

            {/* Table */}


            <div className="card">
              <div ref={cardRef}
                className={`card-body ${isOverflowing && isMobile ? "over" : ""}`}>
                {loading ? (
                  <Preloader />

                ) : list.length === 0 ? (
                  <NoDataFounded />

                ) : (
                  <><table className="table table-hover tableHost">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Date Ordered</th>
                        <th>Ref.Code</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item, ind) => (
                        <tr key={item.id}>
                          <th scope="row">{(currentPage - 1) * recordsPerPage + ind + 1}</th>
                          <td>{item.created_date}</td>
                          <td>{item.code}</td>
                          <td>{item.total_amount}</td>
                          <td>
                            <div
                              className={`badge ${item.status === "Active"
                                ? "badge-success"
                                : item.status === "Inactive" || item.status === "Cancelled"
                                  ? "badge-danger"
                                  : item.status === "Out of Delivery"
                                    ? "badge-warning"
                                    : item.status === "Delivered"
                                      ? "badge-dark"
                                      : item.status === "Pending"
                                        ? "badge-pending"
                                        : item.status === "Packed"
                                          ? "badge-packed"
                                          : item.status === "Confirmed"
                                            ? "badge-confirmed"
                                            : ""
                                }`}
                              style={
                                item.status === "Active"
                                  ? { backgroundColor: "green" }
                                  : item.status === "Inactive" || item.status === "Cancelled"
                                    ? { backgroundColor: "red" }
                                    : item.status === "Out of Delivery"
                                      ? { backgroundColor: "yellow", color: "black" }
                                      : item.status === "Delivered"
                                        ? { backgroundColor: "black" }
                                        : item.status === "Pending"
                                          ? { backgroundColor: "orange" }
                                          : item.status === "Packed"
                                            ? { backgroundColor: "violet" }
                                            : item.status === "Confirmed"
                                              ? { backgroundColor: "blue" }
                                              : {}
                              }
                            >
                              {item.status}
                            </div>





                          </td>

                          <td className="clients ps-4">
                            <div className="d-flex gap-3">
                              <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip>View</Tooltip>}>
                                <a href="#">
                                  <Link to={{ pathname: `/Adminorderview/${item.id}` }} className="eye">
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
                                  deleteIdRef.current = list.id;
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
                  </table><div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                      {totalRecords === "10" ? null : <> <Pagination>
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                      </Pagination></>}

                    </div></>

                )}
              </div>
            </div>



          </div>
          <Footer />

          {/* <!-- partial --> */}
        </div>
        {/* <!-- main-panel ends --> */}

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
  )
}

export default Order
