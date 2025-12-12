import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <section className="home">
            <div className="home-content">
                <div className="text-section">
                    <div class="intro"><span>Hello There!</span></div>

                    <h1 className="name">
                        I‘m <span>SyedAli,</span>
                    </h1>

                    <h2 className="title">
                        UI/UX Designer & <br />
                        Graphic Designer | <br />
                        Front-End Developer
                    </h2>

                    <div className="buttons">
                        <Link to={"/portfolio"} style={{textDecoration: "none"}}>
                        <button class="portfolio-btn">
                            View My Portfolio
                            <span class="icon"><i class="fas fa-play"></i></span>
                        </button>
                        </Link>
                        <Link to={"/contact"}><button className="hire-btn">Hire Me</button></Link>
                    </div>
                </div>

                <div className="image-box">
                    <img src="../../public/hermon-logo.png" alt="main-logo" />
                </div>
            </div>

            <div className="bottom-bars">
                <div className="green-bar"></div>
                <div className="orange-bar"></div>
            </div>
        </section>
    );
};

export default Home;
