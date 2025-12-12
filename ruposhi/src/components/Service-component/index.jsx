import React from "react";
import "./index.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ServiceComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div class="container-fluid page-header mb-5 py-5">
        <div class="container text-start">
          <h1 class="display-3 text-white mb-3 animated slideInDown">
            Services
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol class="breadcrumb text-uppercase">
              <li class="breadcrumb-item">
                <a class="text-white" href="#">
                  Home
                </a>
              </li>
              {/* <li class="breadcrumb-item">
                <a class="text-white" href="#">
                  Pages
                </a>
              </li> */}
              <li class="breadcrumb-item text-white active" aria-current="page">
                Services
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div
        class="container-fluid py-5 px-4 px-lg-0"
        style={{ overflow: "hidden" }}
      >
        <div class="row">
          <div class="col-lg-3 d-none d-lg-flex">
            <div class="d-flex align-items-center justify-content-center bg-primary w-100 h-100">
              <h1
                class="display-3 text-white m-0"
                style={{ transform: "rotate(-90deg)" }}
              >
                15 Years Experience
              </h1>
            </div>
          </div>
          <div class="col-md-12 col-lg-9">
            <div>
              <div
                class="text-center text-lg-start wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <h6 class="text-secondary text-uppercase">Our Services</h6>
                <h1 class="mb-5">Explore Our Services</h1>
              </div>
              <div className="slider-service">
                <Slider {...settings}>
                  <div class="bg-light p-4 slider-service">
                    <div
                      class="d-flex align-items-center justify-content-center border border-5 border-white mb-4"
                      style={{ width: "75px", height: "75px" }}
                    >
                      <i class="fa fa-water fa-2x text-primary"></i>
                    </div>
                    <h4 class="mb-3">Fully Managed IT Support</h4>
                    <h6>Keep Your Organisation Running Without Disruption</h6>
                    <p>
                      Our Fully Managed IT Support gives your business complete
                      peace of mind. We monitor, maintain, and optimise your
                      systems 24/7, ensuring that your IT infrastructure
                      performs at its best—so you can focus on your core
                      operations.
                    </p>
                    <h4>Key Features: </h4>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>24/7 remote
                      monitoring and proactive maintenance
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>On-site and
                      remote technical support
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Patch
                      management and updates
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>IT asset
                      management and inventory control
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Incident
                      response with guaranteed SLAs
                    </p>
                    <a href="" class="btn bg-white text-primary w-100 mt-2">
                      Speak to Our IT Support Team
                      <i class="fa fa-arrow-right text-secondary ms-2"></i>
                    </a>
                  </div>
                  <div class="bg-light p-4 slider-service">
                    <div
                      class="d-flex align-items-center justify-content-center border border-5 border-white mb-4"
                      style={{ width: "75px", height: "75px" }}
                    >
                      <i class="fa fa-toilet fa-2x text-primary"></i>
                    </div>
                    <h4 class="mb-3">Cybersecurity</h4>
                    <h6>Protect Your Data. Protect Your Reputation</h6>
                    <p>
                      Cyber threats are evolving faster than ever. Our
                      cybersecurity services safeguard your organisation’s
                      critical systems, ensuring compliance with government
                      security frameworks and industry regulations.
                    </p>
                    <h5 className="mt-4 pt-2">Key Features: </h5>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Network and
                      endpoint security monitoring
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Vulnerability
                      assessments and penetration testing
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Firewall and
                      intrusion prevention
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Email &
                      phishing protection
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Cybersecurity
                      awareness training for staff
                    </p>
                    <a href="" class="btn bg-white text-primary w-100 mt-2">
                      Book a Cybersecurity Assessment
                      <i class="fa fa-arrow-right text-secondary ms-2"></i>
                    </a>
                  </div>
                  <div class="bg-light p-4 slider-service">
                    <div
                      class="d-flex align-items-center justify-content-center border border-5 border-white mb-4"
                      style={{ width: "75px", height: "75px" }}
                    >
                      <i class="fa fa-shower fa-2x text-primary"></i>
                    </div>
                    <h4 class="mb-3">IT Cost Optimisation</h4>
                    <h6>Do More With Less—Without Sacrificing Quality</h6>
                    <p>
                      We help organisations reduce IT expenditure while
                      maintaining or improving service quality. Through audits,
                      vendor negotiation, and infrastructure optimisation, we
                      ensure you get maximum ROI.
                    </p>
                    <h5>Key Features: </h5>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>IT
                      infrastructure cost analysis
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Cloud
                      migration cost reduction
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Software
                      licensing optimisation
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Vendor
                      contract renegotiation
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Consolidation
                      of tools and systems
                    </p>
                    <a href="" class="btn bg-white text-primary w-100 mt-2">
                      Request Your Cost Review
                      <i class="fa fa-arrow-right text-secondary ms-2"></i>
                    </a>
                  </div>
                  <div class="bg-light p-4 slider-service">
                    <div
                      class="d-flex align-items-center justify-content-center border border-5 border-white mb-4"
                      style={{ width: "75px", height: "75px" }}
                    >
                      <i class="fa fa-tint fa-2x text-primary"></i>
                    </div>
                    <h4 class="mb-3">Business-Grade Internet</h4>
                    <h6>
                      Fast, Secure, and Reliable Connectivity for Critical
                      Operations
                    </h6>
                    <p>
                      Our Business-Grade Internet services deliver guaranteed
                      speeds, prioritised traffic, and enterprise-level
                      support—keeping your team connected at all times.
                    </p>
                    <h5>Key Features: </h5>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Dedicated
                      leased lines and fibre broadband
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Guaranteed
                      uptime SLAs
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>QoS (Quality
                      of Service) for mission-critical apps
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>
                      Cyber-protected connection
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>24/7 network
                      monitoring
                    </p>
                    <a href="" class="btn bg-white text-primary w-100 mt-2">
                      Get a Custom Connectivity Quote
                      <i class="fa fa-arrow-right text-secondary ms-2"></i>
                    </a>
                  </div>
                  <div class="bg-light p-4 slider-service">
                    <div
                      class="d-flex align-items-center justify-content-center border border-5 border-white mb-4"
                      style={{ width: "75px", height: "75px" }}
                    >
                      <i class="fa fa-tint fa-2x text-primary"></i>
                    </div>
                    <h4 class="mb-3">VoIP Solutions</h4>
                    <h6>
                      Modern, Cost-Effective Communication Without Boundaries
                    </h6>
                    <p>
                      Our VoIP systems bring enterprise-grade calling, video
                      conferencing, and collaboration tools into one streamlined
                      platform—designed for scalability and security.
                    </p>
                    <h5>Key Features: </h5>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>HD voice and video calls 
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Unified communications (voice, email, messaging) 
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Call recording and analytics 
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>
                      Integration with Microsoft Teams & CRM 
                    </p>
                    <p class="text-primary fw-medium">
                      <i class="fa fa-check text-success me-2"></i>Flexible remote work setup 
                    </p>
                    <a href="" class="btn bg-white text-primary w-100 mt-2">
                      Upgrade Your Communications Today 
                      <i class="fa fa-arrow-right text-secondary ms-2"></i>
                    </a>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceComponent;
