import React from "react";
import './index.css';
import Navbar from "../../common/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTruckFast, faHouse, faNoteSticky, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import Image1 from '../../../assets/category-image3-removebg-preview.png';
import Image2 from '../../../assets/category-image2.png';
import OrderPlaced from '../../../assets/order-placed.png';
import { Link } from "react-router-dom";

function Order_summary() {

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="text-start mt-4">
                  <Link to={'/AddToCard-list'} className="order-back-icon"><h3><FontAwesomeIcon icon={faArrowLeft} /> Order Summary</h3></Link>
                </div>

                <div className="border rounded-0">
                    <h4 className="mt-3"><FontAwesomeIcon icon={faTruckFast} color="rgb(16, 137, 186)"/> Delivery On Jan 3 2025 (03.00 PM - 05.00 PM)</h4>
                    <div className="text-start p-3 mt-4 summary-card-01">
                        <h6>Delivery Address :</h6>
                        <h6><FontAwesomeIcon icon={faHouse} color="rgb(16, 137, 186)"/> Home</h6>
                        <p>2/54-2,paramakudi,Ramanathapuram-623601<br /> Bharathi +91 0000000000</p>
                    </div>
                    <div class="tracker-container">
                        <div class="tracker-step active">
                            <div class="circle">✔</div>
                            <span>Placed</span>
                        </div>
                        <div class="tracker-step">
                            <div class="circle"></div>
                            <span>Confirmed</span>
                        </div>
                        <div class="tracker-step">
                            <div class="circle"></div>
                            <span>Ready for Delivery</span>
                        </div>
                        <div class="tracker-step">
                            <div class="circle"></div>
                            <span>Delivered</span>
                        </div>
                    </div>
                    <div className="p-3 d-flex justify-content-between">
                        <div>
                            <img src={OrderPlaced} height={'100px'} width={'100px'} />
                        </div>
                        <div>
                            <h6 className="mt-4">3 Items | ₹ 604.00</h6>
                            <p>Jan 3 2025 01.20 PM</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 mb-3">
                    <div className="col-md-12 border rounded-0">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Items(2 items)</th>
                                    <th scope="col"></th>
                                    <th scope="col" className="text-start">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Sub-total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img
                                            src={Image1}
                                            alt="Product Image"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    </td>
                                    <td className="text-start">
                                        <p>Snacks & Juices</p>
                                        <p>
                                            <strong> 100 gm </strong>
                                        </p>
                                    </td>
                                    <td className="text-start">
                                        <h6 className="mt-3"><FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> 350</h6>
                                        <small> <del className="text-secondary"><FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> 600</del></small>
                                    </td>
                                    <td> 
                                        <h6 className="mt-3"> X2</h6>
                                    </td>
                                    <td>
                                        <div className="mt-4">
                                            <FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> 350
                                        </div>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td>
                                        <img
                                            src={Image2}
                                            alt="Product Image"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    </td>
                                    <td className="text-start">
                                        <p>Snacks & Juices</p>
                                        <p>
                                            <strong> 100 gm </strong>
                                        </p>
                                    </td>
                                    <td className="text-start">
                                        <h6 className="mt-3"><FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> 350</h6>
                                        <small> <del className="text-secondary"><FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> 600</del></small>
                                    </td>
                                    <td> 
                                        <h6 className="mt-3"> X2</h6>
                                    </td>
                                    <td>
                                        <div className="mt-4">
                                            <FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> 350
                                        </div>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-end mb-2 gap-2">
                            <div className="card rounded-0 p-4 checkout-card-main-1">
                                <div className="d-flex justify-content-between border-bottom">
                                    <p>Total (Incl.Taxes)</p>
                                    <p>₹604.00</p>
                                </div>
                                <div className="d-flex justify-content-between border-bottom p-2">
                                    <h6>Total Bill</h6>
                                    <h6>₹604.00</h6>
                                </div>
                                <div className="d-flex justify-content-between p-2">
                                    <p>Amount due</p>
                                    <p>₹604.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Order_summary;