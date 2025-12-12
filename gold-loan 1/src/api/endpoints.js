let endpoints = { 
    SUPERADMINLOGIN:"login",
    SUPERADMINREGISTER:"register",
    customerDetailsList :"customer_details/list" ,
    customerDetailsCreate :"customer_details/create",
    customerDetailsGET :"customer_details/get/:id",
    customerDetailsUpdate :"customer_details/update",
    customerLivPicInsert :"fileUpload/imageInsert",
    SCHOOLUSERIMAGEUPLAOD :"fileUpload/admin/insert",
    customerDelete :"customer_details/delete/:id",

    dayGoldRate :"customer_details/goldprice",
    phoneNumberLogin :"customer_details/phoneno",

    collectionList : "customer_details/closedlist",
    collectionDashboardCount :"customer_details/collectioncount",
    dashboardGoldSilver : "jewel_rate/create",
    dashboardGoldSilverGet :"jewel_rate/get",
    monthlyCollectionCountGraph :"customer_details/monthlycollectioncount",

    // Investor

    investorList : "investor_details/list",
    investorCreate : "investor_details/create" ,
    investorUpadte :"investor_details/update" ,
    investorDelete :"investor_details/delete/:id",

    takenAmountList :"investor_details/takenamountlist",
    takenAmountCrate : "investor_details/takenamountcreate",
    takenDelete : "investor_details/takenamountdelete/:id"

}

let API_EP_BOOK = {

        SPRADMINLOGIN: {
          url: endpoints.SUPERADMINLOGIN, method: 'POST', authorization: false  
        },
           SPRADMINREGISTER: {
          url: endpoints.SUPERADMINREGISTER, method: 'POST', authorization: false  
        },

        CUSTOMER_DETAILS_LIST: {
		url: endpoints.customerDetailsList, method: 'POST', authorization: true
	},
    CUSTOMER_DETAILS_CREATE: {
		url: endpoints.customerDetailsCreate, method: 'POST', authorization: true
	},
   CUSTOMER_DETAILS_GET: {
		url: endpoints.customerDetailsGET, method: 'GET', authorization: true
	},
    CUSTOMER_DETAILS_EDIT: {
		url: endpoints.customerDetailsUpdate, method: 'PUT', authorization: true
	},
  CUSTOMER_DETAILS_LIVE_IMAGE_INSERT: {
		url: endpoints.customerLivPicInsert, method: 'POST', authorization: true
	},
  SPRADMIN_SCL_USER_UPLAOD: {
		url: endpoints.SCHOOLUSERIMAGEUPLAOD, method: 'POST', authorization: true
	},
  CUSTOMER_DETAILS_DELETE: {
		url: endpoints.customerDelete, method: 'DELETE', authorization: true
	},
   


         CUSTOMER_DETAILS_GOLD_LIST: {
		url: endpoints.dayGoldRate, method: 'POST', authorization: true
	},

      CUSTOMER_PHONE_LOGIN: {
          url: endpoints.phoneNumberLogin, method: 'POST', authorization: true  
        },

               CUSTOMER_DETAILS_CLOSED_LIST: {
		url: endpoints.collectionList, method: 'POST', authorization: true
	},
               CUSTOMER_DETAILS_DASHBOARD_LIST: {
		url: endpoints.collectionDashboardCount, method: 'GET', authorization: true
	},
 CUSTOMER_DETAILS_DASHBOARD_GOLD_SILVER_LIST: {
		url: endpoints.dashboardGoldSilver, method: 'POST', authorization: true
	},
  CUSTOMER_DETAILS_DASHBOARD_GOLD_SILVER_LIST_GET: {
		url: endpoints.dashboardGoldSilverGet, method: 'POST', authorization: true
	},
    MONTHLY_COLLECTION_COUNT_GRAPH: {
		url: endpoints.monthlyCollectionCountGraph, method: 'GET', authorization: true
	},

  // Investor

      INVESTOR_LIST: {
		url: endpoints.investorList, method: 'POST', authorization: true
	},
    INVESTOR_CREATE: {
		url: endpoints.investorCreate, method: 'POST', authorization: true
	},
   INVESTOR_GET: {
		url: endpoints.investorGET, method: 'GET', authorization: true
	},
    INVESTOR_EDIT: {
		url: endpoints.investorUpadte, method: 'PUT', authorization: true
	},
    INVESTOR_DELETE: {
		url: endpoints.investorDelete, method: 'DELETE', authorization: true
	},

    TAKEN_AMOUNT_CREATE: {
		url: endpoints.takenAmountCrate, method: 'POST', authorization: true
	},
   TAKEN_AMOUNT_LIST: {
		url: endpoints.takenAmountList, method: 'POST', authorization: true
	},
   TAKEN_AMOUNT_DELETE: {
		url: endpoints.takenDelete, method: 'DELETE', authorization: true
	},

}

export default API_EP_BOOK;