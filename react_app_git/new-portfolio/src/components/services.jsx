import React from 'react';
import { Link } from 'react-router-dom';



function Services () {
    return(

        <section class="services-section">
            <div class="section-header">
                <div class="section-title">
                    <small>— Services</small>
                    <h2><span>Services</span> | Provide</h2>
                </div>
                <Link to={"/portfolio"} style={{ textDecoration: "none" }}>
                    <button class="portfolio-btn">
                        View My Portfolio
                        <span class="icon"><i class="fas fa-play"></i></span>
                    </button>
                </Link>
                
            </div>

            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon"></div>
                    <div class="service-title">UI/UX Design</div>
                    <div class="service-desc">Consectetur adipiscing elit, do eiusmod tempor Connectetur elit.</div>
                    <a href="#" class="learn-more">Learn more <i class="fas fa-arrow-right"></i></a>
                </div>

                <div class="service-card">
                    <div class="service-icon"></div>
                    <div class="service-title">UI/UX Design</div>
                    <div class="service-desc">Consectetur adipiscing elit, do eiusmod tempor Connectetur elit.</div>
                    <a href="#" class="learn-more">Learn more <i class="fas fa-arrow-right"></i></a>
                </div>

                <div class="service-card">
                    <div class="service-icon"></div>
                    <div class="service-title">UI/UX Design</div>
                    <div class="service-desc">Consectetur adipiscing elit, do eiusmod tempor Connectetur elit.</div>
                    <a href="#" class="learn-more">Learn more <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>

            <div class="dots">•••</div>
        </section>

    )
}
export default Services;