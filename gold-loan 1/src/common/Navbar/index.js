import React, { useEffect, useState } from 'react';
import './index.css';
import NavbarLogo from '../../assets/img/Media.jpeg';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '../../assets/img/navigation-icon.svg'

function Navbars() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showProfileCard,setShowProfileCard] = useState(false)

   const location = useLocation();

     const userName = localStorage.getItem("userName")
     
     console.log(userName)

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [openMenu, setOpenMenu] = useState(null);

const toggleMenu = (menuName) => {
  setOpenMenu(openMenu === menuName ? null : menuName);
};


const goTo = (path) => {
  navigate(path);
  setIsSidebarOpen(false);
};


useEffect(() => {
  if (location.pathname.startsWith('/reports')) {
    setOpenMenu('reports');
  }
}, [location.pathname,isSidebarOpen]);


 const isActive = (path) => location.pathname === path;
 
const token = localStorage.getItem("token");
if (!token || token === "null" || token === "undefined") {
  return <Navigate to="/" replace />;
}


  return (
    <>
      {/* Navbar */}

      <nav className="navbar">
        <div className="nav-left">
          {/* Menu icon */}

 <img
            src={MenuIcon}
            alt="Menu"
            className="menu-image"
            onClick={toggleSidebar}
          />

          

          <img
            src={NavbarLogo}
            alt="Logo"
            className="img-fluid ramesh-logo"
          />
        </div>

        <div className="nav-right">
  {/* Profile + Name + Hover Card */}
  
<div className="profile-hover-area">
  <div
    className="profile-img-wrapper"
    onMouseEnter={() => setShowProfileCard(true)}
    onMouseLeave={() => setShowProfileCard(false)}
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="Admin"
      className="admin-img"
    />

    {/* 👇 Card inside same wrapper — so it positions relative to image */}

   {showProfileCard && (
  <div className="profile-card slide-in-bottom">
    <div className="profile-card-inner">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Profile"
        className="profile-pic"
      />
      <div className="profile-info">
        <h6>{userName}</h6>

        {/* Hidden file input */}
        <input
          type="file"
          id="profileUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              console.log("Selected file:", file);
              // 👉 optional: you can upload or preview it here
            }
          }}
        />

        {/* Button triggers file input */}
        <button
          className="upload-btn"
          onClick={() => document.getElementById("profileUpload").click()}
        >
          Upload
        </button>
      </div>
    </div>
  </div>
)}


  </div>

  {/* 👇 This stays separate */}
  <span className="admin-text">Hi, {userName}</span>
</div>





  {/* 🔒 Logout button — unchanged */}
  <button class="Btn">
    <div class="sign">
      <svg viewBox="0 0 512 512">
        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
      </svg>
    </div>
    <div onClick={handleLogout} class="texts">
      Logout
    </div>
  </button>
</div>


        
      </nav>

      {/* Sidebar */}
       <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={NavbarLogo} style={{marginRight:'-12px'}} alt="logo" />
          <i
            className="fa-solid fa-xmark close-icon"
            onClick={toggleSidebar}
          ></i>
        </div>

        <ul className="sidebar-menu">
          <li
            className={location.pathname === '/dashboard' ? 'active' : ''}
            onClick={() => goTo('/dashboard')}
          >
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </li>

         <li
  className={
    location.pathname === '/customer-details' ||
    location.pathname === '/customer-details-list'
      ? 'active'
      : ''
  }
  onClick={() => goTo('/customer-details-list')}
>
  <i className="fa-solid fa-users"></i> Customer Details
</li>


          <li
            className={location.pathname === '/customer-collections' ? 'active' : ''}
            onClick={() => goTo('/customer-collections')}
          >
            <i className="fa-solid fa-box"></i> Collections
          </li>

         <li className={`menu-item ${openMenu === 'reports' ? 'open' : ''}`}>
  <div className="menu-title" onClick={() => toggleMenu('reports')}>
    <div className="menu-label">
      <i className="fa-solid fa-file-alt"></i>
      <span>Reports</span>
    </div>
    <i
      className={`fa-solid fa-chevron-${
        openMenu === 'reports' ? 'up' : 'down'
      } arrow`}
    ></i>
  </div>

  <ul className="submenu">
  <li
 className={`mt-3 ${location.pathname.startsWith('/reports/closed-loans') ? 'active-sub' : ''}`}

  onClick={() => goTo('/reports/closed-loans')}
>
<i className={`fa-solid fa-lock  ${location.pathname.startsWith('/reports/closed-loans') ? 'active-icon' : ''}`}></i>
  Closed Loans
</li>

  </ul>
</li>

          {/* <li
            className={location.pathname === '/settings' ? 'active' : ''}
            onClick={() => goTo('/settings')}
          >
            <i className="fa-solid fa-gear"></i> Settings
          </li> */}
        </ul>
      </div>

      {/* Overlay (for mobile click outside) */}
      {isSidebarOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}

export default Navbars;
