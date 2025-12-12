import React from 'react'
import Navbar from '../Navbar/navbar'
import Sidenav from '../Sidenav/sidenav'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Vendorform from '../forms/vendorList/vendorform'



function Vendorformpage() {
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
        <i className="nav-icon fas fa-users menu-icon"></i>
        </span> Vendor Edit Form
      </h3>
     
      <div style={{textAlign:"right"}}>
            <Link
                to={"/adminvendorlist"}
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
    <Vendorform />

      </div>
      </div>

</div>


     
    </div>
  )
}

export default Vendorformpage
