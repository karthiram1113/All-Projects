import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ADMINAPI from '../../../../api/services/AdminLogin/adminAPI'

function Userform() {

  // Navigate
  const Navigate = useNavigate()

  //   User Usestate

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [loginType, setLoginType] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [userId, setUserId] = useState('')
  const [urlName, setUrlName] = useState('')
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const [showPassword, setShowPassword] = useState(false);

  const [submit, setSubmit] = useState(false)
  // Useeffect Method

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    const userId = myArray[3];
    setUserId(userId);
    setUrlName(myArray[2]);
    userGetMethod(userId);
  }, []);


  // Shoptype Create Api

  const userCreateApi = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', userName);
      formData.append('loginType', loginType);
      formData.append('password', password);
      if (avatar) {
        formData.append('avatar', avatar);
      }
      console.log('FormData being sent:', [...formData.entries()]);

      const responseData = await ADMINAPI.adminUserCreate(formData);


      if (responseData.apiStatus.code === '200') {
        Navigate('/adminuserlist');
        setSubmit(false);
        toast.success(responseData.apiStatus.message);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.error('Error in clientEdit:', error);
    } finally {
    }
  };

  // Shoptype Update Api

  const userEditApi = async (e) => {
    e.preventDefault();
    setSubmit(true);


    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', userName);
      formData.append('loginType', loginType);
      formData.append('password', password);
      formData.append('userId', userId);
      if (avatar) {
        formData.append('avatar', avatar);
      }
      console.log('FormData being sent:', [...formData.entries()]);

      const responseData = await ADMINAPI.adminUserEdit(formData);

      if (responseData.apiStatus.code === '200') {
        Navigate('/adminuserlist');
        setSubmit(false);
        toast.success(responseData.apiStatus.message);
      } else {
        toast.error(responseData.apiStatus.message);
      }
    } catch (error) {
      console.error('Error in clientEdit:', error);
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
      const response = await ADMINAPI.adminUserGet(userId);


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
            <div className='row mb-4'>
              <div className='col-md-4'>
                <div class="coolinput">
                  <label for="input" class="text">First Name</label>
                  <input type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}

                    id="exampleInputEmail1" placeholder="Enter your first name" name="input" class="input" 
                    style={submit && firstName?.length === 0 ? { borderColor: "red" } : {}}
                    />
                  {submit && firstName.length == 0 ? <div className="text-danger">*Firstname is required</div> : <></>}
                </div>
              </div>
              <div className='col-md-4'>
                <div class="coolinput">
                  <label for="input" class="text">Last Name</label>
                  <input type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    id="exampleInputEmail1" placeholder="Enter your last name" name="input" class="input"
                    style={submit && lastName?.length === 0 ? { borderColor: "red" } : {}}
                    />
                  {submit && lastName.length == 0 ? <div className="text-danger">*Lastname is required</div> : <></>}
                </div>
              </div>
              <div className='col-md-4 mb-3'>
                <div class="coolinput">
                  <label for="input" class="text">User Name</label>
                  <input
                    autoComplete='new-password'
                    type="email"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    id="exampleInputEmail1" placeholder="Enter your user name" name="input" class="input" 
                    style={submit && userName?.length === 0 ? { borderColor: "red" } : {}}
                    />
                  {submit && userName.length == 0 ? <div className="text-danger">*Username is required</div> : <></>}
                </div>
              </div>

              <div className="col-md-4">
                <div class="coolinput">
                  <label for="input" class="text">Login Type</label>
                  <div style={{ position: 'relative' }} className="coolinput-status">
                    <select
                      value={loginType} onChange={(e) => setLoginType(e.target.value)}
                      className="form-control "
                      id="exampleInputGender"
                      style={{
                        padding: "18px 10px",
                        borderRadius: "5px",
                        border: "1px solid lightgray !important",
                        fontSize: "12px",
                      }}
                    >
                      <option hidden>Select Login Type</option>
                      <option value="Administration">Administration</option>
                      <option value="Staff">Staff</option>
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
              <div className='col-md-4 position-relative'>
                <div class="coolinput">
                  <label for="input" class="text">Password</label>
                  <input autoComplete="new-password"
                    type={showPassword ? "password" : "text"}
                    onChange={(e) => setPassword(e.target.value)}
                    // value={password ? "******" : password}

                    placeholder="Enter your password" name="input" class="input" 
                    style={submit && password?.length === 0 ? { borderColor: "red" } : {}}
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
              <div className='col-md-4'>
                <div class="coolinput">
                  <label for="input" class="text">Image</label>
                  <input type="file" onChange={handleFileChange}
                    id="exampleInputUsername1" placeholder="Enter your Image" name="input" class="input" />
                </div>
              </div>


            </div>

            <div className='button-center over-all-btn'>
              <Link
                to={"/adminuserlist"}

                type="button"
                class="btn btn-light"
              >
                Cancel
              </Link>
              {urlName == "Create" ? <button type="submit"
                onClick={userCreateApi}
                class="btn btn-gradient-primary me-2">Submit</button> :
                <button type="submit"
                  onClick={userEditApi}
                  class="btn btn-gradient-primary me-2">Submit</button>}

            </div>


          </form>
        </div>
      </div>
    </div>
  )
}

export default Userform
