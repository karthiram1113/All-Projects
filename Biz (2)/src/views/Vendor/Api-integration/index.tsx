import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Footer from "../../../shared/Footer";
import TopNav from "../../../shared/TopNav";
import VendorAPI from "../../../api/services/vendorLogin/vendorApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Common/Loading";
import "./index.css";
  
function Api_Setup() {

    const [submit, setSubmit] = useState(false);
    const [postApi] = useState<any>(
        {
                "VendorId": "11",
                "VendorName": "Ninhao Coimbatore",
                "VendorType": "restaurant",
                "VendorEmail": "info@/ninhaorestuarant.in",
                "VendorPhone": "9787423567",
                "VendorAddress": "276b, First Floor, N S R Road, Saibaba Colony Coimbatore 641025 India",
                "VendorPincode": null,
                "VendorCity": null,
                "VendorState": null,
                "VendorCountry": null,
                "VendorTimezone": null,
                "VendorLanguage": null,
                "VendorStatus": "1",
                "UserId": "15",
                "UserFirstName": "Willam",
                "UserLastName": "",
                "UserUserName": "Ninhao Coimb",
                "UserEmail": "info@/ninhaorestuarant.in",
                "UserPhone": "9787423567",
                "UserProfileImage": "uploads/profile_image/WhatsAppImage2025-10-16at14_674322.jpeg",
                "UserStatus": "1",
                "RoleId": "2",
                "RoleName": "vendor_super_admin"
            });
    const [testsubmit, settestSubmit] = useState(false);
    const [showbuttons, SetShowButtons] = useState(false);
    const [showbuttons1, SetShowButtons1] = useState(false);
    const [showbuttons2, SetShowButtons2] = useState(false);
    const [showbuttons3, SetShowButtons3] = useState(false);
    const [accessTokenSts, setaccessTokenSts] = useState(false);
    const [showCopyurl, setshowCopyurl] = useState(false);
    const [entityId, setentityId] = useState("");
    const [appSenderId, setappSenderId] = useState("");
    const [apiKey, setapiKey] = useState("");
    const [smsConfig, setsmsConfig] = useState(false);
    const [loading, setLoading] = useState(true);
    const [testContactInte, settestContactInte] = useState(false);
    const [clientId, setclientId] = useState("");
    const [secretId, setsecretId] = useState("");
    const [accessToken, setaccessToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate=useNavigate();
    
    
   //Accordion Open

    const ShowButtonDatas = () => {
        SetShowButtons(true);
        if(showbuttons===true){
            SetShowButtons(false);
        }
    }
    const ShowButtonDatas1 = () => {
        SetShowButtons1(true);
        if(showbuttons1===true){
            SetShowButtons1(false);
            SetShowButtons2(false);
            SetShowButtons3(false);
        }
    }
    const ShowButtonDatas2 = () => {
        SetShowButtons2(true);
        if(showbuttons2===true){
            SetShowButtons2(false);
        }
    }
    const ShowButtonDatas3 = () => {
        SetShowButtons3(true);
        if(showbuttons3===true){
            SetShowButtons3(false);
        }
    }
    const handleCopyToClipboard=()=>{
        if (showCopyurl) setaccessTokenSts(true);
        navigator.clipboard.writeText(accessToken)
      .then(() => {
        setaccessToken(accessToken);   // mark this item as copied
        setTimeout(() => setaccessTokenSts(false), 1500); // reset after 1.5s
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
    }
    const handleApiCredentialsGet = () => {
        const apiCall= VendorAPI.ApiCredentialsgetAPI();
        apiCall
           .then((responseData: any) => {
              if (responseData.apiStatus.code === '200') {
                 setclientId(responseData?.responseData?.client_id);
                 setsecretId(responseData?.responseData?.client_secret);
                //  setaccessToken(responseData?.responseData?.access_token);
                 toast.success(responseData.apiStatus.message);
                 setLoading(false);
              } else {
                 toast.error(responseData.apiStatus.message);
                 setLoading(false);
              }
           })
           .catch((error: any) => {
              console.error("Error while fetching sms setup:", error);
              toast.error("An error occurred while fetching sms setup.");
              setLoading(false);
           });
     };
     
     const handleApiCredentialstokenGenAPI = () => {
        const apiData={
            client_id:clientId,
            client_secret:secretId
        }
        VendorAPI.ApiCredentialstokenGenAPI(apiData)
           .then((responseData: any) => {
              if (responseData.apiStatus.code === '200') {
                 setaccessToken(responseData?.responseData?.access_token);
                 setshowCopyurl(true);
              } else {
                 toast.error(responseData.apiStatus.message);
              }
           })
           .catch((error: any) => {
              console.error("Error while fetching sms setup config:", error);
              toast.error("An error occurred while fetching sms setup config.");
        });
     };

      //Test contact Config
        //  const handleTestContact = () => {
        //        settestSubmit(true);
        //        if (!testContact) {
        //           return;
        //        }
        //        const apiData = {test_contact: testContact};
        //        const apiCall =  VendorAPI.smssetuptestContact(apiData);
        //        apiCall
        //           .then((responseData: any) => {
        //              if (responseData.apiStatus.code === '200') {
        //                  settestSubmit(false);
        //                  SetShowButtons(false);
        //                  settestContactInte(true);
        //                  toast.success(responseData.apiStatus.message);
        //                  settestContact("");
        //                  handlesmsSetupConfig()
        //              } else {
        //                 toast.error(responseData.apiStatus.message);
        //              }
        //           })
        //           .catch((error: any) => {
        //              settestSubmit(false);
        //              console.error("Error while fetching sms test contact:", error);
        //              toast.error("An error occurred while fetching sms test contact.");
        //           });
        //  };
    useEffect(()=>{
        handleApiCredentialsGet();
    },[])
   
    return (
        <>
            <DashboardLayout>
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <TopNav />
                    <div className="container-fluid py-1">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to={"/vendor/dashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Settings</li>
                            </ol>
                            <h6 className="font-weight-bolder text-start mb-0">Api Settings</h6>
                        </nav>
                    </div>

                    <div className="dashboard-maincontent container-fluid py-4">
                        <div className="card p-3">
                            
                            <div className="row">
                                
                                <div className="col-md-6">
                            <h4>Api Integration</h4></div>
                            <div className="col-md-6 text-end">
                                        {/* <button  type="button" className="btn btn-primary">
                                            Authorize <i className="fa-solid fa-lock ms-2"></i>
                                        </button> */}
                                    </div>
                            {loading ? (
                                <Loading/>
                            ) : (
                                <div className="mt-5">
                                    <div className="col-md-12">
                                        <div className="campaign-template border shadow-lg mb-5">
                                            <h6 className="campaign-temp-head" onClick={ShowButtonDatas}>
                                                Api Credentials <span className="setting-whatsapp-ternary"></span>
                                            </h6>
                                            <div className={`campaign-content-wrapper ${true ? 'show' : ''}`}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="vendor-create-container">
                                                                <input autoComplete="off" value={clientId} maxLength={12} type="text" id="vendor-crt-input" className={`vendor-crt-input loginfilled-frame-username ${testsubmit && !clientId ? 'error' : ''}`} placeholder=" "  />
                                                                <label className="vendor-crt-label">
                                                                <i className="fa-solid fa-id-card-clip"></i> Client Id
                                                                </label>
                                                            </div>
                                                             <div className="vendor-create-container mt-3">
                                                                <input autoComplete="off" value={secretId} maxLength={12} type="text" id="vendor-crt-input" className={`vendor-crt-input loginfilled-frame-username ${testsubmit && !secretId ? 'error' : ''}`} placeholder=" "  />
                                                                <label className="vendor-crt-label">
                                                                <i className="fa-solid fa-id-card"></i> Secret Id
                                                                </label>
                                                        </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="campaign-template border shadow-lg mb-5">
                                            <h6 className="campaign-temp-head">
                                                Access Token <span className="setting-whatsapp-ternary"></span>
                                            </h6>
                                            <div className={`campaign-content-wrapper ${true ? 'show' : ''}`} style={{padding:'20px 10px 20px'}}>
                                                
                                                    <div className="row">
                                                        <div className="col-md-10 login-input-group staff-passwordInput">
                                                         <div className="vendor-create-container">
                                                            <input autoComplete="off" onChange={(e) => setaccessToken(e.target.value)} value={accessToken} type={true ? 'text' : 'password'} id="vendor-crt-input" 
                                                            className={`vendor-crt-input loginfilled-frame-username ${submit && !accessToken ? 'error' : ''}`} placeholder=" " 
                                                            style={{padding:"10px 35px 9px 9px"}} />
                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-ticket"></i> Access Token</label>
                                                         </div>
                                                         <div className="copy-wrapper password-eye staff-passwordInputicon position-absolute" style={{top: '6px',color: "white"}}>
                                                            <div className="image-icon " onClick={(e)=>{handleCopyToClipboard();e.stopPropagation();}} style={{ cursor: "pointer" }}>
                                                             <i className="fa-solid fa-copy url-copy" 
                                                            style={{
                                                                opacity: !showCopyurl ? 0.8 : 1,
                                                                cursor: !showCopyurl ? 'not-allowed' : 'pointer',
                                                            }}></i>
                                                            </div>
                                                            <span className={`copy-tooltip ${accessTokenSts ? "show" : ""}`}>
                                                                Copied
                                                            </span>
                                                            </div>
                                                      </div>
                                                        <div className="col-md-2 login-input-group staff-passwordInput" style={{paddingLeft:"0",paddingRight:"0"}}>
                                                            <div className="d-flex">
                                                                 <button className="vendor-crt-btn mt-0" 
                                                                 onClick={handleApiCredentialstokenGenAPI}
                                                                style={{padding:"9px 15px"}}
                                                                 ><i className="fa-solid fa-arrows-rotate"></i> Generate token</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                            
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="campaign-template border shadow-lg mb-5" style={{padding:"2px 0px 10px"}}>
                                            <h6
                                                className="campaign-temp-head w-100 justify-content-between d-flex align-items-center"
                                                onClick={ShowButtonDatas1}
                                                >
                                                <span>
                                                    <button className="bg-dark api-method" >POST</button>
                                                <span className="ms-2 darkGray"> /billing/list </span></span>
                                                <span className="setting-whatsapp-ternary icon-wrapper">
                                                    {/* Down icon when   is false */}
                                                    <i
                                                    className={`fa-solid fa-chevron-down chevron-icon ${
                                                        !showbuttons1 ? "show" : "hide"
                                                    }`}
                                                    ></i>

                                                    {/* Up icon when showbuttons1 is true */}
                                                    <i
                                                    className={`fa-solid fa-chevron-up chevron-icon ${
                                                        showbuttons1 ? "show" : "hide"
                                                    }`}
                                                    ></i>
                                                </span>
                                                </h6>
                                            <div className={`campaign-content-wrapper campaign-content-wrapper1 ${showbuttons1 ? 'show' : ''}`}>
                                                {showbuttons1 && (
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <div className="col-md-12 mb-2" style={{borderLeft: "3px solid #39cbe5",paddingLeft:"12px",marginLeft:"12px"}}>
                                                                    <strong className="darkGray">Parameters</strong>
                                                                </div>
                                                                <div className="col-md-6 mt-2" onClick={ShowButtonDatas2}>
                                                                    <div className="mt-3 mb-3" style={{borderLeft: "3px solid #39cbe5",paddingLeft:"11px"}}><strong className="darkGray">Keys & Values</strong></div>
                                                                </div>
                                                                <div className="col-md-6 mt-4 text-end"onClick={ShowButtonDatas2} >
                                                                        <strong ><span className="setting-whatsapp-ternary icon-wrapper">
                                                                            <i className={`fa-solid fa-chevron-down chevron-icon ${!showbuttons2 ? "show" : "hide"}`}></i>
                                                                            <i className={`fa-solid fa-chevron-up chevron-icon ${showbuttons2 ? "show" : "hide"}`}></i>
                                                                        </span></strong>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className={`campaign-clickbtn-wrapper campaign-content-wrapper2 ${showbuttons2 ? "show" : ""}`}>
                                                                        <textarea
                                                                        className="custom-textarea"
                                                                        value={JSON.stringify(postApi, null, 2)}
                                                                        ></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mt-2" onClick={ShowButtonDatas3}>
                                                                    <div className="mt-3 mb-3" style={{borderLeft: "3px solid #39cbe5",paddingLeft:"11px"}}><strong className="darkGray">Responses</strong></div>
                                                                </div>
                                                                <div className="col-md-6 mt-4 text-end"onClick={ShowButtonDatas3} >
                                                                        <strong ><span className="setting-whatsapp-ternary icon-wrapper">
                                                                            <i className={`fa-solid fa-chevron-down chevron-icon ${!showbuttons3 ? "show" : "hide"}`}></i>
                                                                            <i className={`fa-solid fa-chevron-up chevron-icon ${showbuttons3 ? "show" : "hide"}`}></i>
                                                                        </span></strong>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className={`campaign-clickbtn-wrapper campaign-content-wrapper2 ${showbuttons3 ? "show" : ""}`}>
                                                                        <textarea
                                                                        className="custom-textarea"
                                                                        value={JSON.stringify(postApi, null, 2)}
                                                                        ></textarea>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}
export default Api_Setup;