import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ADMINAPI from '../../../api/services/AdminLogin/adminAPI'
import { environment } from '../../../api/api'


function Adminvendorview() {

  // Vendor Usestate

  const Navigate = useNavigate()

  const [owner,setOwner] = useState('')
  const [shopName,setShopName] = useState()
  const [userName, setuserName] = useState('')
  const [phone, setPhone] = useState('')
  const [shopType,setShowType] = useState('')
  const [password, setPassword] = useState('')
  const [img,setImg]=useState(null)
 const [code,setCode] = useState('')
  const [status,setStatus] = useState('')

    // Useeffect Method

    useEffect(() => {
      const queryParams = window.location.pathname;
      const myArray = queryParams.split("/");
      const vendorId = myArray[2];

      vendorGetMethod(vendorId);
  
     }, []);
  

  
  // Vendor Get Api Method
   const vendorGetMethod = async (vendorId) => {
    // e.preventDefault();

   console.log(vendorId,"sss")

    try {
      const response = await ADMINAPI.adminVendorGet(vendorId);
        if (!response || !response.result || !response.result.VendorData) {
            throw new Error("Invalid response data");
        }

        // Extract the client data
        const dat = response.result.VendorData;
        console.log(dat, "dat");

     setOwner(dat.shop_owner)
      setShopName(dat.shop_name)
      setuserName(dat.username)
      setPhone(dat.contact)
      setShowType(dat.shop_type)
      setImg(dat.avatar)
      setStatus(dat.status)
      setCode(dat.code)

    } catch (error) {
        console.log("Error handled =", error);
    }
    
  };

  return (
    <div>
          <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-6 mx-auto">
              <div  style={{padding:'50px'}} className="auth-form-light text-left ">
              <p className='ordername'>Vendor View Details</p>
                <div className='row'>
                    <div style={{paddingBottom:'35px'}} className='col-md-12 text-center'>
                            <img  className='chicken-img ' src={`${environment.baseURL}${img}`} alt="" />

                    </div>
                    <div className='col-md-6 '>
                    <h4 className='order-list'>Shop Name</h4>
                    <h6 className='order-value'>{owner}</h6>
                    <h4 className='order-list'>Shop Owner</h4>
                    <h6 className='order-value'>{shopName}</h6>
                    </div>
                    <div className='col-md-6'>
                    <h4 className='order-list'>Shop Type</h4>
                    <h6 className='order-value'>{shopType}</h6>
                    <h4 className='order-list'>Contact</h4>
                    <h6 className='order-value'>{phone}</h6>
                    </div>
                        <div className='col-md-6'>
                            <h4 className='order-list'>User Name</h4>
                            <h6 className='order-value'>{userName}</h6>
                        </div>
                        <div className='col-md-6'>
                            <h4 className='order-list'>Code</h4>
                            <h6 className='order-value'>{code}</h6>
                        </div>
                </div>
               
             
              
                   
                  
                   
                    <h4 className='order-list'>Status</h4>
                    <div 
     className={`badge badges ${
       status === "Active" 
             ? "badge-success" 
             : status === "Inactive" 
             ? "badge-danger" 
             : status === "Pending" 
             ? "badge-secondary"
             : "badge-warning"
     }`}
 >
     {status}
 </div>

      
            
<div >
<button style={{marginTop:'10px'}} onClick={()=>Navigate('/adminvendorlist')} className='btn view-close btn-gradient-primary me-2'>Close</button>

</div>
                
              </div>
            </div>
          </div>
        </div>
        {/* <!-- content-wrapper ends --> */}
      </div>
    </div>
  )
}

export default Adminvendorview
