import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import OVERALLAPI from '../../api/over-all-api';
import Navbar from '../../shared/navbar';
import Sidenav from '../../shared/sidenav';
import { environment } from '../../api/api';
import Nodatafounded from '../../shared/NoDataFound';
import Footer from '../../shared/footer';
import IndexLayout from '../../views';


function OrderView() {

  // View Usestate
  const [reference, setReference] = useState();
  const [vendor, setVendor] = useState('')
  const [client, setClient] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('')
  const [img, setImg] = useState(null)
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [amount, setAmount] = useState('')
  const [cName, setCName] = useState('')
  const [product, setProducts] = useState([])
  const navigate = useNavigate('')
  const [list, setListOrder] = useState('');

  // useEffect(() => {
  //   const queryParams = window.location.pathname;
  //   const myArray = queryParams.split("/");
  //   const orderId = myArray[2];
  //   setListOrder(orderId);
  //   orderGetMethod(orderId)
  // }, [])


  // const orderGetMethod = async (orderId) => {
  //   // e.preventDefault();

  //   console.log(orderId, "fins")

  //   try {
  //     const response = await OVERALLAPI.adminOrderGet(orderId);
  //     if (response.apiStatus.code !== "200") {
  //       setListOrder(null);
  //       return;
  //     }
  //     if (!response || !response.result || !response.result.OrderData) {
  //       throw new Error("Invalid response data");
  //     }
  //     setListOrder(response.result.OrderData)
  //     const dat = response.result.OrderData;
  //     const dat1 = response.result.OrderData.products

  //     console.log(dat, "dat");
  //     console.log(environment.baseURL, 'url');

  //     setReference(dat.refernce_code)
  //     setClient(`${dat.clientRefercode} - ${dat.firstname}, ${dat.lastname}`);

  //     setVendor(`${dat.ShopRefercode} -${dat.Shop_name}`)
  //     setAddress(dat.DeliveryAddress)
  //     setStatus(dat.status)
  //     setAmount(dat.total_amount)
  //     setCName(`${dat.ShopRefercode} - ${dat.Shop_name}`)
  //     setPrice(dat.total_price)
  //     setQuantity(dat.total_quantity)
  //     setProducts(dat1)
  //     // setImg(dat1.map((data) => (data.image)))



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
                  <i class="nav-icon fa-solid fa-cart-shopping menu-icon"></i>
                </span>View Order</h3>
              <div style={{ textAlign: "right" }}>
                <a type="button" class="btn btn-primary" onClick={() => navigate('/orderlist')} data-discover="true" style={{ float: "right", border: "none" }}>Back</a></div>
            </div>
            {/* {list ? <> */}
              <div className="card">
              <div className="card-body">
                <div className='row'>
                  <div className='col-md-6 '>
                    <h4 className='order-list'>Reference Code</h4>
                    <h6 className='order-value p-0'>{reference}</h6>
                    <h4 className='order-list'>Client</h4>
                    <h6 className='order-value p-0'>{client}</h6>
                    <h4 className='order-list'>Status</h4>
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
                  </div>
                  </div>
                  <div className='col-md-6'>
                    <h4 className='order-list'>Vendor</h4>
                    <h6 className='order-value p-0'>{vendor}</h6>
                    <h4 className='order-list'>Delivery Address</h4>
                    <h6 className='order-value p-0'>{address}</h6>
                    <h4 className='order-list'>Shop Reference Code</h4>
                    <h6 className='order-value p-0'>{cName}</h6>
                  </div>
                </div>

              </div>
            </div>

              <div className='row'>

                {product.map((item, index) => (
                  <div className={`col-md-4 col-sm-6  ${product.length === 1 ? 'col-xl-12 col-lg-12 col-md-6' : 'col-xl-4 col-lg-4'}`}>
                    <div className='card mt-3'>

                      <div key={index} className="polaroid text-start d-flex justify-content-around">
                        <div className=''>
                          <img className='chicken-img rounded' style={{ height: "90px", width: "90px" }} src={`${environment.baseURL}${item.image}`} alt="" />
                        </div>
                        <div className=''>
                          <h4>{item.name}</h4>
                          <div className='order-value ps-0 mt-2 text-start'>Price  :  {item.price}</div>

                          <div className='order-value ps-0 mt-2 text-start'>Quantity :     {item.quantity}</div>


                        </div>


                      </div>

                    </div>
                  </div>
                ))}

              </div>

              <div className='row'>
                <div className={`col-md-12 col-sm-6 mt-3 ${product.length === 1 ? 'col-xl-6 col-lg-6 col-md-6' : 'col-xl-12 col-lg-12'}`}>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='d-flex justify-content-between'>
                        <div>
                          <h4 className='order-list'>Total Price</h4>
                          <h6 className='order-value p-0'>{price}</h6>
                        </div>
                        <div>
                          <h4 className='order-list'>Total Quantity</h4>
                          <h6 className='order-value p-0'>{quantity}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </> :
              <div className='card'>
                <div className='card-body'>
                  <Nodatafounded />

                </div>
              </div>


            } */}




          </div>
      </IndexLayout>
          {/* <Footer /> */}

        {/* </div> */}

      {/* </div> */}


    </div>
  )
}

export default OrderView
