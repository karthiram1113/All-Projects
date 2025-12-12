import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbars from '../../common/Navbar';
import superAdminApis from '../../api/services/admin-pages/superAdmin';
import NoImage from '../../assets/img/noimages.jpg';
import './index.css'


import AOS from "aos";
import "aos/dist/aos.css";

const PayPage = ({ customerList, setCustomerList }) => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [closedDate,setClosedDate] = useState("")
 const [loanClosed, setLoanClosed] = useState(false);
 const [calculationAmt,setCalculationAmt] = useState("")
const [isPrincipalEdited, setIsPrincipalEdited] = useState(false);

    useEffect(() => {
          AOS.init({
            duration: 1000,  
            once: false,    
            mirror: true,    
          });
        }, []);

  useEffect(() => {
    if (!loanClosed) return;

    // 1. Update status and start blink
    setPaidStatus("Closed");
    setBlinkClosed(true);

    // 2. Stop blink after 10 seconds and navigate
    const timer = setTimeout(() => {
      setBlinkClosed(false);
      navigate("/customer-details-list");
    }, 10000); // 10 seconds

    // 3. Cleanup in case component unmounts
    return () => clearTimeout(timer);
  }, [loanClosed, navigate]);

  const [customer, setCustomer] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [principalPay, setPrincipalPay] = useState('');
  const [remainingAmount, setRemainingAmount] = useState(0);

const [isInterestEdited, setIsInterestEdited] = useState(false);

  const [remainingAmountOnly, setRemainingAmountOnly] = useState(0);
const [principalPaid, setPrincipalPaid] = useState(0);
const [interestPaid, setInterestPaid] = useState(0);


const today = new Date();
const todatDates = new Date().toLocaleDateString("en-GB").replaceAll("/", "-");






  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiNumber, setUpiNumber] = useState("");

  console.log(customer);

  // ✅ Function to calculate interest

//  const calculateInterest = (cust) => {
//   const today = new Date();

//   const loanStartDate = cust.date && cust.date !== "0000-00-00"
//     ? new Date(cust.date)
//     : today;

//   // first month always counts as 1 month
//   const lastDate = loanStartDate;

//   const diffTime = today - lastDate;
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   let months = 1;   // minimum always 1 month

//   if (diffDays <= 30) {
//     months = 1;   // 1 month interest
//   } 
//   else if (diffDays <= 45) {
//     months = 1.5; // 1.5 months interest
//   } 
//   else {
//     // after 45 days → full additional month interest
//     const extraDays = diffDays - 30; // after 1st month
//     const fullMonths = Math.floor(extraDays / 30);
//     const remainingDays = extraDays % 30;

//     months = 1 + fullMonths + (remainingDays > 15 ? 1 : 0);
//   }

//   const loanAmount = Number(cust.loan_amount || 0);
//   const rate = Number(cust.intrest_rate || 0);

//   const interest = loanAmount * (rate / 100) * months;

//   return { interest: Number(interest.toFixed(2)), months };
// };

const calculateInterest = (cust) => {
  const today = new Date();

  // ------ MAIN LOAN INTEREST ------
  const mainDate = cust.date && cust.date !== "0000-00-00"
    ? new Date(cust.date)
    : today;

  const diffMain = Math.floor((today - mainDate) / (1000 * 60 * 60 * 24));

  const mainMonths =
    diffMain <= 30 ? 1 :
    diffMain <= 45 ? 1.5 :
    1 + Math.floor((diffMain - 30) / 30) + ((diffMain - 30) % 30 > 15 ? 1 : 0);

  // FIX: use previous_loan_amount
  const mainLoan = Number(cust.previous_loan_amount || 0);
  const rate = Number(cust.intrest_rate || 0);

  const mainInterest = mainLoan * (rate / 100) * mainMonths;



  // ------ ADDITIONAL LOAN INTEREST ------
  let addInterest = 0;

  if (cust.additional_loan_amt) {
    const addDate = new Date(cust.additional_loan_date);

    const diffAdd = Math.floor((today - addDate) / (1000 * 60 * 60 * 24));

    const addMonths =
      diffAdd <= 30 ? 1 :
      diffAdd <= 45 ? 1.5 :
      1 + Math.floor((diffAdd - 30) / 30) + ((diffAdd - 30) % 30 > 15 ? 1 : 0);

    addInterest =
      Number(cust.additional_loan_amt) * (rate / 100) * addMonths;
  }

  const totalInterest = mainInterest + addInterest;

  return {
    interest: Number(totalInterest.toFixed(2)),
    mainMonths,
  };
};



