import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    // State to manage the visibility of the "Back to Top" button
    const [showButton, setShowButton] = useState(false);

    // Function to handle scrolling behavior
    const handleScroll = () => {
        // Show the button if the user has scrolled down more than 300 pixels
        if (window.scrollY > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // Function to scroll the viewport to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Uses the global smooth scroll behavior
        });
    };

    // Effect to attach and cleanup the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this runs only once
    return (
        <footer className="app-footer">
            <div className="footer-container">

                {/* Navigation Links - Matching the structure and routes of the provided Navbar */}
                <div className="footer-links">
                    {/* Using Link to match the navbar's navigation pattern */}
                    <Link to={"/"} className="footer-link">Home</Link>
                    {/* <a href="/services" target="_top" className=""> */}
                    {/* <div onClick={() => navigate("/services")}>Home</div>  */}
                    {/* </a> */}
                    <Link to={"/services"} className="footer-link">Services</Link>
                    <Link to={"/about"} className="footer-link">About</Link>
                    <Link to={"/skills"} className="footer-link">Skills</Link>
                    <Link to={"/portfolio"} className="footer-link">Portfolio</Link>
                </div>

                {/* Social Media Section */}
                <div className="footer-social">
                    {/* Using Font Awesome icons (assuming fas is available) for better visuals */}
                    <a href="#" className="social-icon-wrapper" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social-icon-wrapper" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="social-icon-wrapper" aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="social-icon-wrapper" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>

                {/* Copyright */}
                <p className="footer-copyright">
                    &copy; {new Date().getFullYear()} Syed Ali. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;