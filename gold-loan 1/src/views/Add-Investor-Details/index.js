import React, { useEffect, useState } from 'react'
import Navbars from '../../common/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import superAdminApis from '../../api/services/admin-pages/superAdmin';
import { toast } from 'react-toastify';

function AddInvestor() {

    const navigate = useNavigate();

    const [additionalData, setAdditionalData] = useState([]);
    const [loading, setLoading] = useState(false)
      const [currentPage, setCurrentPage] = useState(1);
      const [recordsPerPage] = useState(10);
      const [totalRecords, setTotalRecords] = useState(0);
      const [isEditing,setIsEditing] = useState(false)
      const [investorId,setInvestorDeleteId] = useState("")
      const [intrestName,setIntrestName] = useState("")
      const [takenData, setTakenData] = useState([]);


        useEffect(() => {
         handleInvestorList(currentPage);
          handleTakenList(currentPage)
        }, [currentPage]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      

   const [form, setForm] = useState({
  name: "",
  date: "",
  amount: "",
  rate: "",
  intrestamount : "" ,
  payMethod: "",
  payDuration: "",
  gpayNumber: "",     
  phonePeNumber: "",  
  bankName: "",   
  ifsccode : "" , 
  accountNumber: "",
weekDay: "",

});


      const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

 const totalPages = Math.ceil(totalRecords / recordsPerPage);


  const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) return; 
  setCurrentPage(page);
};

    

   const handleBackCustomer = () => {
      navigate('/dashboard') 
    }


    // Investor List Crud
 const handleInvestorList = (page ) => {
  setLoading(true);

  const apiData = {
    pageIndex: page - 1,
    dataLength: recordsPerPage ?? 10,
  };

  superAdminApis.investorList(apiData)
    .then((responseData) => {
      if (responseData?.apiStatus?.code === "200") {
        setAdditionalData(responseData?.result?.investorDetails || []);
        setTotalRecords(responseData?.result?.totalRecordCount || 0);
      } else {
        setAdditionalData([]);
      }
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      toast.error("An error occurred");
    });
};


const handleEdit = (item) => {
  setIsEditing(true);

  console.log(item);

  setForm({
    id: item.id,
    name: item.name,
    date: item.date,
    amount: item.amount,
    rate: item.intrest_rate,
    intrestamount: item.intrest_amount || "",
    payMethod: item.pay_method || "",
    payDuration: item.pay_duration || "",
    gpayNumber: item.gpay_number || "",
    phonePeNumber: item.phonepe_number || "",
    bankName: item.bank_name || "",
  ifsccode: item.ifsc_code,  
    accountNumber: item.account_number || "",
    weekDay : item.week_day
  });

  const modal = new window.bootstrap.Modal(
    document.getElementById("addinvestor")
  );
  modal.show();
};




    //   Add investor

