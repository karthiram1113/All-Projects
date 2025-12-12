import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarLogo from '../../assets/img/smr-gold-w.png';

function Sidenav() {
  return (
    <div className="sidebar open">
      <div className="sidebar-header">
        <img src={NavbarLogo} alt="Logo" style={{marginRight:'-12px'}} />
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" end className={({isActive}) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/app/collections" className={({isActive}) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-box"></i> Collections
          </NavLink>
        </li>

        <li>
          <NavLink to="/app/customer-details" className={({isActive}) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-users"></i> Customer Details
          </NavLink>
        </li>

        <li>
          <NavLink to="/app/reports" className={({isActive}) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-file-alt"></i> Reports
          </NavLink>
        </li>

        {/* <li>
          <NavLink to="/app/settings" className={({isActive}) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-gear"></i> Settings
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidenav;
