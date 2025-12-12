import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar/navbar'
import Sidenav from '../../Common/Sidenav/sidenav'
import product from '../admin-product/product.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productLists } from '../../services/api-services'
import { environment } from '../../environments/enviornments'
import Pagination from 'react-bootstrap/Pagination';


function Product() {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

    // Pagination Usestate
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
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

  const productList = async (page) => {
    // e.preventDefault();
    setLoading(true);
  
    try {
      const responseData = await productLists(page - 1, recordsPerPage);
      if (responseData.apiStatus.code === "404") {
        setList([]);
        // setNoData(true);

      } else if (responseData.apiStatus.code === "200") {
        setList(responseData.result.VendorData);
        setTotalRecords(responseData.result.totalRecordCount); 
     
      }  
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // useEffect(() => {
  //   let multiTimeApiCall = false;

  //   const fetchData = async () => {
  //     setLoading(true);

  //     try {
  //       const responseData = await productLists(0, 20); 
  //       if (!multiTimeApiCall) { 
  //         if (responseData.apiStatus.code === "200") {
  //           setList(responseData.result.VendorData);
  //           // toast.success(responseData.apiStatus.message);
  //         } else {
  //           toast.error(responseData.apiStatus.message);
  //         }
  //       }
  //     } catch (error) {
  //       if (!multiTimeApiCall) {
  //         console.error("Error handled:", error);
  //         toast.error("An error occurred while fetching the product list.");
  //       }
  //     } finally {
  //       if (!multiTimeApiCall) {
  //         setLoading(false); // Ensure loading state is stopped
  //       }
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     multiTimeApiCall = true; // Cancel any pending state updates if the component unmounts
  //   };
  // }, []);


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
                </span> Product List
              </h3>

            </div>

            {/* Table */}


            <div class="card">
              <div class="card-body over">

                {loading ?
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
                  </div> :list.length === 0 ? (
                  <h4 style={{ textAlign: "center", paddingTop: "40px" }}>NO DATA FOUND</h4>
                ) : <><table class="table table-hover tableHost">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Product Name</th>
                          <th>Vendor</th>
                          <th>Cost</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((list, ind) => (
                          <tr key={list.id}>
                            <th scope="row">{(currentPage - 1) * recordsPerPage + ind + 1}</th>
                            <td>{list.name}</td>
                            <td>{list.code}  {list.username}</td>
                            <td>{list.price}</td>
                            {/* <td>{list.image}</td> */}
                            <td>
                              <img
                                src={list.image_path ? `${environment.apiBaseUrl}${list.image_path}` :"/assets/images/noimages.jpg"}
                                alt="Product Image"
                                style={{ width: '50px', height: '50px' }} />
                            </td>

                            <td>
                              <div
                                className={`badge ${list.status === "active"
                                  ? "badge-success"
                                  : list.status === "inactive"
                                    ? "badge-danger"
                                    : "badge-secondary"}`}
                                style={list.status === "Active"
                                  ? { backgroundColor: "green" }
                                  : list.status === "Inactive"
                                    ? { backgroundColor: "red" }
                                    : { backgroundColor: "gray" }}
                              >
                                {list.status}
                              </div>
                            </td>



                            <td className="clients">
                              <li>
                                <Link to={{ pathname: `/admin-product-view/${list.id}` }} className="eye">
                                  <i className="fa-solid fa-eye eye"></i>
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

{/* view page model */}

<div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Product View</h1>
        <button type="button" className="btn-close close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-2">
            <img style={{width:'150px'}} src="/assets/images/praveen.jpg" alt="Image Description" />
          </div>
          <div  className="col-md-10">
            <div style={{textAlign:'center'}}>
            <p>Vendor</p>
            <p>Product Name</p>
            </div>
           
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary no-btn" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

  
    </div>
  )
}

export default Product
