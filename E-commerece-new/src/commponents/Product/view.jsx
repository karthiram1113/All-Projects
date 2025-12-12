import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OVERALLAPI from '../../api/over-all-api';

import Sidenav from '../../shared/sidenav';
import Nodatafounded from '../../shared/NoDataFound';
import Footer from '../../shared/footer';
import { environment } from '../../api/api';
import Navbar from '../../shared/navbar';
import IndexLayout from '../../views';







function Adminproductview() {

  // View Usestate
  const [products, setProducts] = useState();
  const [vendor, setVendor] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [catagory, setCatagory] = useState('')
  const [status, setStatus] = useState('')
  const [img, setImg] = useState('')
  const [list, setListProduct] = useState('');

  const navigate = useNavigate('')

  // useEffect(() => {
  //   const queryParams = window.location.pathname;
  //   const myArray = queryParams.split("/");
  //   const productId = myArray[2];
  //    setListProduct(productId);
  //   productGetMethod(productId)
  //   console.log(productId)
  // }, [])

  // Admin Product View
  // const productGetMethod = async (productId) => {
  //   // e.preventDefault();

  //   console.log(productId, "fins")

  //   try {
  //     const response = await OVERALLAPI.adminProductGet(productId);
  //     if (response.apiStatus.code !== "200") { 
  //       setListProduct(null);
  //       return;
  //     }
  //     if (!response || !response.result || !response.result.ProductList) {
  //       throw new Error("Invalid response data");
  //     }
  //     const dat = response.result.ProductList;
  //     setListProduct(response.result.ProductList)

  //     setProducts(dat.name)
  //     setVendor(`${dat.code} - ${dat.name}`)
  //     setPrice(dat.price)
  //     setDescription(dat.description)
  //     setCatagory(dat.CategoryName)
  //     setImg(dat.image_path)
  //     setStatus(dat.status)

  //   } catch (error) {
  //     console.log("Error handled =", error);
  //   }

  // };

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
                  <i class="nav-icon fas fa-store menu-icon"></i>
                </span>Product View</h3>
              <div style={{ textAlign: "right" }}>
                <a type="button" class="btn btn-primary" onClick={() => navigate('/productlist')} data-discover="true" style={{ float: "right", border: "none" }}>Back</a></div>
            </div>
            <div className="card">

              <div className="card-body">
                {/* {list ? <> */}
                <div className='row'>
                  <div style={{ paddingBottom: '35px' }} className='col-md-6 text-center'>
                    <div>
                      <div style={{
                        width: "100%",
                        height: "100%",
                      }}>
                        <img className='img-fluid rounded'  src={img ? `${environment.baseURL}${img}` : "/assets/images/tom-min.jpg"} alt="Product image" />

                      </div>
                      <div className="preview-container gap-3">
                        <img className='img-fluid rounded-circle' style={{ height: "50px", width: "50px" }} src={img ? `${environment.baseURL}${img}` : "/assets/images/tom-min.jpg"} alt="Product image" />
                        <img className='img-fluid rounded-circle' style={{ height: "50px", width: "50px" }} src={img ? `${environment.baseURL}${img}` : "/assets/images/tom-min.jpg"} alt="Product image" />
                        <img className='img-fluid rounded-circle' style={{ height: "50px", width: "50px" }} src={img ? `${environment.baseURL}${img}` : "/assets/images/tom-min.jpg"} alt="Product image" />
                        <img className='img-fluid rounded-circle' style={{ height: "50px", width: "50px" }} src={img ? `${environment.baseURL}${img}` : "/assets/images/tom-min.jpg"} alt="Product image" />
                        <img className='img-fluid rounded-circle' style={{ height: "50px", width: "50px" }} src={img ? `${environment.baseURL}${img}` : "/assets/images/tom-min.jpg"} alt="Product image" />
                      </div>
                    </div>

                  </div>
                  <div className='col-md-6'>
                    <h4 className='order-list'>Nattu tomato</h4>
                    {/* <h6 className='order-value p-0'>{vendor} name</h6> */}
                    <div className="rating">
                      <span className="stars">
                        ★★★★☆{/* 4 filled stars, 1 empty star */}
                      </span>
                      <span className="numeric-rating">7/10</span>
                    </div>
                    {/* <h4 className='order-list'>Description</h4> */}
                    <h6 className='order-value p-0'>{price} Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel doloribus quis deserunt est quae minus repellendus debitis, inventore sit iusto, cupiditate ipsum sed perferendis vitae officiis molestias cum esse officia.</h6>
                    {/* <h4 className='order-list'>Product Spec</h4>
                      <h6 className='order-value p-0'>{price}product</h6> */}
                    <div className="price-section text-start">
                      <span className="price-current fw-semibold">₹140</span>
                      <span className="price-original">₹198</span>
                      {/* <span className="free-shipping">Free shipping</span> */}
                    </div>
                    <div className='Qty-section text-start mt-3'>
                      <h4 className='order-list p-0'>Qty</h4>
                      <h6 className='order-value p-0'>{catagory}55</h6>
                    </div>

                    {/* <h4 className='order-list'>Cost Per Unit</h4>
                      <h6 className='order-value p-0'>$ {products}500</h6> */}
                    {/* <h4 className='order-list'>Offer Percentage</h4>
                      <h6 className='order-value p-0'>% {products}50</h6> */}
                    {/* <h4 className='order-list'>Status</h4>
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
                      </div> */}
                  </div>
                  {/* <div className='col-md-6 mt-2'>
                      <h4 className='order-list'>Review</h4>
                      <h6 className='order-value p-0' style={{ color: "darkgray !important" }} dangerouslySetInnerHTML={{ __html: description }}></h6>
                    <h6 className='order-value p-0'>{price}best product</h6>

                    </div> */}
                  {/* <div className='col-md-6 mt-2'>
                      <h4 className='order-list'>Description</h4>
                      <h6 className='order-value p-0' style={{ color: "darkgray !important" }} dangerouslySetInnerHTML={{ __html: description }}></h6>
                    <h6 className='order-value p-0'>{price}good product</h6>

                    </div> */}
                </div>
                {/* </> :                      <Nodatafounded />
 } */}










                <div >


                </div>

              </div>
            </div>
          </div>
        </IndexLayout>
          {/* <Footer /> */}

        {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default Adminproductview
