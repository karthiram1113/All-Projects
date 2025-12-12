let endpoints = {

	ADMINSlOGIN: 'login',
	adminSignOut:"logout",
	//SuperAdmin
	adminvendorlist: "vendor/list",
	adminvendordelete: "vendor/delete/:id",
	adminvendorget: "vendor/activation/:id",
	adminclientlist: "client/list",
	adminclientdelete: "client/delete/:id",


	adminProductList: "admin/productlist",
	adminOrderList:"order/adminlist",
    adminOrderGet:"admin/getproduct/:id",
	adminorderget:"order/getadmin/:id",
	adminVendorcreate: "/vendor/create",
	adminvendorupdate:"admin/updatevendor",
	adminclientget:"client/get/:id",
	adminclientupdate:"admin/updateclient",
	adminshoplist:"shoptype/list",
	adminshopcreate:"shoptype/create",
	adminshopdelete:"shoptype/delete/:id",
	adminshopget:"shoptype/get/:id",
	adminshopupdate:"shoptype/update",
	adminuserlist:"admin/list",
	adminuserdelete:"admin/delete/:id",
	adminusercreate:"admin/create",
	adminuserview:"admin/get/:id",
	adminuseredit:"admin/updateadmin",
	adminsettinglist:"systemInfo/list",
	adminsettingupdate:"systemInfo/update",
	adminreport:"report/Adminmonthlyreport",


















	//vendor
	VENDORLOGIN:'login/vendor',
	vendorOrderList:'order/vendorlist',
	vendorOrderview:'order/getvendor/:id',
	vendorOrderstatus:"vendor/statusupdate",
	vendordelete:'vendor/delete/:id',
	vendorList:'vendor/list',
	vendorCreate:'vendor/create',
	vendorView:'vendor/get/:id',
	vendorUpdate:'vendor/update',
	vendorCategorylist:'category/list',
	vendorCategoryCreate:'category/create',
	vendorCategoryView:'category/get/:id',
	vendorCategorydelete:'category/delete/:id',
	vendorCategoryUpdate:'category/update',
	vendorReport:'report/monthlyreport',




	









}

let API_EP_BOOK = {
	//admin
	ADMINLOGIN: {
		url: endpoints.ADMINSlOGIN, method: 'POST', authorization: false
	},
	ADMINLOGOUT: {
		url: endpoints.adminSignOut, method: 'GET',authorization: true
	},
	ADMINPRODUCTLIST: {
		url: endpoints.adminProductList, method: 'POST',authorization: true
	},
	ADMINORDRLIST: {
		url: endpoints.adminOrderList, method: 'POST',authorization: true
	},
	ADMINPRODUCTGET: {
		url: endpoints.adminOrderGet, method: 'GET',authorization: true
	},
	ADMINORDERGET: {
		url: endpoints.adminorderget, method: 'GET',authorization: true
	},
	ADMINVENDORLIST: {
		url: endpoints.adminvendorlist, method: 'POST',authorization: true
	},
	ADMINVENDORCREATE: {
		url: endpoints.adminVendorcreate, method: 'POST', authorization: true
	},
	ADMINVENDORGET: {
		url: endpoints.adminvendorget, method: 'GET',authorization: true
	},
	ADMINVENDORUPDATE: {
		url: endpoints.adminvendorupdate, method: 'POST',authorization: true
	},
	ADMINVENDORDELETE: {
		url: endpoints.adminvendordelete, method: 'DELETE',authorization: true
	},
	ADMINCLIENTLIST: {
		url: endpoints.adminclientlist, method: 'POST',authorization: true
	},
	ADMINCLIENTDELETE: {
		url: endpoints.adminclientdelete, method: 'DELETE',authorization: true
	},
	ADMINCLIENTGET: {
		url: endpoints.adminclientget, method: 'GET',authorization: true
	},
	ADMINCLIENTUPDATE: {
		url: endpoints.adminclientupdate, method: 'POST',authorization: true
	},
	ADMINSHOPLIST: {
		url: endpoints.adminshoplist, method: 'POST',authorization: true
	},
	ADMINSHOPCREATE: {
		url: endpoints.adminshopcreate, method: 'POST',authorization: true
	},
	ADMINSHOPDELETE: {
		url: endpoints.adminshopdelete, method: 'DELETE',authorization: true
	},
	ADMINSHOPGET: {
		url: endpoints.adminshopget, method: 'GET',authorization: true
	},
	ADMINSHOPUPDATE: {
		url: endpoints.adminshopupdate, method: 'PUT',authorization: true
	},
	ADMINUSERLIST: {
		url: endpoints.adminuserlist, method: 'POST',authorization: true
	},
	ADMINUSERDELETE: {
		url: endpoints.adminuserdelete, method: 'DELETE',authorization: true
	},
	ADMINUSERCREATE: {
		url: endpoints.adminusercreate, method: 'POST',authorization: true
	},
	ADMINUSERVIEW: {
		url: endpoints.adminuserview, method: 'GET',authorization: true
	},
	ADMINUSEREDIT: {
		url: endpoints.adminuseredit, method: 'POST',authorization: true
	},
	ADMINSETTINGLIST: {
		url: endpoints.adminsettinglist, method: 'POST',authorization: true
	},
	ADMINSETTINGUPDATE: {
		url: endpoints.adminsettingupdate, method: 'POST',authorization: true
	},
	ADMINREPORT: {
		url: endpoints.adminreport, method: 'POST',authorization: true
	},



	//vendor
	VENDORLOGIN: {
		url: endpoints.VENDORLOGIN, method: 'POST',authorization: false
	},
	VENDORORDERLIST: {
		url: endpoints.vendorOrderList, method: 'POST',authorization: true
	},
	VENDORORDERVIEW: {
		url: endpoints.vendorOrderview, method: 'GET',authorization: true
	},
	VENDORORDERSTATUS: {
		url: endpoints.vendorOrderstatus, method: 'PUT',authorization: true
	},
	VENDORLIST: {
		url: endpoints.vendorList, method: 'POST',authorization: true
	},
	VENDORORDERDELETE: {
		url: endpoints.vendordelete, method: 'DELETE',authorization: true
	},
	VENDORCREATE: {
		url: endpoints.vendorCreate, method: 'POST',authorization: true
	},
	VENDORVIEW: {
		url: endpoints.vendorView, method: 'GET',authorization: true
	},
	VENDORUPDATE: {
		url: endpoints.vendorUpdate, method: 'POST',authorization: true
	},
	VENDORCATEGORYLIST: {
		url: endpoints.vendorCategorylist, method: 'POST',authorization: true
	},
	VENDORCATEGORYCREATE: {
		url: endpoints.vendorCategoryCreate, method: 'POST',authorization: true
	},
	VENDORCATEGORYVIEW: {
		url: endpoints.vendorCategoryView, method: 'GET',authorization: true
	},
	VENDORCATEGORYDELETE: {
		url: endpoints.vendorCategorydelete, method: 'DELETE',authorization: true
	},
	VENDORCATEGORYUPDATE: {
		url: endpoints.vendorCategoryUpdate, method: 'PUT',authorization: true
	},
	VENDORREPORT: {
		url: endpoints.vendorReport, method: 'POST',authorization: true
	},
}
export default API_EP_BOOK