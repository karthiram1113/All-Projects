import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../shared/admin/Navbar/navbar";
import Sidenav from "../../../shared/admin/Sidenav/sidenav";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { productLists } from '../../services/api-services'
// import { environment } from '../../environments/enviornments'
import Pagination from "react-bootstrap/Pagination";
import ADMINAPI from "../../../api/services/AdminLogin/adminAPI";
import { environment } from "../../../api/api";
import Footer from "../../../shared/footer";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalWrapper from "../../../components/ModalWrapper";
import Preloader from "../../../components/Preloader";
import NoDataFounded from "../../../components/NoDataFound";


function Product() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
    const deleteIdRef = useRef(null)
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  // Pagination Usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    productList(currentPage);
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

  // Product Api

  // const productList = async (page) => {
  //   // e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const responseData = await productLists(page - 1, recordsPerPage);
  //     if (responseData.apiStatus.code === "404") {
  //       setList([]);
  //       // setNoData(true);

  //     } else if (responseData.apiStatus.code === "200") {
  //       setList(responseData.result.VendorData);
  //       setTotalRecords(responseData.result.totalRecordCount);

  //     }
  //   } catch (error) {
  //     console.log("Error handled =" + error);
  //   }
  // };

  const productList = async (page) => {
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
      const responseData = await ADMINAPI.adminProductList(apiData);
      if (responseData.apiStatus.code === "400") {
        setList([]);
        // setNoData(true);
      } else if (responseData.apiStatus.code === "200") {
        // toast.success(responseData.apiStatus.message);
        setList(responseData.result.VendorData);
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






  // over table
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

      {/* product */}

      <div className="container-fluid page-body-wrapper">
        <Sidenav />

        {/* <!-- partial --> */}
        <div style={{ paddingTop: "80px" }} className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fas fa-store menu-icon"></i>
                </span>{" "}
                Product List
              </h3>
              {/* <button onClick={() => navigate("/adminproduct" + "/Create")} style={{
     
                padding: "15px 25px",

              }} type="button" class="btn btn-gradient-primary">
                <span class="button__text">Add Item</span>
              </button> */}
            </div>

            {/* Table */}

            <div class="card">
              <div ref={cardRef}
              className={`card-body ${isOverflowing && isMobile ? "over" : ""}`}>
               

                {loading ? (
                  <Preloader />

                ) : list.length === 0 ? (
                    <NoDataFounded />
                ) : (
                  <>
                    <table class="table table-hover tableHost">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Vendor Name</th>
                          <th>Code</th>
                          <th>Cost</th>
                          <th>Status</th>
                          <th >Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((list, ind) => (
                          <tr key={list.id}>
                            <th scope="row">
                              {(currentPage - 1) * recordsPerPage + ind + 1}
                            </th>
                            <td>
                              <img
                                className="rounded"
                                src={list.image_path ? `${environment.baseURL}${list.image_path}` : "/assets/images/noimages.jpg"}
                                // src={list.image_path}
                                alt="Product Image"
                                style={{ width: "60px", height: "60px" }}
                              />
                            </td>
                            <td>{list.name}</td>
                            <td>
                             {list.username}
                            </td>
                            <td>
                             {list.code}
                            </td>
                            <td>${list.price}</td>
                            {/* <td>{list.image}</td> */}
                            

                            <td>
                              <div
                                className={`badge badges ${list.status === "Active"
                                  ? "badge-success"
                                  : list.status === "Inactive"
                                    ? "badge-danger"
                                    : list.status === "Pending"
                                      ? "badge-secondary"
                                      : "badge-warning"
                                  }`}
                              // style={
                              //   list.status === "Active"
                              //     ? { backgroundColor: "green" }
                              //     : list.status === "Inactive"
                              //     ? { backgroundColor: "red" }
                              //     : { backgroundColor: "gray" }
                              // }
                              >
                                {list.status}
                              </div>
                            </td>

                            <td className="clients ps-3">
                              {/* <li>
                                <Link
                                  to={{
                                    pathname: `/Adminproductview/${list.id}`,
                                  }}
                                  className="eye"
                                >
                                  <i className="fa-solid fa-eye eye"></i>
                                </Link>
                              </li> */}
                              {/* <li>
                                <Link to={{ pathname: `/adminproduct/${list.id}` }} className="edit">
                                  <i className="fa-regular fa-pen-to-square edit-font"></i>
                                </Link>
                              </li> */}
                              {/* <li>
                                <Link
                                  className="delete"
                                  onClick={() => {
                                    deleteIdRef.current = list.id;
                                    handleShow();
                                  }}

                                >
                                  <i className="fa-solid fa-trash delete-font"></i>
                                </Link>
                              </li> */}
                              <div className="d-flex gap-3">
                                <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip >View</Tooltip>}>
                                  <a href="#">
                                    <Link
                                      to={{
                                        pathname: `/Adminproductview/${list.id}`,
                                      }}
                                      className="eye"
                                    >
                                      <i className="fas fa-eye text-primary"></i>
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
                    </table>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "20px",
                      }}
                    >
                          {totalRecords === "10" ? null : <>  <Pagination>
                            <Pagination.Prev
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            />
                            {renderPaginationItems()}
                            <Pagination.Next
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            />
                          </Pagination></>}
                    
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer />

          {/* <!-- partial --> */}
        </div>
        {/* <!-- main-panel ends --> */}
      </div>

      {/* Product Delete */}


      <ModalWrapper show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title>Are you sure you want to</Modal.Title>
          delete this Product data?
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

export default Product;
