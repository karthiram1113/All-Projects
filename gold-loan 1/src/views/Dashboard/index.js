import React, { use, useEffect, useState } from "react";
import Navbars from "../../common/Navbar";
import superAdminApis from "../../api/services/admin-pages/superAdmin";
import { toast } from "react-toastify";
import './index.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  LabelList,
  ComposedChart
} from "recharts";

import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";


function Dashboard({ customerList, setCustomerList }) {
  const [goldList, setGoldList] = useState([]);
  const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [customerDeleteId, setCustomerDeleteId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [addedTotalAmt,setAddedTotalAmt] = useState("")
  const [takenData, setTakenData] = useState([]);
  const [totalTakenAmount, setTotalTakenAmount] = useState(0);

  // useEffect(() => {
  //   handleGoldList();
  // }, []);

  // const handleGoldList = () => {
  //   setLoading(true);

  //   superAdminApis
  //     .dayGoldListAPI({})
  //     .then((responseData) => {
  //       setLoading(false);
  //       if (responseData?.apiStatus?.code === "200") {
  //         setGoldList(responseData?.result || []);
  //       } else {
  //         setGoldList([]);
  //         toast.error(
  //           responseData?.apiStatus?.message || "Failed to fetch data"
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.error("Error fetching gold details:", err);
  //       toast.error("An error occurred while fetching data.");
  //     });
  // };

  const [goldRate, setGoldRate] = useState("");
  const [silverRate, setSilverRate] = useState("");
  const goldWeight = 8;
  const silverWeight = 8;

  const goldAmount = goldRate ? parseFloat(goldRate) * goldWeight : 0;
  const silverAmount = silverRate ? parseFloat(silverRate) * silverWeight : 0;


 const totalPages = Math.ceil(totalRecords / recordsPerPage);


  const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) return; 
  setCurrentPage(page);
};



  useEffect(() => {
    handleCustomerDetailsGet();
    // setAddedTotalAmt(silverRate)

  }, [])


  const goldSilverCreate = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setLoading(true);

    const apiData = {
      gold_rate: parseFloat(goldRate) || 0,
      gold_amount: goldAmount,
      silver_rate: parseFloat(silverRate) || 0,
      silver_amount: silverAmount
    };

    try {
      const responseData = await superAdminApis.dashboardDGoldListAPI(apiData);

      if (responseData?.apiStatus?.code === "200") {
        toast.success(responseData?.apiStatus?.message || "Customer created successfully");
        handleCustomerDetailsGet()

      } else {
        toast.error(responseData?.apiStatus?.message || "Failed to create customer");
      }

    } catch (error) {
      console.error("Error creating customer:", error);
      toast.error("An error occurred while creating customer.");
    } finally {
      setSubmit(false);
      setLoading(false);
    }
  };


  // Get Api

  const handleCustomerDetailsGet = (customerId) => {
    superAdminApis.dashboardDGoldGetAPI(customerId)
      .then((responseData) => {
        if (responseData?.apiStatus?.code === "200") {
          const result = responseData?.result;

          setGoldRate(result?.gold_rate || 0);
          setSilverRate(result?.silver_rate || 0);

        } else {
          console.error("Failed to fetch customer details");
        }
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };




  // Calculate remaining days

  const calculateRemainingDays = (expiryDate) => {
    const today = new Date();
    const exp = new Date(expiryDate);
    const diff = exp - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };


const getExpiryDate = (startDate, durationType, duration) => {
  if (!startDate || isNaN(new Date(startDate))) {
    console.error("Invalid start date:", startDate);
    return null;
  }

  const sd = new Date(startDate);
  const d = parseInt(duration);

  if (durationType === "months") {
    sd.setMonth(sd.getMonth() + d);
  } else if (durationType === "days") {
    sd.setDate(sd.getDate() + d);
  }

  return sd.toISOString().split("T")[0];
};




  useEffect(() => {
    handleUserList(currentPage)
    handleTakenList(currentPage)
    console.log(silverRate);
    
    handleInvestorList()
  }, [currentPage]);


  const handleUserList = (page) => {
    setLoading(true);

    const apiData = {
      pageIndex: page - 1,
      dataLength: recordsPerPage,

    };

    superAdminApis.customerDetailsList(apiData)
      .then((responseData) => {
        if (responseData?.apiStatus?.code === "200") {
          setLoading(false);
          setCustomerList(responseData?.result?.customerDetails || []);
          setTotalRecords(responseData?.result?.totalRecordCount || 0);
        } else {
          setCustomerList([]);
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

    // Investor List Crud
      
       const handleInvestorList = () => {
          setLoading(true);
      
          const apiData = {
         
          };
      
          superAdminApis.investorList(apiData)
            .then((responseData) => {
              if (responseData?.apiStatus?.code === "200") {
                setLoading(false);
                setAdditionalData(responseData?.result?.investorDetails || []);
                        const investors = responseData?.result?.investorDetails || [];

                 const totalInvestorAmount = investors.reduce((acc, inv) => {
          return acc + Number(inv.amount || 0);
        }, 0);
                 setAddedTotalAmt(totalInvestorAmount + Number(silverRate || 0));
               
              } else {
                setAdditionalData([]);
                setLoading(false);
              
              }
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error fetching customer details:", error);
              toast.error("An error occurred while fetching data.");
            });
        };


// Taken Amount Create

function formatDate() {
  const now = new Date();

  // Date
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  // Time in 12-hour format
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}

 const takenAmountCreate = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setLoading(true);

    const apiData = {
     taken_amount : takenAmount,
     created_date :formatDate(),
    };

    try {
      const responseData = await superAdminApis.takenAmountCreate(apiData);

      if (responseData?.apiStatus?.code === "200") {
handleTakenList()
        toast.success(responseData?.apiStatus?.message || "Customer created successfully");

      } else {
        toast.error(responseData?.apiStatus?.message || "Failed to create customer");
      }

    } catch (error) {
      console.error("Error creating customer:", error);
      toast.error("An error occurred while creating customer.");
    } finally {
      setSubmit(false);
      setLoading(false);
    }
  };


  const handleTakenList = (page) => {
            setLoading(true);
        
            const apiData = {
           
            };
        
            superAdminApis.takenAmountList(apiData)
              .then((responseData) => {
                if (responseData?.apiStatus?.code === "200") {
                  setLoading(false);
                   const takenDetails = responseData?.result?.takenAmountDetails || [];

          const totalTaken = takenDetails.reduce((sum, item) => {
  const amount = parseFloat(item.taken_amount);
  return sum + (isNaN(amount) ? 0 : amount);
}, 0);

setTotalTakenAmount(totalTaken);

                  setTakenData(responseData?.result?.takenAmountDetails || []);
                  setTotalRecords(responseData?.result?.totalRecordCount || 0);     
                 
                } else {
                  setAdditionalData([]);
                  setLoading(false);
                
                }
              })
              .catch((error) => {
                setLoading(false);
                console.error("Error fetching customer details:", error);
                toast.error("An error occurred while fetching data.");
              });
          };
  



const calculateMonthlyInterest = (loanAmount, interestRate, durationType, duration) => {
  const principal = parseFloat(loanAmount || 0);
  const rate = parseFloat(interestRate || 0);

  if (!principal || !rate) return 0;

  let months = 0;

  if (durationType === "months") {
    months = parseFloat(duration || 0);
  } 
  else if (durationType === "days") {
    const diffDays = parseInt(duration || 0);

    // Apply your custom day-to-month conversion rules
    if (diffDays <= 30) {
      months = 1;      
    } 
    else if (diffDays <= 45) {
      months = 1.5;   
    } 
    else {
      months = diffDays / 30; 
    }
  }

  const interest = (principal * rate * months) / 100;
  return interest.toFixed(2);
};


const getWhatsAppMessage = (cust) => {
  const monthlyInterest = calculateMonthlyInterest(
    cust.loan_amount,
    cust.intrest_rate,
    cust.duration_type,
    cust.duration
  );

  return `அன்புள்ள ${cust.name},

உங்கள் தங்க கடன் வட்டி விரைவில் செலுத்த வேண்டிய நேரம் வந்துள்ளது.

📅 கடன் தேதி: ${cust.date.split(" ")[0]}
💰 வட்டி தொகை: ₹${monthlyInterest}

அதிர்ச்சியூட்டும் கட்டணங்கள் தவிர்க்க தயவுசெய்து கடன் காலத்திற்குள் செலுத்தவும்.

நன்றி,  
SMR Gold Loan Finance`;
};



  const customerProfit = 50000; // fixed profit for the customer

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setGivenAmount(value);
  };



const createDynamicRanges = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Get total days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const ranges = {};
  let start = 1;

  while (start <= daysInMonth) {
    let end = start + 4; // 5-day block
    if (end > daysInMonth) end = daysInMonth;

    const label = `${start}-${end}`;
    ranges[label] = 0;

    start = end + 1;
  }

  return ranges;
};

const getFiveDayLoanData = (customerList) => {
  const groups = createDynamicRanges();   // dynamic groups

  customerList.forEach(cust => {
    if (!cust.date || !cust.loan_amount) return;

    const day = new Date(cust.date).getDate();
    const amount = parseFloat(cust.loan_amount) || 0;

    Object.keys(groups).forEach(range => {
      const [start, end] = range.split("-").map(Number);
      if (day >= start && day <= end) {
        groups[range] += amount;
      }
    });
  });

  return groups;
};


const groupedLoans = getFiveDayLoanData(customerList);

const chartData = Object.keys(groupedLoans).map(label => ({
  name: label,
  loan: groupedLoans[label]
}));


const [isAdditionalLoan, setIsAdditionalLoan] = useState(false);
const [showTable, setShowTable] = useState(false);
const [additionalData, setAdditionalData] = useState([]);
const [editIndex, setEditIndex] = useState(null); 
// const [takenAmount, setTakenAmount] = useState("");
const [givenAmount, setGivenAmount] = useState(0);
const [outstandingAmount, setOutstandingAmount] = useState(0);
const [showForm,setShowForm] = useState(false)
const [isEditing,setIsEditing] = useState(false)
const [showPriceCards, setShowPriceCards] = useState(false);

const [isTaken, setIsTaken] = useState(false);
const [takenAmount, setTakenAmount] = useState("");



useEffect(() => {
  if (!isAdditionalLoan) {
    setShowTable(true);   
  } else {
    setShowTable(false);  
  }
}, [isAdditionalLoan]);





useEffect(() => {
  if (customerList.length > 0) {
    const totalLoan = customerList.reduce(
      (sum, item) => sum + Number(item.loan_amount || 0),
      0
    );
    setGivenAmount(totalLoan);
  }
}, [customerList]);



// Calculate Outstanding Amount
useEffect(() => {
  const totalInvestor = additionalData.reduce((sum, item) => {
    const amount = parseFloat(item.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const taken = Number(totalTakenAmount || 0);

  // Silver rate minus given amount
  let outstanding = Number(silverRate || 0) - Number(givenAmount || 0);

  // Add investor amounts
  outstanding += totalInvestor;

  // Subtract taken amount
  outstanding -= taken;

  setOutstandingAmount(outstanding);
}, [silverRate, givenAmount, additionalData, totalTakenAmount]);

// Calculate Added Total Amount (silver + investors)
useEffect(() => {
  const totalInvestor = additionalData.reduce((sum, item) => {
    const amount = parseFloat(item.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const total = Number(silverRate || 0) + totalInvestor;
  setAddedTotalAmt(total);
}, [silverRate, additionalData]);





// Investor List Crud

// Investor Create and Edit Crud

const PulseBar = ({ x, y, width, height, color, delay = 0 }) => {
  const [scale, setScale] = React.useState(0.3);

  React.useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setScale((prev) => (prev === 1 ? 0.3 : 1));
      }, 1000);
    }, delay);

    return () => clearTimeout(start);
  }, [delay]);

  const newHeight = height * scale;
  const newY = y + (height - newHeight);

  return (
    <rect
      x={x}
      y={newY}
      width={width}
      height={newHeight}
      fill={color}
      style={{
        transition: "height 0.8s ease-in-out, y 0.8s ease-in-out",
      }}
    />
  );
};



  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);


  const cleanDate = (raw) => raw.replace(/\s\d{2}:\d{2}:\d{2}/, "");



  return (

    <div>
      <Navbars />
      <div className="container all-modules-height card p-3">

        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
          <h5 className="heading-with-line mb-2 mb-md-0">
            Dashboard
            <hr className="smooth-line" />
          </h5>
        </div>

        <div data-aos="fade-up">

         <div className="row mt-2">

  <div className="col-md-6">
    <h5 className="fw-bold text-warning mb-3 dashboard-price-headings">🟡 Gold Price</h5>

 

    <div className="row">

      {/* Gold Rate 1g */}
      <div className="col-md-6 mb-3">
        <div className="card p-3 small-card shadow h-100">
          <h6 className="mb-3 text-primary fw-bold">Gold Rate (1g)</h6>
          <input
            type="number"
            className="form-control fw-bold"
            value={goldRate}
            onChange={(e) => setGoldRate(e.target.value)}
            placeholder="Enter 1g price"
          />
        </div>
      </div>
         {/* 🔘 Toggle Button */}
    <div className="col-md-6 mb-3">
      <div className="card p-3 small-card shadow h-100">
      <label className="fw-bold">Show Price Amount?</label>

      <label className="switch m-0 mt-2">
        <input
          type="checkbox"
          checked={showPriceCards}
          onChange={() => setShowPriceCards(!showPriceCards)}
        />
        <span className="slider round"></span>
      </label>
      </div>
    </div>

    </div>
     {!showPriceCards? <div className="col-md-12 click-btn all-btn-color text-right ms-3">
        <button className="btn" onClick={goldSilverCreate}>Submit</button>
      </div>:""}  
  </div>

  {/* RIGHT SIDE CARDS SHOW ONLY WHEN TOGGLE = TRUE */}
  <div className="col-md-6">
    <div className="row">


      {showPriceCards && (
        
        <>

      <h5 className="fw-bold text-secondary mb-3 dashboard-price-headings">⚪ Price Amount</h5>

          {/* Enter Total Amount */}
          <div className="col-md-6 mb-3">
            <div className="card p-3 small-card shadow h-100">
              <h6 className="mb-3 text-primary fw-bold">Enter Total Amount</h6>
              <input
                type="number"
                className="form-control fw-bold"
                value={silverRate}
                onChange={(e) => setSilverRate(e.target.value)}
                placeholder="Enter total amount"
              />
            </div>
          </div>

          {/* Added Total Amount */}
          <div className="col-md-6 mb-3">
            <div className="card p-3 small-card shadow h-100">
              <h6 className="mb-3 text-success fw-bold">Added Total Amount</h6>
              <div className="output-box">
                ₹{addedTotalAmt ? addedTotalAmt : "0"}
              </div>
            </div>
          </div>
        </>
      )}

  {showPriceCards? <div className="col-md-12 click-btn all-btn-color text-right">
        <button className="btn" onClick={goldSilverCreate}>Submit</button>
      </div>:""}   

    </div>
  </div>

</div>


{/* New Function */}

<div className="row mt-5 d-flex">

  <div className="col-md-3 mb-3">
    <div className="p-3 rounded border shadow add-investor-style h-100 shake-card">
      <label className="form-label fw-bold">🟡 Add Investor</label>

      <label className="switch">
        <input
          type="checkbox"
          checked={isAdditionalLoan}
          onChange={(e) => {
            const checked = e.target.checked;
            setIsAdditionalLoan(checked);

            if (checked) {
              navigate("/add-investor");
            } else {
              setShowForm(false);
              setShowTable(true);
              handleInvestorList();
            }
          }}
        />
        <span className="slider round"></span>
      </label>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="p-3 rounded border shadow text-center h-100 shake-card">
      <h6 className="mb-0 fw-bold">Amount Disbursed</h6>
      <h6 className="fw-bold text-primary mt-2">₹ {givenAmount}</h6>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="p-3 rounded border shadow text-center h-100 shake-card">
      <h6 className="mb-0 fw-bold">Outstanding Amount</h6>
      <h6 className="fw-bold text-danger mt-2">₹ {outstandingAmount}</h6>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="p-3 rounded border shadow text-center h-100 shake-card">
      <h6 className="mb-0 fw-bold">Taken Amount</h6>
      <h6 className="fw-bold text-danger mt-2">₹ {totalTakenAmount}</h6>
    </div>
  </div>

{/* <div className=" mt-4"> */}

  {/* TOGGLE (col-md-3) */}
<div className="col-md-3 d-flex align-items-center gap-2 p-1 m-0 mt-4">
  <label className="form-label fw-bold mb-0" style={{marginLeft:'14px'}}>Is Taken?</label>

  <label className="switch mb-0">
    <input
      type="checkbox"
      checked={isTaken}
      onChange={() => setIsTaken(!isTaken)}
    />
    <span className="slider round"></span>
  </label>

  <span className="fw-bold mb-0">{isTaken ? "YES" : "NO"}</span>
</div>

{/* INPUT (col-md-6) */}
{isTaken && (
  <div className="col-md-6 d-flex mt-4">
    <input
      type="number"
      className="form-control"
      placeholder="Taken Amount"
      value={takenAmount}
      onChange={(e) => setTakenAmount(e.target.value)}
    />
  </div>
)}

{/* SUBMIT (col-md-3) */}
{isTaken && (
  <div className="col-md-3 text-end mt-4 all-btn-color">
    <button className="btn btn-primary" onClick={takenAmountCreate}>
      Submit
    </button>
  </div>
)}


{/* </div> */}
<div className="d-flex justify-content-center">
  <div
    className="card p-3 shadow-sm mt-5"
    style={{ width: "600px", marginTop: "5rem" }}
  >
    <h6 className="fw-bold mb-3 text-center">Amount Overview</h6>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <BarChart
        width={400}
        height={300}
        data={[
          { name: "Amount", given: Number(givenAmount), outstanding: Number(outstandingAmount) },
        ]}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="bottom" />

     <Bar
  className="bar-glow"
  dataKey="given"
  fill="#28a745"
  barSize={60}
  label={{ position: "center" }}
  shape={(props) => <PulseBar {...props} color="#28a745" delay={0} />}
/>

<Bar
  className="bar-glow"
  dataKey="outstanding"
  fill="#dc3545"
  barSize={60}
  label={{ position: "center" }}
  shape={(props) => <PulseBar {...props} color="#dc3545" delay={600} />}
/>

      </BarChart>
    </div>
  </div>
</div>









</div>


{/* New Function */}


          {/* Remaining Interest Alerts */}


<div className="mt-5 shadow p-3 radius-10">
  <h5 className="fw-bold mb-3">Customer Interest Due Soon</h5>

  <table className="table table-bordered">
    <thead className="table-light" >
      <tr>
        <th>#</th>
        <th>Customer Name</th>
        <th>Start Date</th>
        <th>Expiry Date</th>
        <th>Remaining Days</th>
        <th>Interest Amount (₹)</th>
        <th className="text-center">Action</th>
      </tr>
    </thead>

 <tbody>
  {loading ? (
    <tr>
      <td colSpan="7" className="text-center">
        <div className="gold-dots-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </td>
    </tr>
  ) : customerList && customerList.length > 0 ? (
    customerList
      .map((cust) => {
        const expiryDate = getExpiryDate(
          cust?.date,
          cust?.duration_type,
          cust?.duration
        );
        const remainingDays = calculateRemainingDays(expiryDate);
        const monthlyInterest = calculateMonthlyInterest(
          cust.loan_amount,
          cust.intrest_rate,
          cust.duration_type,
          cust.duration
        );

        return { ...cust, expiryDate, remainingDays, monthlyInterest };
      })
      .filter(
        (cust) =>
          cust.remainingDays >= 0 &&
          cust.remainingDays <= 30 &&
          cust.paid_status !== "Closed"
      )
      .map((cust, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{cust.name}</td>
          <td>{cleanDate(cust?.date)?.split("-").reverse().join("-") || "-"}</td>

          <td>{cust.expiryDate.split("-").reverse().join("-") || "-"}</td>
          <td
            className={
              cust.remainingDays <= 1
                ? "blink-red"
                : cust.remainingDays <= 15
                ? "blink-yellow"
                : ""
            }
          >
            {cust.remainingDays}
          </td>
          <td>{cust.monthlyInterest}</td>
          <td className="text-center">
             <div className="whatsapp-wrapper">
          <button
            onClick={() => {
              const phone = cust.phone_no;
              const fullNumber = phone.replace(/\D+/g, '').trim();
              const msg = getWhatsAppMessage(cust);

              window.open(
                `https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}`,
                "_blank"
              );
            }}
            className="whatsapp-btn"
          >
            <FaWhatsapp size={28} color="#25D366" />
          </button>
          <span className="tooltip">Send WhatsApp</span>
        </div>
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center">
        No records found
      </td>
    </tr>
  )}
</tbody>


  </table>
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

      </div>
    </div>


  );
}

export default Dashboard;
