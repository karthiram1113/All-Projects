import React, { useState, useEffect } from "react";
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../common/loading";
import { Link,useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../services/endpoint";
import { environment } from '../../environment/environment';
import { clientEditFunction } from '../../services/apiserver';

function Edit_Profile() {
    // const [showPassword, setShowPassword] = useState(false);
    // const [showPassword2, setShowPassword2] = useState(false);

    // password show
    // const togglePasswordVisibility = () => {
    //     setShowPassword((prevState) => !prevState);
    // };

    // const togglePasswordVisibility2 = () => {
    //     setShowPassword2((prevState) => !prevState);
    // };
    const API_BASE_URL = environment.apiBaseUrl;

    const [clientId, setClientId] = useState('');
    const [firstName, setFirstName] = useState('');
    // const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGenter] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageLogo, setImageProfile] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        setValue(myArray[2]);
        console.log(myArray[3], "bk");

        setClientId(myArray[3])
        getMethod(myArray[3]);
        console.log(myArray[2], "s");
        console.log(clientId, "mmmf");

    }, []);


    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2((prevState) => !prevState);
    };


    const togglePasswordVisibility3 = () => {
        setShowPassword3((prevState) => !prevState);
    };



    const updateFunction = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const responseData = await clientEditFunction(
                clientId,
                firstName,
                // middleName,
                lastName,
                gender,
                contactNo,
                address,
                email,
                password,
                confirmPassword,
                imageLogo,
                currentPassword
            );

            if (responseData.apiStatus.code === '200') {

                toast.success(responseData.apiStatus.message);

                navigate('/');
            } else {
                console.error('API response error:', responseData.apiStatus.message);
                toast.error(responseData.apiStatus.message);
            }
        } catch (error) {
            console.error('Error in UpdateFunction:', error);
            toast.error('An error occurred while updating the client.');
        } finally {
            setLoading(false);
        }
    };

    // image
    const handleImageChange = (e) => {
        setImageProfile(e.target.files[0]); // Get the selected file
    };




    // get api

    const getMethod = async (clientId) => {
        // let id = localStorage.getItem("idb");

        try {
            const response = await fetch(`${API_BASE_URL}${API_URL.clientGetProfile}${clientId}`, {
                method: "GET"
            });

            const responseData = await response.json();
            const data = responseData.result.ClientData;

            console.log(data, "data");
            setClientId(data.id);
            setFirstName(data.firstname);
            // setMiddleName(data.middlename);
            setLastName(data.lastname);
            setAddress(data.address);
            setGenter(data.gender);
            setContactNo(data.contact);
            setEmail(data.email);
            // setPassword(data.password);
            // setConfirmPassword(data.confirmPassword);
            setImageProfile(data.avatar);
            // setCurrentPassword(data.password);
        } catch (errors) {
            console.error("Error handled =", errors);
            toast.error("Failed to fetch Client Data");
        }
    };



    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div className="text-start border-bottom">
                        <h4><FontAwesomeIcon icon={faPenToSquare} className="edit-icon-account" /> Edit Profile</h4>
                    </div>
                    <div>
                        <form className="p-4">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="firstName" class="form-label">First Name</label>
                                    <input type="text" class="form-control edit-profile-input" onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName} />
                                </div>
                                <div class="col-md-6">
                                    <label for="lastName" class="form-label">Last Name</label>
                                    <input type="text" class="form-control edit-profile-input"
                                        onChange={(e) => setLastName(e.target.value)}
                                        value={lastName} />
                                </div>
                                <div class="col-md-6">
                                    <label for="contactNumber" class="form-label">Contact Number</label>
                                    <input type="text" class="form-control edit-profile-input"
                                        onChange={(e) => setContactNo(e.target.value)}
                                        value={contactNo} />
                                </div>
                                <div class="col-md-6">
                                    <label for="contactNumber" class="form-label">Image</label>
                                    <input type="file" class="form-control edit-profile-input"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="email" class="form-label">Email</label>
                                    <div class="input-group">
                                        <input type="email" class="form-control edit-profile-input"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label for="gender"
                                        class="form-label edit-form-label"
                                        onChange={(e) => setGenter(e.target.value)}
                                        value={gender}
                                    >Gender</label>
                                    <select class="form-select border-0 form-input-box" id="gender">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div class="col-md-12">
                                    <label for="address" class="form-label">Address</label>
                                    <textarea class="form-control edit-profile-input-1"
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address}></textarea>
                                </div>

                                <div class="col-md-6">
                                    <label for="currentPassword" class="form-label">Current Password</label>
                                    <div class="input-group">
                                        <input type="password" class="form-control edit-profile-input  border-end-0" id="currentPassword"
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            value={currentPassword} />
                                        <button class="toggle-password" onClick={togglePasswordVisibility} >

                                            {showPassword ? (
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            ) : (
                                                <FontAwesomeIcon icon={faEye} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <label for="newPassword" class="form-label">New Password</label>
                                    <div class="input-group">
                                        <input type="password" class="form-control edit-profile-input  border-end-0" id="newPassword"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password} />
                                        <button class="toggle-password" onClick={togglePasswordVisibility} >

                                            {showPassword ? (
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            ) : (
                                                <FontAwesomeIcon icon={faEye} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 d-flex gap-4">
                                <Link
                                    to="/" >
                                    <button type="reset" class="edit-cancel-btn">Cancel</button></Link>
                                <button type="submit" class="edit-save-btn" onClick={updateFunction} >Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Edit_Profile;