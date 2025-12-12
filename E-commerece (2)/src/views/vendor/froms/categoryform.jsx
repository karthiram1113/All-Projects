import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VENDORAPI from "../../../api/services/vendorLogin/vendorAPI";

function CategoryForm() {
  const navigate = useNavigate();

  const [id, setVendorId] = useState("");
  const [categoryid, setCategoryId] = useState("");
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
        navigate("/vendorCategorylist");
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
      const apidata = {
        category_id: categoryid,
        category_name: Name,
        description: Description,
        vendor_id: id,
        status: status
      }

      const responseData = await VENDORAPI.vendorCategoryUpdate(apidata);

       if (responseData.apiStatus.code === "200") {
        toast.success(responseData.apiStatus.message);

         navigate("/vendorCategorylist");
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
      const response = await VENDORAPI.vendorCategoryView(id);

      const data = response.result.CategoryData;





      setCategoryId(data.id);
      setName(data.name);
      setDescription(data.description);
      setStatus(data.status);
      setVendorId(data.vendor_id);
    } catch (errors) {}
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form className="forms-sample">
            <div className="row mb-4">
              {/* Form Fields */}


              <div className="col-md-6">

                <div class="coolinput">
                  <label for="input" class="text">Vendor ID</label>
                  <input autoComplete="new-password"
                    type="text" id="confirmPassword"
                    onChange={(e) => setVendorId(e.target.value)}
                    value={id}
                    placeholder="Enter Vendor ID" name="input" class="input" 
                    style={
                      submit && id?.length === 0
                        ? { borderColor: "red" }
                        : {}
                    }
                    />
                  {submit && id?.length === 0 ? <div className="text-danger">*Enter vendor id</div> : <></>}
                </div>
              </div>

              
{value=== "Create" ? <></>:
                <div className="col-md-6 position-relative">
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
              <div className="col-md-6">
                <div class="coolinput">
                  <label for="input" class="text">Name</label>
                  <input autoComplete="new-password"
                    type="text" id="confirmPassword"
                    onChange={(e) => setName(e.target.value)}
                    value={Name}
                    placeholder="Enter your Name" name="input" class="input" 
                    style={
                      submit && Name?.length === 0
                        ? { borderColor: "red" }
                        : {}
                    }
                    />
                  {submit && Name?.length === 0 ? <div className="text-danger">*Enter your name</div> : <></>}
                </div>
              </div>
              <div className={value === "Create" ? `col-md-12` : `col-md-6`}>
                <div class="coolinput">
                  <label for="input" class="text">Description</label>
                  <input 
                    type="text" id="confirmPassword"
                    onChange={(e) => setDescription(e.target.value)}
                    value={Description}
                    placeholder="Enter description" name="input" class="input" 
                    style={
                      submit && Description?.length === 0
                        ? { borderColor: "red" }
                        : {}
                    }
                    />
                  {submit && Description?.length === 0 ? <div className="text-danger">*Enter description</div> : <></>}
                </div>
              </div>             
              

              

             
            </div>
            <div className="button-center over-all-btn" >
              <button
                type="button"
                class="btn btn-light"
                onClick={() => navigate("/vendorCategorylist")}
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
