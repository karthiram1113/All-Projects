import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { environment } from '../../../api/api';
import VENDORAPI from '../../../api/services/vendorLogin/vendorAPI';
import Navbar from '../../../shared/vendor/Navbar/navbar';
import Sidenav from '../../../shared/vendor/Sidenav/sidenav';
import NoDataFounded from '../../../components/NoDataFound';


function VendorViewPage() {
    // Vendor Usestate
    const navigate = useNavigate();

    // const API_BASE_URL = environment.apiBaseUrl;

    const [vendorId, setVendorId] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopOwner, setShopOwner] = useState('');
    const [contact, setContact] = useState('');
    const [code, setCode] = useState('');
    const [shopType, setShopType] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');
    const [list, setListVendor] = useState('');

    // Useeffect Method
    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        const vendorId = myArray[2];
        setListVendor(vendorId);
        vendorGetMethod(vendorId);
    }, []);

    // Vendor Get Api Method
    const vendorGetMethod = async (vendorId) => {
        try {
            const response = await VENDORAPI.vendorView(vendorId);
            if (response.apiStatus.code !== "200") {
                setListVendor(null);
                return;
            }
            if (!response || !response.result || !response.result.VendorData) {
                throw new Error("Invalid response data");
            }
            setListVendor(response.result.VendorData);
            const data = response.result.VendorData;
            console.log(data, "dat");

            setVendorId(data.id);
            setShopName(data.shop_name);
            setCode(data.code)
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
        <>
            <Navbar />
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                 <Sidenav />
                <div className='main-panel' style={{ paddingTop: "80px" }}>
                <div className="content-wrapper">
                        <div class="page-header">
                            <h3 class="page-title">
                                <span class="page-title-icon bg-gradient-primary text-white me-2">
                                    <i class="nav-icon bi-person-workspace menu-icon"></i>
                                </span>Vendor View</h3>
                            <div style={{ textAlign: "right" }}>
                                <a type="button" class="btn btn-primary" onClick={() => navigate('/Vendorlist')} data-discover="true" style={{ float: "right", marginBottom: "1px" }}>Back</a></div>
                        </div>
                        {/* <div className="row flex-grow  d-flex align-items-center auth">
                        <div className="col-lg-6 mx-auto">
                            <div style={{ padding: '50px' }} className="auth-form-light text-left ">
                                <p className='ordername'>Vendor View Details</p>
                                <div className='row'>
                                    <div style={{ paddingBottom: '35px' }} className='col-md-12 text-center'>
                                        <img className="chicken-img" src={image ? `${environment.baseURL}${image}` : "/assets/images/noimages.jpg"} alt="Vendor" style={{ height: '200px', width: '200px' }} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <h4 className="order-list">Shop Name</h4>
                                        <h6 className="order-value ps-0">{shopName}</h6>
                                        <h4 className="order-list">Shop Owner</h4>
                                        <h6 className="order-value ps-0">{shopOwner}</h6>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <h4 className="order-list">Shop Type</h4>
                                        <h6 className="order-value ps-0">{shopType}</h6>
                                        <h4 className="order-list">Contact</h4>
                                        <h6 className="order-value ps-0">{contact}</h6>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <h4 className="order-list">User Name</h4>
                                        <h6 className="order-value ps-0">{userName}</h6>
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
                    </div> */}
                     <div className="card">
                                  <div className="card-body">
                                {list ? <><div className='row'>
                                    <div style={{ paddingBottom: '35px' }} className='col-md-6 text-center '>
                                        <img className='chicken-img rounded' style={{ height: "250px", width: "250px" }} src={image ? `${environment.baseURL}${image}` : "/assets/images/noimages.jpg"} />

                                    </div>
                                    <div className='col-md-6 '>
                                        <h4 className='order-list'>Shop Name</h4>
                                        <h6 className='order-value p-0'>{shopName}</h6>
                                        <h4 className='order-list'>Shop Owner</h4>
                                        <h6 className='order-value p-0'>{shopName}</h6>

                                        <h4 className='order-list'>User Name</h4>
                                        <h6 className='order-value p-0'>{userName}</h6>
                                    </div>
                                    <div className='col-md-6'>

                                        <h4 className='order-list'>Contact</h4>
                                        <h6 className='order-value p-0'>{contact}</h6>
                                        <h4 className='order-list'>Shop Type</h4>
                                        <h6 className='order-value p-0'>{shopType}</h6>
                                    </div>
                                    <div className='col-md-6'>
                                        <h4 className='order-list'>Code</h4>
                                        <h6 className='order-value p-0'>{code}</h6>
                                        <h4 className='order-list'>Status</h4>
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
                                    </div>
                                </div></> : <NoDataFounded />
}
                                    
                                   
                                 
                                  
                                       
                                      
                                       
                                        
                    
                          
                                
                    <div >
                    
                    </div>
                                    
                    
                                </div>
                              </div>
                </div>
                </div>
            </div>
        </>
        

    );
}

export default VendorViewPage;
