import React from 'react'
import Navbar from '../Navbar/navbar'
import Sidenav from '../Sidenav/sidenav'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Productform from '../forms/productList/productform'



function ProductFormPage() {
  return (
    <div>
      <Navbar />
   
      {/* product Form */}

      <div  className="container-fluid page-body-wrapper">

      <Sidenav />

      <div style={{paddingTop:"80px"}} className="main-panel">
      <div className="content-wrapper">
      <div className="page-header">
      <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i class="fa-solid fa-store"></i>
        </span> Product Edit Form
      </h3>
     
      <div style={{textAlign:"right"}}>
            <Link
                  to={"/adminproductlist"}
                style={{
                  float: "right",
                  marginBottom: "15px",
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

export default ProductFormPage
