import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import ADMINAPI from '../../../api/services/AdminLogin/adminAPI';
import { environment } from '../../../api/api';

function Adminorderview() {

        // View Usestate
        const [reference, setReference] = useState();
        const [vendor,setVendor] = useState('')
        const [client,setClient] = useState('')
        const [address,setAddress] = useState('')
        const [status,setStatus] = useState('')
        const [img,setImg] = useState(null)
        const [price,setPrice] = useState('')
        const [quantity,setQuantity] = useState('')
        const [amount,setAmount] = useState('')
        const [cName,setCName] = useState('')

        const navigate = useNavigate('')
    
        useEffect(()=>{
            const queryParams = window.location.pathname;
            const myArray = queryParams.split("/");
            const orderId = myArray[2];
            // setUserId(productId);
            orderGetMethod(orderId)
        },[])
    

    // Order Product View
  
    // const orderGetMethod = async (orderId) => {
    //     try {
    //         // Call the clientGet function with the clientId
    //         const response = await adminOrderView(orderId);
    
    //         // Check if the response has a valid JSON structure
    //         if (!response || !response.result || !response.result.OrderData) {
    //             throw new Error("Invalid response data");
    //         }
    
    //         // Extract the client data
    //         const dat = response.result.OrderData;
    //         const dat1 = response.result.OrderData.products 
    //         console.log(dat, "dat");
    //         console.log(environment.apiBaseUrl,'url');
            
    //        setReference(dat.refernce_code)
    //        setClient(`${dat.clientRefercode} - ${dat.firstname}, ${dat.lastname}`);

    //        setVendor(`${dat.ShopRefercode} -${dat.Shop_name}`)
    //        setAddress(dat.DeliveryAddress)      
    //        setStatus(dat.status)
    //        setAmount(dat.total_amount)
    //        setImg(dat1.map((data)=>(data.image)))
    //        setPrice(dat1.map((data)=>(data.price)))
    //        setQuantity(dat1.map((data)=>(data.quantity)))
    //        setCName(dat1.map((data)=>(data.name)))
            
          
    //     } catch (error) {
    //         console.log("Error handled =", error);
    //     }
    // };

       const orderGetMethod = async (orderId) => {
    // e.preventDefault();

   console.log(orderId,"fins")

    try {
      const response = await ADMINAPI.adminOrderGet(orderId);
      if (!response || !response.result || !response.result.OrderData) {
                 throw new Error("Invalid response data");
             }
    
              // Extract the client data
             const dat = response.result.OrderData;
             const dat1 = response.result.OrderData.products 
             console.log(dat, "dat");
             console.log(environment.apiBaseUrl,'url');
            
            setReference(dat.refernce_code)
            setClient(`${dat.clientRefercode} - ${dat.firstname}, ${dat.lastname}`);

            setVendor(`${dat.ShopRefercode} -${dat.Shop_name}`)
            setAddress(dat.DeliveryAddress)      
            setStatus(dat.status)
            setAmount(dat.total_amount)
            setImg(dat1.map((data)=>(data.image)))
            setPrice(dat1.map((data)=>(data.price)))
            setQuantity(dat1.map((data)=>(data.quantity)))
            setCName(dat1.map((data)=>(data.name)))
            
          
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
              <div style={{padding:'50px'}} className="auth-form-light">
               <p className='ordername'>Order View Details</p>

<div className='row'>
  <div className='col-md-6 '>
  <h4 className='order-list'>Reference Code</h4>
  <h6 className='order-value'>{reference}</h6>
  <h4 className='order-list'>Client</h4>
  <h6 className='order-value'>{client}</h6>
  </div>
  <div className='col-md-6'>
  <h4 className='order-list'>Vendor</h4>
                    <h6 className='order-value'>{vendor}</h6>
                    <h4 className='order-list'>Delivery Address</h4>
                    <h6 className='order-value'>{address}</h6>
  </div>

</div>

              
                  
                  
                   
                    <h4 className='order-list'>Status</h4>
                    {/* <h6>{status}</h6> */}

                    <div
  className={`badge ${
  status === "Active"
      ? "badge-success"
      : status === "Inactive" || status === "Cancelled"
      ? "badge-danger"
      : status === "Out of Delivery"
      ? "badge-warning"
      : status === "Delivered"
      ? "badge-dark"
      : status === "Pending"
      ? "badge-pending"
      : status === "Packed"
      ? "badge-packed"
      : status === "Confirmed"
      ? "badge-confirmed"
      : ""
  }`}
  style={
    status === "Active"
      ? { backgroundColor: "green" }
      : status === "Inactive" || status === "Cancelled"
      ? { backgroundColor: "red" }
      : status === "Out of Delivery"
      ? { backgroundColor: "yellow" }
      : status === "Delivered"
      ? { backgroundColor: "black" }
      : status === "Pending"
      ? { backgroundColor: "orange" }
      : status === "Packed"
      ? { backgroundColor: "violet" }
      : status === "Confirmed"
      ? { backgroundColor: "blue" }
      : {}
  }
>
  {status}
</div>
  
            
                <div style={{paddingTop:"30px"}} className='row text-center'>
                <div className='col-md-6'>
                <h4>{cName}</h4>
                <p className='chicken-price'>Price  :  {price}</p>
               
                <p className='chicken-price'>Quantity :     {quantity}</p>
                <p>Total : {amount}</p>
            
              </div>
              <div className='col-md-6'>
              <img className='chicken-img' src={`${environment.baseURL}${img}`} alt="" />
                </div>
                </div>

                <button onClick={()=>navigate('/adminorderlist')} className='btn view-close btn-gradient-primary me-2'>Close</button>

              </div>
 
           

            </div>
          </div>
        </div>
      
      </div>


    </div>
  )
}

export default Adminorderview
