import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";
import { vendorCreate, vendorEditFunction } from '../../service/apiserver';

import { environment } from '../../environments/enviornments';
import { API_URL } from '../../service/api-endpoint';

function VendorForm() {
    const navigate = useNavigate();
    // const { id } = useParams(); // This should capture the 'id' from the URL
    // console.log(id, "id");

    const API_BASE_URL = environment.apiBaseUrl;

    const [id, setVendorId] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopOwner, setShopOwner] = useState('');
    const [contact, setContact] = useState('');
    const [shopType, setShopType] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [status, setStatus] = useState('')


    // for loadingstate
    const [loading, setLoading] = useState(false);


    // for dynamic input box
    const [value, setValue] = useState('');

    // for validation 
    const [submit, setSumbit] = useState(false);


    //create
    const saveButton = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSumbit(true)

        try {
            const responseData = await vendorCreate(
                shopName,
                shopOwner,
                contact,
                shopType,
                userName,
                image,
                password,
                confirmPassword,
                status

            );

            if (responseData.apiStatus?.code === "200") {
                toast.success(responseData.apiStatus.message);
                navigate("/vendorlist");
            } else {
                toast.error(responseData.apiStatus.message);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    // update function
    const updateFunction = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSumbit(true)

        try {
            const responseData = await vendorEditFunction(
                   id,
                shopName,
                shopOwner,
                contact,
                shopType,
                userName,
                image,
                password,
                confirmPassword,
                currentPassword,
                status
            );

            if (responseData.apiStatus.code === '200') {
                toast.success(responseData.apiStatus.message);

                navigate('/vendorlist');
            } else {
                console.error('API response error:', responseData.apiStatus.message);
                toast.error(responseData.apiStatus.message);
            }
        } catch (error) {

            setLoading(false);
        }
    };

    // image 
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        setValue(myArray[2]);

        // Call getMethod only if in edit mode
        if (myArray[2] === "Edit" && myArray[3]) {
            getMethod(myArray[3]);
        }

    }, []);


    // get api 

    const getMethod = async (id) => {
        // let token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_BASE_URL}${API_URL.vendorGet}${id}`, {
                method: "GET",

            });


            const responceData = await response.json();
            const data = responceData.result.VendorData;


            // console.log(data, "data");
            setVendorId(data.id)

            setShopName(data.shop_name);

            setShopOwner(data.shop_owner);
            setContact(data.contact);
            setShopType(data.shop_type);
            setUserName(data.username);

            setImage(data.avatar);
            setStatus(data.status);
            setVendorId(data.id);

        } catch (errors) {

        }
    };


    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <form className="forms-sample">
                        <div className='row'>
                            {/* Form Fields */}
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="shopName">Shop Name*</label>
                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                        onChange={(e) => setShopName(e.target.value)}
                                        style={
                                            submit && (shopName.length === 0)
                                                ? { borderColor: 'red' }
                                                : {}
                                        }
                                        value={shopName}
                                        placeholder="Shop name" />
                                    {submit && shopName.length == 0 ? <div className='text-danger'>Shop name is required</div> : <></>}
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Shop owner*</label>
                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                        onChange={(e) => setShopOwner(e.target.value)}
                                        style={
                                            submit && (shopName.length === 0)
                                                ? { borderColor: 'red' }
                                                : {}
                                        }
                                        value={shopOwner}
                                        placeholder="Shop owner" />
                                    {submit && shopOwner.length == 0 ? <div className='text-danger'>Shop owner name is required</div> : <></>}
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Username</label>
                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                        onChange={(e) => setUserName(e.target.value)}
                                        value={userName}
                                        placeholder="username" />
                                </div>
                            </div>


                            <div className='col-md-4'>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Shop Type</label>
                                    <select value={shopType} onChange={(e) => setShopType(e.target.value)} className="form-control" id="exampleInputGender" style={{ height: '44px', fontSize: '12px', borderColor: "red" }}>
                                        <option hidden>Select Shop type</option>
                                        <option value="Dry Goods">Dry Goods</option>
                                        <option value="Anyy">Anyy</option>
                                        <option value="Cosmetics">Cosmetics</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputGender">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="form-control"
                                        id="exampleInputGender"
                                        style={{ height: '44px', fontSize: '12px', borderColor: "red" }}
                                    >
                                        <option hidden>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>


                            <div className='col-md-6'>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Contact*</label>
                                    <input type="text" class="form-control" id="exampleInputUsername1"
                                        onChange={(e) => setContact(e.target.value)}
                                        maxLength={12}
                                        style={
                                            submit && (contact.length < 10 || contact.length === 0)
                                                ? { borderColor: 'red' }
                                                : {}
                                        }
                                        value={contact}
                                        placeholder="Contact" />
                                    {submit && contact.length == 0 ? <div className='text-danger'>Phone number is required</div> : <></>}
                                    {submit && contact.length < 10 && contact.length > 0 && (
                                        <div className="text-danger">Phone number should be at least 10 digits</div>
                                    )}
                                </div>
                            </div>



                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="exampleInputUsername1">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="exampleInputUsername1"
                                        onChange={handleImageChange}

                                        placeholder="image"
                                    />
                                </div>
                            </div>



                            <div className='col-md-4'>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputUsername1"
                                        onChange={(e) => setPassword(e.target.value)}

                                        placeholder="password" />


                                </div>

                            </div>

                            <div className='col-md-4'>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">ConfirmPassword</label>
                                    <input type="password" class="form-control" id="exampleInputUsername1"
                                        onChange={(e) => setConfirmPassword(e.target.value)}

                                        placeholder="confirmPassword" />


                                </div>

                            </div>


                            {value === "Edit" && (
                                <div className='col-md-4'>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Current Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputUsername1"
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            value={currentPassword}
                                            placeholder="Current Password"
                                        />
                                    </div>
                                </div>
                            )}


                        </div>
                        <div style={{ textAlign: 'center' }}>




                            <button type="button" class="btn btn-light" onClick={() => navigate("/vendorlist")}>
                                Cancel
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {value === "Edit" ? <button onClick={updateFunction} class="btn btn-gradient-primary me-2">Update</button>
                                : <button onClick={saveButton} class="btn btn-gradient-primary me-2" >Create</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VendorForm;