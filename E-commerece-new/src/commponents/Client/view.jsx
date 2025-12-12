import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import OVERALLAPI from '../../api/over-all-api';
import Navbar from '../../shared/navbar';
import Sidenav from '../../shared/sidenav';
import Nodatafounded from '../../shared/NoDataFound';
import Footer from '../../shared/footer';
import { environment } from '../../api/api';
import IndexLayout from '../../views';

function ClientView() {
    const navigate = useNavigate()

    const [logtype, setLogType] = useState('')
    const [shopName, setShopName] = useState()
    const [lastname, setLastName] = useState()
    const [firstname, setFirstName] = useState()
    const [userName, setuserName] = useState('')
    const [phone, setPhone] = useState('')
    const [shopType, setShowType] = useState('')
    const [password, setPassword] = useState('')
    const [img, setImg] = useState(null)
    const [code, setCode] = useState('')
    const [status, setStatus] = useState('')
    const [list, setListUser] = useState('');

    // Useeffect Method

    // useEffect(() => {
    //     const queryParams = window.location.pathname;
    //     const myArray = queryParams.split("/");
    //     const vendorId = myArray[2];
    //     setListUser(vendorId);
    //     vendorGetMethod(vendorId);

    // }, []);



    // Vendor Get Api Method
    // const vendorGetMethod = async (vendorId) => {
    //     // e.preventDefault();


    //     try {
    //         const response = await OVERALLAPI.adminUserView(vendorId);
    //         if (response.apiStatus.code !== "200") {
    //             setListUser(null);
    //             return;
    //         }
    //         setListUser(response.result.AdminData)
    //         const dat = response.result.AdminData;
    //         console.log(dat, "dat");

    //         setFirstName(dat.firstname)
    //         setLastName(dat.lastname)
    //         setuserName(dat.username)
    //         setPassword(dat.password)
    //         setLogType(dat.type)
    //         setImg(dat.avatar)

    //     } catch (error) {
    //         console.log("Error handled =", error);
    //     }

    // };


    return (
        <div>
            {/* <Navbar /> */}
            {/* <div className="container-fluid page-body-wrapper full-page-wrapper"> */}
                {/* <Sidenav /> */}
                {/* <div className='main-panel' style={{ paddingTop: "80px" }}> */}
            <IndexLayout>
                    <div className="content-wrapper ">
                        <div class="page-header">
                            <h3 class="page-title">
                                <span class="page-title-icon bg-gradient-primary text-white me-2">
                                    <i class="nav-icon fa-solid fa-user menu-icon"></i>
                                </span>View Client</h3>
                            <div style={{ textAlign: "right" }}>
                                <a type="button" class="btn btn-primary" onClick={() => navigate('/clientlist')} data-discover="true" style={{ float: "right", marginBottom: "1px" }}>Back</a></div>
                        </div>
                        {/* {list ? <>  */}
                        <div className="row flex-grow auth ms-0 me-0">
                                <div style={{ padding: '50px', borderRadius: "5px" }} className="auth-form-light">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div style={{ width: "100%", height: "100%", maxWidth: "100%", maxHeight: "300px", overflow: "hidden" }}>
                                                <img
                                                    className="img-fluid rounded"
                                                    style={{ width: "100%", height: "100%" }}
                                                    src={img ? `${environment.baseURL}${img}` : "/assets/images/noimages.jpg"}
                                                    alt="User"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <h4 className="order-list">First Name</h4>
                                            <h6 className="order-value ps-0">{firstname}</h6>

                                            <h4 className="order-list">Login Type</h4>
                                            <h6 className="order-value ps-0">{logtype}</h6>

                                            <h4 className="order-list">Last Name</h4>
                                            <h6 className="order-value ps-0">{lastname}</h6>

                                            <h4 className="order-list">User Name</h4>
                                            <h6 className="order-value ps-0">{userName}</h6>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        {/* </> :
                        <div className="row flex-grow auth ms-0 me-0">
                                <div style={{ padding: '50px', borderRadius: "5px" }} className="auth-form-light">

                        <Nodatafounded />
                        </div>
                        </div>
                        } */}


                    </div>
            </IndexLayout>
                    {/* <Footer /> */}
                {/* </div> */}
                {/* <!-- content-wrapper ends --> */}
            {/* </div> */}
        </div>
    )
}

export default ClientView
