let endpoints = {
  SIGNIN: "login",
  SIGNOUT: "logout",
  IMAGELIST: "content/list",
  CASESTUDYCREATE: "content/create",
  CASESTUDYGET: "content/get/:id",
  CASESTUDYACTIVE: "content/activestatus/:id",
  CASESTUDYUPDATE: "content/update",
  CASESTUDYDELETE: "content/delete/:id",
  VIDEOLIST: "video/list",
  VIDEOCREATE: "video/insert",
  VIDEOGET: "video/get/:id",
  VIDEOUPDATE: "video/update",
  VIDEODELETE: "video/delete/:id",
  VIDEOACTIVE: "content/activestatus/:id",
  MEDIALIST: "media/list",
  MEDIACREATE: "media/create",
  MEDIAGET: "media/get/:id",
  MEDIAUPDATE: "media/update",
  MEDIADELETE: "media/delete/:id",
  MEDIAACTIVE: "content/activestatus/:id",

  // GALLERY ENDPOINTS
  // GALLERYLIST: "gallery/list",
  // GALLERYBANNER: "fileUpload/bannerBulkUpload",
  // GALLERYCREATE: "gallery/create",
  // GALLERYGET: "gallery/get/:id",
  // GALLERYDELETE: "gallery/delete",
  // GALLERSTATUS: "gallery/activeStatus",
  // GALLERYEDIT: "gallery/update",

  // PROJECT ENDPOINTS
  PROJECTLIST: "project/list",
  PROJECTBANNER: "fileUpload/bannerBulkUpload",
  PROJECTCREATE: "project/create",
  PROJECTGET: "project/get/:id",
  PROJECTDELETE: "project/delete/:id",
  PROJECTSTATUS: "project/activeStatus/:id",
  PROJECTEDIT: "project/update",
  PROJECTIMG: "fileUpload/imageInsert",

  // ABOUT ENDPOINTS
  ABOUTBANNER: "fileUpload/bannerBulkUpload",
  ABOUTSINGLEBANNER: "fileUpload/imageInsert",
  ABOUTCREATE: "about/create",
  ABOUTLIST: "about/list",
  ABOUTGET: "about/get/:id",
  ABOUTDELETE: "about/delete/:id",
  ABOUTSTATUS: "about/activeStatus/:id",
  ABOUTUPDATE: "about/update",

  //GALLERY ENDPOINTS
  GALLERYBANNER: "fileUpload/bannerBulkUpload",
  GALLERYSINGLEBANNER: "fileUpload/imageInsert",
  GALLERYLIST: "gallery/list",
  GALLERYCREATE: "gallery/create",
  GALLERYGET: "gallery/get/:id",
  GALLERYDELETE: "gallery/delete/:id",
  GALLERSTATUS: "gallery/activeStatus/:id",
  GALLERYUPDATE: "gallery/update",

  // CONTACT ENDPOINTS
  CONTACTLIST: "contact_us/list",
  CONTACTGET: "contact_us/getdetails/:id",
  CONTACTDELETE: "contact_us/delete/:id",

  //OUR TEAM ENDPOINTS
  TEAMBANNER: "fileUpload/bannerBulkUpload",
  TEAMSINGLEBANNER: "fileUpload/imageInsert",
  TEAMLIST: "our_teams/list",
  TEAMGET: "our_teams/get/:id",
  TEAMCREATE: "our_teams/create",
  TEAMDELETE: "our_teams/delete/:id",
  TEAMSTATUS: "our_teams/activationstatus/:id",
  TEAMUPDATE: "our_teams/update",

  //HOME ENDPOINTS
  HOMEBANNER: "home/bannerBulkUpload",
  HOMELIST: "home/bannerList",
  HOMEDELETE: "/home/bannerDelete/:id",


  //COUNT ENDPOINTS
  DASHCOUNT: "dashboard/count",
};

