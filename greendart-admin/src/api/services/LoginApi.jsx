import API_EP_BOOK from "../endpoints";
import API from "../api";

const signinAPIEP = API_EP_BOOK.SIGNIN_API_EP;

const projectlist = API_EP_BOOK.PROJECTLIST_API_EP;
const projectbanner = API_EP_BOOK.PROJECTBANNER_API_EP;
const projectimg = API_EP_BOOK.PROJECTIMG_API_EP;
const projectcreate = API_EP_BOOK.PROJECTCREATE_API_EP;
const projectget = API_EP_BOOK.PROJECTGET_API_EP;
const projectdelete = API_EP_BOOK.PROJECTDELETE_API_EP;
const projectstatus = API_EP_BOOK.PROJECTSTATUS_API_EP;
const projectedit = API_EP_BOOK.PROJECTEDIT_API_EP;

// ABOUT API ENDPOINTS

const aboutBannerAPIEP = API_EP_BOOK.ABOUTBANNER_API_EP;
const gallerySingleBannerAPIEP = API_EP_BOOK.GALLERYSINGLEBANNER_API_EP;
const aboutCreateAPIEP = API_EP_BOOK.ABOUTCREATE_API_EP;
const aboutListAPIEP = API_EP_BOOK.ABOUTLIST_API_EP;
const aboutSingleBannerAPIEP = API_EP_BOOK.ABOUTSINGLEBANNER_API_EP;
const aboutGetAPIEP = API_EP_BOOK.ABOUTGET_API_EP;
const aboutDeleteAPIEP = API_EP_BOOK.ABOUTDELETE_API_EP;
const aboutUpdateAPIEP = API_EP_BOOK.ABOUTUPDATE_API_EP;
const aboutActiveStatus = API_EP_BOOK.ABOUTSTATUS_API_EP;

//GALLERY API ENDPOINTS

const galleryBannerAPIEP = API_EP_BOOK.GALLERYBANNER_API_EP;
const galleryListAPIEP = API_EP_BOOK.GALLERYLIST_API_EP;
const galleryCreateAPIEP = API_EP_BOOK.GALLERYCREATE_API_EP;
const galleryGetAPIEP = API_EP_BOOK.GALLERYGET_API_EP;
const galleryDeleteAPIEP = API_EP_BOOK.GALLERYDELETE_API_EP;
const galleryStatusAPIEP = API_EP_BOOK.GALLERSTATUS_API_EP;
const galleryUpdateAPIEP = API_EP_BOOK.GALLERYUPDATE_API_EP;

//CONTACT API ENDPOINTS

const contactListAPIEP = API_EP_BOOK.CONTACTLIST_API_EP;
const contactGetAPIEP = API_EP_BOOK.CONTACTGET_API_EP;
const contactDeleteAPIEP = API_EP_BOOK.CONTACTDELETE_API_EP;

//OUR TEAM API ENDPOINTS
const teamBannerAPIEP = API_EP_BOOK.TEAMBANNER_API_EP;
const teamSingleBannerAPIEP = API_EP_BOOK.TEAMSINGLEBANNER_API_EP;
const teamListAPIEP = API_EP_BOOK.TEAMLIST_API_EP;
const teamGetAPIEP = API_EP_BOOK.TEAMGET_API_EP;
const teamCreateAPIEP = API_EP_BOOK.TEAMCREATE_API_EP;
const teamDeleteAPIEP = API_EP_BOOK.TEAMDELETE_API_EP;
const teamStatusAPIEP = API_EP_BOOK.TEAMSTATUS_API_EP;
const teamUpdateAPIEP = API_EP_BOOK.TEAMUPDATE_API_EP;


const dashcountAPIEP = API_EP_BOOK.COUNT_API_EP


//HOME API ENDPOINTS

const homeBannerAPIEP = API_EP_BOOK.HOME_API_EP
const homeListAPIEP = API_EP_BOOK.HOMELIST_API_EP
const homeDeleteAPIEP = API_EP_BOOK.HOMEDELETE_API_EP

console.log("first", signinAPIEP);

