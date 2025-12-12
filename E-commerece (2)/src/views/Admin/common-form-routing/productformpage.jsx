import React, { useEffect, useState } from 'react'
import Navbar from '../../../shared/admin/Navbar/navbar'
import Sidenav from '../../../shared/admin/Sidenav/sidenav'
import { Link } from 'react-router-dom'
import Productform from '../forms/product-list/productform'



function Productformpage() {

      const [urlName, setUrlName] = useState('')
  
  
      // Useeffect Method
  
      useEffect(() => {
  
          const queryParams = window.location.pathname;
          const myArray = queryParams.split("/");
          setUrlName(myArray[2])
  
      }, []);
  return (
    <div>
      <Navbar />
   
      {/* Vendor Form */}

      <div  className="container-fluid page-body-wrapper">

      <Sidenav />

      <div style={{paddingTop:"80px"}} className="main-panel">
      <div className="content-wrapper">
      <div className="page-header">
      <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fas fa-boxes menu-icon"></i>
                </span> {urlName === "Create" ? 'Add Product' : 'Edi Product'}
      </h3>
     
      <div style={{textAlign:"right"}}>
            <Link
                  to={"/adminproductlist"}
                style={{
                  float: "right",
                  // marginBottom: "15px",
                  border:"1px solid",
                  backgroundColor:"linear-gradient(to right, #da8cff, #9a55ff)",
                }}
                type="button"
                class="btn btn-primary"
              >
                Back
              </Link>
            </div>
    </div>

    {/* Vendor Form */}
    <Productform />

      </div>
      </div>

</div>


     
    </div>
  )
}

export default Productformpage
