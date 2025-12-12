import React from "react";
import { Link } from "react-router-dom";

function Portfolio(){
    return(
        <div>
            <section class="portfolio-work-section">
                <div class="portfolio-work-container">

                    <div class="portfolio-header">
                        <h2 class="section-title-portfolio">
                            <span class="arrow-icon-small">→</span> Portfolio <span class="divider">|</span> Work
                        </h2>
                        <Link to={"/contact"} style={{ textDecoration: "none" }}>
                            <button class="portfolio-btn">
                                Contact me
                                <span class="icon"><i class="fas fa-play"></i></span>
                            </button>
                        </Link>
                    
                    </div>

                    <div class="work-grid">

                        <div class="work-item">
                            <h3 class="work-title">Graphic Design</h3>
                            <div class="work-image-placeholder"></div>
                            <p class="work-description">
                                Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec.
                            </p>
                        </div>

                        <div class="work-item">
                            <h3 class="work-title">Logo Design</h3>
                            <div class="work-image-placeholder"></div>
                            <p class="work-description">
                                Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec.
                            </p>
                        </div>

                        <div class="work-item">
                            <h3 class="work-title">Animation Design</h3>
                            <div class="work-image-placeholder"></div>
                            <p class="work-description">
                                Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec.
                            </p>
                        </div>

                        <div class="work-item">
                            <h3 class="work-title">Web Design</h3>
                            <div class="work-image-placeholder"></div>
                            <p class="work-description">
                                Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
export default Portfolio;