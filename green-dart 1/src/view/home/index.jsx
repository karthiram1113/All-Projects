import React from "react";
import DefaultLayout from "../../layout/defaultLayout";
import Home_Component from "../../component/home_components/banner";
import Home_About from "../../component/home_components/home-about";
import Constuct_Component from "../../component/home_components/home-construct";
import Home_Service from "../../component/home_components/home-service";
import Home_Choose from "../../component/home_components/home-choose";
import Feature_Component from "../../component/home_components/home-feature";
import Home_Testimonial from "../../component/home_components/home-testimonal";
import Home_New from "../../component/home_components/home-new";
import Home_Stats from "../../component/home_components/home-stats";

function Home() {
  return (
    <>
      <DefaultLayout>
        <Home_Component />
        {/* <Home_About /> */}
        <Constuct_Component />
        <Home_Service />
        <Home_Choose />
        <Feature_Component />
        <Home_Stats />
        {/* <Home_Testimonial /> */}
        {/* <Home_New /> */}
      </DefaultLayout>
    </>
  );
}

export default Home;
