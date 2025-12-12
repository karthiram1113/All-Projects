import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faLocationDot, faAngleDown, faSearch, faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import './index.css';
import Image1 from '../../../assets/logo-img.webp';
import ImageGroup from '../../../assets/grouplayer2.webp';
import { NavLink } from "react-router-dom";
import Location from "../../Home/Location";
import Profile_Dropdown from "../../profile/profile-dropdown";
import { toast } from "react-toastify";
import { categorylist } from '../../services/apiserver'; // Import deleteVendor
import { useNavigate } from 'react-router-dom';
import { useCart } from "../../Home/cardcontext";

function Navbar() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const { cartCount } = useCart();

    useEffect(() => {
        let multiTimeApiCall = false;

        const fetchData = async () => {

            try {
                const responseData = await categorylist(0, 30);

                if (!multiTimeApiCall) {
                    if (responseData.apiStatus.code === "200") {
                        setList(responseData.result.CategoryData);
                        console.log(responseData.result.CategoryData, 'ddd');
                    } else {
                        toast.error(responseData.apiStatus.message);
                    }
                }
            } catch (error) {
                if (!multiTimeApiCall) {
                    console.error("Error handled:", error);
                    toast.error("An error occurred while fetching the product list.");
                }
            } finally {
                if (!multiTimeApiCall) {
                    // setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            multiTimeApiCall = true;
        };
    }, []);

    const handleItemClick = (item) => {
        localStorage.setItem("categoryId", item.id)
        navigate(`/Fruits&Vegitables/${item.id}`, { state: { itemDetails: item } });

    };

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-container sticky-top">
                <div class="container container-fluid">
                    <NavLink class="navbar-brand" to={'/'}>
                        <img src={Image1} alt="Logo" height={'50px'} />
                    </NavLink>

                    <div className="">
                        {/* <button className="navbar_location">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                <path d="M12 2C8.134 2 5 5.134 5 9c0 4.736 6.657 11.667 6.904 11.917a1 1 0 0 0 1.192 0C12.343 20.667 19 13.736 19 9c0-3.866-3.134-7-7-7zm0 17.293C10.229 17.013 7 12.618 7 9c0-2.757 2.243-5 5-5s5 2.243 5 5c0 3.618-3.229 8.013-5 10.293z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>

                            Select Location <FontAwesomeIcon icon={faAngleDown} className="location-down-arrow" />
                        </button> */}
                        <Location />

                    </div>


                    <div className="d-flex flex-grow-1 position-relative">
                        <input type="text" className="form-control search-input" placeholder="Search for Products..." />
                        <FontAwesomeIcon icon={faSearch} className="search-icon position-absolute" />
                    </div>

                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <div className="mx-3">
                                <button className="navbar-category" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* <FontAwesomeIcon icon={faLayerGroup} color="gray" className="heart-icon" /> Categories */}
                                    <img src={ImageGroup} alt="bk" height={'30px'} width={'25px'} /> Category
                                </button>
                                <div class="dropdown-menu p-3 category-dropdown">
                                    <div class="row">
                                        <div class="col-12 category-list">
                                            <ul class="list-unstyled">
                                                {/* <li className="category-li dropdown position-relative">
                                                    <NavLink
                                                        className="categary-list-content"
                                                        role="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        Fruit & Vegetable
                                                    </NavLink>
                                                    <ul className="dropdown-menu submenu position-absolute end-100 top-0 p-3 category-dropdown-1">
                                                        <li className="category-li-1">
                                                            <NavLink className="categary-list-content-1" to={'/categary-list'}>Apple</NavLink>
                                                        </li>
                                                        <li className="category-li-1">
                                                            <NavLink className="categary-list-content-1">Banana</NavLink>
                                                        </li>
                                                        <li className="category-li-1">
                                                            <NavLink className="categary-list-content-1" to={'/categary-list'}>Apple</NavLink>
                                                        </li>
                                                        <li className="category-li-1">
                                                            <NavLink className="categary-list-content-1">Banana</NavLink>
                                                        </li>
                                                        <li className="category-li-1">
                                                            <NavLink className="categary-list-content-1" to={'/categary-list'}>Apple</NavLink>
                                                        </li>
                                                        <li className="category-li-1">
                                                            <NavLink className="categary-list-content-1">Banana</NavLink>
                                                        </li>
                                                        <li className="category-li-1">
                                                            <NavLink className="categary-list-content-1" to={'/categary-list'}>Apple</NavLink>
                                                        </li>
                                                        <li className="category-li-1">
                                                            <NavLink className="categary-list-content-1">Banana</NavLink>
                                                        </li>
                                                    </ul>
                                                </li> */}
                                                {list
                                                    .filter((value) => value.status === "Active") // Filter active items
                                                    .map((value, ind) => (
                                                        <li key={ind} onClick={() => handleItemClick(value)}
                                                            className="category-li"
                                                        >
                                                            <p className="categary-list-content ">{value.name}</p>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item">
                            <div className="">
                                <NavLink to={'/Wishlist'}>
                                    <button className="navbar-heart">
                                        {/* <FontAwesomeIcon icon={faHeart} className="heart-icon" /> */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="wishlist-icon"
                                            width="24"
                                            height="24"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>

                                    </button>
                                </NavLink>
                            </div>
                        </li>

                        <li class="nav-item">
                            <div className="mx-3">
                                <NavLink to={'/AddToCard-list'}>
                                    <button className="shopping-btn position-relative">
                                        {/* <FontAwesomeIcon icon={faCartShopping} className="heart-icon" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="shopping">
                                            <g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(1 1)">
                                                <circle cx="7" cy="20" r="2"></circle>
                                                <circle cx="19" cy="20" r="2"></circle>
                                                <path d="M4.67 5H22l-1.68 8.39a2 2 0 0 1-2 1.61H7.75a2 2 0 0 1-2-1.74L4.23 1.74A2 2 0 0 0 2.25 0H0"></path>
                                            </g>
                                        </svg>
                                        {cartCount > 0 && (
                                            <span
                                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                                            >
                                                {cartCount}
                                            </span>
                                        )}
                                        {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                            3
                                        </span> */}
                                    </button>
                                </NavLink>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div className="">
                                {/* <NavLink to={'/MyAccount'}>
                                    <button className="navbar-login">
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
                                </NavLink> */}
                                <Profile_Dropdown />
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;