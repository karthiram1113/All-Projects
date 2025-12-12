import React from "react";
import Navbar from "../../Component/common/Navbar";
import Banner from "../../Component/Home/Banner";
import Banner_second from "../../Component/Home/Banner-second";
import OfferBanner from "../../Component/Home/Offer-Banner";
import Products from "../../Component/Home/Products";
import Footer from "../../Component/common/Footer";
import Offer_Card from "../../Component/Home/offer-card";
import Title from "../../Component/Title";

function Home() {
    return (
        <>
            <Title title="HS Grocery Store :: HOME">
                <Navbar />
                <div className="container">
                    <Banner />
                    <OfferBanner />
                    <Banner_second />

                    <Products />

                    <Offer_Card />
                </div>
                <Footer />
            </Title>
        </>
    )
}

export default Home;