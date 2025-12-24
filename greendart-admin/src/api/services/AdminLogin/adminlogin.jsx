import API_EP_BOOK from "../../endpoints";
import API from "../../api";


const AdminLogout = API_EP_BOOK.SIGNOUT_API_EP
const CaseStudyList = API_EP_BOOK.IMAGELIST_API_EP
const CaseStudyCreate = API_EP_BOOK.CASESTUDYCREATE_API_EP
const CaseStudyGet = API_EP_BOOK.CASESTUDYGET_API_EP
const CaseStudyUpdate = API_EP_BOOK.CASESTUDYUPDATE_API_EP
const CaseStudyDelete = API_EP_BOOK.CASESTUDYDELETE_API_EP
const CaseStudyActiveInactive = API_EP_BOOK.CASESTUDYACTIVE_API_EP
const VideoList = API_EP_BOOK.VIDEOLIST_API_EP
const VideoCreate = API_EP_BOOK.VIDEOCREATE_API_EP
const VideoGet = API_EP_BOOK.VIDEOGET_API_EP
const VideoUpdate = API_EP_BOOK.VIDEOUPDATE_API_EP
const VideoDelete = API_EP_BOOK.VIDEODELETE_API_EP
const VideoActiveInactive = API_EP_BOOK.VIDEOACTIVE_API_EP
const MediaList = API_EP_BOOK.MEDIALIST_API_EP
const MediaCreate = API_EP_BOOK.MEDIACREATE_API_EP
const MediaGet = API_EP_BOOK.MEDIAGET_API_EP
const MediaUpdate = API_EP_BOOK.MEDIAUPDATE_API_EP
const MediaDelete = API_EP_BOOK.MEDIADELETE_API_EP
const MediaActiveInactive = API_EP_BOOK.MEDIAACTIVE_API_EP

const LoginAPI = {
    signOutAPI: function(){
        const getResponse = API(AdminLogout);
        return getResponse;
      },
      caseStudyList: function(apiData) {
        const requestAPIData = {
          bodyData: apiData
        };
        const getResponse = API(CaseStudyList,requestAPIData)
        return getResponse;
      },
      caseStudyCreate: function(apiData) {
        const requestAPIData = {
          bodyData: apiData
        };
        const getResponse = API(CaseStudyCreate,requestAPIData)
        return getResponse;
      },
      caseStudyGet: function(id) {
        const url = CaseStudyGet.url.replace(':id', id);
        const requestAPIData = {
            url: url,
            method: CaseStudyGet.method,
            authorization: CaseStudyGet.authorization
        };
        return API(requestAPIData)
      },
      caseStudyUpdate: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(CaseStudyUpdate, requestAPIData);
        return getResponse;
    },
      caseStudyDeleteAPI: function (id) {
        const url = CaseStudyDelete.url.replace(':id', id);
        const requestAPIData = {
            url: url,
            method: CaseStudyDelete.method,
            authorization: CaseStudyDelete.authorization
        };
        return API(requestAPIData)

    },
    CaseStudyActive: function(id) {
      const url = CaseStudyActiveInactive.url.replace(':id', id);
      const requestAPIData = {
          url: url,
          method: CaseStudyActiveInactive.method,
          authorization: CaseStudyActiveInactive.authorization
      };
      return API(requestAPIData)
    },
      videoList: function(apiData) {
        const requestAPIData = {
          bodyData: apiData
        };
        const getResponse = API(VideoList,requestAPIData)
        return getResponse;
      },
      videoCreate: function(apiData) {
        const requestAPIData = {
          bodyData: apiData
        };
        const getResponse = API(VideoCreate,requestAPIData)
        return getResponse;
      },
      videoGet: function(id) {
        const url = VideoGet.url.replace(':id', id);
        const requestAPIData = {
            url: url,
            method: VideoGet.method,
            authorization: VideoGet.authorization
        };
        return API(requestAPIData)
      },
      videoUpdate: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(VideoUpdate, requestAPIData);
        return getResponse;
    },
      videoDeleteAPI: function (id) {
        const url = VideoDelete.url.replace(':id', id);
        const requestAPIData = {
            url: url,
            method: VideoDelete.method,
            authorization: VideoDelete.authorization
        };
        return API(requestAPIData)

    },
    videoActive: function(id) {
      const url = VideoActiveInactive.url.replace(':id', id);
      const requestAPIData = {
          url: url,
          method: VideoActiveInactive.method,
          authorization: VideoActiveInactive.authorization
      };
      return API(requestAPIData)
    },
      mediaList: function(apiData) {
        const requestAPIData = {
          bodyData: apiData
        };
        const getResponse = API(MediaList,requestAPIData)
        return getResponse;
      },
      mediaCreate: function(apiData) {
        const requestAPIData = {
          bodyData: apiData
        };
        const getResponse = API(MediaCreate,requestAPIData)
        return getResponse;
      },
      mediaGet: function(id) {
        const url = MediaGet.url.replace(':id', id);
        const requestAPIData = {
            url: url,
            method: MediaGet.method,
            authorization: MediaGet.authorization
        };
        return API(requestAPIData)
      },
      mediaUpdate: function (apiData) {
        const requestAPIData = {
            bodyData: apiData
        }; const getResponse = API(MediaUpdate, requestAPIData);
        return getResponse;
    },
      mediaDeleteAPI: function (id) {
        const url = MediaDelete.url.replace(':id', id);
        const requestAPIData = {
            url: url,
            method: MediaDelete.method,
            authorization: MediaDelete.authorization
        };
        return API(requestAPIData)

    },
    mediaActive: function(id) {
      const url = MediaActiveInactive.url.replace(':id', id);
      const requestAPIData = {
          url: url,
          method: MediaActiveInactive.method,
          authorization: MediaActiveInactive.authorization
      };
      return API(requestAPIData)
    },
}

export default LoginAPI;