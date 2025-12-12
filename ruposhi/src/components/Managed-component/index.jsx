import React from "react";
import "./index.css";
import Footer from "../../shared/Footer";

function Managed_Component() {
    return (
        <>
            <div class="container-fluid page-header mb-5 py-5">
                <div class="container text-start">
                    <h1 class="display-3 text-white mb-3 animated slideInDown">
                        Managed-It
                    </h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol class="breadcrumb text-uppercase">
                            <li class="breadcrumb-item">
                                <a class="text-white" href="/">
                                    Home
                                </a>
                            </li>
                            {/* <li class="breadcrumb-item">
                <a class="text-white" href="#">
                  Pages
                </a>
              </li> */}
                            <li class="breadcrumb-item text-white active" aria-current="page">
                                Managed-It
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section class="hero-section text-white text-center">
                <div class="container">
                    <h1 class="display-4 fw-bold mb-3">Managed IT Services – Reliable, Secure, and Tailored to Your Needs</h1>
                    <p class="lead mb-4">Keep your organisation running at peak performance with our expert IT support, cybersecurity, and cloud solutions – trusted by UK businesses and the public sector.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-center">
                        <a href="#consultation-form" class="btn btn-custom-primary btn-lg px-4 me-md-2 bg-primary border-0" role="button">Request a Consultation</a>
                        <a href="tel:+44XXXXXXXXXX" class="btn btn-custom-secondary btn-lg px-4" role="button">Call Us Now</a>
                    </div>
                </div>
            </section>

            <section class="py-5">
                <div class="container">
                    <h2 class="text-center mb-5 fw-bold">Our Core Services</h2>
                    <div class="row g-4">
                        <div className="col-md-6 col-lg-3">
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    {/* <!-- Front --> */}
                                    <div class="flip-card-front">
                                        <div class="card-body">
                                            <div class="icon-square mb-3">
                                                <i class="fas fa-headset fa-2x"></i>
                                            </div>
                                            <h5 class="card-title">Fully Managed IT Support</h5>
                                        <p class="card-text text-muted">24/7 monitoring, helpdesk, and onsite visits.</p>
                                        </div>
                                    </div>
                                    {/* <!-- Back --> */}
                                    <div class="flip-card-back">
                                        <div class="card-body">
                                            <h5 class="card-title">More Info</h5>
                                        <p class="card-text">Fully managed services can offer you.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    {/* <!-- Front --> */}
                                    <div class="flip-card-front">
                                        <div class="card-body">
                                            <div class="icon-square mb-3">
                                                <i class="fas fa-shield-alt fa-2x"></i>
                                            </div>
                                            <h5 class="card-title">Cybersecurity</h5>
                                        <p class="card-text text-muted">Threat protection, compliance, and risk management.</p>
                                        </div>
                                    </div>
                                    {/* <!-- Back --> */}
                                    <div class="flip-card-back">
                                        <div class="card-body">
                                            <h5 class="card-title">More Info</h5>
                                        <p class="card-text">Systems and data from cyberattacks by using various technologies.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                {/* <!-- Front --> */}
                                <div class="flip-card-front">
                                    <div class="card-body">
                                        <div class="icon-square mb-3">
                                            <i class="fas fa-dollar-sign fa-2x"></i>
                                        </div>
                                        <h5 class="card-title">IT Cost Optimisation</h5>
                                        <p class="card-text text-muted">Reduce IT spend without compromising performance.</p>
                                    </div>
                                </div>
                                {/* <!-- Back --> */}
                                <div class="flip-card-back">
                                    <div class="card-body">
                                        <h5 class="card-title">More Info</h5>
                                        <p class="card-text">This involves streamlining processes, automating operations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                {/* <!-- Front --> */}
                                <div class="flip-card-front">
                                    <div class="card-body">
                                        <div class="icon-square mb-3">
                                            <i class="fas fa-globe fa-2x"></i>
                                        </div>
                                        <h5 class="card-title">Business-Grade Internet</h5>
                                        <p class="card-text text-muted">High-speed, secure connectivity solutions.</p>
                                    </div>
                                </div>
                                {/* <!-- Back --> */}
                                <div class="flip-card-back">
                                    <div class="card-body">
                                        <h5 class="card-title">More Info</h5>
                                        <p class="card-text">high-speed, reliable internet service designed for businesses, offering features and support tailored to their needs. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    {/* <!-- Front --> */}
                                    <div class="flip-card-front">
                                        <div class="card-body">
                                            <div class="icon-square mb-3">
                                                <i class="fas fa-phone-alt fa-2x"></i>
                                            </div>
                                            <h5 class="card-title">VoIP Solutions</h5>
                                            <p class="card-text text-muted">Cloud-based telephony for modern workplaces.</p>
                                        </div>
                                    </div>
                                    {/* <!-- Back --> */}
                                    <div class="flip-card-back">
                                        <div class="card-body">
                                            <h5 class="card-title">More Info</h5>
                                            <p class="card-text">VoIP (Voice over Internet Protocol) solution allows you to make phone calls over the internet instead of traditional phone lines.  </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    {/* <!-- Front --> */}
                                    <div class="flip-card-front">
                                        <div class="card-body">
                                            <div class="icon-square mb-3">
                                                <i class="fas fa-sitemap fa-2x"></i>
                                            </div>
                                            <h5 class="card-title">IT Consultation</h5>
                                            <p class="card-text text-muted">Strategic IT planning and infrastructure design.</p>
                                        </div>
                                    </div>
                                    {/* <!-- Back --> */}
                                    <div class="flip-card-back">
                                        <div class="card-body">
                                            <h5 class="card-title">More Info</h5>
                                            <p class="card-text">professional service where experts advise organizations on how to use information technology to achieve business goals by identifying challenges, recommending solutions, and overseeing implementation.  </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    {/* <!-- Front --> */}
                                    <div class="flip-card-front">
                                        <div class="card-body">
                                            <div class="icon-square mb-3">
                                                <i class="fas fa-print fa-2x"></i>
                                            </div>
                                            <h5 class="card-title">Managed Printing</h5>
                                            <p class="card-text text-muted">Energy-efficient print services with sustainability focus.</p>
                                        </div>
                                    </div>
                                    {/* <!-- Back --> */}
                                    <div class="flip-card-back">
                                        <div class="card-body">
                                            <h5 class="card-title">More Info</h5>
                                            <p class="card-text">Xerox Managed Print Services uses comprehensive security, analytics, digitisation and cloud technologies and software.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    {/* <!-- Front --> */}
                                    <div class="flip-card-front">
                                        <div class="card-body">
                                            <div class="icon-square mb-3">
                                                <i class="fas fa-robot fa-2x"></i>
                                            </div>
                                            <h5 class="card-title">AI & Automation Solutions</h5>
                                            <p class="card-text text-muted">Smarter business operations powered by AI.</p>
                                        </div>
                                    </div>
                                    {/* <!-- Back --> */}
                                    <div class="flip-card-back">
                                        <div class="card-body">
                                            <h5 class="card-title">More Info</h5>
                                            <p class="card-text">combine artificial intelligence (AI) with automated systems to streamline business processes, improve decision-making, and reduce manual labor by enabling machines to learn, adapt, and perform complex tasks. .</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-5 bg-light why-choose-us">
                <div class="container">
                    <h2 class="text-center mb-5 fw-bold">Why Choose Us</h2>
                    <div class="row text-center justify-content-center">
                        <div class="col-md-8">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <i class="fas fa-check-circle fa-2x"></i>
                                    <h5 class="d-inline-block ms-3">Official Crown Commercial Service Marketplace Supplier</h5>
                                </li>
                                <li class="list-group-item">
                                    <i class="fas fa-check-circle fa-2x"></i>
                                    <h5 class="d-inline-block ms-3">Public & private sector experience</h5>
                                </li>
                                <li class="list-group-item">
                                    <i class="fas fa-check-circle fa-2x"></i>
                                    <h5 class="d-inline-block ms-3">UK-based support team</h5>
                                </li>
                                <li class="list-group-item">
                                    <i class="fas fa-check-circle fa-2x"></i>
                                    <h5 class="d-inline-block ms-3">Punchout integration with your procurement system</h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="quick-contact-sticky">
                <a href="#quick-enquiry" class="btn btn-success btn-lg btn-support rounded-pill shadow">
                    <i class="fas fa-comments me-2"></i> Get Support
                </a>
            </section>

            <section id="quick-enquiry" class="py-5">
                <div class="container">
                    <h2 class="text-center mb-4 fw-bold">Get In Touch</h2>
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="card p-4 shadow">
                                <form>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label for="name" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="name" required/>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email" required/>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="organization" class="form-label">Organisation</label>
                                            <input type="text" class="form-control" id="organization" required/>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="service" class="form-label">Service Needed</label>
                                            <select id="service" class="form-select" required>
                                                <option selected>Choose...</option>
                                                <option>Fully Managed IT Support</option>
                                                <option>Cybersecurity</option>
                                                <option>IT Cost Optimisation</option>
                                                <option>Business-Grade Internet</option>
                                                <option>VoIP Solutions</option>
                                                <option>IT Consultation</option>
                                                <option>Managed Printing</option>
                                                <option>AI & Automation Solutions</option>
                                            </select>
                                        </div>
                                        <div class="col-12">
                                            <label for="message" class="form-label">Message</label>
                                            <textarea class="form-control" id="message" rows="4" required></textarea>
                                        </div>
                                        <div class="col-12 text-center">
                                            <button type="submit" class="btn btn-custom-primary btn-lg px-4 bg-primary border-0">Submit Enquiry</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="text-center mt-4">
                                <p class="lead mb-2">Prefer to speak to someone directly?</p>
                                <p class="mb-1"><a href="tel:+44XXXXXXXXXX" class="text-decoration-none text-dark"><i class="fas fa-phone me-2"></i> +44 XXXXXXXXXX</a></p>
                                <p><a href="mailto:info@ruposhi.co.uk" class="text-decoration-none text-dark"><i class="fas fa-envelope me-2"></i> info@ruposhi.co.uk</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Managed_Component;
