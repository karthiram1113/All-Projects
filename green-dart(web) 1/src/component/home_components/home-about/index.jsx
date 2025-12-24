import React from "react";
import HomeAboutImg from "../../../assets/img/home/about.jpg";

function Home_About() {
  return (
    <>
      <div class="container section-title mt-5" data-aos="fade-up">
        <h2>About Us</h2>
        <p>
          Your dream buildings come from good Enginers and Workers. We design you buildings, make your dream home a reality.
        </p>
      </div>
      <section id="about" class="about section">
        <div class="container text-start">
          <div class="row position-relative">
            <div
              class="col-lg-5 about-img"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img src={HomeAboutImg} className="img-fluid image-class" />
            </div>

            <div class="col-lg-9" data-aos="fade-up" data-aos-delay="100">
              <h2 class="inner-title">
                Building Trust Through Quality & Innovation
              </h2>
              <div class="our-story">
                {/* <h4>Est 2005</h4> */}
                <h3>Our Story</h3>
                <p>
                  Green Dart Builders is reputed construction company which is Started in mamootukadai, marthandam near, Kanyakumari, District in the year 2015 by Er. D. Godwin deva kumar, D.C.E., (Founder).
                </p>
                <p>In just Ten years, the green dart Builders, with the spirit of innovation, customer focus, has carved a niche for itself as an industry benchmark for quality,  robust engineering, uncompromising business ethics and the unswerving commitment to timeless values and total transparency in every aspect of its business. </p>
                <p>
                  The Green dart builders Builders outshines in construction projects providing aesthetically and skilfully designed buildings that reflect engineering excellence. The company always keeps up with the changing times and adopts the latest technology and cutting-edge developments in building infrastructure.
                </p>
                <p>
                  The green dart Builders has the distinction of offering “Value for Money” housing solutions. the bathrooms are fitted with premium quality of showers, taps, washbasins and closets. The bedroom and kitchen wardrobes are fitted with premium quality materials. The houses are built with high quality materials in proper standard of construction following the latest trends in industry. Interiors are designed by understanding the needs and expectation of clients.
                </p>
                <p>
                  Green dart builders undertakes all kinds of civil works in kanayakumari dist ,  individual houses , commercial and industrial buildings, Boys and girls hostels, school buildings, mobile Tower installation in Kerala, construction of Apartments, etc. Also, the company undertakes the renovation of the old Buildings by taking into account the Vasthu and giving it a new facelift, which will lead to the betterment of the occupants.
                </p>
                <p>   
                   Green Dart is a trusted construction company delivering high-quality infrastructure, residential, and commercial projects. With ten years of experience and a commitment to excellence, we combine modern engineering, skilled craftsmanship, and innovative with techniques to bring every client’s vision to life.
                </p>
                <p>
                  "We build your dream home with offering completely customized plans and 3D modelling to suit your unique, needs and preferences. We ensure good quality and responsible construction"
                </p>
                <ul>
                  <li>
                    <i class="bi bi-check-circle"></i>{" "}
                    <span>
                      construction with full support from the best professional engineers.
                    </span>
                  </li>
                  <li>
                    <i class="bi bi-check-circle"></i>{" "}
                    <span>
                      Committed to quality, safety, and timely project hand overing.
                    </span>
                  </li>
                  <li>
                    <i class="bi bi-check-circle"></i>{" "}
                    <span>
                      Reliable solutions for residential, commercial and industrial construction projects.
                    </span>
                  </li>
                  <li>
                    <i class="bi bi-check-circle"></i>{" "}
                    <span>
                      We construct your dream building (home) on your own land, based on your dream design.
                    </span>
                  </li>
                  <li>
                    <i class="bi bi-check-circle"></i>{" "}
                    <span>
                      Will be only replaced house plan drawing and items with the owner's approval.
                    </span>
                  </li>
                  <li>
                    <i class="bi bi-check-circle"></i>{" "}
                    <span>
                      The construction begins, construction begins only after the total all cost of the building is clearly explained to the owner and contract is signed.
                    </span>
                  </li>
                </ul>
                <p>
                  The Green dart Builders is proud to have a  list of happy clientele. These exceptional attributes have made green dart Builders to complete more than 60 projects including residential, commercial and educational institution, Boys and girls hostels, mobile Tower, Apartments, in Tamilnadu and kerala.
                </p>

                {/* <div class="watch-video d-flex align-items-center position-relative">
                  <i class="bi bi-play-circle"></i>
                  <a
                    href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                    class="glightbox stretched-link"
                  >
                    Watch Video
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home_About;
