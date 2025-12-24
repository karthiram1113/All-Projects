import React, { useEffect } from "react";
import Navbar from "../../shared/navbar";
import Footer from "../../shared/footer";

function DefaultLayout(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <main class="main">
        <>{props.children}</>
      </main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
