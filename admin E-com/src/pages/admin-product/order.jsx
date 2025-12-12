import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar/navbar'
import Sidenav from '../../Common/Sidenav/sidenav'
import { orderLists } from '../../services/api-services';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';


function Order() {

  // Order Usestate

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

  // Pagination Usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
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

  const orderList = async (page) => {
    // e.preventDefault();
    setLoading(true);

    try {
      const responseData = await orderLists(page - 1, recordsPerPage);
      if (responseData.apiStatus.code === "404") {
        setList([]);


      } else if (responseData.apiStatus.code === "200") {
        setList(responseData.result.OrderData);
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


  // useEffect(() => {
  //     let multiTimeApiCall = false;

  //     const fetchData = async () => {
  //         setLoading(true);

  //         try {
  //             const responseData = await orderLists(0, 20); // Updated to pass correct parameters

  //             if (!multiTimeApiCall) { // Only update state if the component is still mounted
  //                 if (responseData.apiStatus.code === "200") {
  //                     setList(responseData.result.OrderData);
  //                     // toast.success(responseData.apiStatus.message);
  //                 } else {
  //                     toast.error(responseData.apiStatus.message);
  //                 }
  //             }
  //         } catch (error) {
  //             if (!multiTimeApiCall) {
  //                 console.error("Error handled:", error);
  //                 toast.error("An error occurred while fetching the product list.");
  //             }
  //         } finally {
  //             if (!multiTimeApiCall) {
  //                 setLoading(false); // Ensure loading state is stopped
  //             }
  //         }
  //     };

  //     fetchData();

  //     return () => {
  //       multiTimeApiCall = true; // Cancel any pending state updates if the component unmounts
  //     };
  //   }, []);


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
                  <i className="nav-icon fas fa-list menu-icon"></i>
                </span> Order List
              </h3>

            </div>

            {/* Table */}


            <div className="card">
              <div className="card-body over">
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
                ) : list.length === 0 ? (
                  <h4 style={{ textAlign: "center", paddingTop: "40px" }}>NO DATA FOUND</h4>
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
                          <td>{item.date_created}</td>
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
                                      ? { backgroundColor: "yellow" }
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

                          <td className="clients">
                            <li>
                              <Link to={{ pathname: `/admin-order-view/${item.id}` }} className="eye">
                                <i className="fa-solid fa-eye eye"></i>
                              </Link>
                            </li>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table><div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                      <Pagination>
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                      </Pagination>
                    </div></>

                )}
              </div>
            </div>



          </div>

          {/* <!-- partial --> */}
        </div>
        {/* <!-- main-panel ends --> */}
      </div>
    </div>
  )
}

export default Order
