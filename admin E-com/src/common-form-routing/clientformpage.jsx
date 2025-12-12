import React, { useEffect, useState } from 'react'
import Sidenav from '../Common/Sidenav/sidenav'
import  Navbar  from '../Common/Navbar/navbar'
import Vendorform from '../forms/vendorList/vendorform'
import Clientforms from '../forms/clientList/clientforms'
import { Link } from 'react-router-dom'

function Clientformpage() {

    // Edit or Create Name Showed
    const [editOrCreate, setEditOrCreate] = useState('')

    useEffect(()=>{
      const queryParams = window.location.pathname;
      const myArray = queryParams.split("/");
      setEditOrCreate(myArray[2])
    })

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
     </span> Client {editOrCreate} Form
   </h3>

   <div style={{textAlign:"right"}}>
            <Link
                to={"/Client-list"}
                style={{
                  float: "right",
                  marginBottom: "15px",
                  backgroundColor:"#9a55ff",
                }}
                type="button"
                class="btn btn-primary"
              >
                Back
              </Link>
            </div>

 </div>

 {/* Vendor Form */}

 <Clientforms />

   </div>
   </div>

</div>
    </div>
  )
}

export default Clientformpage
