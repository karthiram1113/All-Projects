import React from 'react';
import { Outlet } from 'react-router-dom';

import './index.css'; // your layout CSS
import Sidenav from '../Sidenav';
import Navbars from '../Navbar';
import Footer from '../Footer';

const AuthLayout = () => {
  return (
    <div className="dashboard-layout">
      <aside className="sidenav"><Sidenav /></aside>

      <div className="main-section">
        <header className="navbar"><Navbars /></header>

        <main className="bg-color-overall layout-page">
          <Outlet /> {/* ← child routes render here */}
        </main>

        <footer><Footer /></footer>
      </div>
    </div>
  );
};

export default AuthLayout;
