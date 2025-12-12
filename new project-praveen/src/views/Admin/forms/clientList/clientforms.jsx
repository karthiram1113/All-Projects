import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [status, setStatus] = useState('')
  const [password, setPassword] = useState('') 
  const [confirmPassword, setConfirmPassword] = useState('')
  // const [cureshopAddress, setShopAddress] = useState('')
  const [avatar,setAvatar] = useState(null)

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


  // Vendor Edit Api

  // const clientEdit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setSubmit(true)
  //   if(!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)||!contact||!status){
  //     return
  //   }
  //   if (contact.length < 10 && contact.length > 0) {
  //     return;
  //   }
  
  //   try {
  //     console.log({ clientId, firstName, middleName, lastName, gender, contact, address, email, password,confirmPassword, avatar });
  
  //     // Pass the parameters in the correct order
  //     const responseData = await clientEditFunction(
  //       clientId,
  //       firstName,
  //       middleName, 
  //       lastName,
  //       gender,
  //       contact,
  //       address,
  //       email,
  //       password,
  //       confirmPassword,
  //       avatar
  //     );
  
  //     console.log('API Response:', responseData);
  
  //     if (responseData.apiStatus.code == '200') {
  //       Navigate('/Client-list');
  //       setSubmit(false)
  //       toast.success(responseData.apiStatus.message);
  //     } else {
  //       toast.error(responseData.apiStatus.message);
  //     }
  //   } catch (error) {
     
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //  const clientEdit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setSubmit(true);
  //  if (contact.length < 10 && contact.length > 0) {
  //      return;
  //    }
  //   console.log("input");
  //   const formData = new FormData();
  //   formData.append('clientid', clientId);
  // formData.append('firstName', firstName);
  // formData.append('middleName', middleName);
  // formData.append('lastName', lastName);
  // formData.append('gender', gender);
  // formData.append('contact', contact);
  // formData.append('address', address);
  // formData.append('email', email);
  // formData.append('password', password);
  // formData.append('confirmPassword', confirmPassword);
  // console.log(formData,"3333");
  
  //   try {
  //     const responseData = await ADMINAPI.adminClientUpdate(formData);

  //     console.log("3333", responseData);
  //       // console.log(responseData.apiStatus.code,"wwww");

  //     console.log('API Response:', responseData);
  
  //      if (responseData.apiStatus.code == '200') {
  //        Navigate('/Client-list');
  //        setSubmit(false)
  //        toast.success(responseData.apiStatus.message);
  //      } else {
  //        toast.error(responseData.apiStatus.message);
  //      }
  //    } catch (error) {
     
  //    } finally {
  //      setLoading(false);
  //    }
  // };
  const clientEdit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSubmit(true);

  // if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) || !contact || !status) {
  //   return;
  // }

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
            <div className='row'>
              <div className='col-md-4'>
                <div class="form-group">
                  <label for="exampleInputUsername1">First Name</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="First Name" />
                </div>
              </div>
              <div className='col-md-4'>
                <div class="form-group">
                  <label for="exampleInputEmail1">Middle Name</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" 
                  onChange={(e)=>setMiddleName(e.target.value)}
                  value={middleName}
                  placeholder="Middle Name" />
                </div>
              </div>
              <div className='col-md-4'>
                <div class="form-group">
                  <label for="exampleInputEmail1">Last Name</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" 
                  onChange={(e)=>setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Last Name" />
                </div>
              </div>
              <div className='col-md-6'>
              <div class="form-group">
                  <label className='required' for="exampleInputUsername1">Email</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setEmail(e.target.value)}
                  style={
                    submit && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)
                      ? { borderColor: "red" }
                      : {}
                  }
                  value={email}
                  placeholder="Email" />
                  {submit && email.length === 0 ? (
                      <div className="text-danger">Email is required</div>
                    ) : (
                      <>
                        {submit && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) && (
                          <div className="text-danger">Invalid email format</div>
                        )}
                      </>
                    )}
                </div>
              </div>
              <div className="col-md-6">
  <div className="form-group">
    <label  htmlFor="exampleInputGender">Gender</label>
    <select value={gender} className="form-control" id="exampleInputGender" 
    onChange={(e)=>setGender(e.target.value)}
    style={{ height: '44px', fontSize: '12px', }}>
      <option hidden >Select Gender</option>
      <option value="male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>
</div>


              <div className='col-md-6'>
              <div class="form-group mb-9">
                  <label for="exampleInputUsername1">Address</label>
                  <textarea class="form-control" 
                  onChange={(e)=>setAddress(e.target.value)}
                  value={address}
                  placeholder="Address" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>
              
              <div className='col-md-6'>
              <div class="form-group mb-9">
                  <label  for="exampleInputUsername1">Status</label>
                  <select value={status} className="form-control" id="exampleInputGender" 
    onChange={(e)=>setStatus(e.target.value)}
    style={{ height: '44px', fontSize: '12px' }}>
      <option hidden >Select Status</option>
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
                  disabled
                  value={password}
                  placeholder="Password" />
                </div>
              </div>
              <div className='col-md-6'>
              <div class="form-group">
                  <label for="exampleInputUsername1">Confirm Password</label>
                  <input type="password" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  disabled
                  value={confirmPassword}
                  placeholder="Confirm Password" />
                </div>
              </div>
              <div className='col-md-6'>
              <div class="form-group">
                  <label className='required' for="exampleInputUsername1">Contact</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setContact(e.target.value)}
                  maxLength={12}
                  style={
                    submit && (contact.length < 10 || contact.length === 0)
                      ? { borderColor: 'red' }
                      : {}
                  }
                  value={contact}
                  placeholder="Contact" />
                   {submit && contact.length == 0 ? <div className='text-danger'>Phone number is required</div> : <></>}
                  {submit && contact.length < 10 && contact.length > 0 && (
                    <div className="text-danger">Phone number should be at least 10 digits</div>
                  )}
                </div>
              </div>

              <div className='col-md-6'>
              <div class="form-group">
                  <label for="exampleInputUsername1">Image</label>
                  <input type="file" class="form-control" id="exampleInputUsername1" 
                    onChange={handleFileChange}
                  placeholder="image" />
                </div>
              </div>

            </div>

<div className='button-center'>
<button  onClick={()=>Navigate("/adminclientlist")} class="btn btn-light">Cancel</button>
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
