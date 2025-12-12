import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

// import { environment } from '../environments/enviornments';
import Navbar from '../common/navbar/navbar';
import Sidenav from '../common/sidenav/sidenav';
import { orderLists } from '../service/apiserver';
import '../page/vendorlist.css';

function Orderlist() {

  // const API_BASE_URL = environment.apiBaseUrl;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState('');
  
  const navigate = useNavigate();
  // const [expandedDescription, setExpandedDescription] = useState(null); // Track which description is expanded

  //Product list
  useEffect(() => {
    let multiTimeApiCall = false;

    const fetchData = async () => {
      setLoading(true);
      const vendorId = localStorage.getItem("vendorId");
      console.log("Vendor ID:", vendorId); // Check if vendorId is being retrieved correctly

      try {
        const responseData = await orderLists(0, 10, vendorId); // Pass correct parameters

        if (!multiTimeApiCall) { // Only update state if the component is still mounted
          if (responseData.apiStatus.code === "200") {
            setList(responseData.result.OrderData);
            console.log(responseData.result.OrderData, 'ddd');

          } else {
            toast.error(responseData.apiStatus.message);
          }
        }
      } catch (error) {
        // if (!multiTimeApiCall) {
        //   console.error("Error handled:", error);
        //   toast.error("An error occurred while fetching the product list.");
        // }
      } finally {
        if (!multiTimeApiCall) {
          setLoading(false); // Ensure loading state is stopped
        }
      }
    };

    fetchData();

    return () => {
      multiTimeApiCall = true; // Cancel any pending state updates if the component unmounts
    };
  }, []);

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
                </span> Order List
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                 
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

                    <table className="table table-hover tableHost text-center">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          {/* <th>id</th> */}
                          <th>Date Ordered</th>
                          <th>Refer Code</th>
                          <th>Total Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((value, ind) => (
                          <tr key={value.id}>
                            <th scope="row">{ind + 1}</th>
                            {/* <td>{value.id}</td> */}
                            <td>{value.date_created}</td>
                            <td>{value.code}</td>
                            <td>{value.total_amount}</td>
                            <td>
                            <div
                              className={`badge ${value.status === "Active"
                                  ? "badge-success"
                                  : value.status === "Inactive" || value.status === "Cancelled"
                                    ? "badge-danger"
                                    : value.status === "Out of Delivery"
                                      ? "badge-warning"
                                      : value.status === "Delivered"
                                        ? "badge-dark"
                                        : value.status === "Pending"
                                          ? "badge-pending"
                                          : value.status === "Packed"
                                            ? "badge-packed"
                                            : value.status === "Confirmed"
                                              ? "badge-confirmed"
                                              : ""
                                }`}
                              style={
                                value.status === "Active"
                                  ? { backgroundColor: "green" }
                                  : value.status === "Inactive" || value.status === "Cancelled"
                                    ? { backgroundColor: "red" }
                                    : value.status === "Out of Delivery"
                                      ? { backgroundColor: "grey" }
                                      : value.status === "Delivered"
                                        ? { backgroundColor: "black" }
                                        : value.status === "Pending"
                                          ? { backgroundColor: "orange" }
                                          : value.status === "Packed"
                                            ? { backgroundColor: "violet" }
                                            : value.status === "Confirmed"
                                              ? { backgroundColor: "blue" }
                                              : {}
                              }
                            >
                              {value.status}
                            </div>





                          </td>
                            <td className="clients">
                              <li>
                              <Link
                                  to={{ pathname: `/vendororderview/${value.id}` }}
                                  className="eye"
                                >
                                  <i className="fa-solid fa-eye eye"></i>
                                </Link>
                              </li>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orderlist;
