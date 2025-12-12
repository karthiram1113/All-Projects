import React, { useEffect, useState } from "react";
import Navbars from "../../common/Navbar";
import { useNavigate } from "react-router-dom";
import "./index.css";

import AOS from "aos";
import "aos/dist/aos.css";
import superAdminApis from "../../api/services/admin-pages/superAdmin";
import { toast } from "react-toastify";

function Collections() {

  
        useEffect(() => {
              AOS.init({
                duration: 1000,  
                once: false,    
                mirror: true,    
              });
            }, []);

  const navigate = useNavigate();

  const handleBackCustomer = () => {
    navigate("/customer-details-list");
  };


const formatForPayload = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${year}-${month}-${day}`; // already correct format
};



const [collectionDashboardList,setCollectionDashboardList] = useState("")
const [collectionList,setCollectionList] = useState([])

   const [loading ,setLoading] = useState(false)
       const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);


const [searchTerm, setSearchTerm] = useState(() => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return today;
});

const totalPages = Math.ceil(totalRecords / recordsPerPage);


  const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) return; 
  setCurrentPage(page);
};

  
  useEffect(() => {
  handleCollectionDasboardList()
  handleColectionList(currentPage)
  }, [currentPage,searchTerm]);
  
  
  const handleCollectionDasboardList = () => {
  
    const apiData = {};
  
    superAdminApis.collectionDashboardListAPI(apiData)
      .then((responseData) => {
        if (responseData?.apiStatus?.code === "200") {
          setCollectionDashboardList(responseData?.result || []);
        } else {
          setCollectionDashboardList([]);
          // toast.error(responseData?.apiStatus?.message || "Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
        toast.error("An error occurred while fetching data.");
      });
  };
  





const handleColectionList = (page) => {
  setLoading(true);

  const apiData = {
    pageIndex: page - 1,
    dataLength: recordsPerPage,
searchDate: formatForPayload(searchTerm)
  };

  superAdminApis.customerDetailsList(apiData)
    .then((responseData) => {
      if (responseData?.apiStatus?.code === "200") {
        setLoading(false);
        setCollectionList(responseData?.result?.customerDetails || []);
        setTotalRecords(responseData?.result?.totalRecordCount || 0);
      } else {
        setCollectionList([]);
        setLoading(false);
        // toast.error(responseData?.apiStatus?.message || "Failed to fetch data");
      }
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching customer details:", error);
      toast.error("An error occurred while fetching data.");
    });
};


  return (
    <div>
      <Navbars />

      <div className="container all-modules-height card p-3">
        {/* ===== HEADER ===== */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
          <h5 className="heading-with-line mb-2 mb-md-0 aquanew-text-effect">
            💰 Customer Collections
            <hr className="smooth-line" />
          </h5>

            <div className="search-container mx-auto mb-2 mb-md-0">
    <input
      type="date"
      className="form-control search-input"
      placeholder="Search customers..."
      value={searchTerm}
       onClick={(e) => {
        const input = e.currentTarget;
        if (typeof input.showPicker === "function") {
          input.showPicker(); 
        } else {
          input.focus(); 
        }
      }}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

          <button className="btn add-customer" onClick={handleBackCustomer}>
            <i className="bi bi-arrow-left me-2"></i>  <i className="fa fa-arrow-left me-2"></i> Back
          </button>
        </div>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="row g-3 mb-4" data-aos="fade-up">
          <div className="col-md-3 col-sm-6">
            <div className="summary-card gold">
              <i className="bi bi-cash-coin icon"></i>
              <div>
                <p className="mb-2 collection-page-cards">Today’s Collection</p>
                <h5>{collectionDashboardList?.today_collection_count} - ₹{collectionDashboardList?.today_collection}</h5>
              </div>
            </div>
          </div>
          {/* <div className="col-md-3 col-sm-6">
            <div className="summary-card green">
              <i className="bi bi-people-fill icon"></i>
              <div>
                <p className="mb-2 collection-page-cards">Total Customers Paid</p>
                <h5>{collectionDashboardList?.totalCustomersPaid}</h5>
              </div>
            </div>
          </div> */}
          <div className="col-md-4 col-sm-6">
            <div className="summary-card blue">
              <i className="bi bi-calendar2-week icon"></i>
              <div>
                <p className="mb-2 collection-page-cards">This Month Collection</p>
<h5>
  {collectionDashboardList?.monthly_collection_count || 0}
  {" - ₹"}
  {collectionDashboardList?.monthly_collection || 0}
</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="summary-card red">
              <i className="bi bi-exclamation-triangle-fill icon"></i>
              <div>
                <p className="mb-2 collection-page-cards">Pending Dues</p>
                <h5>{collectionDashboardList?.pending_dues||'0'}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="summary-card purple">
              <i className="bi bi-graph-up-arrow icon"></i>
              <div>
                <p className="mb-2 collection-page-cards">Active Loans</p>
                <h5>{collectionDashboardList?.active_count||'0'}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* ===== COLLECTION TABLE ===== */}
        <div className="card shadow-sm p-3" data-aos="fade-up">
          <h6 className="mb-3 text-muted fw-bold">🧾 Collection Records</h6>
          {/* <div className="table-responsive"> */}


              <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Payment Type</th>
                  <th>UPI Number</th>
                  <th>Principal Paid (₹)</th>
                  <th>Interest Paid (₹)</th>
                  <th>Total (₹)</th>
                  <th className="text-center">Status</th>
                  {/* <th>Collected By</th> */}
                </tr>
              </thead>
             <tbody>
  {collectionList.length === 0 ? (
    <tr>
      <td colSpan="9" className="text-center fw-bold py-3">
        No data found
      </td>
    </tr>
  ) : (
    collectionList.map((item, index) => (
      <tr key={index}>
        <td>{item?.loan_id || "-"}</td>
        <td>{item?.name || "-"}</td>
        {/* <td>
          {item.last_payment_date
            ? new Date(item.last_payment_date).toISOString().split("T")[0].split("-").reverse().join("-")
            : "-"
          }
        </td> */}
<td>
  {(() => {
    const dateTime = item.last_payment_date; 
    if (!dateTime) return "-";

    const ist = new Date(dateTime + " UTC").toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const cleaned = ist.replace(",", "").replace(" at", "");
    const [date, time, ampm] = cleaned.split(" ");
    const [d, m, y] = date.split("/");

    return `${d}-${m}-${y} `; 
  })()}
</td>


        <td>{item.pay_method || "-"}</td>
        <td>{item?.upi_number|| "-"}</td>
        <td>{item?.principal_paid || "-"}</td>
        <td>{item?.interest_paid || "-"}</td>
        <td className="fw-bold">
          ₹{(Number(item.principal_paid) || 0) + (Number(item.interest_paid) || 0)}
        </td>
        <td className="text-center align-middle'">
  {item?.paid_status === "Closed" ? (
    <span className="badge bg-danger">Closed</span>   
  ) : (
    <span className="badge bg-success">Active</span> 
  )}
</td>
      </tr>
    ))
  )}
</tbody>

            </table>


          {/* </div> */}
        </div>

<div className="modern-pagination text-right justify-content-end">
  <button
    className="modern-page-button"
    onClick={() => handlePageChange(1)}
    disabled={currentPage === 1}
  >
    &laquo;
  </button>

  <button
    className="modern-page-button"
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    &lt;
  </button>

  {/* Render page numbers */}
  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
    <button
      key={page}
      className={`modern-page-button ${currentPage === page ? 'active' : ''}`}
      onClick={() => handlePageChange(page)}
    >
      {page}
    </button>
  ))}

  <button
    className="modern-page-button"
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    &gt;
  </button>

  <button
    className="modern-page-button"
    onClick={() => handlePageChange(totalPages)}
    disabled={currentPage === totalPages}
  >
    &raquo;
  </button>
</div>


      </div>
    </div>
  );
}

export default Collections;
