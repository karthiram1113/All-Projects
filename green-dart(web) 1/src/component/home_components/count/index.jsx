import React from "react";
import Image01 from "../../../assets/img/home/alt-services.jpg";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import './index.css'

function Home_Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,   
    threshold: 0.3       
  });
  return (
    <>
      <div className="container section-title mt-5" data-aos="fade-up">
        <h2>Stats</h2>
        <p>
          Building trust through quality, innovation, and dedication.
        </p>
      </div>
          <div ref={ref} className="container-fluid mb-5 " style={{ backgroundColor:"#edfbff"}} data-aos="fade-up" data-aos-delay="100">
              <div className="row p-2">

              {/* Stat Item 1 */}
              <div className="col-lg-3 col-md-6">
                <div className="stats-card p-4 text-center" >
                  <div className="icon-circle" style={{ color: '#096ad8' }}>
                              <i className="bi-vector-pen fs-2"></i>
                  </div>
                  <h1 className="fw-bold text-primary mb-1 number-stats mt-2">
                    {inView && <CountUp start={0} end={120} duration={5} />}+
                  </h1>
                  <p className="fs-4 fw-bold text-muted">Desing Drawing</p>
                </div>
              </div>

              {/* Stat Item 2 */}
              <div className="col-lg-3 col-md-6">
                <div className="stats-card p-4 text-center" >
                  <div className="icon-circle" style={{ color: '#096ad8' }}>
                              <i className="bi-clipboard-check fs-2"></i>
                  </div>
                  <h1 className="fw-bold text-primary mb-1 number-stats mt-2">
                    {inView && <CountUp start={0} end={60} duration={5} />}+
                  </h1>
                  <p className="fs-4 fw-bold text-muted">Project Completed</p>
                </div>
              </div>

              {/* Stat Item 3 */}
              <div className="col-lg-3 col-md-6">
                <div className="stats-card p-4 text-center" >
                  <div className="icon-circle" style={{ color: '#096ad8' }}>
                              <i class="bi-hand-thumbs-up fs-2"></i>
                  </div>
                  <h1 className="fw-bold text-primary mb-1 number-stats mt-2">
                    {inView && <CountUp start={0} end={120} duration={5} />}+
                  </h1>
                  <p className="fs-4 fw-bold text-muted">Happy Clients</p>
                </div>
              </div>

              {/* Stat Item 4 */}
              <div className="col-lg-3 col-md-6">
                <div className="stats-card p-4 text-center" >
                  <div className="icon-circle" style={{ color: '#096ad8' }}>
                              <i className="bi bi-people fs-2"></i>
                  </div>
                  <h1 className="fw-bold text-primary mb-1 number-stats mt-2">
                    {inView && <CountUp start={0} end={17} duration={5} />}+
                  </h1>
                  <p className="fs-4 fw-bold text-muted">Hard Workers Team</p>
                </div>
              </div>

            </div>
          </div>
    </>
  );
}

export default Home_Stats;
