import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OVERALLAPI from "../../api/over-all-api";
import Navbar from "../../shared/navbar";
import Sidenav from "../../shared/sidenav";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Footer from "../../shared/footer";
import IndexLayout from "../../views";


function Productform() {

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
  //     const response = await OVERALLAPI.adminVendorGet(vendorId);

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

// multiple image
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Add previews
    const updatedFiles = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(prev => [...prev, ...updatedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true,
  });






  return (
      <div>
      {/* // <Navbar /> */}
   
      {/* Vendor Form */}

      {/* // <div  className="container-fluid page-body-wrapper"> */}

      {/* <Sidenav /> */}

      {/* <div style={{paddingTop:"80px"}} className="main-panel"> */}
          <IndexLayout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fas fa-store menu-icon"></i>
                </span> {urlName === "Create" ? 'Add Product' : 'Edit Product'}
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
                        <label for="input" class="text">Name</label>
                        <input type="text"
                          //  value={shopName}
                          //   onChange={(e) => setShopName(e.target.value)}
                          id="exampleInputEmail1" placeholder="Enter your product name" name="input" class="input" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div class="coolinput">
                        <label for="input" class="text">Image</label>
                        <input type="file"
                          //  onChange={handleFileChange}
                          className='input'
                          id="exampleInputUsername1" placeholder="Enter your Image" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">

                      <div class="coolinput">
                        <label for="input" class="text">Cost</label>
                        <input type="text"
                          // value={userName} onChange={(e) => setuserName(e.target.value)}
                          id="exampleInputEmail1" placeholder="Enter your product cost" name="input" class="input" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">

                      <div className="coolinput">
                        <label for="input" class="text">Offer</label>
                        <div className="percentage-input-wrapper">
                          <input
                            type="number"
                            id="productOffer"
                            name="input" class="input"
                            placeholder="Enter your product offer"

                            step="0.01"

                          // value={productOffer}
                          // onChange={(e) => setProductOffer(e.target.value)}
                          />
                          <span className="percentage-symbol">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 ">
                      <div class="coolinput">
                        <label for="input" class="text">Review</label>
                        <input type="text"
                          //  value={phone} onChange={(e) => setPhone(e.target.value)}
                          id="exampleInputEmail1" placeholder="Enter your product review" name="input" class="input"
                        // style={submit && phone?.length === 0 || (phone?.length < 10 && phone?.length > 0) ? { borderColor: "red" } : {}}
                        />
                        {/* {submit && phone.length == 0 ? (
                            <div className="text-danger">*Phone number is required</div>
                          ) : (
                            <></>
                          )}
                          {submit && phone.length < 10 && phone.length > 0 && (
                            <div className="text-danger">
                              *Phone number should be at least 10 digits
                            </div>
                          )} */}
                      </div>
                    </div>
                    <div className="col-md-6">

                      <div class="coolinput">
                        <label for="input" class="text">Units</label>
                        <input type="number"
                          // value={owner} onChange={(e) => setOwner(e.target.value)} 
                          id="exampleInputEmail1" placeholder="Enter unit ml/liter/kg/grams" name="input" class="input"
                        // style={submit && owner?.length === 0 ? { borderColor: "red" } : {}}

                        />
                        {/* {submit && owner.length == 0 ? (
                            <div className="text-danger">*Owner name is required</div>
                          ) : (
                            <></>
                          )} */}
                      </div>
                    </div>










                    <div className={urlName === "Create" ? `col-md-6 mt-2` : `col-md-6 mb-3`}>
                      <div className="coolinput">
                        <label className="text">Description</label>
                        <div className="ckeditor-containers">
                          <CKEditor
                            editor={ClassicEditor}
                            data={""}
                            onReady={(editor) => {
                              console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              // setEditorData1(data);
                              console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                              console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                              console.log('Focus.', editor);
                            }}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="col-md-6 mt-2 mb-3">
                      <div className="coolinput" >
                        <label className="text">Gallery Images</label>
                        <div {...getRootProps({ className: 'img-input' })} >
                          <input {...getInputProps()} />
                          {
                            isDragActive ?
                              <p>Drop the images here ...</p> :
                              <p>Drag 'n' drop some images here, or click to select</p>
                          }
                        </div>
                        <div className="preview-container">
                          {files.map((file, index) => (
                            <div key={index} className="img-preview">
                              <img src={file.preview} alt={`preview-${index}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* <div className={vendorId === "Create" ? `col-md-6 position-relative` : `col-md-4 position-relative`}>

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
                              top: "32px",
                              cursor: "pointer",
                            }}
                          >
                            {showPassword ? (
                              <i className="fa-solid fa-eye eye-icon"></i>
                            ) : (
                              <i className="fa-solid fa-eye-slash eye-icon"></i>
                            )}
                          </span>
                          {submit && password?.length === 0 && (
                            <div className="text-danger">*Password is required</div>
                          )}
                        </div>
                      </div>
                      <div className={vendorId === "Create" ? `col-md-6 position-relative` : `col-md-4 position-relative`}>

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
                              top: "32px",
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
                      </div> */}


                  </div>


                  <div className="text-center over-all-btn">
                    <Link
                      to={"/productlist"}

                      type="button"
                      class="btn btn-light"
                    >
                      Cancel
                    </Link>
                    {urlName == "Create" ? (
                      //   <button
                      //   type="submit"
                      //   // onClick={productAdd}
                      //   class="btn btn-gradient-primary me-2"
                      // >
                      //   Create
                      // </button>
                      <Link
                        to={"/productlist"}

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
                        to={"/productlist"}

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
     
      {/* <Footer /> */}
      {/* </div> */}

{/* </div> */}


     
    </div>
  );
}

export default Productform;
