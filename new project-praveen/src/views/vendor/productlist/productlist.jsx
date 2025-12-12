import React, { useEffect, useState } from 'react';
// import { productList, deleteProduct, productListss, deleteProducts } from '../service/apiserver'; // Import deleteVendor
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
// import { environment } from '../environment/environment';
import Navbar from '../navbar/navbar';
import Sidenav from '../sidenav/sidenav';
import './productlist.css';
import Pagination from 'react-bootstrap/Pagination';
import { useRef } from 'react';
import { Button, Modal } from'react-bootstrap';


// import Loading from './Loading';



function ProductList() {

  // const API_BASE_URL = environment.apiBaseUrl;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState('')
  // const [loading, setLoading] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(null); // Track which description is expanded


    // Pagination Usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const deleteIdRef = useRef(null)
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
 
  // useEffect(() => {
  //   productList(currentPage);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, [currentPage]);
 
   // Pagination Method
 
 const totalPages = Math.ceil(totalRecords / recordsPerPage);
 
 const handlePageChange = (pageNumber) => {
  if (pageNumber < 1 || pageNumber > totalPages) return;
  setCurrentPage(pageNumber);
 };
 


  
    
  // const productList = async (page) => {
  //   // e.preventDefault();
  //   setLoading(true);
  //   const vendorId = localStorage.getItem("vendorId")
  
  //   try {
  //     const responseData = await productListss(page - 1, recordsPerPage,vendorId);
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

  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   const deleteId = deleteIdRef.current;
  //   // if (!deleteId) return;
  //   // setLoading(true);

    
  
  //   try {
  //     const responseData = await deleteProducts(deleteId);
  //     console.log("gferger");
  //     if (responseData.apiStatus.code === '200') {
  //       toast.success(responseData.apiStatus.message);
  
  // console.log("rrrrrrrrrrrrr");
  
  
  //       const newTotalRecords = totalRecords - 1;
  //       setTotalRecords(newTotalRecords);
  
  //       let totalPages = Math.ceil(newTotalRecords / recordsPerPage);
  //       if (currentPage > totalPages) {
  //         setCurrentPage(totalPages);
  //       }
  //       productList(currentPage);
  
    
  //       handleClose()
        
  //     } else {
  //       toast.error(responseData.apiStatus.message);
  //     }
  //   } catch (error) {
  //     console.error("Error in shopTypeDeleteApi:", error);
  //     toast.error("An error occurred while deleting the item.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

     
  // const renderPaginationItems = () => {
  //   let items = [];
  //   const maxPageNumbersToShow = 7; 
  //   const halfRange = Math.floor(maxPageNumbersToShow / 2);

  //   let startPage, endPage;
  //   if (totalPages <= maxPageNumbersToShow) {
  //     startPage = 1;
  //     endPage = totalPages;
  //   } else if (currentPage <= halfRange) {
  //     startPage = 1; 
  //     endPage = maxPageNumbersToShow;
  //   } else if (currentPage + halfRange >= totalPages) {
  //     startPage = totalPages - maxPageNumbersToShow + 1;
  //     endPage = totalPages;
  //   } else {
  //     startPage = currentPage - halfRange;
  //     endPage = currentPage + halfRange;
  //   }

  //   if (startPage > 1) {
  //     items.push(
  //       <Pagination.Item key="1" active={1 === currentPage} onClick={() => handlePageChange(1)}>
  //         1
  //       </Pagination.Item>
  //     );
  //     if (startPage > 2) {
  //       items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
  //     }
  //   }

  //   for (let number = startPage; number <= endPage; number++) {
  //     items.push(
  //       <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
  //         {number}
  //       </Pagination.Item>
  //     );
  //   }

  //   if (endPage < totalPages) {
  //     if (endPage < totalPages - 1) {
  //       items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
  //     }
  //     items.push(
  //       <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => handlePageChange(totalPages)}>
  //         {totalPages}
  //       </Pagination.Item>
  //     );
  //   }

  //   return items;
  // };



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
                  <i className="nav-icon fas fa-boxes menu-icon"></i>
                </span> Product List
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                <button onClick={() => navigate("/formpage/Create")}
                // style={{ float: "right", marginBottom: "20px" }} 
                type="button" className="button">
                <span className="button__text">Add Item</span>
                {/* <span className="button__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                    <line y2="19" y1="5" x2="12" x1="12"></line>
                    <line y2="12" y1="12" x2="19" x1="5"></line>
                  </svg>
                </span> */}
              </button>
                </ul>
              </nav>
            </div>
            <div className="card">
              <div className="table-responsive">
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
                        zIndex: 9999
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

                    <><table className="table table-hover tableHost text-center">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Image</th>
                            <th>Product_name</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((value, ind) => (
                            <tr key={value.id}>
                              <th scope="row">{(currentPage - 1) * recordsPerPage + ind + 1}</th>
                              <td>{value.date_created}</td>
                              <td>
                                {/* <img
                                  src={value.image_path ? `${API_BASE_URL}${value.image_path}` : "trty"}
                                  alt="Product Image"
                                  style={{ width: '50px', height: '50px' }} /> */}
                              </td>
                              <td>{value.name}</td>
                              <td>{value.price}</td>
                              <td>
                                <div
                                  className={`badge ${value.status === "Active"
                                    ? "badge-success"
                                    : value.status === "Inactive"
                                      ? "badge-danger"
                                      : "badge-secondary"}`}
                                  style={value.status === "Active"
                                    ? { backgroundColor: "green" }
                                    : value.status === "Inactive"
                                      ? { backgroundColor: "red" }
                                      : { backgroundColor: "gray" }}
                                >
                                  {value.status}
                                </div>
                              </td>

                              <td className="clients">
                                <li>
                                  <Link to={{ pathname: `/product-view/${value.id}` }} className="eye">
                                    <i className="fa-solid fa-eye eye"></i>
                                  </Link>
                                </li>
                                <li>

                                  {/* edit function  */}

                                  <Link to={`/formpage/Edit/${value.id}`} className="edit">
                                    <i className="fa-regular fa-pen-to-square edit-font"></i>
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    className="delete"
                                    onClick={() => {deleteIdRef.current =value.id
                                      handleShow();
                                    }}
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
                            {/* {renderPaginationItems()} */}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                          </Pagination>
                        </div></>
                    
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to delete this data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" class="btn btn-light" onClick={handleClose}>
            Close
          </Button>
          <Button className='btn btn-gradient-primary me-2' variant="primary"
          //  onClick={handleDelete}
           >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductList;