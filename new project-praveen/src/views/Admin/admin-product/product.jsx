import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/navbar";
import Sidenav from "../Sidenav/sidenav";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { productLists } from '../../services/api-services'
// import { environment } from '../../environments/enviornments'
import Pagination from "react-bootstrap/Pagination";
import ADMINAPI from "../../../api/services/AdminLogin/adminAPI";
import { environment } from "../../../api/api";
import { Button, Modal } from "react-bootstrap";


function Product() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination Usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [show, setShow] = useState(false);
  const Navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteIdRef = useRef(null)
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

    const apiData = {
      pageIndex: page - 1,
      dataLength: "5",
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
                  <i className="nav-icon fas fa-boxes menu-icon"></i>
                </span>{" "}
                Product List
              </h3>
              <button onClick={() => Navigate("/admin-product/Create")} style={{ float: "right"}} type="button" class="button">
  <span class="button__text">Add Item</span>
  {/* <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span> */}
</button>
            </div>

            {/* Table */}

            <div class="card">
              <div class="card-body over">
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "100vh", // Full viewport height to center on the entire page
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: adds a slight overlay effect
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
                ) : list.length === 0 ? (
                  <h4 style={{ textAlign: "center", paddingTop: "40px" }}>
                    NO DATA FOUND
                  </h4>
                ) : (
                  <>
                    <table class="table table-hover tableHost">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Product</th>
                          <th>Category</th>

                          <th>Stock</th>
                          <th>Price</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((list, ind) => (
                          <tr key={list.id}>
                            <th scope="row">
                              {(currentPage - 1) * recordsPerPage + ind + 1}
                            </th>
                            <td>{list.name}</td>
                            <td>
                              {list.code} {list.username}
                            </td>
                            <td>
                              <div
                                className={`badge ${list.status === "active"
                                  ? "badge-success"
                                  : list.status === "inactive"
                                    ? "badge-danger"
                                    : "badge-secondary"
                                  }`}
                                style={
                                  list.status === "Active"
                                    ? { backgroundColor: "rgb(168 235 120)", color: '#245900' }
                                    : list.status === "Inactive"
                                      ? { backgroundColor: "red" }
                                      : { backgroundColor: "gray" }
                                }
                              >
                                {list.status}
                              </div>
                            </td>
                            <td><i className="fa-solid fa-indian-rupee-sign"></i> {list.price}</td>


<td className="action-cell">
  <div className='action-buttons'>
<Link className="custom-icon-button" to="">
  <i className="fa-solid fa-eye"></i>
</Link>

<Link  to={{ pathname: `/admin-product/edit/${list.id}` }} className="custom-edit-button">
  <i className="fa-solid fa-pen-to-square"></i>
</Link>

<Link data-bs-target="#studentDelete"  data-bs-toggle="modal" className="custom-delete-button" to="">
  <i className="fa-solid fa-trash"></i>
</Link>

  </div>
</td>



                    
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
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
                  </>
                )}
              </div>
            </div>
          </div>

          {/* <!-- partial --> */}
        </div>
        {/* <!-- main-panel ends --> */}
      </div>


      <div className="modal fade" id="studentDelete" aria-labelledby="studentDeleteLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-3 text-center p-4">
            <div className="position-relative">
              <div className="delete-icon-wrapper bg-white rounded-circle shadow-sm d-inline-block position-absolute top-0 start-50 translate-middle">
                <i className="fa-solid fa-trash-can text-danger mt-3 fs-1"></i>
              </div>
            </div>

            <div className="modal-body pt-5 mt-4">
              <h5 className="fw-bold">You are about to delete a student</h5>
              <p className="text-muted mb-4">
                This will delete your student from the catalog.<br />
                Are you sure?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button type="button" className="btn btn-outline-secondary  px-4" style={{color:"black"}} data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger px-4">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Product;