let API_EP_BOOK = {
  SIGNIN_API_EP: {
    url: endpoints.SIGNIN,
    method: "POST",
    authorization: false,
  },
  SIGNOUT_API_EP: {
    url: endpoints.SIGNOUT,
    method: "GET",
    authorization: true,
  },
  IMAGELIST_API_EP: {
    url: endpoints.IMAGELIST,
    method: "POST",
    authorization: true,
  },
  CASESTUDYCREATE_API_EP: {
    url: endpoints.CASESTUDYCREATE,
    method: "POST",
    authorization: true,
  },
  CASESTUDYGET_API_EP: {
    url: endpoints.CASESTUDYGET,
    method: "GET",
    authorization: true,
  },
  CASESTUDYACTIVE_API_EP: {
    url: endpoints.CASESTUDYACTIVE,
    method: "GET",
    authorization: true,
  },
  CASESTUDYUPDATE_API_EP: {
    url: endpoints.CASESTUDYUPDATE,
    method: "POST",
    authorization: true,
  },
  CASESTUDYDELETE_API_EP: {
    url: endpoints.CASESTUDYDELETE,
    method: "DELETE",
    authorization: true,
  },
  VIDEOLIST_API_EP: {
    url: endpoints.VIDEOLIST,
    method: "POST",
    authorization: true,
  },
  VIDEOCREATE_API_EP: {
    url: endpoints.VIDEOCREATE,
    method: "POST",
    authorization: true,
  },
  VIDEOGET_API_EP: {
    url: endpoints.VIDEOGET,
    method: "GET",
    authorization: true,
  },
  VIDEOACTIVE_API_EP: {
    url: endpoints.VIDEOACTIVE,
    method: "GET",
    authorization: true,
  },
  VIDEOUPDATE_API_EP: {
    url: endpoints.VIDEOUPDATE,
    method: "POST",
    authorization: true,
  },
  VIDEODELETE_API_EP: {
    url: endpoints.VIDEODELETE,
    method: "DELETE",
    authorization: true,
  },
  MEDIALIST_API_EP: {
    url: endpoints.MEDIALIST,
    method: "POST",
    authorization: true,
  },
  MEDIACREATE_API_EP: {
    url: endpoints.MEDIACREATE,
    method: "POST",
    authorization: true,
  },
  MEDIAGET_API_EP: {
    url: endpoints.MEDIAGET,
    method: "GET",
    authorization: true,
  },
  MEDIAACTIVE_API_EP: {
    url: endpoints.MEDIAACTIVE,
    method: "GET",
    authorization: true,
  },
  MEDIAUPDATE_API_EP: {
    url: endpoints.MEDIAUPDATE,
    method: "POST",
    authorization: true,
  },
  MEDIADELETE_API_EP: {
    url: endpoints.MEDIADELETE,
    method: "DELETE",
    authorization: true,
  },

  // PROJECT_API_ENDPOINTS
  PROJECTLIST_API_EP: {
    url: endpoints.PROJECTLIST,
    method: "POST",
    authorization: true,
  },
  PROJECTBANNER_API_EP: {
    url: endpoints.PROJECTBANNER,
    method: "POST",
    authorization: true,
  },
  PROJECTCREATE_API_EP: {
    url: endpoints.PROJECTCREATE,
    method: "POST",
    authorization: true,
  },
  PROJECTGET_API_EP: {
    url: endpoints.PROJECTGET,
    method: "GET",
    authorization: true,
  },
  PROJECTDELETE_API_EP: {
    url: endpoints.PROJECTDELETE,
    method: "DELETE",
    authorization: true,
  },
  PROJECTSTATUS_API_EP: {
    url: endpoints.PROJECTSTATUS,
    method: "GET",
    authorization: true,
  },
  PROJECTEDIT_API_EP: {
    url: endpoints.PROJECTEDIT,
    method: "PUT",
    authorization: true,
  },
  PROJECTIMG_API_EP: {
    url: endpoints.PROJECTIMG,
    method: "POST",
    authorization: true,
  },

  // ABOUT_API_ENDPOINTS

  ABOUTBANNER_API_EP: {
    url: endpoints.ABOUTBANNER,
    method: "POST",
    authorization: true,
  },

  ABOUTSINGLEBANNER_API_EP: {
    url: endpoints.ABOUTSINGLEBANNER,
    method: "POST",
    authorization: true,
  },

  ABOUTCREATE_API_EP: {
    url: endpoints.ABOUTCREATE,
    method: "POST",
    authorization: true,
  },

  ABOUTLIST_API_EP: {
    url: endpoints.ABOUTLIST,
    method: "POST",
    authorization: true,
  },

  ABOUTGET_API_EP: {
    url: endpoints.ABOUTGET,
    method: "GET",
    authorization: true,
  },

  ABOUTDELETE_API_EP: {
    url: endpoints.ABOUTDELETE,
    method: "DELETE",
    authorization: true,
  },

  ABOUTSTATUS_API_EP: {
    url: endpoints.ABOUTSTATUS,
    method: "GET",
    authorization: true,
  },

  ABOUTUPDATE_API_EP: {
    url: endpoints.ABOUTUPDATE,
    method: "PUT",
    authorization: true,
  },

  // GALLERY_API_ENDPOINTS

  GALLERYBANNER_API_EP: {
    url: endpoints.GALLERYBANNER,
    method: "POST",
    authorization: true,
  },

  GALLERYSINGLEBANNER_API_EP: {
    url: endpoints.GALLERYSINGLEBANNER,
    method: "POST",
    authorization: true,
  },

  GALLERYLIST_API_EP: {
    url: endpoints.GALLERYLIST,
    method: "POST",
    authorization: true,
  },

  GALLERYCREATE_API_EP: {
    url: endpoints.GALLERYCREATE,
    method: "POST",
    authorization: true,
  },

  GALLERYGET_API_EP: {
    url: endpoints.GALLERYGET,
    method: "GET",
    authorization: true,
  },

  GALLERYDELETE_API_EP: {
    url: endpoints.GALLERYDELETE,
    method: "DELETE",
    authorization: true,
  },

  GALLERSTATUS_API_EP: {
    url: endpoints.GALLERSTATUS,
    method: "GET",
    authorization: true,
  },

  GALLERYUPDATE_API_EP: {
    url: endpoints.GALLERYUPDATE,
    method: "PUT",
    authorization: true,
  },

  // CONTACT_API_ENDPOINTS
  CONTACTLIST_API_EP: {
    url: endpoints.CONTACTLIST,
    method: "POST",
    authorization: true,
  },

  CONTACTGET_API_EP: {
    url: endpoints.CONTACTGET,
    method: "GET",
    authorization: true,
  },

  CONTACTDELETE_API_EP: {
    url: endpoints.CONTACTDELETE,
    method: "DELETE",
    authorization: true,
  },

  // OUR TEAM API ENDPOINTS
  TEAMBANNER_API_EP: {
    url: endpoints.TEAMBANNER,
    method: "POST",
    authorization: true,
  },

  TEAMSINGLEBANNER_API_EP: {
    url: endpoints.TEAMSINGLEBANNER,
    method: "POST",
    authorization: true,
  },

  TEAMLIST_API_EP: {
    url: endpoints.TEAMLIST,
    method: "POST",
    authorization: true,
  },

  TEAMGET_API_EP: {
    url: endpoints.TEAMGET,
    method: "GET",
    authorization: true,
  },

  TEAMCREATE_API_EP: {
    url: endpoints.TEAMCREATE,
    method: "POST",
    authorization: true,
  },

  TEAMDELETE_API_EP: {
    url: endpoints.TEAMDELETE,
    method: "DELETE",
    authorization: true,
  },

  TEAMSTATUS_API_EP: {
    url: endpoints.TEAMSTATUS,
    method: "GET",
    authorization: true,
  },

  TEAMUPDATE_API_EP: {
    url: endpoints.TEAMUPDATE,
    method: "PUT",
    authorization: true,
  },

  //COUNT API ENDPOINTS
  COUNT_API_EP: {
    url: endpoints.DASHCOUNT,
    method: "POST",
    authorization: true,
  },

  //HOME API ENDPOINTS
  HOME_API_EP: {
    url: endpoints.HOMEBANNER,
    method: "POST",
    authorization: true,
  },

  HOMELIST_API_EP: {
    url: endpoints.HOMELIST,
    method: "POST",
    authorization: true,
  },

  HOMEDELETE_API_EP: {
    url: endpoints.HOMEDELETE,
    method: "DELETE",
    authorization: true,
  },

};

export default API_EP_BOOK;
