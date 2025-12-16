import React from "react";
import HomeAboutImg from "../../../assets/img/home/about.jpg";

function Home_About() {
  return (
    <>
      <div className="container section-title mt-5" data-aos="fade-up">
        <h2 className="text-center">About Us</h2>
        <p className="text-center">
          Your dream buildings come from good engineers and workers. We design your buildings and make your dream home a reality.
        </p>
      </div>

      <section id="about" className="about section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Image */}
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="zoom-out" data-aos-delay="200">
              <img src={HomeAboutImg} className="img-fluid rounded shadow" alt="About Us" />
            </div>

            {/* Text Content */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              
              <div  className="d-flex justify-content-center">
                <h2 className="text-center">Building Trust Through Quality & Innovation</h2>
              </div>
              <h3 className="mb-3">Company Information</h3>
              <p className="mb-3">
                Green Dart Builders is a reputed construction company which started in Mamootukadai, Marthandam near Kanyakumari, District in 2015 by Er. D. Godwin Deva Kumar, D.C.E., (Founder).
              </p>

              <div className="list-group mb-3">
                {[
                  "In just ten years, Green Dart Builders, with the spirit of innovation and customer focus, has carved a niche as an industry benchmark for quality, robust engineering, uncompromising business ethics, and transparency.",
                  "Green Dart Builders outshines in construction projects providing aesthetically and skillfully designed buildings reflecting engineering excellence.",
                  "The company offers 'Value for Money' housing solutions. Bathrooms, bedrooms, and kitchens are fitted with premium-quality materials. Interiors are designed understanding client needs.",
                  "Green Dart Builders undertakes civil works including individual houses, commercial and industrial buildings, boys and girls hostels, school buildings, mobile tower installation, apartments, and renovation considering Vasthu principles.",
                  "The company delivers high-quality infrastructure, residential, and commercial projects combining modern engineering, skilled craftsmanship, and innovative techniques.",
                  "Construction is supported by professional engineers, ensuring quality, safety, and timely project handover. All plans and items are approved by the owner before construction begins.",
                  "Green Dart Builders has completed more than 60 projects including residential, commercial, educational institutions, hostels, mobile towers, and apartments in Tamil Nadu and Kerala."
                ].map((item, index) => (
                  <div key={index} className="list-group-item border-0 p-2 d-flex align-items-start">
                    <i className="bi bi-check-circle text-success me-3 fs-5 mt-1"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

             
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center">
              <h5 className="text-center">We build your dream home offering completely customized plans and 3D modelling to suit your unique needs and preferences. We ensure high-quality and responsible construction.</h5>
            </div>
         

            <div className="row row-cols-1 row-cols-md-2 g-2 mb-3">
              {[
                "Construction with full support from professional engineers.",
                "Committed to quality, safety, and timely project handover.",
                "Reliable solutions for residential, commercial, and industrial projects.",
                "We construct your dream building on your own land, based on your design.",
                "Only approved house plans and items are used.",
                "Construction begins after full cost explanation and signed contract."
              ].map((item, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="card border-0  p-3 h-100">
                    <i className="bi bi-check-circle text-primary me-2"></i>
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <p className="fw-bold">
              Feel free to contact us for your dream home and commercial construction-related needs.
            </p>
          </div>
        </div>
      </section>


    </>
  );
}

export default Home_About;
