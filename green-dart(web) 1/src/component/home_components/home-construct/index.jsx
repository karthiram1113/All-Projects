import React from "react";
import ConstructImg01 from "../../../assets/img/home/constructions-1.jpg";
import ConstructImg02 from "../../../assets/img/home/constructions-2.jpg";
import ConstructImg03 from "../../../assets/img/home/constructions-3.jpg";
import ConstructImg04 from "../../../assets/img/home/constructions-4.jpg";

function Constuct_Component() {
  return (
    <>
      <section id="constructions" class="constructions section mt-5">
        <div class="container section-title" data-aos="fade-up">
          <h2>Constructions</h2>
          <p>
            We advice high-quality,  with a strong  commitment to safety, durability, and starting home  construction on-time.
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
                    <div class="card-body" style={{textAlign:"justify"}}>
                      <h4 class="card-title">
                        Quality Residential Construction
                      </h4>
                      <p className="para-center">
                        We specialize in building strong, long-lasting residential homes with modern designs and premium materials. Every project is planned with precision, ensuring durability, safety, and comfort. Residential building from foundation to finishing stage construction, our team Supervising all works of precisely.
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
                    <div class="card-body" style={{textAlign:"justify"}}>
                      <h4 class="card-title">
                        Commercial & Industrial Projects
                      </h4>
                      <p className="para-center">
                        Our expertise Related to large-scale commercial and industrial construction. We handle complex structures with advanced engineering, efficient planning, and perfect execution. Whether it’s offices, warehouses, or factories, we also ensure on-time project finishing and top-tier quality.

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
                    <div class="card-body" style={{ textAlign: "justify" }}>
                      <h4 class="card-title">
                        Renovation & Remodelling Services
                      </h4>
                      <p className="para-center">

                        We transform old construction into modern, functional, and elegant structures. From structural upgrades to complete remodels, our renovation team enhances value while maintaining safety and quality. With our expert craftsmanship, your old existing building will take on new brilliance.

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
                    <div class="card-body" style={{ textAlign: "justify" }}>
                      <h4 class="card-title">
                        Interior & Architectural Finishing
                      </h4>
                      <p className="para-center">
                        Our interior designing works finishing bring style and elegance to every project. With expert workers, creative beautiful designs, and premium materials, we ensure designs execution. From flooring to false ceilings, we styles interior designs that perfectly aesthetics and functionality.
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
