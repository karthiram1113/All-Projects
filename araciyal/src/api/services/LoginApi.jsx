import API_EP_BOOK from "../endpoints";
import API from "../api";

const signinAPIEP = API_EP_BOOK.SIGNIN_API_EP;
const signOutAPIEP = API_EP_BOOK.SIGNOUT_API_EP;
const TncreateAPIEP=API_EP_BOOK.TAMILNADUCREATE_API_EP
const Sub_cate_dropdown=API_EP_BOOK.Sub_deropdown_API_EPP
const Spec_dropdown=API_EP_BOOK.SpecificationList_API_EPP
const tnget=API_EP_BOOK.TAMILNADUGET_API_EPP



console.log("login",signinAPIEP);

const LoginAPI = {
  
    signInAPI: function (apiData) {;
      const requestAPIData = {
        bodyData: apiData
      }; const getResponse = API(signinAPIEP, requestAPIData);
      return getResponse;
    },
  signOutAPI: async function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    try {
      const response = await API(signOutAPIEP, requestAPIData);
      console.log("Logout Success:", response);
      return response;
    } catch (err) {
      console.error("Logout Error:", err);
      throw err;
    }
  },
  tncreate:async function(apiData){
    const requestAPIData = {
      bodyData: apiData
    };
    try {
      const response = await API(TncreateAPIEP, requestAPIData);
      console.log("CREATE", response);
      return response;
    } catch (err) {
      console.error("Logout Error:", err);
      throw err;
    }
   },
   dropdown:async function(apiData){
    const requestAPIData = {
      bodyData: {apiData,category_id: "1"}
    };
    try {
      const response = await API(Sub_cate_dropdown, requestAPIData);
      console.log("dropdown", response);
      return response;
    } catch (err) {
      console.error("Logout Error:", err);
      throw err;
    }
   },
   Spec_dropdown:async function(apiData){
    const requestAPIData = {
      bodyData: {apiData,pageIndex: "0",dataLength: "10"}
    };
    try {
      const response = await API(Spec_dropdown, requestAPIData);
      // console.log("dropdown", response);
      return response;
    } catch (err) {
      console.error("Logout Error:", err);
      throw err;
    }
   },
   TNgetid:async function(id){
    const requestAPIData = {
    };
    console.log("get by news id");
    
    try {
      const response = await API(tnget, requestAPIData);
      console.log("get by id", response);
      return response;
    } catch (err) {
      console.error("Logout Error:", err);
      throw err;
    }
   },

}

export default LoginAPI;


