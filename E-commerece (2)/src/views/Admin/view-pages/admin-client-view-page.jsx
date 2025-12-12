import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { environment } from '../environments/enviornments';
import { adminProductView, clientGet, userGet } from '../services/api-services';

function Adminclientview() {

     // View Usestate
     const [clientId,setClientId] = useState('')
     const [firstName,setFirstName] = useState('')
     const [middleName,setMiddleName] = useState()
     const [lastName, setLastName] = useState('')
     const [gender, setGender] = useState('')
     const [contact,setContact] = useState('')
     const [address, setAddress] = useState('')
     const [email,setEmail] = useState('')
     const [status, setStatus] = useState('')
     const [password, setPassword] = useState('') 
     const [confirmPassword, setConfirmPassword] = useState('')
     // const [cureshopAddress, setShopAddress] = useState('')
     const [avatar,setAvatar] = useState(null)
   const [list, setListClient] = useState('');
 
     const navigate = useNavigate('')
 
     useEffect(()=>{
         const queryParams = window.location.pathname;
         const myArray = queryParams.split("/");
         const clientId = myArray[2];
       setListClient(clientId);
        clientGetMethod(clientId)
     },[])
 
     // Admin Product View
 
     
     const clientGetMethod = async (clientId) => {
         try {
             // Call the clientGet function with the clientId
             const response = await clientGet(clientId);
           if (response.apiStatus.code !== "200") {
             setListClient(null);
             return;
           }
             // Check if the response has a valid JSON structure
             if (!response || !response.result || !response.result.ClientData) {
                 throw new Error("Invalid response data");
             }
           setListClient(response.result.ClientData)
             // Extract the client data
             const dat = response.result.ClientData;
             console.log(dat, "dat");
     
             setFirstName(dat.firstname);
             setMiddleName(dat.middlename);
             setLastName(dat.lastname);
             setGender(dat.gender);
             setContact(dat.contact);
             setAddress(dat.address);
             setEmail(dat.email);
             setPassword(dat.password);
             setConfirmPassword(dat.password);
             setAvatar(dat.avatar);
             setClientId(dat.id);
           
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
              <p className='ordername'>Product View Details</p>
                {/* <div className='row'>
                    <div style={{paddingBottom:'35px'}} className='col-md-12 text-center'>
                            <img  className='chicken-img ' src={`${environment.apiBaseUrl}${img}`} alt="" />

                    </div>
                    <div className='col-md-6'>
                    <h4 className='order-list'>Vendor</h4>
                    <h6 className='order-value'>{vendor}</h6>
                    <h4 className='order-list'>Price</h4>
                    <h6 className='order-value'>{price}</h6>
                    </div>
                    <div className='col-md-6'>
                    <h4 className='order-list'>Catagory</h4>
                    <h6 className='order-value'>{catagory}</h6>
                    <h4 className='order-list'>Product</h4>
                    <h6 className='order-value'>{products}</h6>
                    </div>
                        <div className='col-md-12'>
                            <h4 className='order-list'>Description</h4>
                            <h6 className='order-value'>{description}</h6>
                        </div>
                </div> */}
               
             
              
                   
                  
                   
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
<button style={{marginTop:'10px'}} onClick={()=>navigate('/Product-list')} className='btn view-close btn-gradient-primary me-2'>Close</button>

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

export default Adminclientview
