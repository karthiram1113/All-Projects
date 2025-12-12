import React, { useEffect, useRef, useState } from 'react'
import Navbars from '../../common/Navbar'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import Noimage from '../../assets/img/femal.png'
import superAdminApis from '../../api/services/admin-pages/superAdmin'
import { toast } from 'react-toastify'
import { baseURL } from '../../api/api'
import { Modal } from 'bootstrap'


import AOS from "aos";
import "aos/dist/aos.css";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


function CustomerDetailsList({ customerList, setCustomerList }) {  


      useEffect(() => {
            AOS.init({
              duration: 1000,  
              once: false,    
              mirror: true,    
            });
          }, []);
  
  
    const navigate = useNavigate()

  const [phone, setPhone] = useState("");
  const [submit, setSubmit] = useState(false);
  const [customerDeleteId,setCustomerDeleteId] = useState("")
  const [customerName,setCustomerName] = useState("")


     const baseUrl = baseURL

      // const [customerList,setCustomerList] = useState([])
   const [loading ,setLoading] = useState(false)
       const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
const [userDeleteId, setUserDeleteId] = useState("");
       const [userName,setUserName] = useState('')

    const handleAddCustomer = () => {
    navigate('/customer-details') 
  }

  const [searchTerm, setSearchTerm] = useState("");




 const loginModalRef = useRef(null);
   const existingModalRef = useRef(null);


  // open main login modal
  const openLoginModal = () => {
    const modal = new window.bootstrap.Modal(loginModalRef.current);
    modal.show();
  };


   // open existing customer modal
  const openExistingCustomerModal = () => {
    const modal = new window.bootstrap.Modal(existingModalRef.current);
    modal.show();
  };

    const handleNewCustomer = () => {
    const modal = window.bootstrap.Modal.getInstance(loginModalRef.current);
    modal.hide(); // close main modal
    navigate("/customer-details/create");
  };

const handleExistingLogin = async () => {
  setSubmit(true);

  const phoneRegex = /^[6-9]\d{9}$/;

  // Validation
  if (!phone.trim()) return; // required
  if (!phoneRegex.test(phone)) return; // invalid format

  setLoading(true);

  const apiData = { phoneNo: phone };

  try {
    const responseData = await superAdminApis.customerPhoneLoginAPI(apiData);

    if (responseData.apiStatus?.code === "200") {
      const customerData = responseData.result;
      toast.success(responseData.apiStatus.message || "Login successful!");
      document.getElementById("closeModal")?.click();
      navigate("/customer-details/create", { state: { customer: customerData } });
    } else {
      toast.error(responseData.apiStatus?.message || "Login failed!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("An error occurred during login.");
  } finally {
    setLoading(false);
  }
};



useEffect(() => {
handleUserList(currentPage)
}, [currentPage,searchTerm]);


const handleUserList = (page) => {
  setLoading(true);

  const apiData = {
    pageIndex: page - 1,
    dataLength: recordsPerPage,
    searchName:searchTerm
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



// Customer Delete


   const handleDeleteCustomer = () => {
         superAdminApis.customerDetailsDeleteAPI(customerDeleteId)
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
                  const closeButton = document.getElementById("closedeleteModal");
                  if (closeButton) {
                     handleUserList(currentPage);
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

  const totalPages = Math.ceil(totalRecords / recordsPerPage);


  const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) return; 
  setCurrentPage(page);
};





  return (
    <div>
      <Navbars />

      <div className="container all-modules-height card p-3">


       <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-4">
  <h5 className="heading-with-line mb-2 mb-md-0 aquanew-text-effect">
    Customer Details List 
    <hr className="smooth-line" />
  </h5>


  {/* <div className="aquanew-text-effect">
      Monthly Web Hosting Plans
    </div> */}

  <div className="search-container mx-auto mb-2 mb-md-0">
    <input
      type="text"
      className="form-control search-input"
      placeholder="Search customers loan id ..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="d-flex gap-2">

     <button className="btn add-customer" onClick={openLoginModal}>
            <i className="fa fa-sign-in me-2"></i>Customer Login
          </button>

          {/* <button className="btn add-customer" onClick={handleAddCustomer}>
            <i className="fa fa-plus me-2"></i> Add Customer
          </button> */}

         
        </div>
</div>

        {/* Table Section */}
      <div className="mt-4">
  <table className="table table-striped table-bordered" data-aos="fade-up">
    <thead className="table-light">
      <tr>
        <th>Sl No</th>
        <th>Loan Id</th>

        <th>Image</th>
        <th>Name</th>
        <th>Date</th>

        <th>Loan Amount</th>
        <th>Interest (%)</th>
        {/* <th>Duration</th> */}
        {/* <th>Total Interest</th> */}
        <th>Remaining Amount</th>
        <th className='text-center'>Status</th>

        <th className='text-center'>Actions</th>
      </tr>
    </thead>

<tbody>
  {loading ? (
    <tr>
      <td colSpan="10" className="text-center">
        <div className="gold-dots-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </td>
    </tr>
  ) : customerList && customerList.length > 0 ? (
    customerList.map((customer, index) => (
      <tr className='customer-table-td' key={customer?.id}>
        <td>{index + 1}</td>
        <td>{customer?.loan_id || "-"}</td>
 
        <td>
          <img
            src={
              customer?.liveImage?.altered_file_name
                ? `${baseURL}${customer.liveImage.path}${customer.liveImage.altered_file_name}`
                : Noimage
            }
            alt={customer?.name}
            className="round-image"
          />
        </td>
 
        <td>{customer?.name}</td>
                      <td>
  {customer.date 
    ? customer.date.split(" ")[0].split("-").reverse().join("-")
    : "-"
  }
</td>
        <td>₹{customer?.loan_amount}</td>
        <td>{customer?.intrest_rate}</td>
        {/* <td>
          {customer?.duration} {customer?.duration_type}
        </td> */}
        {/* <td>₹{customer?.intrest_amount  }</td> */}
        <td>₹{customer?.balance||0}</td>
      <td className="text-center align-middle">
  {customer?.paid_status === "Closed" ? (
    <span className="badge bg-danger">Closed</span>
  ) : (
    <span className="badge bg-success">Active</span>
  )}
</td>



<td className="text-centers align-items-center" style={{width:'10rem'}}>
  <div className="action-buttons-wrapper">
    <div className="action-buttons">
      <Link
        to={`/customer-view/${customer?.id}`}
        className="btn-view view-btn"
        data-tooltip="View"
      >
        👁️
      </Link>

      <Link
        to={`/customer-details/edit/${customer?.id}`}
        className="btn-view edit-btn"
        data-tooltip="Edit"
      >
        ✏️
      </Link>

      <Link
        to={`/customer-pay/${customer?.id}`}
        className="btn-view pay-btn"
        data-tooltip="Pay"
      >
        💰
      </Link>
    </div>

    <Link
      to=''
      className="btn-view delete-btn"
      data-tooltip="Delete"
      data-bs-toggle="modal"
      data-bs-target="#customerDelete"
      onClick={()=>{setCustomerDeleteId(customer?.id);setCustomerName(customer?.name)}}
    >
      🗑️
    </Link>

    {/* <button
  className="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#reportModal"
>
  View Loan Report
</button> */}


  </div>
</td>



      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="10" className="text-center">
        No records found
      </td>
    </tr>
  )}
</tbody>


  </table>
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



 {/* 🔹 Main Login Modal */}

      <div
        className="modal fade"
        tabIndex="-1"
        ref={loginModalRef}
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login Options
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center">
              <p>Select a customer type:</p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button
                  type="button"
                  className="btn handleNewCustomer"
                  onClick={handleNewCustomer}
                >
                  New Customer
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    const modal =
                      window.bootstrap.Modal.getInstance(loginModalRef.current);
                    modal.hide(); // hide first modal
                    openExistingCustomerModal(); // show next one
                  }}
                >
                  Existing Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* 🔹 Existing Customer Login Modal */}

<div
  className="modal fade"
  tabIndex="-1"
  ref={existingModalRef}
  aria-labelledby="existingCustomerLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="existingCustomerLabel">
          Existing Customer Login
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            setSubmit(false); // reset validation when closing
            setPhone("");
            window.bootstrap.Modal.getInstance(existingModalRef.current)?.hide();
          }}
          aria-label="Close"
          id="closeModal"
        >

          
        </button>
      </div>

      <div className="modal-body">
     <div className="mb-3">
  <label htmlFor="phoneNumber" className="form-label required-star">
    Phone Number
  </label>
 <input
  type="tel"
  id="phoneNumber"
  className="form-control"
  placeholder="Enter phone number"
  value={phone}
  maxLength="10"
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPhone(value);
  }}
  style={
    (submit && phone.length === 0) || 
    (phone.length > 0 && !/^[6-9]\d{9}$/.test(phone))
      ? { borderColor: "red" }
      : {}
  }
/>

{/* Error messages */}
{submit && phone.length === 0 && (
  <div className="text-danger">Phone number is required</div>
)}

{phone.length > 0 && phone.length < 10 && (
  <div className="text-danger">Phone number must be 10 digits</div>
)}

{phone.length === 10 && !/^[6-9]/.test(phone) && (
  <div className="text-danger">Phone number should start with 6–9</div>
)}

</div>



        <div className="text-center">
          <button
            type="button"
            className="btn add-customer"
            onClick={handleExistingLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</div>








{/* Delete Modal */}

   <div
        className="modal fade"
        id="customerDelete"
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
                id="closedeleteModal"
              ></button>
            </div>

            <div className="modal-body text-center">
              Are you sure you want to delete this customer <span className='delete-customer-name'>{customerName}</span>  ?
            </div>

            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteCustomer}
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

export default CustomerDetailsList
