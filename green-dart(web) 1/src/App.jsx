import "./App.css";
import React,{useEffect} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./theme/vendor/bootstrap/css/bootstrap.min.css";
import "./theme/vendor/bootstrap-icons/bootstrap-icons.css";
import "./theme/vendor/aos/aos.css";
import "./theme/vendor/fontawesome-free/css/all.min.css";
import "./theme/vendor/glightbox/css/glightbox.min.css";
import "./theme/vendor/swiper/swiper-bundle.min.css";
import "./theme/css/main.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./view/home";
import About from "./view/about";
import Contact from "./view/contact";
import Gallery from "./view/gallery";
import Project from "./view/project";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/Gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className="toast-position"
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="dark"
        style={{ width: "500px" }}
      // #00D26E
      />
    </div>
  );
}

export default App;