//   useEffect(() => {
//     const cust = customerList?.find(c => String(c.id) === String(customerId));
//     if (!cust) {
//       toast.error("Customer not found");
//       navigate("/customer-details-list");
//       return;
//     }

//     setCustomer(cust);
//     const { interest } = calculateInterest(cust);
// const remaining = Number(cust.total_amount || 0) - Number(cust.paid_amount || 0);
//     setRemainingAmount(remaining.toFixed(2)+interest);
//   }, [customerId, customerList, navigate]);


useEffect(() => {
  const cust = customerList?.find(c => String(c.id) === String(customerId));
  if (!cust) {
    toast.error("Customer not found");
    navigate("/customer-details-list");
    return;
  }

  setCustomer(cust);

  console.log(cust);
  

  const { interest } = calculateInterest(cust);

  console.log(interest);
  

  let remaining = 0;

// If loan closed → always show 0
if (cust.paid_status === "Closed") {
  setRemainingAmount("0.00");
} else {
  const remainingBase =
    Number(cust.balance || 0) ;

    console.log(remainingBase);
    

  const finalRemaining = Number(remainingBase) + Number(interest);

  setRemainingAmountOnly(remainingBase)
  setRemainingAmount(finalRemaining.toFixed(2));
  console.log(finalRemaining);
  
}


//   const remaining =
//     Number(cust.total_amount || 0) - Number(cust.paid_amount || 0);

//   const finalRemaining = Number(remaining) + Number(interest);
// console.log(finalRemaining);


//   setRemainingAmount(finalRemaining.toFixed(2));


}, [customerId, customerList, navigate]);


  // ✅ Payment handler
  
 const [blinkClosed, setBlinkClosed] = useState(false);
 const [paidStatus, setPaidStatus] = useState(customer?.paid_status);

const [submit, setSubmit] = useState(false);

