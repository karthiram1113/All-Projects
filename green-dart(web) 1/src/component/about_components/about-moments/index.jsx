import React from "react";
import features from "../../../assets/img/home/features-3-2.jpg"
function AboutMoments() {
  return (
    <section id="alt-services" class="alt-services section mt-5">

      <div class="container">

        <div className="row justify-content-around align-items-center gy-4">

          <div className="col-lg-5 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200" style={{textAlign:"justify"}}>
            <h3>Our Services</h3>
            {/* <div className="row">
              <div className="col-md-6">
                <div className="icon-box d-flex position-relative mb-4" data-aos="fade-up" data-aos-delay="300">
                  <i className="bi bi-easel flex-shrink-0"></i>
                  <div>
                    <h4><a href="" className="stretched-link">Lorem Ipsum</a></h4>
                    <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                  </div>
                </div>
                <div className="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="500">
                  <i className="bi bi-brightness-high flex-shrink-0"></i>
                  <div>
                    <h4><a href="" className="stretched-link">Dine Pad</a></h4>
                    <p>Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit. Sunt aut deserunt minus aut eligendi omnis</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="icon-box d-flex position-relative mb-4" data-aos="fade-up" data-aos-delay="400">
                  <i className="bi bi-patch-check flex-shrink-0"></i>
                  <div>
                    <h4><a href="" className="stretched-link">Nemo Enim</a></h4>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                  </div>
                </div>
                <div className="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="600">
                  <i className="bi bi-brightness-high flex-shrink-0"></i>
                  <div>
                    <h4><a href="" className="stretched-link">Tride clov</a></h4>
                    <p>Est voluptatem labore deleniti quis a delectus et. Saepe dolorem libero sit non aspernatur odit amet. Et eligendi</p>
                  </div>
                </div>
              </div>
            </div> */}
            <p><i class="bi bi-chevron-right"></i> Construction of residential Building.</p>
            <p><i class="bi bi-chevron-right"></i> Commercial and Industrial Building.</p>
            <p><i class="bi bi-chevron-right"></i> Construction of Multi story Flats.</p>
            <p><i class="bi bi-chevron-right"></i> 2D Vasthu Plan, 3D Plan& Modeling.</p>
            <p><i class="bi bi-chevron-right"></i> School Buildings, hostels.</p>
            <p><i class="bi bi-chevron-right"></i> Renovation and repairing the old Building.</p>
            <p><i class="bi bi-chevron-right"></i> Hotels and Restaurant.</p>
            <p><i class="bi bi-chevron-right"></i> Planing and Designing.</p>
            <p><i class="bi bi-chevron-right"></i> Interior Decorators.</p>
            <p><i class="bi bi-chevron-right"></i> Mobile Tower Installation.</p>
          </div>

          <div className="features-image col-lg-6 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
            <img
              src={features}
              alt=""
              style={{ maxWidth: "100%", width: "90%", height: "auto", objectFit: "contain" }}
            />
          </div>

        </div>


      </div>

    </section>
  )
}
export default AboutMoments;