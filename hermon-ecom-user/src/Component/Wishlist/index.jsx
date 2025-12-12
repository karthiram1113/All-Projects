import React from "react";
import './index.css';
import Image from '../../assets/category-image2.png';
import Image2 from '../../assets/category-image3-removebg-preview.png';
import Image3 from '../../assets/category-img4-removebg-preview.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart, faIndianRupeeSign, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../common/Navbar";

function WishList() {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="mt-4 text-start border-bottom">
                    <h4><FontAwesomeIcon icon={faHeart} color="red"/> WishList</h4>
                </div>
                <div className="row p-3 gap-3">
                    <div className="card col-md-3 sidebar-second-card-h">
                        <img src={Image} alt="bk" height={'180px'} className="product-image" />
                        <div className="mt-3 text-start">
                            <h6 className="product-name">Vegitables</h6>
                            <h6 className="product-net-bill">  500ml </h6>
                            <span className="product-price mt-2"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span>
                            <div className="d-flex justify-content-between mt-2">
                                <span><FontAwesomeIcon icon={faTrashCan} className="wishlist-trash"/></span>
                                <button className="product-button-add">Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="card col-md-3 sidebar-second-card-h">
                        <div class="offer-container offer-con-2">
                            <svg
                                width="36"
                                height="35"
                                viewBox="0 0 29 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z"
                                    fill="#538CEE"
                                ></path>
                            </svg>
                            <div class="offer-title">16% OFF</div>
                        </div>
                        <img src={Image2} alt="bk" height={'180px'} className="product-image" />
                        <div className="mt-3 text-start mb-2">
                            <h6 className="product-name">Vegitables</h6>
                            <h6 className="product-net-bill">  500ml </h6>
                            <span className="product-price mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span> <del className="mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /> 80</del>
                            <div className="d-flex justify-content-between mt-2">
                                <span><FontAwesomeIcon icon={faTrashCan} className="wishlist-trash"/></span>
                                <button className="product-button-add">Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="card col-md-3 sidebar-second-card-h">
                        <img src={Image3} alt="bk" height={'180px'} className="product-image" />
                        <div className="mt-3 text-start">
                            <h6 className="product-name">Vegitables</h6>
                            <h6 className="product-net-bill">  500ml </h6>
                            <span className="product-price mt-2"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span>
                            <div className="d-flex justify-content-between mt-2">
                                <span><FontAwesomeIcon icon={faTrashCan} className="wishlist-trash"/></span>
                                <button className="product-button-add">Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="card col-md-3 sidebar-second-card-h">
                        <div class="offer-container offer-con-2">
                            <svg
                                width="36"
                                height="35"
                                viewBox="0 0 29 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z"
                                    fill="#538CEE"
                                ></path>
                            </svg>
                            <div class="offer-title">16% OFF</div>
                        </div>
                        <img src={Image2} alt="bk" height={'180px'} className="product-image" />
                        <div className="mt-3 text-start mb-2">
                            <h6 className="product-name">Vegitables</h6>
                            <h6 className="product-net-bill">  500ml </h6>
                            <span className="product-price mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span> <del className="mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /> 80</del>
                            <div className="d-flex justify-content-between mt-2">
                                <span><FontAwesomeIcon icon={faTrashCan} className="wishlist-trash"/></span>
                                <button className="product-button-add">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishList;