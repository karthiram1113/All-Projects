import React, { useEffect, useState } from 'react'
import Navbar from '../../../shared/admin/Navbar/navbar'
import Sidenav from '../../../shared/admin/Sidenav/sidenav'
import { Link } from 'react-router-dom'
import Userform from '../forms/userList/userform'
import Footer from '../../../shared/footer'

function Userformpage() {

    // Navigate

    const Navigate = useState('')
    const [urlName, setUrlName] = useState('')


    // Useeffect Method

    useEffect(() => {

        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        setUrlName(myArray[2])

    }, []);

    return (
        <div>
            <Navbar />

            {/* User Form */}

            <div className="container-fluid page-body-wrapper">

                <Sidenav />

                <div style={{ paddingTop: "80px" }} className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-gradient-primary text-white me-2">
                                     <i className="nav-icon fas fa-user menu-icon"></i>
                                </span> Userlist {urlName}  Form
                            </h3>
                            {/* {urlName == "Create" ? <div style={{ textAlign: "right" }}>
                                <Link
                                    to={"/adminuserlist"}
                                    style={{
                                        float: "right",
                                        marginBottom: "15px",
                                        backgroundColor: "#9a55ff",
                                    }}
                                    type="button"
                                    class="btn btn-primary"
                                >
                                    Back
                                </Link>
                            </div> : <div style={{ textAlign: "right" }}>
                                <Link
                                    to={"/adminuserlist"}
                                    style={{
                                        float: "right",
                                        marginBottom: "15px",
                                        backgroundColor: "#9a55ff"
                                        // marginTop: "10px",
                                    }}
                                    type="button"
                                    class="btn btn-primary"
                                >
                                    Back
                                </Link>
                            </div>} */}

                        </div>



                        {/* User Form */}

                        <Userform />

                    </div>
      <Footer />

                </div>

            </div>
        </div>
    )
}

export default Userformpage
