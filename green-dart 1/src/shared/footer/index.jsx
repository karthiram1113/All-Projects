import React from 'react'

function Footer() {
  return (
    <>
      <footer id="footer" class="footer dark-background">

        <div class="container text-start footer-top">
          <div class="row gy-4">
            <div class="col-lg-4 col-md-3 footer-about">
              <a href="index.html" class="logo d-flex align-items-center">
                <span class="sitename">Green Dart</span>
              </a>
              <div class="footer-contact pt-3">
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
                <p class="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                <p><strong>Email:</strong> <span>info@example.com</span></p>
              </div>
              <div class="social-links d-flex mt-4">
                {/* <a href=""><i class="bi bi-twitter-x"></i></a> */}
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                {/* <a href=""><i class="bi bi-linkedin"></i></a> */}
              </div>
            </div>
            <div class="col-lg-2 col-md-3 footer-about">
              <a href="index.html" class="logo d-flex align-items-center">
                <span class="sitename">Office days & Hours</span>
              </a>
              <div class="footer-contact pt-3">
                <p>Monday to Saturday <br />
                  9.00 Am - 05.00 Pm <br />
                  Sunday - Holiday</p>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><a href="#">Construction of Residential Building</a></li>
                <li><a href="#">Commercial and Industrial Building</a></li>
                <li><a href="#">Construction of Multi-Story Flats</a></li>
                <li><a href="#">2D Vasthu Plan, 3D Plan & Modeling</a></li>
                <li><a href="#">School Buildings, Hostels</a></li>
                <li><a href="#">Renovation and Repairing of Old Buildings</a></li>
                <li><a href="#">Hotels and Restaurants</a></li>
                <li><a href="#">Planning and Designing</a></li>
                <li><a href="#">Interior Decorators</a></li>
                <li><a href="#">Mobile Tower Installation</a></li>
              </ul>
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

        <div class="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong class="px-1 sitename">Green Dart</strong> <span>All Rights Reserved</span></p>
          <div class="credits">
            {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> */}
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer;