import React, { useEffect, useRef, useState } from "react";

import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Pagination from "react-bootstrap/Pagination";


import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import OVERALLAPI from "../../api/over-all-api";
import Navbar from "../../shared/navbar";
import Sidenav from "../../shared/sidenav";
import Preloader from "../../shared/preloader";
import Nodatafounded from "../../shared/NoDataFound";
import { environment } from "../../api/api";
import Footer from "../../shared/footer";
import Modalwrapper from "../../shared/ModalWrapper";
import IndexLayout from "../../views";



function Product() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [vendor, setVendor] = useState('')
  const [price, setPrice] = useState('')
  const [catagory, setCatagory] = useState('')
  const [status, setStatus] = useState('')
  const [img, setImg] = useState('')

  // Description
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    setExpanded(!expanded);
  };


  const navigate = useNavigate();

  const deleteIdRef = useRef(null)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Pagination Usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

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

  // Product Api


  // const productList = async (page) => {
  //   // e.preventDefault();
  //   setLoading(true);

  //   const totken = localStorage.getItem("token");
  //   if (!totken) {
  //     navigate("/");
  //     return;
  //   }

  //   const apiData = {
  //     pageIndex: page - 1,
  //     dataLength: recordsPerPage,
  //   };

  //   try {
  //     const responseData = await OVERALLAPI.adminProductList(apiData);
  //     if (responseData.apiStatus.code === "400") {
  //       setList([]);
  //       // setNoData(true);
  //     } else if (responseData.apiStatus.code === "200") {
  //       // toast.success(responseData.apiStatus.message);
  //       setList(responseData.result.VendorData);
  //       setTotalRecords(responseData.result.totalRecordCount);
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     toast.error("An error occurred during login.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


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

  // view modal
  // const [showModalView, setShowModalView] = useState(false);

  // const handleOpenView = (e) => {
  //   e.preventDefault(); 
  //   setShowModalView(true);
  // };

  // const handleCloseView = () => setShowModalView(false);




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
      {/* <Navbar /> */}

      {/* product */}

      {/* <div className="container-fluid page-body-wrapper"> */}
        {/* <Sidenav /> */}

        {/* <!-- partial --> */}
        {/* <div style={{ paddingTop: "80px" }} className="main-panel"> */}
          <IndexLayout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fas fa-store menu-icon"></i>
                </span>{" "}
                Product List
              </h3>
              <button onClick={() => navigate("/product" + "/Create")} style={{

                padding: "15px 25px",

              }} type="button" class="btn btn-gradient-primary">
                <span class="button__text">Add Item</span>
              </button>
            </div>

            {/* Table */}

            <div class="card">
              <div ref={cardRef}
                className={`card-body ${isOverflowing && isMobile ? "over" : ""}`}>


                {/* {loading ? (
                  <Preloader />

                ) : list.length === 0 ? (
                    <Nodatafounded /> */}
                {/* // ) : ( */}
                {/* <> */}
                <table class="table table-hover tableHost" style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Product Name</th>
                      {/* <th>Product Spec</th> */}
                      {/* <th>count</th> */}
                      <th>Cost</th>
                      <th>Offer</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th >Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {list.map((list, ind) => ( */}
                    <tr >
                      <th scope="row">
                        {/* {(currentPage - 1) * recordsPerPage + ind + 1} */}
                        1
                      </th>
                      <td>
                        <img
                          className="rounded"
                          src={list.image_path ? `${environment.baseURL}${list.image_path}` : "/assets/images/noimages.jpg"}

                          alt="Product Image"
                          style={{ width: "60px", height: "60px" }}
                        />
                      </td>
                      <td>{list.name}name</td>
                      {/* <td>
                        {list.username}name
                            </td>
                            <td>
                        {list.username}name
                            </td> */}
                      <td>₹{list.price}66</td>

                      <td>
                        55{list.code}% Off
                      </td>

                      <td className="toggle-text-cell">
                        <div className={`toggle-text ${expanded ? 'expanded' : 'collapsed'}`}>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eveniet sed quasi obcaecati iste ratione suscipit error saepe numquam? Quo dolorem porro quaerat vel! Accusantium eligendi alias architecto repellat sequi!
                        </div>
                        <button className="toggle-button" onClick={toggle}>
                          {expanded ? 'Show less' : 'Show more'}
                        </button>
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
                                {list.status}Active
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
                      {/* <td className="clients ps-3">

                        <div className="d-flex gap-3">
                          <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip className="tooltip-view">View</Tooltip>}>

                            <a data-bs-toggle="modal" href="#exampleModalToggle" role="button"><i className="fas fa-eye text-primary"></i></a>

                          </OverlayTrigger>

                          <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-edit">Edit</Tooltip>}>
                            <a href="#">
                              <Link
                                to={{ pathname: `/product/Edit/` }} className="edit"
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
                            {/* <a data-bs-toggle="modal" href="#exampleModalToggle" role="button"> */}
                            <Link to={{ pathname: `/productview/${list.id}` }}>
                              <i className="fas fa-eye icon text-white"></i>

                            </Link>
                            {/* </a> */}
                          </div>

                          {/* Edit Button */}
                          <div className="button">
                            <Link to={`/product/Edit/`}>
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
                    {/* ))} */}

                  </tbody>
                </table>
                {/* <div
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
                    
                    </div> */}
                {/* </> */}
                {/* // )} */}
              </div>
            </div>
          </div>
          </IndexLayout>
          {/* <Footer /> */}

          {/* <!-- partial --> */}
        {/* </div> */}
        {/* <!-- main-panel ends --> */}
      {/* </div> */}


      {/* View */}
      <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-md">
          <div class="modal-content">
            <div class="modal-header" style={{ backgroundColor: "#ffffff", borderBottom: "none" }}>
              <h5 class="modal-title" id="exampleModalToggleLabel">View Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {/* <div className="card">
                <div className="card-body" style={{ boxShadow: "none" }}>
                  <div className='row'>
                    <div style={{ paddingBottom: '35px' }} className='col-md-6 text-center'>
                      <img className='img-fluid rounded' style={{ height: "100%", width: "100%" }} src={img ? `${environment.baseURL}${img}` : "/assets/images/bag.png"} alt="Product image" />

                    </div>
                    <div className='col-md-6'>
                      <h4 className='order-list'>Product Name</h4>
                      <h6 className='order-value p-0'>{vendor} name</h6>
                      <h4 className='order-list'>Product Spec</h4>
                      <h6 className='order-value p-0'>{price}product</h6>
                      <h4 className='order-list'>Count</h4>
                      <h6 className='order-value p-0'>{catagory}55</h6>
                      <h4 className='order-list'>Cost Per Unit</h4>
                      <h6 className='order-value p-0'>$ {products}500</h6>
                      <h4 className='order-list'>Offer Percentage</h4>
                      <h6 className='order-value p-0'>% {products}50</h6>
                      <h4 className='order-list'>Status</h4>
                      <div
                        className={`badge badges ${status === "Active"
                          ? "badge-success"
                          : status === "Inactive"
                            ? "badge-danger"
                            : status === "Pending"
                              ? "badge-secondary"
                              : "badge-warning"
                          }`}
                      >
                        {status} Active
                      </div>
                    </div>
                    <div className='col-md-6 mt-2'>
                      <h4 className='order-list'>Review</h4>
                      <h6 className='order-value p-0' style={{ color: "darkgray !important" }} dangerouslySetInnerHTML={{ __html: price }}></h6>
                      <h6 className='order-value p-0'>{price}best product</h6>

                    </div>
                    <div className='col-md-6 mt-2'>
                      <h4 className='order-list'>Description</h4>
                      <h6 className='order-value p-0' style={{ color: "darkgray !important" }} dangerouslySetInnerHTML={{ __html: price }}></h6>
                      <h6 className='order-value p-0'>{price}good product</h6>

                    </div>
                  </div>
                </div>
              </div> */}
              <div className="product-card">
                <div className="image-wrapper">
                  <span className="badge-new">NEW</span>
                  <img
                    src="/assets/images/bag.png"
                    alt="Denim Shorts"
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <h3 className="product-title">Great product name goes here</h3>
                  <div className="rating">
                    <span className="stars">
                      ★★★★☆{/* 4 filled stars, 1 empty star */}
                    </span>
                    <span className="numeric-rating">7/10</span>
                  </div>
                  <p className="product-description">
                    Take it as demo specs, ipsum dolor sit amet, consectetuer adipiscing
                    elit, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Ut
                    wisi enim ad minim veniam
                  </p>
                </div>

                <div className="product-purchase">
                  <div className="price-section">
                    <span className="price-current">$140</span>
                    <span className="price-original">$198</span>
                    {/* <span className="free-shipping">Free shipping</span> */}
                  </div>
                  {/* <button className="btn-details">Details</button>
                  <button className="btn-wishlist" aria-label="Add to wishlist">
                    ♥ Add to wishlist
                  </button> */}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* status  */}
      <Modalwrapper show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title> Are you sure you want to{" "}
          </Modal.Title>
          {selectedItem === "Active" ? "deactivate" : "activate"} this
          product?
        </Modal.Body>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button className="btn btn-light" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className='btn btn-gradient-primary me-2' 
            onClick={handleStatusChange}
          >
            {selectedItem === "Active" ? "Deactivate" : "Activate"}
          </Button>
        </Modal.Footer>
      </Modalwrapper>


      {/* Product Delete */}
      <Modalwrapper show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title>Are you sure you want to</Modal.Title>
          delete this Product data?
        </Modal.Body>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button className="btn btn-light" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='btn btn-gradient-primary me-2' 
          // onClick={vendorDeleteApi}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modalwrapper>
    </div>
  );
}

export default Product;
