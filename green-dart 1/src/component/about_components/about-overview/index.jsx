import React from "react";

function Aboutoverview () {
    return(
        <section id="about" className="about section">
            <div className="container">
              <div className="row position-relative">

                <div
                  className="col-lg-7 about-img"
                  data-aos="zoom-out"
                  data-aos-delay="200"
                >
                  <img src="assets/img/about.jpg" alt="About" />
                </div>

                <div
                  className="col-lg-7"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h2 className="inner-title">Consequatur eius et magnam</h2>

                  <div className="our-story">
                    <h4>Est 1988</h4>
                    <h3>Our Story</h3>

                    <p>
                      Inventore aliquam beatae at et id alias. Ipsa dolores amet
                      consequuntur minima quia maxime autem. Quidem id sed
                      ratione.
                    </p>

                    <ul>
                      <li><i className="bi bi-check-circle"></i> Ullamco laboris nisi ut aliquip</li>
                      <li><i className="bi bi-check-circle"></i> Duis aute irure dolor</li>
                      <li><i className="bi bi-check-circle"></i> Ullamco laboris nisi</li>
                    </ul>

                    <p>
                      Vitae autem velit excepturi fugit. Animi ad non. Eligendi
                      et non nesciunt suscipit repellendus.
                    </p>

                    <div className="watch-video d-flex align-items-center position-relative">
                      <i className="bi bi-play-circle"></i>
                      <a
                        href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                        className="glightbox stretched-link"
                      >
                        Watch Video
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
    )
}
export default Aboutoverview;