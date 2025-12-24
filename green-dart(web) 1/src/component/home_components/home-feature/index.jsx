import React from "react";
import FeatureImage01 from "../../../assets/img/home/features-1.jpg";
import FeatureImage02 from "../../../assets/img/home/features-2.jpg";
import FeatureImage03 from "../../../assets/img/home/features-3.jpg";
import FeatureImage04 from "../../../assets/img/home/features-4.jpg";

function Feature_Component() {
  return (
    <>
      <section id="features" class="features section text-start">
        <div class="container">
          <ul
            className="nav nav-tabs row g-2 d-flex"
            data-aos="fade-up"
            data-aos-delay="100"
            role="tablist"
          >
            <li className="nav-item col-3" role="presentation">
              <a
                className="nav-link active show"
                data-bs-toggle="tab"
                data-bs-target="#features-tab-1"
                aria-selected="true"
                role="tab"
              >
                <h4>Modisit</h4>
              </a>
            </li>

            <li className="nav-item col-3" role="presentation">
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#features-tab-2"
                aria-selected="false"
                tabIndex="-1"
                role="tab"
              >
                <h4>Praesenti</h4>
              </a>
            </li>

            <li className="nav-item col-3" role="presentation">
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#features-tab-3"
                aria-selected="false"
                tabIndex="-1"
                role="tab"
              >
                <h4>Explica</h4>
              </a>
            </li>

            <li className="nav-item col-3" role="presentation">
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#features-tab-4"
                aria-selected="false"
                tabIndex="-1"
                role="tab"
              >
                <h4>Nostrum</h4>
              </a>
            </li>
          </ul>

          <div class="tab-content" data-aos="fade-up" data-aos-delay="200">
            <div
              class="tab-pane fade active show"
              id="features-tab-1"
              role="tabpanel"
            >
              <div class="row">
                <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>High-Quality Residential Construction</h3>
                  <p class="fst-italic">
                    We build modern, durable, and well-planned residential
                    spaces using premium materials and skilled craftsmanship to
                    ensure long-lasting comfort.
                  </p>

                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Premium-grade materials for long-lasting durability.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Modern designs tailored to your lifestyle needs.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span>
                        Quality construction with expert supervision to ensure
                        safety and structural strength.
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 text-center">
                  <img src={FeatureImage01} alt="" class="img-fluid" />
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="features-tab-2" role="tabpanel">
              <div class="row">
                <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>Reliable Commercial & Industrial Construction</h3>

                  <p class="fst-italic">
                    We deliver strong and scalable commercial buildings that
                    meet modern standards, ensuring safety, efficiency, and
                    long-term performance.
                  </p>

                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Custom-designed structures to meet business needs.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Strict adherence to safety and compliance standards.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Efficient planning and management for timely project
                        delivery.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Durable construction built to handle heavy usage.
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 text-center">
                  <img src={FeatureImage02} alt="" class="img-fluid" />
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="features-tab-3" role="tabpanel">
              <div class="row">
                <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>Professional Architectural Planning & Design</h3>

                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Creative designs combining functionality and aesthetics.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Space-optimized layouts based on client requirements.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Accurate planning to ensure smooth construction
                        execution.
                      </span>
                    </li>
                  </ul>

                  <p class="fst-italic">
                    Our expert architects create innovative designs that enhance
                    lifestyle, functionality, and structural efficiency for
                    every type of project.
                  </p>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 text-center">
                  <img src={FeatureImage03} alt="" class="img-fluid" />
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="features-tab-4" role="tabpanel">
              <div class="row">
                <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>Renovation & Remodeling Services</h3>
                  <p class="fst-italic">
                    Whether it’s upgrading an existing space or transforming an
                    old structure, we provide efficient renovation solutions
                    that enhance beauty and value.
                  </p>

                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Complete interior and exterior renovation support.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Modern upgrades to improve functionality and appearance.
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>{" "}
                      <span>
                        Quality craftsmanship that brings new life to old
                        structures.
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 text-center">
                  <img src={FeatureImage04} alt="" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Feature_Component;
