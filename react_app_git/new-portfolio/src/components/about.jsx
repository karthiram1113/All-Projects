import React from "react";
function About (){
    
    return(
        <div>
            <section class="about-section">
                <div class="about-container row">

                    <div class="about-visual col-md-6">
                        <img src="../../piblic/hermon-logo.png" alt="main-logo" />
                    </div>

                    <div class="about-content col-md-6">
                        <p class="about-tag">
                            <span class="arrow-icon">→</span> About Me
                        </p>
                        <h2 class="about-heading">
                            Who is <span class="highlight">Syed Ali?</span>
                        </h2>
                        <p class="about-description">
                            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Dorem ipsum dolor sit amet, consectetur adipiscing elit. Dorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>

                        <div class="about-footer">

                            <div class="about-stats">
                                <div class="stat-item">
                                    <span class="stat-number">600+</span>
                                    <span class="stat-label">Project Completed</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">59+</span>
                                    <span class="stat-label">Client Approach</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">18+</span>
                                    <span class="stat-label">years of exprience</span>
                                </div>
                            </div>

                            <div class="about-action">
                                <button class="about-btn">
                                    Download CV
                                    <span class="icon"><i class="fas fa-play"></i></span>
                                </button>
                                <span class="signature">Syed Ali</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default About;