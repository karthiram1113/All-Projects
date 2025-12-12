import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import OVERALLAPI from "../../api/over-all-api";
import Navbar from "../../shared/navbar";
import Sidenav from "../../shared/sidenav";
import { useOverflow } from "../../shared/useOverflowDetector";
import Preloader from "../../shared/preloader";
import Nodatafounded from "../../shared/NoDataFound";
import Footer from "../../shared/footer";
import IndexLayout from "../../views";



function Reports() {
    // Vendor Api List

    // const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate();
    // Pagination Usestate
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const recordsPerPage = 10;
    const [filter, setfilter] = useState("");
    const [list, setNodata] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [reportList, setReportList] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const deleteIdRef = useRef(null);
    const [id, setid] = useState();

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

    const handleMonthChange = (e) => {
        const value = e.target.value;
        setSelectedMonth(value);
    };


    // const ReportList = async (page) => {
    //   // e.preventDefault();
    //   setLoading(true);
    //   setSubmit(true);
    //   const totken = localStorage.getItem("token");
    //   if (!totken) {
    //     navigate("/");
    //     return;
    //   }
    //   if (!selectedMonth) {
    //     setLoading(false)
    //     return;
    //   }
    //   if (selectedMonth?.length === 0) {
    //     setLoading(false)
    //     return;
    //   }

    //   const apiData = {
    //     month: selectedMonth,
    //     pageIndex: totalPages == 0 ? 0 : page ? page - 1 : 0,
    //     dataLength: recordsPerPage,
    //   };

    //   try {
    //     const responseData = await OVERALLAPI.adminReports(apiData);
    //     if (response.apiStatus.code !== "200") {
    //       setNodata(true);
    //       return;
    //     }
    //     if (responseData.apiStatus.code === "200") {
    //       // setSubmit(false);
    //       setReportList(responseData.result.orderData);
    //       const totalRecords = responseData.result.totalcount;
    //       setTotalRecords(totalRecords);
    //       setTotalPages(Math.ceil(totalRecords / recordsPerPage));
    //       console.log("test")
    //     } else {
    //       console.log("list")
    //       setReportList([])
    //       setTotalPages(0)
    //     }
    //   } catch (error) {
    //     console.error("Error during login:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
//monthly report api
    // const ReportList = async (page) => {
    //     setLoading(true);
    //     setSubmit(true);
    //     const totken = localStorage.getItem("token");

    //     if (!totken) {
    //         navigate("/");
    //         return;
    //     }

    //     if (!selectedMonth) {
    //         setLoading(false);
    //         return;
    //     }
    //     const vendorId = localStorage.getItem("vendorId");
    //     const apiData = {
    //         month: selectedMonth,
    //         pageIndex: page - 1,
    //         dataLength: recordsPerPage,
    //         vendorId: vendorId || "1"
    //     };

    //     try {
    //         const responseData = await OVERALLAPI.vendorMonthlyReport(apiData);

    //         setHasFetched(true);

    //         if (responseData.apiStatus.code !== "200") {
    //             setNodata(true);
    //             setReportList([]); // Just to be sure
    //             setTotalPages(0);
    //             return;
    //         }

    //         const orderData = responseData.result.orderData;
    //         const totalRecords = responseData.result.totalcount;

    //         if (orderData.length > 0) {
    //             setReportList(orderData);
    //             setTotalRecords(totalRecords);
    //             setTotalPages(Math.ceil(totalRecords / recordsPerPage));
    //             setNodata(false);
    //         } else {
    //             setReportList([]);
    //             setTotalPages(0);
    //             setNodata(true);
    //         }

    //     } catch (error) {
    //         console.error("Error during API call:", error);
    //         setNodata(true);
    //     } finally {
    //         setLoading(false);
    //         setHasFetched(true);
    //     }
    // };
    // useEffect(() => {
    // if (!selectedMonth) return;
    //   ReportList(currentPage);
    // }, [currentPage, selectedMonth]);



    const { ref, isOverflowing } = useOverflow([reportList, loading]);

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
            {/* <Navbar /> */}

            {/* Vendor */}

            {/* <div className="container-fluid page-body-wrapper"> */}
                {/* <Sidenav /> */}

                {/* <!-- partial --> */}
                {/* <div style={{ paddingTop: "80px" }} className="main-panel"> */}
                    <IndexLayout>
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-gradient-primary text-white me-2">
                                    <i class=" fa fa-calendar menu-icon"></i>
                                </span>{" "}
                                Monthly Report
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
                                    {/* <div className="monthly-report-input"> */}

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
                                    {/* </div> */}
                                    <div className="monthly-report-icons d-flex">
                                        <span className="page-title-icon bg-gradient-primary text-white ms-3 report-icon" 
                                        // onClick={() => ReportList(currentPage)}
                                        >
                                            <i class="fa-solid fa-arrow-down-wide-short menu-icon" style={{padding:"10px"}}></i>
                                        </span>
                                        {/* <span className="page-title-icon bg-gradient-primary text-white ms-2 report-icon">
                                            <i class="fa-solid fa-print menu-icon"></i>
                                        </span> */}
                                        <span className="page-title-icon bg-gradient-primary text-white ms-2 report-icon custom-button">
                                        {/* <button class="custom-button"> */}
                                            <svg class="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                                            </svg>
                                            <span class="icon2"></span>
                                        {/* </button> */} 
                                        </span>

                                    </div>

                                    {/* <button className="ms-3 filter-text" onClick={ReportList}>
                    Filter
                  </button>
                  <button className="mx-3 filter-text">Print</button> */}
                                </div>


                                {/* {loading ? (
                                    <Preloader />
                                ) : hasFetched ? (
                                    !list ? (
                                        <> */}
                                            <table className="table table-hover tableHost">
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
                                                <tbody>
                                                    {/* {reportList.map((list, ind) => ( */}
                                                        <tr >
                                                            <th scope="row">
                                                                {/* {(currentPage - 1) * recordsPerPage + ind + 1} */}
                                                                1
                                                            </th>
                                                            <td>{list.created_date}date</td>
                                                            <td>{list.code}555</td>
                                                            <td>{list.client}client</td>
                                                            <td>{list.vendor}vendor</td>
                                                            <td>{list.status}Active</td>
                                                            <td>{list.total_amount}total amount</td>
                                                        </tr>
                                                    {/* // ))} */}
                                                </tbody>
                                            </table>

                                            {/* {totalRecords !== "10" && (
                                                <div style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
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
                                                </div>
                                            )} */}
                                        {/* </>
                                    ) : (
                                        <Nodatafounded />
                                    )
                                ) : null} */}






                            </div>
                        </div>
                    </div>
                     </IndexLayout>
                    {/* <Footer /> */}

                {/* </div> */}
            {/* </div> */}


        </div>
    );
}

export default Reports;
