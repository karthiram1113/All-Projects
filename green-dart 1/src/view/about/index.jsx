import React from "react";
import DefaultLayout from "../../layout/defaultLayout";
import Navbar from "../../shared/navbar";
import AboutBanner from "../../component/about_components/banner";
import AboutStats from "../../component/about_components/about-Stats";
import Home_Choose from "../../component/home_components/home-choose";
import AboutMoments from "../../component/about_components/about-moments";
import Home_About from "../../component/home_components/home-about";
import Team from "../../component/about_components/team";

function About() {
  return (
    <>
      <DefaultLayout>
        <AboutBanner/>
        <Home_About />
        <AboutStats/>
        <Home_Choose/>
        <AboutMoments/>
        <Team/>
      </DefaultLayout>
    </>
  );
}

export default About;
