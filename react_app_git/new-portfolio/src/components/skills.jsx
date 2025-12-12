import React from "react";
import { Link } from "react-router-dom";
function Skills(){
    return(
        <div>
            <section class="skills-section">
                <div class="skills-container">

                  <div class="skills-header">
                        <h2 class="section-title">
                            <span class="arrow-icon">→</span> Skills <span class="divider">|</span> Ability
                        </h2>
                        <Link to={"/portfolio"} style={{ textDecoration: "none" }}>
                            <button class="portfolio-btn">
                                View My Portfolio
                                <span class="icon"><i class="fas fa-play"></i></span>
                            </button>
                        </Link>
                    </div>

                   <div class="top-skills-grid">
                       <div class="skill-item">
                            <div class="skill-icon-placeholder"></div>
                            <p class="skill-name">HTML/CSS</p>
                            <div class="skill-progress-bar">
                                <div class="progress-fill" style={{width: "90%"}}></div>
                            </div>
                        </div>
                      <div class="skill-item">
                            <div class="skill-icon-placeholder"></div>
                            <p class="skill-name">JAVA SCRIPT</p>
                            <div class="skill-progress-bar">
                                <div class="progress-fill" style={{width: "85%"}}></div>
                            </div>
                        </div>
                       <div class="skill-item">
                            <div class="skill-icon-placeholder"></div>
                            <p class="skill-name">REACT</p>
                            <div class="skill-progress-bar">
                                <div class="progress-fill" style={{width: "92%"}}></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-icon-placeholder"></div>
                            <p class="skill-name">JAVA</p>
                            <div class="skill-progress-bar">
                                <div class="progress-fill" style={{width: "75%"}}></div>
                            </div>
                        </div>
                       <div class="skill-item">
                            <div class="skill-icon-placeholder"></div>
                            <p class="skill-name">SQL</p>
                            <div class="skill-progress-bar">
                                <div class="progress-fill" style={{width: "88%"}}></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-icon-placeholder"></div>
                            <p class="skill-name">SDLC</p>
                            <div class="skill-progress-bar">
                                <div class="progress-fill" style={{width: "80%"}}></div>
                            </div>
                        </div>
                       <div class="skill-item">
                            <div class="skill-icon-placeholder"></div>
                            <p class="skill-name">SERVLET</p>
                            <div class="skill-progress-bar">
                                <div class="progress-fill" style={{width: "70%"}}></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-icon-placeholder"></div>
                            <p class="skill-name">JDBC</p>
                            <div class="skill-progress-bar">
                                <div class="progress-fill" style={{width: "65%"}}></div>
                            </div>
                        </div>
                    </div>

                    <div class="favorite-tools-header">
                        <p class="about-tag">
                            <span class="arrow-icon">→</span> My Favorite Tools
                        </p>
                        <h3 class="tools-heading">
                            EXPLORING <span class="highlight">the Tools</span> Behind My Designs
                        </h3>
                    </div>

                  <div class="tool-progress-grid">
                      <div class="tool-item">
                            <div class="circle-progress" data-percentage="98">
                                <svg class="progress-svg" viewBox="0 0 100 100">
                                    <circle class="progress-bg" cx="50" cy="50" r="45"></circle>
                                    <circle class="progress-bar" cx="50" cy="50" r="45" style={{ '--percentage': 98 }}></circle>
                                </svg>
                                <span class="percentage-text">98%</span>
                            </div>
                            <p class="tool-name">Figma</p>
                        </div>
                       <div class="tool-item">
                            <div class="circle-progress" data-percentage="95">
                                <svg class="progress-svg" viewBox="0 0 100 100">
                                    <circle class="progress-bg" cx="50" cy="50" r="45"></circle>
                                    <circle class="progress-bar" cx="50" cy="50" r="45" style={{ '--percentage': 95 }}></circle>
                                </svg>
                                <span class="percentage-text">95%</span>
                            </div>
                            <p class="tool-name">Photo Shop</p>
                        </div>
                   <div class="tool-item">
                            <div class="circle-progress" data-percentage="99">
                                <svg class="progress-svg" viewBox="0 0 100 100">
                                    <circle class="progress-bg" cx="50" cy="50" r="45"></circle>
                                    <circle class="progress-bar" cx="50" cy="50" r="45" style={{ '--percentage': 99 }}></circle>
                                </svg>
                                <span class="percentage-text">99%</span>
                            </div>
                            <p class="tool-name">Illustrate</p>
                        </div>
                      <div class="tool-item">
                            <div class="circle-progress" data-percentage="82">
                                <svg class="progress-svg" viewBox="0 0 100 100">
                                    <circle class="progress-bg" cx="50" cy="50" r="45"></circle>
                                    <circle class="progress-bar" cx="50" cy="50" r="45" style={{ '--percentage': 82 }} ></circle>
                                </svg>
                                <span class="percentage-text">82%</span>
                            </div>
                            <p class="tool-name">After effects</p>
                        </div>
                       <div class="tool-item">
                            <div class="circle-progress" data-percentage="67">
                                <svg class="progress-svg" viewBox="0 0 100 100">
                                    <circle class="progress-bg" cx="50" cy="50" r="45"></circle>
                                    <circle class="progress-bar" cx="50" cy="50" r="45" style={{ '--percentage': 67 }}></circle>
                                </svg>
                                <span class="percentage-text">67%</span>
                            </div>
                            <p class="tool-name">Blender</p>
                        </div>
                 <div class="tool-item">
                            <div class="circle-progress" data-percentage="90">
                                <svg class="progress-svg" viewBox="0 0 100 100">
                                    <circle class="progress-bg" cx="50" cy="50" r="45"></circle>
                                    <circle class="progress-bar" cx="50" cy="50" r="45" style={{ '--percentage': 90 }} ></circle>
                                </svg>
                                <span class="percentage-text">90%</span>
                            </div>
                            <p class="tool-name">adobe xd</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
export default Skills;