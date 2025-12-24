import React, { useState } from "react";
import UserAPI from "../../../api/services/userapi";
import { toast } from "react-toastify";
function Contact_detailes() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "", phone: ""
  })
  const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
  const [submit, setSubmit] = useState(false);
  //  const handleSubmit=()=>{
  //   setSubmit(true);
  //  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async () => {
    setSubmit(true);
    if (!formData?.name || !formData?.email || !formData?.subject || !formData?.message || !formData?.phone) {
      return
    }
    try {
      const responseData = await UserAPI.contactCreateAPI({
        userDetails: {
          Name: formData?.name,
          Email: formData?.email,
          Phone: formData?.phone,
          Subject: formData?.subject,
          Message: formData?.message
        }
      });
      if (responseData.apiStatus.code == "200") {
        toast.success(responseData.apiStatus.message);
        setFormData({
          name: "", email: "", subject: "", message: "", phone: ""
        })
        console.error(responseData.apiStatus.message);
        setSubmit(false);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section id="contact" className="contact section mt-5">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row gy-4">

          <div className="col-lg-6">
            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
              <i className="bi bi-geo-alt"></i>
              <h3>Address</h3>
              <p>A108 Adam Street, New York, NY 535022</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-telephone"></i>
              <h3>Call Us</h3>
              <p>+91 8300112755</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-telephone"></i>
              <h3>Email Us</h3>
              <p>greendartbuilders@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="row gy-4 mt-4 pb-2">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d306.2002293105626!2d77.23408912883629!3d8.287713347822887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0455279264e2d7%3A0x727fc0680c92b34d!2sGREEN%20DART%20BUILDERS%20%26%20DEVELOPERS!5e1!3m2!1sen!2sin!4v1765887159520!5m2!1sen!2sin%22"
              frameBorder="0" style={{ border: 0, width: "100%", height: "550px" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div className="col-lg-6">
            <form action={handleSubmit} className="text-start php-email-form" data-aos="fade-up" data-aos-delay="400">
              <h6>Contact Us</h6>
              <h4>How Can We Help You?</h4>
              <div className="row gy-4 pt-2">

                <div className="col-md-12">
                  <input type="text" value={formData.name} onChange={handleChange}
                    name="name" class={`form-control ${submit && !formData.name ? "inputError" : ""}`} placeholder="Your Name" />
                </div>
                {submit && formData.name == 0 ? <div className='text-danger error-message-required mt-1 text-start'>Name is required</div> : <></>}


                <div className="col-md-12">
                  <input type="email" value={formData.email} onChange={handleChange} class={`form-control ${submit && !formData.email || (formData.email.length > 0 && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) ? "inputError" : ""}`} name="email" placeholder="Your Email" />
                </div>
                {submit && formData.email.length === 0 ? (
                  <div className="text-danger error-message-required mt-1 text-start">Email is required</div>
                ) : (
                  <>

                    {formData.email.length > 0 && !EMAIL_VALIDATION_REGEX.test(formData.email) && (
                      <div className="text-danger error-message-required mt-1 text-start">Invalid email format</div>
                    )}
                  </>
                )}
                <div className="col-md-12">
                  <input type="text" maxlength="10" value={formData.phone} onChange={handleChange} class={`form-control ${submit && !formData.phone ? "inputError" : ""}`} name="phone" placeholder="Phone" />
                </div>
                {submit && formData.phone == 0 ? <div className='text-danger error-message-required mt-1 text-start'>Phone number is required</div> : <></>}

                <div className="col-md-12">
                  <input type="text" value={formData.subject} onChange={handleChange} class={`form-control ${submit && !formData.subject ? "inputError" : ""}`} name="subject" placeholder="Subject" />
                </div>
                {submit && formData.subject == 0 ? <div className='text-danger error-message-required mt-1 text-start'>Subject is required</div> : <></>}


                <div className="col-md-12">
                  <textarea class={`form-control ${submit && !formData.message ? "inputError" : ""}`} value={formData.message} onChange={handleChange} name="message" rows="6" placeholder="Message"></textarea>
                </div>
                {submit && formData.message == 0 ? <div className='text-danger error-message-required mt-1 text-start'>Message is required</div> : <></>}


                <div className="col-md-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>

                  <button type="submit">Send Message</button>
                </div>

              </div>
            </form>
          </div>

        </div>

      </div>

    </section>
  )
}
export default Contact_detailes;