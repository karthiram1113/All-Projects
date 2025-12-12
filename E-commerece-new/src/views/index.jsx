import React from "react";
import Navbar from "../shared/navbar";
import Sidenav from "../shared/sidenav";
import Footer from "../shared/footer";


function IndexLayout({ children }) {
  return(
 <>
          <Navbar />
          <div className="container-fluid page-body-wrapper">
              <Sidenav />
              <div className="main-panel" style={{ paddingTop: "80px" }} >
                {children}
                  <Footer />
                  </div>
          </div>
 
 </>
        

  )
}
export default IndexLayout;