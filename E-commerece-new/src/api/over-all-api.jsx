import API_EP_BOOK from "./endpoints";
import API from "./api";
const adminProductList = API_EP_BOOK.ADMINPRODUCTLIST;
const adminOrderList = API_EP_BOOK.ADMINORDRLIST;
const adminProductGet = API_EP_BOOK.ADMINPRODUCTGET;
const adminOrderGet = API_EP_BOOK.ADMINORDERGET;
const adminVendorCreate = API_EP_BOOK.ADMINVENDORCREATE;
const adminVendorGet = API_EP_BOOK.ADMINVENDORGET;
const adminVendorUpdate = API_EP_BOOK.ADMINVENDORUPDATE;
const adminClientList = API_EP_BOOK.ADMINCLIENTLIST;
const adminClientDelete = API_EP_BOOK.ADMINCLIENTDELETE;
const adminClientGet = API_EP_BOOK.ADMINCLIENTGET;
const adminClientUpdate = API_EP_BOOK.ADMINCLIENTUPDATE;
const adminShopList = API_EP_BOOK.ADMINSHOPLIST;
const adminShopCreate = API_EP_BOOK.ADMINSHOPCREATE;
const adminShopDelete = API_EP_BOOK.ADMINSHOPDELETE;
const adminShopGet = API_EP_BOOK.ADMINSHOPGET;
const adminShopUpdate = API_EP_BOOK.ADMINSHOPUPDATE;
const adminUserList = API_EP_BOOK.ADMINUSERLIST;
const adminUserDelete = API_EP_BOOK.ADMINUSERDELETE;
const adminUserCreate = API_EP_BOOK.ADMINUSERCREATE;
const adminUserView = API_EP_BOOK.ADMINUSERVIEW;
const adminUserEdit = API_EP_BOOK.ADMINUSEREDIT;
const adminSettingList = API_EP_BOOK.ADMINSETTINGLIST;
const adminSettingUpdate = API_EP_BOOK.ADMINSETTINGUPDATE;
const adminReport = API_EP_BOOK.ADMINREPORT;
const signupVendor = API_EP_BOOK.VENDORLOGIN;


//login
const signupAPIEP = API_EP_BOOK.ADMINLOGIN;
const signoutAdmin = API_EP_BOOK.ADMINLOGOUT

// super Admin
const adminVendorList = API_EP_BOOK.ADMINVENDORLIST;
const adminVendorDelete = API_EP_BOOK.ADMINVENDORDELETE;


//monthly report
const vendorReport = API_EP_BOOK.VENDORREPORT;






const OVERALLAPI = {


  //login
  sAdminsignInAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    }

    const getResponse = API(signupAPIEP, requestAPIData);
    console.log("qqqqqq", apiData);

    return getResponse;
  },
  sAdminsignOutAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    }

    const getResponse = API(signoutAdmin, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },
  vendorSignInAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    }; const getResponse = API(signupVendor, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },

  //admin
  adminProductList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminProductList, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },
  adminProductGet: function (id) {
    const url = adminProductGet.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: adminProductGet.method,
      authorization: adminProductGet.authorization,
    };

    return API(requestAPIData);
  },
  adminOrderGet: function (id) {
    const url = adminOrderGet.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: adminOrderGet.method,
      authorization: adminOrderGet.authorization,
    };

    return API(requestAPIData);
  },
  adminVendorGet: function (id) {
    const url = adminVendorGet.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: adminVendorGet.method,
      authorization: adminVendorGet.authorization,
    };

    return API(requestAPIData);
  },
  adminVendorUpdate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminVendorUpdate, requestAPIData);
    return getResponse;
  },

  adminOrderList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminOrderList, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },
  adminVendorList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminVendorList, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },
  adminVendorCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(adminVendorCreate, requestAPIData);
    return getResponse;
  },
  adminVendorDelete: function (staffId) {
    const apiUrl = adminVendorDelete.url.replace(":id", staffId);
    const requestAPIData = {
      url: apiUrl,
      method: adminVendorDelete.method,
      authorization: adminVendorDelete.authorization,
    };
    return API(requestAPIData);
  },
  adminClientList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminClientList, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },
  adminClientDelete: function (deleteId) {
    const apiUrl = adminClientDelete.url.replace(":id", deleteId);
    const requestAPIData = {
      url: apiUrl,
      method: adminClientDelete.method,
      authorization: adminClientDelete.authorization,
    };
    return API(requestAPIData);
  },
  adminClientGet: function (clientId) {
    const url = adminClientGet.url.replace(":id", clientId);
    const requestAPIData = {
      url: url,
      method: adminClientGet.method,
      authorization: adminClientGet.authorization,
    };

    return API(requestAPIData);
  },
  adminClientUpdate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminClientUpdate, requestAPIData);
    return getResponse;
  },
  adminShopList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminShopList, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },
   adminShopCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(adminShopCreate, requestAPIData);
    return getResponse;
  },
   adminShopDelete: function (deleteId) {
    const apiUrl = adminShopDelete.url.replace(":id", deleteId);
    const requestAPIData = {
      url: apiUrl,
      method: adminShopDelete.method,
      authorization: adminShopDelete.authorization,
    };
    return API(requestAPIData);
  },
   adminShopGet: function (shopId) {
    const url = adminShopGet.url.replace(":id", shopId);
    const requestAPIData = {
      url: url,
      method: adminShopGet.method,
      authorization: adminShopGet.authorization,
    };

    return API(requestAPIData);
  },
  adminShopView: function (vendorId) {
    const url = adminShopGet.url.replace(":id", vendorId);
    const requestAPIData = {
      url: url,
      method: adminShopGet.method,
      authorization: adminShopGet.authorization,
    };

    return API(requestAPIData);
  },
  adminShopUpdate: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(adminShopUpdate, requestAPIData);
        return getResponse;
    },
     adminUserList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminUserList, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },
  adminUserDelete: function (deleteId) {
    const apiUrl = adminUserDelete.url.replace(":id", deleteId);
    const requestAPIData = {
      url: apiUrl,
      method: adminUserDelete.method,
      authorization: adminUserDelete.authorization,
    };
    return API(requestAPIData);
  },
   adminUserCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminUserCreate, requestAPIData);
    return getResponse;
  },
  adminUserView: function (vendorId) {
    const url = adminUserView.url.replace(":id", vendorId);
    const requestAPIData = {
      url: url,
      method: adminUserView.method,
      authorization: adminUserView.authorization,
    };

    return API(requestAPIData);
  },
  adminUserGet: function (userId) {
    const url = adminUserView.url.replace(":id", userId);
    const requestAPIData = {
      url: url,
      method: adminUserView.method,
      authorization: adminUserView.authorization,
    };

    return API(requestAPIData);
  },
   adminUserEdit: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(adminUserEdit, requestAPIData);
        return getResponse;
    },
     adminSettingList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminSettingList, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },
    adminSettingUpdate: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(adminSettingUpdate, requestAPIData);
        return getResponse;
    },
    adminReports: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(adminReport, requestAPIData);
    // console.log("endpoints", apiData);

    return getResponse;
  },

  //monthly report
  vendorMonthlyReport: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    }; const getResponse = API(vendorReport, requestAPIData);
    return getResponse;
  },
};

export default OVERALLAPI;
