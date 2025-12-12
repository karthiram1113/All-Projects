import API_EP_BOOK from "../endpoints";
import API from "../api";

const signinAPIEP = API_EP_BOOK.SIGNIN_API_EP;
console.log("first",signinAPIEP);
const LoginAPI = {
    signInAPI: function (apiData) {
      const requestAPIData = {
        bodyData: apiData
      }; const getResponse = API(signinAPIEP, requestAPIData);
      return getResponse;
    }

}
export default LoginAPI;
