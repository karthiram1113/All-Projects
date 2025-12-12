import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidenav from "../Sidenav/Sidenav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClientManagement from "./ClientManagement";
import SuperSidenav from "../Sidenav/SuperSidenav";
import Url from "../Api/Url";
import SuperHeader from "../Header/SuperHeader";
import HeaderUser from "../Header/UserHeader";
import SidenavUser from "../Sidenav/UserSidenav";

function ViewHosting() {
  // Parent Component Data Move Function
  const { state } = useLocation();

  const navigate = useNavigate();

  const [pic, setPic] = useState("");

  //Get Create

  const [host_name, setHostName] = useState("")
  const [client, setClient] = useState("")
  const [service, setService] = useState("")
  const [product, setProduct] = useState("")
  const [plan, setPlan] = useState("")
  const [serverIp, setServerIp] = useState("")
  const [purchase, setPurchase] = useState("")
  const [expiry, setExpiry] = useState("")
  const [servername, setServerName] = useState("")
  const [typename, setTypeName] = useState("")
  const [username, setUserName] = useState("")
  const [key, setKey] = useState("")
  const [notificationtype, setNotificationType] = useState("")
  const [notificationdata, setNotificationData] = useState("")
  const [interval, setInterval] = useState("")
  const [prior, setPrior] = useState("")


  useEffect(() => {
    // setData(state)

    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    console.log(myArray[2]);
    getMethod(myArray[2]);

    console.log(state, "stateeeeeee");
  }, []);

  // Tenant Get

  const getMethod = async (id) => {
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.hostGet + id, {
      method: "GET",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      //   body: JSON.stringify({ }),
    });
    try {
      const responceData = await response.json();

      var dat = responceData.result;

      console.log(dat, "dat");

      setHostName(dat.hostData.host_name);
      setClient(dat.hostData.client_name);
      setService(dat.hostData.server_name);
      setProduct(dat.hostData.product);
      setPlan(dat.hostData.plan);
      setServerIp(dat.hostData.server_ip);
      setPurchase(dat.hostData.purchase_date);
      setExpiry(dat.hostData.expiry_date);
      setServerName(dat.serviceProvider?.serviceProvider_name);
      setTypeName(dat.service_credentials?.type_name);
      setUserName(dat.service_credentials?.user_name);
      setKey(dat.service_credentials?.key);
      setNotificationData(dat.notification?.notification_data);
      setNotificationType(dat.notification?.notification_type);
      setPrior(dat.notification?.notification_prior)
      setInterval(dat.notification?.notification_interval)
      

    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  const image = "D:Clients Management\new-projectpublicassetsimg\noimage.jpg";
  return (
    <div>
      <HeaderUser />
      <SidenavUser />
      <main id="main" className="main">
        <div className="pagetitle">
          <div className="row">
            <div className="col-md-12">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/UserHosting">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">   Hosting</li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h1>Hosting</h1>
            </div>
            <div style={{ textAlign: "right" }} className="col-md-6">
              <Link
                to={"/UserHosting"}
                style={{
                  float: "right",
                  marginBottom: "15px",
                  // marginTop: "10px",
                }}
                type="button"
                class="btn btn-primary"
              >
                Back
              </Link>
            </div>
          </div>
        </div>

        <div className="row m-1">
          <div className="col-md-6">
            <div>
              <div >
                <div className="row" >
                  <div className="col-md-12">
                    <div className="card" style={{ boxShadow: "0px 0px 5px 5px rgba(1, 41, 112, 0.1)" }}>
                      <div className="">
                        <div className="p-4">

                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Host Name</h5>
                            <p className="h5-clr w-50 text-start">{host_name}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Client Name</h5>
                            <p className="h5-clr w-50 text-start">{client}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Server Name</h5>
                            <p className="h5-clr w-50 text-start">{service}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Product</h5>
                            <p className="h5-clr w-50 text-start">{product}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Service Ip</h5>
                            <p className="h5-clr w-50 text-start">{serverIp}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Purchase Date</h5>
                            <p className="h5-clr w-50 text-start">{purchase}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Expiry Date</h5>
                            <p className="h5-clr w-50 text-start">{expiry}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Prior</h5>
                            <p className="h5-clr w-50 text-start">{prior}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div >
                <div className="row" >
                  <div className="col-md-12">
                    <div className="card" style={{ boxShadow: "0px 0px 5px 5px rgba(1, 41, 112, 0.1)" }}>
                      <div className="">
                        <div className="p-4">
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Plan</h5>
                            <p className="h5-clr w-50 text-start">{plan}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Server Provider Name</h5>
                            <p className="h5-clr w-50 text-start">{servername}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Credentials Type</h5>
                            <p className="h5-clr w-50 text-start">{typename}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Credentials Name</h5>
                            <p className="h5-clr w-50 text-start">{username}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Credentials Key</h5>
                            <p className="h5-clr w-50 text-start">{key}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Notify Type</h5>
                            <p className="h5-clr w-50 text-start">{notificationtype}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Notify Data</h5>
                            <p className="h5-clr w-50 text-start">{notificationdata}</p>
                          </div>
                          <div className="tenant-bottom d-flex justify-content-between bold">
                            <h5>Interval</h5>
                            <p className="h5-clr w-50 text-start">{interval}</p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">


            <div className="row outline m-1" style={{ boxShadow: "0px 0px 5px 5px rgba(1, 41, 112, 0.1)" }}>
              <div className="col-md-6 p-3">
              
                  <div className="tenant-bottom d-flex  bold">
                  <h5>Host Name</h5>
                    <p className="h5-clr ms-2">{host_name}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Client Name</h5>
                    <p className="h5-clr ms-2">{client}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Server Name</h5>
                    <p className="h5-clr ms-2">{service}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Product</h5>
                    <p className="h5-clr ms-2">{product}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Service Ip</h5>
                    <p className="h5-clr ms-2">{serverIp}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Purchase Date</h5>
                    <p className="h5-clr ms-2">{purchase}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Expiry Date</h5>
                    <p className="h5-clr ms-2">{expiry}</p>
                  </div>
                <div className="tenant-bottom d-flex bold">
                  <h5>Prior</h5>
                  <p className="h5-clr ms-2">{prior}</p>
                </div>
              </div>
              <div className="col-md-6 p-3">
                <div className="tenant-bottom d-flex bold">
                  <h5>Plan</h5>
                  <p className="h5-clr ms-2">{plan}</p>
                </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Server Provider Name</h5>
                    <p className="h5-clr ms-2">{servername}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Credentials Type</h5>
                    <p className="h5-clr ms-2">{typename}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Credentials Name</h5>
                    <p className="h5-clr ms-2">{username}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Credentials Key</h5>
                    <p className="h5-clr ms-2">{key}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Notify Type</h5>
                    <p className="h5-clr ms-2">{notificationtype}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Notify Data</h5>
                    <p className="h5-clr ms-2">{notificationdata}</p>
                  </div>
                  <div className="tenant-bottom d-flex bold">
                    <h5>Interval</h5>
                    <p className="h5-clr ms-2">{interval}</p>
                  </div>
        
              </div>
            </div>

          </div>
        </div> */}


      </main>


    </div>
  );
}

export default ViewHosting;
