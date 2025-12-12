import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../shared/vendor/Navbar/navbar";
import Sidenav from "../../../shared/vendor/Sidenav/sidenav";
import "./vendorlist.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { environment } from "../../../api/api";
import Pagination from "react-bootstrap/Pagination";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import VENDORAPI from "../../../api/services/vendorLogin/vendorAPI";
import Footer from "../../../shared/footer";
import ModalWrapper from "../../../components/ModalWrapper";
import { useOverflowDetector } from "../../../components/useOverflowDetector";
import Preloader from "../../../components/Preloader";
import NoDataFounded from "../../../components/NoDataFound";


function CategoriesLists() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0); // Added state for totalRecords
  const navigate = useNavigate();
  const recordsPerPage = 10;
  //  const [recordsPerPage] = useState(5);
  // const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Added state for deleteId
  const deleteIdRef = useRef(null)
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteId(id); // Set the id to be deleted
    setShow(true);
  };
  const [id, setVendorId] = useState("");
  const [Id, setId] = useState("");
  console.log(id, "0000000");

  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  // const [deleteId, setDeleteId] = useState(null); // Added state for deleteId
  const [viewId, setViewId] = useState(null); // Added state for deleteId

  // const handleClose = () => setShow(false);
  const handleViewClose = () => setShowModal(false);
  const handleCreateClose = () => setShowModalCreate(false);
  const handleCloseEdit = () => setShowModalEdit(false);

  const handleCreateModal = () => {
    setShowModalCreate(true);
    setShowModalEdit(false)
  };
  const handleEditModal = (id) => {
    CategoryGetMethod(id)
    setShowModalEdit(true);
    setShowModalCreate(false)
  };

  // const handleShow = (id) => {
  //   setDeleteId(id); // Set the id to be deleted
  //   setShow(true);
  // };

  // CategoryList
  const fetchCategoryList = async (page) => {
    setLoading(true);
    const totken = localStorage.getItem("token");
    if (!totken) {
      navigate("/vendorlogin");
      return;
    }
    const apidata = {
      pageIndex: page - 1,
      dataLength: recordsPerPage, // Use recordsPerPage state
    };
    try {
      const responseData = await VENDORAPI.vendorCategoryList(apidata);

      if (responseData.apiStatus.code === "200") {
        setList(responseData.result.CategoryData);
        const totalRecords = responseData.result.totalRecordCount;
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
    fetchCategoryList(currentPage);
  }, [currentPage]);

  //delete
  const handleDelete = async () => {
    // if (deleteId === null) return;
    // setLoading(true);
    try {
      const result = await VENDORAPI.vendorCategoryDelete(deleteId);
      if (result.apiStatus.code === "200") {
        toast.success(result.apiStatus.message);
        fetchCategoryList(currentPage);
        handleClose();
      } else {
        toast.warning(result.apiStatus.message);
      }
    } catch (error) {
      console.error("Error during vendor deletion:", error);
      toast.error("An error occurred while trying to delete the vendor.");
    } finally {
      setLoading(false);
    }
  };

  // CategoryGet
  const handleView = (id) => {
    setShowModal(true);
    // setShowModalEdit(true)
    CategoryGetMethod(id);
  };
  // Category Get Api Method
  const CategoryGetMethod = async (id) => {
    console.log("999999");

    try {
      const response = await VENDORAPI.vendorCategoryView(id);
      if (response.apiStatus.code === "200") {
        console.log();

        const data = response.result.CategoryData;
        setVendorId(data.id);
        setId(data.vendor_id);
        setName(data.name);
        setDescription(data.description);
        setStatus(data.status);

        //  toast.success(response.apiStatus.message)
      } else {
        toast.warning(response.apiStatus.message);
      }
    } catch (error) {
      console.error("Error fetching vendor list:", error);
    } finally {
    }
  };

  //create
  const saveButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apidata = {
        category_name: Name,
        description: description,
        vendor_id: Id,
        status: status
      }

      const responseData = await VENDORAPI.vendorCategoryCreate(apidata);

      if (responseData.apiStatus?.code === "200") {
        toast.success(responseData.apiStatus.message);
        handleCreateClose()
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  //update Category

  const updateFunction = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apidata = {
        category_id: id,
        category_name: Name,
        description: description,
        vendor_id: Id,
        status: status
      }

      const responseData = await VENDORAPI.vendorCategoryUpdate(apidata);

      if (responseData.apiStatus?.code === "200") {
        toast.success(responseData.apiStatus.message);
        fetchCategoryList()
        handleCloseEdit()


      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
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
                  <i className="nav-icon fa-solid fa-icons menu-icon"></i>
                </span>{" "}
                Categories List
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <button
                    onClick={() => navigate("/category/Create")}
                    style={{ padding: "15px 25px" }}
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
                {loading ?
                  <Preloader />
 : list.length === 0 ? (
                    <NoDataFounded />


                  ) : (
                    <>
                      <table className="table table-hover tableHost">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Date Created</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((value, ind) => (
                            <tr key={value.id}>
                              <th scope="row"> {(currentPage - 1) * recordsPerPage + ind + 1}</th>
                              <td>{value.created_date}</td>
                              <td>{value.name}</td>
                              <td className="td-des">{value.description}</td>
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
                                // style={{
                                //   backgroundColor:
                                //     value.status === "Active"
                                //       ? "green"
                                //       : value.status === "Inactive"
                                //         ? "red"
                                //         : "gray",
                                // }}
                                >
                                  {value.status}
                                </div>
                              </td>

                              <td className="clients">
                              
                                <div className="d-flex gap-3">
                                  <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip>View</Tooltip>}>
                                    <a href="#">
                                      <Link to={{ pathname: `/categoryview/${value.id}` }} className="eye">
                                        <i className="fa-solid fa-eye eye text-primary"></i>
                                      </Link>

                                    </a>
                                  </OverlayTrigger>

                                  <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                    <a href="#">
                                      <Link to={`/category/Edit/${value.id}`} className="eye">
                                        <i className="fas fa-pen-to-square text-success"></i>
                                      </Link>
                                    </a>
                                  </OverlayTrigger>

                                  <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                    <a href="#" onClick={() => {
                                      deleteIdRef.current = value.id;
                                      handleShow(value.id);
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

      {/* category Delete Modal */}
      <ModalWrapper show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title>Are you sure you want to</Modal.Title>
          delete this Category data?
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
      {/* {Category View Modal} */}
      <Modal centered show={showModal} onHide={handleViewClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Category View</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
          {/* <div class="modal-body rounded-0"> */}
          {/* <div class="container-fluid"> */}
          <dl>

            <dt class="">Category Name</dt>
            <dd class="pl-3">{Name}</dd>
            <dt class="">Description</dt>
            <dd class="pl-3">{description}</dd>
            <dt class="">Status</dt>
            {/* <dd
                  className={`badge badges ${
                    status === "Active"
                      ? "badge-success"
                      : status === "Inactive"
                      ? "badge-danger"
                      : status === "Pending"
                      ? "badge-secondary"
                      : "badge-warning"
                  }`}
                >
                  {status}
                </dd> */}


            <dd
              className={`badge ${status === "Active"
                ? "badge-success"
                : status === "Inactive"
                  ? "badge-danger"
                  : "badge-secondary"
                }`}
              style={{
                backgroundColor:
                  status === "Active"
                    ? "green"
                    : status === "Inactive"
                      ? "red"
                      : "gray",
              }}
            >
              {status}
            </dd>



          </dl>
          {/* </div> */}
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn view-close btn-gradient-primary me-2" onClick={handleViewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {Category create Modal} */}
      {showModalEdit ? (<Modal centered show={showModalEdit} onHide={handleCloseEdit} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Category Update
          </Modal.Title></Modal.Header>
        <Modal.Body>
          <form className="forms-sample">
            <div className="row">
              {/* Form Fields */}


              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Vendor ID</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setId(e.target.value)}
                    value={Id}

                    placeholder="Vendor ID"
                  />

                </div>
              </div>

              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"

                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="exampleInputGender">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                    id="exampleInputGender"
                    style={{
                      height: "44px",
                      fontSize: "12px",
                      borderColor: "red",
                    }}
                  >
                    <option hidden>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setName(e.target.value)}
                    value={Name}
                    placeholder="Name"
                  />
                </div>
              </div>




            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCreateClose}>
            Close
          </Button> */}
          <Button
            type="button"
            variant="btn btn-light"
            onClick={handleCloseEdit}
          >
            Cancel
          </Button>
          <Button
            onClick={updateFunction}
            variant="btn btn-gradient-primary me-2"
          >
            Update
          </Button>

        </Modal.Footer>
      </Modal>




      ) : (<Modal centered show={showModalCreate} onHide={handleCreateClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Category Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="forms-sample">
            <div className="row">
              {/* Form Fields */}


              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Vendor ID</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setId(e.target.value)}
                    // value={id}
                    placeholder="Vendor ID"
                  />

                </div>
              </div>

              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setDescription(e.target.value)}
                    // value={description}
                    placeholder="Description"

                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="exampleInputGender">Status</label>
                  <select
                    // value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                    id="exampleInputGender"
                    style={{
                      height: "44px",
                      fontSize: "12px",
                      borderColor: "red",
                    }}
                  >
                    <option hidden>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setName(e.target.value)}
                    // value={Name}
                    placeholder="Name"
                  />
                </div>
              </div>




            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCreateClose}>
            Close
          </Button> */}
          <Button
            type="button"
            variant="btn btn-light"
            onClick={handleCreateClose}
          >
            Cancel
          </Button>
          <Button
            onClick={saveButton}
            variant="btn btn-gradient-primary me-2"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      )
      }








    </div>
  );
}

export default CategoriesLists;
