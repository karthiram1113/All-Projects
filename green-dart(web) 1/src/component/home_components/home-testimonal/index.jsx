import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import TestimonalImg01 from '../../../assets/img/testimonials/testimonials-1.jpg'
import TestimonalImg02 from '../../../assets/img/testimonials/testimonials-2.jpg'
import TestimonalImg03 from '../../../assets/img/testimonials/testimonials-3.jpg'
import TestimonalImg04 from '../../../assets/img/testimonials/testimonials-4.jpg'
import TestimonalImg05 from '../../../assets/img/testimonials/testimonials-5.jpg'

import "swiper/css";
import "swiper/css/pagination";

function Home_Testimonial() {
  return (
    <>
      {/* <section id="testimonials" className="testimonials section">

        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>

        <div className="container text-start" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={true}
            speed={600}
            autoplay={{ delay: 3000 }}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 40 },
              1200: { slidesPerView: 2, spaceBetween: 20 },
            }}
            className="mySwiper"
          > */}
            {/* ----- Slide 1 ----- */}
            {/* <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src={TestimonalImg01}
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Saul Goodman</h3>
                  <h4>Ceo & Founder</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Proin iaculis purus consequat sem cure digni ssim donec porttitora entum.
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide> */}

            {/* ----- Slide 2 ----- */}
            {/* <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src={TestimonalImg02}
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Sara Wilsson</h3>
                  <h4>Designer</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Export tempor illum tamen malis malis eram quae irure esse labore.
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide> */}

            {/* SAME WAY add other slides... */}

              {/* <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src={TestimonalImg03}
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Sara Wilsson</h3>
                  <h4>Designer</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Export tempor illum tamen malis malis eram quae irure esse labore.
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>
              <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src={TestimonalImg04}
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Sara Wilsson</h3>
                  <h4>Designer</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Export tempor illum tamen malis malis eram quae irure esse labore.
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>
              <SwiperSlide>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src={TestimonalImg05}
                    className="testimonial-img"
                    alt=""
                  />
                  <h3>Sara Wilsson</h3>
                  <h4>Designer</h4>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>
                      Export tempor illum tamen malis malis eram quae irure esse labore.
                    </span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section> */}
    </>
  );
}

export default Home_Testimonial;
