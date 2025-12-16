import React from "react";
import about from "../../../assets/img/home/page-title-bg.jpg"
function GalleryBanner() {
    return(
        <div
            className="page-title dark-background"
            style={{ backgroundImage: `url(${about})`, height: '400px' }}
          >
            <div className="container position-relative">
              <h1>Gallery</h1>
              <nav className="breadcrumbs">
                <ol>
                  <li><a href="/">Home</a></li>
                  <li className="current">Gallery</li>
                </ol>
              </nav>
            </div>
          </div>
    );
}

export default GalleryBanner;