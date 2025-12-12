import React, { useEffect, useState } from "react";
import Navbars from "../../common/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import superAdminApis from "../../api/services/admin-pages/superAdmin";
import { baseURL } from "../../api/api";
import NoImage from "../../assets/img/noimages.jpg";
import './index.css'
import AOS from "aos";
import "aos/dist/aos.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function CustomerView() {


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);



  const navigate = useNavigate();
  const { id } = useParams();
  const baseURLs = baseURL;
  const [customer, setCustomer] = useState(null);


  console.log(customer)

  const handleBackCustomer = () => {
    navigate("/customer-details-list");
  };

  useEffect(() => {
    if (id) {
      superAdminApis
        .customerDetailsGet(id)
        .then((res) => {
          if (res?.apiStatus?.code === "200") {
            const result = Array.isArray(res.result) ? res.result[0] : res.result;

            // ✅ Ensure valid existing_details array
            const existingDetails =
              Array.isArray(result?.existing_details) &&
                result.existing_details.length > 0 &&
                result.existing_details[0] !== null
                ? result.existing_details
                : [];

            // ✅ Flatten payment-like details
            let mergedList = [];

            existingDetails.forEach((item) => {
              if (!item) return;
              Object.values(item).forEach((entry) => {
                if (!entry) return;

                mergedList.push({
                  month_no: mergedList.length + 1,
                  payment_date:
                    entry.last_payment_date && entry.last_payment_date !== "0000-00-00"
                      ? entry.last_payment_date
                      : entry.updated_date || entry.created_date || "-",
                  interest_paid: entry.interest_paid || 0,
                  principal_paid: entry.principal_paid || 0,
                  total_paid:
                    Number(entry.interest_paid || 0) + Number(entry.principal_paid || 0),
                  balance:
                    entry.balance ||
                    entry.remaining_balance ||
                    entry.total_amount ||
                    result.loan_amount ||
                    0,
                });
              });
            });

            console.log("✅ Final merged history:", mergedList);

            // ✅ Set final customer data
            setCustomer({
              ...result,
              mergedHistory: mergedList,
            });
          } else {
            console.error("❌ API returned non-200 status:", res);
            setCustomer({});
          }
        })
        .catch((err) => {
          console.error("❌ Error fetching details:", err);
          setCustomer({});
        });
    }
  }, [id]);






  if (!customer) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="gold-dots-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  // 🧮 BASIC CALCULATIONS
  const loanAmount = Number(customer.loan_amount || 0);
  const principalPaid = Number(customer.principal_paid || 0);
  const interestPaid = Number(customer.interest_paid || 0);
  const totalPaid = principalPaid + interestPaid;

  // ✅ Remaining Principal
  let principalRemaining = loanAmount - principalPaid;
  if (principalRemaining < 0) principalRemaining = 0;

  // ✅ If paid fully, mark status as closed
  const loanStatus =
    principalRemaining === 0 ? "Closed" : customer.paid_status || "Active";

  // ✅ Balance for display
  const balance = principalRemaining.toFixed(2);

  const formatTime = (dateStr) => {
    if (!dateStr || dateStr === "0000-00-00") return "—";
    const d = new Date(dateStr.replace(" ", "T"));
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // show AM/PM
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "0000-00-00") return "—";
    const d = new Date(dateStr.replace(" ", "T"));
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };








  /////dwonload/////
  function inlineAllStyles(element) {
    const computed = window.getComputedStyle(element);
    const style = Array.from(computed)
      .map((prop) => `${prop}:${computed.getPropertyValue(prop)};`)
      .join("");
    element.setAttribute("style", style);

    Array.from(element.children).forEach(inlineAllStyles);
  }

  const downloadTablePDF = async () => {
    const tableElement = document.getElementById("payment-table-pdf");
    if (!tableElement) return;

    const clone = tableElement.cloneNode(true);

    inlineAllStyles(clone);

    const printWindow = window.open("", "_blank", "width=900,height=700");

    if (!printWindow) {
      alert("Popup blocked! Allow popups to print.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <title>Payment History</title>

        <!-- ⭐ ONLY padding for table cells -->
        <style>
       
          tr {
              border-color: inherit !important;
              border-style: solid !important;
              border-width: 0 !important;
          }
          td {
           padding: 8px !important;
            }
        </style>

      </head>
      <body>
        ${clone.outerHTML}

        <script>
          window.onload = function() {
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
  };




  return (
    <div>
      <Navbars />

      <div className="container all-modules-height card p-3">
        {/* ===== HEADER ===== */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
          <h5 className="heading-with-line mb-2 mb-md-0 aquanew-text-effect">
            Customer View
            <hr className="smooth-line" />
          </h5>

          <button className="btn add-customer" onClick={handleBackCustomer}>
            <i className="fa fa-arrow-left me-2"></i> Back
          </button>
        </div>

        {/* ===== BASIC INFO ===== */}
        <div className="shadow p-4 mb-4" data-aos="fade-left">
          <h6 className="fw-bold mb-4">Customer Details</h6>

          <div className="d-flex align-items-start gap-5">

            {/* LEFT SIDE — CUSTOMER IMAGE */}
            <div
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "12px",
                overflow: "hidden",
                // boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0"
              }}
            >
              <img
                src={
                  customer?.liveImage
                    ? `${baseURLs}${customer.liveImage.path}${customer.liveImage.altered_file_name}`
                    : NoImage
                }
                alt="Customer"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain"   // 🔥 cover → crop, contain → full visible
                }}
              />
            </div>


            {/* RIGHT SIDE — DETAILS */}
            <div className="flex-grow-1">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Name:</strong> {customer?.name}</p>
                  <p><strong>Guardian Name:</strong> {customer?.guardian_name || '--'}</p>
                  <p><strong>Phone:</strong> {customer?.phone_no}</p>
                  <p><strong>Address:</strong> {customer?.address}</p>
                </div>

                <div className="col-md-6">
                  <p><strong>Loan Start Date:</strong> {customer?.date ? new Date(customer.date).toISOString().split("T")[0].split("-").reverse().join("-") : "-"}</p>

                  <p>
                    <strong>Total Loan Amount:</strong> ₹
                    {customer?.additionalAmtDetails?.additional_loan_amt
                      ? Number(customer?.loan_amount) +
                      Number(customer?.additionalAmtDetails?.additional_loan_amt)
                      : customer?.loan_amount}
                  </p>

                  <p><strong>Interest Rate:</strong> {customer?.intrest_rate}%</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge bg-${loanStatus === "Closed" ? "danger" : "success"
                        }`}
                    >
                      {loanStatus}
                    </span>
                  </p>
                </div>

                {customer?.additionalAmtDetails &&
                  customer?.additionalAmtDetails?.additional_loan_amt > 0 && (
                    <div className="col-md-6 mt-4">

                      <p>
                        <strong>Additional Loan Start Date: </strong>
                        {customer?.additionalAmtDetails?.additional_loan_date
                          ? customer.additionalAmtDetails.additional_loan_date
                            .split(" ")[0]
                            .split("-")
                            .reverse()
                            .join("-")
                          : "-"}
                      </p>

                      <p>
                        <strong>Additional Loan Amount: </strong> ₹
                        {customer.additionalAmtDetails.additional_loan_amt}
                      </p>

                    </div>
                  )}




              </div>
            </div>

          </div>
        </div>



        {/* ===== LOAN SUMMARY ===== */}
        <div className="shadow-sm p-4 mb-4 rounded bg-white border" data-aos="fade-right">

          <h5 className="fw-bold mb-3 text-primary">Loan Summary</h5>

          {/* Top Basic Details */}
          {/* <div className="row mb-3">
    <div className="col-md-6 mb-2">
      <div className="p-3 rounded border bg-light shadow">
        <small className="text-muted">Total Loan Amount</small>
        <h6 className="fw-bold mt-1">₹{customer.loan_amount}</h6>
      </div>
    </div>

    <div className="col-md-6 mb-2">
      <div className="p-3 rounded border bg-light shadow">
        <small className="text-muted">Interest Rate</small>
        <h6 className="fw-bold mt-1">{customer.intrest_rate}%</h6>
      </div>
    </div>
  </div> */}

          <div className="row mb-3">

            {/* Total Loan Amount */}
            <div className={`mb-2 ${customer?.additionalAmtDetails?.additional_loan_amt ? "col-md-4" : "col-md-6"}`}>
              <div className="p-3 rounded border bg-light shadow">
                <small className="text-muted">Loan Amount</small>
                <h6 className="fw-bold mt-1">₹{customer.loan_amount}</h6>
              </div>
            </div>

            {/* Additional Loan Amount → show only if value exists */}
            {customer?.additionalAmtDetails?.additional_loan_amt && (
              <div className="col-md-4 mb-2">
                <div className="p-3 rounded border bg-light shadow">
                  <small className="text-muted">Additional Loan Amount</small>
                  <h6 className="fw-bold mt-1">
                    ₹{customer.additionalAmtDetails.additional_loan_amt}
                  </h6>
                </div>
              </div>
            )}

            {/* Interest Rate */}
            <div className={`mb-2 ${customer?.additionalAmtDetails?.additional_loan_amt ? "col-md-4" : "col-md-6"}`}>
              <div className="p-3 rounded border bg-light shadow">
                <small className="text-muted">Interest Rate</small>
                <h6 className="fw-bold mt-1">{customer.intrest_rate}%</h6>
              </div>
            </div>

          </div>


          <hr />

          {/* Paid Details */}
          <h6 className="fw-bold mb-3">Payment Overview</h6>

          <div className="row">
            <div className="col-md-4 mb-3 ">
              <div className="p-3 rounded border shadow">
                <small className="text-muted">Principal Paid</small>
                <h6 className="fw-bold text-success mt-1">₹{principalPaid.toFixed(2)}</h6>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-3 rounded border shadow">
                <small className="text-muted">Interest Paid</small>
                <h6 className="fw-bold text-info mt-1">₹{interestPaid.toFixed(2)}</h6>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-3 rounded border shadow">
                <small className="text-muted">Total Paid</small>
                <h6 className="fw-bold text-primary mt-1">₹{totalPaid.toFixed(2)}</h6>
              </div>
            </div>
          </div>

          <hr />

          {/* Pending Interest Calculation */}
          {(() => {
            const interestRate = Number(customer.intrest_rate || 0);
            const loanAmt = Number(customer.original_loan_amount || customer.loan_amount || 0);
            const expectedInterest = (loanAmt * interestRate) / 100;
            const paidInterest = Number(customer.interest_paid || 0);
            const lastPayment = customer.last_payment_date;
            const isFirstTime = !lastPayment || lastPayment === "0000-00-00" || paidInterest === 0;

            const pendingInterest =
              !isFirstTime && paidInterest < expectedInterest
                ? (expectedInterest - paidInterest).toFixed(2)
                : 0;

            const nextMonthSuggestion = (Number(expectedInterest) + Number(pendingInterest)).toFixed(2);

            return (
              <>
                {!isFirstTime && pendingInterest > 0 && (
                  <div className="alert alert-warning rounded mt-3">
                    <strong>⚠ Pending Interest:</strong> ₹{pendingInterest} <br />
                    <small className="text-muted">
                      Next Month Suggested Interest: <strong>₹{nextMonthSuggestion}</strong>
                    </small>
                  </div>
                )}
              </>
            );
          })()}

          {/* Remaining Balance */}
          <div className="p-3 rounded border bg-light mt-3 shadow">
            <small className="text-muted">Remaining Principal Balance</small>
            <h6 className="fw-bold text-danger mt-1">₹{balance}</h6>
          </div>

          {/* Last Payment Date */}
          <p className="mt-3">
            <strong>Last Payment Date:</strong>{" "}
            {(() => {
              const newData = customer?.existing_details?.[0]?.new_data;

              // 1. If no previous payment
              if (!customer?.existing_details?.length) {
                return (
                  <span className="text-muted">No payments made yet</span>

                );
              }

              // 2. If new_data payment date exists
              if (newData?.payment_date && newData.payment_date !== "0000-00-00") {
                const [datePart, timePart] = newData.payment_date.split(" ");
                const [year, month, day] = datePart.split("-").map(Number);
                const [hour, minute, second] = timePart.split(":").map(Number);
                const local = new Date(year, month - 1, day, hour, minute, second);

                const formattedDate = local.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                const formattedTime = local.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return `${formattedDate} ${formattedTime}`;
              }

              // 3. Fallback: customer.last_payment_date
              if (
                customer?.last_payment_date &&
                customer.last_payment_date !== "0000-00-00"
              ) {
                return new Date(customer.last_payment_date).toLocaleDateString("en-IN");
              }

              return "—";
            })()}
          </p>


          {customer?.closed_date && (
            <p>
              <strong>Closed Date:</strong> {customer.closed_date}
            </p>
          )}
        </div>


        {/* ===== MONTHLY PAYMENT HISTORY ===== */}

        {/* ===== MONTHLY PAYMENT HISTORY ===== */}
        <div className="shadow p-4 mb-4 ">
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <h6 className="fw-bold mb-0">📅 Monthly Payment History</h6>
            <button
              className="btn btn-warning btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "32px", height: "32px", padding: "0" }}
              onClick={downloadTablePDF}
            >
              <i className="fa fa-download"></i>
            </button>
          </div>
          <div id="payment-table-pdf">
            {Array.isArray(customer.mergedHistory) && customer.mergedHistory.length > 0 ? (
              <table className="table table-striped" data-aos="fade-up">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Payment Date</th>
                    <th>Payment Time</th>
                    <th>Principal Paid</th>

                    <th>Interest Paid</th>
                    <th>Total Paid</th>
                    <th>Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.mergedHistory.map((p, i) => {
                    const [datePart, timePart] = (p.payment_date || "-").split(" ");
                    return (
                      <tr key={i}>
                        <td>{p.month_no}</td>
                        <td>{datePart !== "-" ? formatDate(p.payment_date) : "-"}</td>
                        <td>{timePart ? formatTime(p.payment_date) : "--:--:--"}</td>
                        <td>₹{p.principal_paid}</td>

                        <td>₹{p.interest_paid}</td>
                        <td>₹{(Number(p.interest_paid) + Number(p.principal_paid)).toFixed(2)}</td>
                        <td>₹{p.balance}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No payment history available</p>
            )}
          </div>
        </div>


        {/* ===== FANCY IMAGE CARDS SECTION ===== */}
        <div className="shadow p-4 mb-4" data-aos="fade-up">
          <h6 className="fw-bold mb-3">Uploaded Images</h6>

          {/* <div className="row">

            AADHAAR FRONT
            <div className="col-md-6">
              <p className="text-center fw-bold mt-2">Aadhaar Front</p>

              <div className="fancy-card-image">
                <img
                  src={
                    customer.aadharImage?.[0]
                      ? `${baseURLs}${customer?.aadharImage[0].path}${customer?.aadharImage[0].altered_file_name}`
                      : NoImage
                  }
                  alt="Aadhaar Front"
                  className="fancy-img"
                />
              </div>
            </div>

            AADHAAR BACK
            <div className="col-md-6">
              <p className="text-center fw-bold mt-2">Aadhaar Back</p>

              <div className="fancy-card-image">
                <img
                  src={
                    customer?.aadharImage?.[1]
                      ? `${baseURLs}${customer?.aadharImage[1].path}${customer?.aadharImage[1].altered_file_name}`
                      : NoImage
                  }
                  alt="Aadhaar Back"
                  className="fancy-img"
                />
              </div>
            </div>


            JEWEL IMAGE
            <div className="col-md-6 mt-2">
              <p className="text-center fw-bold mt-2">Jewel Image</p>

              <div className="fancy-card-image">
                <img
                  src={
                    customer?.jewelImg
                      ? `${baseURLs}${customer?.jewelImg?.path}${customer?.jewelImg?.altered_file_name}`
                      : NoImage
                  }
                  alt="Jewel"
                  className="fancy-img"
                />
              </div>
            </div>

            OPT IMAGE
            <div className="col-md-6 mt-2">
              <p className="text-center fw-bold mt-2">Opt Image</p>

              <div className="fancy-card-image">
                <img
                  src={
                    customer?.optionalImg
                      ? `${baseURLs}${customer?.optionalImg?.path}${customer?.optionalImg?.altered_file_name}`
                      : NoImage
                  }
                  alt="opt"
                  className="fancy-img"
                />
              </div>
            </div>

            <div className="row mb-5 container-fluid">
   
      <div className="col-md-12 mt-3 d-flex justify-content-center">
        <div className="cards">
          <div className="profile-pic">
            <img src={
        customer.aadharImage?.[0]
          ? `${baseURLs}${customer?.aadharImage[0].path}${customer?.aadharImage[0].altered_file_name}`
          : NoImage
      }  className="img-fluid" />
          </div>
 
          <div className="bottom">
            <div className="content">
              <span className="name">{'item.name'}</span>
              <span className="about-me">{'item.description'}</span>
            </div>
 
          
          </div>
        </div>
      </div>
  
  </div>

          </div> */}
          <div className="row">

            {/* AADHAAR FRONT */}
            <div className="col-md-6">
              {/* <p className="text-center fw-bold mt-2">Aadhaar Front</p>

              <div className="fancy-card-image">
                <img
                  src={
                    customer.aadharImage?.[0]
                      ? `${baseURLs}${customer?.aadharImage[0].path}${customer?.aadharImage[0].altered_file_name}`
                      : NoImage
                  }
                  alt="Aadhaar Front"
                  className="fancy-img"
                />
              </div> */}

              <div class="document-item h-75">
                <a href="#" class="card11">
                  <img
                    src={
                      customer.aadharImage?.[0]
                        ? `${baseURLs}${customer?.aadharImage[0].path}${customer?.aadharImage[0].altered_file_name}`
                        : NoImage
                    }
                    alt="Aadhaar Front"
                    className="card-img11"
                  />
                  {/* <span class="card__footer11">
                    <span>Awesome speedy card</span>
                    <span>2 minutes!</span>
                  </span> */}
                  {/* <span class="card__action11">
                    <svg viewBox="0 0 448 512" title="play">
                      <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                    </svg>
                  </span> */}
              </a>
              </div>
            </div>

            {/* AADHAAR BACK */}
            <div className="col-md-6">
              {/* <p className="text-center fw-bold mt-2">Aadhaar Back</p>

              <div className="fancy-card-image">
                <img
                  src={
                    customer?.aadharImage?.[1]
                      ? `${baseURLs}${customer?.aadharImage[1].path}${customer?.aadharImage[1].altered_file_name}`
                      : NoImage
                  }
                  alt="Aadhaar Back"
                  className="fancy-img"
                />
              </div> */}
              <div class="document-item h-75">
                <a href="#" class="card11">
                  <img src="https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI0OTY1ODM&ixlib=rb-1.2.1&q=80" alt="balloon with an emoji face" class="card__img11" />
                  {/* <span class="card__footer11">
                    <span>Awesome speedy card</span>
                    <span>2 minutes!</span>
                  </span> */}
                  {/* <span class="card__action11">
                    <svg viewBox="0 0 448 512" title="play">
                      <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                    </svg>
                  </span> */}
                </a>
              </div>
            </div>


            {/* JEWEL IMAGE */}
            <div className="col-md-6 mt-2">
              {/* <p className="text-center fw-bold mt-2">Jewel Image</p>

              <div className="fancy-card-image">
                <img
                  src={
                    customer?.jewelImg
                      ? `${baseURLs}${customer?.jewelImg?.path}${customer?.jewelImg?.altered_file_name}`
                      : NoImage
                  }
                  alt="Jewel"
                  className="fancy-img"
                /> */}

              <div class="card12 p-0">
                <div class="card-image12">  
                  <img
                  src={
                    customer?.jewelImg
                      ? `${baseURLs}${customer?.jewelImg?.path}${customer?.jewelImg?.altered_file_name}`
                      : NoImage
                  }
                  alt="Jewel"
                
                /> </div>
                <div class="card-content12 d-flex flex-column align-items-center">
                  <h4 class="pt-2">SomeOne Famous</h4>
                  <h5>Creative Desinger</h5>
                  <ul class="social-icons d-flex justify-content-center">
                    <li> <a href="#"> <span class="fab fa-facebook"></span> </a> </li>
                    <li> <a href="#"> <span class="fab fa-twitter"></span> </a> </li>
                    <li> <a href="#"> <span class="fab fa-instagram"></span> </a> </li>
                  </ul>
                </div>
              </div>
           
            </div>

            {/* OPT IMAGE */}
            <div className="col-md-6 mt-2">
              {/* <p className="text-center fw-bold mt-2">Opt Image</p>

              <div className="fancy-card-image">
                <img
                  src={
                    customer?.optionalImg
                      ? `${baseURLs}${customer?.optionalImg?.path}${customer?.optionalImg?.altered_file_name}`
                      : NoImage
                  }
                  alt="opt"
                  className="fancy-img"
                />
              </div> */}
              <div class="card13 mb-5">
                <div class="icons13">
                  <img
                    src={
                      customer.aadharImage?.[0]
                        ? `${baseURLs}${customer?.aadharImage[0].path}${customer?.aadharImage[0].altered_file_name}`
                        : NoImage
                    }
                    alt="Aadhaar Front"
                    className="fancy-img"
                  />
                </div>
                <div class="info13">
                  <div class="info__text13">
                    Gwałtowne burze i błyskawice nawiedzają amerykański stan Waszyngton od początku września. Jeden z filmowców
                    postanowił uchwycić piękno i potęgę zjawiska, nie narażając przy tym swojego...
                  </div>
                  <div class="button13">więcej</div>
                </div>
              </div>
            </div>
          </div>

          <div class="document-grid">

           
            <div class="document-item">
          
              <div class="document-visual aadhar-front-visual">
                <div class="doc-inner">
                  {/* <div class="photo"> */}
                    <img
                      src={
                        customer?.optionalImg
                          ? `${baseURLs}${customer?.optionalImg?.path}${customer?.optionalImg?.altered_file_name}`
                          : NoImage
                      }
                      alt="opt"
                      className="fancy-img"
                    />
                  {/* </div> */}
                  <div class="details">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                  </div>
                  <div class="qr-code"></div>
                </div>
              </div>
          
              <h2>Aadhar - Front</h2>
            </div>

          
            <div class="document-item">
            
              <div class="document-visual aadhar-back-visual">
                <div class="doc-inner">
                  <div class="qr-code">  <img
                    src={
                      customer.aadharImage?.[0]
                        ? `${baseURLs}${customer?.aadharImage[0].path}${customer?.aadharImage[0].altered_file_name}`
                        : NoImage
                    }
                    alt="Aadhaar Front"
                    className="fancy-img"
                  /></div>
                  <div class="text-block">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                  </div>
                </div>
              </div>
           
              <h2>Aadhar - Back</h2>
            </div>

           
            <div class="document-item">
       
              <div class="document-visual jewelry-visual">
                <div class="photo-inner">
                   <img
                    src={
                      customer.aadharImage?.[0]
                        ? `${baseURLs}${customer?.aadharImage[0].path}${customer?.aadharImage[0].altered_file_name}`
                        : NoImage
                    }
                    alt="Aadhaar Front"
                    className="fancy-img"
                  />
                </div>
              </div>
              
              <h2>Jewelry Photo</h2>
            </div>

          
            <div class="document-item">
           
              <div class="document-visual other-doc-visual">
                <div class="doc-inner">
                  <div class="doc-line"></div>
                  <div class="doc-line"></div>
                  <div class="doc-line"></div>
                  <div class="doc-line"></div>
                  <div class="doc-line"></div>
                </div>
              </div>
              
              <h2>Other Document</h2>
            </div>

          </div>
        </div>


      </div>
    </div>
  );
}

export default CustomerView;
