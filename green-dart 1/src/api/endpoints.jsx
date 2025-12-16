let endpoints = {
  TEAMLIST: "user_view/teamlist",
  GALLERYLIST: "user_view/gallerylist",
  PROJECTLIST: "user_view/projectlist",
  CONTACTCREATE: "contact_us/create",
};

let API_EP_BOOK = {
  TEAMLIST_API_EP: {
    url: endpoints.TEAMLIST,
    method: "POST",
    authorization: false,
  },
  GALLERYLIST_API_EP: {
    url: endpoints.GALLERYLIST,
    method: "POST",
    authorization: false,
  },
  PROJECTLIST_API_EP: {
    url: endpoints.PROJECTLIST,
    method: "POST",
    authorization: false,
  },
  CONTACTCREATE_API_EP: {
    url: endpoints.CONTACTCREATE,
    method: "POST",
    authorization: false,
  },
};
export default API_EP_BOOK;
