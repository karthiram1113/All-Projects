import API_EP_BOOK from "../endpoints";
import API from "../api";
const signupAPIEP = API_EP_BOOK.ADMINLOGIN;
const signupVendor = API_EP_BOOK.VENDORLOGIN;
const signoutAdmin =API_EP_BOOK.ADMINLOGOUT
const LoginAPI = {
  sAdminsignInAPI: function (apiData) {
    const requestAPIData={
      bodyData: apiData
    }
      
     const getResponse = API(signupAPIEP,requestAPIData);
    console.log("qqqqqq",apiData);
    
    return getResponse;
  },
   sAdminsignOutAPI: function (apiData) {
    const requestAPIData={
      bodyData: apiData
    }
      
     const getResponse = API(signoutAdmin,requestAPIData);
    console.log("endpoints",apiData);
    
    return getResponse;
  },
    vendorSignInAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    }; const getResponse = API(signupVendor, requestAPIData);
    console.log("endpoints",apiData);
    
    return getResponse;
  },
};

export default LoginAPI;