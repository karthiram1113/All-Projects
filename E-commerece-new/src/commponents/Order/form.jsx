import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OVERALLAPI from "../../api/over-all-api";
import Navbar from "../../shared/navbar";
import Sidenav from "../../shared/sidenav";
import IndexLayout from "../../views";


function Orderform() {

  const [urlName, setUrlName] = useState('')


  // Useeffect Method

  useEffect(() => {

    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setUrlName(myArray[2])

  }, []);
  const [loading, setLoading] = useState("");

  // Vendor Usestate

  const Navigate = useNavigate();

  const [vendorId, setVendorId] = useState("");
  const [owner, setOwner] = useState("");
  const [shopName, setShopName] = useState();
  const [userName, setuserName] = useState("");
  const [phone, setPhone] = useState("");
  const [shopType, setShowType] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [cureshopAddress, setShopAddress] = useState('')
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimpassword, setShowConfrimPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfrimPassword = () => setShowConfrimPassword((prev) => !prev);

  // Form Validation

  const [submit, setSubmit] = useState(false);

  // Useeffect Method

  // useEffect(() => {
  //   const queryParams = window.location.pathname;
  //   const myArray = queryParams.split("/");
  //   const vendorId = myArray[2];
  //   setVendorId(vendorId);
  //   vendorGetMethod(vendorId);
  //   console.log(vendorId, "iddd");
  // }, []);


  // vendor Create Api

  // const productAdd = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setSubmit(true)
  //   // if (!shopType || !phone || !owner || !shopName || password !== confirmPassword) {
  //   //   return;
  //   // }
  //   const formData = new FormData();
  //   formData.append('shopOwnerFullName', owner);
  //   formData.append('shopName', shopName);
  //   formData.append('contact', phone);
  //   formData.append('shopType', shopType);
  //   formData.append('username', userName);
  //   formData.append('password', password);
  //   formData.append('status', status);
  //   formData.append('confirmPassword', confirmPassword);
  //   formData.append('avatar', img);

  //   try {

  //     const responseData = await OVERALLAPI.adminVendorCreate(formData);

  //     console.log('shoptype', responseData);

  //     if (responseData.apiStatus.code == '200') {
  //       Navigate('/productlist');
  //       setSubmit(false)
  //       toast.success(responseData.apiStatus.message);
  //     } else {
  //       toast.error(responseData.apiStatus.message);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };





  // Vendor Edit Api
  // const vendorEdit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setSubmit(true);
  //   if (!phone || !owner || !shopName) {
  //     return;
  //   }
  //   console.log('Form inputs:', { phone, owner, shopName });
  //   const formData = new FormData();
  //   formData.append('vendorId', vendorId);
  //   formData.append('shopOwnerFullName', owner);
  //   formData.append('shopName', shopName);
  //   formData.append('contact', phone);
  //   formData.append('shopType', shopType);
  //   formData.append('username', userName);
  //   formData.append('password', password);
  //   formData.append('status', status);
  //   formData.append('confirmPassword', confirmPassword);
  //   formData.append('avatar', img);

  //   try {
  //     const responseData = await OVERALLAPI.adminVendorUpdate(formData);

  //     console.log("responsedata", responseData);
  //     console.log(responseData.apiStatus, "wwww");

  //     if (responseData.apiStatus.code == "200") {

  //       Navigate("/productlist");
  //       setSubmit(true);
  //       toast.success(responseData.apiStatus.message);
  //     } else {
  //       toast.error(responseData.apiStatus.message);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };








  // Handler for file input change
  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  // Vendor Get Api Method

  // const vendorGetMethod = async (vendorId) => {
  //   console.log(vendorId, "vendorid");

  //   try {
  //     // Call the clientGet function with the clientId
  //     const response = await OVERALLAPI.adminOrderGet(vendorId);

  //     // Check if the response has a valid JSON structure
  //     if (!response || !response.result || !response.result.VendorData) {
  //       throw new Error("Invalid response data");
  //     }

  //     // Extract the client data
  //     const dat = response.result.VendorData;
  //     console.log(dat, "dat");

  //     setOwner(dat.shop_owner);
  //     setShopName(dat.shop_name);
  //     setuserName(dat.username);
  //     setPhone(dat.contact);
  //     setShowType(dat.shop_type);
  //     setImg(dat.avatar);
  //     setStatus(dat.status);
  //     setVendorId(dat.id);
  //   } catch (error) {
  //     console.log("Error handled =", error);
  //   }
  // };

  return (
    <div>
      {/* <Navbar /> */}

      {/* Vendor Form */}

      {/* <div className="container-fluid page-body-wrapper"> */}

        {/* <Sidenav /> */}

        {/* <div style={{ paddingTop: "80px" }} className="main-panel"> */}
      <IndexLayout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fa-solid fa-cart-shopping menu-icon"></i>
                </span> {urlName === "Create" ? 'Add Order' : 'Edit Order'}
              </h3>

              {/* <div style={{textAlign:"right"}}>
            <Link
                  to={"/productlist"}
                style={{
                  float: "right",
                  // marginBottom: "15px",
                  border:"1px solid",
                  backgroundColor:"linear-gradient(to right, #da8cff, #9a55ff)",
                }}
                type="button"
                class="btn btn-primary"
              >
                Back
              </Link>
            </div> */}
            </div>

            {/* Vendor Form */}
            <div class="card">
              <div class="card-body">
                <form class="forms-sample">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div class="coolinput">
                        <label for="input" class="text">Shop Name</label>
                        <input type="text" value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          id="exampleInputEmail1" placeholder="Enter your shop name" name="input" class="input" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">

                      <div class="coolinput">
                        <label for="input" class="text">Shop Type</label>
                        <input type="text" onChange={(e) => setShowType(e.target.value)}
                          value={shopType} id="exampleInputUsername1" placeholder="Enter your shop type" name="input" class="input"
                          style={submit && shopType?.length === 0 ? { borderColor: "red" } : {}}
                        />
                        {submit && shopType?.length == 0 ? <div className="text-danger">*Shop type is required</div> : <></>}
                      </div>
                    </div>
                    <div className="col-md-6">

                      <div class="coolinput">
                        <label for="input" class="text">Owner Name</label>
                        <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} id="exampleInputEmail1" placeholder="Enter your owner name" name="input" class="input"
                          style={submit && owner?.length === 0 ? { borderColor: "red" } : {}}

                        />
                        {submit && owner.length == 0 ? (
                          <div className="text-danger">*Owner name is required</div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div class="coolinput">
                        <label for="input" class="text">Image</label>
                        <input type="file" onChange={handleFileChange}
                          className='img-input'
                          id="exampleInputUsername1" placeholder="Enter your Image" />
                      </div>
                    </div>


                    <div className="col-md-6 mb-3">

                      <div class="coolinput">
                        <label for="input" class="text">User Name</label>
                        <input type="text" value={userName} onChange={(e) => setuserName(e.target.value)} id="exampleInputEmail1" placeholder="Enter your user name" name="input" class="input" />
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div class="coolinput">
                        <label for="input" class="text">Phone</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                          maxLength={12} id="exampleInputEmail1" placeholder="Enter your phone number" name="input" class="input"
                          style={submit && phone?.length === 0 || (phone?.length < 10 && phone?.length > 0) ? { borderColor: "red" } : {}}
                        />
                        {submit && phone.length == 0 ? (
                          <div className="text-danger">*Phone number is required</div>
                        ) : (
                          <></>
                        )}
                        {submit && phone.length < 10 && phone.length > 0 && (
                          <div className="text-danger">
                            *Phone number should be at least 10 digits
                          </div>
                        )}
                      </div>
                    </div>
                    {/* {vendorId === "Create" ? <></> : <div className="col-md-4">

                      <div class="coolinput">
                        <label for="input" class="text">Status</label>
                        <div style={{ position: 'relative' }} className="coolinput-status">
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-control "
                            id="exampleInputGender"
                            style={{
                              padding: "18px 10px",
                              borderRadius: "5px",
                              fontSize: "12px",
                              borderColor: "red",
                            }}
                          >
                            <option hidden>Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                 
                          <span
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              fontSize: '15px',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#555',
                            }}
                          >
                            <i className="fa-solid fa-chevron-down eye-icon"></i>
                          </span>
                        </div>
                      </div>
                    </div>} */}

                    <div className={vendorId === "Create" ? `col-md-6 position-relative` : `col-md-6 position-relative`}>

                      <div class="coolinput">
                        <label for="input" class="text">Password</label>
                        <input autoComplete="new-password"
                          type={showPassword ? "text" : "password"} id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          placeholder="Enter your password" name="input" class="input"
                          style={submit && password?.length === 0 ? { borderColor: "red" } : {}}
                        />
                        <span
                          onClick={toggleShowPassword}
                          style={{
                            position: "absolute",
                            right: "32px",
                            top: "35px",
                            cursor: "pointer",
                          }}
                      >
                          {showPassword ? (
                            <i className="fa-solid fa-eye eye-icon"></i>
                          ) : (
                            <i className="fa-solid fa-eye-slash eye-icon"></i>
                          )}
                        </span>
                        {submit && password?.length === 0 &&  (
                          <div className="text-danger">*Password is required</div>
                        )}
                      </div>
                    </div>
                    <div className={vendorId === "Create" ? `col-md-6 position-relative` : `col-md-6 position-relative`}>

                      <div class="coolinput">
                        <label for="input" class="text">Confirm Password</label>
                        <input autoComplete="new-password"
                          type={showConfrimpassword ? "text" : "password"} id="confirmPassword"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          value={confirmPassword}
                          placeholder="Enter your confirm password" name="input" class="input"
                          style={
                            submit && (confirmPassword?.length === 0 || confirmPassword !== password)
                              ? { borderColor: "red" }
                              : {}
                          }
                        />

                        <span
                          onClick={toggleShowConfrimPassword}
                          style={{
                            position: "absolute",
                            right: "32px",
                            top: "35px",
                            cursor: "pointer",
                          }}
                        >
                          {showConfrimpassword ? (
                            <i className="fa-solid fa-eye eye-icon"></i>
                          ) : (
                            <i className="fa-solid fa-eye-slash eye-icon"></i>
                          )}
                        </span>
                        {submit && (
                          <>
                            {confirmPassword?.length === 0 ? (
                              <div className="text-danger">*Confirm Password is required</div>
                            ) : confirmPassword !== password ? (
                              <div className="text-danger">*Password and Confirm Password do not match</div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>


                  </div>

                  <div className="text-center over-all-btn">
                    <Link
                      to={"/orderlist"}

                      type="button"
                      class="btn btn-light"
                    >
                      Cancel
                    </Link>
                    {urlName === "Create" ? (
                      //   <button
                      //   type="submit"
                      //   // onClick={productAdd}
                      //   class="btn btn-gradient-primary me-2"
                      // >
                      //   Create
                      // </button>

                      <Link
                        to={"/orderlist"}

                        type="button"
                        class="btn btn-gradient-primary me-2"
                      >
                        Create
                      </Link>
                    ) : (
                    // <button
                    //   type="submit"
                    //   // onClick={vendorEdit}
                    //   class="btn btn-gradient-primary me-2"
                    // >
                    //   Submit
                    // </button>
                        <Link
                          to={"/orderlist"}

                          type="button"
                          class="btn btn-gradient-primary me-2"
                        >
                          Submit
                        </Link>
                  )}

                  </div>
                </form>
              </div>
            </div>

          </div>
      </IndexLayout>
        {/* </div> */}

      {/* </div> */}



    </div>
  );
}

export default Orderform;
