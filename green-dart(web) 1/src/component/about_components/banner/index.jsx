import React from "react";
import about from "../../../assets/img/home/page-title-bg.jpg"
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
function AboutBanner() {
    return(
      <>
            <Helmet> <title>About | GreenDart</title> </Helmet>

        <div
            className="page-title dark-background"
            style={{ backgroundImage: `url(${about})`, height: '400px' }}
          >
            <div className="container position-relative">
              <h1>About Us</h1>
              <nav className="breadcrumbs">
                <ol>
                  <li><Link to={'/'}>Home</Link></li>
                  <li className="current">About Us</li>
                </ol>
              </nav>
            </div>
          </div>
      </>

    );
}

export default AboutBanner;