import React from "react";

function Contact() {
    return (
        <div>
            <section class="contact-section">
                <div class="contact-container">

                    <div class="contact-header">
                        <h2 class="contact-tag">
                            <span class="arrow-icon-small">→</span> Contact
                        </h2>
                        <h3 class="contact-heading-main">Contact</h3>
                    </div>

                    <div class="contact-grid">

                        <div class="contact-info">
                            <h2 class="contact-us-title">Contact us</h2>
                            <p class="contact-description">
                                We are committed to processing the information in order to contact you and talk about your project.
                            </p>

                            <div class="info-details">
                                <div class="info-item">
                                    <span class="yellow-square"></span>
                                    <span>syedali103@gmail.com</span>
                                </div>
                                <div class="info-item">
                                    <span class="yellow-square"></span>
                                    <span>403, avery street, road no-49 near muvago</span>
                                </div>
                                <div class="info-item">
                                    <span class="yellow-square"></span>
                                    <span>+91 930 492 1112</span>
                                </div>
                            </div>
                        </div>

                        <div class="contact-form">
                            <form>
                                <input type="text" placeholder="Name" class="form-input" />
                                <input type="email" placeholder="Email" class="form-input" />
                                <input type="text" placeholder="Website/Poster/Logo/Animation" class="form-input" />
                                <textarea placeholder="Message" class="form-input form-textarea" />
                                <div className="w-100 d-flex justify-content-center">
                                    <button class="portfolio-btn w-25">
                                        Submit
                                        <span class="icon"><i class="fas fa-play"></i></span>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact;