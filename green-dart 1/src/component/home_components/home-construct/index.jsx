import React from "react";
import ConstructImg01 from "../../../assets/img/home/constructions-1.jpg";
import ConstructImg02 from "../../../assets/img/home/constructions-2.jpg";
import ConstructImg03 from "../../../assets/img/home/constructions-3.jpg";
import ConstructImg04 from "../../../assets/img/home/constructions-4.jpg";

function Constuct_Component() {
  return (
    <>
      <section id="constructions" class="constructions section">
        <div class="container section-title" data-aos="fade-up">
          <h2>Construction</h2>
          <p>
            We deliver high-quality residential and commercial construction
            solutions with modern designs, durable materials, and trusted
            craftsmanship.
          </p>
        </div>

        <div class="container">
          <div class="row gy-4">
            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div class="card-item">
                <div class="row">
                  <div class="col-xl-5">
                    <div class="card-bg">
                      <img src={ConstructImg01} alt="" />
                    </div>
                  </div>
                  <div class="col-xl-7 d-flex align-items-center">
                    <div class="card-body text-start">
                      <h4 class="card-title">
                        Quality Residential Construction
                      </h4>
                      <p>
                        We specialize in building strong, long-lasting
                        residential homes with modern designs and premium
                        materials. Every project is planned with precision,
                        ensuring durability, safety, and comfort. From
                        foundation to finishing, our team delivers homes that
                        stand the test of time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div class="card-item">
                <div class="row">
                  <div class="col-xl-5">
                    <div class="card-bg">
                      <img src={ConstructImg02} alt="" />
                    </div>
                  </div>
                  <div class="col-xl-7 d-flex align-items-center">
                    <div class="card-body text-start">
                      <h4 class="card-title">
                        Commercial & Industrial Projects
                      </h4>
                      <p>
                        Our expertise extends to large-scale commercial and
                        industrial construction. We handle complex structures
                        with advanced engineering, efficient planning, and
                        perfect execution. Whether it’s offices, warehouses, or
                        factories, we ensure on-time delivery and top-tier
                        quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
              <div class="card-item">
                <div class="row">
                  <div class="col-xl-5">
                    <div class="card-bg">
                      <img src={ConstructImg03} alt="" />
                    </div>
                  </div>
                  <div class="col-xl-7 d-flex align-items-center">
                    <div class="card-body text-start">
                      <h4 class="card-title">
                        Renovation & Remodeling Services
                      </h4>
                      <p>
                        We transform old spaces into modern, functional, and
                        elegant environments. From structural improvements to
                        complete redesigns, our renovation team enhances value
                        while maintaining safety and quality standards. Your
                        existing space gets a new life with our expert
                        craftsmanship.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="400">
              <div class="card-item">
                <div class="row">
                  <div class="col-xl-5">
                    <div class="card-bg">
                      <img src={ConstructImg04} alt="" />
                    </div>
                  </div>
                  <div class="col-xl-7 d-flex align-items-center">
                    <div class="card-body text-start">
                      <h4 class="card-title">
                        Interior & Architectural Finishing
                      </h4>
                      <p>
                        Our interior finishing services bring style and elegance
                        to every project. With expert detailing, creative
                        designs, and premium materials, we ensure flawless
                        execution. From flooring to false ceilings, we deliver
                        interiors that perfectly balance aesthetics and
                        functionality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Constuct_Component;
