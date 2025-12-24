import React, { useEffect, useState } from "react";
import Logo from '../../assets/img/home/logo.png'
import "./index.css"
import { Link, useLocation } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
 const location = useLocation();
   const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top 
        header-scrolled
        `}
      >
        <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

          <Link to="/" class="logo d-flex align-items-center">
            <img src={Logo} alt="" />
          </Link>

          <nav id="navmenu" class="navmenu">
             <ul>
      <li>
        <Link
          to="/"
          className={`${scrolled ? "text-dark" : "text-dark"} ${
            currentPath === "/" ? "active" : ""
          }`}
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          to="/about"
          className={`${scrolled ? "text-dark" : "text-dark"} ${
            currentPath === "/about" ? "active" : ""
          }`}
        >
          About us
        </Link>
      </li>

      <li>
        <Link
          to="/gallery"
          className={`${scrolled ? "text-dark" : "text-dark"} ${
            currentPath === "/gallery" ? "active" : ""
          }`}
        >
          Gallery
        </Link>
      </li>

      <li>
        <Link
          to="/projects"
          className={`${scrolled ? "text-dark" : "text-dark"} ${
            currentPath === "/projects" ? "active" : ""
          }`}
        >
          Projects
        </Link>
      </li>

      <li>
        <Link
          to="/contact"
          className={`${scrolled ? "text-dark" : "text-dark"} ${
            currentPath === "/contact" ? "active" : ""
          }`}
        >
          Contact us
        </Link>
      </li>
    </ul>

            <i
            className={`mobile-nav-toggle d-xl-none bi bi-list ${scrolled ? "text-dark" : "text-dark"
              }`}
            onClick={() => setShow(true)}
          ></i>
          </nav>

        </div>
      </header>
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={Logo} height="45" alt="logo" />
          </Offcanvas.Title>
        </Offcanvas.Header>
 
        <Offcanvas.Body>
          <ul className="offcanvas-menu">
            <li><Link to="/" onClick={() => setShow(false)} className={`${currentPath === "/" ? "active" : ""}`}>Home</Link></li>
            <li><Link to="/about" onClick={() => setShow(false)} className={`${currentPath === "/about" ? "active" : ""}`}>About</Link></li>
            <li><Link to="/service" onClick={() => setShow(false)} className={`${currentPath === "/service" ? "active" : ""}`}>Services</Link></li>
            <li><Link to="/projects" onClick={() => setShow(false)} className={`${currentPath === "/projects" ? "active" : ""}`}>Projects</Link></li>
            <li><Link to="/blog" onClick={() => setShow(false)} className={`${currentPath === "/blog" ? "active" : ""}`}>Blog</Link></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Navbar;
