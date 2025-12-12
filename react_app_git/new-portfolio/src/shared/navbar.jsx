import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <img src="../../public/hermon-logo.png" className="mini-logo" alt="mini logo" />
                <ul className="nav-links">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/services"}>Services</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                    <li><Link to={"/skills"}>Skills</Link></li>
                    <li><Link to={"/portfolio"}>Portfolio</Link></li>
                </ul>
                <Link to={"/contact"}><button className="contact-btn">Contact me</button></Link>
            </nav>
        </div>
      
    );
};

export default Navbar;