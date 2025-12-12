import API_EP_BOOK from "../../endpoints";
import API from "../../api";

const vendorOrderList = API_EP_BOOK.VENDORORDERLIST;
const vendorOrderView = API_EP_BOOK.VENDORORDERVIEW;
const vendorOrderStatus = API_EP_BOOK.VENDORORDERSTATUS;
const vendorList = API_EP_BOOK.VENDORLIST;
const vendorOrderDelete = API_EP_BOOK.VENDORORDERDELETE;
const vendorOrderCreate = API_EP_BOOK.VENDORCREATE;
const vendorView = API_EP_BOOK.VENDORVIEW;
const vendorUpdate = API_EP_BOOK.VENDORUPDATE;
const vendorCategoryList = API_EP_BOOK.VENDORCATEGORYLIST;
const vendorCategoryCreate = API_EP_BOOK.VENDORCATEGORYCREATE;
const vendorCategoryView = API_EP_BOOK.VENDORCATEGORYVIEW;
const vendorCategoryDelete = API_EP_BOOK.VENDORCATEGORYDELETE;
const vendorCategoryUpdate = API_EP_BOOK.VENDORCATEGORYUPDATE;
const vendorReport = API_EP_BOOK.VENDORREPORT;
























const VENDORAPI = {
  //vendor
  vendorOrderList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(vendorOrderList, requestAPIData);
    console.log("endpoints", apiData);

    return getResponse;
  },
   vendorOrderView: function (vendorId) {
      const url = vendorOrderView.url.replace(":id", vendorId);
      const requestAPIData = {
        url: url,
        method: vendorOrderView.method,
        authorization: vendorOrderView.authorization,
      };
  
      return API(requestAPIData);
    },
     vendorOrderStatus: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(vendorOrderStatus, requestAPIData);
        return getResponse;
    },
     vendorList: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(vendorList, requestAPIData);
        return getResponse;
    },
    vendorOrderDelete: function (deleteId) {
    const apiUrl = vendorOrderDelete.url.replace(":id", deleteId);
    const requestAPIData = {
      url: apiUrl,
      method: vendorOrderDelete.method,
      authorization: vendorOrderDelete.authorization,
    };
    return API(requestAPIData);
  },
   vendorOrderCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(vendorOrderCreate, requestAPIData);
    return getResponse;
  },
  vendorView: function (vendorId) {
      const url = vendorView.url.replace(":id", vendorId);
      const requestAPIData = {
        url: url,
        method: vendorView.method,
        authorization: vendorView.authorization,
      };
  
      return API(requestAPIData);
    },
     vendorGet: function (vendorId) {
      const url = vendorView.url.replace(":id", vendorId);
      const requestAPIData = {
        url: url,
        method: vendorView.method,
        authorization: vendorView.authorization,
      };
  
      return API(requestAPIData);
    },
    vendorUpdate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(vendorUpdate, requestAPIData);
    console.log("endpoints", apiData);

    return getResponse;
  },
   vendorCategoryList: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(vendorCategoryList, requestAPIData);
        return getResponse;
    },
     vendorCategoryCreate: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(vendorCategoryCreate, requestAPIData);
        return getResponse;
    },
     vendorCategoryView: function (id) {
      const url = vendorCategoryView.url.replace(":id", id);
      const requestAPIData = {
        url: url,
        method: vendorCategoryView.method,
        authorization: vendorCategoryView.authorization,
      };
  
      return API(requestAPIData);
    },
    vendorCategoryDelete: function (deleteId) {
    const apiUrl = vendorCategoryDelete.url.replace(":id", deleteId);
    const requestAPIData = {
      url: apiUrl,
      method: vendorCategoryDelete.method,
      authorization: vendorCategoryDelete.authorization,
    };
    return API(requestAPIData);
  },
  vendorCategoryUpdate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(vendorCategoryUpdate, requestAPIData);
    console.log("endpoints", apiData);

    return getResponse;
  },
  vendorMonthlyReport: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(vendorReport, requestAPIData);
        return getResponse;
    },

};

export default VENDORAPI;
