import React from "react";
import DefaultLayout from "../../layouts/defaultLayout";
import Home_Component from "../../components/Home-component";
import Title from '../../components/Title'

function Home() {
  return (
    <>  
      <Title title="Home | Ruposhi Global">
        <DefaultLayout>
          <Home_Component />
        </DefaultLayout>
      </Title>
    </>
  );
}

export default Home;
