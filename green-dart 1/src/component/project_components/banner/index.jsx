import React from "react";
import service from "../../../assets/img/home/page-title-bg.jpg"

function Project_banner () {
    return(
        <div class="page-title dark-background" style={{ backgroundImage: `url(${service})`, height: '400px' }}>
      <div class="container position-relative">
        <h1>Project</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="/">Home</a></li>
            <li className="current">Project</li>
          </ol>
        </nav>
      </div>
    </div>
    )
}
export default Project_banner;