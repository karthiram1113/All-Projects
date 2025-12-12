import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ADMINAPI from "../../../../api/services/AdminLogin/adminAPI";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Multiselect from "multiselect-react-dropdown";

function Productform() {
  // Loading State

  const [loading, setLoading] = useState("");
  // const countries = [
  //   { name: 'Australia', code: 'AU' },
  //   { name: 'Brazil', code: 'BR' },
  //   { name: 'China', code: 'CN' },
  //   { name: 'Egypt', code: 'EG' },
  //   { name: 'France', code: 'FR' },
  //   { name: 'Germany', code: 'DE' },
  //   { name: 'India', code: 'IN' },
  //   { name: 'Japan', code: 'JP' },
  //   { name: 'Spain', code: 'ES' },
  //   { name: 'United States', code: 'US' }
  // ];
  // Vendor Usestate

  const Navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [owner, setOwner] = useState("");
  const [shopName, setShopName] = useState();
  const [userName, setuserName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountries, setSelectedCountries] = useState(null);

  const [shopType, setShowType] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [cureshopAddress, setShopAddress] = useState('')
  const [status, setStatus] = useState("");

  // Form Validation

  const [submit, setSubmit] = useState(false);

  // Useeffect Method

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    const vendorId = myArray[3];
    setVendorId(vendorId);
    vendorGetMethod(vendorId);
    console.log(vendorId, "iddd");
  }, []);

  // Vendor Edit Api
  const vendorEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmit(true);
    if (!phone || !owner || !shopName) {
      return;
    }
    console.log('Form inputs:', { phone, owner, shopName });
    const formData = new FormData();
    formData.append('vendorId', vendorId);
    formData.append('shopOwnerFullName', owner);
    formData.append('shopName', shopName);
    formData.append('contact', phone);
    formData.append('shopType', shopType);
    formData.append('username', userName);
    formData.append('password', password);
    formData.append('status', status);
    formData.append('confirmPassword', confirmPassword);
    try {
      const responseData = await ADMINAPI.adminVendorUpdate(formData);

      console.log("responsedata", responseData);
      console.log(responseData.apiStatus, "wwww");

      if (responseData.apiStatus.code == "200") {

        Navigate("/adminvendorlist");
        setSubmit(true);
        toast.success(responseData.apiStatus.message);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };








  // Handler for file input change
  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  // Vendor Get Api Method

  const vendorGetMethod = async (vendorId) => {
    console.log(vendorId, "vendorid");

    try {
      // Call the clientGet function with the clientId
      const response = await ADMINAPI.adminVendorGet(vendorId);

      // Check if the response has a valid JSON structure
      if (!response || !response.result || !response.result.VendorData) {
        throw new Error("Invalid response data");
      }

      // Extract the client data
      const dat = response.result.VendorData;
      console.log(dat, "dat");

      setOwner(dat.shop_owner);
      setShopName(dat.shop_name);
      setuserName(dat.username);
      setPhone(dat.contact);
      setShowType(dat.shop_type);
      setImg(dat.avatar);
      setStatus(dat.status);
      setVendorId(dat.id);
    } catch (error) {
      console.log("Error handled =", error);
    }
  };



  return (
    <div>
      <div className="d-flex justiyfy-content-between">
        <div class="card me-2 col-md-8" >
          <h2 className="availability">Basic information</h2>
          <div class="card-body">

            <form class="forms-sample">

              <div className="row">
                <div className="col-md-12">
                  <div class="form-group">
                    <label className="required" for="exampleInputUsername1">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                      onChange={(e) => setOwner(e.target.value)}
                      style={
                        submit && owner.length === 0 ? { borderColor: "red" } : {}
                      }
                      value={owner}
                      placeholder="Name"
                    />
                    {submit && owner.length == 0 ? (
                      <div className="text-danger">Owner name is required</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div class="form-group">
                    <label className="required" for="exampleInputEmail1">
                      file
                    </label>
                    <input
                      type="file"
                      class="form-control"
                      id="exampleInputEmail1"
                      onChange={(e) => setShopName(e.target.value)}
                      style={
                        submit && shopName.length === 0
                          ? { borderColor: "red" }
                          : {}
                      }
                      // value={shopName}
                      placeholder="file"
                    />
                    {submit && shopName.length == 0 ? (
                      <div className="text-danger">Shop name is required</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>


                <div className="col-md-12">

                  <div className="mb-2">  Description</div>
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                    }}
                  />
                  {/* <div className="form-group">
                  <label htmlFor="exampleInputGender" className="required" >Stock</label>
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
                </div> */}
                </div>



              </div>

              
            </form>
          </div>

        </div>

        <div class="card ms-2 col-md-4 h-100">
          <h2 className="availability">Availability</h2>

          <label className="ps-3 p-2">
            <input type="radio" className="mx-2" />
            In Stock
          </label>
          <label className="ps-3 p-2">
            <input type="radio" className="mx-2" />
            Out of Stock
          </label>
          <div className="mt-3" style={{ backgroundColor: "#f2edf3", color: "#f2edf3" }}>.</div>
          <div style={{ borderRadius: "10px" }}>
            <h2 className="availability">Category</h2>

            <label className="ms-4" htmlFor="">Dropdown </label>

          </div>
          <div className="my-3" style={{
            width: "88%",
            marginLeft: "6%",
          }}>
            <Multiselect value={selectedCountries} onChange={(e) => setSelectedCountries(e.value)}
              //  options={countries}
              optionLabel="name" display="chip"
              placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" />
          </div>
          <div className="mt-3" style={{ backgroundColor: "#f2edf3", color: "#f2edf3" }}>.</div>
          <div style={{ borderRadius: "10px" }}>
            <h2 className="availability">Tags</h2>
          </div>
          <div className="mb-3" style={{
            width: "88%",
            marginLeft: "6%",
          }}>
            <Multiselect value={selectedCountries} onChange={(e) => setSelectedCountries(e.value)}
              //  options={countries}
              optionLabel="name" display="chip"
              placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" />
          </div>
        </div>
      </div>
      <div className="col-md-8 bg-white mt-4">
          <h2 className="availability ">Pricing</h2>
          <div className="row">
          <div className="form-group col-md-6" style={{ paddingLeft: "42px", paddingRight: "10px" }}>
          <label className="required" for="exampleInputUsername1">
            Original Price
          </label>
        <input
          type="number"
          class="form-control"
          id="exampleInputUsername1"
          onChange={(e) => setOwner(e.target.value)}
          style={
            submit && owner.length === 0 ? { borderColor: "red" } : {}
          }
          value={owner}

        />
        </div>
          <div className="form-group col-md-6" style={{ paddingRight: "42px", paddingLeft: "10px" }}>
          <label className="required" for="exampleInputUsername1">
           Discount Price
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleInputUsername1"
            onChange={(e) => setOwner(e.target.value)}
            style={
              submit && owner.length === 0 ? { borderColor: "red" } : {}
            }
            value={owner}

          />
        </div>
        </div>
        <div className="text-center pb-3">
          <button
            onClick={() => Navigate("/admin-product-list")}
            class="btn btn-light"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={vendorEdit}
            class="btn btn-gradient-primary me-2"
          >
            Submit
          </button>
        </div>
        </div>

      
    </div>
  );
}

export default Productform;
