import React, { useState, useEffect } from "react";
import './index.css';
import Navbar from "../../common/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faIndianRupeeSign, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { CategorySublist, addToCardList, AddToCardMain } from "../../services/apiserver";
import { environment } from "../../environment/environment";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../services/endpoint";
import { useCart } from "../../Home/cardcontext";

function Category_list() {
    const navigate = useNavigate();
    const { incrementCartCount } = useCart();
    const API_BASE_URL = environment.apiBaseUrl;
    const [list, setList] = useState([]);
    const [cartlist, setCartList] = useState([]);
    const [addedItems, setAddedItems] = useState({});
    const [activeSection, setActiveSection] = useState(null);
    const [loading, setLoading] = useState('');

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    // add-to-card list,

    const fetchDatas = async () => {
        setLoading(true);
        const client_id = localStorage.getItem("id");

        try {
            const responseData = await addToCardList(client_id);


            if (responseData.apiStatus.code === "200") {
                setCartList(responseData.Cardetails);
            } else {
                toast.error(responseData.apiStatus.message);
            }

        } catch (error) {

            console.error("Error Handled:", error);
            toast.error("An error occurred while fetching the product list.");

        } finally {

            setLoading(false);

        }
    };


    const categoryId = localStorage.getItem("categoryId")

    useEffect(() => {
        let multiTimeApiCall = false;

        const fetchData = async () => {
            // setLoading(true);

            try {
                const responseData = await CategorySublist(0, 30, categoryId);

                if (!multiTimeApiCall) {
                    if (responseData.apiStatus.code === "200") {
                        setList(responseData.result.CategoryByProductData);
                        console.log(responseData.result.CategoryByProductData, 'ddd');

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
    }, [categoryId]);


    // AddToCard,

    const [matchName, setMatchName] = useState("");

    const AddToBtn = async (e, product) => {
        e.preventDefault();
        console.log(product, 'lkjhgfdsdfghj');
        const client_ids = localStorage.getItem("id");
        if (!client_ids) {
            toast.error("Client ID not found.");
            return;
        }
        // setLoading(true);
        try {
            const products = [
                {
                    product_name: product.name,
                    quantity: 1,
                }
            ];
            const responseData = await AddToCardMain(client_ids, products);
            setMatchName(product.name)

            if (responseData.apiStatus?.code === "200") {
                toast.success(responseData.apiStatus.message || "Added to Cart successfully!");
                incrementCartCount();

                setAddedItems(prevState => ({
                    ...prevState,
                    [product.id]: true // Mark the product as added
                }));

                // setList((prevList) =>
                //     prevList.map((item) =>
                //         item.id === product.id ? { ...item, cart_id: responseData.cart_id, quantity: 1 } : item
                //     )
                // );
                fetchDatas();
            } else {
                toast.error(responseData.apiStatus.message || "Failed to add to cart.");
            }
        } catch (error) {
            toast.error("An error occurred while adding to the cart.");
        } finally {
            setLoading(false);
        }
    };

    // dot content

    const [expanded, setExpanded] = useState({});

    const toggleContent = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // add-to-card update,

    const handleIncrease = async (value) => {
        console.log(matchName, 'namess');
        // Find the item by matching the name
        const matchedItem = cartlist.find(item => item.name === value.name);
        console.log(matchedItem, 'namessItem');

        if (!matchedItem) {
            toast.error("No matching product found in the cart.");
            return;
        }

        const updatedList = cartlist.map((item) =>
            item.name === matchedItem.name
                ? { ...item, quantity: Number(item.quantity) + 1 }
                : item
        );
        setCartList(updatedList); //thaslim 

        console.log("Updated list", updatedList);
        const updatedItem = updatedList.find(item => item.cart_id === matchedItem.cart_id);
        if (!updatedItem) return;

        try {
            const response = await fetch(`${API_BASE_URL}${API_URL.AddToItemUpdate}`, {
                method: "PUT",

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

    const handleDecrease = async (value) => {
        const matchedItem = cartlist.find(item => item.name === value.name);

        if (!matchedItem) {
            toast.error("No matching product found in the cart.");
            return;
        }

        if (Number(matchedItem.quantity) <= 1) {
            const updatedList = cartlist.filter(item => item.name !== matchedItem.name);
            setCartList(updatedList);
            setAddedItems(prev => ({ ...prev, [value.id]: false }));

            try {
                const response = await fetch(`${API_BASE_URL}${API_URL.AddToItemUpdate}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        id: matchedItem.cart_id,
                        quantity: 0,
                    }),
                });
                const result = await response.json();

                if (response.ok) {
                    toast.success("Item removed from cart!");
                } else {
                    toast.error(result.message || "Failed to update cart.");
                }
            } catch (error) {
                console.error("Error updating cart:", error);
                toast.error("An error occurred while updating the cart.");
            }

            return;
        }

        const updatedList = cartlist.map(item =>
            item.name === matchedItem.name
                ? { ...item, quantity: Number(item.quantity) - 1 }
                : item
        );
        setCartList(updatedList);

        const updatedItem = updatedList.find(item => item.cart_id === matchedItem.cart_id);
        if (!updatedItem) return;

        try {
            const response = await fetch(`${API_BASE_URL}${API_URL.AddToItemUpdate}`, {
                method: "PUT",
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

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-3 sidebar-card-01 card">
                        <h4 className="category-tile-name">Category</h4>

                        <div className="category-list-btm-code">
                            <button
                                className="btn btn-link d-flex align-items-center text-decoration-none"
                                onClick={() => toggleSection("dals")}
                            >
                                <h6 className="m-1 side-bar-content">  {activeSection === "dals" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />} Cuts & Sprouts</h6>
                            </button>
                            {activeSection === "dals" && (
                                <ul className="list-unstyled category-sub-list">
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                            )}
                        </div>

                        <div className="category-list-btm-code">
                            <button
                                className="btn btn-link d-flex align-items-center text-decoration-none"
                                onClick={() => toggleSection("ghee")}
                            >
                                <h6 className="m-1 side-bar-content"> {activeSection === "ghee" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />} Exotic Fruits & Veggies</h6>
                            </button>
                            {activeSection === "ghee" && (
                                <ul className="list-unstyled category-sub-list">
                                    <li>All</li>
                                    <li>Blended Oil</li>
                                    <li>Ghee</li>
                                    <li>Sunflower Oil</li>
                                    <li>Rice Bran</li>
                                    <li>Olive Oil</li>
                                    <li>Groundnut Oil</li>
                                    <li>Mustard Oil</li>
                                    <li>Other Oils</li>
                                </ul>
                            )}
                        </div>

                        <div className="category-list-btm-code">
                            <button
                                className="btn btn-link d-flex align-items-center text-decoration-none"
                                onClick={() => toggleSection("atta")}
                            >
                                <h6 className="m-1 side-bar-content"> {activeSection === "atta" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />}  Flower Bouquets, Bunches</h6>
                            </button>
                            {activeSection === "atta" && (
                                <ul className="list-unstyled category-sub-list">
                                    <li>Item A</li>
                                    <li>Item B</li>
                                    <li>Item C</li>
                                </ul>
                            )}
                        </div>

                        <div className="category-list-btm-code">
                            <button
                                className="btn btn-link d-flex align-items-center text-decoration-none"
                                onClick={() => toggleSection("fresh")}
                            >
                                <h6 className="m-1 side-bar-content"> {activeSection === "atta" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />}  Fresh Vegetables</h6>
                            </button>
                            {activeSection === "fresh" && (
                                <ul className="list-unstyled category-sub-list">
                                    <li>Item A</li>
                                    <li>Item B</li>
                                    <li>Item C</li>
                                </ul>
                            )}
                        </div>

                        <div className="category-list-btm-code">
                            <button
                                className="btn btn-link d-flex align-items-center text-decoration-none"
                                onClick={() => toggleSection("fru")}
                            >
                                <h6 className="m-1 side-bar-content"> {activeSection === "atta" ? <FontAwesomeIcon icon={faAngleUp} className="sidebar-plus" /> : <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" />}  Fresh Fruits</h6>
                            </button>
                            {activeSection === "fru" && (
                                <ul className="list-unstyled category-sub-list">
                                    <li>Item A</li>
                                    <li>Item B</li>
                                    <li>Item C</li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="col-md-9 sidebar-card-02">

                        <div className="text-end mb-3 dropdown">
                            <p className="category-sort-by" data-bs-toggle="dropdown" aria-expanded="false">Sort by : <span className="category-sort-by-sub">All products <FontAwesomeIcon icon={faAngleDown} className="sidebar-plus" /> </span> </p>

                            <div class="dropdown-menu category-dropdown-menu">
                                <div class="row">
                                    <div class="col-12">
                                        <ul class="list-unstyled">
                                            <p className="sort-by-list-co">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="Allproduct" /> <label class="form-check-label" for="Allproduct">
                                                    All products</label></p>
                                            <p className=""><input class="form-check-input"  type="radio" name="flexRadioDefault" id="Discount" /> <label class="form-check-label" for="Discount">  Discount</label></p>
                                            <p className=""><input class="form-check-input"  type="radio" name="flexRadioDefault" id="LowHigh" /> <label class="form-check-label" for="LowHigh"> Price: Low to High</label></p>

                                            <p className=""><input class="form-check-input"  type="radio" name="flexRadioDefault" id="HignLow" /> <label class="form-check-label" for="HignLow"> Price: High to Low</label></p>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {list && list.length > 0 ? (
                            <div className="row p-3 gap-3">
                                {list.map((value) => (
                                    <div className="card col-md-3 sidebar-second-card-h" key={value.id}>
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
                                        <img src={value.image_path ? `${API_BASE_URL}${value.image_path}` : "bk"}
                                            alt="bk" height={'180px'} className="product-image" />
                                        <div className="mt-3 text-start">
                                            <h6 className="product-name">{value.name}</h6>
                                            <p className={`content-dis ${expanded[value.id] ? 'dot' : 'truncate'}`}
                                                onClick={() => toggleContent(value.id)} >{value.description}</p>
                                            <h6 className="product-net-bill">  500ml </h6>
                                            <div className="d-flex justify-content-between">
                                                <span className="product-price mt-2"><FontAwesomeIcon icon={faIndianRupeeSign} /> {value.price}</span>
                                                {/* <button className="product-button-add">Add</button> */}
                                                <div className="d-flex justify-content-between">
                                                    {addedItems[value.id] ? (
                                                        <div className="quantity-container">

                                                            <button
                                                                className="quantity-btn decrease"
                                                                onClick={() => handleDecrease(value)}
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button><span className="quantity-display text-dark">
                                                                {cartlist.find(item => item.name === value.name)?.quantity || 0}
                                                            </span>
                                                            {/* <input
                                                                                                type="text"
                                                                                                className="form-control text-center"
                                                                                                value={value.quantity || 1}
                                                                                                readOnly
                                                                                            /> */}
                                                            <button
                                                                className="quantity-btn increase"
                                                                onClick={() => handleIncrease(value)}
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p className="product-button-add" onClick={(e) => AddToBtn(e, value)}>
                                                            Add
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-5 mt-4">
                                <h4>Data Not Found</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}

export default Category_list;



// <div className="card col-md-3 sidebar-second-card-h">
// <div class="offer-container offer-con-2">
//     <svg
//         width="36"
//         height="35"
//         viewBox="0 0 29 28"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//     >
//         <path
//             d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z"
//             fill="#538CEE"
//         ></path>
//     </svg>
//     <div class="offer-title">16% OFF</div>
// </div>
// <div className="text-end">
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         stroke-width="1"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         class="wishlist-icon"
//         width="22"
//         height="24"
//         className="wishlist-heart-icon-card"
//     >
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//     </svg>
// </div>
// <img src={Image2} alt="bk" height={'180px'} className="product-image" />
// <div className="mt-3 text-start mb-2">
//     <h6 className="product-name">Vegitables</h6>
//     <h6 className="product-net-bill">  500ml </h6>
//     <div className="d-flex justify-content-between">
//         <span className="product-price mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span> <del className="mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /> 80</del>
//         <button className="product-button-add">Add</button>
//     </div>
// </div>
// </div>
// <div className="card col-md-3 sidebar-second-card-h">
// <div className="text-end">
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         stroke-width="1"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         class="wishlist-icon"
//         width="22"
//         height="24"
//         className="wishlist-heart-icon-card"
//     >
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//     </svg>
// </div>
// <img src={Image3} alt="bk" height={'180px'} className="product-image" />
// <div className="mt-3 text-start">
//     <h6 className="product-name">Vegitables</h6>
//     <h6 className="product-net-bill">  500ml </h6>
//     <div className="d-flex justify-content-between">
//         <span className="product-price mt-2"><FontAwesomeIcon icon={faIndianRupeeSign} /> 50.00</span>
//             <button className="product-button-add">Add</button>
//     </div>
// </div>
// </div>