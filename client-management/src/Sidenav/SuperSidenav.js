
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
function SuperSidenav() {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const location = useLocation();

    const Navigate = useNavigate()

    let token = localStorage.getItem("token");
   
    if(!token||token==null){
      Navigate("/")
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
            <Link to="/superdashboard" className={`nav-link  ${location.pathname === '/superdashboard' ? 'active' : 'collapsed'}`}>
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
                  <Link
                    to="/Tenent"
              className={`nav-link ${location.pathname.includes('/Tenent') ? 'active' : 'collapsed'}`}
              // className={`nav-link  ${location.pathname === '' ? 'active' : 'collapsed'}`}
                  >
                    <i className="fa-solid fa-person-dress"></i>
                    Tenant Management
                  </Link>
                </li>
                
        </ul> 
        </aside>
    </div>
  )
}

export default SuperSidenav
