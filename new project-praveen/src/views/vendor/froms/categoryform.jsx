import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VENDORAPI from "../../../api/services/vendorLogin/vendorAPI";

function CategoryForm() {
  const navigate = useNavigate();

  const [id, setVendorId] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopOwner, setShopOwner] = useState("");
  const [contact, setContact] = useState("");
  const [shopType, setShopType] = useState("");
  const [Description, setDescription] = useState("");
  const [Name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [status, setStatus] = useState("");

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
    try {
      const apidata={
        category_name: Name,
        description: Description,
        vendor_id: id,
        status: status
      }
     
      const responseData = await VENDORAPI.vendorCategoryCreate(apidata);

      if (responseData.apiStatus?.code === "200") {
        toast.success(responseData.apiStatus.message);
        navigate("/categorylist");
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const updateFunction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSumbit(true);
    try {
      const formData = new FormData();
      formData.append("vendorId", id);
      formData.append("shopName", shopName);
      formData.append("shopOwnerFullName", shopOwner);
      formData.append("contact", contact);
      formData.append("shopType", shopType);
      formData.append("username", Name);
      formData.append("avatar", image);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("currentPassword", currentPassword);
      formData.append("status", status);

      console.log("FormData being sent:", [...formData.entries()]);

      const responseData = await VENDORAPI.vendorUpdate(formData);

       if (responseData.apiStatus.code === "200") {
        toast.success(responseData.apiStatus.message);

        navigate("/vendorlist");
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
      setName(data.username);

      setImage(data.avatar);
      setStatus(data.status);
      setVendorId(data.id);
    } catch (errors) {}
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form className="forms-sample">
            <div className="row">
              {/* Form Fields */}


              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Vendor ID</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setVendorId(e.target.value)}
                    value={id}
                    placeholder="Vendor ID"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setDescription(e.target.value)}
                    value={Description}
                    placeholder="Description"
                    
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="exampleInputGender">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                    id="exampleInputGender"
                    style={{
                      height: "44px",
                      fontSize: "12px",
                      borderColor: "red",
                    }}
                  >
                    <option hidden>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    onChange={(e) => setName(e.target.value)}
                    value={Name}
                    placeholder="Name"
                  />
                </div>
              </div>

              

             
            </div>
            <div className="mt-4" style={{ textAlign: "center" }}>
              <button
                type="button"
                class="btn btn-light"
                onClick={() => navigate("/categorylist")}
              >
                Cancel
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
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

export default CategoryForm;
