import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { Form } from 'react-bootstrap';
import { Form, Button } from "react-bootstrap";
import Url from "../Api/Url";
import { toast } from "react-toastify";

function Credentialsform() {
  const navigate = useNavigate();

  // Parent Component Data Move Function
  const { state } = useLocation();

  const [view, setView] = useState(true);

  //  Form validation
  const [submit, setSubmit] = useState(false);

  // Edit Api Id Set Up Method
  const [credential_id, setId] = useState("");

  // Credentials Create Usestate Method
  const [url, setUrl] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const[Confirmpassword,setConfirmpassword] =useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmpassword, setShowConfrom] = useState(false);

  //  Edit/Create Heading Changed Method
  const [set, setSet] = useState("");

  // form closeBtn function
  const closeBtn = () => {
   
    setSubmit(false);
  };

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    console.log(myArray[2]);
    setSet(myArray[2]);

    if (myArray[2] != "Add") {
      getMethod(myArray[3])
      
    }
  }, []);


  // Credentials Create Api Start

  const credentialsCreate = async () => {
    // e.preventDefault();
    setSubmit(true);
    if (!url || !username || !password || !Confirmpassword) {
      return;
    }
    if(password !== Confirmpassword){
      return;
    }
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.credentialCreate, {
      method: "POST",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        service_name: username,
        service_url: url,
        password: password,
        confirmPassword: Confirmpassword,
      }),
    });
    // console.log(response,"karthi");
    
    try {
      const responceData = await response.json();
      console.log(responceData);
      navigate("/Credentials");
      setSubmit(false);

      if (responceData.apiStatus.code == "200") {
        toast.success(responceData.apiStatus.message);
      } else {
        toast.error(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // Credential Edit Api Start
  const credentialsEdit = async (e) => {
    // e.preventDefault();
    setSubmit(true);
    if (!url || !username) {
      return;
    }
    // if( password !== Confirmpassword) {
    //   return;
    // }
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.credentialEdit, {
      method: "PUT",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: credential_id,
        service_name: username,
        service_url: url,
        password: password,
        confirmPassword: Confirmpassword,
      }),
    });
    try {
      const responceData = await response.json();
      console.log(responceData);
      navigate("/Credentials");
      setSubmit(false);
      if (responceData.apiStatus.code == "200") {
        toast.success(responceData.apiStatus.message);
      } else {
        toast.error(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };


  // Get Api

const getMethod = async (credential_id) => {
  // e.preventDefault();
  let token = localStorage.getItem("token");
  const response = await fetch(Url.start+Url.serviceGet+credential_id,{
    method: "GET",
    headers: {
      "content-type": "appilication/json",
      Authorization: "Bearer " +token,
    },
  //   body: JSON.stringify({ }),
  });
  try {
    const responceData = await response.json();
    console.log(responceData,"praveen");
    var dat=  responceData.result.ServiceData

      setId(dat.id);
      setUrl(dat.service_url);
      setUserName(dat.service_name);
      setPassword(dat.password);
      setConfirmpassword(dat.Confirmpassword);
    
    
  }
  
  catch (error) {
    console.log("Error handled =" + error);
  }
};

  // Password Eyes
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilitys = () => {
    setShowConfrom(!showConfirmpassword);
  };
  return (
    <div>
      <section class="section profile crud-top">
        <div className="card">
          <div className="card-body">
            <div className="row left-join">
              <div className="col-md-12">
                <h5 className="card-title">{set} Credentials</h5>
              </div>
              
            </div>

            <Form className="left-join">
              <Form.Group className="mb-3">
                <Form.Label class="required">Url</Form.Label>
                <Form.Control
                  type="email"
                  maxlength="200"
                  onChange={(e) => setUrl(e.target.value)}
                  style={
                    submit && url.length == 0
                      ? { borderColor: "red" }
                      : { borderColor: "" }
                  }
                  value={url}
                />
                {submit && url.length == 0 ? (
                  <div className="text-danger">Url is required</div>
                ) : (
                  <></>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label class="required">User Name</Form.Label>
                <Form.Control
                  type="text"
                  maxlength="200"
                  autoComplete="new-username"
                  onChange={(e) => setUserName(e.target.value)}
                  style={
                    submit && username.length == 0
                      ? { borderColor: "red" }
                      : { borderColor: "" }
                  }
                  value={username}
                />
                {submit && username.length == 0 ? (
                  <div className="text-danger">Username is required</div>
                ) : (
                  <></>
                )}
              </Form.Group>
              {set === "Add" ? (<Form.Group className="mb-3">
                <Form.Label class="required">Password</Form.Label>
                <div className="password-input-container">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                     value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={
                      submit && password.length == 0
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
                {submit && password.length == 0 ?
                  <div className='text-danger'>Password is required</div>
                  :
                  <>
                  </>
                }
              </Form.Group>) : (<Form.Group className="mb-3">
                <Form.Label >Password</Form.Label>
                <div className="password-input-container">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                      // value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    // style={
                    //   submit && !password || password?.length == 0
                    //     ? { borderColor: "red" }
                    //     : { borderColor: "" }
                    // }

                  />
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                    id="togglePassword"
                    onClick={togglePasswordVisibility}

                  ></i>
                </div>
                  {/* {submit && !password || password?.length == 0 ?
                  <div className='text-danger'>Password is required</div>
                  :
                  <>
                  </>
                } */}
              </Form.Group>)}


              {set == "Add" ? <Form.Group className="mb-3">
                <Form.Label class="required">Confirm password</Form.Label>
                <div className="password-input-container">
                  <Form.Control
                    type={showConfirmpassword ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    style={
                      submit && (Confirmpassword?.length == 0 || password !== Confirmpassword)
                        ? { borderColor: "red" }
                        : { borderColor: "" }
                    }
                    value={Confirmpassword}
                  />
                  <i
                    className={`bi ${showConfirmpassword ? "bi-eye-slash" : "bi-eye"}`}
                    id="togglePassword"
                    onClick={togglePasswordVisibilitys}

                  ></i>
                </div>

                {/* {submit && password.length > 0 && Confirmpassword.length > 0 && password !== Confirmpassword && (
  <div className="text-danger">Password and Confirmpassword does not match</div>
)} */}
                {submit && (!Confirmpassword || Confirmpassword.length == 0) ? (
                  <div className='text-danger'>Confirm Password is required</div>
                ) : (
                  <>
                    {submit && password !== Confirmpassword && (
                      <div className="text-danger">Password and Confirmpassword does not match</div>
                    )}</>
                )}
              </Form.Group> : <Form.Group className="mb-3">
                <Form.Label >Confirm password</Form.Label>
                <div className="password-input-container">
                  <Form.Control
                    type={showConfirmpassword ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    // style={
                    //   submit && (Confirmpassword?.length == 0 || password !== Confirmpassword)
                    //     ? { borderColor: "red" }
                    //     : { borderColor: "" }
                    // }
                    value={Confirmpassword}
                  />
                  <i
                    className={`bi ${showConfirmpassword ? "bi-eye-slash" : "bi-eye"}`}
                    id="togglePassword"
                    onClick={togglePasswordVisibilitys}

                  ></i>
                </div>


                {/* {submit && (!Confirmpassword || Confirmpassword.length == 0) ? (
                  <div className='text-danger'>Confirm Password is required</div>
                ) : (
                  <>
                    {submit && password !== Confirmpassword && (
                      <div className="text-danger">Password and Confirmpassword does not match</div>
                    )}</>
                )} */}
              </Form.Group>}
                            

              <div className="text-center" style={{ paddingTop: "15px" }}>
                <Button
                  onClick={() => {
                    closeBtn();
                    navigate("/Credentials");
                  }}
                  className="user-left"
                  variant="secondary"
                >
                  Close
                </Button>
                {set == "Add" ? (
                  <Button onClick={credentialsCreate} variant="primary">
                    Add
                  </Button>
                ) : (
                  <Button onClick={credentialsEdit} variant="primary">
                    Update
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Credentialsform;
