import React from 'react'
import Logo from '../../assets/img/home/logo.png'
import { Link } from 'react-router-dom';
import './index.css'

function Footer() {
  return (
    <>
      <footer id="footer" class="footer dark-background mt-5">

        <div class="container text-start footer-top">
          <div class="row gy-4">
            <div class="col-lg-3 col-md-6 footer-about">
              <div class="footer-contact mb-4">
                <h4>Office Address</h4>
                <p>J.M.J Tower, <br />
                  1st floor, <br />
                  Mamootukadai, <br />
                  Kanyakumari Dist, <br />
                  Tamilnadu-629165 </p>
                
              </div>
              <div class="footer-contact">
                <h4>Office days & Hours</h4>
                <p>Monday to Saturday </p>
                <p>9.00 Am - 05.00 Pm</p>
                <p>Sunday - Holiday</p>
                {/* <p class="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                <p><strong>Email:</strong> <span>info@example.com</span></p> */}
              </div>
              <div class="social-links d-flex mt-4">
                {/* <a href=""><i class="bi bi-twitter-x"></i></a> */}
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                {/* <a href=""><i class="bi bi-linkedin"></i></a> */}
              </div>
            </div>

            <div class="col-lg-3 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><Link to={'/'}><i class="bi bi-chevron-right"></i> Home</Link></li>
                <li><Link to={'/about'}><i class="bi bi-chevron-right"></i> About us</Link></li>
                <li><Link to={'/Gallery'}><i class="bi bi-chevron-right"></i> Gallery</Link></li>
                <li><Link to={'/projects'}><i class="bi bi-chevron-right"></i> Projects</Link></li>
                <li><Link to={'/contact'}><i class="bi bi-chevron-right"></i> Contact us</Link></li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-4 footer-links">
              <h4>Our Services</h4>
              <div className="">
                <ul>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> Construction of residential Building.</a></li>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> Commercial and Industrial Building.</a></li>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> Construction of Multi story Flats.</a></li>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> 2D Vasthu Plan, 3D Plan& Modeling.</a></li>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> School Buildings, hostels.</a></li>
                </ul>
                <ul>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> Renovation and repairing the old Building.</a></li>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> Hotels and Restaurant.</a></li>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> Planing and Designing.</a></li>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> Interior Decorators.</a></li>
                  <li><a href="#"><i class="bi bi-chevron-right"></i> Mobile Tower Installation.</a></li>
                </ul>
              </div>
            </div>

            {/* <div class="col-lg-2 col-md-3 footer-links">
          <h4>Hic solutasetp</h4>
          <ul>
            <li><a href="#">Molestiae accusamus iure</a></li>
            <li><a href="#">Excepturi dignissimos</a></li>
            <li><a href="#">Suscipit distinctio</a></li>
            <li><a href="#">Dilecta</a></li>
            <li><a href="#">Sit quas consectetur</a></li>
          </ul>
        </div> */}

            {/* <div class="col-lg-2 col-md-3 footer-links">
          <h4>Nobis illum</h4>
          <ul>
            <li><a href="#">Ipsam</a></li>
            <li><a href="#">Laudantium dolorum</a></li>
            <li><a href="#">Dinera</a></li>
            <li><a href="#">Trodelas</a></li>
            <li><a href="#">Flexo</a></li>
          </ul>
        </div> */}

          </div>
        </div>

        <div class="container copyright d-flex justify-content-between mt-4">
          <p>Copyright @ 2025 , <span>All Rights Reserved By</span><strong class="px-1 sitename">Green Dart.</strong> </p>
          <div class="credits">
            Designed & Developed by <Link to={'https://hermonsolutions.com/'} target='_blank' className="hermon-gradient">HERMON Solutions.</Link>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer;