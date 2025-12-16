import React from "react";
import Contact from "../../../assets/img/home/page-title-bg.jpg"

function Contact_banner(){
    return(
        <div className="page-title dark-background" style={{ backgroundImage: `url(${Contact})`, height: '400px' }}>
      <div className="container position-relative">
        <h1>Contact</h1>
        <nav className="breadcrumbs">
          <ol>
            <li><a href="/">Home</a></li>
            <li className="current">Contact</li>
          </ol>
        </nav>
      </div>
    </div>
    )
}
export default Contact_banner;