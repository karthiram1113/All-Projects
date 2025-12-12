import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { environment } from '../../../api/api';
import VENDORAPI from '../../../api/services/vendorLogin/vendorAPI';


function VendorViewPage() {
    // Vendor Usestate
    const navigate = useNavigate();

    // const API_BASE_URL = environment.apiBaseUrl;

    const [vendorId, setVendorId] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopOwner, setShopOwner] = useState('');
    const [contact, setContact] = useState('');
    const [shopType, setShopType] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');

    // Useeffect Method
    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        const vendorId = myArray[2];

        vendorGetMethod(vendorId);
    }, []);

    // Vendor Get Api Method
    const vendorGetMethod = async (vendorId) => {
        try {
            const response = await VENDORAPI.vendorView(vendorId);

            if (!response || !response.result || !response.result.VendorData) {
                throw new Error("Invalid response data");
            }

            const data = response.result.VendorData;
            console.log(data, "dat");

            setVendorId(data.vendorId);
            setShopName(data.shop_name);
            setShopOwner(data.shop_owner);
            setContact(data.contact);
            setShopType(data.shop_type);
            setUserName(data.username);
            setImage(data.avatar);
            setStatus(data.status);

        } catch (error) {
            console.log("Error handled =", error);
        }
    };

    return (

        <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth">
                <div className="row flex-grow">
                    <div className="col-lg-6 mx-auto">
                        <div style={{ padding: '50px' }} className="auth-form-light text-left ">
                            <p className='ordername'>Vendor View Details</p>
                            <div className='row'>
                                <div style={{ paddingBottom: '35px' }} className='col-md-12 text-center'>
                       <img className="chicken-img"src={`${environment.baseURL}${image}`}alt="Vendor"style={{ height: '200px', width: '200px' }}/>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h4 className="order-list">Shop Name</h4>
                                    <h6 className="order-value">{shopName}</h6>
                                    <h4 className="order-list">Shop Owner</h4>
                                    <h6 className="order-value">{shopOwner}</h6>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h4 className="order-list">Shop Type</h4>
                                    <h6 className="order-value">{shopType}</h6>
                                    <h4 className="order-list">Contact</h4>
                                    <h6 className="order-value">{contact}</h6>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h4 className="order-list">User Name</h4>
                                    <h6 className="order-value">{userName}</h6>
                                </div>
                 
                            </div>
                            <div className="mb-3">
                                <h4 className="order-list">Status</h4>
                                <div
                                    className={`badge badges ${status === "Active"
                                        ? "badge-success"
                                        : status === "Inactive"
                                            ? "badge-danger"
                                            : status === "Pending"
                                                ? "badge-secondary"
                                                : "badge-warning"
                                        }`}
                                >
                                    {status}
                                </div>



                                <div >
                                    <button style={{ marginTop: '5px' }} onClick={() => navigate('/Vendorlist')} className='btn view-close btn-gradient-primary me-2'>Close</button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- content-wrapper ends --> */}
            </div>
        </div>

    );
}

export default VendorViewPage;
