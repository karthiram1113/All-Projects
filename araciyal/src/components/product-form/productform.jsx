import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { create, productEditFunction, productget } from '../service/apiserver';
import { environment } from '../environment/environment';
import { API_URL } from '../service/api-endpoint';

function ProductForm() {

    const navigate = useNavigate();
    // const { id } = useParams();
    // console.log(id, "id");

    const API_BASE_URL = environment.apiBaseUrl;

    const [productId, setProductId] = useState('');
    const [productname, setProduct_Name] = useState('');
    const [categoryname1, setCategoryName] = useState('');
    const [description1, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [status, setStatus] = useState('');
    const [img, setImage] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('Inactive'); // Default to 'Inactive'
    const [showDropdown, setShowDropdown] = useState(false); // Default is hidden
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    const [value, setValue] = useState('');


    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        setValue(myArray[2]);
        console.log(myArray[3],"kkkkkkkk");
        
        setProductId(myArray[3])
        getMethod(myArray[3]);
        console.log(myArray[2], "s");

    }, []);


    //create

    const saveButton = async (e) => {
        e.preventDefault();

        const vendorId = localStorage.getItem("vendorId");
        if (!vendorId) {
            // toast.error('Vendor ID not found in local storage.');
            return;
        }
        setLoading(true);

        try {
            const responseData = await create(
                vendorId,
                productname,
                categoryname1,
                description1,
                cost,
                img
            );

            if (responseData.apiStatus?.code === "200") {
                toast.success(responseData.apiStatus.message || "Product created successfully!");
                Navigate("/product-list");
            } else {
                toast.error(responseData.apiStatus.message || "Failed to create the product.");
            }
        } catch (error) {
            toast.error('An error occurred while creating the product.');
        } finally {
            setLoading(false);
        }
    };

    // update function
    const updateFunction = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const responseData = await productEditFunction(
                productId,
                productname,
                cost,
                categoryname1,
                description1,
                status,
                img
            );

            if (responseData.apiStatus.code === '200') {
                toast.success(responseData.apiStatus.message);

                navigate('/product-list');
            } else {
                console.error('API response error:', responseData.apiStatus.message);
                toast.error(responseData.apiStatus.message);
            }
        } catch (error) {
            console.error('Error in updateFunction:', error);
            toast.error('An error occurred while updating the Product.');
        } finally {
            setLoading(false);
        }
    };

    // image 
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    // Product-get method

    const getMethod = async (productId) => {
        try {
            const response = await fetch(`${API_BASE_URL}${API_URL.productget}${productId}`, {
                method: "GET",
            });

            const responceData = await response.json();
            const data = responceData.result.ProductList;

            console.log(data, "data");
            setProductId(data.id)
            setProduct_Name(data.name);
            setCost(data.price);
            setCategoryName(data.categoryName);
            setDescription(data.description);
            setImage(data.image_path);
            setStatus(data.status)
        } catch (errors) {
            console.error("Error handled =", errors);
            // toast.error("Failed to fetch vendor data");
        }
    };
    return (
        <div className="card">
            <div className="card-body">
                <form className="forms-sample" onSubmit={saveButton}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label htmlFor="productName">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    onChange={(e) => setProduct_Name(e.target.value)}
                                    value={productname}
                                    placeholder="Product Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cost">Cost</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="cost"
                                    onChange={(e) => setCost(e.target.value)}
                                    value={cost}
                                    placeholder="Cost"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="img">Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="img"
                                    onChange={handleImageChange}
                                />
                            </div>

                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label htmlFor="categoryname">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="categoryname"
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    value={categoryname1}
                                    placeholder="Category"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description1}
                                    placeholder="Description"
                                />
                            </div>

                            {value === "Edit" && (
                                <div >
                                    <div className="form-group" style={{ position: 'relative' }}>
                                        <label htmlFor="statusInput">Status</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="statusInput"
                                            onChange={(e) => setCurrentStatus(e.target.value)}
                                            value={currentStatus}
                                            placeholder="Hover to select status"
                                            readOnly
                                            style={{ cursor: 'pointer' }}
                                            onMouseOver={(e) => setShowDropdown(true)}
                                            onMouseOut={(e) => setShowDropdown(false)}
                                        />
                                        {/* Dropdown that appears outside the input */}
                                        {showDropdown && (
                                            <ul
                                                className="dropdown-menu"
                                                style={{
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    zIndex: 1000,
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    listStyle: 'none',
                                                    padding: '10px',
                                                    width: '100%',
                                                }}
                                                onMouseOver={() => setShowDropdown(true)} // Keep it open when hovering
                                                onMouseOut={() => setShowDropdown(false)} // Close when not hovering
                                            >
                                                <li
                                                    style={{ padding: '2px', cursor: 'pointer' }}
                                                    onClick={() => setCurrentStatus('Active')}
                                                >
                                                    Active
                                                </li>
                                                <li
                                                    style={{ padding: '2px', cursor: 'pointer' }}
                                                    onClick={() => setCurrentStatus('Inactive')}
                                                >
                                                    Inactive
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={() => navigate("/product-list")}>
                        Cancel
                    </button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    
                    {value === "Edit" ? <button onClick={updateFunction} className="btn btn-primary">update</button> : <button onClick={saveButton} className="btn btn-primary" >Create</button>}

                 

                 
                </form>
            </div>
        </div>
    );
}

export default ProductForm;
