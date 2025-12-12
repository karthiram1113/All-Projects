import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  FloatingLabel,
  Spinner,
  FormLabel,
} from "react-bootstrap";
// import Multiselect from 'multiselect-react-dropdown';
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import Url from "../Api/Url";
import { toast } from "react-toastify";

function Clientform({ initialFileName }) {
  const Navigate = useNavigate();

  const [service, setService] = useState("");

  const [dropdownVisible, setDropdownVisible] = useState(false);

  // State to track loading status during login
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (id) => {
    setService(service, id);
    // console.log("erweererrer");
    console.log(JSON.stringify(service), "sfdfds");
    setDropdownVisible(false); // Hide dropdown after selection
  };

  //  contact person
  const [person, setPerson] = useState("Yes");
  

  // Function to handle radio button click for "Yes"
  const handleYesClick = () => {
    setPerson("Yes");
    console.log("yes");
  };

  // Function to handle radio button click for "No"
  const handleNoClick = () => {
    if (userid) {
      userDelete()
    }
    setPerson("No");
    console.log("no");
  };

  // Phone Validation

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const phone = value.replace(/[^0-9-+()]/g, "");
    setPhone(phone);
  };

  // Phone Validation

  const handlePhoneChange1 = (e) => {
    const value = e.target.value;
    const phone1 = value.replace(/[^0-9-+()]/g, "");
    setPhone1(phone1);
  };
  // Parent Component Data Move Function
  const { state } = useLocation();

  //  Form Validation
  const [submit, setSubmit] = useState(false);

  // client create usestate method

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [name, setName] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [userimg, setuserimg] = useState("");
  const [userid, setUserId] = useState("");


  const [fileName, setFileName] = useState([]);

  // const [file, setFile] = useState(null);
  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);

  const [imgId, setImgId] = useState("");

  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageName(selectedFile ? selectedFile.name : "");
  };

  //  Edit/Create Heading Changed Method
  const [set, setSet] = useState("");

  // Edit Api Id Set Up Method
  const [client_id, setId] = useState("");

  const [idd, setIdd] = useState("");
  const [password,setPassword]= useState("")
    const [Confirmpassword,setConfirmpassword]= useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmpassword, setShowConfirmpassword] = useState(false);


  // Password Eyes
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilitys = () => {
    setShowConfirmpassword(!showConfirmpassword);
  };
  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setIdd(myArray[3]);
    setSet(myArray[2]);

    if (myArray[2] != "Add") {
      getMethod(myArray[3]);
    }
  }, []);

  // client form close

  const clientForm = () => {
    setSubmit(false);
  };

  // client Create Api Start

  const clientCreate = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setLoading(true);
    if (person === "Yes") {
      if (!name || !email1 || !email1.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) || !phone1 ||!password || !Confirmpassword) {
        return;
      }
      if(password !== Confirmpassword) {
        return;
      }
    }

    if (
      !clientName ||
      !email ||
      !phone ||
      !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    ) {
      return;
    }
    if (phone.length < 10 && phone.length > 0) {
      return;
    }
    if (phone1.length < 10 && phone1.length > 0) {
      return;
    }

    let token = localStorage.getItem("token");

    var bodyData = {};

    if (person == "Yes") {
      bodyData = {
        client_name: clientName,
        email: email,
        phone: phone,
        address: address,
        service_offer: fileName.map((item) => item.service_id),
        img_id: img,
        userData: {
          user_name: name,
          emailId: email1,
          phone: phone1,
          password: password,
          address: address1,
          confirmPassword: Confirmpassword,
          img_id1: img1
        },
      };
    } else {
      bodyData = {
        client_name: clientName,
        email: email,
        phone: phone,
        address: address,
        service_offer: fileName.map((item) => item.service_id),
        img_id: img,
      };
    }
    const response = await fetch(Url.start + Url.clientCreate, {
      method: "POST",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify(bodyData),
    });
    try {
      const responceData = await response.json();
      console.log(responceData);
      setSubmit(false);
      setLoading(false);
      if (responceData.apiStatus.code == "200") {
        Navigate("/Client");
        toast.success(responceData.apiStatus.message);
      } else {
        toast.error(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // client edit api start

  const clientEdit = async () => {
    setSubmit(true);

    if (person === "Yes") {
      if (!name || !email1 || !email1.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) || !phone1) {
        return;
      }
      // if (password !== Confirmpassword) {
      //   return;
      // }
      if (phone1.length < 10 && phone1.length > 0) {
        return;
      }
    }
    if(!userid && person === "Yes") {
      if(!password || !Confirmpassword) {
        return;
      }
       if (password !== Confirmpassword) {
         return;
       }
    }
    if (
      !clientName ||
      !email ||
      !phone ||
      !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    ) {
      return;
    }
    if (phone.length < 10 && phone.length > 0) {
      return;
    }
   


    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + "/client/update", {
      method: "PUT",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({

        clientData: {
          "client_id": idd,
          "client_name": clientName,
          "email": email,
          "img_id": img,
          "phone": phone,
          "address": address,
          "service_id": fileName.map((item) => item.service_id),
        },
        ...(person === "Yes" && {
        userData: {
          "user_id": userid,
          "user_name": name,
          "emailId": email1,
          "password": password,
          "phone": phone1,
          "confirmPassword": Confirmpassword,
          "address": address1,
          "img_id1": img1,
          "twitter": "",
          "facebook": "",
          "instagram": "",
          "linkedin": ""
        }
        }),
      }),
    });
    try {
      const responceData = await response.json();
      console.log(responceData);
      setSubmit(false);
      if (responceData.apiStatus.code == "200") {
       
        toast.success(responceData.apiStatus.message);
        Navigate("/Client");
      } else {
        toast.error(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // User Delete Api Start

  const userDelete = async () => {
    // e.preventDefault();
    let token = localStorage.getItem("token");

    const response = await fetch(Url.start + Url.userDelete + userid, {
      method: "DELETE",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      // body: JSON.stringify({}),
    });
    try {
      const responceData = await response.json();


      if (responceData.apiStatus.code == "200") {
        toast.success(responceData.apiStatus.message);
        getMethod(idd); 


    }} catch (error) {
      console.log("Error handled =" + error);
    }
  };




  // Client Get

  const getMethod = async (idd) => {
    // e.preventDefault();
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.getApi + idd, {
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
      var dat = responceData.result.clientData;
      console.log(dat, "j");

      setIdd(dat.id);
      setClientName(dat.client_name);
      setEmail(dat.email);
      setAddress(dat.address);
      setPhone(dat.phone);
      setName(dat.userData?.user_name);
      setUserId(dat.userData?.id);
      setEmail1(dat.userData?.email_id);
      setAddress1(dat.userData?.address);
      setPhone1(dat.userData?.phone);
      setuserimg(dat.userData?.imgData?.altered_file_name);
      setFileName(dat.serviceData);
      setSelectedValue(dat.serviceData.map((list) => list.service_id));

      setImgId(dat.imgData?.altered_file_name);
      setFile(dat.imgData?.altered_file_name);

      console.log(imgId);
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  //Client GetDropapi start

  const clientGetDrop = async () => {
    // e.preventDefault();
    let token = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost/client_management_api/api/client/get/serviceofferedlist",
      {
        method: "GET",
        headers: {
          "content-type": "appilication/json",
          Authorization: "Bearer " + token,
        },
        // body: JSON.stringify({}),
      }
    );
    try {
      const responceData = await response.json();
      console.log(responceData);
      // setDropDown(responceData.result.serviceData)
      // setService(responceData.result.serviceData[0].service_id)
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // Client Image Upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      // toast.error("Please select a file to upload.");
      return;
    }

    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(Url.start + Url.imageUpload, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);

      setImg(responseData.responseData.image_id);
      // console.log(responseData.responseData.image_id);
      if (responseData.apiStatus.code === "200") {
        toast.success(responseData.apiStatus.message);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =", error);
      toast.error("File is Too Large, Please Uplaod Below 2 MB!");
    }
  };

  // User Image upload
  const handleSubmits = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      // toast.error("Please select a file to upload.");
      return;
    }

    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(Url.start + Url.imageUpload, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);

      setImg1(responseData.responseData.image_id);
      // console.log(responseData.responseData.image_id);
      if (responseData.apiStatus.code === "200") {
        toast.success(responseData.apiStatus.message);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  const data = [
    { service_id: 1, service_name: "Domain" },
    { service_id: 2, service_name: "Hosting" },
  ];

  // handle onChange event of the dropdown
  // const handleChange = (e) => {
  //   // console.log(e,"testing");
  //   setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  //   console.log(JSON.stringify(selectedValue), "ryoeryfef");
  // };

  // service offered
  const handleChange = (selectedOptions) => {
    setFileName(selectedOptions || []);
  };

  // const removeItem = (service_id) => {
  //   const updated = selectedValue.filter(item => item.service_id !== service_id);
  //   setFileName(updated);
  // };
  // const removeItem = (service_id) => {
  //   setFileName((prevFileName) =>
  //     prevFileName.filter((item) => item.service_id !== service_id)
  //   );
  //   setSelectedValue((prevSelectedValue) =>
  //     prevSelectedValue.filter((id) => id !== service_id)
  //   );
  // };
  return (
    <div>
      <section class="section profile crud-top">
        <div className="card">
          <div className="card-body">
            <div className="row left-join">
              <div className="col-md-6">
                <h5 className="card-title">{set} Client</h5>
              </div>
            </div>

            <Form className="row g-3 left-join">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label class="required">Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    maxlength="200"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    style={
                      submit && clientName.length == 0
                        ? { borderColor: "red" }
                        : { borderColor: "" }
                    }
                  />
                  {submit && clientName.length == 0 ? (
                    <div className="text-danger">Clientname is required</div>
                  ) : (
                    <></>
                  )}
                </Form.Group>
              </div>

              <div className="col-md-6" style={{ position: "relative" }}>
                {set == "Add" ? (
                  <>
                    <Form.Label>Client Image</Form.Label>
                    <div className="input-group border-3">
                      <Form.Group style={{ width: "100%" }}>
                        <Form.Control
                          type="file"
                          name="file"
                          // value={file}
                          readOnly
                          onChange={handleSubmit}
                        />
                      </Form.Group>
                    </div>
                  </>
                ) : (
                  <>
                     <Form.Group >
                                        {/* Label with Text */}
                        <Form.Label className='my-1'>Client Image</Form.Label>
                    
                                        {/* File Input with left padding to make space for image */}
                                        <Form.Control
                                          type="file"
                                          name="file"
                                          // value={file}
                                          style={{ paddingLeft: "50px" }}
                          onChange={handleSubmit}
                                          readOnly
                                        />
                    
                                        {/* Image over input */}
                                        <div
                                          className="short img"
                                          style={{
                                            position: "absolute",
                                            top: "33px", 
                                            left: "9px",
                                            width: "35px",
                                            height: "35px",
                                          }}
                                        >
                                          <img
                                            className="rounded"
                                            src={imgId ? Url.start + Url.imageShowed + imgId : "/assets/img/noimages.jpg"}
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "cover",
                                              pointerEvents: "none", 
                                            }}
                                            alt="Tenant Preview"
                                          />
                                        </div>
                                      </Form.Group>
                  </>
                )}
              </div>

              {/* {client} */}

              <div class="col-md-6">
                {set == "Add" ? (
                  <Form.Group>
                    <Form.Label className="required">Email</Form.Label>
                    <Form.Control
                      type="email"
                      maxlength="200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={
                        submit && !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {submit && email.length === 0 ? (
                      <div className="text-danger">Email is required</div>
                    ) : (
                      <>
                        {submit &&
                          !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) && (
                            <div className="text-danger">
                              Invalid email format
                            </div>
                          )}
                      </>
                    )}
                  </Form.Group>
                ) : (
                  <Form.Group>
                    <Form.Label className="required">Email</Form.Label>
                    <Form.Control
                      type="email"
                      maxlength="200"
                      
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={
                        submit && !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {submit && email.length === 0 ? (
                      <div className="text-danger">Email is required</div>
                    ) : (
                      <>
                        {submit &&
                          !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) && (
                            <div className="text-danger">
                              Invalid email format
                            </div>
                          )}
                      </>
                    )}
                  </Form.Group>
                )}
              </div>
              <div class="col-md-6">
                <Form.Group>
                  <Form.Label className="required">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    maxlength="12"
                    value={phone}
                    onChange={handlePhoneChange}
                    style={
                      submit && (phone.length < 10 || phone.length === 0)
                        ? { borderColor: "red" }
                        : {}
                    }
                  />
                  {submit && phone.length == 0 ? (
                    <div className="text-danger">Phone number is required</div>
                  ) : (
                    <></>
                  )}
                  {submit && phone.length < 10 && phone.length > 0 && (
                    <div className="text-danger">
                      Phone number should be at least 10 digits
                    </div>
                  )}
                </Form.Group>
              </div>

              <div class="col-md-6">
                <Form.Group>
                  <Form.Label>Service Offered</Form.Label>
{/* 
                  <Select
                    className="dropdown"
                    checked={selectedValue}
                    value={fileName.filter((obj) =>
                      selectedValue.includes(obj.service_name)
                    )} // set selected values
                    options={fileName}
                    onChange={handleChange}
                    isMulti
                    isClearable
                  /> */}

                  <Select
                    className="dropdown"
                    value={fileName}
                    options={data}
                    onChange={handleChange}
                    isMulti
                    isClearable
                    getOptionLabel={(e) => e.service_name}
                    getOptionValue={(e) => e.service_id}
                  />

                  {/* {set == "Edit" ? (
                    <div>
                      {fileName.map((item, index) => (
                        <li style={{ display: "inline" }} key={index}>
                          {item.service_name}{" "}
                          <button
                            className="bbb"
                            type="button"
                            onClick={() => removeItem(item.service_id)}
                          >
                            x
                          </button>
                        </li>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )} */}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label>Address</Form.Label>
                  {/* <FloatingLabel
                    controlId="floatingTextarea"
                    // label="Comments"
                  > */}
                  <Form.Control
                    value={address}
                    as="textarea"
                    // placeholder="Leave a comment here"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {/* </FloatingLabel> */}
                </Form.Group>
              </div>



              {/* {set==="Edit" && (name && email1 && phone1) ?
  <>
    <div className="col-md-4">
      <Form.Group>
        <Form.Label class="required">Username</Form.Label>
        <Form.Control
          type="email"
          disabled
          value={name} />
      </Form.Group>
    </div>
    <div className="col-md-4">
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          disabled
          value={email1} />
      </Form.Group>
    </div>
    <div className="col-md-4">
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="email"
          disabled
          value={phone1} />
      </Form.Group>
    </div>
  </>
  :
  <h5 onClick={() => console.log("Clicked to show why")}>Client With User Not Mapping</h5>
} */}

            

              {/* {set === "Edit" && (
                <>
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label class="required">Username</Form.Label>
                      <Form.Control
                        type="email"
                        disabled
                        value={name}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        disabled
                        value={email1}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="email"
                        disabled
                        value={phone1}
                      />
                    </Form.Group>
                  </div>
                </>
              )}  */}
            </Form >
           
          </div >
        </div >

        <div className="card">
          <div className="card-body">
            {/* contact person */}
            {set === "Add" ? 
              <div className="col-md-12">
                <Form.Label >
                  <span className="card-title">    Contact Person :{" "}</span>
              
                  <span className="yes-no">
                    <input
                      type="radio"
                      name="person"
                      value="Yes"
                      onClick={handleYesClick}
                      checked={person === "Yes"}
                    />{" "}
                    Yes{" "}
                    <input
                      type="radio"
                      name="person"
                      value="No"
                      onClick={handleNoClick}
                      checked={person === "No"}
                    />{" "}
                    No{" "}
                  </span>{" "}
                </Form.Label>
              </div> : <div className="col-md-12">
                <Form.Label >
                  <span className="card-title">  {set}  Contact Person :{" "}</span>

                  <span className="yes-no">
                    <input
                      type="radio"
                      name="person"
                      value="Yes"
                      onClick={handleYesClick}
                      checked={person === "Yes"}
                    />{" "}
                    Yes{" "}
                    <input
                      type="radio"
                      name="person"
                      value="No"
                      onClick={handleNoClick}
                      checked={person === "No"}
                    />{" "}
                   {userid ? "Delete" :"No"}
                  </span>{" "}
                </Form.Label>
              </div>
            }


            {/* Form fields */}
            
            {
              set === "Add" && person === "Yes" && (
                <>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Label>User Image</Form.Label>
                    <div className="input-group border-3">
                      <Form.Group style={{ width: "100%" }}>
                        <Form.Control
                          type="file"
                          name="file"
                          // value={file}
                          readOnly
                          onChange={handleSubmits}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label class="required">Username</Form.Label>
                      <Form.Control
                        type="email"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        style={
                          submit && name.length === 0
                            ? { borderColor: "red" }
                            : { borderColor: "" }
                        }
                      />
                      {submit && name.length === 0 && (
                        <div className="text-danger">Username is required</div>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label class="required">Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email1}
                        onChange={(e) => setEmail1(e.target.value)}
                        style={
                          submit && (email1.length === 0 || !email1.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/))
                            ? { borderColor: "red" }
                            : {}
                        }
                      />
                      {submit && email1.length === 0 ? (
                        <div className="text-danger">Email is required</div>
                      ) : (
                        <>
                          {submit &&
                            !email1.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) && (
                              <div className="text-danger">
                                Invalid email format
                              </div>
                            )}
                        </>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label class="required">Phone</Form.Label>
                      <Form.Control
                        type="email"
                        value={phone1}
                        maxLength="12"
                        onChange={handlePhoneChange1}
                        style={
                          submit && (phone1.length < 10 || phone1.length === 0)
                            ? { borderColor: "red" }
                            : {}
                        }
                      />
                      {submit && phone1.length == 0 ? (
                        <div className="text-danger">
                          Phone number is required
                        </div>
                      ) : (
                        <></>
                      )}
                      {submit && phone1.length < 10 && phone1.length > 0 && (
                        <div className="text-danger">
                          Phone number should be at least 10 digits
                        </div>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className='mb-3 hos'>
                      <Form.Label className='required mb-0'>Password</Form.Label>
                      <div className='password-input-container'>
                        <Form.Control type={showPassword ? "text" : "password"}
                          value={password}
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                          style={
                            submit &&
                              password.length == 0
                              ? { borderColor: "red" }
                              : { borderColor: "" }
                          }
                        />
                        <i
                          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                          id="togglePassword"
                          onClick={togglePasswordVisibility}

                        ></i>
                      </div>
                      {submit && (!password || password.length == 0) ? (
                        <div className='text-danger'>Password is required</div>
                      ) : (
                        <>
                        </>
                      )}
                    </Form.Group></div>
                  <div className="col-md-6">
                    <Form.Group className='mb-3 hos'>
                      <Form.Label class="required">Confirm password</Form.Label>
                      <div className='password-input-container'>
                        <Form.Control type={showConfirmpassword ? "text" : "password"}
                          value={Confirmpassword}
                          onChange={(e) => setConfirmpassword(e.target.value)}
                          style={
                            submit &&
                              (!Confirmpassword || Confirmpassword.length == 0 || password !== Confirmpassword)
                              ? { borderColor: "red" }
                              : { borderColor: "" }
                          }
                        />
                        <i
                          className={`bi ${showConfirmpassword ? "bi-eye-slash" : "bi-eye"}`}
                          id="togglePassword"
                          onClick={togglePasswordVisibilitys}

                        ></i>
                      </div>



                      {submit && (!Confirmpassword || Confirmpassword.length == 0) ? (
                        <div className='text-danger'>Confirm Password is required</div>
                      ) : (
                        <>
                          {submit && password !== Confirmpassword && (
                            <div className="text-danger">Password and Confirmpassword does not match</div>
                          )}</>
                      )}

                    </Form.Group></div>
                    <div className="col-md-12">
                      <Form.Group className="mb-4">
                        <Form.Label>Address</Form.Label>
                        {/* <FloatingLabel
                    controlId="floatingTextarea"
                    // label="Comments"
                  > */}
                        <Form.Control
                          value={address1}
                          as="textarea"
                          // placeholder="Leave a comment here"
                          onChange={(e) => setAddress1(e.target.value)}
                        />
                        {/* </FloatingLabel> */}
                      </Form.Group>
                    </div>
                  </div>
                </>
              )
            }
            <div className="row">
              {set === "Edit" && person === "Yes" && (
                <>
                  <div className="col-md-6" style={{ position: "relative" }}>
                    <Form.Group >
                      {/* Label with Text */}
                      <Form.Label className='my-1'>Client Image</Form.Label>

                      {/* File Input with left padding to make space for image */}
                      <Form.Control
                        type="file"
                        name="file"
                        // value={file}
                        style={{ paddingLeft: "50px" }}
                        onChange={handleSubmits}
                        readOnly
                      />

                      {/* Image over input */}
                      <div
                        className="short img"
                        style={{
                          position: "absolute",
                          top: "33px",
                          left: "13px",
                          width: "35px",
                          height: "35px",
                        }}
                      >
                        <img
                          className="rounded"
                          src={userimg ? Url.start + Url.imageShowed + userimg : "/assets/img/noimages.jpg"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            pointerEvents: "none",
                          }}
                          alt="Tenant Preview"
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label class="required">Username</Form.Label>
                      <Form.Control type="email" onChange={(e) => setName(e.target.value)} 
                      value={name} 
                        style={
                          submit &&
                           !name || name?.length == 0
                            ? { borderColor: "red" }
                            : { borderColor: "" }
                        } />
                      {submit && !name || name?.length == 0 ? (
                        <div className='text-danger'>UserName is required</div>
                      ) : (<>
                      </>)}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label class="required">Email</Form.Label>
                      <Form.Control type="email" onChange={(e) => setEmail1(e.target.value)} value={email1} 
                        style={
                          submit && (!email1 || email1?.length === 0 || !email1.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/))
                            ? { borderColor: "red" }
                            : {}
                        }/>
                      {submit && !email1 || email1?.length === 0 ? (
                        <div className="text-danger">Email is required</div>
                      ) : (
                        <>
                          {submit &&
                            !email1.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) && (
                              <div className="text-danger">
                                Invalid email format
                              </div>
                            )}
                        </>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label class="required">Phone</Form.Label>
                      <Form.Control type="text" maxLength={12} onChange={handlePhoneChange1} value={phone1} 
                        style={
                          submit && (!phone1 || phone1?.length < 10 || phone1?.length === 0)
                            ? { borderColor: 'red' }
                            : {}
                        }/>
                      {submit && (!phone1 || phone1?.length == 0) ? (
                        <div className='text-danger'>Phone number is required</div>
                      ) : (
                        <>
                          {submit && phone1?.length < 10 && phone1?.length > 0 && (
                            <div className="text-danger">Phone number should be at least 10 digits</div>
                          )}</>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6"><Form.Group className='mb-3 hos'>
                    <Form.Label className={userid ? "" : "required"}>Password</Form.Label>
                    <div className='password-input-container'>
                      <Form.Control type={showPassword ? "text" : "password"}
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={
                          submit && !userid &&
                            password.length == 0
                            ? { borderColor: "red" }
                            : { borderColor: "" }
                        }
                      />
                      <i
                        className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                        id="togglePassword"
                        onClick={togglePasswordVisibility}

                      ></i>
                    </div>

                    {submit && !userid && password.length == 0 ? (
                      <div className='text-danger'>Password is required</div>
                    ) : (<>
                    </>)}
                  </Form.Group></div>
                  <div className="col-md-6">
                    <Form.Group className='mb-3 hos'>
                      <Form.Label className={userid ? "" : "required"}>Confirm password</Form.Label>
                      <div className='password-input-container'>
                        <Form.Control type={showConfirmpassword ? "text" : "password"}
                          value={Confirmpassword}
                          onChange={(e) => setConfirmpassword(e.target.value)}
                          style={
                            submit && !userid &&
                              (!Confirmpassword || Confirmpassword.length == 0 || password !== Confirmpassword)
                              ? { borderColor: "red" }
                              : {}
                          }
                        />
                        <i
                          className={`bi ${showConfirmpassword ? "bi-eye-slash" : "bi-eye"}`}
                          id="togglePassword"
                          onClick={togglePasswordVisibilitys}

                        ></i>
                      </div>


                      {submit && !userid && (!Confirmpassword || Confirmpassword.length == 0) ? (
                        <div className='text-danger'>Confirm Password is required</div>
                      ) : (
                        <>
                          {submit && !userid && password !== Confirmpassword && (
                            <div className="text-danger">Password and Confirmpassword does not match</div>
                          )}</>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-4">
                      <Form.Label>Address</Form.Label>
                      {/* <FloatingLabel
                    controlId="floatingTextarea"
                    // label="Comments"
                  > */}
                      <Form.Control
                        value={address1}
                        as="textarea"
                        // placeholder="Leave a comment here"
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                      {/* </FloatingLabel> */}
                    </Form.Group>
                  </div>
                </>
              ) 
              }
            </div>
          </div>
        </div>
        <div class="text-center">
          <Button
            onClick={() => {
              clientForm();
              Navigate("/Client");
            }}
            className="user-left"
            variant="secondary"
          >
            Close
          </Button>
          {set == "Add" ? (
            <Button onClick={clientCreate} variant="primary">
              Add
            </Button>
          ) : (
            <Button onClick={clientEdit} variant="primary">
              Update
            </Button>
          )}
        </div>
      </section >
    </div >
  );
}

export default Clientform;
