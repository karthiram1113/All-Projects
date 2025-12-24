import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
function AboutStats(){
  const { ref, inView } = useInView({
    triggerOnce: true,  
    threshold: 0.3      
  });
    return(
      <>
        <section id="stats-counter" className="stats-counter section mt-5">

            <div className="container section-title" data-aos="fade-up">
              <h2>Stats</h2>
              <p>
                Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
              </p>
            </div>

            <div ref={ref} className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row gy-4 pb-4">

                {/* Stats Item 1 */}
                <div className="col-lg-3 col-md-6">
                  <div className="stats-item text-start d-flex align-items-center w-100 h-100">
                    <i className="bi bi-emoji-smile color-blue flex-shrink-0"></i>
                     <div>
                    {inView && <CountUp start={0} end={232} duration={1} />}
                    <p>Happy Clients</p>
                  </div>
                  </div>
                </div>

                {/* Stats Item 2 */}
                <div className="col-lg-3 col-md-6">
                  <div className="stats-item text-start d-flex align-items-center w-100 h-100">
                    <i className="bi bi-journal-richtext color-orange flex-shrink-0"></i>
                    <div>
                     {inView && <CountUp start={0} end={521} duration={1} />}
                      <p>Projects</p>
                    </div>
                  </div>
                </div>

                {/* Stats Item 3 */}
                <div className="col-lg-3 col-md-6">
                  <div className="stats-item text-start d-flex align-items-center w-100 h-100">
                    <i className="bi bi-headset color-green flex-shrink-0"></i>
                    <div>
                      {inView && <CountUp start={0} end={1463} duration={1} />}
                      <p>Hours Of Support</p>
                    </div>
                  </div>
                </div>

                {/* Stats Item 4 */}
                <div className="col-lg-3 col-md-6">
                  <div className="stats-item text-start d-flex align-items-center w-100 h-100">
                    <i className="bi bi-people color-pink flex-shrink-0"></i>
                    <div>
                      {inView && <CountUp start={0} end={15} duration={3} />}
                      <p>Hard Workers</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </section>
      </>
    )
}
export default AboutStats;