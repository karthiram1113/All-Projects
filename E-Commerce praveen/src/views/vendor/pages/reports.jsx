import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "react-bootstrap/Pagination";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../navbar/navbar";
import Sidenav from "../sidenav/sidenav";
import ADMINAPI from "../../../api/services/AdminLogin/adminAPI";
import VENDORAPI from "../../../api/services/vendorLogin/vendorAPI";


function MonthlyReports() {
  // Vendor Api List

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination Usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filter, setfilter] = useState("");

  const deleteIdRef = useRef(null);
  const [vendor_id, setVendorId] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 useEffect(() => {
  ReportList(currentPage);
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

  //report api
  const [reportList, setReportList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // const ReportList = async (page) => {
  //   setLoading(true);

  //   const apiData = {
  //     pageIndex:  page - 1,
  //     dataLength: "5",
  //   };

  //   try {
  //     const response = await fetch(
  //       `http://192.168.0.102/Hermon_Ecom/api/report/Adminmonthlyreport`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //           // "Authorization" : `Bearer ${token}`
  //         },
  //         body: JSON.stringify({
  //           month: selectedMonth,
  //          apiData
  //         }),
  //       }
  //     );

  //     const responseData = await response.json();
  //     if (responseData.apiStatus.code === "200") {
  //       setReportList(responseData.result.orderData);
  //       toast.success(responseData.apiStatus.message);
  //     }
  //     else if(responseData.apiData.code === "400") {
  //       setReportList([])
  //     }
  //   } catch {}
  // };

   const ReportList = async () => {
      // e.preventDefault();
      setLoading(true);
  
      const apiData = {
        month: selectedMonth,
        // pageIndex: page - 1,
        // dataLength: "5",
        vendorId: "1"
      };
  
      try {
        const responseData = await VENDORAPI.vendorMonthlyReport(apiData);
        if (responseData.apiStatus.code === "400") {
           setReportList([])
        } else if (responseData.apiStatus.code === "200") {
           setReportList(responseData.result.orderData);
           setVendorId(responseData.result.orderData.vendor_id);
        toast.success(responseData.apiStatus.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
      } finally {
        setLoading(false);
      }
    };

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
                  <i class="mdi mdi-contacts menu-icon"></i>
                </span>{" "}
                Monthly Order Report
              </h3>
            </div>

            {/* Table */}

            <div class="card">
              <div class="card-body over">
                <div>
                  <strong>Month</strong>
                </div>
                <div className="my-2 ">
                  <input
                    type="month"
                    className="w-25 input-month"
                    onChange={handleMonthChange}
                    value={selectedMonth}
                  />

                  <button className="ms-3 filter-text" onClick={ReportList}>
                    Filter
                  </button>
                  <button className="mx-3 filter-text">Print</button>
                </div>

                <table class="table table-hover tableHost">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Date Created</th>
                      <th>Ref. Code</th>
                      <th>Client</th>
                      <th>Vendor</th>
                      <th>Status</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  {reportList.map((list, ind) => (
                    <tbody key={ind}>
                      <tr>
                        <td>{ind}</td>
                        {/* <td>{list.vendor_id}</td> */}
                        <td>{list.date_created}</td>
                        <td>{list.code}</td>
                        <td>{list.client}</td>
                        <td>{list.vendor}</td>
                        <td>{list.status}</td>
                        <td>{list.total_amount}</td>
                      </tr>
                      
                    </tbody>
                  ))}
                  
                </table>
                {/* <div style={{display: "flex",justifyContent: "center",marginTop: "20px"}}>
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
                      </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MonthlyReports;
