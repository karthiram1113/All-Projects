import React, { useRef } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import CategoryImage1 from '../../../assets/category-img-removebg-preview.png';
import CategoryImage2 from '../../../assets/category-image2.png';
import CategoryImage3 from '../../../assets/category-image3-removebg-preview.png';
import CategoryImage4 from '../../../assets/category-img4-removebg-preview.png';
import { Link } from "react-router-dom";
// import CategoryImage5 from './../../assets/category-img5.avif';
// import CategoryImage6 from './../../assets/category-img6.avif';
function BannerSecond() {
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "next" ? 300 : -300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <h4 className="mt-4 text-start">Shop by Category</h4>

      <div className="carousel-container">
        <button
          className="carousel-btn prev"
          onClick={() => handleScroll("prev")}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="carousel-wrapper d-flex" ref={containerRef}>
          <div className="product-card">
            <Link to={'/categary-list'}>
            <img
              src={CategoryImage1}
              alt="Product 1"
              className="img-fluid mb-3"
              style={{ height: "150px", objectFit: "contain" }}
            /></Link>
            <p className="text-truncate">Fruits & Vegitables<br/><span className="category-items-count">(100-items)</span></p>
          </div>
          <div className="product-card">
          <Link to={'/categary-list'}>
            <img
              src={CategoryImage2}
              alt="Product 1"
              className="img-fluid mb-3"
              style={{ height: "150px", objectFit: "contain" }}
            /></Link>
            <p className="text-truncate">Meat & Fish<br/><span className="category-items-count">(10-items)</span></p>
          </div>
          <div className="product-card">
          <Link to={'/categary-list'}>
            <img
              src={CategoryImage3}
              alt="Product 1"
              className="img-fluid mb-3"
              style={{ height: "150px", objectFit: "contain" }}
            /></Link>
            <p className="text-truncate">Juices<br/><span className="category-items-count">(30-items)</span></p>
          </div>
          <div className="product-card">
          <Link to={'/categary-list'}>
            <img
              src={CategoryImage4}
              alt="Product 1"
              className="img-fluid mb-3"
              style={{ height: "150px", objectFit: "contain" }}
            /></Link>
            <p className="text-truncate">Snacks<br/><span className="category-items-count">(50-items)</span></p>
          </div>
          <div className="product-card">
          <Link to={'/categary-list'}>
            <img
              src={CategoryImage1}
              alt="Product 1"
              className="img-fluid mb-3"
              style={{ height: "150px", objectFit: "contain" }}
            /></Link>
            <p className="text-truncate">Fruits & Vegitables<br/><span className="category-items-count">(100-items)</span></p>
          </div>
          <div className="product-card">
            <img
              src={CategoryImage2}
              alt="Product 1"
              className="img-fluid mb-3"
              style={{ height: "150px", objectFit: "contain" }}
            />
            <p className="text-truncate">Fruits & Vegitables<br/><span className="category-items-count">(100-items)</span></p>
          </div>
          <div className="product-card">
            <img
              src={CategoryImage3}
              alt="Product 1"
              className="img-fluid mb-3"
              style={{ height: "150px", objectFit: "contain" }}
            />
            <p className="text-truncate">Fruits & Vegitables<br/><span className="category-items-count">(100-items)</span></p>
          </div>
        </div>
        <button
          className="carousel-btn next"
          onClick={() => handleScroll("next")}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </>
  );
}

export default BannerSecond;
