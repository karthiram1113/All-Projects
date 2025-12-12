import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import './index.css'
import Navbar from '../shared/navbar'
import Sidenav from '../shared/sidenav'
import Footer from '../shared/footer'
import IndexLayout from '../views'


function Dashboard() {
    const role = localStorage.getItem("role")
    const navigate = useNavigate()

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate("/");
    //     }
    // }, [navigate]);



    // const [userName, setUserNameState] = useState("name");
    const navCardsData = [
        ...(role === 'vendor'
            ? [{
                title: 'Product',
                description: "See what's happen to your product!",
                colorClass: 'card-white',
                icon: 'fas fa-store menu-icon',
                link: '/productlist',
                image: '/assets/images/dash-hs-2.png',
                style: { bottom: '-31px', right: '-23px' }

            },{
                title: 'Order',
                description: "See what's happen to your order!",
                colorClass: 'card-white',
                icon: 'fa-solid fa-cart-shopping',
                link: '/orderlist',
                image: '/assets/images/dash-hs-4.png',
                style: { bottom: '-15px', right: '-15px' }

                }, {
                title: 'Report',
                    description: "See what's happen to your report!",
                    colorClass: 'card-white',
                icon: ' fa fa-calendar menu-icon',
                link: '/monthlyreport',
                    image: '/assets/images/dash-hs-3.png'
                }]
            : []),
        ...(role === 'super_admin'
            ? [{
                title: 'Vendor',
                description: 'Manage dataset, view dataset reports across workspaces.',
                colorClass: 'card-white',
                icon: 'bi-person-workspace',
                link: '/vendorlist',
                image: '/assets/images/dash-hs-2.png',
                style: { bottom: '-30px', right: '-23px' }
            },
                {
                    title: 'Client',
                    description: "See what's happening at your company!",
                    colorClass: 'card-white',
                    icon: 'fas fa-user-friends',
                    link: '/clientlist',
                    image: '/assets/images/dash-hs-4.png',
                    style: { bottom: '-15px', right: '-15px' }

                },
                {
                    title: 'User',
                    description: 'Manage users, view user reports across workspaces.',
                    colorClass: 'card-white',
                    icon: 'fa-solid fa-user',
                    link: '/userlist',
                    image: '/assets/images/dash-hs-3.png'
                },]
            : []),
      
      
    ];

    const RightArrow = () => (
        <svg
            width="25" height="25" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" 
        >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
        </svg>
    );




    return (
        <>
                <IndexLayout>
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="nav-icon fa-solid fa-layer-group menu-icon"></i>
                            </span> Dashboard
                        </h3>
                    </div>
                    <div className="dashboard-container">
                        {navCardsData.map((card, idx) => (
                            <div key={idx} className={`dashboard-card ${card.colorClass}`}>
                                <div className="card-icon">
                                    <i className={card.icon}></i>
                                </div>
                                <div className="card-text">
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                </div>
                                <div className="card-arrow">
                                    <Link to={card.link} style={{ transform: 'rotate(45deg)' }}>
                                        <RightArrow />
                                    </Link>
                                </div>
                                <div className="card-decoration" style={card.style}>
                                    <img src={card.image} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </IndexLayout>
        </>
    )
}

export default Dashboard
