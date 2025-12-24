import React from "react";
import Image01 from "../../../assets/img/home/alt-services.jpg";

function Home_Choose() {
  return (
    <>
      <section id="alt-services" class="alt-services section mt-5 pt-5">
        <div class="container">
          <div class="row justify-content-around gy-4 text-start">
            <div
              class="features-image col-lg-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src={Image01} alt="feature" className="img-fluid image-class"/>
            </div>

            <div
              class="col-lg-5 d-flex flex-column justify-content-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>Why Choose Our Construction Services</h3>

              <p className="para-center" style={{textAlign:"justify"}}>
               With Ten years of experience and a commitment to quality, we deliver reliable construction solutions using modern technologies, skilled Engineers, skilled workers and high-grade materials to build your long-lasting dream home.
              </p>

              <div
                class="icon-box d-flex position-relative"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <i class="bi bi-easel flex-shrink-0"></i>
                <div style={{textAlign:"justify"}}>
                  <h4>
                    <a href="" class="stretched-link">
                      Quality Workmanship
                    </a>
                  </h4>
                  <p className="para-center">
     Every project is executed with precision, using premium materials and skilled craftsmanship to ensure durable and beautiful construction to build be structure results.

                  </p>
                </div>
              </div>

              <div
                class="icon-box d-flex position-relative"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <i class="bi bi-patch-check flex-shrink-0"></i>
                <div style={{textAlign:"justify"}}>
                  <h4>
                    <a href="" class="stretched-link">
                   On-Time Project Handover 
                    </a>
                  </h4>
                  <p className="para-center">
     Our team follows a structured workflow and professional planning to ensure every project is completed within the promised agreements without compromising quality.

                  </p>
                </div>
              </div>

              <div
                class="icon-box d-flex position-relative"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <i class="bi bi-brightness-high flex-shrink-0"></i>
                <div style={{textAlign:"justify"}}>
                  <h4>
                    <a href="" class="stretched-link">
                     Modern Construction Technology
                    </a>
                  </h4>
                  <p className="para-center">
                    We use advanced tools, innovative methods, and up-to-date construction practices to deliver efficient and future-ready infrastructure.
                  </p>
                </div>
              </div>

              <div
                class="icon-box d-flex position-relative"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <i class="bi bi-brightness-high flex-shrink-0"></i>
                <div style={{textAlign:"justify"}}>
                  <h4>
                    <a href="" class="stretched-link">
                      Trusted & Transparent Service
                    </a>
                  </h4>
                  <p className="para-center">
                   From planning to completion, we maintain clear communication, transparent pricing, and complete accountability throughout the project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home_Choose;
