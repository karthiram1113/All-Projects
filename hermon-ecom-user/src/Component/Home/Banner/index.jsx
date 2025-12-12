import React from "react";
import Image1 from '../../../assets/banner01.avif';
import Image2 from '../../../assets/banner02.jpg';
import Image3 from '../../../assets/banner04.jpg';
import './index.css';

function Banner() {
    return (
        <div id="carouselExampleInterval" className="carousel slide mt-1" data-bs-ride="carousel">
            <div className="carousel-inner banner-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                    <img
                        src={Image1}
                        className="d-block w-100"
                        alt="Image 1"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img
                        src={Image2}
                        className="d-block w-100"
                        alt="Image 2"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img
                        src={Image3}
                        className="d-block w-100"
                        alt="Image 3"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                </div>
                <div className="carousel-item active" data-bs-interval="3000">
                    <img
                        src={Image1}
                        className="d-block w-100"
                        alt="Image 1"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                </div>
            </div>

            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide-to="0"
                    className="active indicator-btn"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    className="indicator-btn"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    className="indicator-btn"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
                <button
                    className="indicator-btn"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                ></button>
            </div>
        </div>


    );
}

export default Banner;
