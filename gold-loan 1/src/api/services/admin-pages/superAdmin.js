import API_EP_BOOK from "../../endpoints";
import API, { baseURL } from "../../api";

const superAdminLoginAPI = API_EP_BOOK.SPRADMINLOGIN;
const superAdminRegister = API_EP_BOOK.SPRADMINREGISTER;
const customerDetailsList = API_EP_BOOK.CUSTOMER_DETAILS_LIST;
const customerdetailsCreate = API_EP_BOOK.CUSTOMER_DETAILS_CREATE;
const customerDetailsGet = API_EP_BOOK.CUSTOMER_DETAILS_GET;
const customerDetailsUpdate = API_EP_BOOK.CUSTOMER_DETAILS_EDIT;
const customerImageUpload = API_EP_BOOK.CUSTOMER_DETAILS_LIVE_IMAGE_INSERT;
const schoolUserImageUpload = API_EP_BOOK.SPRADMIN_SCL_USER_UPLAOD;
const customerDetailsDelete = API_EP_BOOK.CUSTOMER_DETAILS_DELETE;

const customerPhoneLogin = API_EP_BOOK.CUSTOMER_PHONE_LOGIN

const dayGoldList = API_EP_BOOK.CUSTOMER_DETAILS_GOLD_LIST

const customerClosedList = API_EP_BOOK.CUSTOMER_DETAILS_CLOSED_LIST

const customerCollectionDasboardList = API_EP_BOOK.CUSTOMER_DETAILS_DASHBOARD_LIST

const dashboardGoldSilverCreate = API_EP_BOOK.CUSTOMER_DETAILS_DASHBOARD_GOLD_SILVER_LIST
const dashboardGoldSilverGet = API_EP_BOOK.CUSTOMER_DETAILS_DASHBOARD_GOLD_SILVER_LIST_GET
const monthlyCollectionGraph = API_EP_BOOK.MONTHLY_COLLECTION_COUNT_GRAPH

const investorList = API_EP_BOOK.INVESTOR_LIST
const investorCreate = API_EP_BOOK.INVESTOR_CREATE
const investorUpadte = API_EP_BOOK.INVESTOR_EDIT
const investorDelete = API_EP_BOOK.INVESTOR_DELETE

const takenAmountList = API_EP_BOOK.TAKEN_AMOUNT_LIST
const takenAmountCreate = API_EP_BOOK.TAKEN_AMOUNT_CREATE
const takenDelete = API_EP_BOOK.TAKEN_AMOUNT_DELETE


const superAdminApis = {
  superAdminLoginAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(superAdminLoginAPI, requestAPIData);
  },

  superAdminRegisterAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(superAdminRegister, requestAPIData);
  },


  customerDetailsList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(customerDetailsList, requestAPIData);
  },

  customerdetailsCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(customerdetailsCreate, requestAPIData);
  },

  customerDetailsUpdateAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(customerDetailsUpdate, requestAPIData);
  },

  customerDetailsGet: function (schoolId) {
    const apiUrl = customerDetailsGet.url.replace(':id', schoolId);
    const requestAPIData = {
      url: apiUrl,
      method: customerDetailsGet.method,
      authorization: customerDetailsGet.authorization
    };
    return API(requestAPIData);
  },

  customerImageUpload: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(customerImageUpload, requestAPIData);
  },

  schoolUserUploadImageAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(schoolUserImageUpload, requestAPIData);
  },

  customerDetailsDeleteAPI: function (id) {
    const url = customerDetailsDelete.url.replace(':id', id);
    const requestAPIData = {
      url: url,
      method: customerDetailsDelete.method,
      authorization: customerDetailsDelete.authorization
    };
    return API(requestAPIData);
  },


  customerPhoneLoginAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(customerPhoneLogin, requestAPIData);
  },

   dayGoldListAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(dayGoldList, requestAPIData);
  },


  customerClosedListAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(customerClosedList, requestAPIData);
  },

   collectionDashboardListAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(customerCollectionDasboardList, requestAPIData);
  },

    dashboardDGoldListAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(dashboardGoldSilverCreate, requestAPIData);
  },
  dashboardDGoldGetAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(dashboardGoldSilverGet, requestAPIData);
  },

   monthlyCollectionGraphAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(monthlyCollectionGraph, requestAPIData);
  },

  // Investor

   investorList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(investorList, requestAPIData);
  },

  investorCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(investorCreate, requestAPIData);
  },

  investorUpdateAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(investorUpadte, requestAPIData);
  },

    investerDeleteAPI: function (id) {
    const url = investorDelete.url.replace(':id', id);
    const requestAPIData = {
      url: url,
      method: investorDelete.method,
      authorization: investorDelete.authorization
    };
    return API(requestAPIData);
  },

  takenAmountList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(takenAmountList, requestAPIData);
  },

  takenAmountCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    return API(takenAmountCreate, requestAPIData);
  },

    takenDeleteAPI: function (id) {
    const url = takenDelete.url.replace(':id', id);
    const requestAPIData = {
      url: url,
      method: takenDelete.method,
      authorization: takenDelete.authorization
    };
    return API(requestAPIData);
  },

};

export default superAdminApis;
