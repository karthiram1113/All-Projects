import React from 'react'
import Navbar from '../../../shared/admin/Navbar/navbar'
import Sidenav from '../../../shared/admin/Sidenav/sidenav'
import { Link } from 'react-router-dom'
import Settingform from '../forms/settings/settingform'
import Footer from '../../../shared/footer'

function Settingformpage() {
  return (
    <div>
       <Navbar />

{/* User Form */}

<div className="container-fluid page-body-wrapper">

    <Sidenav />

    <div style={{ paddingTop: "80px" }} className="main-panel">
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="nav-icon fas fa-cogs menu-icon"></i>
                    </span> Setting Form
                </h3>
                {/* <div style={{ textAlign: "right" }}>
                    <Link
                        to={"/"}
                        style={{
                            float: "right",
                            marginBottom: "15px",
                            backgroundColor: "#9a55ff",
                        }}
                        type="button"
                        class="btn btn-primary"
                    >
                        Back
                    </Link>
                </div>  */}

            </div>



            {/* User Form */}

            <Settingform />

        </div>
                  <Footer />

    </div>

</div>
    </div>
  )
}

export default Settingformpage
