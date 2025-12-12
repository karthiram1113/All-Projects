import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { vendorEditFunction, vendorGet } from '../../services/api-services'

function Vendorform() {

  // Loading State

  const [loading,setLoading] = useState('')

  // Vendor Usestate

  const Navigate = useNavigate()

  const [vendorId,setVendorId] = useState('')
  const [owner,setOwner] = useState('')
  const [shopName,setShopName] = useState()
  const [userName, setuserName] = useState('')
  const [phone, setPhone] = useState('')
  const [shopType,setShowType] = useState('')
  const [password, setPassword] = useState('')
  const [img,setImg]=useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  // const [cureshopAddress, setShopAddress] = useState('')
  const [status,setStatus] = useState('')

  // Form Validation

const [submit,setSubmit] = useState(false)


  // Useeffect Method

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    const vendorId = myArray[3];
    setVendorId(vendorId);
    vendorGetMethod(vendorId);

   }, []);


  // Vendor Edit Api

  const vendorEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmit(true)

    if(!phone||!owner||!shopName){
      return;
    }
  
    try {
      console.log({ vendorId, owner, shopName, userName, phone, shopType, img, password, confirmPassword, status });
  
      // Pass the parameters in the correct order
      const responseData = await vendorEditFunction(
        vendorId,
        owner,
        shopName,
        phone, 
        shopType,
        userName,
        password,
        confirmPassword,
        img, // Ensure this is the image file
        status
      );
  
      console.log('API Response:', responseData);
  
      if (responseData.apiStatus.code == '200') {
        Navigate('/Vendor-list');
        setSubmit(false)
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
    try {
        // Call the clientGet function with the clientId
        const response = await vendorGet(vendorId);

        // Check if the response has a valid JSON structure
        if (!response || !response.result || !response.result.VendorData) {
            throw new Error("Invalid response data");
        }

        // Extract the client data
        const dat = response.result.VendorData;
        console.log(dat, "dat");

     setOwner(dat.shop_owner)
      setShopName(dat.shop_name)
      setuserName(dat.username)
      setPhone(dat.contact)
      setShowType(dat.shop_type)
      setImg(dat.avatar)
      setStatus(dat.status)
      setVendorId(dat.id)

    } catch (error) {
        console.log("Error handled =", error);
    }
};

  
  return (
    <div>


      <div class="card">
        <div class="card-body">
          <form class="forms-sample">
            <div className='row'>
              <div className='col-md-6'>
                <div class="form-group">
                  <label className='required' for="exampleInputUsername1">Owner Name</label>
                  <input type="text" class="form-control" id="exampleInputUsername1"
                  onChange={(e)=>setOwner(e.target.value)}
                  style={
                    submit && (owner.length === 0)
                      ? { borderColor: 'red' }
                      : {}
                  }
                  value={owner}
                  placeholder="Owner" />
                   {submit && owner.length == 0 ? <div className='text-danger'>Owner name is required</div> : <></>}

                </div>
              </div>
              <div className='col-md-6'>
                <div class="form-group">
                  <label className='required' for="exampleInputEmail1">Shop Name</label>
                  <input type="email" class="form-control" id="exampleInputEmail1"
                  onChange={(e)=>setShopName(e.target.value)}
                  style={
                    submit && (shopName.length === 0)
                      ? { borderColor: 'red' }
                      : {}
                  }
                  value={shopName}
                  placeholder="Shop Name" />
                   {submit && shopName.length == 0 ? <div className='text-danger'>Shop name is required</div> : <></>}

                </div>
              </div>
              <div className='col-md-4'>
              <div class="form-group">
                  <label for="exampleInputUsername1">Username</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setuserName(e.target.value)}
                  value={userName}
                  placeholder="Username" />
                </div>
              </div>
              <div className='col-md-4'>
              <div class="form-group">
                  <label for="exampleInputUsername1">Shop Type</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setShowType(e.target.value)}
                  value={shopType}
                  placeholder="Shop Type" />
                </div>
              </div>
              <div className="col-md-4">
  <div className="form-group">
    <label htmlFor="exampleInputGender">Status</label>
    <select value={status} onChange={(e)=>setStatus(e.target.value)} className="form-control" id="exampleInputGender" style={{ height: '44px', fontSize: '12px',borderColor:"red" }}>
      <option hidden>Select Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>
</div>
               <div className='col-md-6'>
              <div class="form-group">
                  <label for="exampleInputUsername1">Password</label>
                  <input type="password" class="form-control" id="exampleInputUsername1"
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                   placeholder="Password" />
                </div>
              </div>
              <div className='col-md-6'>
              <div class="form-group">
                  <label for="exampleInputUsername1">Confirm Password</label>
                  <input type="password" class="form-control" id="exampleInputUsername1"
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                   placeholder="Confirm Password" />
                </div>
              </div>
              {/* <div className='col-md-4'>
              <div class="form-group">
                  <label for="exampleInputUsername1">Current Password</label>
                  <input type="text" class="form-control" id="exampleInputUsername1"
                  onChange={(e)=>setCurrentPassword(e.target.value)}
                  value={currentPassword}
                   placeholder="Confirm Password" />
                </div>
              </div>  */}
              <div className='col-md-6'>
              <div class="form-group">
                  <label className='required' for="exampleInputUsername1">Contact</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setPhone(e.target.value)}
                  maxLength={12}
                  style={
                    submit && (phone.length < 10 || phone.length === 0)
                      ? { borderColor: 'red' }
                      : {}
                  }
                  value={phone}
                  placeholder="Contact" />
                   {submit && phone.length == 0 ? <div className='text-danger'>Phone number is required</div> : <></>}
                  {submit && phone.length < 10 && phone.length > 0 && (
                    <div className="text-danger">Phone number should be at least 10 digits</div>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
              <div className="form-group">
      <label htmlFor="exampleInputUsername1">Image</label>
      <input
        type="file"
        className="form-control"
        id="exampleInputUsername1"
        onChange={handleFileChange}
        placeholder="image"
      />
    </div>
              
              </div>

            </div>

<div className='text-center'>
<button  onClick={()=>Navigate("/Vendor-list")} class="btn btn-light">Cancel</button>
            <button type="submit" onClick={vendorEdit} class="btn btn-gradient-primary me-2">Submit</button>
</div>

            
           
          </form>
        </div>
      </div>


      <div class="col-md-6 grid-margin stretch-card">

      </div>



    </div>
  )
}

export default Vendorform
