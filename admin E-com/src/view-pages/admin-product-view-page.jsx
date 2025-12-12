import React, { useEffect, useState } from 'react'
import { adminProductView } from '../services/api-services';
import { environment } from '../environments/enviornments';
import { useNavigate } from 'react-router-dom';

function Adminproductview() {

    // View Usestate
    const [products, setProducts] = useState();
    const [vendor,setVendor] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [catagory,setCatagory] = useState('')
    const [status,setStatus] = useState('')
    const [img,setImg] = useState('')

    const navigate = useNavigate('')

    useEffect(()=>{
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        const productId = myArray[2];
        // setUserId(productId);
        productGetMethod(productId)
    },[])

    // Admin Product View

    
    const productGetMethod = async (productId) => {
        try {
            // Call the clientGet function with the clientId
            const response = await adminProductView(productId);
    
            // Check if the response has a valid JSON structure
            if (!response || !response.result || !response.result.ProductList) {
                throw new Error("Invalid response data");
            }
    
            // Extract the client data
            const dat = response.result.ProductList;
            console.log(dat, "dat");
    
           setProducts(dat.name)
           setVendor(`${dat.code} - ${dat.name}`)
           setPrice(dat.price)
           setDescription(dat.description)
           setCatagory(dat.CategoryName)
           setImg(dat.image_path)
           setStatus(dat.status)
          
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
                <div className='row'>
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

export default Adminproductview
