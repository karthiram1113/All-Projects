import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Url from "../Api/Url";
import { toast } from "react-toastify";
import SuperHeader from "../Header/SuperHeader";
import SuperSidenav from "../Sidenav/SuperSidenav";
import { FloatingLabel } from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import HeaderUser from "../Header/UserHeader";
import SidenavUser from "../Sidenav/UserSidenav";

function ProfileUser() {
  let userName = localStorage.getItem("userName");
  let imgName = localStorage.getItem("imgName")
  let id = localStorage.getItem("id");

  // Super Admin

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [imgId, setImgId] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [facebook, setFaceBook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [img, setImg] = useState("");
  console.log(img, "img");
  
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);

  // Change Password

  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate("");

  const [submit, setSubmit] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    getMethod(id);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // Password Eyes
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  // handle phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const phone = value.replace(/[^0-9-+()]/g, '');
    setPhone(phone);
  }

  // Tenant Get

  const getMethod = async (id) => {
    // e.preventDefault();
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.userGetProfile + id, {
      method: "GET",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      //   body: JSON.stringify({ }),
    });
    try {
      const responceData = await response.json();

      var dat = responceData.UserData;
      console.log(dat, "dat");

      //   setIdd(dat.id)
      setName(dat.user_name);
      setEmail(dat.email_id);
      setAddress(dat.address);
      setPhone(dat.phone);
      setImgId(dat.imageData?.altered_file_name);
      setImg(dat.imageData.img_id);
      setFaceBook(dat.facebook);
      setInstagram(dat.instagram);
      setTwitter(dat.twitter);
      setLinkedIn(dat.linkedin);
      console.log(dat.imageData.altered_file_name);
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // Tenant Edit Api Start
  const superProfileEdit = async (e) => {
    e.preventDefault();
    setSubmit(true);


    if (email && !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
      return;
    }


    let token = localStorage.getItem("token");
    let imgid = localStorage.getItem("imgId");
    localStorage.setItem("superName", name);
    const response = await fetch(Url.start + Url.userProfileUpdate, {
      method: "PUT",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userData: {
          id: id,
          user_name: name,
          emailId: email,
          phone: phone,
          address: address,
          img_id: imgid,
          twitter: twitter,
          facebook: facebook,
          instagram: instagram,
          linkedin: linkedIn,
        },
      }),
    });
    try {
      const responceData = await response.json();

      if (responceData.apiStatus.code == "200") {
        navigate("/UserDashboard")
        toast.success(responceData.apiStatus.message);
      } else {
        toast.error(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };
  // /Image Upload Admin

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      // toast.error("Please select a file to upload.");
      return;
    }

    setFile(selectedFile); // Set the file state

    const formData = new FormData();
    formData.append("file", selectedFile); // Use selectedFile directly

    try {
      const response = await fetch(Url.start + Url.imageUpload, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);

      setImg(responseData.responseData.image_id);
      localStorage.setItem("imgId", responseData.responseData.image_id);
      localStorage.setItem("imgName", responseData.responseData.Path + responseData.responseData.File_Altered_Name);


      console.log(responseData.responseData.image_id);
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

  // Reset Api Start

  const changee = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (!password || !password1 || !password2) {
      return;
    }
    // console.log("fgctyfty");
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.change, {
      method: "POST",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        currentPassword: password,
        newPassword: password1,
      }),
    });
    try {
      const responceData = await response.json();
      console.log(responceData);

      setSubmit(false);
      if (responceData.apiStatus.code == "200") {
        toast.success(responceData.apiStatus.message);
        navigate("/superdashboard");
      } else {
        toast.warn(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // Image Delete

  const userImageDelete = async () => {
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.userProfileDelete + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    try {
      const responseData = await response.json();
      if (responseData.apiStatus.code === "200") {
        localStorage.removeItem("imgName")
        localStorage.removeItem("imgId")
        // getMethod();

        toast.success(responseData.apiStatus.message);
        window.location.reload()
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

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
                    <Link to="/UserDashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">    <Link to="/UserProfile">Profile</Link></li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h1>Profile</h1>
            </div>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "100px",
            }}
          >
            <FadeLoader color="#36d7b7" />
          </div>
        ) : (
          <section class="section profile">
            <div class="row">
              <div class="col-xl-4">
                <div class="card">
                  <div class="profiles card-body profile-card pt-4 d-flex flex-column align-items-center">
                    {/* <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" /> */}
                    <img
                      class="rounded-circle"
                      src={
                        imgName ? Url.start + "/" + imgName
                          : "/assets/img/noimages.jpg"
                      }
                    />
                    <h2>{userName}</h2>

                    <div class="social-links mt-2">
                      <a
                        href={
                          twitter ? twitter : "https://twitter.com/?lang=en"
                        }
                        class="twitter"
                        target="_blank"
                      >
                          <i class="bi bi-twitter" style={{ color: "#1DA1F2"}}></i>
                      </a>
                      <a
                        href={facebook ? facebook : "https://www.facebook.com/"}
                        class="facebook"
                        target="_blank"
                      >
                          <i class="bi bi-facebook" style={{ color: "#1877F2"}}></i>
                      </a>
                      <a
                        href={
                          instagram
                            ? instagram
                            : "https://www.instagram.com/accounts/login/?hl=en"
                        }
                        class="instagram"
                        target="_blank"
                      >
                          <i class="bi bi-instagram" style={{ 
                            backgroundImage: "linear-gradient(to right, #feda75, #fa7e1e, #d62976, #962fbf)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                          }}></i>
                      </a>
                      <a
                        href={
                          linkedIn ? linkedIn : "https://www.linkedin.com/login"
                        }
                        class="linkedin"
                        target="_blank"
                      >
                          <i class="bi bi-linkedin" style={{ color: "#2164F3" }}></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-8">
                <div class="card">
                  <div class="card-body pt-3">
                    <ul class="nav nav-tabs nav-tabs-bordered">
                      <li class="nav-item">
                        <button
                          class="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-overview"
                        >
                          Overview
                        </button>
                      </li>

                      <li class="nav-item">
                        <button
                          class="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-edit"
                        >
                          Edit Profile
                        </button>
                      </li>

                      {/* <li class="nav-item">
                        <button
                          class="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-change-password"
                        >
                          Change Password
                        </button>
                      </li> */}
                    </ul>

                    <div class="tab-content pt-2">
                      <div
                        class="tab-pane fade show active profile-overview"
                        id="profile-overview"
                      >
                        <h5 class="card-title">Profile Details</h5>

                        <div class="row">
                          <div class="col-lg-3 col-md-4 label ">Full Name</div>
                          <div class="col-lg-9 col-md-8">{name}</div>
                        </div>

                        <div class="row">
                          <div class="col-lg-3 col-md-4 label">Address</div>
                          <div class="col-lg-9 col-md-8">{address}</div>
                        </div>

                        <div class="row">
                          <div class="col-lg-3 col-md-4 label">Phone</div>
                          <div class="col-lg-9 col-md-8">{phone}</div>
                        </div>

                        <div class="row">
                          <div class="col-lg-3 col-md-4 label">Email</div>
                          <div class="col-lg-9 col-md-8">{email}</div>
                        </div>
                      </div>

                      <div
                        class="tab-pane fade profile-edit pt-3"
                        id="profile-edit"
                      >
                        <form>
                          <div class="row mb-3">
                            <label
                              for="profileImage"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              Profile Image
                            </label>
                            <div class="col-md-3">
                              {/* <img src={imgId}/> */}
                              <div style={{maxWidth:"fitContent"}}>
                              <img
                                className="img-jpg"
                                src={
                                  imgName ? Url.start + "/" + imgName
                                    : "/assets/img/noimages.jpg"
                                }
                              />
                                </div>
                              <div class="pt-2">
                                {/* <input onChange={handleSubmit} type='file' />  */}
                                <a
                                  href="#"
                                  class="btn btn-primary btn-sm "
                                  title="Upload new profile image"
                                  style={{ marginRight: "5px" }}
                                >
                                  <label for="file">
                                    <i
                                      class="bi bi-upload"
                                      style={{
                                        color: "white",
                                        cursor: "pointer",
                                      }}
                                      
                                    ></i>
                                  </label>
                                  <input
                                    id="file"
                                    onChange={handleSubmit}
                                    type="file"
                                     
                                  />
                                </a>
                                <a
                                  href="#"
                                  class="btn btn-danger btn-sm"
                                  title="Remove my profile image"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete"
                                >
                                  <i class="bi bi-trash"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <div class="row mb-3">
                            <label
                              for="fullName"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              {" "}
                              Name
                            </label>
                            <div class="col-md-8 col-lg-9">
                              <input
                                name="fullName"
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                class="form-control"
                                id="fullName"
                                value={name}
                              />
                            </div>
                          </div>

                          <div class="row mb-3">
                            <label
                              for="Address"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              Address
                            </label>
                            <div class="col-md-8 col-lg-9">
                              <textarea
                                type="text"
                                name="address"
                                onChange={(e) => setAddress(e.target.value)}
                                class="form-control"
                                id="Address"
                                value={address}
                                aria-label="With textarea"
                              ></textarea>
                              {/* <input name="address" onChange={(e)=>setAddress(e.target.value)} type="text" class="form-control" id="Address" value={address}/> */}
                            </div>
                          </div>

                          <div class="row mb-3">
                            <label
                              for="Phone"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              Phone
                            </label>
                            <div class="col-md-8 col-lg-9">
                              <input
                                name="phone"
                                  onChange={handlePhoneChange}
                                type="text"
                                maxLength={12}
                                class="form-control"
                                id="Phone"
                                value={phone}
                              />
                            </div>
                          </div>

                          <div class="row mb-3">
                            <label
                              for="Email"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              Email
                            </label>
                            <div class="col-md-8 col-lg-9">
                              <input
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                class="form-control"
                                id="Email"
                                value={email}
                                  style={submit && !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) ? { borderColor: "red" } : { borderColor: "" }}

                              />
                                {submit && !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) ? <div className='text-danger'>Invalid email format</div> : <></>}

                            </div>
                          </div>

                          <div class="row mb-3">
                            <label
                              for="Twitter"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              Twitter Profile
                            </label>
                            <div class="col-md-8 col-lg-9">
                              <input
                                name="twitter"
                                type="text"
                                class="form-control"
                                id="Twitter"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                              />
                            </div>
                          </div>

                          <div class="row mb-3">
                            <label
                              for="Facebook"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              Facebook Profile
                            </label>
                            <div class="col-md-8 col-lg-9">
                              <input
                                name="facebook"
                                type="text"
                                class="form-control"
                                id="Facebook"
                                value={facebook}
                                onChange={(e) => setFaceBook(e.target.value)}  
                              />
                            </div>
                          </div>

                          <div class="row mb-3">
                            <label
                              for="Instagram"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              Instagram Profile
                            </label>
                            <div class="col-md-8 col-lg-9">
                              <input
                                name="instagram"
                                type="text"
                                class="form-control"
                                id="Instagram"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value) }
                              />
                            </div>
                          </div>

                          <div class="row mb-3">
                            <label
                              for="Linkedin"
                              class="col-md-4 col-lg-3 col-form-label"
                            >
                              Linkedin Profile
                            </label>
                            <div class="col-md-8 col-lg-9">
                              <input
                                name="linkedin"
                                type="text"
                                class="form-control"
                                id="Linkedin"
                                value={linkedIn}
                                onChange={(e) =>setLinkedIn(e.target.value)}
                              />
                            </div>
                          </div>

                          <div class="text-center">
                              {/* <Link to={"/UserDashboard"}> */}
                            <button
                              onClick={superProfileEdit}
                              class="btn btn-primary"
                            >
                              Save Changes
                            </button>
                              {/* </Link> */}
                          </div>
                        </form>
                      </div>

                      <div
                        class="tab-pane fade pt-3"
                        id="profile-change-password"
                      >
                        <form class="row  g-3 needs-validation" novalidate>
                            <div class="col-12">
                              <label class="form-label">
                                Current Password
                              </label>
                              <div className='password-input-container'>
                                <input
                                  value={password}
                                  type={showPassword ? "text" : "password"}
                                  class="form-control"
                                  style={submit && password.length == 0 && password < 3 ? { borderColor: "red" } : { borderColor: "" }}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <i
                                  className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                                  id="togglePassword"
                                  onClick={togglePasswordVisibility}

                                ></i>
                              </div>

                              {submit && password.length == 0 ? <div className='text-danger'>Current Password is required</div> : <></>}
                              {submit && password.length < 3 && password.length != 0 ? <div className="text-danger">Password must be 3 charater</div> : <></>}
                            </div>
                            <div class="col-12">
                              <label class="form-label">
                                Password
                              </label>
                              <div className='password-input-container'>
                                <input
                                  value={password1}
                                  type={showPassword1 ? "text" : "password"}
                                  class="form-control"
                                  style={submit && password1.length == 0 && password1 < 3 ? { borderColor: "red" } : { borderColor: "" }}
                                  onChange={(e) => setPassword1(e.target.value)}
                                />
                                <i
                                  className={`bi ${showPassword1 ? "bi-eye" : "bi-eye-slash"}`}
                                  id="togglePassword"
                                  onClick={togglePasswordVisibility1}

                                ></i>
                              </div>

                              {submit && password1.length == 0 ? <div className='text-danger'>Password is required</div> : <></>}
                              {submit && password1.length < 3 && password1.length != 0 ? <div className="text-danger">Password must be 3 charater</div> : <></>}
                            </div>
                            <div class="col-12">
                              <label class="form-label">
                                Confirm Password
                              </label>
                              <div className='password-input-container'>
                                <input
                                  value={password2}
                                  onChange={(e) => setPassword2(e.target.value)}
                                  type={showPassword2 ? "text" : "password"}
                                  class="form-control"
                                  required
                                  // style={submit&&(password1.length==0)?{borderColor:"red"}:{borderColor:""}}
                                  style={submit && (password2.length === 0 || password2 !== password1 || password2.length < 3) ? { borderColor: "red" } : {}}
                                />
                                <i
                                  className={`bi ${showPassword2 ? "bi-eye" : "bi-eye-slash"}`}
                                  // id="togglePassword"
                                  onClick={togglePasswordVisibility2}

                                ></i>
                              </div>

                              {submit && password2.length === 0 && <div className='text-danger'>Confirm Password is required</div>}
                              {submit && password2.length < 3 && password1.length != 0 ? <div className="text-danger">Password must be 3 charater</div> : <></>}
                              {submit && password2 !== password1 && password2.length !== 0 && <div className='text-danger'>Password and confirm password should be same</div>}
                            </div>

                          <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                              <button
                                style={{ marginTop: "30px" }}
                                onClick={changee}
                                class="btn btn-primary w-100"
                              >
                                Submit
                              </button>
                            </div>
                            <div className="col-md-4"></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* delete */}

      <div
        className="modal fade"
        id="delete"
        // data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                User Image
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are You Sure Want To Delete User Image{" "}
              <span style={{ color: "red" }}></span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                onClick={userImageDelete}
                type="button"
                className="btn btn-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
