let endpoints = {
	//Admin
	ADMINSlOGIN: 'login/admin',
    adminSignOut:"logout",
	adminProductList: "admin/productlist",
	adminOrderList:"order/adminlist",
    adminOrderGet:"admin/getproduct/:id",
	adminorderget:"order/getadmin/:id",
	adminvendorlist:"vendor/list",
	adminvendorget:"vendor/get/:id",
	adminvendorupdate:"admin/updatevendor",
	adminvendordelete:"vendor/delete/:id",
	adminclientlist:"client/list",
	adminclientdelete:"client/delete/:id",
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
	ADMINLOGOUT: {
		url: endpoints.adminSignOut, method: 'GET',authorization: true
	},
	ADMINLOGIN: {
		url: endpoints.ADMINSlOGIN, method: 'POST',authorization: false
	},
	ADMINPRODUCTLIST: {
		url: endpoints.adminProductList, method: 'POST',authorization: false
	},
	ADMINORDRLIST: {
		url: endpoints.adminOrderList, method: 'POST',authorization: false
	},
	ADMINPRODUCTGET: {
		url: endpoints.adminOrderGet, method: 'GET',authorization: false
	},
	ADMINORDERGET: {
		url: endpoints.adminorderget, method: 'GET',authorization: false
	},
	ADMINVENDORLIST: {
		url: endpoints.adminvendorlist, method: 'POST',authorization: false
	},
	ADMINVENDORGET: {
		url: endpoints.adminvendorget, method: 'GET',authorization: false
	},
	ADMINVENDORUPDATE: {
		url: endpoints.adminvendorupdate, method: 'POST',authorization: false
	},
	ADMINVENDORDELETE: {
		url: endpoints.adminvendordelete, method: 'DELETE',authorization: false
	},
	ADMINCLIENTLIST: {
		url: endpoints.adminclientlist, method: 'POST',authorization: false
	},
	ADMINCLIENTDELETE: {
		url: endpoints.adminclientdelete, method: 'DELETE',authorization: false
	},
	ADMINCLIENTGET: {
		url: endpoints.adminclientget, method: 'GET',authorization: false
	},
	ADMINCLIENTUPDATE: {
		url: endpoints.adminclientupdate, method: 'POST',authorization: false
	},
	ADMINSHOPLIST: {
		url: endpoints.adminshoplist, method: 'POST',authorization: false
	},
	ADMINSHOPCREATE: {
		url: endpoints.adminshopcreate, method: 'POST',authorization: false
	},
	ADMINSHOPDELETE: {
		url: endpoints.adminshopdelete, method: 'DELETE',authorization: false
	},
	ADMINSHOPGET: {
		url: endpoints.adminshopget, method: 'GET',authorization: true
	},
	ADMINSHOPUPDATE: {
		url: endpoints.adminshopupdate, method: 'PUT',authorization: true
	},
	ADMINUSERLIST: {
		url: endpoints.adminuserlist, method: 'POST',authorization: false
	},
	ADMINUSERDELETE: {
		url: endpoints.adminuserdelete, method: 'DELETE',authorization: false
	},
	ADMINUSERCREATE: {
		url: endpoints.adminusercreate, method: 'POST',authorization: false
	},
	ADMINUSERVIEW: {
		url: endpoints.adminuserview, method: 'GET',authorization: true
	},
	ADMINUSEREDIT: {
		url: endpoints.adminuseredit, method: 'POST',authorization: false
	},
	ADMINSETTINGLIST: {
		url: endpoints.adminsettinglist, method: 'POST',authorization: false
	},
	ADMINSETTINGUPDATE: {
		url: endpoints.adminsettingupdate, method: 'POST',authorization: false
	},
	ADMINREPORT: {
		url: endpoints.adminreport, method: 'POST',authorization: false
	},



	//vendor
	VENDORLOGIN: {
		url: endpoints.VENDORLOGIN, method: 'POST',authorization: false
	},
	VENDORORDERLIST: {
		url: endpoints.vendorOrderList, method: 'POST',authorization: false
	},
	VENDORORDERVIEW: {
		url: endpoints.vendorOrderview, method: 'GET',authorization: true
	},
	VENDORORDERSTATUS: {
		url: endpoints.vendorOrderstatus, method: 'PUT',authorization: true
	},
	VENDORLIST: {
		url: endpoints.vendorList, method: 'POST',authorization: false
	},
	VENDORORDERDELETE: {
		url: endpoints.vendordelete, method: 'DELETE',authorization: false
	},
	VENDORCREATE: {
		url: endpoints.vendorCreate, method: 'POST',authorization: false
	},
	VENDORVIEW: {
		url: endpoints.vendorView, method: 'GET',authorization: true
	},
	VENDORUPDATE: {
		url: endpoints.vendorUpdate, method: 'POST',authorization: false
	},
	VENDORCATEGORYLIST: {
		url: endpoints.vendorCategorylist, method: 'POST',authorization: false
	},
	VENDORCATEGORYCREATE: {
		url: endpoints.vendorCategoryCreate, method: 'POST',authorization: false
	},
	VENDORCATEGORYVIEW: {
		url: endpoints.vendorCategoryView, method: 'GET',authorization: true
	},
	VENDORCATEGORYDELETE: {
		url: endpoints.vendorCategorydelete, method: 'DELETE',authorization: false
	},
	VENDORCATEGORYUPDATE: {
		url: endpoints.vendorCategoryUpdate, method: 'PUT',authorization: true
	},
	VENDORREPORT: {
		url: endpoints.vendorReport, method: 'POST',authorization: false
	},
}
export default API_EP_BOOK