const handleInvestorSubmit = async (e) => {
  e.preventDefault();

  const apiData = {
    id: isEditing ? form.id : "", 
    name: form.name,
    date: form.date,
    amount: form.amount,
    intrest_rate: form.rate,
    intrest_amount : form.intrestamount,
    pay_method : form.payMethod,
    pay_duration : form.payDuration,
    gpay_number :form.gpayNumber,
    phonepe_number :form.phonePeNumber,
    bank_name : form.bankName,
    ifsc_code : form.ifsccode,
    account_number : form.accountNumber,
    week_day : form.weekDay

  };

  // Correct API call order
  const response = isEditing
    ? await superAdminApis.investorUpdateAPI(apiData)   
    : await superAdminApis.investorCreate(apiData);     

  if (response?.apiStatus?.code === "200") {
    toast.success(response.apiStatus.message);

    // Refresh table
    handleInvestorList();

    // Close modal
    document.getElementById("closedeleteModal").click();

    // Reset form
    setForm({
      id: "",
      name: "",
      date: "",
      amount: "",
      rate: "",
    });

    setIsEditing(false);

  } else {
    toast.error("Failed");
  }
};


  const handleDeleteInvestor = () => {
         superAdminApis.investerDeleteAPI(investorId)
            .then((responseData) => {
               if (responseData.apiStatus.code === '200') {
                  const newTotalRecords = totalRecords - 1;
                  setTotalRecords(newTotalRecords);
                  let totalPages = Math.ceil(newTotalRecords / recordsPerPage);
                  if (currentPage > totalPages) {
                     setCurrentPage(totalPages || 1); 
                  }
                  else if (currentPage < 1) {
                     setCurrentPage(1);
                  }
                  const closeButton = document.getElementById("closedeleteModals");
                  if (closeButton) {
                     handleInvestorList(currentPage);
                     closeButton.click();
                  }
                  toast.success(responseData?.apiStatus?.message);
               } else {
                  toast.error(responseData?.apiStatus?.message);
               }
            })
            .catch((error) => {
               setLoading(false)
               console.error("Error during login:", error);
               toast.error("An error occurred during login.");
            });
      };


   const handleTakenList = (page) => {
            setLoading(true);
        
            const apiData = {
              pageIndex: page - 1,
          dataLength: recordsPerPage,
            };
        
            superAdminApis.takenAmountList(apiData)
              .then((responseData) => {
                if (responseData?.apiStatus?.code === "200") {
                  setLoading(false);
                  setTakenData(responseData?.result?.takenAmountDetails || []);
                  setTotalRecords(responseData?.result?.totalRecordCount || 0);     
                 
                } else {
                  setTakenData([]);
                  setLoading(false);
                
                }
              })
              .catch((error) => {
                setLoading(false);
                console.error("Error fetching customer details:", error);
                toast.error("An error occurred while fetching data.");
              });
          };

  
   const handleDeleteTaken = () => {
         superAdminApis.takenDeleteAPI(investorId)
            .then((responseData) => {
               if (responseData.apiStatus.code === '200') {
                  const newTotalRecords = totalRecords - 1;
                  setTotalRecords(newTotalRecords);
                  let totalPages = Math.ceil(newTotalRecords / recordsPerPage);
                  if (currentPage > totalPages) {
                     setCurrentPage(totalPages || 1); 
                  }
                  else if (currentPage < 1) {
                     setCurrentPage(1);
                  }
                  const closeButton = document.getElementById("takenclosedeleteModal");
                  if (closeButton) {
                     handleTakenList(currentPage);
                     closeButton.click();
                  }
                  toast.success(responseData?.apiStatus?.message);
               } else {
                  toast.error(responseData?.apiStatus?.message);
               }
            })
            .catch((error) => {
               setLoading(false)
               console.error("Error during login:", error);
               toast.error("An error occurred during login.");
            });
      };
  

  return (
    <div>
      <div>
      <Navbars />
      <div className="container all-modules-height card p-3">

        {/* Page Header */}
       <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">

  <h5 className="heading-with-line mb-2 mb-md-0">
    Investors
    <hr className="smooth-line" />
  </h5>

  {/* Buttons Group */}
  <div className="d-flex gap-3">
   

    <button className="btn add-customer" onClick={handleBackCustomer}>
      <i className="fa fa-arrow-left me-2"></i> Back
    </button>

     <button className="btn add-customer" data-bs-toggle="modal"
      data-bs-target="#addinvestor">
      <i className="fa fa-plus me-2"></i> Add Invester
    </button>
  </div>

</div>



{/* Table */}

 <div
 
>
 <table className="table table-bordered">
        <thead className="table-light">
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Interest</th>
        <th>Pay Method</th>
        <th>Pay Duration</th>
        
        
        <th className="text-center">Actions</th>
      </tr>
    </thead>
   <tbody>
  {loading ? (
    <tr>
      <td colSpan="10" className="text-center py-4">
        <div className="gold-dots-loader">
          <div></div><div></div><div></div>
        </div>
      </td>
    </tr>
  ) : additionalData.length === 0 ? (
    <tr>
      <td colSpan="10" className="text-center py-3 text-muted">
        No Data Found
      </td>
    </tr>
  ) : (
    additionalData.map((item, i) => {
      return (
        <tr key={i}>
          <td style={{ whiteSpace: "nowrap" }}>{item.name || "-"}</td>

          {/* FIXED DATE */}
          <td style={{ whiteSpace: "nowrap" }}>
            {item.date ? item.date.split("-").reverse().join("-") : "-"}
          </td>

          <td style={{ whiteSpace: "nowrap" }}>{item.amount || "-"}</td>
          <td>{item?.intrest_amount||'-'}</td>

          <td>{item.pay_method || "-"}</td>
          <td>{item.pay_duration || "-"}</td>

          <td className="text-center">
            <div className="d-flex justify-content-center gap-2">

              <button
                onClick={() => handleEdit(item)}
                className="btn-view add-edit-btn"
                data-tooltip="Edit"
              >
                ✏️
              </button>

              <button
                className="btn-view delete-btn"
                data-tooltip="Delete"
                data-bs-toggle="modal"
                data-bs-target="#investorDelete"
                onClick={() => {
                  setInvestorDeleteId(item?.id);
                  setIntrestName(item?.name);
                }}
              >
                🗑️
              </button>

            </div>
          </td>
        </tr>
      );
    })
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

{/* Investor Remainder */}

    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 mb-4">

  <h5 className="heading-with-line mb-2 mb-md-0">
    Investors Remainder
    <hr className="smooth-line" />
  </h5>
  </div>

        <div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Expiry Date</th>
            <th>Amount</th>
            <th>Remaining Days</th>
           
          </tr>
        </thead>
   <tbody>
  {loading ? (
    <tr>
      <td colSpan="10" className="text-center py-4">
        <div className="gold-dots-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </td>
    </tr>
  ) : additionalData.length === 0 ? (
    <tr>
      <td colSpan="10" className="text-center text-muted py-3">
        No Data Found
      </td>
    </tr>
  ) : (
  additionalData.map((item, i) => {
  const start = new Date(item.date);
  let expiryDate = new Date(start);
  let remainingDays = 0;

  if (item.pay_duration === "Weekly") {
    // Weekly → just add 7 days
    expiryDate.setDate(start.getDate() + 7);

    const today = new Date();
    const diffTime = expiryDate - today;
    remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    // Monthly → add 30 days
    expiryDate.setDate(start.getDate() + 30);

    const today = new Date();
    const diffTime = expiryDate - today;
    remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <tr key={i}>
      <td>{item.name}</td>

      {/* Start Date */}
      <td>
        {start.toISOString().split("T")[0].split("-").reverse().join("-")}
      </td>

      {/* Expiry Date */}
      <td>
        {expiryDate.toISOString().split("T")[0].split("-").reverse().join("-")}
      </td>

      <td>{item.amount}</td>
      <td>{remainingDays > 0 ? remainingDays : 0}</td>
    </tr>
  );
})

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


{/* Taken Amout List */}

    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 mb-4">

  <h5 className="heading-with-line mb-2 mb-md-0">
    Taken Amount List 
    <hr className="smooth-line" />
  </h5>
  </div>

        <div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Sl No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th className='text-center'>Action</th>
           
          </tr>
        </thead>
    <tbody>
  {loading ? (
    <tr>
      <td colSpan="5" className="text-center py-4">
        <div className="gold-dots-loader">
          <div></div><div></div><div></div>
        </div>
      </td>
    </tr>
  ) : takenData.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-muted py-3">
        No Data Found
      </td>
    </tr>
  ) : (
     takenData.map((item, i) => {

   const parts = item.created_date.split(" ");

   const datePart = parts[0];          // 2025-12-01
   const timeFull = parts[1];          // 2:58:40
   const ampm = parts[2];              // PM

   // Convert 2025-12-01 → 01-12-2025
   const formattedDate = datePart?.split("-").reverse().join("-");

   // Convert 2:58:40 → 2:58
   const shortTime = timeFull.slice(0, 5) + " " + ampm;

   return (
     <tr key={i}>
       <td>{i + 1}</td>
       <td>{formattedDate}</td>
       <td>{shortTime}</td>
       <td>{item.taken_amount}</td>
       <td className="text-center">
         <div className="d-flex justify-content-center gap-2">

           <button
             className="btn-view delete-btn"
             data-tooltip="Delete"
             data-bs-toggle="modal"
             data-bs-target="#takenDelete"
             onClick={() => {
               setInvestorDeleteId(item?.id);
               setIntrestName(item?.name);
             }}
           >
             🗑️
           </button>

         </div>
       </td>
     </tr>
   );
 })

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

        {/* Add investor modal */}

 <div
        className="modal fade"
        id="addinvestor"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
<div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Add Investor
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closedeleteModal"
              ></button>
            </div>

            <div className="modal-body ">
               <div className="row">

          <div className="col-md-6">
            <div className="form-group mt-2">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mt-2">
              <label>Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
                  onClick={(e) => {
        const input = e.currentTarget;
        if (typeof input.showPicker === "function") {
          input.showPicker(); 
        } else {
          input.focus(); 
        }
      }}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mt-2">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                value={form.amount}
                onChange={handleChange}
              />
            </div>
          </div>

       

           {/* <div className="col-md-6">
            <div className="form-group mt-2">
              <label>Interest Rate (%)</label>
              <select
                name="rate"
                className="form-control"
                value={form.rate}
                onChange={handleChange}
              >
                <option value="">Select Rate</option>
                <option value="2">2%</option>
                <option value="2.5">2.5%</option>
                <option value="3">3%</option>
              </select>
            </div>
          </div> */}

             <div className="col-md-6">
            <div className="form-group mt-2">
              <label>Interest</label>
               <input
                type="number"
                name="intrestamount"
                className="form-control"
                value={form.intrestamount}
                onChange={handleChange}
              />
            </div>
          </div>

            <div className="col-md-6">
  <div className="form-group mt-2">
    <label>Pay Method</label>
    <select
      name="payMethod"          
      className="form-control"
      value={form.payMethod}
      onChange={handleChange}
    >
      <option disabled value="">Select Method</option>
      <option value="gpay">GPay</option>
      <option value="phonepe">PhonePe</option>
      <option value="cash">Cash</option>
      <option value="account">Account Number</option>
    </select>
  </div>
</div>


             <div className="col-md-6">
            <div className="form-group mt-2">
              <label>Pay Duration</label>
              <select
                name="payDuration"
                className="form-control"
                value={form.payDuration}
                onChange={handleChange}
              >
                <option disabled value="">Select Duration</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

  {form.payDuration === "Weekly" && (
  <><div className="col-md-6">
                    <div className="form-group mt-2">
                      <label>Select Day</label>
                      <select
                        name="weekDay"
                        className="form-control"
                        value={form.weekDay}
                        onChange={handleChange}
                      >
                        <option disabled value="">Select Day</option>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                  </div><div className="col-md-6">

                    </div></>
)}

  {form.payMethod === "gpay" && (
  <div className="col-md-6 mt-2">
    <div className="form-group">
      <label>GPay Number</label>
      <input
        type="text"
        name="gpayNumber"
        className="form-control"
        placeholder="Enter GPay Number"
        value={form.gpayNumber || ""}
        onChange={handleChange}
      />
    </div>
  </div>
)}

{form.payMethod === "phonepe" && (
  <div className="col-md-6 mt-2">
    <div className="form-group">
      <label>PhonePe Number</label>
      <input
        type="text"
        name="phonePeNumber"
        className="form-control"
        placeholder="Enter PhonePe Number"
        value={form.phonePeNumber || ""}
        onChange={handleChange}
      />
    </div>
  </div>
)}

{form.payMethod === "account" && (
  <>
    <div className="col-md-4 mt-2">
      <div className="form-group">
        <label>Bank Name</label>
        <input
          type="text"
          name="bankName"
          className="form-control"
          placeholder="Enter Account Name"
          value={form.bankName || ""}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="col-md-4 mt-2">
      <div className="form-group">
        <label>IFSC Code</label>
        <input
          type="text"
          name="ifsccode"
          className="form-control"
          placeholder="Enter IFSC code Number"
  value={form.ifsccode || ""}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="col-md-4 mt-2">
      <div className="form-group">
        <label>Account Number</label>
        <input
          type="text"
          name="accountNumber"
          className="form-control"
          placeholder="Enter Account Number"
          value={form.accountNumber || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  </>
)}


    
        </div>
            </div>

            <div className="modal-footer justify-content-center ">
      
            
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
                        <div className='all-btn-color'>
  <button
                type="button"
                className="btn"
                onClick={handleInvestorSubmit}
              >
                Submit
              </button>
                </div>
            </div>
          </div>
        </div>
      </div>



      {/*Investor Delete Modal */}

   <div
        className="modal fade"
        id="investorDelete"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closedeleteModals"
              ></button>
            </div>

            <div className="modal-body text-center">
              Are you sure you want to delete this investor <span className='delete-customer-name'>{intrestName}</span>  ?
            </div>

            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteInvestor}
              >
                Yes, Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>


          {/*Taken Delete Modal */}

   <div
        className="modal fade"
        id="takenDelete"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="takenclosedeleteModal"
              ></button>
            </div>

            <div className="modal-body text-center">
              Are you sure you want to delete this taken ?
            </div>

            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteTaken}
              >
                Yes, Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddInvestor
