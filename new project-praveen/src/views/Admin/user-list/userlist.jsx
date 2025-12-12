import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import Sidenav from '../Sidenav/sidenav';
import './userlist.css'
import { toast } from 'react-toastify';
// import { adminUserList, userDelete } from '../services/api-services';
import { environment } from '../../../api/api';
import Pagination from 'react-bootstrap/Pagination';
import ADMINAPI from '../../../api/services/AdminLogin/adminAPI';

function Userlist() {

    // User Type Api List

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [deleteId, setId] = useState(null);
  const deleteIdRef = useRef(null); 
  const shouldFetchData = useRef(true);
  const [value,setValue] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()


    // List Api Start

    
  // Pagination Usestate
 const [currentPage, setCurrentPage] = useState(1);
 const [recordsPerPage] = useState(5);
 const [totalRecords, setTotalRecords] = useState(0);

 useEffect(() => {
  userList(currentPage);
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

// user List

const userList = async (page) => {
  // e.preventDefault();
  setLoading(true);
  const apidata={
    
    pageIndex: page - 1,
    dataLength: 5


  }

  try {
    const responseData = await ADMINAPI.adminUserList(apidata);
    if (responseData.apiStatus.code === "404") {
      setList([]);
      

    } else if (responseData.apiStatus.code === "200") {
      setList(responseData.result.AdminData);
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

  


      

      // User Delete Api Start

  const userDeleteApi = async (e) => {
    e.preventDefault();
    const deleteId = deleteIdRef.current;
    if (!deleteId) return;
    setLoading(true);

    try {
      const responseData = await ADMINAPI.adminUserDelete(deleteId);

      if (responseData.apiStatus.code === '200') {
        toast.success(responseData.apiStatus.message);
       
        const newTotalRecords = totalRecords - 1;
        setTotalRecords(newTotalRecords);

        let totalPages = Math.ceil(newTotalRecords / recordsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }
        userList(currentPage);

    
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
                <i className="nav-icon fas fa-users-cog menu-icon"></i>
              </span>User List
            </h3> 
            <button onClick={()=>navigate("/adminuser/Create")} style={{ float: "right",marginBottom:"20px" }} type="button" class="button">
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
          minHeight: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
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
      <h4 style={{ textAlign: "center", paddingTop: "40px" }}>NO DATA FOUND</h4>
    ):
      <><table className="table table-hover tableHost">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{(currentPage - 1) * recordsPerPage + index + 1}</th>
                          <td>
                            <img
                              src={item.avatar ? `${environment.baseURL}${item.avatar}` : "/assets/images/noimages.jpg"}
                              alt="Product Image"
                              style={{ width: '50px', height: '50px' }} />
                          </td>
                          <td>{item.firstname + " " + item.lastname}</td>
                          <td>{item.username}</td>
                          <td>{item.type}</td>
                          <td className="clients">
                            <li>
                              <Link to={`/adminuserview/${item.id}`} className="eye">
                                <i className="fa-solid fa-eye eye"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to={`/adminuserget/Edit/${item.id}`} className="edit">
                                <i className="fa-regular fa-pen-to-square edit-font"></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="delete"
                                onClick={() => {
                                  deleteIdRef.current = item.id;
                                  handleShow(); setValue(item.username);
                                } }

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
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                      </Pagination>
                    </div></>

    }


            </div>
          </div>


        </div>

        {/* <!-- partial --> */}
      </div>
      {/* <!-- main-panel ends --> */}
    </div>


    {/* Delete Modal */}

<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body> Are you sure you want to delete this username {value}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" class="btn btn-light" onClick={handleClose}>
          Close
        </Button>
        <Button
         onClick={userDeleteApi} 
         className='btn btn-gradient-primary me-2' variant="primary" >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>

  </div>

  )
}

export default Userlist
