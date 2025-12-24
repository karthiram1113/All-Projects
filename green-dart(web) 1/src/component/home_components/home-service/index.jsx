import React from "react";

function Home_Service() {
  return (
    <>
      <section id="services" class="services section light-background mt-5 pt-5 pb-5">
        <div class="container section-title" data-aos="fade-up">
          <h2>ECO-FRIENDLY LOW COST GREEN BUILDING</h2>
          <p>
            Green Dart Builders and Developers is a construction company that specializes in building sustainable and eco-friendly homes. we focus on creating energy-efficient, environmentally responsible, and healthy living spaces. Here are some key points about the company.
          </p>
        </div>

        <div class="container text-start">
          <div class="row gy-4">
            <div
              class="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="service-item  position-relative">
                <div class="icon">
                  <i class="bi bi-building-check"></i>
                </div>
                <h3>Sustainable Building</h3>
                <p>
                  We provide prioritize sustainable building practices, using materials and techniques that minimize environmental impact.
                </p>

                {/* <a href="#" class="readmore stretched-link">
                  Read more <i class="bi bi-arrow-right"></i>
                </a> */}
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-house-heart"></i>
                </div>
                <h3>Eco-Friendly Homes</h3>
                <p>
                  We design and build homes that are energy-efficient, reducing carbon footprints and promoting a healthier environment.
                </p>

                {/* <a href="#" class="readmore stretched-link">
                  Read more <i class="bi bi-arrow-right"></i>
                </a> */}
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-fire"></i>
                </div>
                <h3>Biogas</h3>
                <p>
                  biogas when compared to fossil fuels and conventional waste disposal is generally considered eco-friendly and a renewable energy source. We help with biogas services in particular.
                </p>

                {/* <a href="#" class="readmore stretched-link">
                  Read more <i class="bi bi-arrow-right"></i>
                </a> */}
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-tools"></i>
                </div>
                <h3>Custom Building</h3>
                <p>
                  Offer custom building services, working with clients to create unique, sustainable Eco-Friendly Homes that meet their needs.
                </p>

                {/* <a href="#" class="readmore stretched-link">
                  Read more <i class="bi bi-arrow-right"></i>
                </a> */}
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-sun"></i>
                </div>
                <h3>Renewable Energy</h3>
                <p>
                  We incorporate renewable energy systems, such as solar power, into their building projects.
                </p>

                {/* <a href="#" class="readmore stretched-link">
                  Read more <i class="bi bi-arrow-right"></i>
                </a> */}
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-lightbulb"></i>
                </div>
                <h3>Innovative Design</h3>
                <p>
                  We company uses innovative design techniques to create sustainable, functional, and beautiful living spaces.
                </p>

                {/* <a href="#" class="readmore stretched-link">
                  Read more <i class="bi bi-arrow-right"></i>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home_Service;