const[todatDate,setTodayDate] = useState("")

 
const handlePay = async () => {

  setSubmit(true)

  // 🧩 Basic validation

 const principalValue = parseFloat(principalPay || 0);
  const remainingValue = parseFloat(remainingAmountOnly || 0);

  
  const interestValue = Number(payAmount || 0);



 if (principalValue > 0 && principalValue === remainingValue && !closedDate) {
  toast.error("⚠️ Please select Loan Closed Date to fully settle the loan");
  return;
}


 
  if (
    (!payAmount || parseFloat(payAmount) <= 0) &&
    (!principalPay || parseFloat(principalPay) <= 0)
  ) {
    toast.error("Enter a valid payment amount or principal");
    return;
  }

const maxLoan = parseFloat(customer?.loan_amount ?? 0);
if (parseFloat(principalPay) === maxLoan && closedDate.length === 0) {
  toast.error("❗ Closed date is required for full loan payment");
  setSubmit(true);
  return;
}

  // 2️⃣ Block if full principal but interest not fully paid
  if (parseFloat(principalPay) === maxLoan && payAmount.length === 0) {
    toast.error("⚠️ You must pay the full interest before closing the loan.");
    return;
  }



  // 🕒 Get local time in Asia/Kolkata
  // const now = new Date();
  // const options = { timeZone: "Asia/Kolkata" };
  // const localDateTime = new Intl.DateTimeFormat("en-CA", {
  //   ...options,
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  //   hour12: false,
  // })
  //   .format(now)
  //   .replace(",", "");

    // const today = new Date();
const now = new Date();

 // UI date (DD-MM-YYYY)
  const uiDate = `${String(now.getDate()).padStart(2, "0")}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${now.getFullYear()}`;

    setTodayDate(uiDate)


  // Payload date (YYYY-MM-DD HH:mm:ss)
  const payloadDate = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${
    String(now.getHours()).padStart(2, "0")
  }:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;


  // 📊 Calculate interest (if applicable)
  const { interest } = calculateInterest(customer);

  // ✅ Always use correct remaining balance (never loan_amount again)
  let prevRemaining = Number(
    customer.remaining_balance ||
      customer.balance ||
      customer.loan_amount ||
      0
  );

  const interestPayment = parseFloat(payAmount) || 0;
  const principalPayment = parseFloat(principalPay) || 0;

  const roundedInterest = parseFloat(interestPayment.toFixed(2));
  const roundedPrincipal =
    Math.round((principalPayment + Number.EPSILON) * 100) / 100;

  // ✅ Subtract from current remaining
  let newRemainingLoan = prevRemaining - roundedPrincipal;
  if (newRemainingLoan < 0) newRemainingLoan = 0; // avoid negative
  const isClosed = newRemainingLoan === 0;

  setLoanClosed(isClosed); 


  // 💾 New payment record
  const newPaymentRecord = {
    month_no: (customer.paymentHistory?.length || 0) + 1,
    payment_date: payloadDate,
    interest_paid: roundedInterest,
    principal_paid: roundedPrincipal,
    balance: newRemainingLoan.toFixed(2),
  };

  const updatedPaymentHistory = [
    ...(customer.paymentHistory || []),
    newPaymentRecord,
  ];

  // 📈 Totals
  const totalInterestPaid = updatedPaymentHistory.reduce(
    (sum, p) => sum + Number(p.interest_paid || 0),
    0
  );
  const totalPrincipalPaid = updatedPaymentHistory.reduce(
    (sum, p) => sum + Number(p.principal_paid || 0),
    0
  );
  const totalPaid = totalInterestPaid + totalPrincipalPaid;

  // 🧾 Updated customer
  const updatedCustomer = {
    ...customer,
    paid_amount: totalPaid.toFixed(2),
    interest_paid: totalInterestPaid.toFixed(2),
    principal_paid: totalPrincipalPaid.toFixed(2),
    last_payment_date: payloadDate,
    total_amount: (Number(customer.loan_amount) + interest).toFixed(2),
    remaining_balance: newRemainingLoan.toFixed(2),
    paid_status: isClosed ? "Closed" : "Active",
    closed_date: isClosed ? payloadDate : customer.closed_date || null,
    paymentHistory: updatedPaymentHistory,
  };

  // 🔁 Update local list
  const updatedList = customerList.map((c) =>
    String(c.id) === String(updatedCustomer.id) ? updatedCustomer : c
  );
  setCustomerList(updatedList);

  
    // 🧠 Payload for backend (final and correct)
    const apiData = {
      customerDetails: {
        id: updatedCustomer.id,
        name: updatedCustomer.name,
        date: updatedCustomer.date,
        phone_no: updatedCustomer.phone_no,
        alter_phone_no: updatedCustomer.alter_phone_no,

        loan_amount: updatedCustomer.previous_loan_amount,
        intrest_rate: updatedCustomer.intrest_rate,
        duration_type: updatedCustomer.duration_type,
        duration: updatedCustomer.duration,

        intrest_amount: updatedCustomer.intrest_amount,
        total_amount: updatedCustomer.total_amount,
        paid_amount: updatedCustomer.paid_amount,
        interest_paid: updatedCustomer.interest_paid,
        principal_paid: updatedCustomer.principal_paid,

        last_payment_date: updatedCustomer.last_payment_date,
        paid_status: updatedCustomer.paid_status,
        closed_date: updatedCustomer.closed_date,

        aadhar_no: updatedCustomer.aadhar_no,
        release_date: updatedCustomer.release_date,
        address: updatedCustomer.address,
        live_img: updatedCustomer.live_img,
        aadhar_img: updatedCustomer.aadhar_img,
        aadhar_img_1: updatedCustomer.aadhar_img_1,
        jewel_img: updatedCustomer.jewel_img,
        optional_img: updatedCustomer.optional_img,
        created_by: updatedCustomer.created_by,
        loan_close_date :closedDate,
        pay_method :paymentMethod,
        upi_number :upiNumber,
        additional_loan_amt :updatedCustomer.additional_loan_amt ,
        additional_loan_date :updatedCustomer.additional_loan_date ,

        // ✅ Send correct remaining balance
        balance: newRemainingLoan.toFixed(2),
      },
    };

  try {
  const response = await superAdminApis.customerDetailsUpdateAPI(apiData);

  setSubmit(true)
  const loanClosed = apiData.paid_status === "Closed"; 

  if (response?.apiStatus?.code === "200") {
    
  setSubmit(false)
    toast.success(
      loanClosed
        ? `Loan fully paid and marked as Closed!`
        : `Payment successful!`
    );

    if (loanClosed) {
      setPaidStatus("Closed");
      setBlinkClosed(true);

      setTimeout(() => {
        setBlinkClosed(false);
        navigate("/customer-details-list");
      }, 5000);

    } else {
      navigate("/customer-details-list"); // normal payment → immediate
    }
  } else {
    
  setSubmit(false)
    toast.error("Failed to update payment");
  }

} catch (error) {
  
  setSubmit(false)
  toast.error("Error while saving payment details.");
}

};



  if (!customer) return null;

  const { interest, months } = calculateInterest(customer);


  const handleBackCustomer = () => navigate('/customer-details-list');

  // ✅ Check if already paid interest this month

  
  const hasPaidThisMonth = (() => {
    if (!customer?.last_payment_date) return false;
    const lastPay = new Date(customer.last_payment_date);
    const today = new Date();
    return (
      lastPay.getFullYear() === today.getFullYear() &&
      lastPay.getMonth() === today.getMonth()
    );
  })();



  const interests = Number(customer?.interest_amount || 0); 
