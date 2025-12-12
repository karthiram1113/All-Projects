import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ADMINAPI from '../../../api/services/AdminLogin/adminAPI'
import { environment } from '../../../api/api'


function AdminUserview() {

  // Vendor Usestate

  const Navigate = useNavigate()

  const [logtype,setLogType] = useState('')
  const [shopName,setShopName] = useState()
  const [lastname,setLastName] = useState()
  const [firstname,setFirstName] = useState()
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


    try {
      const response = await ADMINAPI.adminUserView(vendorId);
        const dat = response.result.AdminData;
        console.log(dat, "dat");

      setFirstName(dat.firstname)
      setLastName(dat.lastname)
      setuserName(dat.username)
      setPassword(dat.password)
      setLogType(dat.type)
      setImg(dat.avatar)

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
              <p className='ordername'>User View Details</p>
                <div className='row'>
                    <div style={{paddingBottom:'35px'}} className='col-md-12 text-center'>
                            <img  className='chicken-img ' src={`${environment.baseURL}${img}`} alt="" />

                    </div>
                    <div className='col-md-6 '>
                    <h4 className='order-list'>first Name</h4>
                    <h6 className='order-value'>{firstname}</h6>
                    <h4 className='order-list'>Login Type</h4>
                    <h6 className='order-value'>{logtype}</h6>
                    </div>
                    <div className='col-md-6'>
                    <h4 className='order-list'>Last Name</h4>
                    <h6 className='order-value'>{lastname}</h6>
                    <h4 className='order-list'>User Name</h4>
                    <h6 className='order-value'>{userName}</h6>
                    </div>
                        {/* <div className='col-md-12'>
                            <h4 className='order-list'>Password</h4>
                            <h6 className='order-value'>{password}</h6>
                        </div> */}
                </div>
               
             
              
                   
                  
                   
                    


      
            
<div >
<button style={{marginTop:'10px'}} onClick={()=>Navigate('/adminuserlist')} className='btn view-close btn-gradient-primary me-2'>Close</button>

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

export default AdminUserview
