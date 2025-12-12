import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ADMINAPI from '../../../api/services/AdminLogin/adminAPI';
import { environment } from '../../../api/api';
import Sidenav from '../../../shared/admin/Sidenav/sidenav';
import Navbar from '../../../shared/admin/Navbar/navbar';
import Footer from '../../../shared/footer';
import NoDataFounded from '../../../components/NoDataFound';

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

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    const productId = myArray[2];
     setListProduct(productId);
    productGetMethod(productId)
    console.log(productId)
  }, [])

  // Admin Product View
  const productGetMethod = async (productId) => {
    // e.preventDefault();

    console.log(productId, "fins")

    try {
      const response = await ADMINAPI.adminProductGet(productId);
      if (response.apiStatus.code !== "200") {
        setListProduct(null);
        return;
      }
      if (!response || !response.result || !response.result.ProductList) {
        throw new Error("Invalid response data");
      }
      const dat = response.result.ProductList;
      setListProduct(response.result.ProductList)

      setProducts(dat.name)
      setVendor(`${dat.code} - ${dat.name}`)
      setPrice(dat.price)
      setDescription(dat.description)
      setCatagory(dat.CategoryName)
      setImg(dat.image_path)
      setStatus(dat.status)

    } catch (error) {
      console.log("Error handled =", error);
    }

  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <Sidenav />
        <div className='main-panel' style={{paddingTop:"80px"}}>
        <div className="content-wrapper">
          <div class="page-header">
            <h3 class="page-title">
              <span class="page-title-icon bg-gradient-primary text-white me-2">
                  <i class="nav-icon fas fa-store menu-icon"></i>
                </span>Product View</h3>
                <div style={{textAlign: "right"}}>
              <a type="button" class="btn btn-primary" onClick={() => navigate('/adminproductlist')} data-discover="true" style={{float: "right", border: "none"}}>Back</a></div>
              </div>
          <div className="card">

            <div className="card-body">
                {list ? <>
                  <div className='row'>
                    <div style={{ paddingBottom: '35px' }} className='col-md-6 text-center'>
                      <img className='chicken-img rounded' style={{ height: "400px", width: "400px" }}  src={img ? `${environment.baseURL}${img}` : "/assets/images/noimages.jpg"} alt="Product image" />

                    </div>
                    <div className='col-md-6'>
                      <h4 className='order-list'>Vendor</h4>
                      <h6 className='order-value p-0'>{vendor}</h6>
                      <h4 className='order-list'>Price</h4>
                      <h6 className='order-value p-0'>{price}</h6>
                      <h4 className='order-list'>Catagory</h4>
                      <h6 className='order-value p-0'>{catagory}</h6>
                      <h4 className='order-list'>Product</h4>
                      <h6 className='order-value p-0'>{products}</h6>
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
                        {status}
                      </div>
                    </div>
                    <div className='col-md-12 mt-2'>
                      <h4 className='order-list'>Description</h4>
                      <h6 className='order-value p-0' style={{ color: "darkgray !important" }} dangerouslySetInnerHTML={{ __html: description }}></h6>
                    </div>
                  </div>
</> :                      <NoDataFounded />
 }
                





                



                <div >


                </div>

            </div>
          </div>
        </div>
          <Footer />

        </div>
      </div>
    </div>
  )
}

export default Adminproductview
