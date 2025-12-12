import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ADMINAPI from "../../../api/services/AdminLogin/adminAPI";
import { environment } from "../../../api/api";
import Navbar from "../../../shared/admin/Navbar/navbar";
import Sidenav from "../../../shared/admin/Sidenav/sidenav";
import Footer from "../../../shared/footer";
import NoDataFounded from "../../../components/NoDataFound";

function AdminShopView() {
  // Vendor Usestate

  const Navigate = useNavigate();

  const [owner, setOwner] = useState("");
  const [shopName, setShopName] = useState();
  const [userName, setuserName] = useState("");
  const [phone, setPhone] = useState("");
  const [shopType, setShowType] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [list, setListShop] = useState('');

  // Useeffect Method

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    const vendorId = myArray[2];
    setListShop(vendorId);
    vendorGetMethod(vendorId);
  }, []);

  // Vendor Get Api Method
  const vendorGetMethod = async (vendorId) => {
    // e.preventDefault();

    console.log(vendorId, "sss");

    try {
      const response = await ADMINAPI.adminShopView(vendorId);
      if (response.apiStatus.code !== "200") {
        setListShop(null);
        return;
      }
      if (!response || !response.result || !response.result.ShopTypeListData) {
        throw new Error("Invalid response data");
      }
      setListShop(response.result.ShopTypeListData);
      // Extract the client data
      const dat = response.result.ShopTypeListData;
      console.log(dat, "dat");

      setOwner(dat.name);
      setStatus(dat.status);
    } catch (error) {
      console.log("Error handled =", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <Sidenav />
        <div className="main-panel" style={{paddingTop:"80px"}}>
        <div className="content-wrapper ">
            <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white me-2">
                  <i class="nav-icon fa-solid fa-shop menu-icon"></i>
                </span>Shop View</h3>
              <div style={{ textAlign: "right" }}>
                <a type="button" class="btn btn-primary" onClick={() => Navigate("/adminshoplist")} data-discover="true" style={{ float: "right", marginBottom: "1px" }}>Back</a></div>
            </div>
            <div className="row flex-grow d-flex align-items-center auth ">
            <div className="col-lg-12 mx-auto">
              <div
                style={{ padding: "30px",borderRadius:"5px" }}
                className="auth-form-light text-left "
              >
                  {list ? <>  <div className="row">

                    <div className="col-md-6 ">
                      <h4 className="order-list">Name</h4>
                      <h6 className="order-value ps-0">{owner}</h6>
                    </div>
                    <div className="col-md-6">
                      <h4 className="order-list">Status</h4>
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
                  </div></> : <NoDataFounded />
}
              

              </div>
            </div>
          </div>
        </div>
          <Footer />
        </div>
        {/* <!-- content-wrapper ends --> */}
      </div>
    </div>
  );
}

export default AdminShopView;
