import React from "react";
import Carousel_Img01 from "../../../assets/img/hero-carousel/hero-carousel-1.jpg";
import Carousel_Img02 from "../../../assets/img/hero-carousel//hero-carousel-2.jpg";
import Carousel_Img03 from "../../../assets/img/hero-carousel/hero-carousel-3.jpg";
import Carousel_Img04 from "../../../assets/img/hero-carousel/hero-carousel-4.jpg";
import Carousel_Img05 from "../../../assets/img/hero-carousel/hero-carousel-5.jpg";
import './index.css'
import { Helmet } from "react-helmet";

function Home_Component() {
  return (
    <>
            <Helmet> <title>Home | GreenDart</title> </Helmet>
      <div id="hero" class="hero section dark-background">
        <div class="info d-flex align-items-center">
          <div class="container">
            <div
              class="row justify-content-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="col-lg-6 text-center">
                <h2 className="banner-heading">
                  WELCOME TO <br /> <span style={{ fontSize: "58px", }}>GREEN DART BUILDERS</span>
                </h2>
                <p className="fs-5">
                  Construction, we believe every project is more than just bricks and mortar. it's Residences that offer unforgettable memories close to the heart. Residences where water, land, air, sun and moon are our own. The beauty of the village, the life intertwined with nature, the uniqueness of that house. Wherever we go in the world, Residences should be established places that make us feel like coming back to our mother's lap.
                </p>
                {/* <a href="#get-started" class="btn-get-started">
                  Read more
                  <i className="fa-solid fa-angle-right"></i>
                </a> */}
              </div>


            </div>
          </div>
          {/* </div> */}
        </div>

        <div
          id="hero-carousel"
          class="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div class="carousel-item">
            <img src={Carousel_Img01} alt="" />
          </div>

          <div class="carousel-item active">
            <img src={Carousel_Img02} alt="" />
          </div>

          <div class="carousel-item">
            <img src={Carousel_Img03} alt="" />
          </div>

          <div class="carousel-item">
            <img src={Carousel_Img04} alt="" />
          </div>

          <div class="carousel-item">
            <img src={Carousel_Img05} alt="" />
          </div>

          <a
            class="carousel-control-prev"
            href="#hero-carousel"
            role="button"
            data-bs-slide="prev"
          >
            <span
              class="carousel-control-prev-icon bi bi-chevron-left"
              aria-hidden="true"
            ></span>
          </a>

          <a
            class="carousel-control-next"
            href="#hero-carousel"
            role="button"
            data-bs-slide="next"
          >
            <span
              class="carousel-control-next-icon bi bi-chevron-right"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </div>
      <div className="container">
        <div className="row" style={{
          marginTop: "-77px", zIndex: "2",
          position: "relative", boxShadow: "0 0 0 0px #fff,0 0 0 calc(1px + 0px) oklch(30.39% .04 213.68 / .1),0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1),0 0 #0000"
        }}>

          {/* LEFT SIDE */}
          <div className="col-md-4" style={{ backgroundColor: "#4da3d1" }}>
            <p className="rent-info">
              <h1 className="text-center" style={{ color: "black", fontSize: "2.5em", letterSpacing: "1px", textTransform: "capitalize", fontWeight: 400 }}>
                We Build Spaces that Brings <br /> Smiles
              </h1>
              {/* <h2 style={{ color:"white", letterSpacing:"1px",fontSize:"1.5em",marginTop:"10px" }}>
                  live in dream home
                </h2> */}
              <p className="para-center" style={{ textAlign: "justify", color: "#1b3346", fontSize: "1.1em", fontweight: "300", textTransform: "capitalize", lineHeight: "2em", letterSpacing: "1px"}}>
                We build strong, long-lasting residential Building and commercial building with modern designs and premium materials. We team build homes that stand the test of time.

              </p>
            </p>
          </div>

          {/* RIGHT SIDE – 2 × 2 GRID */}
          <div className="col-md-8">
            <div className="row text-center">

              {/* 1 */}
              <div className="col-md-6 white-bg py-4">
                <i className="fas fa-home homeicon"></i>
                <h3 className="rent-textcolor mt-2">Building Work</h3>
                <p className="rent-para">
                  Building Your dream home and commercial building with a beautiful appearance, Strength, and with the right vasthu Plan.
                </p>
              </div>

              {/* 2 */}
              <div className="col-md-6 white-bg py-4">
                <i className="fas fa-warehouse homeicon"></i>
                <h3 className="rent-textcolor">Drawing</h3>
                <p className="rent-para">
                  We creative drawing 2D and 3D architectural plan and modelling that beautification inside and outside homes space optimization and modern construction principles for every type of project.
                </p>
              </div>

              {/* 3 */}
              <div className="col-md-6 white-bg py-4">
                <i className="fab fa-accusoft homeicon"></i>
                <h3 className="rent-textcolor">Plan Approval</h3>
                <p className="rent-para">
                  We draw Panchayat and Municipal approval plan for the Residential building and Commercial building we construct.
                </p>
              </div>

              {/* 4 */}
              <div className="col-md-6 white-bg py-4">
                <i className="fab fa-monero homeicon"></i>
                <h3 className="rent-textcolor">Housing loan</h3>
                <p className="rent-para">
                  We arrange for you to get financial assistance from government-approved banks to build a house.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home_Component;
