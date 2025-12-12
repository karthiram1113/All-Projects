import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import Url from '../Api/Url';
import { toast } from 'react-toastify';

function TenentForm() {

  // Navigate Method
  const Navigate = useNavigate()

  // Parent Component Data Move Function
  const { state } = useLocation();
  const [contactPersons, setContactPersons] = useState([
    {
      user_id: '',
      user_name: '',
      email: '',
      phone: '',
      address: '',
      Password: '',
      conform_password: '',
      contact_img_id: null,
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      showPassword: false,          // add this
      showConfirmPassword: false,   // add this
    },
  ]);

  console.log(contactPersons, "ddda");


  const handleRemove = (index) => {
    if (contactPersons.length === 1) return;
    const updated = contactPersons.filter((_, i) => i !== index);
    setContactPersons(updated);
  };


  //Contact Person Add
  const handleAddcontact = (index) => {
    const newContact = {
      user_name: '',
      email: '',
      phone: '',
      address: '',
      Password: '',
      conform_password: '',
      contact_img_id: null,
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: '',
    };
    const updated = [...contactPersons];
    updated.splice(index + 1, 0, newContact);
    setContactPersons(updated);
  };

  // Contact Person Delete Api Start
  const handledelete = async (id, index) => {
    if (!id) {
      const updated = contactPersons.filter((_, i) => i !== index);
      setContactPersons(updated);
      return;
    }
    let token = localStorage.getItem("token");

    try {
      const response = await fetch(`${Url.start}${Url.contactPerson}/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const responseData = await response.json();

      if (responseData.apiStatus.code === "200") {
        toast.success("Contact person deleted successfully");
        const updated = contactPersons.filter((_, i) => i !== index);
        console.log(updated, "updated");

        setContactPersons(updated);
      } else {
        toast.error("Failed to delete contact person");
      }
    } catch (error) {
      console.error("Error deleting contact person:", error);
      toast.error("Something went wrong during deletion.");
    }
  };


  const handleInputChange = (index, key, value) => {
    setContactPersons(prev => {
      const copy = [...prev];
      copy[index][key] = value;

      return copy;
    });
  };
  // client create usestate method

  const [tenentName, setTenentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [name, setName] = useState("");

  console.log(name, "nameee");

  const [email1, setEmail1] = useState("");
  console.log(email1, "email1");

  const [phone1, setPhone1] = useState("");
  const [password, setPassword] = useState("")
  const [Confirmpassword, setConfirmPassword] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [facebook, setFaceBook] = useState("")
  const [twitter, setTwitter] = useState("")
  const [instagram, setInstagram] = useState("")

  const [idd, setIdd] = useState("");
  console.log(idd, "tentntid");

  const [imgId1, setImgId1] = useState('')
  console.log(imgId1, "imgId1");

  const [imgId2, setImgId2] = useState('')
  console.log(imgId2, "imgId2");


  const [img, setImg] = useState(null)
  const [img1, setImg1] = useState(null)
  console.log(img, "img");


  const [file, setFile] = useState(null);

  const [imgId, setImgId] = useState("")

  //  Edit/Create Heading Changed Method
  const [set, setSet] = useState("");

  //  Form Validation
  const [submit, setSubmit] = useState(false);

  //pass
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmpassword] = useState(false);

  // Toggle Password Visibility
  const togglePasswordVisibility = (index) => {
    const updatedContacts = [...contactPersons];
    updatedContacts[index].showPassword = !updatedContacts[index].showPassword;
    setContactPersons(updatedContacts);
  };

  // Toggle Confirm Password Visibility
  const toggleConfirmPasswordVisibility = (index) => {
    const updatedContacts = [...contactPersons];
    updatedContacts[index].showConfirmPassword = !updatedContacts[index].showConfirmPassword;
    setContactPersons(updatedContacts);
  };

  // Phone Validation

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const phone = value.replace(/[^0-9]/g, '');
    setPhone(phone);
  }

  useEffect(() => {

    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    // setIdd(myArray[3])
    setSet(myArray[2]);
    setIdd(myArray[3])
    if (myArray[2] != "Add") {
      getMethod(myArray[3])
    }

  }, []);

  // Tenant Create

  const tenantCreate = async (e) => {
    e.preventDefault();

    setSubmit(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!tenentName || !address || !phone) {
      setSubmit(true);
      return;
    }


    if (!emailRegex.test(email)) {
      setSubmit(true);
      return;
    }

    if (phone && phone.length < 10) {
      setSubmit(true);
      return;
    }

    if (phone1 && phone1.length < 10) {

      setSubmit(true);
      return;
    }

    if (password !== Confirmpassword) {
      setSubmit(true);
      return;
    }

    // Validate contact persons
    for (let i = 0; i < contactPersons.length; i++) {
      const person = contactPersons[i];
      if (!person.user_name) {
        return;
      }
      if (!person.address) {
        return;
      }
      if (!person.email || !emailRegex.test(person.email)) {
        return;
      }

      if (!person.phone || person.phone.length < 10) {
        return;
      }

      if (!person.Password || !person.conform_password || person.Password !== person.conform_password) {
        return;
      }
    }

    let token = localStorage.getItem("token");


    const response = await fetch(Url.start + Url.tenantCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        "tenant": {
          "tenant_name": tenentName,
          "tenant_email": email,
          "tenant_phone": phone,
          "tenant_address": address,
          "tenant_img_id": img1,
        },
        'contact_persons': contactPersons.map((person) => ({
          'user_name': person.user_name,
          'email': person.email,
          'phone': person.phone,
          'address': person.address,
          'password': person.Password,
          'conform_password': person.conform_password,
          'contact_img_id': person.contact_img_id,
          'linkedin': person.linkedin,
          'facebook': person.facebook,
          'instagram': person.instagram,
          'twitter': person.twitter,
        }))
      }),
    });
    console.log(response, "resss");

    try {
      const responceData = await response.json();
      console.log(responceData);
      setSubmit(false);
      console.log(responceData.result.tenantData);

      if (responceData.apiStatus.code == "200") {
        toast.success(responceData.apiStatus.message);
        Navigate("/Tenent");
      } else {
        toast.error(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
      toast.error("An error occurred while creating the tenant.");
    }
  };



  // Tenant Edit Api Start
  const tenantEdit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!tenentName || !address || !phone) {
      setSubmit(true);
      return;
    }


    if (!emailRegex.test(email)) {
      setSubmit(true);
      return;
    }

    if (phone && phone.length < 10) {
      setSubmit(true);
      return;
    }

    if (phone1 && phone1.length < 10) {

      setSubmit(true);
      return;
    }

    // Validate contact persons
    for (let i = 0; i < contactPersons.length; i++) {
      const person = contactPersons[i];
      console.log(person, "personnnn");

      if (!person.email || !emailRegex.test(person.email)) {

        setSubmit(true);
        return;
      }
      if (person.user_name.length == 0) {

        setSubmit(true);
        return;
      }
      if (person.address.length == 0) {

        setSubmit(true);
        return;
      }
      if (!person.phone || person.phone.length < 10 && person.phone.replace(/[^0-9-+()]/g, '')) {
        setSubmit(true);
        return;
      }

      if (person.Password !== person.conform_password) {

        setSubmit(true);
        return;
      }
    }

    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.tenantEdit, {
      method: "PUT",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        "tenant": {
          "tenant_id": idd,
          "tenant_name": tenentName,
          "tenant_email": email,
          "tenant_phone": phone,
          "tenant_address": address,
          "tenant_img_id": img1,
        },
        'contact_persons': contactPersons.map((person) => ({
          'user_id': person.user_id || person.id || null,
          'user_name': person.user_name,
          'email': person.email,
          'phone': person.phone,
          'address': person.address,
          'password': person.Password,
          'conform_password': person.conform_password,
          'contact_img_id': person.contact_img_id || person.contact_img_id || img,
          'linkedin': person.linkedin,
          'facebook': person.facebook,
          'instagram': person.instagram,
          'twitter': person.twitter,
        }))
      }),
    });
    console.log("contactPerson", contactPersons);
    try {

      const responceData = await response.json();
      console.log(responceData, "con");
      setSubmit(false);


      if (responceData.apiStatus.code == "200") {
        Navigate("/Tenent");
        toast.success(responceData.apiStatus.message);
      } else {
        toast.error(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // Tenant Get

  const getMethod = async (idd) => {
    // e.preventDefault();
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.tenantGet + idd, {
      method: "GET",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      //   body: JSON.stringify({ }),
    });
    try {
      const responceData = await response.json();

      var dat = responceData.result.tenantData
      console.log(dat.ContactPersonData, dat, "ddd");
      console.log(dat.ContactPersonData, "ContactPersonData");



      setIdd(dat.id)
      setTenentName(dat.tenant_name)
      setEmail(dat.email)
      setAddress(dat.address)
      setPhone(dat.phone)
      // setName(dat.ContactPersonData.user_name)
      setContactPersons(dat?.ContactPersonData || []);


      setEmail1(dat.ContactPersonData.email)
      setPhone1(dat.ContactPersonData.phone)
      setAddress1(dat.ContactPersonData.address)
      setPassword(dat.ContactPersonData.password)
      setFaceBook(dat.ContactPersonData.facebook)
      setInstagram(dat.ContactPersonData.instagram)
      setTwitter(dat.ContactPersonData.twitter)
      setLinkedIn(dat.ContactPersonData.linkedin)
      setImgId1(dat.imageData?.altered_file_name)
      setImgId2(dat.ContactPersonData?.imageData1?.altered_file_name)

    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // Image Upload User
  const handleSubmit = async (e, index) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(Url.start + Url.imageUpload, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.apiStatus.code === "200") {
        const imageId = responseData.responseData.image_id;
        const imageName = responseData.responseData.altered_file_name;
        const imagePath = responseData.responseData.path || "";

        console.log(imageId, "Uploaded imageId");

        setContactPersons((prev) => {
          const updated = [...prev];

          if (typeof index === 'number' && index >= 0 && index < updated.length) {
            updated[index] = {
              ...updated[index],
              contact_img_id: imageId,
              imageData1: {
                img_id: imageId,
                altered_file_name: imageName,
                path: imagePath,
              },
            };
          } else {
            console.warn("Invalid index:", index);
          }

          return updated;
        });
        toast.success("Image uploaded successfully");
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed");
    }
  };

  // Image Upload Tenant

  const handleSubmit1 = async (e) => {
    e.preventDefault();



    const selectedFile = e.target.files[0];
    if (!selectedFile) {

      return;
    }

    setFile(selectedFile);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(Url.start + Url.imageUpload, {
        method: "POST",
        body: formData
      });

      const responseData = await response.json();
      console.log(responseData);

      setImg1(responseData.responseData.image_id)
      console.log(responseData.responseData.image_id);
      if (responseData.apiStatus.code === "200") {
        toast.success(responseData.apiStatus.message);
      } else {
        toast.warn(responseData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =", error);
      toast.error("File is Too Large, Please Uplaod Below 2 MB!");
    }
  };



  return (
    <div>


      <section class="section profile crud-top">
        <div className="card">
          <div className="card-body">

            <div className="row left-join">
              <div className="col-md-12">
                <h5 className="card-title">{set} tenant</h5>
              </div>

            </div>

            <Form className="row g-3 left-join">

              <div className="col-md-6">
                {set == "Add" ? (<Form.Group>
                  <Form.Label class="required">Tenant Name</Form.Label>
                  <Form.Control
                    type="text"
                    maxlength="200"
                    value={tenentName}
                    onChange={(e) => setTenentName(e.target.value)}
                    style={
                      submit && tenentName.length == 0
                        ? { borderColor: "red" }
                        : { borderColor: "" }
                    }
                  />
                  {submit && tenentName.length == 0 ? (
                    <div className="text-danger">Tenant name is required</div>
                  ) : (
                    <></>
                  )}

                </Form.Group>) : (<Form.Group>
                  <Form.Label class="required mb-1">Tenant Name</Form.Label>
                  <Form.Control
                    type="text"
                    maxlength="200"
                    value={tenentName}
                    onChange={(e) => setTenentName(e.target.value)}
                    style={
                      submit && tenentName.length == 0
                        ? { borderColor: "red" }
                        : { borderColor: "" }
                    }
                  />
                  {submit && tenentName.length == 0 ? (
                    <div className="text-danger">Tenant name is required</div>
                  ) : (
                    <></>
                  )}

                </Form.Group>)}

              </div>
              <div className="col-md-6" style={{ position: "relative" }}>
                {set == "Add" ? <><Form.Label className='mt-1 mb-0'>Tenant Image</Form.Label>
                  {/* <div className="input-group border-3"> */}
                  <Form.Group style={{ width: "100%" }}>
                    <Form.Control
                      type="file"

                      name="file"
                      // value={file}
                      readOnly
                      onChange={handleSubmit1} />
                  </Form.Group>

                  {/* </div> */}
                </> : <>
                  <Form.Group >
                    {/* Label with Text */}
                    <Form.Label className='my-1'>Tenant Image</Form.Label>

                    {/* File Input with left padding to make space for image */}
                    <Form.Control
                      type="file"
                      name="file"
                      // value={file}
                      style={{ paddingLeft: "50px" }}
                      onChange={handleSubmit1}
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
                        src={imgId1 ? Url.start + Url.imageShowed + imgId1 : "/assets/img/noimages.jpg"}
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
                </>}
              </div>

              <div class="col-md-6">
                <Form.Group>
                  <Form.Label class="required">Email</Form.Label>
                  <Form.Control
                    type="text"
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
                      {submit && !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) && (
                        <div className="text-danger">Invalid email format</div>
                      )}
                    </>
                  )}

                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label class="required">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    maxlength="12"
                    value={phone}
                    onChange={handlePhoneChange}
                    style={
                      submit && (phone.length < 10 || phone.length === 0)
                        ? { borderColor: 'red' }
                        : {}
                    }
                  />
                  {submit && phone.length == 0 ? <div className='text-danger'>Phone number is required</div> : <></>}
                  {submit && phone.length < 10 && phone.length > 0 && (
                    <div className="text-danger">Phone number should be at least 10 digits</div>
                  )}

                </Form.Group>
              </div>

              <div className="col-md-12">
                <Form.Group className="mb-4">
                  <Form.Label className='required'>Address</Form.Label>
                  {/* <FloatingLabel
                    controlId="floatingTextarea"
                  // label="Comments"
                  > */}
                  <Form.Control
                    value={address}
                    as="textarea"
                    // placeholder="Leave a comment here"
                    onChange={(e) => setAddress(e.target.value)}
                    style={
                      submit && address.length == 0


                        ? { borderColor: 'red' }
                        : {}
                    }

                  />
                  {/* </FloatingLabel> */}
                  {submit && address.length == 0 ? <div className='text-danger'>Address  is required</div> : <></>}
                </Form.Group>
              </div>






            </Form>



          </div>

        </div>


        {contactPersons.map((person, index) => (
          <div className='card'>
            <div className='card-body'>
              <div key={person.user_id || index} className="row">
                <div className="d-flex justify-content-between">
                  <h5 className='card-title'>{set} Contact Person {index + 1}</h5>
                  <div className='my-3'>

                    {set == "Add" ? (
                      <button type='button' className='disabled-button' style={{
                        borderRadius: "20px",
                        padding: "1px 7px",
                        backgroundColor: "#004aad",
                        border: "2px solid #004aad",
                        cursor: contactPersons.length === 1 ? "not-allowed !important" : "",
                      }}
                        onClick={() => handleRemove(index)}
                        disabled={contactPersons.length === 1}

                      >
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    ) : (<button type='button' className='disabled-button' style={{
                      borderRadius: "20px",
                      padding: "1px 7px",
                      backgroundColor: "#004aad",
                      border: "2px solid #004aad",
                      cursor: contactPersons.length === 1 ? "not-allowed !important" : "",

                    }}

                      onClick={() => handledelete(person.id, index)}
                      disabled={contactPersons.length === 1}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>)}
                    {set == "Add" ? (<button type='button' className='btn btn-primary ms-2 mb-1' style={{
                      borderRadius: "20px",
                      padding: "2px 7px",
                      backgroundColor: "#0cc0df"
                    }} onClick={() => handleAddcontact(index)}>
                      <i class="fa-solid fa-plus"></i>
                    </button>) : (<button type='button' className='btn btn-primary ms-2 mb-1' style={{
                      borderRadius: "20px",
                      padding: "2px 7px",
                      backgroundColor: "#0cc0df"
                    }} onClick={() => handleAddcontact(index)}>
                      <i class="fa-solid fa-plus"></i>
                    </button>)}



                  </div>

                </div>

                <div className="col-md-6" style={{ position: "relative" }}>
                  {set == "Add" ? <>
                    <Form.Label className='mt-1 mb-0'>User Image</Form.Label>
                    {/* <div className="input-group border-3"> */}
                    <Form.Group>
                      <Form.Control
                        type="file"

                        name="file"
                        // value={file}
                        readOnly
                        onChange={(e) => handleSubmit(e, index)}
                      />
                    </Form.Group>

                    {/* </div>  */}
                  </> : <>
                    <Form.Group style={{ width: "100%" }}>
                      <Form.Label className='my-1'>User Image</Form.Label>
                      <Form.Control
                        type="file"
                        style={{ paddingLeft: "50px" }}
                        name="file"
                        // value={file}
                        readOnly
                        onChange={(e) => handleSubmit(e, index)}
                      />
                      <div
                        className="short img"
                        style={{
                          position: "absolute",
                          top: "33px", // position it over the input area
                          left: "13px",
                          width: "35px",
                          height: "35px",
                        }}
                      >
                        <img
                          className="rounded"
                          src={person.imageData1?.altered_file_name ? Url.start + "/" + person.imageData1?.path + person.imageData1?.altered_file_name : "/assets/img/noimages.jpg"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            pointerEvents: "none", // don't block file input
                          }}
                          alt="Tenant Preview"
                        />
                      </div>
                    </Form.Group>
                  </>}
                </div>

                <div className="col-md-6">
                  {set == "Add" ? (<Form.Group>
                    <Form.Label class="required">User Name</Form.Label>
                    <Form.Control
                      type="text"
                      maxlength="200"
                      // value={name}
                      // onChange={(e) => setName( e.target.value)}
                      value={person.user_name}
                      onChange={e => handleInputChange(index, 'user_name', e.target.value)}
                      style={
                        submit && person.user_name.length == 0
                          ? { borderColor: "red" }
                          : { borderColor: "" }
                      }

                    />
                    {submit && person.user_name.length == 0 ?
                      <div className="text-danger">User name is required</div> : <></>}
                  </Form.Group>) : (<Form.Group>
                    <Form.Label class="required">User Name</Form.Label>
                    <Form.Control
                      type="text"
                      maxlength="200"
                      className='mb-2'
                      value={person.user_name}
                      // onChange={(e) => setName( e.target.value)}
                      // value={person.user_name}
                      onChange={e => handleInputChange(index, 'user_name', e.target.value)}
                      style={
                        submit && person.user_name.length == 0
                          ? { borderColor: "red" }
                          : { borderColor: "" }
                      }
                    />
                    {submit && person.user_name.length == 0 ?
                      <div className="text-danger">User name is required</div> : <></>}

                  </Form.Group>)}

                </div>

                <div className="col-md-6">
                  {set == "Add" ? (<Form.Group>
                    <Form.Label class="required">Email</Form.Label>
                    <Form.Control
                      type="text"
                      maxlength="200"
                      // value={email1}
                      // onChange={(e) => setEmail1(e.target.value)}
                      value={person.email}
                      onChange={e => handleInputChange(index, 'email', e.target.value)}
                      style={
                        submit && !person.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {submit && person.email.length === 0 ? (
                      <div className="text-danger">Email is required</div>
                    ) : (
                      <>
                        {submit && !person.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) && (
                          <div className="text-danger">Invalid email format</div>
                        )}
                      </>
                    )}

                  </Form.Group>) : (<Form.Group>
                    <Form.Label class="required">Email</Form.Label>
                    <Form.Control
                      type="text"
                      maxlength="200"
                      value={person.email}
                      // onChange={(e) => setEmail1(e.target.value)}
                      // value={person.email}
                      onChange={e => handleInputChange(index, 'email', e.target.value)}
                      style={
                        submit && !person.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {submit && person.email.length === 0 ? (
                      <div className="text-danger">Email is required</div>
                    ) : (
                      <>
                        {submit && !person.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) && (
                          <div className="text-danger">Invalid email format</div>
                        )}
                      </>
                    )}

                  </Form.Group>)}

                </div>

                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label class="required">Phone</Form.Label>
                    <Form.Control
                      type="text"
                      maxlength="12"
                      // value={phone1}
                      // onChange={handlePhoneChange1}
                      value={person.phone}
                      onChange={e =>
                        handleInputChange(index, 'phone', e.target.value.replace(/[^0-9]/g, ''))
                      }
                      style={
                        submit && (person.phone.length < 10 || person.phone.length === 0)
                          ? { borderColor: 'red' }
                          : {}
                      }
                    />

                    {submit && person.phone.length == 0 ? (
                      <div className='text-danger'>Phone number is required</div>
                    ) : (
                      <>
                        {submit && person.phone.length < 10 && person.phone.length > 0 && (
                          <div className="text-danger">Phone number should be at least 10 digits</div>
                        )}</>
                    )}


                  </Form.Group>
                </div>


                {set == "Add" ? <div className="col-md-12">
                  <Form.Group>
                    <Form.Label className='required mb-0'>Address</Form.Label>
                    {/* <FloatingLabel
                      controlId="floatingTextarea"
                    // label="Comments"
                    > */}
                    <Form.Control
                      // value={address1}
                      as="textarea"
                      // placeholder="Leave a comment here"
                      // onChange={(e) => setAddress1(e.target.value)}
                      value={person.address}
                      onChange={e => handleInputChange(index, 'address', e.target.value)}
                      style={
                        submit && person.address.length == 0


                          ? { borderColor: 'red' }
                          : {}
                      }
                    />
                    {/* </FloatingLabel> */}
                    {submit && person.address.length == 0 ? <div className='text-danger'>Address  is required</div> : <></>}
                  </Form.Group>

                </div> : <div className="col-md-12 mt-2">
                  <Form.Group>
                    <Form.Label className='required mb-0'>Address</Form.Label>
                    {/* <FloatingLabel
                      controlId="floatingTextarea"
                    // label="Comments"
                    > */}
                    <Form.Control
                      // value={address1}
                      as="textarea"
                      // placeholder="Leave a comment here"
                      // onChange={(e) => setAddress1(e.target.value)}
                      value={person.address}
                      onChange={e => handleInputChange(index, 'address', e.target.value)}
                      style={
                        submit && person.address.length == 0


                          ? { borderColor: 'red' }
                          : {}
                      }
                    />
                    {/* </FloatingLabel> */}
                    {submit && person.address.length == 0 ? <div className='text-danger'>Address  is required</div> : <></>}
                  </Form.Group>

                </div>}

                {set == "Add" ? (<div className="col-md-6 mt-1">
                  <Form.Group>
                    <Form.Label className="required mb-0">Password</Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={person.showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        maxlength="200"
                        autoComplete='new-password'
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        value={person.Password}
                        onChange={e => handleInputChange(index, 'Password', e.target.value)}
                        style={
                          submit &&
                            person.Password.length == 0
                            ? { borderColor: "red" }
                            : { borderColor: "" }
                        }
                      />
                      <i
                        className={`bi ${person.showPassword ? "bi-eye-slash" : "bi-eye"}`}
                        id="togglePassword"
                        onClick={() => togglePasswordVisibility(index)}

                      ></i>
                    </div>
                    {/* {submit && ? <div className='text-danger'> </div> : <></>}
                    {submit &&  ? (
                      <div className="text-danger">
                        
                      </div>
                    ) : null} */}

                    {submit && person.Password.length == 0 ? (
                      <div className='text-danger'>Password  is required</div>
                    ) : (
                      <>
                      </>
                    )}

                  </Form.Group>
                </div>) : (<div className="col-md-6 mt-2">
                  <Form.Group>
                    <Form.Label >Password</Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={person.showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        maxlength="200"
                        className='pt-2'
                        // autoComplete='new-password'
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        placeholder={person.password ? "******" : ""}
                        value={person.Password}
                        onChange={e => handleInputChange(index, 'Password', e.target.value)}
                      // style={
                      //   submit &&
                      //     (!person.Password || person.Password.length === 0 || person.Password !== person.conform_password)
                      //     ? { borderColor: "red" }
                      //     : {}
                      // }
                      />
                      <i
                        className={`bi ${person.showPassword ? "bi-eye-slash" : "bi-eye"}`}
                        id="togglePassword"
                        onClick={() => togglePasswordVisibility(index)}

                      ></i>
                    </div>
                    {/* {submit && (!person.Password || person.Password.length === 0) ? <div className='text-danger'> Password  is required</div> : <></>} 
                    {submit && person.Password !== person.conform_password ? (
                      <div className="text-danger">
                        password and confirm password does not match
                      </div>
                    ) : null}  */}

                  </Form.Group>
                </div>)}
                {set == "Add" ? (<div className='col-md-6 mt-1'>
                  <Form.Group>
                    <Form.Label className="required mb-0">Confirm Password</Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={person.showConfirmPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        autoComplete='new-password'
                        maxlength="200"
                        // value={Confirmpassword}
                        // onChange={(e) => setConfirmPassword(e.target.value)}
                        value={person.conform_password}
                        onChange={e => handleInputChange(index, 'conform_password', e.target.value)}
                        style={
                          submit &&
                            (person.Password.length == 0 || person.Password !== person.conform_password)
                            ? { borderColor: "red" }
                            : { borderColor: "" }
                        }
                      />
                      <i
                        className={`bi ${person.showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
                        id="togglePassword"
                        onClick={() => toggleConfirmPasswordVisibility(index)}

                      ></i>
                    </div>
                    {submit && person.conform_password.length == 0 ? (
                      <div className='text-danger'>Confirm password  is required</div>
                    ) : (
                      <>
                        {submit && person.Password !== person.conform_password && (
                          <div className="text-danger">password and confirm password does not match</div>
                        )}</>
                    )}

                  </Form.Group>
                </div>) : (<div className='col-md-6 mt-2'>
                  <Form.Group>
                    <Form.Label >Confirm Password</Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={person.showConfirmPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        autoComplete='new-password'
                        maxlength="200"
                        // value={Confirmpassword}
                        // onChange={(e) => setConfirmPassword(e.target.value)}
                        value={person.conform_password}
                        onChange={e => handleInputChange(index, 'conform_password', e.target.value)}
                        style={
                          submit &&
                            (person.Password !== person.conform_password)
                            ? { borderColor: "red" }
                            : {}
                        }
                      />
                      <i
                        className={`bi ${person.showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
                        id="togglePassword"
                        onClick={() => toggleConfirmPasswordVisibility(index)}

                      ></i>
                    </div>
                    {submit && person.Password !== person.conform_password ? (
                      <div className="text-danger">
                        password and confirm password does not match
                      </div>
                    ) : null}


                  </Form.Group>
                </div>)}





                <div className="col-md-3 my-2">
                  <Form.Group>
                    <Form.Label className='mb-1'>Linked In</Form.Label>
                    <Form.Control
                      type="text"
                      // value={linkedIn}
                      // onChange={(e) => setLinkedIn(e.target.value)}
                      value={person.linkedin}
                      onChange={e => handleInputChange(index, 'linkedin', e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-3 mt-2">
                  <Form.Group>
                    <Form.Label className='mb-1'>Facebook</Form.Label>
                    <Form.Control
                      type="text"
                      // value={facebook}
                      // onChange={(e) => setFaceBook(e.target.value)}
                      value={person.facebook}
                      onChange={e => handleInputChange(index, 'facebook', e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-3 mt-2">
                  <Form.Group>
                    <Form.Label className='mb-1'>Instagram</Form.Label>
                    <Form.Control
                      type="text"
                      // value={instagram}
                      // onChange={(e) => setInstagram(e.target.value)}
                      value={person.instagram}
                      onChange={e => handleInputChange(index, 'instagram', e.target.value)}

                    />


                  </Form.Group>
                </div>
                <div className="col-md-3 mt-2">
                  <Form.Group>
                    <Form.Label className='mb-1'>Twitter</Form.Label>
                    <Form.Control
                      type="text"
                      // value={twitter}
                      // onChange={(e) => setTwitter(e.target.value)}
                      value={person.twitter}
                      onChange={e => handleInputChange(index, 'twitter', e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        ))}


        <div class="text-center py-1" >
          <Button
            onClick={() => {

              Navigate("/Tenent");
            }}
            className="user-left"
            variant="secondary"
          >
            Close
          </Button>
          {set == "Add" ? (
            <Button onClick={tenantCreate} variant="primary">
              Add
            </Button>
          ) : (
            <Button onClick={tenantEdit} variant="primary">
              Update
            </Button>
          )}
        </div>

      </section>



    </div>
  )
}

export default TenentForm
