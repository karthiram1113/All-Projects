
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
function SidenavUser() {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const location = useLocation();

    const Navigate = useNavigate()

    let token = localStorage.getItem("token");
   
    if(!token||token==null){
      Navigate("/UserLogin")
    }
  
    useEffect(() => {
      // Check if the current path matches any of the submenu items
      if (
        location.pathname.includes('/superdashboard') ||
        location.pathname.includes('/Tenent')
      ) {
        setIsSubmenuOpen(true);
      }
    }, [location.pathname]);
  
    const toggleSubmenu = () => {
      setIsSubmenuOpen(!isSubmenuOpen);
    };
  
  return (
    <div>
        <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
            <Link to="/UserDashboard" className={`nav-link  ${location.pathname === '/UserDashboard' ? 'active' : 'collapsed'}`}>
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
           <li className="nav-item">
                  <Link
              to="/UserDomain"
              className={`nav-link ${location.pathname.includes('/UserDomain') ? 'active' : 'collapsed'}`}
              // className={`nav-link  ${location.pathname === '' ? 'active' : 'collapsed'}`}
                  >
              <i className="fa-solid fa-user"></i>
                    Domain
                  </Link>
                </li>
                <li className="nav-item">
                                  <Link
                                    to="/UserHosting"
                                className={`nav-link  ${location.pathname.includes('/UserHosting') ? 'active' : 'collapsed'}`}
                                  >
              <i className="fa-solid fa-cloud"></i>
                                <span>Hosting</span> 
                                  </Link>
                                </li>
                
        </ul> 
        </aside>
    </div>
  )
}

export default SidenavUser
