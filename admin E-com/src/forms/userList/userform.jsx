import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userCreateFunction, userEditFunction, userGet } from '../../services/api-services'

function Userform() {

     // Navigate
     const Navigate = useNavigate()

    //   User Usestate

const [firstName,setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [userName,setUserName] = useState('')
const [loginType,setLoginType] = useState('')
const [password, setPassword] = useState('')
const [avatar,setAvatar] = useState(null)
const [userId,setUserId] = useState('')
const [urlName,setUrlName] = useState('')

const [submit,setSubmit] = useState(false)
// Useeffect Method

useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    const userId = myArray[3];
    setUserId(userId);
     setUrlName (myArray[2]);
     userGetMethod(userId);
}, []);


 // Shoptype Create Api

 const userCreateApi = async (e) => {
    e.preventDefault();
    setSubmit(true)

    if(!firstName||!lastName||!userName||!password) {
      return;
    }
    
    try {
    
      const responseData = await userCreateFunction(
        firstName,
        lastName,
        userName,
        loginType,
        password,
        avatar
      );
  
      console.log('API Response:', responseData);
  
      if (responseData.apiStatus.code == '200') {
        Navigate('/Userlist');
        setSubmit(false)
        toast.success(responseData.apiStatus.message);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
    } finally {
    
    }
  };

 // Shoptype Create Api

 const userEditApi = async (e) => {
    e.preventDefault();
    try {
    
      const responseData = await userEditFunction(
    
        firstName,
        lastName,
        userName,
        password,
        avatar,
        loginType,
        userId,
        
      );
  
      console.log('API Response:', responseData);
  
      if (responseData.apiStatus.code == '200') {
        Navigate('/Userlist');
        toast.success(responseData.apiStatus.message);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
    } finally {
    
    }
  };

  // Handler for file input change
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };


    // User Get Api Method

    const userGetMethod = async (userId) => {
        try {
            const response = await userGet(userId);
    
        
            if (!response || !response.result || !response.result.AdminData) {
                throw new Error("Invalid response data");
            }
    
            // Extract the client data
            const dat = response.result.AdminData;
            console.log(dat, "dat");
    
           setFirstName(dat.firstname)
           setLastName(dat.lastname)
           setUserName(dat.username)
           setPassword(dat.password)      
           setAvatar(dat.avatar)
           setLoginType(dat.type)
          
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
                  <label className='required' for="exampleInputUsername1">First Name</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setFirstName(e.target.value)}
                  style={
                    submit && firstName.length == 0
                      ? { borderColor: "red" }
                      : { borderColor: "" }
                  }
                  value={firstName}
                  placeholder="First Name" />
                  {submit&&firstName.length==0?<div className="text-danger">Firstname is required</div>:<></>}
                </div>
              </div>
              <div className='col-md-4'>
                <div class="form-group">
                  <label className='required' for="exampleInputEmail1">Last Name</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" 
                  onChange={(e)=>setLastName(e.target.value)}
                  style={
                    submit && lastName.length == 0
                      ? { borderColor: "red" }
                      : { borderColor: "" }
                  }
                  value={lastName}
                  placeholder="Last Name" />
                  {submit&&lastName.length==0?<div className="text-danger">Lastname is required</div>:<></>}

                </div>
              </div>
              <div className='col-md-4'>
                <div class="form-group">
                  <label className='required' for="exampleInputEmail1">User Name</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" 
                  onChange={(e)=>setUserName(e.target.value)}
                  style={
                    submit && userName.length == 0
                      ? { borderColor: "red" }
                      : { borderColor: "" }
                  }
                  value={userName}
                  placeholder="User Name" />
                  {submit&&userName.length==0?<div className="text-danger">Username is required</div>:<></>}

                </div>
              </div>

              <div className="col-md-4">
  <div className="form-group">
    <label htmlFor="exampleInputGender">Login Type</label>
    <select value={loginType} onChange={(e)=>setLoginType(e.target.value)} className="form-control" id="exampleInputGender" style={{ height: '44px', fontSize: '12px',borderColor:"red" }}>
      <option hidden>Login Type</option>
      <option value="Administration">Administator</option>
      <option value="Staff">Staff</option>
    </select>
  </div>
</div>
<div className='col-md-4'>
              <div class="form-group">
                  <label class='required' for="exampleInputUsername1">Password</label>
                  <input type="password" class="form-control" id="exampleInputUsername1"
                  onChange={(e)=>setPassword(e.target.value)}
                  style={
                    submit && password.length == 0
                      ? { borderColor: "red" }
                      : { borderColor: "" }
                  }
                  value={password}
                   placeholder="Password" />
                  {submit&&password.length==0?<div className="text-danger">Password is required</div>:<></>}

                </div>
              </div>
              <div className='col-md-4'>
              <div className="form-group">
      <label htmlFor="exampleInputUsername1">Avatar</label>
      <input
        type="file"
        className="form-control"
        id="exampleInputUsername1"
        onChange={handleFileChange}
        placeholder="Avatar"
      />
    </div>
              
              </div>


            </div>

            <div className='button-center'>
            <button onClick={()=>Navigate("/Userlist")} class="btn btn-light">Cancel</button>
       {urlName=="Create"? <button type="submit" onClick={userCreateApi} class="btn btn-gradient-primary me-2">Submit</button>:
        <button type="submit" onClick={userEditApi}  class="btn btn-gradient-primary me-2">Submit</button>}    

            </div>

         
          </form>
        </div>
        </div>
    </div>
  )
}

export default Userform
