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
import { environment } from '../../api/api';
import Modalwrapper from '../../shared/ModalWrapper';
import Footer from '../../shared/footer';
import IndexLayout from '../../views';


function ClientList() {

    // Client List

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    // Pagination Usestate
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const deleteIdRef = useRef(null)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {
    //     clientList(currentPage);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1500);
    // }, [currentPage]);

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











    // Client List

    // const clientList = async (page) => {
    //     // e.preventDefault();
    //     setLoading(true);
    //     const totken = localStorage.getItem("token");
    //     if (!totken) {
    //         navigate("/");
    //         return;
    //     }
    //     const apidata = {
    //         pageIndex: page - 1,
    //         dataLength: recordsPerPage
    //     }

    //     try {
    //         const responseData = await OVERALLAPI.adminClientList(apidata);
    //         if (responseData.apiStatus.code === "404") {
    //             setList([]);


    //         } else if (responseData.apiStatus.code === "200") {
    //             setList(responseData.result.ClientData);
    //             setTotalRecords(responseData.result.totalRecordCount);

    //         }
    //     } catch (error) {
    //         console.log("Error handled =" + error);
    //     }
    // };


    // Client Delete Api Start

    // const clientDeleteApi = async (e) => {
    //     e.preventDefault();
    //     const deleteId = deleteIdRef.current;
    //     if (!deleteId) return;
    //     setLoading(true);

    //     try {
    //         const responseData = await OVERALLAPI.adminClientDelete(deleteId);

    //         if (responseData.apiStatus.code === '200') {
    //             toast.success(responseData.apiStatus.message);



    //             const newTotalRecords = totalRecords - 1;
    //             setTotalRecords(newTotalRecords);

    //             let totalPages = Math.ceil(newTotalRecords / recordsPerPage);
    //             if (currentPage > totalPages) {
    //                 setCurrentPage(totalPages);
    //             }
    //             clientList(currentPage);


    //             handleClose()

    //         } else {
    //             toast.error(responseData.apiStatus.message);
    //         }
    //     } catch (error) {
    //         console.error("Error in shopTypeDeleteApi:", error);
    //         toast.error("An error occurred while deleting the item.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };


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

            {/* <div className="container-fluid page-body-wrapper"> */}


                {/* <Sidenav /> */}

                {/* <!-- partial --> */}
                {/* <div style={{ paddingTop: "80px" }} className="main-panel"> */}
            <IndexLayout>
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-gradient-primary text-white me-2">
                                    <i className="nav-icon fas fa-user-friends menu-icon"></i>
                                </span> Client List
                            </h3>
                            <button onClick={() => navigate("/client" + "/Create")} style={{

                                padding: "15px 25px",

                            }} type="button" class="btn btn-gradient-primary">
                                <span class="button__text">Add Item</span>
                            </button>
                        </div>

                        {/* Table */}

                        <div class="card">
                            <div ref={cardRef}
                                className={`card-body ${isOverflowing && isMobile ? "over" : ""}`}>

                                {/* {loading ?
                                    <Preloader />
                                    : list.length === 0 ? (
                                        <Nodatafounded />


                                    ) : <> */}
                                <table class="table table-hover tableHost">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Code</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {list.map((list, ind) => ( */}
                                        <tr key={list.id}>
                                            <th scope="row">
                                                {/* {(currentPage - 1) * recordsPerPage + ind + 1} */}
                                                1
                                            </th>
                                            <td>
                                                <img
                                                    className='rounded'
                                                    src={list.avatar ? `${environment.baseURL}${list.avatar}` : "/assets/images/noimages.jpg"}
                                                    alt="Product Image"
                                                    style={{ width: '70px', height: '50px' }} />
                                            </td>
                                            <td>{list.firstname}{list.middlename}{list.lastname} mame</td>
                                            <td>{list.email} email</td>
                                            <td>{list.code}5555</td>

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
                                                    {list.status} Active
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
                                            {/* <td className="clients">

                                                <div className="d-flex gap-3">
                                                    <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip className="tooltip-view">View</Tooltip>}>
                                                        <a href="#">
                                                            <Link to={{ pathname: `/clientview/${list.id}` }} className="eye">
                                                                <i className="fa-solid fa-eye eye text-primary"></i>
                                                            </Link>

                                                        </a>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-edit">Edit</Tooltip>}>
                                                        <a href="#">
                                                            <Link
                                                                to={{ pathname: `/client/${list.id}` }} className="edit"
                                                            >
                                                                <i className="fas fa-pen-to-square text-success"></i>
                                                            </Link>
                                                        </a>
                                                    </OverlayTrigger>

                                                    <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-delete">Delete</Tooltip>}>
                                                        <a href="#"
                                                            className="delete"
                                                            onClick={() => {
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
                                                        <Link to={{ pathname: `/clientview/${list.id}` }}>
                                                            <i className="fas fa-eye icon text-white"></i>
                                                        </Link>
                                                    </div>

                                                    {/* Edit Button */}
                                                    <div className="button">
                                                        <Link to={{ pathname: `/client/${list.id}` }} >
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
                                        {/* // ))} */}


                                    </tbody>
                                </table>
                                {/* <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                                            {totalRecords === "10" ? null : <> <Pagination>
                                                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                                {renderPaginationItems()}
                                                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                                            </Pagination></>}


                                        </div> */}
                                {/* </> */}

                                {/* } */}


                            </div>
                        </div>


                    </div>
            </IndexLayout>
                    {/* <Footer /> */}

                {/* </div> */}

            {/* </div> */}
            
                  {/* status  */}
                  <Modalwrapper show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                    </Modal.Header>
            
                    <Modal.Body className="text-center">
                      <Modal.Title> Are you sure you want to{" "}
                      </Modal.Title>
                      {selectedItem === "Active" ? "deactivate" : "activate"} this
                      client?
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
            {/* Client Delete */}
            <Modalwrapper show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>

                <Modal.Body className="text-center">
                    <Modal.Title>Are you sure you want to</Modal.Title>
                    delete this Client data?
                </Modal.Body>
                <Modal.Footer style={{ alignSelf: "center" }}>
                    <Button variant="secondary" className="btn btn-light" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='btn btn-gradient-primary me-2' variant="primary"
                    // onClick={clientDeleteApi}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modalwrapper>
        </div>
    )
}

export default ClientList
