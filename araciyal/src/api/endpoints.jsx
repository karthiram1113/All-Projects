let endpoints = {

    productLogin:"login",
    logout:"logout",
    tamilnadulist:"news/list",
    tamilnaduCreate:"news/create",
    tamilnaduGet:"news/get/:id",
    tamilnaduUpdate:"news/update",
    tamilnaduDelete:"news/delete/",
    Sub_deropdown:"subcategory/dropdownsubcategory",
    specificationList:"speciality/list",


}

let API_EP_BOOK = {
    SIGNIN_API_EP : {
        url: endpoints.productLogin, method: 'POST', authorization: true 
    },
    SIGNOUT_API_EP : {
        url: endpoints.logout, method: 'GET', authorization: true
    },
    TAMILNADU_API_EP : {
        url: endpoints.tamilnadulist, method: 'POST', authorization: true
    },
    TAMILNADUCREATE_API_EP : {
        url: endpoints.tamilnaduCreate, method: 'POST', authorization: true
    },
    TAMILNADUGET_API_EPP : {
        url: endpoints.tamilnaduGet, method: 'GET', authorization: true
    },
    TAMILNADUUPDATE_API_EPP : {
        url: endpoints.tamilnaduUpdate, method: 'POST', authorization: true
    },
    TAMILNADUDELETE_API_EPP : {
        url: endpoints.tamilnaduDelete, method: 'POST', authorization: true
    },
    Sub_deropdown_API_EPP : {
        url: endpoints.Sub_deropdown, method: 'POST', authorization: true
    },
    SpecificationList_API_EPP : {
        url: endpoints.specificationList, method: 'POST', authorization: true
    },
}
export default API_EP_BOOK;