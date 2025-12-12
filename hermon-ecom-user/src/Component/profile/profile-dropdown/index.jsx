import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from 'react-router-dom';
import { environment } from "../../environment/environment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleUser, faBoxOpen, faHeart, faArrowRightFromBracket, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import Image from "../../../assets/images/email.webp";
import defaultAvatar from '../../../assets/images/profile.webp';
import { Clientlogin } from '../../services/apiserver';
import { signup } from '../../services/apiserver';
import { otp } from '../../services/apiserver';
import { useNavigate } from "react-router-dom";

function Profile_Dropdown() {
    const navigate = useNavigate();
    const [isSignIn, setIsSignIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isOTPVerification, setIsOTPVerification] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [firstname, setFirst_Name] = useState('');
    const [lastname, setLast_Name] = useState('');
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState('');
    const [OTP, setOTP] = useState('');
    const [user, setUser] = useState({
        name: '',
        Email: '',
        profileImage: '',
        firstname: '',
        lastname: '',
    });
    const [loginSuccess, setLoginSuccess] = useState(false);
    let id = localStorage.getItem("id");
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const Base_Url = environment.apiBaseUrl;
    const profileImageUrl = user.profileImage ? `${Base_Url}${user.profileImage}` : defaultAvatar;

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const toggle = () => {
        setIsSignIn((prev) => !prev);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const togglePasswordVisibility1 = () => {
        setShowPassword1((prevState) => !prevState);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSignIn(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    //login,
    const ClientLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!validateEmail(email)) {
            setErrorMessage('* Invalid email format.');
            setLoading(false);
            return;
        }

        if (password.trim() === '') {
            setErrorMessage('* Password is required.');
            setLoading(false);
            return;
        }

        try {
            const responseData = await Clientlogin(email, password);
            if (responseData.apiStatus.code === "200") {
                const userDetail = responseData.responseData.userDetail;
                localStorage.setItem("id", userDetail.loginId);
                localStorage.setItem("user", JSON.stringify({
                    name: userDetail.name,
                    Email: userDetail.Email,
                    profileImage: userDetail.avatar,
                    firstname: userDetail.firstName,
                    lastname: userDetail.lastName,
                }));
                localStorage.setItem("loginSuccess", "true");

                setUser({
                    name: userDetail.name,
                    Email: userDetail.Email,
                    profileImage: userDetail.avatar,
                    firstname: userDetail.firstName,
                    lastname: userDetail.lastName,
                });

                setLoginSuccess(true);
                setShowModal(false);

                toast.success(responseData.apiStatus.message);
            }
            else {
                toast.error(responseData.apiStatus.message);
                setLoginSuccess(false);
            }
        } catch (error) {
            setErrorMessage('Failed to connect to the server. Please try again later.');
            console.error('Error:', error);
            setLoginSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedLoginSuccess = localStorage.getItem("loginSuccess") === "true";
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedLoginSuccess && storedUser) {
            setLoginSuccess(true);
            setUser(storedUser);
        }
    }, []);



    // SignUp
    const SignUpButton = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const responseData = await signup(
                firstname,
                lastname,
                email,
                password,
                confirm_password
            );

            if (responseData.apiStatus?.code === "200") {
                toast.success(responseData.apiStatus.message || "SignUp successfully");
                setIsOTPVerification(true);
                // Navigate ("/otp");
            } else {
                toast.error(responseData.apiStatus.message || "Failed to SignUp.");
            }
        } catch (error) {
            toast.error('An error occured while SignUp.');
        } finally {
            setLoading(false);
        }
    };

    // otp
    const maskEmail = (email) => {
        if (!email || !email.includes("@")) {
            return ""; // Handle invalid email
        }
        const [localPart, domain] = email.split("@");
        const firstTwo = localPart.slice(0, 2);
        const lastTwo = localPart.slice(-1);
        const maskedLocal = `${firstTwo}*****${lastTwo}`;
        return `${maskedLocal}@${domain}`;
    };

    const Output = async (e) => {
        e.preventDefault();
        console.log('OTP:', setOTP);

        try {
            const responseData = await otp(
                firstname,
                lastname,
                email,
                password,
                confirm_password,
                OTP
            );

            if (responseData.apiStatus?.code === "200") {
                setLoginSuccess(true);
                setShowModal(false);
                toast.success(responseData.apiStatus.message || "OTP verify successfully");

            } else {
                toast.error(responseData.apiStatus.message || "Failed to OTP-verify.");
            }
        } catch (error) {
            toast.error('An error occured while OTP verification.');
        } finally {
            setLoading(false);
        }
    };

    const maskedEmail = maskEmail(email);

    // otp-field
    const handleChange = (value, index) => {
        if (!isNaN(value) && value.length <= 1) {
            const newOtp = OTP.split("");
            newOtp[index] = value;
            const updatedOTP = newOtp.join("");

            setOTP(updatedOTP);

            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (value && nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && OTP[index] === "") {
            const previousInput = document.getElementById(`otp-input-${index - 1}`);
            if (previousInput) {
                previousInput.focus();
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("loginSuccess");
        localStorage.removeItem("user");
        localStorage.removeItem("id");

        setLoginSuccess(false);
        setUser(false);

        toast.success("Logged out successfully!");
    };

    const handleWishlistClick = () => {
        navigate("/MyAccount/Edit/6", { state: { activeSection: "MyAccount", activeTab: "WishList" } });
    };

    const handleMyOrderClick = () =>{
        navigate("/MyAccount/Edit/6", { state: { activeSection: "MyAccount", activeTab: "MyOrder" } });
    };

    const handleAddressClick = () =>{
        navigate("/MyAccount/Edit/6", {state: {activeSection: "MyAccount", activeTab: "Location"}});
    };

    return (
        <>
            {loginSuccess ? (
                <div className="dropdown text-end">
                    <a href="#" className="d-flex justify-content-end text-decoration-none" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={profileImageUrl} alt="Profile" width="40" height="40" className="rounded-circle me-2" id="profileImage" />
                        <span className="fw-bold" id="profileName">{user.name}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end shadow profile-dropdown" aria-labelledby="dropdownMenuButton">
                        <li className="text-center"> <img src={profileImageUrl} alt="Profile" width="100" height="100" className="rounded-circle me-2" id="profileImage" />
                        </li>
                        <li className="px-3 py-2 text-center">
                            <strong id="profileNameDetails">{user.firstname}</strong>
                            <strong id="profileNameDetails">{user.lastname}</strong>
                            <br />
                            <p id="profileNameDetails">{user.Email}</p>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li className="my-acc-icon-content">
                            {/* to={`/clientpop_up/Edit/${id}`}  */}
                            <Link to={`/MyAccount/Edit/${id}`} className="profile-drop-link">
                            <FontAwesomeIcon icon={faCircleUser} className="my-acc-sub-icons" /> My Profile
                            </Link>
                        </li>


                        <li className="my-acc-icon-content" onClick={handleMyOrderClick}>
                            <FontAwesomeIcon icon={faBoxOpen} className="my-acc-sub-icons" /> My Order
                        </li>
                        <li className="my-acc-icon-content" onClick={handleWishlistClick}>
                            <FontAwesomeIcon icon={faHeart} className="my-acc-sub-icons" /> Wishlist
                        </li>
                        <li className="my-acc-icon-content" onClick={handleAddressClick}>
                            <FontAwesomeIcon icon={faLocationDot} className="my-acc-sub-icons" /> Delivery address
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item d-flex justify-content-between" href="#" onClick={handleLogout}>
                            Log out <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-danger" />
                        </a></li>
                    </ul>

                </div>

            ) : (
                <div className="mx-3">
                    <button className="navbar-login" onClick={toggleModal}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="user-icon"
                            width="28"
                            height="28"
                        >
                            <circle cx="12" cy="7" r="4" />
                            <path d="M5.5 20.5c0-3.1 3.6-5.5 6.5-5.5s6.5 2.4 6.5 5.5" />
                        </svg>
                        Login
                    </button>
                    {/* <button className="btn btn-dark" onClick={toggleModal}>
                        Login / Sign Up
                    </button> */}
                </div>
            )}


            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block sign-in-popup-m" tabIndex="-1"
                    role="dialog" >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <button type="button" className="btn-close close-outside" aria-label="Close" onClick={toggleModal}>
                            </button>
                            <div className="modal-body">
                                <div id="container" className={`container container-sign-in ${isSignIn ? "sign-in" : "sign-up"
                                    } ${isOTPVerification ? "otp-verification" : ""}`}
                                >
                                    {!isOTPVerification ? (
                                        <div className="row">
                                            <div className="col mt-2 mb-2 flex-col sign-up">
                                                <div className="form-wrapper align-items-center">
                                                    <div className="form sign-up">
                                                        <div className="input-group input-group-box">
                                                            <i className="bx bxs-user"></i>
                                                            <input
                                                                type="text"
                                                                placeholder="First name"
                                                                onChange={(e) => setFirst_Name(e.target.value)}
                                                                value={firstname}
                                                            />
                                                        </div>
                                                        <div className="input-group input-group-box">
                                                            <i className="bx bxs-user"></i>
                                                            <input
                                                                type="text"
                                                                placeholder="Last name"
                                                                onChange={(e) => setLast_Name(e.target.value)}
                                                                value={lastname}
                                                            />
                                                        </div>
                                                        <div className="input-group input-group-box">
                                                            <i className="bx bx-mail-send"></i>
                                                            <input
                                                                type="email"
                                                                placeholder="Email"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                value={email}
                                                            />
                                                        </div>
                                                        {errorMessage && errorMessage.includes('Invalid email') && (
                                                            <div className="error-message sign-up-error-mail" >
                                                                {errorMessage}
                                                            </div>
                                                        )}
                                                        <div>

                                                            {loading && (
                                                                <div className="preloader">

                                                                    <svg className="cart card1" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128"
                                                                        width="80px" height="80px" xmlns="http://www.w3.org/2000/svg" >

                                                                        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                                                                            <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                                                                                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                                                                                <circle cx="43" cy="111" r="13" />
                                                                                <circle cx="102" cy="111" r="13" />
                                                                            </g>
                                                                            <g className="cart__lines" stroke="currentColor">
                                                                                <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                                                                                    strokeDasharray="338 338" strokeDashoffset="-338" />
                                                                                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                                                                                    <circle className="cart__wheel-stroke" cx="43" cy="111" r="13"
                                                                                        strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                                                                </g>
                                                                                <g className="cart__wheel2" transform="rotate(90,102,111)">
                                                                                    <circle className="cart__wheel-stroke" cx="102" cy="111" r="13"
                                                                                        strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="input-group input-group-box">
                                                            <i className="bx bxs-lock-alt"></i>
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Password"
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                value={password}
                                                            />
                                                            <button type="button"
                                                                className="input-group-text user-icon-show bg-transparent text-secondary"
                                                                onClick={togglePasswordVisibility} >
                                                                {showPassword ? (
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                )}
                                                            </button>
                                                        </div>
                                                        {errorMessage && errorMessage.includes('Password') && (
                                                            <div className="error-message sign-up-error-password">
                                                                {errorMessage}
                                                            </div>
                                                        )}
                                                        <div className="input-group input-group-box">
                                                            <i className="bx bxs-lock-alt"></i>
                                                            <input type={showPassword1 ? "text" : "password"}
                                                                placeholder="Confirm password"
                                                                onChange={(e) => setConfirm_password(e.target.value)}
                                                                value={confirm_password} />
                                                            <button type="button"
                                                                className="input-group-text user-icon-show bg-transparent text-secondary"
                                                                onClick={togglePasswordVisibility1} >
                                                                {showPassword1 ? (
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                )}
                                                            </button>
                                                        </div>
                                                        {errorMessage && errorMessage.includes('Password') && (
                                                            <div className="error-message sign-up-error-password2">
                                                                {errorMessage}
                                                            </div>
                                                        )}
                                                        <button onClick={SignUpButton}>
                                                            Sign up
                                                        </button>
                                                        {/* onClick={() => setIsOTPVerification(true)} */}
                                                        <p>
                                                            <span>Already have an account?</span>
                                                            <b onClick={toggle} className="pointer">
                                                                Sign in here
                                                            </b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col mt-2 flex-col sign-in">
                                                <div className="form-wrapper align-items-center">
                                                    <div className="form sign-in">
                                                        <div className="input-group input-group-box">
                                                            <i className="bx bxs-user"></i>
                                                            <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
                                                        </div>
                                                        {errorMessage && errorMessage.includes('Invalid email') && (
                                                            <div className="error-message sign-in-error-email" >
                                                                {errorMessage}
                                                            </div>
                                                        )}

                                                        <div >

                                                            {loading && (
                                                                <div className="preloader">

                                                                    <svg className="cart card1" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128"
                                                                        width="80px" height="80px" xmlns="http://www.w3.org/2000/svg" >

                                                                        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                                                                            <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                                                                                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                                                                                <circle cx="43" cy="111" r="13" />
                                                                                <circle cx="102" cy="111" r="13" />
                                                                            </g>
                                                                            <g className="cart__lines" stroke="currentColor">
                                                                                <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                                                                                    strokeDasharray="338 338" strokeDashoffset="-338" />
                                                                                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                                                                                    <circle className="cart__wheel-stroke" cx="43" cy="111" r="13"
                                                                                        strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                                                                </g>
                                                                                <g className="cart__wheel2" transform="rotate(90,102,111)">
                                                                                    <circle className="cart__wheel-stroke" cx="102" cy="111" r="13"
                                                                                        strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="input-group input-group-box">
                                                            <i className="bx bxs-lock-alt"></i>
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Password"
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <button type="button"
                                                                className="input-group-text user-icon-show bg-transparent text-secondary"
                                                                onClick={togglePasswordVisibility} >
                                                                {showPassword ? (
                                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                )}
                                                            </button>
                                                        </div>
                                                        {errorMessage && errorMessage.includes('Password') && (
                                                            <div className="error-message sign-in-error-password" >
                                                                {errorMessage}
                                                            </div>
                                                        )}

                                                        {loading && <p>Loading...</p>}

                                                        <button onClick={ClientLogin}>Sign in</button>
                                                        <p>
                                                            <b>Forgot password?</b>
                                                        </p>
                                                        <p>
                                                            <span>Don't have an account?</span>
                                                            <b onClick={toggle} className="pointer">
                                                                Sign up here
                                                            </b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row content-row">
                                                <div className="col align-items-center flex-col">
                                                    <div className="text sign-in mt-4">
                                                        <h2>Welcome To Our Store</h2>
                                                    </div>
                                                    <div className="img sign-in"></div>
                                                </div>
                                                <div className="col align-items-center flex-col">
                                                    <div className="img sign-up"></div>
                                                    <div className="text sign-up">
                                                        <h2 className="sign-up-content">Join with us</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="col mt-4 mb-4 flex-col otp-verification">
                                            <div className="form-wrapper form-wrapper-1 align-items-center">
                                                <div className="otp-page">
                                                    <div className="d-flex justify-content-center align-items-center h-100">
                                                        <div className="text-center">
                                                            <div className="mb-3">
                                                                <img src={Image} alt="bk" height='150px' width='150px' />
                                                                <p className="mb-0 mt-2"><strong>Please check your email</strong></p>
                                                            </div>
                                                            <p className="mb-3">
                                                                We've sent a code to contact <strong>{maskedEmail}</strong>
                                                            </p>
                                                            <div className="otp-ver-con" >
                                                                {Array.from({ length: 6 }).map((_, index) => (
                                                                    <input
                                                                        className="otp-input-box-con"
                                                                        key={index}
                                                                        id={`otp-input-${index}`}
                                                                        type="text"
                                                                        maxLength="1"
                                                                        value={OTP[index] || ""}
                                                                        onChange={(e) => handleChange(e.target.value, index)}
                                                                        onKeyDown={(e) => handleKeyDown(e, index)}

                                                                    />
                                                                ))}
                                                            </div>
                                                            <p className="mb-3 mt-3">
                                                                Didn't get the code?{" "}
                                                                <a href="#" className="text-success">
                                                                    Click to resend.
                                                                </a>
                                                            </p>
                                                            <div className="d-flex justify-content-center gap-3">
                                                                <button className="btn btn-outline-secondary mr-2" onClick={() => setIsOTPVerification(false)} >
                                                                    Cancel
                                                                </button>
                                                                <button id="validateBtn" className="btn btn-success px-4 validate" onClick={Output}>Verify</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="row content-row">
                                                    <div className="col align-items-center flex-col">
                                                        <div className="text sign-in mt-4">
                                                            <h2>Verify Your Email</h2>
                                                        </div>
                                                        <div className="img sign-in"></div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile_Dropdown;
