import React from "react";
import "./index.css";
import Image1 from '../../../assets/offer-banner-new.jpg';
// import Image2 from '../../../assets/banner-sub-02.avif';
// import Image3 from '../../../assets/offer-banner-2.webp';
import { Link } from "react-router-dom";

function OfferBanner() {
    return (
        <div className="container mt-3">
            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <div className="offer-banner-main">
                       <Link to={'/categary-list'}> <img src={Image1} alt="Offer 1" className="offer-card-img img-fluid" /></Link>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="offer-banner-main">
                    <Link to={'/categary-list'}> <img src={Image1} alt="Offer 2" className="offer-card-img img-fluid" /></Link>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="offer-banner-main">
                    <Link to={'/categary-list'}> <img src={Image1} alt="Offer 3" className="offer-card-img img-fluid" /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferBanner;
