import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './shared/navbar';
import Home from './components/home';
import Services from './components/services';
import About from './components/about';
import Skills from './components/skills';
import Portfolio from './components/portfolio';
import Contact from './components/contact';
import Footer from './shared/footer';

function App() {
  return (
    <Router>
      <Navbar /> {/* Always visible */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Services />
              <About />
              <Skills />
              <Portfolio />
              <Contact />
            </>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      <Footer />{/* <Footer /> Always visible */}
    </Router>
  );
}

export default App;
