import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VENDORAPI from "../../../api/services/vendorLogin/vendorAPI";

function VendorForm() {
  const navigate = useNavigate();

  const [id, setVendorId] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopOwner, setShopOwner] = useState("");
  const [contact, setContact] = useState("");
  const [shopType, setShopType] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [status, setStatus] = useState("");



  //password eye toogle
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimpassword, setShowConfrimPassword] = useState(false);
    const [showCurrentpassword, setShowCurrentPassword] = useState(false);
  
    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const toggleShowConfrimPassword = () => setShowConfrimPassword((prev) => !prev);
    const toggleShowCurrentPassword = () => setShowCurrentPassword((prev) => !prev);
  // for loadingstate
  const [loading, setLoading] = useState(false);

  // for dynamic input box
  const [value, setValue] = useState("");


  // for validation
  const [submit, setSumbit] = useState(false);

  //create
  const saveButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSumbit(true);

    if (!shopName || !shopOwner || !userName || !contact || !password || !confirmPassword) {
      return;
    }
    if (contact?.length < 10) {
      return;
    }
    if (password != confirmPassword) {
      return;
    }


    try {
      const formData = new FormData();
      formData.append("shopName", shopName);
      formData.append("shopOwner", shopOwner);
      formData.append("contact", contact);
      formData.append("shopType", shopType);
      formData.append("userName", userName);
      formData.append("avatar", image);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("status", status);

      console.log("FormData being sent:", [...formData.entries()]);

      const responseData = await VENDORAPI.vendorOrderCreate(formData);

      if (responseData.apiStatus?.code === "200") {
        toast.success(responseData.apiStatus.message);
        navigate("/Vendorlist");
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // update function

  const updateFunction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSumbit(true);
    if (!shopName || !shopOwner || !userName || !contact || !password || !confirmPassword) {
      return;
    }
    if (contact?.length < 10) {
      return;
    }
    if (password != confirmPassword) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("vendorId", id);
      formData.append("shopName", shopName);
      formData.append("shopOwnerFullName", shopOwner);
      formData.append("contact", contact);
      formData.append("shopType", shopType);
      formData.append("username", userName);
      formData.append("avatar", image);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("currentPassword", currentPassword);
      formData.append("status", status);

      console.log("FormData being sent:", [...formData.entries()]);

      const responseData = await VENDORAPI.vendorUpdate(formData);

      if (responseData.apiStatus.code === "200") {
        toast.success(responseData.apiStatus.message);

        navigate("/Vendorlist");
      } else {
        console.error("API response error:", responseData.apiStatus.message);
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setValue(myArray[2]);

    // Call getMethod only if in edit mode
    if (myArray[2] === "Edit" && myArray[3]) {
      getMethod(myArray[3]);
    }
  }, []);

  // get api

  const getMethod = async (id) => {
    try {
      const response = await VENDORAPI.vendorGet(id);

      const data = response.result.VendorData;

      setVendorId(data.id);

      setShopName(data.shop_name);

      setShopOwner(data.shop_owner);
      setContact(data.contact);
      setShopType(data.shop_type);
      setUserName(data.username);

      setImage(data.avatar);
      setStatus(data.status);
      setVendorId(data.id);
    } catch (errors) { }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form className="forms-sample">
            <div className="row my-4">
              {/* Form Fields */}
              <div className="col-md-6">
                <div class="coolinput">
                  <label for="input" class="text">Shop Name</label>
                  <input type="text" onChange={(e) => setShopName(e.target.value)}

                    value={shopName}
                    id="exampleInputUsername1" placeholder="Enter your shop name" name="input" class="input"
                    style={
                      submit && shopName?.length === 0
                        ? { borderColor: "red" }
                        : {}
                    }
                    />
                  {submit && shopName.length == 0 ? (
                    <div className="text-danger">*Shop name is required</div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div class="coolinput">
                  <label for="input" class="text">Shop owner</label>
                  <input type="text" onChange={(e) => setShopOwner(e.target.value)}
                    value={shopOwner}
                    id="exampleInputUsername1" placeholder="Enter your shop owner" name="input" class="input" 
                    style={
                      submit && shopOwner?.length === 0 
                        ? { borderColor: "red" }
                        : {}
                    }
                    />
                  {submit && shopOwner.length == 0 ? (
                    <div className="text-danger">
                      *Shop owner name is required
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={value === "create" ? `col-md-6` : `col-md-6`}>
                <div class="coolinput">
                  <label for="input" class="text">User Name</label>
                  <input type="text" onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    id="exampleInputUsername1" placeholder="Enter your user name" name="input" class="input"
                    style={
                      submit && userName?.length === 0
                        ? { borderColor: "red" }
                        : {}
                    }
                    />
                  {submit && userName.length == 0 ? <div className="text-danger">*User Name is required</div> : <></>}
                </div>
              </div>
              <div className={value === "create" ? `col-md-6 mb-3` : `col-md-6`}>
                <div class="coolinput">
                  <label for="input" class="text">Shop Type</label>
                  <div style={{ position: 'relative' }} className="coolinput-status">
                    <select
                      value={shopType}
                      onChange={(e) => setShopType(e.target.value)}
                      className="form-control "
                      id="exampleInputGender"
                      style={{
                        padding: "14px 10px",
                        borderRadius: "5px",
                        fontSize: "12px",
                        borderColor: "red",
                      }}
                    >
                      <option hidden>Select Shop Type</option>
                      <option value="Dry Goods">Dry Goods</option>
                      <option value="Anyy">Any</option>
                      <option value="Cosmetics">Cosmetics</option>
                    </select>
                    {/* Dropdown Icon */}
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
              </div>
              <div className="col-md-6">
                <div class="coolinput">
                  <label for="input" class="text">Image</label>
                  <input type="file"
                    onChange={handleImageChange}
                    id="exampleInputEmail1" placeholder="Enter your Image" name="input" class="input" />
                </div>
              </div>





              {value === "create" ? <></> :
                <div className="col-md-6">
                  <div class="coolinput">
                    <label for="input" class="text">Status</label>
                    <div style={{ position: 'relative' }} className="coolinput-status">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-control "
                        id="exampleInputGender"
                        style={{
                          padding: "14px 10px",
                          borderRadius: "5px",
                          fontSize: "12px",
                          borderColor: "red",
                        }}
                      >
                        <option hidden>Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      {/* Dropdown Icon */}
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
                </div>
              }


              <div className="col-md-6 mb-3">
                <div class="coolinput">
                  <label for="input" class="text">Phone</label>
                  <input type="text" value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    maxLength={12} id="exampleInputEmail1" placeholder="Enter your Phone number" name="input" class="input"
                  style={
                    submit && (contact?.length === 0 || contact?.length < 10 && contact?.length > 0)
                      ? { borderColor: "red" }
                      : {}
                  }                    />
                  {submit && contact.length == 0 ? (
                    <div className="text-danger">*Phone number is required</div>
                  ) : (
                    <></>
                  )}
                  {submit && contact.length < 10 && contact.length > 0 && (
                    <div className="text-danger">
                      *Phone number should be at least 10 digits
                    </div>
                  )}
                </div>
              </div>


              <div className="col-md-6 position-relative">
                <div class="coolinput">
                  <label for="input" class="text">Password</label>
                  <input autoComplete="new-password"
                    type={showPassword ? "text" : "password"} id="password"
                    
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter your Password" name="input" class="input"
                    style={
                      submit && password?.length === 0
                        ? { borderColor: "red" }
                        : {}
                    }
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

              <div className="col-md-6 position-relative">
                <div class="coolinput">
                  <label for="input" class="text">Confirm Password</label>
                  <input autoComplete="new-password"
                    type={showConfrimpassword ? "text" : "password"} id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder="Enter your Confirm Password" name="input" class="input" 
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
                </div>


              {value === "Edit" && (
                <div className="col-md-6 position-relative">
                  <div class="coolinput">
                    <label for="input" class="text">Current Password</label>
                    <input autoComplete="new-password"
                      type={showCurrentpassword ? "text" : "password"} id="confirmPassword"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      value={currentPassword}
                      placeholder="Enter your Current Password" name="input" class="input"
                      style={
                        submit && currentPassword?.length === 0
                          ? { borderColor: "red" }
                          : {}
                      }
                      />

                    <span
                      onClick={toggleShowCurrentPassword}
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
                    {submit && currentPassword?.length === 0 ? <div className="text-danger">*Current Password is required</div> : <></>}

                  </div>
                </div>
              )}
            </div>
            <div className="button-center over-all-btn">
              <Link
                to={"/Vendorlist"}

                type="button"
                class="btn btn-light"
              >
                Cancel
              </Link>


              {value === "Edit" ? (
                <button
                  onClick={updateFunction}
                  class="btn btn-gradient-primary me-2"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={saveButton}
                  class="btn btn-gradient-primary me-2"
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VendorForm;
