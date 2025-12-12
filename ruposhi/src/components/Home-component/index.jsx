import React from "react";
import CardImage1 from "../../assets/img/all/buynow.jpg";
import CardImage2 from "../../assets/img/all/it.jpg";
import "./index.css";
import Footer from "../../shared/Footer";

function Home_Component() {
  return (
    <>
      {/* <div
        id="spinner"
        class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          class="spinner-border text-primary"
          style={{width: "3rem", height: "3rem"}}
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div> */}

      <div className="container mt-5">
        <h1>
          "Your Complete IT & Office Solutions Partner – Trusted by Business &
          Government"
        </h1>
        <p>Official Crown Commercial Service Marketplace Supplier</p>
        <h6>
          "From the latest business-grade hardware to expert managed IT services
          – Ruposhi Global delivers everything you need to work smarter, faster,
          and more securely, all under one roof."
        </h6>

        <div className="row">
          <div className="col-md-6 mt-5">
            <div class="card home-card">
              <div class="home-card-image">
                <img src={CardImage1} />
              </div>
              <div class="home-card-text">
                {/* <p class="home-card-meal-type">Buy Tech</p> */}
                <h2 class="home-card-title">Buy Tech</h2>
                <p class="home-card-body">
                  Explore our wide range of business-grade laptops, desktops,
                  printers, networking equipment, software, and office supplies
                  – all from trusted brands and available for fast delivery.
                  Competitive pricing for B2B and public sector buyers.
                </p>
              </div>
              <div class="home-card-price">Shop Now</div>
            </div>
          </div>
          <div className="col-md-6 mt-5">
            <div class="card home-card">
              <div class="home-card-image">
                <img src={CardImage2} />
              </div>
              <div class="home-card-text">
                {/* <p class="home-card-meal-type">Buy Tech</p> */}
                <h2 class="home-card-title">Managed IT</h2>
                <p class="home-card-body">
                  Keep your business running smoothly with 24/7 monitoring,
                  expert support, cybersecurity, cloud solutions, and IT cost
                  optimisation – tailored to your needs. From small businesses
                  to large government departments, we deliver reliable,
                  compliant IT services.
                </p>
              </div>
              <div class="home-card-price">Learn More</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home_Component;
