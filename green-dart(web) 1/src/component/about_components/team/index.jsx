import React, { useEffect, useState } from "react";
import team1 from "../../../assets/img/about/team1.jpg"
import team2 from "../../../assets/img/about/team2.jpg"
import team3 from "../../../assets/img/about/team3.jpg"
import team4 from "../../../assets/img/about/team4.jpg"
import team5 from "../../../assets/img/about/team5.jpg"
import team6 from "../../../assets/img/about/team6.jpg"
import UserAPI from "../../../api/services/userapi";
import { baseURL } from "../../../api/api";
import { Link } from "react-router-dom";
import NoDataFound from '../../../assets/img/nodata-found.png';

function Team() {
  const [teamList, setteamList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [recordsPerPage, setrecordsPerPage] = useState(10);
  const teamListAPI = async () => {
    // setLoading(true);
    try {
      const responseData = await UserAPI.teamListAPI({
        pageIndex: currentPage - 1,
        dataLength: recordsPerPage,
      });
      if (responseData.apiStatus.code === "200") {
        setteamList(responseData.responseData.teamList);
        const totalRecords = responseData.responseData.totalRecordCount;
        setTotalRecords(totalRecords);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    teamListAPI();
  }, []);
  return (
    <section id="team" className="team section mt-5">

      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Team</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">

        <div className="row gy-5">
          {teamList.length === 0 ? (
            <div className="d-flex justify-content-center">
              <img
                src={NoDataFound}
                alt="No data found"
                style={{ maxWidth: "250px", height: "100%" }}
              />
            </div>
          ) : (teamList.map((listData) => (

            <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="100">
              <div className="member-img">
                <img src={baseURL + listData.imgData.path + listData.imgData.altered_file_name} className="img-fluid about-img" alt="" />
                <div className="social">
                  <Link target="_blank" to={listData.twitter_link}><i className="bi bi-twitter-x"></i></Link>
                  <Link target="_blank" to={listData.facebook_link}><i className="bi bi-facebook"></i></Link>
                  <Link target="_blank" to={listData.instagram_link}><i className="bi bi-instagram"></i></Link>
                  <Link target="_blank" to={listData.linkedin_link}><i className="bi bi-linkedin"></i></Link>
                </div>
              </div>
              <div className="member-info text-center">
                <h4>{listData.name}</h4>
                <span>{listData.role}</span>
                <p className="text-justify">{listData.description}</p>
              </div>
            </div>
          )))}

          {/* <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="200">
            <div className="member-img">
              <img src={team2}  className="img-fluid" alt="" />
              <div className="social">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="member-info text-center">
              <h4>Sarah Jhonson</h4>
              <span>Product Manager</span>
              <p>Labore ipsam sit consequatur exercitationem rerum laboriosam laudantium aut quod dolores exercitationem ut</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="300">
            <div className="member-img">
              <img src={team3}  className="img-fluid" alt="" />
              <div className="social">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="member-info text-center">
              <h4>William Anderson</h4>
              <span>CTO</span>
              <p>Illum minima ea autem doloremque ipsum quidem quas aspernatur modi ut praesentium vel tque sed facilis at qui</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="400">
            <div className="member-img">
              <img src={team4}  className="img-fluid" alt="" />
              <div className="social">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="member-info text-center">
              <h4>Amanda Jepson</h4>
              <span>Accountant</span>
              <p>Magni voluptatem accusamus assumenda cum nisi aut qui dolorem voluptate sed et veniam quasi quam consectetur</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="500">
            <div className="member-img">
              <img src={team5} className="img-fluid" alt="" />
              <div className="social">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="member-info text-center">
              <h4>Brian Doe</h4>
              <span>Marketing</span>
              <p>Qui consequuntur quos accusamus magnam quo est molestiae eius laboriosam sunt doloribus quia impedit laborum velit</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="600">
            <div className="member-img">
              <img src={team6} className="img-fluid" alt="" />
              <div className="social">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="member-info text-center">
              <h4>Josepha Palas</h4>
              <span>Operation</span>
              <p>Sint sint eveniet explicabo amet consequatur nesciunt error enim rerum earum et omnis fugit eligendi cupiditate vel</p>
            </div>
          </div> */}

        </div>

      </div>

    </section>
  )
}
export default Team;