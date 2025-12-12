import React from "react";
import './index.css'
function Footer() {
    const currentYear = new Date().getFullYear();

  return (
    <>
      <footer class="footer-main">
        <div class="container-xxl d-flex flex-wrap justify-content-center flex-md-row flex-column">
          <div>
          © {currentYear}, All rights reserved  <a
              href="http://araciyal.hermonsolutions.com/"
              target="_blank"
              class="footer-hermon"
            >
              Arasiyal.com
            </a> . Designed & Developed by <a
              href="https://hermonsolutions.com/"
              target="_blank"
              class="footer-hermon"
            >
              Hermon Solutions
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
