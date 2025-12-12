import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../../shared/admin/Navbar/navbar'
import Sidenav from '../../../shared/admin/Sidenav/sidenav'
// import { shopTypeDelete, shopTypeLists } from '../services/api-services';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './shopType.css'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ADMINAPI from '../../../api/services/AdminLogin/adminAPI';
import Footer from '../../../shared/footer';
import ModalWrapper from '../../../components/ModalWrapper';
import Preloader from '../../../components/Preloader';
import NoDataFounded from '../../../components/NoDataFound';

function Shoptypelist() {


  // Shop Type Api List

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [deleteId, setId] = useState(null);
  const deleteIdRef = useRef(null); 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  // List Api Start

  
  // Pagination Usestate
 const [currentPage, setCurrentPage] = useState(1);
 const [recordsPerPage] = useState(10);
 const [totalRecords, setTotalRecords] = useState(0);

 useEffect(() => {
  shopList(currentPage);
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

// Shop Type List

const shopList = async (page) => {
  // e.preventDefault();
  setLoading(true);
  const totken = localStorage.getItem("token");
  if (!totken) {
    navigate("/");
    return;
  }
const apidata={
  
    pageIndex: page -1,
  dataLength: recordsPerPage

}
  try {
    const responseData = await ADMINAPI.adminShopList(apidata);
    if (responseData.apiStatus.code === "404") {
      setList([]);
      

    } else if (responseData.apiStatus.code === "200") {
      setList(responseData.result.ShopTypeListData);
      setTotalRecords(responseData.result.totalRecordCount); 
   
    }
  } catch (error) {
    console.log("Error handled =" + error);
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



  const shopTypeDeleteApi = async (e) => {
    e.preventDefault();
    const deleteId = deleteIdRef.current;
    if (!deleteId) return;
    setLoading(true);

    try {
      const responseData = await ADMINAPI.adminShopDelete(deleteId);

      if (responseData.apiStatus.code === '200') {
        toast.success(responseData.apiStatus.message);



        const newTotalRecords = totalRecords - 1;
        setTotalRecords(newTotalRecords);

        let totalPages = Math.ceil(newTotalRecords / recordsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }
        shopList(currentPage);

    
        handleClose()
        
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.error("Error in shopTypeDeleteApi:", error);
      toast.error("An error occurred while deleting the item.");
    } finally {
      setLoading(false);
    }
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

      <div className="container-fluid page-body-wrapper">


        <Sidenav />

        {/* <!-- partial --> */}
        <div style={{ paddingTop: "80px" }} className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fa-solid fa-shop menu-icon"></i>
                </span> Shop Type List
              </h3>
              <button onClick={() => navigate("/Adminshop/Create")} style={{
              
                padding: "15px 25px",
              }} type="button" class="btn btn-gradient-primary">
  <span class="button__text">Add Item</span>
  {/* <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span> */}
</button>
            </div>


            {/* Table */}

            <div class="card">
              <div ref={cardRef}
                className={`card-body ${isOverflowing && isMobile ? "over" : ""}`}>

              {loading ? (
                  <Preloader />

      ) :list.length === 0 ? (
                                       <NoDataFounded />
                   
      ):
        <><table className="table table-hover tableHost">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Shop Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{(currentPage - 1) * recordsPerPage + index + 1}</th>
                            <td>{item.name}</td>
                            <td>
                              <div
                                className={`badge badges ${item.status === "Active"
                                  ? "badge-success"
                                  : item.status === "Inactive"
                                    ? "badge-danger"
                                    : item.status === "Pending"
                                      ? "badge-secondary"
                                      : "badge-warning"
                                  }`}
                                // style={item.status === "Active"
                                //   ? { backgroundColor: "green" }
                                //   : item.status === "Inactive"
                                //     ? { backgroundColor: "red" }
                                //     : { backgroundColor: "gray" }}
                              >
                                {item.status}
                              </div>
                            </td>
                            <td className="clients">
                              {/* <li>
                                <Link to={`/Adminshopview/${item.id}`} className="eye">
                                  <i className="fa-solid fa-eye eye"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to={`/adminshop/edit/${item.id}`} className="edit">
                                  <i className="fa-regular fa-pen-to-square edit-font"></i>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="delete"
                                  onClick={() => {
                                    deleteIdRef.current = item.id;
                                    handleShow();
                                  } }

                                >
                                  <i className="fa-solid fa-trash delete-font"></i>
                                </Link>
                              </li> */}
                              <div className="d-flex gap-3">
                                <OverlayTrigger className="tool-tip" placement="top" overlay={<Tooltip >View</Tooltip>}>
                                  <a href="#">
                                    <Link
                                      to={`/Adminshopview/${item.id}`} className="eye"
                                    >
                                      <i className="fas fa-eye text-primary"></i>
                                    </Link>

                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                  <a href="#">
                                    <Link
                                      to={`/adminshop/edit/${item.id}`} className="edit"
                                    >
                                      <i className="fas fa-pen-to-square text-success"></i>
                                    </Link>
                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                  <a href="#"
                                    className="delete"
                                    onClick={() => {
                                      deleteIdRef.current = item.id;
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
                        {totalRecords === "10" ? null : <>

                          <Pagination>
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {renderPaginationItems()}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                          </Pagination></>}

                      </div></>

     }


              </div>
            </div>


          </div>
          <Footer />

          {/* <!-- partial --> */}
        </div>
        {/* <!-- main-panel ends --> */}
      </div>
      {/* Delete Modal */}
      <ModalWrapper show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Modal.Title>Are you sure you want to</Modal.Title>
          delete this Shoptype data?
        </Modal.Body>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button variant="secondary" class="btn btn-light" onClick={handleClose}>
            Close
          </Button>
          <Button className='btn btn-gradient-primary me-2' variant="primary"
            onClick={shopTypeDeleteApi}
          >
            Delete
          </Button>
        </Modal.Footer>
      </ModalWrapper>
    </div>



  )
}

export default Shoptypelist
