import React, { useState, useEffect } from "react";
import './index.css';
import Navbar from "../../common/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPenToSquare, faIndianRupeeSign, faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen, faHeart, faLocationDot, faTicket, faWallet, faCommentDots, faGlobe, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import MyOrder from '../../../assets/first-order.avif';
import Image2 from '../../../assets/category-image3-removebg-preview.png';
import Image3 from '../../../assets/category-img4-removebg-preview.png';
import { Link } from "react-router-dom";
import Loading from "../../common/loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../services/endpoint";
import { environment } from '../../environment/environment';
import { clientEditFunction } from '../../services/apiserver';
import { useLocation } from "react-router-dom";
import Address_Location from "./map";

function MyAccount() {

    let id = localStorage.getItem("id");
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const [activeStep, setActiveStep] = useState(1);

    const handleStepClick = (step) => {
        setActiveStep(step);
    };

    // const [activeTab, setActiveTab] = useState("credit");

    // const handleTabClick = (tab) => {
    //     setActiveTab(tab);
    // };
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("credit");

    useEffect(() => {
        if (location.state) {
            if (location.state.activeSection) {
                setActiveSection(location.state.activeSection);
            }
            if (location.state.activeTab) {
                setActiveTab(location.state.activeTab);
            }
        }
    }, [location.state]);


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const API_BASE_URL = environment.apiBaseUrl;

    const [clientId, setClientId] = useState('');
    const [firstName, setFirstName] = useState('');
    // const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGenter] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageLogo, setImageProfile] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        setValue(myArray[2]);
        console.log(myArray[3], "bk");

        setClientId(myArray[3])
        getMethod(myArray[3]);
        console.log(myArray[2], "s");
        console.log(clientId, "mmmf");

    }, []);


    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2((prevState) => !prevState);
    };


    const togglePasswordVisibility3 = () => {
        setShowPassword3((prevState) => !prevState);
    };



    const updateFunction = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const responseData = await clientEditFunction(
                clientId,
                firstName,
                // middleName,
                lastName,
                gender,
                contactNo,
                address,
                email,
                password,
                confirmPassword,
                imageLogo,
                currentPassword
            );

            if (responseData.apiStatus.code === '200') {

                toast.success(responseData.apiStatus.message);

                navigate('/');
            } else {
                console.error('API response error:', responseData.apiStatus.message);
                toast.error(responseData.apiStatus.message);
            }
        } catch (error) {
            console.error('Error in UpdateFunction:', error);
            toast.error('An error occurred while updating the client.');
        } finally {
            setLoading(false);
        }
    };

    // image
    const handleImageChange = (e) => {
        setImageProfile(e.target.files[0]); // Get the selected file
    };

    // get api

    const getMethod = async (clientId) => {
        // let id = localStorage.getItem("idb");

        try {
            const response = await fetch(`${API_BASE_URL}${API_URL.clientGetProfile}${clientId}`, {
                method: "GET"
            });

            const responseData = await response.json();
            const data = responseData.result.ClientData;

            console.log(data, "data");
            setClientId(data.id);
            setFirstName(data.firstname);
            // setMiddleName(data.middlename);
            setLastName(data.lastname);
            setAddress(data.address);
            setGenter(data.gender);
            setContactNo(data.contact);
            setEmail(data.email);
            // setPassword(data.password);
            // setConfirmPassword(data.confirmPassword);
            setImageProfile(data.avatar);
            // setCurrentPassword(data.password);
        } catch (errors) {
            console.error("Error handled =", errors);
            toast.error("Failed to fetch Client Data");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container">
                <h4 className="mt-4 text-start"><strong>My Profile</strong></h4>
                <div className="row mt-3 gap-5 mb-2">
                    <div className="col-md-3 sidebar-card-01 card p-4">
                        <div className="d-flex gap-3">
                            <div>
                                <FontAwesomeIcon icon={faUser} className="user-icon-account" />
                            </div>
                            <div>
                                <small className="user-name-account">bharathi</small><br />
                                <small className="user-email-account">bharu18180@gmail.com</small><br />
                                <small className="user-email-account">+91 0000000000</small>
                            </div>

                            <div onClick={() => handleTabClick("editprofile")}>
                                <FontAwesomeIcon icon={faPenToSquare} className="m-4 edit-icon-account" />
                            </div>

                        </div>
                        <div>
                            <div className="mt-4 account-detail-div" onClick={() => toggleSection("MyAccount")}>
                                <div className="m-1 side-bar-account-head">
                                    <p className="side-bar-header-acc">My Account</p>
                                    <p>{activeSection === "MyAccount" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />}</p>
                                </div>
                            </div>
                            {activeSection === "MyAccount" && (
                                <ul className="list-unstyled">
                                    <li className="my-acc-icon-content p-3 border-bottom" onClick={() => handleTabClick("MyOrder")}><FontAwesomeIcon icon={faBoxOpen} className="my-acc-sub-icons" /> My Order</li>
                                    <li className="my-acc-icon-content p-3 border-bottom" onClick={() => handleTabClick("WishList")}><FontAwesomeIcon icon={faHeart} className="my-acc-sub-icons" /> Wishlist</li>
                                    <li className="my-acc-icon-content p-3 border-bottom" onClick={() => handleTabClick("Location")}><FontAwesomeIcon icon={faLocationDot} className="my-acc-sub-icons" /> Delivery address</li>
                                    <li className="my-acc-icon-content p-3 border-bottom"><FontAwesomeIcon icon={faTicket} className="my-acc-sub-icons" /> Coupons</li>
                                </ul>
                            )}
                        </div>
                        <div>
                            <div className="account-detail-div" onClick={() => toggleSection("PaymentMode")}>
                                <div className="m-1 side-bar-account-head">
                                    <p className="side-bar-header-acc">Payment Mode</p>
                                    <p>{activeSection === "PaymentMode" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />}</p>
                                </div>
                            </div>
                            {activeSection === "PaymentMode" && (
                                <ul className="list-unstyled">
                                    <li className="my-acc-icon-content" onClick={() => handleTabClick("Wallet")} ><FontAwesomeIcon icon={faWallet} className="my-acc-sub-icons" /> HS Wallet</li>
                                </ul>
                            )}
                        </div>
                        <div>
                            <div className="account-detail-div" onClick={() => toggleSection("HelpandSupport")}>
                                <div className="m-1 side-bar-account-head">
                                    <p className="side-bar-header-acc">Help and Support</p>
                                    <p>{activeSection === "HelpandSupport" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />}</p>
                                </div>
                            </div>
                            {activeSection === "HelpandSupport" && (
                                <ul className="list-unstyled">
                                    <li className="my-acc-icon-content"><FontAwesomeIcon icon={faCommentDots} className="my-acc-sub-icons" /> Need Help</li>
                                </ul>
                            )}
                        </div>
                        <div>
                            <div className="account-detail-div" onClick={() => toggleSection("MoreInformation")}>
                                <div className="m-1 side-bar-account-head">
                                    <p className="side-bar-header-acc">More Information</p>
                                    <p>{activeSection === "MoreInformation" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />}</p>
                                </div>
                            </div>
                            {activeSection === "MoreInformation" && (
                                <ul className="list-unstyled">
                                    <li className="my-acc-icon-content"><FontAwesomeIcon icon={faGlobe} className="my-acc-sub-icons" /> About HS-Store</li>
                                    <li className="my-acc-icon-content"><FontAwesomeIcon icon={faRightFromBracket} className="my-acc-sub-icons" /> Sign-Out</li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="col-md-8 card sidebar-card-01 p-4">
                        {activeTab === "editprofile" && (
                            <div>
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <div>
                                        <div className="text-start border-bottom">
                                            <h4><FontAwesomeIcon icon={faPenToSquare} className="edit-icon-account" /> Edit Profile</h4>
                                        </div>
                                        <div>
                                            <form className="p-4">
                                                <div class="row g-3">
                                                    <div class="col-md-6">
                                                        <label for="firstName" class="form-label">First Name</label>
                                                        <input type="text" class="form-control edit-profile-input" onChange={(e) => setFirstName(e.target.value)}
                                                            value={firstName} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label for="lastName" class="form-label">Last Name</label>
                                                        <input type="text" class="form-control edit-profile-input"
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            value={lastName} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label for="contactNumber" class="form-label">Contact Number</label>
                                                        <input type="text" class="form-control edit-profile-input"
                                                            onChange={(e) => setContactNo(e.target.value)}
                                                            value={contactNo} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label for="contactNumber" class="form-label">Image</label>
                                                        <input type="file" class="form-control edit-profile-input"
                                                            onChange={handleImageChange}
                                                        />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label for="email" class="form-label">Email</label>
                                                        <div class="input-group">
                                                            <input type="email" class="form-control edit-profile-input"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                value={email} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label for="gender"
                                                            class="form-label edit-form-label"
                                                            onChange={(e) => setGenter(e.target.value)}
                                                            value={gender}
                                                        >Gender</label>
                                                        <select class="form-select edit-profile-input" id="gender">
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <label for="address" class="form-label">Address</label>
                                                        <textarea class="form-control edit-profile-input-1"
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            value={address}></textarea>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <label for="currentPassword" class="form-label">Current Password</label>
                                                        <div class="input-group">
                                                            <input type={showPassword ? "text" : "password"}
                                                                class="form-control edit-profile-input  border-end-0"
                                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                                value={currentPassword}
                                                                id="confirmPassword"
                                                                placeholder="Confirm Password" />

                                                            <button type="button"
                                                                className="toggle-password"
                                                                onClick={togglePasswordVisibility} >
                                                                {showPassword ? (
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <label for="newPassword" class="form-label">New Password</label>
                                                        <div class="input-group">
                                                            <input type={showPassword2 ? "text" : "password"}
                                                                class="form-control edit-profile-input  border-end-0"
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                value={password}
                                                                id="new password"
                                                                placeholder="New Password"
                                                            />
                                                            <button type="button" class="toggle-password" onClick={togglePasswordVisibility2} >

                                                                {showPassword2 ? (
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                                                        <div class="input-group">
                                                            <input type={showPassword3 ? "text" : "password"}
                                                                class="form-control edit-profile-input  border-end-0"
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                value={confirmPassword}
                                                                id="confirmPassword"
                                                                placeholder="Confirm Password" />

                                                            <button type="button"
                                                                className="toggle-password"
                                                                onClick={togglePasswordVisibility3} >
                                                                {showPassword3 ? (
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-4 d-flex gap-4">
                                                    <Link
                                                        to="/" >
                                                        <button type="reset" class="edit-cancel-btn">Cancel</button></Link>
                                                    <button type="submit" class="edit-save-btn" onClick={updateFunction} >Save</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "MyOrder" && (
                            <div>
                                <h3>My Orders</h3>
                                <hr />
                                <div className="text-center">
                                    <img src={MyOrder} height={'250px'} />
                                    <h6>We’re waiting for your first order</h6>
                                    <p>No orders placed yet. Shop from our categories and grab the best deals on your order.</p>
                                    <Link to={'/'}><button className="order-shop-btn">Continue Shopping</button></Link>
                                </div>
                            </div>
                        )}
                        {activeTab === "WishList" && (
                            <div>
                                <div className="text-start border-bottom">
                                    <h4><FontAwesomeIcon icon={faHeart} color="red" /> WishList</h4>
                                </div>
                                <div className="row p-3 gap-3">
                                    <div className="card col-md-5 ">
                                        <div className="text-end">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="wishlist-icon"
                                                width="22"
                                                height="24"
                                                className="wishlist-heart-icon-card"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </div>
                                        <img src={Image3} alt="bk" height={'180px'} className="product-image" />
                                        <div className="mt-3 text-start">
                                            <h6 className="product-name">Vegitables</h6>
                                            <h6 className="product-net-bill">  500ml </h6>
                                            <div className="d-flex justify-content-between">
                                                <span className="product-price mt-2"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card col-md-5 ">
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
                                        <div className="text-end">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="wishlist-icon"
                                                width="22"
                                                height="24"
                                                className="wishlist-heart-icon-card"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </div>
                                        <img src={Image2} alt="bk" height={'180px'} className="product-image" />
                                        <div className="mt-3 text-start mb-2">
                                            <h6 className="product-name">Vegitables</h6>
                                            <h6 className="product-net-bill">  500ml </h6>
                                            <div className="d-flex justify-content-between">
                                                <span className="product-price mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span> <del className="mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /> 80</del>
                                                <button className="product-button-add">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card col-md-5 ">
                                        <div className="text-end">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="wishlist-icon"
                                                width="22"
                                                height="24"
                                                className="wishlist-heart-icon-card"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </div>
                                        <img src={Image3} alt="bk" height={'180px'} className="product-image" />
                                        <div className="mt-3 text-start">
                                            <h6 className="product-name">Vegitables</h6>
                                            <h6 className="product-net-bill">  500ml </h6>
                                            <div className="d-flex justify-content-between">
                                                <span className="product-price mt-2"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span>
                                                <button className="product-button-add">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "Location" && (
                            <div><Address_Location /></div>
                        )}
                        {activeTab === "Wallet" && (
                            <div>
                                <div className="text-start border-bottom">
                                    <h4><FontAwesomeIcon icon={faWallet} color="rgb(16, 137, 186)" /> HS Wallet</h4>
                                </div>
                                <div className="d-flex justify-content-between w-25 mt-4">
                                    <div>
                                        <h6>Hs-Wallet</h6>
                                        <h6>₹0.00</h6>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faWallet} className="mt-3" color="rgb(16, 137, 186)" />
                                    </div>
                                </div>
                                <div className=" w-25 mt-4">
                                    <div>
                                        <h6>Hs Gift card</h6>
                                        <h6>₹0.00</h6>
                                    </div>
                                </div>
                                <div>
                                    <small>Redeem your Gift Card Balance across eligible<br /> Hs products and Reliance stores.</small>
                                    <hr className="w-25" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>



        </>
    )
}

export default MyAccount;