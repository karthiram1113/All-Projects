import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { environment } from '../../../api/api';
import VENDORAPI from '../../../api/services/vendorLogin/vendorAPI';
import Footer from '../../../shared/footer';
import Sidenav from '../../../shared/vendor/Sidenav/sidenav'
import Navbar from '../../../shared/vendor/Navbar/navbar';
import NoDataFounded from '../../../components/NoDataFound';

function CategoryViewPage() {
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
    const [list, setListOrder] = useState('');

    // Useeffect Method
    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        const vendorId = myArray[2];
        setListOrder(vendorId);
        vendorGetMethod(vendorId);
    }, []);

    // Vendor Get Api Method
    const vendorGetMethod = async (vendorId) => {
        try {
            const response = await VENDORAPI.vendorCategoryView(vendorId);
            if (response.apiStatus.code !== "200") {
                setListOrder(null);
                return;
            }
            if (!response || !response.result || !response.result.CategoryData) {
                throw new Error("Invalid response data");
            }
            setListOrder(response.result.CategoryData);
            const data = response.result.CategoryData;
            console.log(data, "dat");


            setShopName(data.name);
            setShopOwner(data.vendor_id);
            setShopType(data.description);
            setUserName(data.username);
            setStatus(data.status);

        } catch (error) {
            console.log("Error handled =", error);
        }
    };

    return (
    <div>
            <Navbar />
        <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <Sidenav />
            <div className='main-panel' style={{ paddingTop: "80px" }}>
            <div className="content-wrapper ">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white me-2">
                                    <i class="nav-icon fa-solid fa-icons menu-icon"></i>
                        </span>Category View</h3>
                    <div style={{ textAlign: "right" }}>
                        <a type="button" class="btn btn-primary" onClick={() => navigate('/vendorCategorylist')} data-discover="true" style={{ float: "right", border: "none" }}>Back</a></div>
                </div>
                        <div className="row d-flex justify-content-start align-items-center auth ">
                            <div className="">
                                <div style={{ padding: '50px', borderRadius: '5px' }} className="auth-form-light text-left ">

                        {list ? <>
                            
                                    <div className='row'>
                                        <div className="col-md-6 mb-3">
                                            <h4 className="order-list">Name</h4>
                                            <h6 className="order-value ps-0">{shopName}</h6>
                                            <h4 className="order-list">Vendor Id</h4>
                                            <h6 className="order-value ps-0">{shopOwner}</h6>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h4 className="order-list">Description</h4>
                                            <h6 className="order-value ps-0">{shopType}</h6>
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
                                        </div>


                                    </div>
                                
                        </> : <NoDataFounded />
                            }
                                </div>
                            </div>
                            </div>
                        
                {/* <!-- content-wrapper ends --> */}
            </div>
            <Footer/>
            </div>
        </div>
        </div>
    );
}

export default CategoryViewPage;
