import API_EP_BOOK from "../endpoints";
import API from "../api";

const teamListAPIEP = API_EP_BOOK.TEAMLIST_API_EP;
const galleryAPIEP = API_EP_BOOK.GALLERYLIST_API_EP;
const projectAPIEP = API_EP_BOOK.PROJECTLIST_API_EP;

const contactCreateAPIEP = API_EP_BOOK.CONTACTCREATE_API_EP;

const UserAPI = {
    teamListAPI: function (apiData) {
      const requestAPIData = {
        bodyData: apiData
      }; const getResponse = API(teamListAPIEP, requestAPIData);
      return getResponse;
    },
    galleryAPIEP: function (apiData) {
      const requestAPIData = {
        bodyData: apiData
      }; const getResponse = API(galleryAPIEP, requestAPIData);
      return getResponse;
    },
    projectAPI: function (apiData) {
      const requestAPIData = {
        bodyData: apiData
      }; const getResponse = API(projectAPIEP, requestAPIData);
      return getResponse;
    },
    contactCreateAPI: function (apiData) {
      const requestAPIData = {
        bodyData: apiData
      }; const getResponse = API(contactCreateAPIEP, requestAPIData);
      return getResponse;
    },
}
export default UserAPI;
