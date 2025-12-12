import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ADMINAPI from '../../../../api/services/AdminLogin/adminAPI'
import context from 'react-bootstrap/esm/AccordionContext'

function Clientforms() {

  // Loading State

  const [loading,setLoading] = useState('')

  // Vendor Usestate

  const Navigate = useNavigate()

  const [clientId,setClientId] = useState('')
  const [firstName,setFirstName] = useState('')
  const [middleName,setMiddleName] = useState()
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [contact,setContact] = useState('')
  const [address, setAddress] = useState('')
  const [email,setEmail] = useState('')
  const [status, setStatus] = useState('Active')
  const [password, setPassword] = useState('') 
  const [confirmPassword, setConfirmPassword] = useState('')
  // const [cureshopAddress, setShopAddress] = useState('')
  const [avatar,setAvatar] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimpassword, setShowConfrimPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfrimPassword = () => setShowConfrimPassword((prev) => !prev);
// Form Validation

const [submit,setSubmit] = useState(false)

  // Useeffect Method

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    const clientId = myArray[3];
    setClientId(clientId);
    clientGetMethod(clientId);
}, []);

  const clientEdit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSubmit(true);

  // if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) || !contact || !status) {
  //   return;
  // }
  
  if(!contact || !email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)){
    return;
  }

  if (contact.length < 10 && contact.length > 0) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append('clientid', clientId);
    formData.append('firstName', firstName);
    formData.append('middleName', middleName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('contact', contact);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('status', status);
    if (avatar) {
      formData.append('avatar', avatar); // Ensure avatar is a File object
    }

    console.log('FormData being sent:', [...formData.entries()]);

    const responseData = await ADMINAPI.adminClientUpdate(formData); // API must accept FormData

    console.log('API Response:', responseData);

    if (responseData.apiStatus.code === '200') {
      Navigate('/adminclientlist');
      setSubmit(false);
      toast.success(responseData.apiStatus.message);
    } else {
      toast.error(responseData.apiStatus.message);
    }
  } catch (error) {
    console.error('Error in clientEdit:', error);
  } finally {
    setLoading(false);
  }
};



  // Handler for file input change
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };


   // Client Get Api Method

   const clientGetMethod = async (clientId) => {
        console.log(clientId,"clientid");

    try {
        // Call the clientGet function with the clientId
        const response = await ADMINAPI.adminClientGet(clientId);
        console.log(response,"data");

        // Check if the response has a valid JSON structure
        if (!response || !response.result || !response.result.ClientData) {
            throw new Error("Invalid response data");
        }

        // Extract the client data
        const dat = response.result.ClientData;
        console.log(dat, "dat");

        // Set state with client data
        setFirstName(dat.firstname);
        setMiddleName(dat.middlename);
        setLastName(dat.lastname);
        setGender(dat.gender);
        setContact(dat.contact);
        setAddress(dat.address);
        setEmail(dat.email);
        setPassword(dat.password);
        setConfirmPassword(dat.password);
        setAvatar(dat.avatar);
        setClientId(dat.id);

    } catch (error) {
        console.log("Error handled =", error);
    }
};





  return (
    <div>
      
      <div class="card">
        <div class="card-body">
          <form class="forms-sample">
            <div className='row mb-4'>
             
              <div className='col-md-4'>
                
                <div class="coolinput">
                  <label for="input" class="text">First Name</label>
                  <input type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    id="exampleInputEmail1" placeholder="Enter your first name" name="input" class="input" />
                </div>
              </div>
              <div className='col-md-4'>
                <div class="coolinput">
                  <label for="input" class="text">Last Name</label>
                  <input type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    id="exampleInputEmail1" placeholder="Enter your last name" name="input" class="input" />
                </div>
              </div>
              <div className='col-md-4 mb-3'>
                <div class="coolinput">
                  <label for="input" class="text">Image</label>
                  <input type="file"
                  className='img-input'
                    onChange={handleFileChange}
                    id="exampleInputEmail1" placeholder="Enter your Image" name="input" class="input" />
                </div>
              </div>    
              <div className="col-md-4">
                <div class="coolinput">
                  <label for="input" class="text">Gender</label>
                  <div style={{ position: 'relative' }} className="coolinput-status">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-control "
                      id="exampleInputGender"
                      style={{
                        padding: "14px 10px",
                        borderRadius: "5px",
                        fontSize: "12px",
                        borderColor: "red",
                      }}
                    >
                      <option hidden>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="Female">Female</option>
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
              <div className='col-md-4'>
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
              <div className='col-md-4 mb-3'>
                <div class="coolinput">
                  <label for="input" class="text">Phone</label>
                  <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
                    maxLength={12} id="exampleInputEmail1" placeholder="Enter your phone number" name="input" class="input"
                    style={submit && contact?.length === 0 || (contact?.length < 10 && contact?.length > 0) ? { borderColor: "red" } : {}}
                    />
                  {submit && contact.length == 0 ? <div className='text-danger'>Phone number is required</div> : <></>}
                  {submit && contact.length < 10 && contact.length > 0 && (
                    <div className="text-danger">Phone number should be at least 10 digits</div>
                  )}
                </div>
              </div>
              <div className='col-md-4 '>
                <div class="coolinput">
                  <label for="input" class="text">Email</label>
                  <input type="email" onChange={(e) => setEmail(e.target.value)}
                    value={email} id="exampleInputUsername1" placeholder="Enter your email" name="input" class="input"
                    style={submit && (email?.length === 0 || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) ? { borderColor: "red" } : {}}
                    />
                  {submit && email.length === 0 ? (
                    <div className="text-danger">*Email is required</div>
                  ) : (
                    <>
                      {submit && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) && (
                        <div className="text-danger">*Invalid email format</div>
                      )}
                    </>
                  )}        
                </div>
              </div>
              <div className='col-md-4 position-relative'>
                <div class="coolinput">
                  <label for="input" class="text">Password</label>
                  <input type={showPassword ? "password" : "text"} onChange={(e) => setPassword(e.target.value)}
                    disabled
                    style={{cursor:"not-allowed"}}
                    value={password ? "******" : password} id="exampleInputUsername1" placeholder="Enter your password" name="input" class="input" />
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
                      <i className="fa-solid fa-eye-slash eye-icon"></i>
                    ) : (
                      <i className="fa-solid fa-eye eye-icon"></i>
                    )}
                  </span>
                </div>
              </div>
              <div className='col-md-4 mb-3 position-relative'>
                <div class="coolinput">
                  <label for="input" class="text">Confirm Password</label>
                  <input type={showConfrimpassword ? "password" : "text"} onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled
                    value={confirmPassword ? "******" : confirmPassword}
                    style={{ cursor: "not-allowed" }}
                    id="exampleInputUsername1" placeholder="Enter your confirm password" name="input" class="input" />
                  <span
                    onClick={toggleShowConfrimPassword}
                    style={{
                      position: "absolute",
                      right: "32px",
                      top: "32px",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? (
                      <i className="fa-solid fa-eye-slash eye-icon"></i>
                    ) : (
                      <i className="fa-solid fa-eye eye-icon"></i>
                    )}
                  </span>
                </div>
              </div>
            
              <div className='col-md-12'>
                <div class="coolinput">
                  <label for="input" class="text">Address</label>
                  <textarea  onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    id="exampleInputUsername1" placeholder="Enter your address" rows="3" name="input" class="input" />
                </div>
              </div> 

            </div>

            <div className='button-center over-all-btn'>
 <Link
                to={"/adminclientlist"}
                 
                  type="button"
                  class="btn btn-light"
                >
                  Cancel
                </Link>
            <button type="submit"
             onClick={clientEdit} 
             class="btn btn-gradient-primary me-2">Submit</button>
           
</div>
          
          </form>
        </div>
      </div>


      <div class="col-md-6 grid-margin stretch-card">

      </div>

    </div>
  )
}

export default Clientforms
