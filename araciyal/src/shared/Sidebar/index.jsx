import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';

function Sidenav() {
    const location = useLocation(); 
    const isNewsActive = ["/tamilnaduNews-list/3", "/IndiaNews-list/4", "/Worldnews-list/1", "/MalysiaNews-list/6", "/sportsnews-list/5",
        "/Worldnews/create","/tamilnaduNews/create","/Worldnews/create","/Sportsnews/create","/IndiaNews/create"
    ].includes(location.pathname);


    return (
        <div>
            <div className="container-fluid page-body-wrapper">
                <nav style={{ paddingTop: "80px" }} className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav mt-4">
                        <li className={`nav-item ${location.pathname === "/admin-dashboard" ? "active" : ""}`}>
                            <Link to="/admin-dashboard" className="nav-link" >
                            <i className="nav-icon fas fa-tachometer-alt menu-icon"></i> <span className="menu-title">Dashboard</span>
                            </Link>
                        </li>

                        <li className={`nav-item ${isNewsActive ? "active" : ""}`}>
                            <a class="nav-link" data-bs-toggle="collapse" href="#maintenanceModule" aria-expanded={isNewsActive ? "true" : "false"} aria-controls="maintenanceModule">
                            <i className="nav-icon fas fa-boxes menu-icon"></i>
                                <span class="menu-title">News <i class="menu-arrow"></i></span>
                            </a>
                            <div class="collapse" id="maintenanceModule">
                                <ul class="av flex-column sub-menu sidebar-ul">
                                    <li className={`nav-item p-0 ${location.pathname === "/tamilnaduNews-list/3" ? "active" : ""}`}>
                                        <Link to={'/tamilnaduNews-list/3'} className="nav-link nav2" >
                                        <i class="fa-solid fa-gopuram menu-icon"></i> <span clspanss="nav-link" href="#"> Tamilnadu News </span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item small-margin-check p-0 ${location.pathname === "/IndiaNews-list/4" ? "active" : ""}`}>
                                        <Link to={'/IndiaNews-list/4'} className="nav-link nav2" >
                                        <i class="fa-solid fa-landmark-dome menu-icon"></i> <span clspanss="nav-link" href="#">India News </span>
                                        </Link>
                                    </li>

                                    <li className={`nav-item p-0 small-margin-check ${location.pathname === "/Worldnews-list/1" ? "active" : ""}`}>
                                        <Link to={'/Worldnews-list/1'} className="nav-link nav2" >
                                        <i class="fa-solid fa-earth-americas menu-icon"></i> <span clspanss="nav-link" href="#">World News</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item p-0 small-margin-check ${location.pathname === "/MalysiaNews-list/6" ? "active" : ""}`}>
                                        <Link to={'/MalysiaNews-list/6'} className="nav-link nav2" >
                                        <i class="fa-solid fa-archway menu-icon"></i> <span clspanss="nav-link" href="#">Malaysia News</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item p-0 small-margin-check ${location.pathname === "/sportsnews-list/5" ? "active" : ""}`}>
                                        <Link to={'/sportsnews-list/5'} className="nav-link nav2" >
                                        <i class="fa-solid fa-broom-ball menu-icon"></i> <span clspanss="nav-link" href="#">Sports News</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={`nav-item ${location.pathname === "/VideoList" ? "active" : ""}`}>
                            <Link to="/VideoList" className="nav-link" >
                            <i class="fa-regular fa-circle-play menu-icon"></i> <span className="menu-title">Videos</span>
                                {/* <i className="nav-icon fas fa-boxes menu-icon"></i> */}
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/ImageGallery" ? "active" : ""}`}>
                            <Link to="/ImageGallery" className="nav-link" >
                            <i class="fa-regular fa-image menu-icon"></i> <span className="menu-title">Image Gallery </span>
                                
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/ContactUs" ? "active" : ""}`}>
                            <Link to="/ContactUs" className="nav-link" >
                            <i class="mdi mdi-contacts menu-icon"></i> <span className="menu-title">Contact Us</span>
                                
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidenav;