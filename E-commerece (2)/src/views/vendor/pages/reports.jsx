import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "react-bootstrap/Pagination";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../../../shared/vendor/Navbar/navbar";
import Sidenav from "../../../shared/vendor/Sidenav/sidenav";
import VENDORAPI from "../../../api/services/vendorLogin/vendorAPI";
import Footer from "../../../shared/footer";
import { useOverflowDetector } from "../../../components/useOverflowDetector";
import Preloader from "../../../components/Preloader";
import NoDataFounded from "../../../components/NoDataFound";


function MonthlyReports() {
  // Vendor Api List

  // const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false)

  // Pagination Usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 10;

  const [filter, setfilter] = useState("");

  const deleteIdRef = useRef(null);
  const [vendor_id, setVendorId] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Pagination Method

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


  //report api
    const [list, setNodata] = useState(false); 
    const [hasFetched, setHasFetched] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const ReportList = async (page) => {
    // e.preventDefault();
    setLoading(true);
    setSubmit(true);
    const totken = localStorage.getItem("token");
    if (!totken) {
      navigate("/vendorlogin");
      return;
    }
    if (!selectedMonth) {
      setLoading(false)
      return;
    }
    if (selectedMonth?.length === 0) {
      setLoading(false)
      return;
    }
    const vendorId = localStorage.getItem("vendorId");
    const apiData = {
      month: selectedMonth,
      pageIndex: page - 1 ? page - 1 : 0,
      dataLength: recordsPerPage,
      vendorId: vendorId
    };

    try {
      const responseData = await VENDORAPI.vendorMonthlyReport(apiData);
      setHasFetched(true);

      if (responseData.apiStatus.code !== "200") {
        setNodata(true);
        setReportList([]); 
        setTotalPages(0);
        return;
      }
      const orderData = responseData.result.orderData;
      const totalRecords = responseData.result.totalcount;

      if (orderData.length > 0) {
        setReportList(orderData);
        setTotalRecords(totalRecords);
        setTotalPages(Math.ceil(totalRecords / recordsPerPage));
        setNodata(false);
      } else {
        setReportList([]);
        setTotalPages(0);
        setNodata(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setNodata(true);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  // useEffect(() => {
  //   if (!selectedMonth) return;
  //   ReportList(currentPage);
  // }, [currentPage, selectedMonth]);



  const { ref, isOverflowing } = useOverflowDetector([reportList, loading]);
  const inputRef = useRef(null);
  const handleClick = () => {
    const input = inputRef.current;
    if (!input) return;

    // Reset focus so showPicker can be triggered again
    input.blur(); // Remove focus
    setTimeout(() => {
      input.focus(); // Refocus to trigger onFocus again
      if (input.showPicker) {
        input.showPicker();
      }
    }, 0);
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
                  <i class="fa fa-calendar menu-icon"></i>
                </span>{" "}
                Monthly Order Report
              </h3>
            </div>

            {/* Table */}

            <div class="card">
              <div ref={ref}
                className={`card-body ${isOverflowing ? 'over' : ''}`}>
                <div>
                  {/* <strong>Month</strong> */}
                </div>
                <div className="d-flex justify-content-center monthly-report-btn">
                <div class="coolinput w-25">
                    <label for="input" class="text" style={{ top: "7px" }}>Month</label>
                    <input type="month"
                      style={submit && selectedMonth?.length === 0 ? { borderColor: "red", padding: "13px 10px" } : { padding: "13px 10px" }}
                      ref={inputRef}
                      onChange={handleMonthChange}
                      value={selectedMonth}
                      onClick={handleClick} 
                      id="exampleInputEmail1" placeholder="Enter Month And Year" name="input" class="input" />
                    {submit && selectedMonth?.length === 0 ? <div className="text-danger">*Please select month</div> : <></>}

                  </div>
                  <div className="monthly-report-icons">
                    <span className="page-title-icon bg-gradient-primary text-white ms-2 report-icon" onClick={() => ReportList(currentPage)}>
                      <i class="fa-solid fa-arrow-down-wide-short menu-icon"></i>
                    </span>
                    <span className="page-title-icon bg-gradient-primary text-white ms-2 report-icon">
                      <i class="fa-solid fa-print menu-icon"></i>
                    </span>
                  </div>
                </div>
                {loading ? (
                  <Preloader />
                ) : hasFetched ? (
                  !list ? (
                      <>
                        <table class="table table-hover tableHost">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Client</th>
                              <th>Ref. Code</th>
                              <th>Date Created</th>
                              <th>Date updated</th>
                              <th>Status</th>
                              <th>Total Amount</th>
                            </tr>
                          </thead>
                          {reportList.map((list, ind) => (
                            <tbody key={ind}>
                              <tr>
                                <td className="text-dark">{(currentPage - 1) * recordsPerPage + ind + 1}</td>
                                {/* <td>{list.vendor_id}</td> */}
                                <td>{list.client}</td>
                                <td>{list.code}</td>
                                <td>{list.created_date}</td>
                                <td>{list.updated_date}</td>
                                <td>{list.status}</td>
                                <td>{list.total_amount}</td>
                              </tr>

                            </tbody>
                          ))}


                        </table>

                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>

                          {totalRecords === "10" ? null : <><Pagination>
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {renderPaginationItems()}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                          </Pagination></>}

                        </div>
                      </>
                  ) : (
                    <NoDataFounded />
                  )
                ) : null}
              </div>
            </div>
          </div>
          <Footer />

        </div>

      </div>


    </div>
  );
}

export default MonthlyReports;
