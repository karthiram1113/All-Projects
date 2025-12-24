import React from "react";
import Contact from "../../../assets/img/home/page-title-bg.jpg"
import { Helmet } from "react-helmet";

function Contact_banner(){
    return(
      <>
            <Helmet> <title>Contact | GreenDart</title> </Helmet>
        <div className="page-title dark-background" style={{ backgroundImage: `url(${Contact})`, height: '400px' }}>
      <div className="container position-relative">
        <h1>Contact Us</h1>
        <nav className="breadcrumbs">
          <ol>
            <li><a href="/">Home</a></li>
            <li className="current">Contact Us</li>
          </ol>
        </nav>
      </div>
    </div>
      </>

    )
}
export default Contact_banner;