const LoginAPI = {
  signInAPI: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(signinAPIEP, requestAPIData);
    return getResponse;
  },

  // PROJECT API METHODS

  projectlist: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(projectlist, requestAPIData);
    return getResponse;
  },

  projectbanner: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(projectbanner, requestAPIData);
    return getResponse;
  },

  projectimg: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(projectimg, requestAPIData);
    return getResponse;
  },

  projectcreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(projectcreate, requestAPIData);
    return getResponse;
  },

  projectget: function (id) {
    const url = projectget.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: projectget.method,
      authorization: projectget.authorization,
    };
    return API(requestAPIData);
  },

  projectdelete: function (id) {
    const url = projectdelete.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: projectdelete.method,
      authorization: projectdelete.authorization,
    };
    return API(requestAPIData);
  },

  projectstatus: function (id) {
    const url = projectstatus.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: projectstatus.method,
      authorization: projectstatus.authorization,
    };
    return API(requestAPIData);
  },

  projectedit: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(projectedit, requestAPIData);
    return getResponse;
  },

  // PROJECT API METHODS END


  // ABOUT API METHODS
    aboutBanner: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(aboutBannerAPIEP, requestAPIData);
    return getResponse;
  },

  aboutSingleBanner: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(aboutSingleBannerAPIEP, requestAPIData);
    return getResponse;
  },

  aboutCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(aboutCreateAPIEP, requestAPIData);
    return getResponse;
  },

  aboutList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(aboutListAPIEP, requestAPIData);
    return getResponse;
  },

  aboutGet: function (id) {
    
    const url = aboutGetAPIEP.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: aboutGetAPIEP.method,
      authorization: aboutGetAPIEP.authorization,
    }
    return API(requestAPIData);
  },

  aboutActiveStatus: function (id) {
    const url = aboutActiveStatus.url.replace(':id', id)
    const requestAPIData = {
      url: url,
      method: aboutActiveStatus.method,
      authorization: aboutActiveStatus.authorization,
    };
    return API(requestAPIData);
  },

  aboutDelete: function (id) {
    const url= aboutDeleteAPIEP.url.replace(':id', id)
    const requestAPIData = {
      url: url,
      method: aboutDeleteAPIEP.method,
      authorization: aboutDeleteAPIEP.authorization,
    }
    return API(requestAPIData);
  },

  aboutUpdate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(aboutUpdateAPIEP, requestAPIData);
    return getResponse;
  },

  // ABOUT API METHODS END
  

  // GALLERY API METHODS
  galleryBanner: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(galleryBannerAPIEP, requestAPIData);
    return getResponse;
  },

  gallerySingleBanner: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(gallerySingleBannerAPIEP, requestAPIData);
    return getResponse;
  },

  galleryList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(galleryListAPIEP, requestAPIData);
    return getResponse;
  },

  galleryCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(galleryCreateAPIEP, requestAPIData);
    return getResponse;
  },    

  galleryGet: function (id) { 
    const url = galleryGetAPIEP.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: galleryGetAPIEP.method,
      authorization: galleryGetAPIEP.authorization,
    }
    return API(requestAPIData);
  },

  galleryDelete: function (id) {
    const url= galleryDeleteAPIEP.url.replace(':id', id)
    const requestAPIData = {
      url: url,
      method: galleryDeleteAPIEP.method,
      authorization: galleryDeleteAPIEP.authorization,
    }
    return API(requestAPIData);
  },

  galleryStatus: function (id) {
    const url = galleryStatusAPIEP.url.replace(':id', id)
    const requestAPIData = {
      url: url,
      method: galleryStatusAPIEP.method,
      authorization: galleryStatusAPIEP.authorization,
    };
    return API(requestAPIData);
  },  

  galleryUpdate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(galleryUpdateAPIEP, requestAPIData);
    return getResponse;
  },

  // GALLERY API METHODS END

  //CONTACT API METHODS
  contactList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(contactListAPIEP, requestAPIData);
    return getResponse;
  },

  contactGet: function (id) {
    
    const url = contactGetAPIEP.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: contactGetAPIEP.method,
      authorization: contactGetAPIEP.authorization,
    }
    return API(requestAPIData);
  },

  contactDelete: function (id) {
    const url= contactDeleteAPIEP.url.replace(':id', id)
    const requestAPIData = {
      url: url,
      method: contactDeleteAPIEP.method,
      authorization: contactDeleteAPIEP.authorization,
    }
    return API(requestAPIData);
  },

  //CONTACT API METHODS END

  //OUR TEAM API METHODS

  teamBanner: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(teamBannerAPIEP, requestAPIData);
    return getResponse;
  },

  teamSingleBanner: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(teamSingleBannerAPIEP, requestAPIData);
    return getResponse;
  },

  teamList: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(teamListAPIEP, requestAPIData);
    return getResponse;
  },

  teamGet: function (id) {
    const url = teamGetAPIEP.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: teamGetAPIEP.method,
      authorization: teamGetAPIEP.authorization,
    };
    return API(requestAPIData);
  },

  teamCreate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(teamCreateAPIEP, requestAPIData);
    return getResponse;
  },

  teamDelete: function (id) {
    const url = teamDeleteAPIEP.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: teamDeleteAPIEP.method,
      authorization: teamDeleteAPIEP.authorization,
    };
    return API(requestAPIData);
  },  

  teamStatus: function (id) {
    const url = teamStatusAPIEP.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: teamStatusAPIEP.method,
      authorization: teamStatusAPIEP.authorization,
    };
    return API(requestAPIData);
  },  

  teamUpdate: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(teamUpdateAPIEP, requestAPIData);
    return getResponse;
  },
  //OUR TEAM API METHODS END


  //COUNT API METHODS
  count: function (apiData) {
    const requestAPIData = {
      bodyData: apiData,
    };
    const getResponse = API(dashcountAPIEP, requestAPIData);
    return getResponse;
  },



  // HOME API METHODS

  homeBannerAPIEP: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(homeBannerAPIEP, requestAPIData);
    return getResponse;
  },

  homeListAPIEP: function (apiData) {
    const requestAPIData = {
      bodyData: apiData
    };
    const getResponse = API(homeListAPIEP, requestAPIData);
    return getResponse;
  },

  homeDeleteAPIEP: function (id) {
    const url = homeDeleteAPIEP.url.replace(":id", id);
    const requestAPIData = {
      url: url,
      method: homeDeleteAPIEP.method,
      authorization: homeDeleteAPIEP.authorization,
    };
    return API(requestAPIData);
  },

  
};
export default LoginAPI;
