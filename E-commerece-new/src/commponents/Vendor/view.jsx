import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OVERALLAPI from '../../api/over-all-api'
import Navbar from '../../shared/navbar'
import Sidenav from '../../shared/sidenav'
import Nodatafounded from '../../shared/NoDataFound'
import Footer from '../../shared/footer'
import { environment } from '../../api/api'
import IndexLayout from '../../views'



function VendorView() {

    // Vendor Usestate

    const Navigate = useNavigate()

    const [owner, setOwner] = useState('')
    const [shopName, setShopName] = useState()
    const [userName, setuserName] = useState('')
    const [phone, setPhone] = useState('')
    const [shopType, setShowType] = useState('')
    const [password, setPassword] = useState('')
    const [img, setImg] = useState(null)
    const [code, setCode] = useState('')
    const [status, setStatus] = useState('')
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
        // e.preventDefault();

        console.log(vendorId, "sss")

        try {
            const response = await OVERALLAPI.adminVendorGet(vendorId);
            if (response.apiStatus.code !== "200") {
                setListVendor(null);
                return;
            }
            if (!response || !response.result || !response.result.VendorData) {
                throw new Error("Invalid response data");
            }

            setListVendor(response.result.VendorData)
            // Extract the client data
            const dat = response.result.VendorData;
            console.log(dat, "dat");

            setOwner(dat.shop_owner)
            setShopName(dat.shop_name)
            setuserName(dat.username)
            setPhone(dat.contact)
            setShowType(dat.shop_type)
            setImg(dat.avatar)
            setStatus(dat.status)
            setCode(dat.code)

        } catch (error) {
            console.log("Error handled =", error);
        }

    };

    return (
        <div>
            {/* <Navbar /> */}
            {/* <div className="container-fluid page-body-wrapper full-page-wrapper"> */}
            {/* <Sidenav /> */}
            {/* <div className='main-panel' style={{ paddingTop: "80px" }}> */}
            <IndexLayout>
                <div className="content-wrapper">
                    <div class="page-header">
                        <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white me-2">
                                <i class="nav-icon bi-person-workspace menu-icon"></i>
                            </span>View Vendor</h3>
                        <div style={{ textAlign: "right" }}>
                            <a type="button" class="btn btn-primary" onClick={() => Navigate('/vendorlist')} data-discover="true" style={{ float: "right", marginBottom: "1px" }}>Back</a></div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {list ? <> 
                            <div className='row'>
                                <div style={{ paddingBottom: '35px' }} className='col-md-6 text-center '>
                                    <img className='chicken-img rounded' style={{ height: "250px", width: "250px" }} src={img ? `${environment.baseURL}${img}` : "/assets/images/noimages.jpg"} />

                                </div>
                                <div className='col-md-6 '>
                                    <h4 className='order-list'>Shop Name</h4>
                                    <h6 className='order-value p-0'>{owner}</h6>
                                    <h4 className='order-list'>Shop Owner</h4>
                                    <h6 className='order-value p-0'>{shopName}</h6>

                                    <h4 className='order-list'>User Name</h4>
                                    <h6 className='order-value p-0'>{userName}</h6>
                                </div>
                                <div className='col-md-6'>

                                    <h4 className='order-list'>Contact</h4>
                                    <h6 className='order-value p-0'>{phone}</h6>
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
                                        {status} Active
                                    </div>
                                </div>
                            </div>
                            </> : <Nodatafounded />
                                }












                            <div >

                            </div>


                        </div>
                    </div>
                </div>
            </IndexLayout>
            {/* <Footer /> */}
            {/* </div> */}
            {/* <!-- content-wrapper ends --> */}
            {/* </div> */}
        </div>
    )
}

export default VendorView
