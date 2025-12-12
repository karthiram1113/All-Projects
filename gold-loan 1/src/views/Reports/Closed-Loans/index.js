import React, { useEffect, useRef, useState } from 'react';
import Navbars from '../../../common/Navbar';
import { useNavigate } from 'react-router-dom';
import superAdminApis from '../../../api/services/admin-pages/superAdmin';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import './index.css'

import ReportLogo from '../../../assets/img/financelogoreport.png'
import ReportProfile from '../../../assets/img/male.png'
import RameshSign from '../../../assets/img/rameshsign.png'
import { baseURL } from '../../../api/api';

function ClosedLoans() {
  const [closedLoans, setClosedLoans] = useState([]);
  const navigate = useNavigate();

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  console.log(selectedCustomer);
  


     const [loading ,setLoading] = useState(false)
         const [currentPage, setCurrentPage] = useState(1);
      const [recordsPerPage] = useState(10);
      const [totalRecords, setTotalRecords] = useState(0);

  const handleBackCustomer = () => navigate('/customer-details-list');

  // Fetch closed loans
 useEffect(() => {
handleClosedList(currentPage)
}, [currentPage]);


const handleClosedList = (page) => {
  setLoading(true);

  const apiData = {
    pageIndex: page - 1,
    dataLength: recordsPerPage,
  };

  superAdminApis.customerClosedListAPI(apiData)
    .then((responseData) => {
      if (responseData?.apiStatus?.code === "200") {
        setLoading(false);
        setClosedLoans(responseData?.result?.customerDetails || []);
        setTotalRecords(responseData?.result?.totalRecordCount || 0);
      } else {
        setClosedLoans([]);
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


const totalPages = Math.ceil(totalRecords / recordsPerPage);


  const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) return; 
  setCurrentPage(page);
};




const contentRef = useRef(null);
const [btnLoading, setBtnLoading] = useState(false);



const downloadPDF = async () => {
  setBtnLoading(true);
  

  const originalContent = contentRef.current;
  if (!originalContent) return;

  // 1. Clone the node
  const clone = originalContent.cloneNode(true);

  // 2. Gather all stylesheets
  const styleSheets = Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        const ownerNode = styleSheet.ownerNode;
        if (ownerNode && ownerNode instanceof Element) {
          return ownerNode.outerHTML;
        }
        return "";
      } catch {
        return "";
      }
    })
    .join("");

  // 3. Wait for all images to load
  const images = clone.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve(true);
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true);
        })
    )
  );

  // 4. Calculate center position for popup
  const popupWidth = 900;
  const popupHeight = 700;
  const left = window.screenX + (window.outerWidth - popupWidth) / 2;
  const top = window.screenY + (window.outerHeight - popupHeight) / 2;

  const printWindow = window.open(
    "",
    "_blank",
    `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
  );

  if (!printWindow) {
    alert("Popup blocked. Please allow popups to print.");
    setBtnLoading(false);
    return;
  }

  // 5. Write styles and content to the print window
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        ${styleSheets}
        <style>
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: white;
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            position: relative;
            min-height: 100vh;
          }

          .not-print {
            display: block;
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #888;
          }

          @media print {
            .not-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        ${clone.outerHTML}
        <script>
          window.onload = function() {
            window.focus();
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();

  setBtnLoading(false);
  document.getElementById("closedeleteModal")?.click();
};




  return (
    <div>
      <Navbars />
      
      <div className="container all-modules-height card p-3">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
          <h5 className="heading-with-line mb-2 mb-md-0 aquanew-text-effect">
            Closed Loans
            <hr className="smooth-line" />
          </h5>

          <button className="btn add-customer" onClick={handleBackCustomer}>
            <i className="fa fa-arrow-left me-2"></i> Back
          </button>
        </div>

        {/* Closed Loans Table */}
        {/* <div className="table-responsive"> */}


      <table className="table table-striped table-bordered">
  <thead className="table-light">
    <tr>
      <th>Customer</th>
      <th>Loan ID</th>
      <th>Loan Amount</th>
      <th>Closed Date</th>
      <th className="text-center">Status</th>
      {/* <th>Total Paid</th> */}
      <th className='text-center'>Download</th>
    </tr>
  </thead>

  <tbody>
    {loading ? (
      <tr>
        <td colSpan="9" className="text-center">
          <div className="gold-dots-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </td>
      </tr>
    ) : closedLoans.length === 0 ? (
      <tr>
        <td colSpan="9" className="text-center">No records found</td>
      </tr>
    ) : (
      closedLoans.map((item, i) => (
        <tr key={i}>
          <td>{item.name}</td>
          <td>{item.loan_id}</td>
          <td>₹{item.loan_amount}</td>

          {/* Closed Date → from item.date */}
          
<td>
  {item.last_payment_date 
    ? item.last_payment_date.split(" ")[0].split("-").reverse().join("-")
    : "-"
  }
</td>
          <td className='text-center align-middle'>{item?.paid_status === "Closed" ? <span className="badge bg-danger">Closed</span>:''}</td>

    

          {/* <td>₹{item.paid_amount}</td> */}

      <td className="text-center d-flex justify-content-center align-items-center">
 <button
  className="btn btn-warning btn-sm rounded-circle d-flex align-items-center justify-content-center"
  style={{ width: "32px", height: "32px", padding: "0" }}
  onClick={() => {
    setSelectedCustomer(item);

    // Wait for state update to reflect in DOM
    setTimeout(() => {
      downloadPDF();
    }, 200); // 100ms delay usually enough
  }}
>
  <i className="fa fa-download"></i>
</button>

</td>

        </tr>
      ))
    )}
  </tbody>
</table>

        {/* </div> */}

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



{/* Report pdf */}

<div
  className="modal fade"
  id="reportModal"
  tabIndex="-1"
  aria-labelledby="deleteModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered modal-lg print-modal-dialog" ref={contentRef}>
    <div className="modal-content print-modal-content" id="loanReport">
    

      {/* BODY */}
      <div className="modal-body print-modal-body" id="reportArea" style={{ background: "#f9f4e8",padding:"30px" }}>
        {/* TITLE */}
        <h5
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#a8842c",
            textShadow: "0 1px 1px rgba(255,255,255,0.7)",
            borderBottom: "2px solid #d1b464",
            paddingBottom: "8px",
            letterSpacing: "1px",
          }}
        >
          Customer Loan Report
        </h5>

        {/* COMPANY DETAILS */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold mb-2" style={{ color: "#6f4e37" }}>
              SMR Gold Loan Finance
            </h4>
            <p className="mb-1">No. 17/21 Main Road , Zion Nagar, Vellalanvilai- 628219</p>
            <p className="mb-1">Phone: +91 9790004209</p>
            <p className="mb-1">Email: maharajanramesh26@gmail.com</p>
          </div>

          <img
            src={ReportLogo}
            alt="Company Logo"
            style={{ width: "130px", borderRadius: "8px" }}
          />
        </div>

        <hr style={{ borderTop: "2px solid #d1b464" }} />

        {/* CUSTOMER PHOTO + DETAILS */}
        <div className="row print-row print-row-left-right mb-4">
          {/* Left: Customer Photo */}
          <div className="print-col-3 text-center">
            <img
              src={
                selectedCustomer?.liveImage?.altered_file_name
                  ? `${baseURL}${selectedCustomer.liveImage.path}${selectedCustomer.liveImage.altered_file_name}`
                  : ReportProfile
              }
              alt="Customer"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Right: Customer & Loan Details */}
          <div className="print-col-9">
            {/* CUSTOMER INFO */}
            <div className="mb-3">
              <h5 className="fw-bold mb-3">Customer Details</h5>
              <div className="row print-row">
                <div className="print-col-6 mb-2">
                  <p className="text-muted m-0">Customer Name</p>
                  <p className="fw-bold">{selectedCustomer?.name}</p>
                </div>
                <div className="print-col-6 mb-2">
                  <p className="text-muted m-0">Closed Date</p>
                  <p className="fw-bold">
                    {selectedCustomer?.last_payment_date
                      ? selectedCustomer.last_payment_date.split(" ")[0]
                      : "—"}
                  </p>
                </div>
                <div className="print-col-6 mb-2">
                  <p className="text-muted m-0">Jewel Name</p>
                  <p className="fw-bold">{selectedCustomer?.jewel_name || "—"}</p>
                </div>
                <div className="print-col-6 mb-2">
                  <p className="text-muted m-0">Jewel Weight</p>
                  <p className="fw-bold">
                    {selectedCustomer?.jewel_weight
                      ? `${selectedCustomer.jewel_weight} grams`
                      : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* LOAN INFO */}
            <div>
              <h5 className="fw-bold mb-3">Loan Details</h5>
              <div className="row print-row">
                {/* First line: 3 values */}
                <div className="print-col-4 mb-2">
                  <p className="text-muted m-0">Loan Amount</p>
                  <p className="fw-bold">₹{selectedCustomer?.loan_amount}</p>
                </div>
                <div className="print-col-4 mb-2">
                  <p className="text-muted m-0">Interest Rate</p>
                  <p className="fw-bold">{selectedCustomer?.intrest_rate}% {selectedCustomer?.duration_type}</p>
                </div>
                <div className="print-col-4 mb-2">
                  <p className="text-muted m-0">Total Paid</p>
                  <p className="fw-bold text-success">₹{selectedCustomer?.paid_amount}</p>
                </div>

                {/* Second line: 3 values */}
                <div className="print-col-4 mb-2">
                  <p className="text-muted m-0">Total Principal</p>
                  <p className="fw-bold">₹{selectedCustomer?.loan_amount}</p>
                </div>
                <div className="print-col-4 mb-2">
                  <p className="text-muted m-0">Balance Amount</p>
                  <p className="fw-bold text-danger">₹{selectedCustomer?.balance}</p>
                </div>
                <div className="print-col-4 mb-2">
                  <p className="text-muted m-0">Last Payment Date</p>
                  <p className="fw-bold">
                    {selectedCustomer?.last_payment_date
                      ? new Date(selectedCustomer.last_payment_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="print-col-4 mb-2">
                  <p className="text-muted m-0">Status</p>
                  <span className={`badge ${selectedCustomer?.paid_status === "Closed" ? "bg-danger" : "bg-success"}`}>
                    {selectedCustomer?.paid_status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ borderTop: "2px solid #d1b464" }} />

        {/* OWNER SIGNATURE */}
        <div className="text-right" style={{ width: "200px", marginLeft: "auto" }}>
          <p className="m-0 text-center">
            <img
              src={RameshSign}
              alt="Owner Signature"
              style={{
                width: "120px",
                height: "auto",
                display: "block",
                margin: "0 auto -5px auto",
                marginBottom: '-35px',
              }}
            />
          </p>
          <p className="fw-bold text-center">Owner Signature</p>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  );
}

export default ClosedLoans;
