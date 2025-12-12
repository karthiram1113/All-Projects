import React, { useEffect, useState } from "react";
import './index.css';
import CategoryImage1 from '../../../assets/category-img-removebg-preview.png';
import CategoryImage2 from '../../../assets/category-image2.png';
import CategoryImage3 from '../../../assets/category-image3-removebg-preview.png';
import CategoryImage4 from '../../../assets/category-img4-removebg-preview.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faShareFromSquare, faPlus, faMinus, faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import Loading from '../../common/loading';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { environment } from "../../environment/environment";
import DefaultImage from "../../../assets/category-img4-removebg-preview.png";
import { AddToCardMain, clientProductList,addToCardList } from "../../services/apiserver";
import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";
import { API_URL } from "../../services/endpoint";
import { useCart } from "../../Home/cardcontext";

function FullProductList() {
     const { incrementCartCount } = useCart();
     const API_BASE_URL = environment.apiBaseUrl;
     const [list, setList] = useState([]);
     const [cartlist, setCartList] = useState([]);
     const [name, setName] = useState('');
     const [loading, setLoading] = useState('');
     const navigate = useNavigate();
     const [addedItems, setAddedItems] = useState({});
 
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
 
     // client-ProductList,
 
     useEffect(() => {
         let multiTimeApiCall = false;
 
         const fetchData = async () => {
             setLoading(true);
 
             try {
                 const responseData = await clientProductList(0, 20);
 
                 if (!multiTimeApiCall) {
                     if (responseData.apiStatus.code === "200") {
                         setList(responseData.result.VendorData);
                         console.log(responseData.result.VendorData, 'bk');
 
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
                     setLoading(false);
                 }
             }
         };
 
         fetchData();
 
         return () => {
             multiTimeApiCall = true;
         }
     }, []);
 
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
                <div className="mt-2 text-start mb-4 border-bottom">
                    <h4><strong>View Our Products</strong></h4>
                </div>
                {loading ? (
                    <Loading />
                ) : (

                    <div className="row">
                        {list.map((value) => (
                            <div className="col-md-2 card border-0 rounded-0 product-image-container p-3 mb-3" key={value.id}>
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
                                <img src={value.image_path ? `${API_BASE_URL}${value.image_path}` : DefaultImage}
                                    alt="productname" height={'180px'} className="product-image" />
                                <div className="mt-3 text-start">
                                    <h6 className="product-name">{value.name}</h6>
                                    <small className={`content-dis ${expanded[value.id] ? 'dot' : 'truncate'}`}
                                    onClick={() => toggleContent(value.id)} >{value.description}</small>
                                    <h6 className="product-net-bill">  500ml </h6>
                                    
                                    <div className="d-flex justify-content-between">
                                        <span className="product-price mt-2"><FontAwesomeIcon icon={faIndianRupeeSign} /> {value.price}</span>
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
                )}
            </div>

            <Footer />
        </>
    )
}

export default FullProductList;