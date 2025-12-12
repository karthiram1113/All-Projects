import React from "react";
import './index.css';
import OfferCard1 from '../../../assets/offer-card-1.jpg';
import OfferCard2 from '../../../assets/offer-card-2.jpg';
import OfferCard3 from '../../../assets/offer-card-3.webp';
import OfferCard4 from '../../../assets/offer-card-4.jpg';
import OfferCard5 from '../../../assets/offer-card-5.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Offer_Card() {

    return (
        <>
            <div className="container my-4 mt-4">
                <h5 className="text-start mt-4">Offers </h5>
                <div className="row mt-4 mb-4 gap-4">
                    <div className="col-md-3 card_fruit_main">
                        <div className="img-container_fruit">
                            <div className="img-inner">
                                <div className="inner-skew-fruit">
                                    <img src={OfferCard1} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="text-container-fruit">
                            <h3>Deals Of the Week</h3>
                            <Link to={'/categary-list'} className="view-offer-link">
                                <span className="link-text">
                                    View Offers<FontAwesomeIcon icon={faArrowRight} />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 card_fruit_main">
                        <div className="img-container_fruit">
                            <div className="img-inner">
                                <div className="inner-skew-fruit">
                                    <img src={OfferCard2} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="text-container-fruit">
                            <h3>Bigger Discounts</h3>
                            <Link to={'/categary-list'} className="view-offer-link">
                                <span className="link-text">
                                    View Offers<FontAwesomeIcon icon={faArrowRight} />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 card_fruit_main">
                        <div className="img-container_fruit">
                            <div className="img-inner">
                                <div className="inner-skew-fruit">
                                    <img src={OfferCard3} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="text-container-fruit">
                            <h3>Best Combo's</h3>
                            <Link to={'/categary-list'} className="view-offer-link">
                                <span className="link-text">
                                    View Offers<FontAwesomeIcon icon={faArrowRight} />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 card_fruit_main">
                        <div className="img-container_fruit">
                            <div className="img-inner">
                                <div className="inner-skew-fruit">
                                    <img src={OfferCard4} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="text-container-fruit">
                            <h3>The ₹30 Corner</h3>
                            <Link to={'/categary-list'} className="view-offer-link">
                                <span className="link-text">
                                    View Offers<FontAwesomeIcon icon={faArrowRight} />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 card_fruit_main">
                        <div className="img-container_fruit">
                            <div className="img-inner">
                                <div className="inner-skew-fruit">
                                    <img src={OfferCard5} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="text-container-fruit">
                            <h3>Best Sale</h3>
                            <Link to={'/categary-list'} className="view-offer-link">
                                <span className="link-text">
                                    View Offers<FontAwesomeIcon icon={faArrowRight} />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Offer_Card;