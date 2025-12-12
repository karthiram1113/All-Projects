import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Sidenav from '../Sidenav/Sidenav'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClientManagement from './ClientManagement';
import Url from '../Api/Url';

function View() {

  // Parent Component Data Move Function
  const { state } = useLocation();

  const navigate = useNavigate()

  // client create usestate method

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [fileName, setFileName] = useState([]);
  const [imageName, setImageName] = useState("")
  const [id, setId] = useState("")
  const [userimg, setuserimg] = useState("");

  const [img, setImg] = useState(null)



  const [pic, setPic] = useState('')

  useEffect(() => {
    // setData(state)


    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    console.log(myArray[2]);
    // setId(myArray[2]);
    getMethod(myArray[2])

  }, [])


  // Client Get

  const getMethod = async (id) => {

    // e.preventDefault();
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.getApi + id, {
      method: "GET",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      //   body: JSON.stringify({ }),
    });
    try {
      const responceData = await response.json();
      console.log(responceData, "praveen");

      var dat = responceData.result.clientData
      
      console.log(responceData.result.clientData);

      setId(dat.id)
      setClientName(dat.client_name)
      setEmail(dat.email)
      setAddress(dat.address)
      setPhone(dat.phone)
      setImageName(dat.imgData?.altered_file_name)
      setFileName(dat.serviceData)
      setName(dat.userData?.user_name)
      setUserId(dat.userData?.id)
      setEmail1(dat.userData?.email_id)
      setPhone1(dat.userData?.phone)
      setAddress1(dat.userData?.address)
      setuserimg(dat.userData.imgData?.path + dat.userData.imgData?.altered_file_name)


      console.log(dat.serviceData);

    } catch (error) {
      console.log("Error handled =" + error);
    }
  };




  function handleClick(service_name) {
    if (service_name == "Domain") {
      navigate("/Domain")
    }
    else {
      navigate("/Hosting")
    }
  }


  return (
    <div>
      <Header />
      <Sidenav />
      <main id="main" className="main">
        <div className="pagetitle">
          <div className="row">
            <div className="col-md-12">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/Client">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Client Management</li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h1>Client Management View</h1>
            </div>
            <div style={{ textAlign: "right" }} className="col-md-6">
              <Link
                to={"/Client"}
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
        <div className="row mb-3 m-1">
        <div className="col-md-6">
          <div>
            <div >
              <div className="row outline m-1 mb-3" style={{ boxShadow: "0px 0px 5px 5px rgba(1, 41, 112, 0.1)" }}>
                <div className="col-md-4 image-color">
                  <div className="images">
                    <img
                      className="img-jpg rounded my-3"
                        src={imageName ? Url.start + Url.imageShowed + imageName : "/assets/img/noimages.jpg"}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="tenant-top">
                    <div className="tenant-bottom bold">
                      <h5>Client Name</h5>
                        <p className="h5-clr">{clientName}</p>
                    </div>
                    <div className="tenant-bottom bold">
                      <h5>Email</h5>
                      <p className="h5-clr">{email}</p>
                    </div>
                    <div className="tenant-bottom bold">
                      <h5>Phone</h5>
                      <p className="h5-clr">{phone}</p>
                    </div>
                    <div className="tenant-bottom bold">
                      <h5>Address</h5>
                      <p className="h5-clr">{address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          {userId ? <div className="col-md-6">
            <div>
              <div >
                <div className="row outline m-1" style={{ boxShadow: "0px 0px 5px 5px rgba(1, 41, 112, 0.1)" }}>
                  <div className="col-md-4 image-color">
                    <div className="images">
                      <img
                        className="img-jpg rounded my-3"
                        src={userimg ? Url.start + "/" + userimg : "/assets/img/noimages.jpg"}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="tenant-top">
                      <div className="tenant-bottom bold">
                        <h5>User Name</h5>
                        <p className="h5-clr">{name}</p>
                      </div>
                      <div className="tenant-bottom bold">
                        <h5>Email</h5>
                        <p className="h5-clr">{email1}</p>
                      </div>
                      <div className="tenant-bottom bold">
                        <h5>Phone</h5>
                        <p className="h5-clr">{phone1}</p>
                      </div>
                      <div className="tenant-bottom bold">
                        <h5>Address</h5>
                        <p className="h5-clr">{address1}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : <></> }
        
        </div>
        {/* <div className='row m-3 outline'>
          <div className='col-md-12 '>
            <div >
              <div>
                <div className='row'>
                  <div className='col-md-3 image-color'>
                    <div className='images'>
                      <img
                        className='img-jpg'

                        src={imageName ? Url.start + Url.imageShowed + imageName : "/assets/img/noimages.jpg"}

                      />

                    </div>
                  </div>
                  <div className='col-md-9'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='tenant-top'>
                          <h5>Client Name Details</h5>
                          <hr style={{ width: "55%" }} />
                          <div className='tenant-bottom bold'>
                            <h5>Client Name</h5>
                            <p className='h5-clr'>{clientName}</p>
                          </div>
                          <div className='tenant-bottom bold'>
                            <h5>Email</h5>
                            <p className='h5-clr'>{email}</p>
                          </div>
                          <div className='tenant-bottom bold'>
                            <h5>Phone</h5>
                            <p className='h5-clr'>{phone}</p>
                          </div>
                          <div className='tenant-bottom bold'>
                            <h5>Address</h5>
                            <p className='h5-clr'>{address}</p>
                          </div>

                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='tenant-top'>
                          <h5>User Name Details</h5>
                          <hr style={{ width: "55%" }} />
                          <div className='tenant-bottom bold'>
                            <h5>User Name</h5>
                            <p className='h5-clr'>{name ? name : ""}</p>
                          </div>
                          <div className='tenant-bottom bold'>
                            <h5>Email</h5>
                            <p className='h5-clr'>{email1}</p>
                          </div>
                          <div className='tenant-bottom bold'>
                            <h5>Phone</h5>
                            <p className='h5-clr'>{phone1}</p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div> */}





        {fileName.length != 0 ?
          <div className='row m-1' >
            <div className='col-md-12'>
              <div className="card">

                <div className="card-body">

                  
                    <h4>Services</h4>
                
                 


                  <div style={{ textAlign: "center" }} className='row'>
                    <div style={{ display: "flex", gap: "20px", }}>


                      {fileName.map((item, index) => (

                        <div onClick={() => handleClick(item.service_name)} className="card curser">

                          <span className="indent" key={index}>
                            <img className='img-width' src={Url.start + "/" + item.path} /><br />
                            <span className='span'>{item.service_name}</span>
                          </span>

                        </div>
                      ))}

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
          :
          <div className='row m-1'>
            <div className='col-md-12'>
              <div className="card outline">
                <h4 className='text-center'>No Services Available</h4>
              </div>
            </div>
          </div>}





      </main>

    </div>
  )
}

export default View




