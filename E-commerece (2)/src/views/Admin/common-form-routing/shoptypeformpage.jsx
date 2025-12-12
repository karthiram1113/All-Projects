import React, { useEffect, useState } from 'react'
import Navbar from '../../../shared/admin/Navbar/navbar'
import Sidenav from '../../../shared/admin/Sidenav/sidenav'
import Shoptypeform from '../forms/shoptype-list/shoptypeform'
import { Link } from 'react-router-dom'
import Footer from '../../../shared/footer'

function Shoptypeformpage() {

  // Navigate

  const Navigate = useState('')
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

      <div className="container-fluid page-body-wrapper">

        <Sidenav />

        <div style={{ paddingTop: "80px" }} className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fa-solid fa-shop menu-icon"></i>
                </span> Shoptypelist {urlName} Form
              </h3>
              {/* {urlName == "Create" ? <div style={{ textAlign: "right" }}>
                <Link
                  to={"/adminshoplist"}
                  style={{
                    float: "right",
                    // marginBottom: "15px",
                    backgroundColor: "#9a55ff",
                  }}
                  type="button"
                  class="btn btn-primary"
                >
                  Back
                </Link>
              </div> : <div style={{ textAlign: "right" }}>
                <Link
                  to={"/adminshoplist"}
                  style={{
                    float: "right",
                    // marginBottom: "15px",
                    backgroundColor: "#9a55ff"
                    // marginTop: "10px",
                  }}
                  type="button"
                  class="btn btn-primary"
                >
                  Back
                </Link>
              </div>} */}

            </div>



            {/* Vendor Form */}

            <Shoptypeform />

          </div>
          <Footer />

        </div>

      </div>
    </div>
  )
}

export default Shoptypeformpage
