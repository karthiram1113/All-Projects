import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faIndianRupeeSign, faAngleDown, faCheck, faArrowRight,faPlus,faMinus } from "@fortawesome/free-solid-svg-icons";
import Image1 from '../../../assets/category-image3-removebg-preview.png';
import Image2 from '../../../assets/category-image2.png';
import MoneyIcon from '../../../assets/money-icon.png';
import DeliveryImage from '../../../assets/delivery-img.webp';
import { Link } from "react-router-dom";
import Loading from "../../common/loading";
// import { Modal, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import { deleteProduct, addToCardList } from "../../services/apiserver";
import { API_URL } from "../../services/endpoint";
import { NavLink } from "react-router-dom";
import { environment } from "../../environment/environment";

function Checkout() {
    const [activeStep, setActiveStep] = useState(1);

    const handleStepClick = (step) => {
        setActiveStep(step);
    };

    const [activeTab, setActiveTab] = useState("credit");

    // Navigation Click Handler
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const API_BASE_URL = environment.apiBaseUrl;
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

    useEffect(() => {
        let multiTimeApiCall = false;

        const fetchData = async () => {
            setLoading(true);
            const client_id = localStorage.getItem("id");

            try {
                const responseData = await addToCardList(client_id);

                if (!multiTimeApiCall) {
                    if (responseData.apiStatus.code === "200") {
                        setList(responseData.Cardetails);
                    } else {
                        toast.error(responseData.apiStatus.message);
                    }
                }
            } catch (error) {
                if (!multiTimeApiCall) {
                    console.error("Error Handled:", error);
                    toast.error("An error occurred while fetching the product list.");
                }
            } finally {
                if (!multiTimeApiCall) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            multiTimeApiCall = true;
        };
    }, []);

    // update + and -,

    const handleIncrease = async (id) => {
        const updatedList = list.map((item) =>
            item.cart_id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item
        );
        setList(updatedList);

        // Make the API call
        const updatedItem = updatedList.find(item => item.cart_id === id);
        try {
            const response = await fetch(`${API_BASE_URL}${API_URL.AddToItemUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updatedItem.cart_id,
                    quantity: updatedItem.quantity,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                toast.success("Quantity updated successfully!");
            } else {
                toast.error(result.message || "Failed to update quantity.");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("An error occurred while updating the quantity.");
        }
    };

    const handleDecrease = async (id) => {
        const updatedList = list.map((item) =>
            item.cart_id === id && item.quantity > 1
                ? { ...item, quantity: Number(item.quantity) - 1 }
                : item
        );
        setList(updatedList);

        // Make the API call
        const updatedItem = updatedList.find(item => item.cart_id === id);
        if (updatedItem.quantity < 1) return; // Ensure quantity doesn't go below 1
        try {
            const response = await fetch(`${API_BASE_URL}${API_URL.AddToItemUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updatedItem.cart_id,
                    quantity: updatedItem.quantity,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                toast.success("Quantity updated successfully!");
            } else {
                toast.error(result.message || "Failed to update quantity.");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("An error occurred while updating the quantity.");
        }
    };


    const handleDelete = (id) => {
        setDeleteProductId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const result = await deleteProduct(deleteProductId);
            if (result.success) {
                toast.success("Product Remove successfully!");
                setList(list.filter(product => product.cart_id !== deleteProductId));
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error during product deletion:", error);
            toast.error("An error occurred while trying to delete the product.");
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    const subtotal = list.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <Navbar />
            {loading ? (
                <Loading />
            ) : (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <ul className="stepper">
                                <li
                                    className={`step ${activeStep === 1 ? "active" : ""}`}
                                    onClick={() => handleStepClick(1)}
                                >
                                    <span className="step-icon mt-4">1</span>
                                    <span className="step-title">Cart</span>
                                </li>
                                <li
                                    className={`step ${activeStep === 2 ? "active" : ""}`}
                                    onClick={() => handleStepClick(2)}
                                >
                                    <span className="step-icon mt-4">2</span>
                                    <span className="step-title">Customer Details</span>
                                </li>
                                <li
                                    className={`step ${activeStep === 3 ? "active" : ""}`}
                                    onClick={() => handleStepClick(3)}
                                >
                                    <span className="step-icon mt-4">3</span>
                                    <span className="step-title">Payment Method</span>
                                </li>
                                <li
                                    className={`step ${activeStep === 4 ? "active" : ""}`}
                                    onClick={() => handleStepClick(4)}
                                >
                                    <span className="step-icon mt-4">4</span>
                                    <span className="step-title">Confirmation</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className=" p-5 checkout-main-card mb-2">
                        {/* <h4 className="check-out-head-icon">
                        Checkout <FontAwesomeIcon icon={faCheckToSlot} />
                    </h4> */}

                        <div className="row">
                            <div className="col-md-12">
                                {activeStep === 1 && (
                                    <div className="row">
                                        <div className="col-md-12 card rounded-0">
                                            <h5 className="mt-4 text-start mb-4 border-bottom p-3">Carts</h5>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Items ({list.length} items)</th>
                                                        <th scope="col"></th>
                                                        <th scope="col" className="text-start">Price</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Sub-total</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                {list && list.length > 0 ? (
                                                    <tbody>
                                                        {list.map((value, ind) => (
                                                            <tr key={value.card_id}>
                                                                <td>
                                                                    <img
                                                                        src={value.image_path ? `${API_BASE_URL}${value.image_path}` : "default.png"}
                                                                        alt="Product Image"
                                                                        style={{ width: '100px', height: '100px' }}
                                                                    />
                                                                </td>
                                                                <td className="text-start">
                                                                    <p>{value.name}</p>
                                                                    <p>
                                                                        <strong> 100 gm </strong>
                                                                    </p>
                                                                </td>
                                                                <td className="text-start">
                                                                    <h6 className="mt-3"><FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> {value.price}</h6>
                                                                    {/* <small> <del className="text-secondary"><FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> 600</del></small> */}
                                                                </td>
                                                                <td>
                                                                    <div className="quantity-container mt-3">
                                                                        <button className="quantity-btn decrease" onClick={() => handleDecrease(value.cart_id)}><FontAwesomeIcon icon={faMinus} /></button>
                                                                        <span className="quantity-display">{value.quantity}</span>
                                                                        <button className="quantity-btn increase" onClick={() => handleIncrease(value.cart_id)}> <FontAwesomeIcon icon={faPlus} /></button>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="mt-4">
                                                                        <FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> {(value.price * value.quantity).toFixed(2)}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className="mt-4"><FontAwesomeIcon icon={faXmark} className="remove-icon-x"
                                                                        onClick={() => handleDelete(value.cart_id)}
                                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                                    /></p>
                                                                </td>
                                                            </tr>

                                                        ))}
                                                    </tbody>
                                                ) : (
                                                    <div className="add-card-main-no w-100">
                                                        <div>
                                                            <img src={Image1} height={'150px'} />
                                                            <h5>Let's fill the empty List</h5>
                                                            {/* <NavLink to="/">
                                                                <button class="btn continue-add-list"> Continue Shopping </button>
                                                            </NavLink> */}
                                                        </div>
                                                    </div>
                                                )}
                                            </table>
                                            <div className="d-flex justify-content-end mb-2 gap-2">
                                                <Link to={'/'} className="checkout-continue"><h5>Continue Shopping</h5></Link>
                                                <div className="card rounded-0 p-4 checkout-card-main">
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h6><strong>Total</strong> <span className="text-secondary">({list.length} items)</span></h6>
                                                            
                                                        </div>
                                                        <div>
                                                            <h6>  <FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" />{subtotal.toFixed(2)}</h6>
                                                            {/* <small> <del className="text-secondary"><FontAwesomeIcon icon={faIndianRupeeSign} className="product-price" /> 600</del></small> */}
                                                        </div>
                                                    </div>
                                                    <button className="checkout-btn-main mt-2">Checkout</button>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                                            aria-labelledby="staticBackdropLabel" aria-hidden="true" onHide={cancelDelete}>
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content rounded-0">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-4" id="staticBackdropLabel">Remove the Product</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                     <h6>   Are you sure you want to remove this product?</h6>
                                                    </div>
                                                    <div className="modal-footer delete-btn-footer">
                                                        <button onClick={cancelDelete} className="add-t-card-cancel-btn" data-bs-dismiss="modal">Cancel</button>
                                                        <button onClick={confirmDelete} className="add-t-card-remove-btn" data-bs-dismiss="modal">Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeStep === 2 && (
                                    <div className="row gap-4">
                                        <div className="card col-md-8 rounded-0">
                                            <div className="card-header bg-transparent">
                                                <h6 className="check-place-order-hed"> Place Order</h6>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title text-secondary">
                                                    {/* <FontAwesomeIcon icon={faAddressCard} /> */}
                                                    <img src={DeliveryImage} height={'50px'} width={'60px'} className="mb-3" />  Delivery</h5>
                                                <div className="text-start">
                                                    <h5 className="card-text">How to Delivery</h5>
                                                    <div className="d-flex gap-4">

                                                        <div class="form-check" onClick={() => handleTabClick("Deliver")}>
                                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                            <label class="form-check-label" for="flexRadioDefault1">
                                                                Deliver to below address
                                                            </label>
                                                        </div>

                                                        <div class="form-check" onClick={() => handleTabClick("will")}>
                                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                            <label class="form-check-label" for="flexRadioDefault2">
                                                                I will pickup from store
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {activeTab === "Deliver" && (
                                                    <div className="scroll-address">
                                                        <div className="card mt-2 mx-2">
                                                            <div className="card-header">
                                                                <h6 className="text-start"> Select Delivery Address</h6>
                                                            </div>
                                                            <div className="card-body text-start p-3">
                                                                <h6 className="card-title">Home</h6>
                                                                <div className="d-flex justify-content-between">
                                                                    <div>
                                                                        <small>Bharathi | 6384626418</small><br />
                                                                        <small>2/54,Paramakudi,Ramanathapuram-623601</small>
                                                                    </div>
                                                                    <div>
                                                                        <Link to={'/MyAccount'}><button className="address-change-btn">Change</button></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex gap-5">
                                                            <div className="text-start mt-4">
                                                                <h5>Delivery Slot(s)</h5>
                                                                <div className="d-flex gap-4 mt-2">
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                                            03-01-2025
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                                            04-01-2025
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-start mt-4">
                                                                <h5>Delivery Time</h5>
                                                                <div className="text-end mb-3 dropdown">
                                                                    <p className="category-sort-by" data-bs-toggle="dropdown" aria-expanded="false">Select available time slots <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" /> </p>

                                                                    <div class="dropdown-menu category-dropdown-menu">
                                                                        <div class="row">
                                                                            <div class="col-12">
                                                                                <ul class="list-unstyled">
                                                                                    <p className="sort-by-list-co">1.00 PM - 3.00 PM</p>
                                                                                    <p className=""> 3.00 PM - 5.00 PM</p>
                                                                                    <p className=""> 5.00 PM - 9.00 PM</p>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card mt-2 mx-2">
                                                            <div className="card-header">
                                                                <h6 className="text-start"> Add Note</h6>
                                                            </div>
                                                            <div className="card-body text-start p-3">
                                                                <div class="mb-3">
                                                                    <textarea class="form-control address-textarea" id="exampleFormControlTextarea1" rows="3" placeholder="Notes"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )}
                                                {activeTab === "will" && (
                                                    <div className="scroll-address">
                                                        <div className="card mt-2 mx-1">
                                                            <div className="card-header">
                                                                <h6 className="text-start">Select Pickup Address</h6>
                                                            </div>
                                                            <div className="card-body text-start p-3">
                                                                <div>
                                                                    <input class="form-check-input" type="radio" id="flexRadioDefault3" checked />
                                                                    <label>Hermon Grocery store,<br />  2/54,Bharathi Nagar,Chennai-600023</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex gap-5">
                                                            <div className="text-start mt-4">
                                                                <h5>Pickup Slot(s)</h5>
                                                                <div className="d-flex gap-4 mt-2">
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" id="flexRadioDefault3" />
                                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                                            03-01-2025
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" id="flexRadioDefault3" />
                                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                                            04-01-2025
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-start mt-4">
                                                                <h5>Pickup Time</h5>
                                                                <div className="text-end mb-3 dropdown">
                                                                    <p className="category-sort-by" data-bs-toggle="dropdown" aria-expanded="false">Select available time slots <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" /> </p>

                                                                    <div class="dropdown-menu category-dropdown-menu-1">
                                                                        <div class="row">
                                                                            <div class="col-12">
                                                                                <ul class="list-unstyled">
                                                                                    <p className="sort-by-list-co">8.00 AM - 10.00 PM</p>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card mt-2 mx-1">
                                                            <div className="card-header">
                                                                <h6 className="text-start"> Add Note</h6>
                                                            </div>
                                                            <div className="card-body text-start p-3">
                                                                <div class="mb-3">
                                                                    <textarea class="form-control address-textarea" id="exampleFormControlTextarea1" rows="3" placeholder="Notes"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                            <div className="card-footer d-flex justify-content-between bg-transparent">
                                                <Link to={'/AddToCard-list'}><button className="address-change-btn">
                                                    Previous
                                                </button></Link>
                                                <button className="checkout-btn-main">
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card col-md-3 rounded-0">
                                            <div className="card-header bg-transparent">
                                                <h6 className="check-place-order-hed"> Pricing Details</h6>
                                            </div>
                                            <div className="p-3 text-start">
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="card-title">Total (Incl.Taxes)</h6>
                                                    <p>₹ 472.00</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title"><strong>Total Bill</strong></h5>
                                                    <h5><strong>₹ 472.00</strong></h5>
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between bg-transparent">
                                                <h5 className="card-title"><strong>Amount Due</strong></h5>
                                                <h5><strong>₹ 472.00</strong></h5>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeStep === 3 && (
                                    <div className="row mt-4 gap-4">
                                        <div className="col-md-8 card rounded-0">
                                            <div className="card-header bg-transparent">
                                                <h6 className="check-place-order-hed"> Pricing Details</h6>
                                            </div>
                                            <div className="p-3 text-start">
                                                <div className="card rounded-0 mb-2 p-3 wallet-container" for='flexSwitchCheckDefault'>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex gap-2">
                                                            <img src={MoneyIcon} alt="#icon" height={'50px'} width={'50px'} />
                                                            <div>
                                                                <h6>Use Wallet ₹0.00</h6>
                                                                <small>Available balance ₹0.00</small>
                                                            </div>
                                                        </div>
                                                        <div class="form-check form-switch mt-1">
                                                            <input class="form-check-input on-off-checkbox" type="checkbox" id="flexSwitchCheckDefault" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5 className="mt-3">Payment Mode</h5>
                                                <div className="card rounded-0 p-3">
                                                    <div className=" d-flex justify-content-between">
                                                        <div><h6>Cash on Delivery</h6></div>
                                                        <div>
                                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card rounded-0 p-3 mt-3">
                                                    <div className=" d-flex justify-content-between">
                                                        <div><h6> Credit / Debit Card</h6></div>
                                                        <div>
                                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card rounded-0 p-3 mt-3">
                                                    <div className=" d-flex justify-content-between">
                                                        <div><h6>  Net Banking</h6></div>
                                                        <div>
                                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between bg-transparent">
                                                <button className="address-change-btn">
                                                    Previous
                                                </button>
                                                <button className="checkout-btn-main">
                                                    Place Order
                                                </button>
                                            </div>


                                        </div>
                                        <div className="card col-md-3 rounded-0">
                                            <div className="card-header bg-transparent">
                                                <h6 className="check-place-order-hed"> Pricing Details</h6>
                                            </div>
                                            <div className="p-3 text-start">
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="card-title">Total (Incl.Taxes)</h6>
                                                    <p>₹ 472.00</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title"><strong>Total Bill</strong></h5>
                                                    <h5><strong>₹ 472.00</strong></h5>
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between bg-transparent">
                                                <h5 className="card-title"><strong>Amount Due</strong></h5>
                                                <h5><strong>₹ 472.00</strong></h5>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeStep === 4 && (
                                    <div>
                                        <p className="checkout-shipping-head border-bottom p-2 text-center">
                                            <FontAwesomeIcon icon={faCheck} className="confirm-tick-icon" />

                                            <h5 className="confirm-header mt-2">Order Placed, Thank you</h5>
                                            <p>Your order(s) will be confirmed soon !!!</p>
                                        </p>
                                        <h6 className="confirm-header-2 mt-4">Your Order(s) will be delivered to</h6>
                                        <p>Home,2/54-2,paramakudi,Ramanathapuram-623601 | Bharathi | +91 0000000000</p>
                                        <div className="card">
                                            <div className="card-header text-start"> <h5>Order details</h5></div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6 text-start">
                                                        {/* <h6><FontAwesomeIcon icon={faClock} /></h6> */}
                                                        <h6>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24">
                                                                <circle cx="32" cy="32" r="30" fill="#fff" stroke="#000" stroke-width="2" />
                                                                <circle cx="32" cy="32" r="2" fill="rgb(16, 137, 186)" />
                                                                <line x1="32" y1="32" x2="32" y2="16" stroke="rgb(16, 137, 186)" stroke-width="3" stroke-linecap="round" />
                                                                <line x1="32" y1="32" x2="48" y2="32" stroke="rgb(16, 137, 186)" stroke-width="2" stroke-linecap="round" />
                                                            </svg> Expected Delivery Time
                                                        </h6>
                                                        <p>Jan 3 2025 03:00 PM - Jan 3 2025 05.00 PM</p>
                                                    </div>
                                                    <div className="col-md-3 text-start">
                                                        <h6>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24">
                                                                <rect x="8" y="8" width="48" height="48" rx="4" ry="4" fill="#f4f4f4" stroke="rgb(16, 137, 186)" stroke-width="2" />
                                                                <line x1="16" y1="20" x2="48" y2="20" stroke="rgb(16, 137, 186)" stroke-width="2" />
                                                                <line x1="16" y1="28" x2="48" y2="28" stroke="rgb(16, 137, 186)" stroke-width="2" />
                                                                <line x1="16" y1="36" x2="48" y2="36" stroke="rgb(16, 137, 186)" stroke-width="2" />
                                                                <circle cx="32" cy="48" r="6" fill="#ddd" stroke="rgb(16, 137, 186)" stroke-width="2" />
                                                                <text x="32" y="51" font-family="Arial, sans-serif" font-size="8" text-anchor="middle" fill="rgb(16, 137, 186)">
                                                                    ₹
                                                                </text>
                                                            </svg> Billed Amount
                                                        </h6>
                                                        <p>₹ 604.00</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Link to='/Order-Summary'>
                                                            <button className="order-sum-btn mt-2">Detailed Summary <FontAwesomeIcon icon={faArrowRight} /></button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <Link to='/'>
                                                <button className="order-sum-btn mt-2">Continue Shopping</button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Checkout;
