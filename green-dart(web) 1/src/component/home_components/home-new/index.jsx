import React from "react";
import NewImg01 from "../../../assets/img/blog/blog-1.jpg";
import NewImg02 from "../../../assets/img/blog/blog-2.jpg";
import NewImg03 from "../../../assets/img/blog/blog-3.jpg";

function Home_New() {
  return (
    <>
      <section id="recent-blog-posts" class="recent-blog-posts section">
        <div class="container section-title" data-aos="fade-up">
          <h2>Recent Blog Posts</h2>
          <p>
            Stay updated with the latest trends, insights, and project
            highlights from the world of construction, architecture, and
            infrastructure development.
          </p>
        </div>

        <div class="container text-start">
          <div class="row gy-5">
            <div class="col-xl-4 col-md-6">
              <div
                class="post-item position-relative h-100"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div class="post-img position-relative overflow-hidden">
                  <img src={NewImg01} class="img-fluid" alt="" />
                  <span class="post-date">December 12</span>
                </div>

                <div class="post-content d-flex flex-column">
                  <h3 class="post-title">
                    Evolving Trends in Modern Residential Construction
                  </h3>

                  <div class="meta d-flex align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-person"></i>{" "}
                      <span class="ps-2">Construction</span>
                    </div>
                    <span class="px-3 text-black-50">/</span>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-folder2"></i>{" "}
                      <span class="ps-2">Arun Kumar</span>
                    </div>
                  </div>

                  <hr />

                  {/* <a href="blog-details.html" class="readmore stretched-link">
                    <span>Read More</span>
                    <i class="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-md-6">
              <div
                class="post-item position-relative h-100"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div class="post-img position-relative overflow-hidden">
                  <img src={NewImg02} class="img-fluid" alt="" />
                  <span class="post-date">July 17</span>
                </div>

                <div class="post-content d-flex flex-column">
                  <h3 class="post-title">
                   How Quality Materials Improve the Life of a Building
                  </h3>

                  <div class="meta d-flex align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-person"></i>{" "}
                      <span class="ps-2">Engineering</span>
                    </div>
                    <span class="px-3 text-black-50">/</span>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-folder2"></i>{" "}
                      <span class="ps-2">Meera Johnson</span>
                    </div>
                  </div>

                  <hr />

                  {/* <a href="blog-details.html" class="readmore stretched-link">
                    <span>Read More</span>
                    <i class="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>
            </div>

            <div
              class="col-xl-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div class="post-item position-relative h-100">
                <div class="post-img position-relative overflow-hidden">
                  <img src={NewImg03} class="img-fluid" alt="" />
                  <span class="post-date">September 05</span>
                </div>

                <div class="post-content d-flex flex-column">
                  <h3 class="post-title">
                    Top Safety Standards Every Construction Site Must Follow
                  </h3>

                  <div class="meta d-flex align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-person"></i>{" "}
                      <span class="ps-2">Safety</span>
                    </div>
                    <span class="px-3 text-black-50">/</span>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-folder2"></i>{" "}
                      <span class="ps-2">Vignesh Raman</span>
                    </div>
                  </div>

                  <hr />

                  {/* <a href="blog-details.html" class="readmore stretched-link">
                    <span>Read More</span>
                    <i class="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home_New;