const suggestion = interests; 



  return (
    <div>
      <Navbars />
      <div className="container all-modules-height card p-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
          <h5 className="heading-with-line mb-2 mb-md-0 aquanew-text-effect">
            Pay Loan Amount - Customer Name - {customer?.name}
            <hr className="smooth-line" />
          </h5>

          <button className="btn add-customer" onClick={handleBackCustomer}>
            <i className="fa fa-arrow-left me-2"></i> Back
          </button>
        </div>

        <div className="shadow p-2"  data-aos="fade-up">
         <div className="card-body">

    {/* <h5 className="card-title mb-3">📌 Loan Information</h5> */}



{/* Additional Loan Data ONLY if condition true */}
{customer?.additional_loan_amt && (
  <>
  <div className='row'>
<div className="col-4 mb-4">
      <p className="mb-1 text-muted small">Additional Loan Amount</p>
      <h6 className="fw-bold">₹{customer?.additional_loan_amt}</h6>
    </div>

    <div className="col-4 mb-4">
      <p className="mb-1 text-muted small">Additional Loan Date</p>
      <h6 className="fw-bold">
        {customer?.additional_loan_date
          ? customer.additional_loan_date.split(" ")[0].split("-").reverse().join("-")
          : "-"}
      </h6>
    </div>

    {/* TOTAL LOAN AMOUNT - ONLY IF ADDITIONAL LOAN */}
    <div className="col-4 mb-4">
      <p className="mb-1 text-muted small">Total Loan Amount</p>
      <h6 className="fw-bold">₹{customer?.loan_amount}</h6>
    </div>
  </div>
    
  </>
)}



    <div className="row">
       {customer?.additional_loan_amt ? 
        <div className="col-3 mb-3 highlight-remaining">
        <p className="mb-1 text-muted small">Loan Amount</p>
        <h6 className="fw-bold">₹{customer?.previous_loan_amount}</h6>
      </div>
      :
       <div className="col-3 mb-3">
        <p className="mb-1 text-muted small">Total Loan Amount</p>
        <h6 className="fw-bold">₹{customer?.loan_amount}</h6>
      </div>
       }
     

      <div className="col-3 mb-3">
        <p className="mb-1 text-muted small">Interest Rate</p>
        <h6 className="fw-bold">{customer?.intrest_rate}%</h6>
      </div>

      <div className="col-3 mb-3">
        <p className="mb-1 text-muted small">Loan Start Date</p>
       <h6 className="fw-bold">
  {customer?.date
    ? customer.date.split(" ")[0].split("-").reverse().join("-")
    : "-"
  }
</h6>

      </div>

      <div className="col-3 mb-3">
<p className="mb-1 text-muted small">Remaining Amount Only</p>
<h6 className="fw-bold">{remainingAmountOnly==0?customer?.loan_amount:remainingAmountOnly}</h6>
      </div>


{!hasPaidThisMonth ? (
 <><div className="col-3 mb-3 mt-3">
<p className="mb-1 text-muted small">Today</p>
<h6 className="fw-bold">{todatDates}</h6>






                </div><div className="col-3 mb-3 mt-3">
                    <p className="mb-1 text-muted small">Full Months Since Last Payment</p>
                    <h6 className="fw-bold">{months} month(s)</h6>
                  </div></>
): <><div className="col-4 mb-3 mt-3">
                  <p className="mb-1 text-muted small">Today</p>
                  <h6 className="fw-bold">{todatDates}</h6>
                </div><div className="col-4 mb-3 mt-3">
                    <p className="mb-1 text-muted small">Full Months Since Last Payment</p>
                    <h6 className="fw-bold">{months} month(s)</h6>
                  </div>
                  
        
                  </>}

     


  {/* If Interest Due exists → use col-4 for all 3 fields */}
{!hasPaidThisMonth ? (
  <>
    {/* Interest Due */}
    <div className="col-3 mb-3 mt-3">
      <p className="mb-1 text-muted small">Interest Due</p>
      <h6 className="fw-bold text-danger">₹{interest.toFixed(2)}</h6>
    </div>

    {/* Remaining Amount */}
    <div className="col-3 mt-3 highlight-remaining">
      <p className="mb-1 text-muted small">Remaining Amount (incl. interest)</p>
<h6 className="fw-bold text-primary">
  ₹{
    Number(remainingAmountOnly) === 0
      ? Number(customer?.loan_amount || 0) + Number(remainingAmount || 0)
      : Number(remainingAmount || 0)
  }
</h6>
    </div>

   

    {/* Pay Method */}
    <div className="col-6 mt-2">
      <label className="text-muted small">Pay method</label>
      <select
        className="form-select"
        style={{ padding: "10px" }}
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="" disabled>Select Payment Method</option>
        <option value="cash">Cash</option>
        <option value="upi">UPI</option>
        <option value="bank_transfer">Bank Transfer</option>
      </select>
    </div>

    {paymentMethod === "upi" && (
  <div className="col-md-6">
    <label className="text-muted small">UPI Number</label>
    <input
      type="text"
      className="form-control"
      placeholder="Enter UPI Number"
      value={upiNumber}
      maxLength={12}
      onChange={(e) => setUpiNumber(e.target.value)}
    />
  </div>
)}
  </>
) : (
  <>
    {/* No Interest → Normal 2 column layout */}

    <div className="col-4 mt-2 highlight-remaining">
      <p className="mb-1 text-muted small">Remaining Amount (incl. interest)</p>
      <h6 className="fw-bold text-primary">₹{remainingAmount}</h6>
    </div>

    



{customer?.paid_status === "Closed" ? (
  ""
) : (
  <>
    <div className="col-6 mt-2">
      <label className="text-muted small">Pay method</label>
      <select
        className="form-select"
        style={{ padding: "10px" }}
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="" disabled>Select Payment Method</option>
        <option value="cash">Cash</option>
        <option value="upi">UPI</option>
        <option value="bank_transfer">Bank Transfer</option>
      </select>
    </div>

    {paymentMethod === "upi" && (
      <div className="col-md-6 mt-2">
        <label className="text-muted small">UPI Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter UPI Number"
          value={upiNumber}
          maxLength={12}
          onChange={(e) => setUpiNumber(e.target.value)}
        />
      </div>
    )}
  </>
)}


  </>
)}


    </div>

  </div>

<div className='mt-4 mb-5' style={{ display: 'flex', alignItems: 'center', gap: '20px', padding:'0 13px' }}>
  <label style={{ marginBottom: 0 }}>🟡 Enter Payment Amount (₹)</label>
  {/* <input
    type="number"
    value={calculationAmt}
    onChange={(e) => {
      const val = parseFloat(e.target.value) ;
      setCalculationAmt(val);
      setInterestPaid(Math.min(val, interest));
      setPrincipalPaid(val - Math.min(val, interest));
    }}
    style={{
      width: '120px',
      border: 'none',
      borderBottom: '1px solid #000', 
      outline: 'none',
      padding: '0 0 2px 0', // bottom padding only
      marginBottom: 0,      // make sure line aligns
      borderRadius: 0,
      marginRight:'24px'
    }}
  /> */}

<input
  type="number"
  className='form-controlss'
  value={calculationAmt}
  onChange={(e) => {
    const raw = e.target.value;

    // Allow empty input
    if (raw === "") {
      setCalculationAmt("");
      setInterestPaid("");
      setPrincipalPay("");
      setPayAmount("");
      setIsInterestEdited(false);
      return;
    }

    const val = parseFloat(raw);
    setCalculationAmt(val);

    if (isNaN(val)) return;

    const interestPart = Math.min(val, interest);
    const principalPart = val - interestPart;

    setInterestPaid(interestPart);
    setPrincipalPay(principalPart);

    // Auto-fill bottom input ONLY if user has NOT touched it
    if (!isInterestEdited) {
      setPayAmount(interestPart);
    }
  }}
/>


<div style={{ alignSelf: "flex-end" }}>
  💡 Interest Paid: ₹{interestPaid || 0} | Principal Paid: ₹{principalPay || 0}
</div>

</div>


<div className='row'>
  <div className='col-md-6'>
{(() => {
  
  const lastPaymentDate = customer?.last_payment_date;
  const totalInterestPaid = Number(customer?.interest_paid ?? 0);

  const hasPaidThisMonth =
    lastPaymentDate &&
    (() => {
      const lastPay = new Date(lastPaymentDate);
      const today = new Date();
      return (
        lastPay.getMonth() === today.getMonth() &&
        lastPay.getFullYear() === today.getFullYear() &&
        totalInterestPaid > 0 
      );
    })();

  const loanDate = new Date(customer?.date);
  const today = new Date();
  const expectedInterest = Number(interest.toFixed(2)); 
  const paidInterest = Number(customer?.interest_paid ?? 0);
  const lastPayment = customer?.last_payment_date;


  const isFirstTime =
    !lastPayment || lastPayment === "0000-00-00" || paidInterest === 0;

  let months = 1;

  if (!isFirstTime) {
    const diffDays = Math.floor((today - loanDate) / (1000 * 60 * 60 * 24));
    months = Math.floor(diffDays / 30);
    if (months < 1) months = 1;
  }

  const totalInterest = (expectedInterest * months).toFixed(2);

  const pendingInterest =
    !isFirstTime && paidInterest < expectedInterest
      ? (expectedInterest - paidInterest).toFixed(2)
      : 0;

 
  const suggestion = (
    Number(totalInterest) + Number(pendingInterest)
  ).toFixed(2);

 
  if (hasPaidThisMonth) {
    return (
      <div className="alert alert-success mt-3" style={{ margin: "0px 13px" }}>
        ✅ இந்த மாதத்திற்கான வட்டி ஏற்கனவே செலுத்தப்பட்டுள்ளது.
      </div>
    );
  }


  return (
    <>
  
      {!isFirstTime && pendingInterest > 0 && (
        <div className="alert alert-danger mt-3 p-2">
          ⚠️ கடந்த மாத வட்டி செலுத்தப்படவில்லை.<br />
          மீதமுள்ள வட்டி: ₹{pendingInterest}<br />
          மொத்த வட்டி பரிந்துரை: ₹{suggestion}
        </div>
      )}

     
<div className="form-group mt-1" style={{ padding: "0px 13px" }}>
  <label>Payment Interest Amount - <span className='text-danger fw-bold'>({interest})</span>  ₹</label>
  <input
    type="number"
    className="form-control"
    value={payAmount}
    onChange={(e) => {
    const val = e.target.value;

    // Allow only 0–2 decimal values
    if (!/^\d*\.?\d{0,2}$/.test(val)) return;

    if (val > interest) {
      toast.error(`❗ Interest cannot exceed ₹${interest}`);
      return;
    }

    setPayAmount(val);
    setIsInterestEdited(true); // Now user has edited manually → stop autofill
  }}

    placeholder={`Suggested: ₹${interest}`}

    

  />

  <small className="text-muted">
    💡 Suggested interest for this period: ₹{interest}
  </small>


</div>


    </>
  );
})()}

  </div>
  <div className='col-md-6'>
 {/* ✅ Principal always visible */}

 {customer?.paid_status === "Closed" ? (
  <div
    className="alert alert-success text-center mt-3 mb-3"
    style={{ margin: "0px 13px",padding:'25px' }}
  >
    🎉 Your loan is fully paid and closed!
  </div>
) : (


  <div className="form-group  mb-4" style={{ padding: "0px 13px" }}>
    <label>Principal Payment (₹)</label>

    <input
      type="text"
      className="form-control"
value={principalPay === 0 ? "" : principalPay} 
     placeholder={`Enter principal amount (Maximum allowed: ₹${
        (remainingAmountOnly > 0 ? remainingAmountOnly : customer?.loan_amount) ?? 0
      })`}
      onChange={(e) => {
        const val = e.target.value;

       
        if (!/^\d*\.?\d{0,2}$/.test(val)) return;

        const numericVal = val === "" ? 0 : parseFloat(val);

        const loan = Number(customer?.loan_amount ?? 0);
        const remaining = Number(remainingAmountOnly ?? 0);
  setIsPrincipalEdited(true); 
        
        const maxAllowed = remaining > 0 ? remaining : loan;

        if (numericVal > maxAllowed) {
          toast.error(`❗ Principal amount cannot exceed ₹${maxAllowed}.`);
          return;
        }

        setPrincipalPay(val);
      }}
    />

    <small className="text-muted">
      💰 This amount will reduce the main loan balance (principal).
    </small>
  </div>
)}

  </div>

</div>








 


{customer?.paid_status !== "Closed" && (
  <div className="row mt-4" style={{ padding: "0px 13px" }}>

    {/* Loan Closed Date */}
  <div className="col-6">
  <div className="form-group" style={{ width: "100%" }}>
    <label className="mb-2 text-muted small">Loan Closed Date</label>

    <input
      type="date"
      className="form-control"
      value={closedDate}
      onChange={(e) => setClosedDate(e.target.value)}
      onClick={(e) => {
        const input = e.currentTarget;
        if (typeof input.showPicker === "function") input.showPicker();
        else input.focus();
      }}
      style={
       submit &&
  isPrincipalEdited &&
  Number(principalPay || 0) === Number(remainingAmountOnly || 0) &&
  !closedDate
          ? { borderColor: "red" }
          : {}
      }
    />

   

    {submit &&
  isPrincipalEdited &&
  Number(principalPay || 0) === Number(remainingAmountOnly || 0) &&
  !closedDate && (
    <small className="text-danger">
      ⚠️ Please select Loan Closed Date to fully settle the loan
    </small>
)}

  </div>
</div>


    {/* Status */}
    <div className="col-6 text-center mt-4">
      <label>Status</label>
      <h6 className={blinkClosed ? "blink-status text-success" : ""}>
        {paidStatus === "Closed" ? "Closed" : "Pending"}
      </h6>
    </div>

  </div>
)}







 {customer?.paid_status=="Closed"  ?"":<div  style={{padding:'0px 13px'}} className='mb-3'>
<button
  className="btn pay-button mt-3" 
 
  onClick={handlePay}
  disabled={
    (!principalPay || parseFloat(principalPay) <= 0) &&
    (!payAmount || parseFloat(payAmount) <= 0)
  }
>
  Pay
</button>
</div>}       





        </div>

        
      </div>
    </div>
  );
};

export default PayPage;
