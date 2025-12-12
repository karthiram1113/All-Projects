import React, { useEffect, useState } from 'react'
import Navlogo from "../../assets/img/bizconvo-logo.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginAPI from '../../api/services/superAdminLogin/superAdmin';
import { toast } from 'react-toastify';
import VendorAPI from '../../api/services/vendorLogin/vendorApi';

function Sidebar() {
  const [wappCount, setwappCount] = useState("");
  const [isEnabled, setisEnabled] = useState("");
  const handleGetWappCount = () => {
    VendorAPI.sideListWappAPI()
        .then((responseData: any) => {
          if (responseData.apiStatus.code === '200') {
            setwappCount(responseData?.responseData?.totalRecordCount);
            console.log(responseData,"Respo")
          }
          else if(responseData?.apiStatus?.code==="404") {
            setwappCount("")
          }
        })
        .catch((error: any) => {
          console.error("Error during login:", error);
        });
  };
  const handlecatalogEnabled = () => {
    VendorAPI.catalogEnabled()
        .then((responseData: any) => {
          if (responseData.apiStatus.code === '200') {
            setisEnabled(responseData?.responseData?.is_enabled);
            console.log(responseData,"Respo")
          }
          else if(responseData?.apiStatus?.code==="404") {
            setisEnabled("")
          }
        })
        .catch((error: any) => {
          console.error("Error during login:", error);
        });
  };
  useEffect(() => {
    location.pathname.startsWith("/vendor") && (() => {
  handleGetWappCount();
  handlecatalogEnabled();
})();

  const handleEvent = () => {
    handleGetWappCount();
  };

  window.addEventListener('triggerWappCount', handleEvent);

  return () => {
    window.removeEventListener('triggerWappCount', handleEvent);
  };
}, []);

const location = useLocation();
  const isWhatsAppChatRoute = location.pathname === "/vendor/whatapp-chat";
 
  const [isSidebarOpen, setSidebarOpen] = useState(() => !isWhatsAppChatRoute);
  useEffect(() => {
  const appElement = document.querySelector(".App") as HTMLElement | null;
  const isChat = isWhatsAppChatRoute;

  setSidebarOpen(!isChat);

  if (appElement) {
    appElement.style.overflowY = isChat ? "visible" : "auto";
  }
}, [location.pathname]);

  const [superadminSidebar, setsuperadminSidebar] = useState(["/super-admin/dashboard", "/super-admin/vendor-management", "/super-admin/profile", "/super-admin/general"].includes(location.pathname));
  const isChatBotRoute = ["/vendor/chat-bot", "/vendor/chat-bot/flow"].includes(location.pathname);
  const isStoreRoute = ["/vendor/store", "/vendor/staff"].includes(location.pathname);
  const isContentHubRoute = ["/vendor/sms-template", "/vendor/whatsapp-template","/vendor/create-sms","/vendor/create-whatsapp-template","/vendor/edit-whatsapp-template","/vendor/edit-sms","/vendor/whatsapp-flow"].some(path => location.pathname.startsWith(path))
  const isContactRoute = ["/vendor/contacts", "/vendor/contacts/groups","/vendor/contacts/custom-fields","/vendor/groupcontacts"].includes(location.pathname);
  const isPromotionRoute = ["/vendor/sms/campaign", "/vendor/campaign", "/vendor/campaign/dashboard","/vendor/sms-campaign/dashboard","/vendor/smscampaign-create","/vendor/create-campaign","/vendor/settings/custom-campaign"].some(path => location.pathname.startsWith(path));
  const isSettingsRoute = ["/vendor/settings/general", "/vendor/settings/whatsapp","/vendor/settings/sms","/vendor/settings/catalog","/vendor/settings/catalog/bot","/vendor/settings/api-setup"].includes(location.pathname);
  const isCatalogRoute = ["/vendor/catalog/details", "/vendor/catalog/product/details","/vendor/catalog/orders","/vendor/catalog/product/create","/vendor/catalog/product/edit"].some(path => location.pathname.startsWith(path));
  const [isDropdownOpen, setDropdownOpen] = useState(isStoreRoute);
  const [isDropdownOpen1, setDropdownOpen1] = useState(isContentHubRoute);
  const [isDropdownOpen2, setDropdownOpen2] = useState(isContactRoute);
  const [isDropdownOpen3, setDropdownOpen3] = useState(isChatBotRoute);
  const [isDropdownOpen4, setDropdownOpen4] = useState(isSettingsRoute);
  const [isDropdownOpen5, setDropdownOpen5] = useState(isPromotionRoute);
  const [isDropdownOpen6, setDropdownOpen6] = useState(isCatalogRoute);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown1 = () => {
    setDropdownOpen1(!isDropdownOpen1);
  };
  const toggleDropdown2 = () => {
    setDropdownOpen2(!isDropdownOpen2);
  };
  const toggleDropdown3 = () => {
    setDropdownOpen3(!isDropdownOpen3);
  };
  const toggleDropdown4 = () => {
    setDropdownOpen4(!isDropdownOpen4);
  };
  const toggleDropdown5 = () => {
    setDropdownOpen5(!isDropdownOpen5);
  };
  const toggleDropdown6 = () => {
    setDropdownOpen6(!isDropdownOpen6);
  };

 
  useEffect(() => {
    const validRoutes = ["/vendor/store", "/vendor/staff"];
    const validRoutes1 = ["/vendor/sms-template", "/vendor/whatsapp-template","/vendor/create-sms","/vendor/create-whatsapp-template","/vendor/edit-whatsapp-template","/vendor/edit-sms","/vendor/whatsapp-flow"];
    const validRoutes2 = ["/vendor/contacts", "/vendor/contacts/groups","/vendor/contacts/custom-fields","/vendor/groupcontacts"];
    const validRoutes3 = ["/vendor/chat-bot", "/vendor/chat-bot/flow"];
    const validRoutes4 = ["/vendor/settings/general", "/vendor/settings/whatsapp","/vendor/settings/sms","/vendor/settings/catalog","/vendor/settings/catalog/bot","/vendor/settings/api-setup"];
    const validRoutes5 = ["/vendor/sms/campaign", "/vendor/campaign","/vendor/campaign/dashboard","/vendor/sms-campaign/dashboard","/vendor/smscampaign-create","/vendor/create-campaign","/vendor/settings/custom-campaign"];
    const validRoutes6 = ["/vendor/catalog/details", "/vendor/catalog/product/details","/vendor/catalog/orders","/vendor/catalog/product/create","/vendor/catalog/product/edit","/vendor/catalog/product/images","/vendor/catalog/product/images"];
    const allowedPaths = [
  "/vendor/catalog/product/create",
  "/vendor/catalog/product/details",
  "/vendor/catalog/product/edit",
];

const isAllowed = allowedPaths.some((path) =>
  location.pathname.startsWith(path)
);

if (!isAllowed) {
  localStorage.removeItem("catalogId");
}

    if (location.pathname !== "/vendor/catalog/orders") {
      localStorage.removeItem("catalogId1");
    }

    if (validRoutes.includes(location.pathname)) {
      setDropdownOpen(true);
    }else if (validRoutes1.some(path => location.pathname.startsWith(path))) {
      setDropdownOpen1(true);
    }else if (validRoutes2.includes(location.pathname)) {
      setDropdownOpen2(true);
    }else if (validRoutes3.includes(location.pathname)) {
      setDropdownOpen3(true);
    }else if (validRoutes4.includes(location.pathname)) {
      setDropdownOpen4(true);
    }else if (validRoutes5.some(path => location.pathname.startsWith(path))) {
      setDropdownOpen5(true);
    }else if (validRoutes6.some(path => location.pathname.startsWith(path))) {
      setDropdownOpen6(true);
    }
    else{
      setDropdownOpen(false);
      setDropdownOpen1(false);
      setDropdownOpen2(false);
      setDropdownOpen3(false);
      setDropdownOpen4(false);
      setDropdownOpen5(false);
      setDropdownOpen6(false);
    }
    
  }, [location.pathname]);
   // log out
   const navigate = useNavigate();
   const superAdminLogout = async () => {
 
     try {
 
       const responseData = await LoginAPI.signOutAPI();
       if (responseData.apiStatus.code === '200') {
         toast.success(responseData.apiStatus.message);
         navigate("/super-admin/sign-in")
         const keysToRemove = [
           "superAdminToken",
           "userName",
       ];
   
       keysToRemove.forEach(key => localStorage.removeItem(key));
       } else {
         toast.error(`Logout failed: ${responseData.apiStatus.message}`);
         navigate("/super-admin/sign-in")
       }
     } catch (error) {
       console.error("Error during API call:", error);
       navigate("/super-admin/sign-in")
       toast.error("An error occurred during the logout process.");
     }
   };
   
  return (
    <>
      {/* <button className="z-1 mt-n1 sidebar-toggle-btn d-lg-none" onClick={toggleSidebar}>
        <i className="fa-solid fa-bars-staggered text-dark"></i>
      </button> */}
{(!isSidebarOpen || isWhatsAppChatRoute) && (
      <div>
        <button
        className="z-1 mt-n1 sidebar-toggle-btn border-0 bg-transparent"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        style={{fontSize:"24px",position:"absolute",top:"25px",left:"25px"}}
      >
        <i className="fa-solid fa-bars-staggered text-dark"></i>
      </button>
      </div>
    )}

    {(!isWhatsAppChatRoute || isSidebarOpen) && (
      <aside className={`sidenav navbar  navbar-vertical navbar-expand-xs border-0  fixed-start bg-white 
        ${isSidebarOpen ? "show-sidebar" : "hide-sidebar"}`} id="sidenav-main">
        <div className="sidenav-header">
          <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none"
            aria-hidden="true" onClick={toggleSidebar}></i>
          <a><img className="logo" src={Navlogo} /></a>
        </div>
        <hr className="horizontal dark mt-0" />
        <div className="collapse navbar-collapse  w-auto sidenav-scrollbar" id="sidenav-collapse-main ">
          {superadminSidebar ?
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/super-admin/dashboard' ? 'active' : ''}`} to={"/super-admin/dashboard"}>
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1">
                      <title>shop </title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-1716.000000, -439.000000)" fill="#FFFFFF" fill-rule="nonzero">
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(0.000000, 148.000000)">
                              <path className="color-background opacity-6" d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"></path>
                              <path className="color-background" d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className="nav-link-text trxt ms-1">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/super-admin/vendor-management' ? 'active' : ''}`} to={"/super-admin/vendor-management"}>
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" >
                      <title>office</title>
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                          <g transform="translate(1716.000000, 291.000000)">
                            <g id="office" transform="translate(153.000000, 2.000000)">
                              <path className="color-background opacity-6" d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"></path>
                              <path className="color-background" d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className="nav-link-text ms-1">Vendor Management</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`cursor-pointer nav-link ${["/super-admin/general"].includes(location.pathname)
                  ? "active"
                  : ""}`}
                  onClick={toggleDropdown} to={''}              >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8l-.7 0c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 
              10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9
               16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5
                9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                  </div>
                  <span className="nav-link-text ms-1">Configuration</span>
                  <i
                    className={`font-size-dash-arrow vendor-sidebar-chevron fa-solid fa-chevron-${isDropdownOpen ? "up" : "down"
                      } `}
                  ></i>
                </Link>
                <ul
                  className={`nav-dropdown list-group ${isDropdownOpen ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${location.pathname === "/super-admin/general" ? "active" : ""
                        }`}
                      to={"/super-admin/general"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12px"
                          height="12px"
                          viewBox="0 0 576 512"
                        >
                          <path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0L109.6 0C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9c0 0 0 0-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3L448 384l-320 0 0-133.4c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3L64 384l0 64c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-64 0-131.4c-4 1-8 1.8-12.3 2.3z" />
                        </svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">General</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link onClick={superAdminLogout} className={`nav-link`} to={""}>
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                  </div>
                  <span className="nav-link-text ms-1">Logout</span>
                </Link>
              </li>
            </ul>
            :
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/vendor/dashboard" ? "active" : ""
                    }`}
                  to={"/vendor/dashboard"}
                >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      height="12px"
                      viewBox="0 0 512 512"
                    >
                      <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                    </svg>
                  </div>
                  <span className="nav-link-text trxt ms-1">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link
                className={`nav-link ${["/vendor/whatapp-chat"].some(path => {
                  const isActive = location.pathname.startsWith(path);
                  return isActive;
                }) ? "active" : ""}`}
                  to={"/vendor/whatapp-chat"}
                >
                  {wappCount ? <span className='whatschat-count'>{wappCount}</span>:<></>}
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                  </div>
                  <span className="nav-link-text trxt ms-1">WhatsApp Chat</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`cursor-pointer nav-link ${["/vendor/store", "/vendor/staff"].includes(location.pathname)
                  ? "active"
                  : ""}`}
                  onClick={toggleDropdown} to={''}              >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      height="12px"
                      viewBox="0 0 640 512"
                    >
                      <path d="M36.8 192l566.3 0c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0L121.7 0c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224l0 160 0 80c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-80 0-160-64 0 0 160-192 0 0-160-64 0zm448 0l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32l0-256-64 0z" />
                    </svg>
                  </div>
                  <span className="nav-link-text ms-1">Store Management</span>
                  <i
                    className={`font-size-dash-arrow vendor-sidebar-chevron fa-solid fa-chevron-${isDropdownOpen ? "up" : "down"
                      } `}
                  ></i>
                </Link>
                <ul
                  className={`nav-dropdown list-group ${isDropdownOpen ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${location.pathname === "/vendor/store" ? "active" : ""
                        }`}
                      to={"/vendor/store"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12px"
                          height="12px"
                          viewBox="0 0 576 512"
                        >
                          <path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0L109.6 0C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9c0 0 0 0-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3L448 384l-320 0 0-133.4c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3L64 384l0 64c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-64 0-131.4c-4 1-8 1.8-12.3 2.3z" />
                        </svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">Stores</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${location.pathname === "/vendor/staff" ? "active" : ""
                        }`}
                      to={"/vendor/staff"}
                    >
                      <div className="icon icon-shape icon-sm shadow vendorsidebar-child border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12px"
                          height="12px"
                          viewBox="0 0 640 512"
                        >
                          <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                        </svg>
                      </div>
                      <span className="nav-link-text ms-1">Staffs</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className={`cursor-pointer nav-link ${["/vendor/sms-template", "/vendor/whatsapp-template", "/vendor/create-sms", "/vendor/create-whatsapp-template","/vendor/edit-whatsapp-template","/vendor/edit-sms","/vendor/whatsapp-flow"]
                    .some(path => {
                    const isActive = location.pathname.startsWith(path);
                    return isActive;
                  })
                    ? "active"
                    : ""}`}
                  onClick={toggleDropdown1} to={''}              >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="12px"
                      height="12px"
                    >
                      <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
                    </svg>{" "}
                  </div>
                  <span className="nav-link-text ms-1">Content Hub</span>
                  <i
                    className={`font-size-dash-arrow vendor-sidebar-chevron fa-solid fa-chevron-${isDropdownOpen1 ? "up" : "down"
                      }`}
                  ></i>
                </Link>
                <ul
                  className={`nav-dropdown list-group ${isDropdownOpen1 ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link  ${["/vendor/sms-template", "/vendor/create-sms","/vendor/edit-sms"]
                        .some(path => {
                          const isActive = location.pathname.startsWith(path);
                          return isActive;
                        })
                        ? "active" : ""
                        }`}
                      to={"/vendor/sms-template"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12px"
                          height="12px"
                          viewBox="0 0 512 512"
                        >
                          <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
                        </svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">Sms</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${["/vendor/whatsapp-template", "/vendor/create-whatsapp-template","/vendor/edit-whatsapp-template"]
                        .some(path => {
                          const isActive = location.pathname.startsWith(path);
                          return isActive;
                        })
                        ? "active" : ""
                        }`}
                      to={"/vendor/whatsapp-template"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                      </div>
                      <span className="nav-link-text ms-1">WhatsApp</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${["/vendor/whatsapp-flow/list","/vendor/whatsapp-flow/create"]
                        .some(path => {
                          const isActive = location.pathname.startsWith(path);
                          return isActive;
                        })
                        ? "active" : ""
                        }`}
                      to={"/vendor/whatsapp-flow/list"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 448 512">
                        <path d="M0 0 C1.16163666 -0.00570007 2.32327332 -0.01140015 3.52011108 -0.01727295 C5.97612605 -0.02670356 8.43215356 -0.03324921 10.88818359 -0.03710938 C14.61448728 -0.04678683 18.3402325 -0.07781815 22.06640625 -0.109375 C24.46093425 -0.11590872 26.85546617 -0.12115774 29.25 -0.125 C30.9006395 -0.1435202 30.9006395 -0.1435202 32.58462524 -0.16241455 C47.73917631 -0.11954291 60.62246699 4.19878656 71.6953125 14.6796875 C80.7141552 24.45514452 85.0916076 35.68812498 85.04296875 48.8984375 C85.04014893 49.89117676 85.0373291 50.88391602 85.03442383 51.90673828 C85.03079834 52.6645459 85.02717285 53.42235352 85.0234375 54.203125 C85.59154919 54.20160612 86.15966089 54.20008724 86.74498808 54.19852233 C120.45660941 54.10890415 154.16820354 54.04032537 187.87991814 53.99886368 C191.93264094 53.99386118 195.9853635 53.98868386 200.03808594 53.98339844 C201.24826232 53.98182457 201.24826232 53.98182457 202.48288672 53.98021892 C215.52615009 53.96283948 228.56934254 53.93131544 241.61256392 53.89451382 C255.0077941 53.85703574 268.40298727 53.83487467 281.79826772 53.82677102 C290.0560897 53.82129744 298.3137112 53.80404397 306.57147144 53.77145913 C312.24314684 53.75022634 317.91471943 53.74394465 323.58643164 53.74911949 C326.85305134 53.75166777 330.11925122 53.74568768 333.3858242 53.7263031 C354.47934059 53.60731492 371.61094281 55.14802337 387.7734375 70.265625 C403.01750018 86.41157307 405.66287434 105.09635493 405.5546875 126.453125 C405.55739177 128.36491085 405.56128189 130.27669534 405.56628418 132.18847656 C405.57213534 136.16875479 405.56375938 140.14867062 405.54492188 144.12890625 C405.5221351 149.18512842 405.53528198 154.24050076 405.55921173 159.29669189 C405.57378934 163.23655392 405.56900947 167.17622037 405.55870056 171.11608887 C405.55606617 172.97847601 405.5591846 174.84088196 405.56861877 176.70324707 C405.64794593 196.75441231 402.55777704 213.92729538 388.234375 228.98828125 C387.50476563 229.71917969 386.77515625 230.45007813 386.0234375 231.203125 C385.45882813 231.77933594 384.89421875 232.35554687 384.3125 232.94921875 C371.66301247 244.82739607 355.32056978 246.64293676 338.8359375 246.890625 C337.29619635 246.92387549 335.75648158 246.95837199 334.21679688 246.99414062 C330.48587099 247.07814612 326.75487294 247.14536482 323.0234375 247.203125 C323.46212158 247.62086182 323.90080566 248.03859863 324.3527832 248.46899414 C326.3579091 250.39034114 328.34685205 252.32768225 330.3359375 254.265625 C331.02623047 254.92240234 331.71652344 255.57917969 332.42773438 256.25585938 C337.55598318 261.28501158 340.53182718 265.34047251 341.4609375 272.640625 C340.74988571 278.43061812 338.68993681 282.61791834 334.4609375 286.640625 C331.01622173 288.84877614 328.22915822 289.39834974 324.2109375 289.515625 C323.37949219 289.55300781 322.54804688 289.59039062 321.69140625 289.62890625 C316.11575375 288.73908762 312.03329006 284.465218 308.15136719 280.60571289 C307.23732117 279.70119888 306.32327515 278.79668488 305.38153076 277.86476135 C304.40246162 276.88543084 303.42373019 275.90576261 302.4453125 274.92578125 C301.42756543 273.91192649 300.40959703 272.89829386 299.39141846 271.88487244 C297.2666482 269.76753506 295.14575698 267.64640193 293.02734375 265.52270508 C290.31672319 262.80627473 287.59486912 260.1014175 284.86979294 257.39949894 C282.76787113 255.31232418 280.67293325 253.21824729 278.57993317 251.12212944 C277.57917078 250.12187914 276.57605376 249.12397877 275.57051849 248.12852669 C274.1658145 246.73619604 272.77163725 245.3332695 271.37792969 243.92993164 C270.18595978 242.73890587 270.18595978 242.73890587 268.96990967 241.52381897 C265.48272031 237.36619502 264.80373536 233.74197547 264.66015625 228.36328125 C265.5793083 222.89778575 268.80120864 219.05009844 272.61499023 215.23925781 C273.54282822 214.30519104 274.4706662 213.37112427 275.42662048 212.40875244 C276.43645091 211.40760904 277.44659543 210.40678238 278.45703125 209.40625 C279.49742402 208.36637646 280.53729736 207.32598299 281.57667542 206.28509521 C283.74996274 204.11189732 285.92829853 201.94393447 288.1105957 199.77978516 C290.90446436 197.00864497 293.68707911 194.22652216 296.46623135 191.44063187 C298.60970294 189.29381648 300.75813611 187.15202429 302.90818977 185.01180267 C303.93614507 183.98768936 304.962764 182.96223282 305.98800468 181.93540192 C307.42123897 180.50179602 308.86171336 179.07543944 310.30249023 177.64941406 C311.11950912 176.83700256 311.93652802 176.02459106 312.77830505 175.18756104 C317.25857637 171.22752213 320.72428559 170.81593907 326.5546875 170.953125 C331.28069785 171.43170833 334.05772243 173.18375909 337.2734375 176.578125 C340.55489431 181.50031022 341.62961508 185.24237881 341.0234375 191.203125 C338.72386531 197.66842776 334.67826711 202.0574937 329.7734375 206.703125 C329.12375 207.33476562 328.4740625 207.96640625 327.8046875 208.6171875 C326.21977453 210.15548539 324.62628382 211.68356006 323.0234375 213.203125 C343.88305825 214.62936297 343.88305825 214.62936297 362.5234375 207.015625 C367.98750431 201.65379644 370.86102145 195.28948386 371.16387939 187.66963196 C371.17588625 186.23462228 371.18239732 184.79956022 371.18457031 183.36450195 C371.18953522 182.5785817 371.19450012 181.79266144 371.19961548 180.98292542 C371.21420568 178.38574339 371.22103489 175.78862251 371.2265625 173.19140625 C371.23231781 171.38022358 371.2380755 169.56904093 371.24383545 167.75785828 C371.25433739 163.95909339 371.26018491 160.16034962 371.26367188 156.36157227 C371.26914604 151.51074999 371.29315439 146.6602099 371.32164383 141.8094759 C371.34033662 138.06637274 371.3454794 134.32333654 371.34700775 130.58019066 C371.3500213 128.79294484 371.35800566 127.00569984 371.37119293 125.21850014 C371.55092284 108.21911397 371.55092284 108.21911397 363.05078125 93.9296875 C355.07521294 87.13739233 345.35779834 87.05467186 335.39334106 87.04490662 C333.78694049 87.03749965 333.78694049 87.03749965 332.14808738 87.02994305 C328.55982673 87.01458576 324.97158394 87.00621217 321.38330078 86.99780273 C318.8110183 86.98822283 316.23873739 86.97821268 313.66645813 86.96780396 C308.12862006 86.94607436 302.59077957 86.92791706 297.0529213 86.91219902 C289.0461487 86.8894683 281.03940225 86.86132995 273.03265189 86.83187974 C260.04163626 86.78424305 247.05060992 86.74096826 234.05957031 86.70043945 C221.44139777 86.66106455 208.82323474 86.61963356 196.20507812 86.57543945 C195.42704862 86.57271518 194.64901912 86.56999091 193.84741296 86.56718408 C189.94419405 86.55350428 186.04097528 86.53978407 182.13775659 86.52604377 C149.76633653 86.41214063 117.39489672 86.30531767 85.0234375 86.203125 C85.02901169 86.95834946 85.03458588 87.71357391 85.04032898 88.49168396 C85.04466446 89.48241409 85.04899994 90.47314423 85.0534668 91.49389648 C85.05904099 92.47599594 85.06461517 93.4580954 85.07035828 94.46995544 C84.85668055 106.91683945 78.92791461 118.02061264 70.546875 126.875 C58.56058415 137.93355936 45.81076714 140.346034 30.046875 140.40625 C28.88523834 140.41195007 27.72360168 140.41765015 26.52676392 140.42352295 C24.07074895 140.43295356 21.61472144 140.43949921 19.15869141 140.44335938 C15.43238772 140.45303683 11.7066425 140.48406815 7.98046875 140.515625 C5.58594075 140.52215872 3.19140883 140.52740774 0.796875 140.53125 C-0.30355133 140.5435968 -1.40397766 140.5559436 -2.53775024 140.56866455 C-17.69230131 140.52579291 -30.57559199 136.20746344 -41.6484375 125.7265625 C-52.70699686 113.74027165 -55.1194715 100.99045464 -55.1796875 85.2265625 C-55.18538757 84.06492584 -55.19108765 82.90328918 -55.19696045 81.70645142 C-55.20639106 79.25043645 -55.21293671 76.79440894 -55.21679688 74.33837891 C-55.22647433 70.61207522 -55.25750565 66.88633 -55.2890625 63.16015625 C-55.29559622 60.76562825 -55.30084524 58.37109633 -55.3046875 55.9765625 C-55.3170343 54.87613617 -55.3293811 53.77570984 -55.34210205 52.64193726 C-55.29923041 37.48738619 -50.98090094 24.60409551 -40.5 13.53125 C-28.51370915 2.47269064 -15.76389214 0.060216 0 0 Z M-19.4140625 40.265625 C-21.38662239 43.97403759 -22.10399098 46.68395508 -22.15356445 50.82299805 C-22.16639969 51.75794601 -22.17923492 52.69289398 -22.19245911 53.65617371 C-22.19984604 54.66553482 -22.20723297 55.67489594 -22.21484375 56.71484375 C-22.2229155 57.75703568 -22.23098724 58.7992276 -22.23930359 59.8730011 C-22.25314004 62.08125141 -22.26386416 64.28952308 -22.27172852 66.49780273 C-22.28890747 69.8602811 -22.33279458 73.22176754 -22.37695312 76.58398438 C-22.38708336 78.73176362 -22.39559842 80.87955121 -22.40234375 83.02734375 C-22.41985184 84.02658371 -22.43735992 85.02582367 -22.45539856 86.05534363 C-22.43642777 92.22019633 -21.66762388 97.12354856 -17.9765625 102.203125 C-13.53520769 105.73808087 -9.98938714 107.31266392 -4.35668945 107.38012695 C-3.42174149 107.39296219 -2.48679352 107.40579742 -1.52351379 107.41902161 C-0.00947212 107.43010201 -0.00947212 107.43010201 1.53515625 107.44140625 C2.57734818 107.449478 3.6195401 107.45754974 4.6933136 107.46586609 C6.90156391 107.47970254 9.10983558 107.49042666 11.31811523 107.49829102 C14.6805936 107.51546997 18.04208004 107.55935708 21.40429688 107.60351562 C23.55207612 107.61364586 25.69986371 107.62216092 27.84765625 107.62890625 C28.84689621 107.64641434 29.84613617 107.66392242 30.87565613 107.68196106 C37.04050883 107.66299027 41.94386106 106.89418638 47.0234375 103.203125 C50.55839337 98.76177019 52.13297642 95.21594964 52.20043945 89.58325195 C52.21327469 88.64830399 52.22610992 87.71335602 52.23933411 86.75007629 C52.24672104 85.74071518 52.25410797 84.73135406 52.26171875 83.69140625 C52.27382637 82.12811836 52.27382637 82.12811836 52.28617859 80.5332489 C52.30001504 78.32499859 52.31073916 76.11672692 52.31860352 73.90844727 C52.33578247 70.5459689 52.37966958 67.18448246 52.42382812 63.82226562 C52.43395836 61.67448638 52.44247342 59.52669879 52.44921875 57.37890625 C52.47548088 55.88004631 52.47548088 55.88004631 52.50227356 54.35090637 C52.48330277 48.18605367 51.71449888 43.28270144 48.0234375 38.203125 C43.58208269 34.66816913 40.03626214 33.09358608 34.40356445 33.02612305 C33.46861649 33.01328781 32.53366852 33.00045258 31.57038879 32.98722839 C30.56102768 32.97984146 29.55166656 32.97245453 28.51171875 32.96484375 C27.46952682 32.956772 26.4273349 32.94870026 25.3535614 32.94038391 C23.14531109 32.92654746 20.93703942 32.91582334 18.72875977 32.90795898 C15.3662814 32.89078003 12.00479496 32.84689292 8.64257812 32.80273438 C6.49479888 32.79260414 4.34701129 32.78408908 2.19921875 32.77734375 C1.19997879 32.75983566 0.20073883 32.74232758 -0.82878113 32.72428894 C-8.57578026 32.74812839 -14.44665044 34.02451754 -19.4140625 40.265625 Z " transform="translate(80.9765625,25.796875)"/>
                        <path d="M0 0 C1.16163666 -0.00570007 2.32327332 -0.01140015 3.52011108 -0.01727295 C5.97612605 -0.02670356 8.43215356 -0.03324921 10.88818359 -0.03710938 C14.61448728 -0.04678683 18.3402325 -0.07781815 22.06640625 -0.109375 C24.46093425 -0.11590872 26.85546617 -0.12115774 29.25 -0.125 C30.9006395 -0.1435202 30.9006395 -0.1435202 32.58462524 -0.16241455 C47.73917631 -0.11954291 60.62246699 4.19878656 71.6953125 14.6796875 C82.75387186 26.66597835 85.1663465 39.41579536 85.2265625 55.1796875 C85.23226257 56.34132416 85.23796265 57.50296082 85.24383545 58.69979858 C85.25326606 61.15581355 85.25981171 63.61184106 85.26367188 66.06787109 C85.27334933 69.79417478 85.30438065 73.51992 85.3359375 77.24609375 C85.34247122 79.64062175 85.34772024 82.03515367 85.3515625 84.4296875 C85.3639093 85.53011383 85.3762561 86.63054016 85.38897705 87.76431274 C85.34610541 102.91886381 81.02777594 115.80215449 70.546875 126.875 C58.56058415 137.93355936 45.81076714 140.346034 30.046875 140.40625 C28.88523834 140.41195007 27.72360168 140.41765015 26.52676392 140.42352295 C24.07074895 140.43295356 21.61472144 140.43949921 19.15869141 140.44335938 C15.43238772 140.45303683 11.7066425 140.48406815 7.98046875 140.515625 C5.58594075 140.52215872 3.19140883 140.52740774 0.796875 140.53125 C-0.30355133 140.5435968 -1.40397766 140.5559436 -2.53775024 140.56866455 C-17.69230131 140.52579291 -30.57559199 136.20746344 -41.6484375 125.7265625 C-50.6672802 115.95110548 -55.0447326 104.71812502 -54.99609375 91.5078125 C-54.99327393 90.51507324 -54.9904541 89.52233398 -54.98754883 88.49951172 C-54.98392334 87.7417041 -54.98029785 86.98389648 -54.9765625 86.203125 C-67.93821656 86.26450944 -80.89967214 86.34174001 -93.86111069 86.43883991 C-99.88053787 86.48344392 -105.89989891 86.52272192 -111.91943359 86.54956055 C-117.73564505 86.57569305 -123.55160066 86.61616545 -129.36765289 86.66631126 C-131.57940726 86.68291289 -133.79120582 86.69446869 -136.00301361 86.70073891 C-156.71559677 85.99863443 -156.71559677 85.99863443 -174.35546875 95.234375 C-179.85615533 101.91472689 -181.12487823 108.57727685 -181.13769531 117.04174805 C-181.14266022 117.8276683 -181.14762512 118.61358856 -181.15274048 119.42332458 C-181.16733068 122.02050661 -181.17415989 124.61762749 -181.1796875 127.21484375 C-181.18544281 129.02602642 -181.1912005 130.83720907 -181.19696045 132.64839172 C-181.20746239 136.44715661 -181.21330991 140.24590038 -181.21679688 144.04467773 C-181.22227104 148.89550001 -181.24627939 153.7460401 -181.27476883 158.5967741 C-181.29346162 162.33987726 -181.2986044 166.08291346 -181.30013275 169.82605934 C-181.3031463 171.61330516 -181.31113066 173.40055016 -181.32431793 175.18774986 C-181.50404784 192.18713603 -181.50404784 192.18713603 -173.00390625 206.4765625 C-165.99291155 212.44739036 -157.59919937 213.3298468 -148.68728638 213.32337952 C-147.61991472 213.32466115 -147.61991472 213.32466115 -146.53097999 213.32596868 C-144.15881089 213.32760908 -141.78671331 213.32212581 -139.41455078 213.31665039 C-137.70925396 213.31636818 -136.00395703 213.31652691 -134.29866028 213.3170929 C-129.67725147 213.31737955 -125.05586866 213.31150402 -120.43446589 213.30451894 C-115.60180957 213.29826356 -110.76915265 213.29767987 -105.93649292 213.29649353 C-96.78874264 213.29338666 -87.64100432 213.28518194 -78.49325931 213.27514404 C-68.07735867 213.26396292 -57.66145745 213.25846741 -47.2455523 213.25344861 C-25.82254903 213.2429988 -4.39955652 213.22541182 17.0234375 213.203125 C16.54922363 212.73938477 16.07500977 212.27564453 15.58642578 211.79785156 C13.43516495 209.68823484 11.29176212 207.570803 9.1484375 205.453125 C8.40207031 204.72351563 7.65570313 203.99390625 6.88671875 203.2421875 C6.17128906 202.53320312 5.45585937 201.82421875 4.71875 201.09375 C4.05891113 200.44438477 3.39907227 199.79501953 2.71923828 199.12597656 C-1.3757157 194.48274916 -1.46550946 190.20305855 -1.35546875 184.1875 C-0.79536618 179.77597048 0.75891509 177.16457504 4.0234375 174.203125 C8.27962104 171.13471361 12.1793507 170.81081161 17.265625 170.609375 C25.88526026 172.4651605 32.14472543 179.8852979 38.10546875 185.88671875 C39.05048249 186.82970663 39.99594076 187.77224923 40.94181824 188.71437073 C42.91069835 190.67885589 44.87412122 192.64859234 46.83374023 194.62231445 C49.33623105 197.14194283 51.85201776 199.64779579 54.3720293 202.14988613 C56.7905025 204.55487479 59.19744204 206.97127002 61.60546875 209.38671875 C62.50546097 210.28063828 63.40545319 211.1745578 64.3327179 212.0955658 C65.1675621 212.93986649 66.00240631 213.78416718 66.86254883 214.65405273 C67.59564774 215.38953842 68.32874664 216.12502411 69.08406067 216.88279724 C72.40810606 220.85978339 74.45502046 224.86132585 74.5234375 230.078125 C74.554375 230.85929688 74.5853125 231.64046875 74.6171875 232.4453125 C72.761402 241.06494776 65.3412646 247.32441293 59.33984375 253.28515625 C58.39685587 254.23016999 57.45431327 255.17562826 56.51219177 256.12150574 C54.54770661 258.09038585 52.57797016 260.05380872 50.60424805 262.01342773 C48.08461967 264.51591855 45.57876671 267.03170526 43.07667637 269.5517168 C40.67168771 271.97019 38.25529248 274.37712954 35.83984375 276.78515625 C34.94592422 277.68514847 34.0520047 278.58514069 33.1309967 279.5124054 C32.28669601 280.3472496 31.44239532 281.18209381 30.57250977 282.04223633 C29.83702408 282.77533524 29.10153839 283.50843414 28.34376526 284.26374817 C23.37322475 288.41822638 18.90401051 289.8220798 12.55859375 289.62109375 C7.3150504 288.75659585 3.44814604 286.13994076 0.328125 281.8984375 C-1.16847538 278.80665827 -1.40965802 276.6879043 -1.4140625 273.265625 C-1.43339844 272.26660156 -1.45273438 271.26757812 -1.47265625 270.23828125 C-0.33356261 263.26918081 5.42140467 258.55195371 10.2734375 253.828125 C10.923125 253.18746094 11.5728125 252.54679688 12.2421875 251.88671875 C13.83144635 250.32083136 15.42520167 248.75983991 17.0234375 247.203125 C16.09320959 247.20165844 15.16298168 247.20019188 14.20456505 247.19868088 C-8.47434739 247.1620168 -31.15311294 247.10247689 -53.83190346 247.01922226 C-64.79939633 246.9794848 -75.76681799 246.94706545 -86.734375 246.93212891 C-96.29842942 246.91908493 -105.86232681 246.89205033 -115.42629278 246.84851193 C-120.48607063 246.82595883 -125.54565525 246.81021062 -130.60548782 246.81124115 C-135.37770099 246.81199141 -140.14948801 246.79389481 -144.92159081 246.76195717 C-146.66370255 246.75350805 -148.40586238 246.75167392 -150.14798546 246.75732231 C-168.49874605 246.808849 -183.88457514 243.08773835 -197.7265625 230.140625 C-212.97062518 213.99467693 -215.61599934 195.30989507 -215.5078125 173.953125 C-215.51051677 172.04133915 -215.51440689 170.12955466 -215.51940918 168.21777344 C-215.52526034 164.23749521 -215.51688438 160.25757938 -215.49804688 156.27734375 C-215.4752601 151.22112158 -215.48840698 146.16574924 -215.51233673 141.10955811 C-215.52691434 137.16969608 -215.52213447 133.23002963 -215.51182556 129.29016113 C-215.50919117 127.42777399 -215.5123096 125.56536804 -215.52174377 123.70300293 C-215.60107093 103.65183769 -212.51090204 86.47895462 -198.1875 71.41796875 C-197.45789063 70.68707031 -196.72828125 69.95617187 -195.9765625 69.203125 C-195.41195312 68.62691406 -194.84734375 68.05070312 -194.265625 67.45703125 C-183.76441575 57.59613964 -169.59002137 53.71291936 -155.56005859 53.86254883 C-154.46619843 53.86211075 -153.37233826 53.86167267 -152.24533081 53.86122131 C-148.66336635 53.86329574 -145.08188175 53.88656344 -141.5 53.91015625 C-139.00322729 53.91575698 -136.50645127 53.92002482 -134.00967407 53.92301941 C-127.46334607 53.93443052 -120.91722024 53.96386566 -114.37097168 53.99713135 C-107.68094815 54.02955238 -100.99086144 54.04154199 -94.30078125 54.05664062 C-81.19262247 54.08873886 -68.08460328 54.13930688 -54.9765625 54.203125 C-54.98213669 53.44790054 -54.98771088 52.69267609 -54.99345398 51.91456604 C-54.99778946 50.92383591 -55.00212494 49.93310577 -55.0065918 48.91235352 C-55.01216599 47.93025406 -55.01774017 46.9481546 -55.02348328 45.93629456 C-54.80980555 33.48941055 -48.88103961 22.38563736 -40.5 13.53125 C-28.51370915 2.47269064 -15.76389214 0.060216 0 0 Z M-19.4140625 40.265625 C-21.38662239 43.97403759 -22.10399098 46.68395508 -22.15356445 50.82299805 C-22.16639969 51.75794601 -22.17923492 52.69289398 -22.19245911 53.65617371 C-22.19984604 54.66553482 -22.20723297 55.67489594 -22.21484375 56.71484375 C-22.2229155 57.75703568 -22.23098724 58.7992276 -22.23930359 59.8730011 C-22.25314004 62.08125141 -22.26386416 64.28952308 -22.27172852 66.49780273 C-22.28890747 69.8602811 -22.33279458 73.22176754 -22.37695312 76.58398438 C-22.38708336 78.73176362 -22.39559842 80.87955121 -22.40234375 83.02734375 C-22.41985184 84.02658371 -22.43735992 85.02582367 -22.45539856 86.05534363 C-22.43642777 92.22019633 -21.66762388 97.12354856 -17.9765625 102.203125 C-13.53520769 105.73808087 -9.98938714 107.31266392 -4.35668945 107.38012695 C-3.42174149 107.39296219 -2.48679352 107.40579742 -1.52351379 107.41902161 C-0.00947212 107.43010201 -0.00947212 107.43010201 1.53515625 107.44140625 C2.57734818 107.449478 3.6195401 107.45754974 4.6933136 107.46586609 C6.90156391 107.47970254 9.10983558 107.49042666 11.31811523 107.49829102 C14.6805936 107.51546997 18.04208004 107.55935708 21.40429688 107.60351562 C23.55207612 107.61364586 25.69986371 107.62216092 27.84765625 107.62890625 C28.84689621 107.64641434 29.84613617 107.66392242 30.87565613 107.68196106 C37.04050883 107.66299027 41.94386106 106.89418638 47.0234375 103.203125 C50.55839337 98.76177019 52.13297642 95.21594964 52.20043945 89.58325195 C52.21327469 88.64830399 52.22610992 87.71335602 52.23933411 86.75007629 C52.24672104 85.74071518 52.25410797 84.73135406 52.26171875 83.69140625 C52.27382637 82.12811836 52.27382637 82.12811836 52.28617859 80.5332489 C52.30001504 78.32499859 52.31073916 76.11672692 52.31860352 73.90844727 C52.33578247 70.5459689 52.37966958 67.18448246 52.42382812 63.82226562 C52.43395836 61.67448638 52.44247342 59.52669879 52.44921875 57.37890625 C52.47548088 55.88004631 52.47548088 55.88004631 52.50227356 54.35090637 C52.48330277 48.18605367 51.71449888 43.28270144 48.0234375 38.203125 C43.58208269 34.66816913 40.03626214 33.09358608 34.40356445 33.02612305 C33.46861649 33.01328781 32.53366852 33.00045258 31.57038879 32.98722839 C30.56102768 32.97984146 29.55166656 32.97245453 28.51171875 32.96484375 C27.46952682 32.956772 26.4273349 32.94870026 25.3535614 32.94038391 C23.14531109 32.92654746 20.93703942 32.91582334 18.72875977 32.90795898 C15.3662814 32.89078003 12.00479496 32.84689292 8.64257812 32.80273438 C6.49479888 32.79260414 4.34701129 32.78408908 2.19921875 32.77734375 C1.19997879 32.75983566 0.20073883 32.74232758 -0.82878113 32.72428894 C-8.57578026 32.74812839 -14.44665044 34.02451754 -19.4140625 40.265625 Z "  transform="translate(240.9765625,185.796875)"/>
                        <path d="M0 0 C1.16163666 -0.00570007 2.32327332 -0.01140015 3.52011108 -0.01727295 C5.97612605 -0.02670356 8.43215356 -0.03324921 10.88818359 -0.03710938 C14.61448728 -0.04678683 18.3402325 -0.07781815 22.06640625 -0.109375 C24.46093425 -0.11590872 26.85546617 -0.12115774 29.25 -0.125 C30.9006395 -0.1435202 30.9006395 -0.1435202 32.58462524 -0.16241455 C47.73917631 -0.11954291 60.62246699 4.19878656 71.6953125 14.6796875 C82.75387186 26.66597835 85.1663465 39.41579536 85.2265625 55.1796875 C85.23226257 56.34132416 85.23796265 57.50296082 85.24383545 58.69979858 C85.25326606 61.15581355 85.25981171 63.61184106 85.26367188 66.06787109 C85.27334933 69.79417478 85.30438065 73.51992 85.3359375 77.24609375 C85.34247122 79.64062175 85.34772024 82.03515367 85.3515625 84.4296875 C85.3639093 85.53011383 85.3762561 86.63054016 85.38897705 87.76431274 C85.34610541 102.91886381 81.02777594 115.80215449 70.546875 126.875 C58.56058415 137.93355936 45.81076714 140.346034 30.046875 140.40625 C28.88523834 140.41195007 27.72360168 140.41765015 26.52676392 140.42352295 C24.07074895 140.43295356 21.61472144 140.43949921 19.15869141 140.44335938 C15.43238772 140.45303683 11.7066425 140.48406815 7.98046875 140.515625 C5.58594075 140.52215872 3.19140883 140.52740774 0.796875 140.53125 C-0.30355133 140.5435968 -1.40397766 140.5559436 -2.53775024 140.56866455 C-17.69230131 140.52579291 -30.57559199 136.20746344 -41.6484375 125.7265625 C-52.70699686 113.74027165 -55.1194715 100.99045464 -55.1796875 85.2265625 C-55.18538757 84.06492584 -55.19108765 82.90328918 -55.19696045 81.70645142 C-55.20639106 79.25043645 -55.21293671 76.79440894 -55.21679688 74.33837891 C-55.22647433 70.61207522 -55.25750565 66.88633 -55.2890625 63.16015625 C-55.29559622 60.76562825 -55.30084524 58.37109633 -55.3046875 55.9765625 C-55.3170343 54.87613617 -55.3293811 53.77570984 -55.34210205 52.64193726 C-55.29923041 37.48738619 -50.98090094 24.60409551 -40.5 13.53125 C-28.51370915 2.47269064 -15.76389214 0.060216 0 0 Z M-19.4140625 40.265625 C-21.38662239 43.97403759 -22.10399098 46.68395508 -22.15356445 50.82299805 C-22.16639969 51.75794601 -22.17923492 52.69289398 -22.19245911 53.65617371 C-22.19984604 54.66553482 -22.20723297 55.67489594 -22.21484375 56.71484375 C-22.2229155 57.75703568 -22.23098724 58.7992276 -22.23930359 59.8730011 C-22.25314004 62.08125141 -22.26386416 64.28952308 -22.27172852 66.49780273 C-22.28890747 69.8602811 -22.33279458 73.22176754 -22.37695312 76.58398438 C-22.38708336 78.73176362 -22.39559842 80.87955121 -22.40234375 83.02734375 C-22.41985184 84.02658371 -22.43735992 85.02582367 -22.45539856 86.05534363 C-22.43642777 92.22019633 -21.66762388 97.12354856 -17.9765625 102.203125 C-13.53520769 105.73808087 -9.98938714 107.31266392 -4.35668945 107.38012695 C-3.42174149 107.39296219 -2.48679352 107.40579742 -1.52351379 107.41902161 C-0.00947212 107.43010201 -0.00947212 107.43010201 1.53515625 107.44140625 C2.57734818 107.449478 3.6195401 107.45754974 4.6933136 107.46586609 C6.90156391 107.47970254 9.10983558 107.49042666 11.31811523 107.49829102 C14.6805936 107.51546997 18.04208004 107.55935708 21.40429688 107.60351562 C23.55207612 107.61364586 25.69986371 107.62216092 27.84765625 107.62890625 C28.84689621 107.64641434 29.84613617 107.66392242 30.87565613 107.68196106 C37.04050883 107.66299027 41.94386106 106.89418638 47.0234375 103.203125 C50.55839337 98.76177019 52.13297642 95.21594964 52.20043945 89.58325195 C52.21327469 88.64830399 52.22610992 87.71335602 52.23933411 86.75007629 C52.24672104 85.74071518 52.25410797 84.73135406 52.26171875 83.69140625 C52.27382637 82.12811836 52.27382637 82.12811836 52.28617859 80.5332489 C52.30001504 78.32499859 52.31073916 76.11672692 52.31860352 73.90844727 C52.33578247 70.5459689 52.37966958 67.18448246 52.42382812 63.82226562 C52.43395836 61.67448638 52.44247342 59.52669879 52.44921875 57.37890625 C52.47548088 55.88004631 52.47548088 55.88004631 52.50227356 54.35090637 C52.48330277 48.18605367 51.71449888 43.28270144 48.0234375 38.203125 C43.58208269 34.66816913 40.03626214 33.09358608 34.40356445 33.02612305 C33.46861649 33.01328781 32.53366852 33.00045258 31.57038879 32.98722839 C30.56102768 32.97984146 29.55166656 32.97245453 28.51171875 32.96484375 C27.46952682 32.956772 26.4273349 32.94870026 25.3535614 32.94038391 C23.14531109 32.92654746 20.93703942 32.91582334 18.72875977 32.90795898 C15.3662814 32.89078003 12.00479496 32.84689292 8.64257812 32.80273438 C6.49479888 32.79260414 4.34701129 32.78408908 2.19921875 32.77734375 C1.19997879 32.75983566 0.20073883 32.74232758 -0.82878113 32.72428894 C-8.57578026 32.74812839 -14.44665044 34.02451754 -19.4140625 40.265625 Z " transform="translate(400.9765625,345.796875)"/>
                        </svg>
                      </div>
                      <span className="nav-link-text ms-1">Flow</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {isEnabled && (
              <li className="nav-item">
                <Link
                  className={`cursor-pointer nav-link ${["/vendor/catalog/details", "/vendor/catalog/product/details","/vendor/catalog/orders","/vendor/catalog/product/create","/vendor/catalog/product/edit","/vendor/catalog/product/images"]
                    .some(path => {
                    const isActive = location.pathname.startsWith(path);
                    return isActive;
                  }) ? "active" : ""}`}
                  onClick={toggleDropdown6} to={''}              >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 32C0 14.3 14.3 0 32 0L160 0c17.7 0 32 14.3 32 32l0 384c0 53-43 96-96 96s-96-43-96-96L0 32zM223.6 425.9c.3-3.3 .4-6.6 .4-9.9l0-262 75.4-75.4c12.5-12.5 32.8-12.5 45.3 0l90.5 90.5c12.5 12.5 12.5 32.8 0 45.3L223.6 425.9zM182.8 512l192-192L480 320c17.7 0 32 14.3 32 32l0 128c0 17.7-14.3 32-32 32l-297.2 0zM128 64L64 64l0 64 64 0 0-64zM64 192l0 64 64 0 0-64-64 0zM96 440a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>                     {" "}
                  </div>
                  <span className="nav-link-text ms-1 grayFont">Catalog Management</span>
                  <i
                    className={`font-size-dash-arrow vendor-sidebar-chevron fa-solid fa-chevron-${isDropdownOpen6 ? "up" : "down"
                      }`}
                  ></i>
                </Link>
                <ul
                  className={`nav-dropdown list-group ${isDropdownOpen6 ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link  ${["/vendor/catalog/details"].includes(location.pathname) ? "active" : ""
                        }`}
                      to={"/vendor/catalog/details"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 80l0 48c0 17.7 14.3 32 32 32l16 0 48 0 0-80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48l0 304c0 35.3 28.7 64 64 64s64-28.7 64-64l0-5.3c0-32.4 26.3-58.7 58.7-58.7L480 320l0-192c0-53-43-96-96-96L112 32zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16l-245.3 0c-14.7 0-26.7 11.9-26.7 26.7l0 5.3c0 53-43 96-96 96l176 0 96 0z"/></svg>                      
                      </div>
                      <span className="nav-link-text trxt ms-1 grayFont">Catalog</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link  ${["/vendor/catalog/product/details","/vendor/catalog/product/create","/vendor/catalog/product/edit"]
                        .some(path => {
                    const isActive = location.pathname.startsWith(path);
                    return isActive;
                  }) ? "active" : ""}`}
                      to={"/vendor/catalog/product/details"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg>
                      </div>
                      <span className="nav-link-text trxt ms-1 grayFont">Product</span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link  ${["/vendor/catalog/product/images"]
                        .some(path => {
                    const isActive = location.pathname.startsWith(path);
                    return isActive;
                  }) ? "active" : ""}`}
                      to={"/vendor/catalog/product/images"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 640 640"><path d="M128 160C128 124.7 156.7 96 192 96L512 96C547.3 96 576 124.7 576 160L576 416C576 451.3 547.3 480 512 480L192 480C156.7 480 128 451.3 128 416L128 160zM56 192C69.3 192 80 202.7 80 216L80 512C80 520.8 87.2 528 96 528L456 528C469.3 528 480 538.7 480 552C480 565.3 469.3 576 456 576L96 576C60.7 576 32 547.3 32 512L32 216C32 202.7 42.7 192 56 192zM224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160C206.3 160 192 174.3 192 192C192 209.7 206.3 224 224 224zM420.5 235.5C416.1 228.4 408.4 224 400 224C391.6 224 383.9 228.4 379.5 235.5L323.2 327.6L298.7 297C294.1 291.3 287.3 288 280 288C272.7 288 265.8 291.3 261.3 297L197.3 377C191.5 384.2 190.4 394.1 194.4 402.4C198.4 410.7 206.8 416 216 416L488 416C496.7 416 504.7 411.3 508.9 403.7C513.1 396.1 513 386.9 508.4 379.4L420.4 235.4z"/></svg>                      
                      </div>
                      <span className="nav-link-text trxt ms-1 grayFont">Product Images</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${["/vendor/catalog/orders"].includes(location.pathname) ? "active" : ""
                        }`}
                      to={"/vendor/catalog/orders"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48l45.5 0c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5L488 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-288.3 0c-11.5 0-21.4-8.2-23.6-19.5L170.7 288l288.5 0c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32L360 32l0 102.1 23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-64 64c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23L312 32 120.1 32C111 12.8 91.6 0 69.5 0L24 0zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>                      </div>
                      <span className="nav-link-text ms-1 grayFont">Order</span>
                    </Link>
                  </li>
                </ul>
              </li>)}

              <li className="nav-item">
                <Link
                  className={`cursor-pointer nav-link ${["/vendor/contacts", "/vendor/contacts/groups","/vendor/groupcontacts","/vendor/contacts/custom-fields"].includes(location.pathname)
                    ? "active"
                    : ""}`}
                  onClick={toggleDropdown2} to={''}              >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      height="12px"
                      viewBox="0 0 512 512"
                    >
                      <path d="M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z" />
                    </svg>
                  </div>
                  <span className="nav-link-text ms-1">Contact</span>
                  <i
                    className={`font-size-dash-arrow vendor-sidebar-chevron fa-solid fa-chevron-${isDropdownOpen2 ? "up" : "down"
                      }`}
                  ></i>
                </Link>
                <ul
                  className={`nav-dropdown list-group ${isDropdownOpen2 ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${["/vendor/contacts","/vendor/groupcontacts"].includes(location.pathname)
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/contacts"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12px"
                          height="12px"
                          viewBox="0 0 640 512"
                        >
                          <path d="M64 64a64 64 0 1 1 128 0A64 64 0 1 1 64 64zM25.9 233.4C29.3 191.9 64 160 105.6 160l44.8 0c27 0 51 13.4 65.5 34.1c-2.7 1.9-5.2 4-7.5 6.3l-64 64c-21.9 21.9-21.9 57.3 0 79.2L192 391.2l0 72.8c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-115.7c-26.5-9.5-44.7-35.8-42.2-65.6l4.1-49.3zM448 64a64 64 0 1 1 128 0A64 64 0 1 1 448 64zM431.6 200.4c-2.3-2.3-4.9-4.4-7.5-6.3c14.5-20.7 38.6-34.1 65.5-34.1l44.8 0c41.6 0 76.3 31.9 79.7 73.4l4.1 49.3c2.5 29.8-15.7 56.1-42.2 65.6L576 464c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-72.8 47.6-47.6c21.9-21.9 21.9-57.3 0-79.2l-64-64zM272 240l0 32 96 0 0-32c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l64 64c9.4 9.4 9.4 24.6 0 33.9l-64 64c-6.9 6.9-17.2 8.9-26.2 5.2s-14.8-12.5-14.8-22.2l0-32-96 0 0 32c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-64-64c-9.4-9.4-9.4-24.6 0-33.9l64-64c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2z" />
                        </svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        Customer Details
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${location.pathname === "/vendor/contacts/groups"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/contacts/groups"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12px"
                          height="12px"
                          viewBox="0 0 640 512"><path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z" /></svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        Groups
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${location.pathname === "/vendor/contacts/custom-fields"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/contacts/custom-fields"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12px"
                          height="12px" viewBox="0 0 512 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg></div>
                      <span className="nav-link-text trxt ms-1">
                        Custom Fields
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${["/vendor/campaign","/vendor/sms/campaign", "/vendor/campaign/dashboard", "/vendor/create-campaign", "/vendor/campaign/create/new", "/vendor/contact/whatsapp/contact/","/vendor/smscampaign-create","/vendor/sms-reportcampaign/dashboard","/vendor/sms-campaign/dashboard","/vendor/settings/custom-campaign"].some(path => {
                    const isActive = location.pathname.startsWith(path);
                    return isActive;
                  }) ? "active" : ""}`}
                  onClick={toggleDropdown5} to={''}
                >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z" /></svg>
                  </div>
                  <span className="nav-link-text trxt ms-1">Promotion Management</span>
                  <i
                    className={`font-size-dash-arrow vendor-sidebar-chevron fa-solid fa-chevron-${isDropdownOpen5 ? "up" : "down"
                      }`}
                  ></i>
                </Link>
                <ul
                  className={`nav-dropdown list-group ${isDropdownOpen5 ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${["/vendor/sms/campaign","/vendor/smscampaign-create","/vendor/sms-reportcampaign/dashboard","/vendor/sms-campaign/dashboard"].some(path => {
                        const isActive = location.pathname.startsWith(path);
                        return isActive;})
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/sms/campaign"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12px"
                          height="12px"
                          viewBox="0 0 512 512"
                        >
                          <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
                        </svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        SMS
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                     className={`nav-link ${["/vendor/campaign","/vendor/campaign/create/new","/vendor/create-campaign"].some(path => {
                      const isActive = location.pathname.startsWith(path);
                      return isActive;
                    })
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/campaign"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        Whatsapp
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${location.pathname === "/vendor/settings/custom-campaign"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/settings/custom-campaign"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width='13' height='13'><path d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512l325.2 0 75 0 122.8 0c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z"/></svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        Custom Campaign
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item">
                <Link
                  className={`cursor-pointer nav-link ${["/vendor/chat-bot", "/vendor/chat-bot/flow"].includes(location.pathname)
                    ? "active"
                    : ""}`}
                  onClick={toggleDropdown3} to={''}              >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width='13' height='13' viewBox="0 0 640 512"><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" /></svg>
                  </div>
                  <span className="nav-link-text ms-1">Chat bot</span>
                  <i
                    className={`font-size-dash-arrow vendor-sidebar-chevron fa-solid fa-chevron-${isDropdownOpen3 ? "up" : "down"
                      }`}
                  ></i>
                </Link>
                <ul
                  className={`nav-dropdown list-group ${isDropdownOpen3 ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${location.pathname === "/vendor/chat-bot"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/chat-bot"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width='12' height='12'>
                          <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 
                      96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448
                       416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
                        </svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        List
                      </span>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      className={`nav-link ${location.pathname === "/vendor/chat-bot/flow"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/chat-bot/flow"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width='12' height='12'>
                          <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" /></svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        Flows
                      </span>
                    </Link>
                  </li> */}
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/Report" ? "active" : ""
                    }`}
                  to={"/Report"}
                >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" /></svg>
                  </div>
                  <span className="nav-link-text trxt ms-1">Report</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`cursor-pointer nav-link ${["/vendor/settings/general", "/vendor/settings/whatsapp","/vendor/settings/sms","/vendor/settings/catalog","/vendor/settings/catalog/bot","/vendor/settings/api-setup"].includes(location.pathname)
                    ? "active"
                    : ""}`}
                  onClick={toggleDropdown4} to={''}              >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='13' height='13'><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>
                  </div>
                  <span className="nav-link-text ms-1">Settings</span>
                  <i
                    className={`font-size-dash-arrow vendor-sidebar-chevron fa-solid fa-chevron-${isDropdownOpen4 ? "up" : "down"
                      }`}
                  ></i>
                </Link>
                <ul
                  className={`nav-dropdown list-group ${isDropdownOpen4 ? "d-block" : "d-none"
                    }`}
                >
                  {/* <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${location.pathname === "/vendor/settings/custom-campaign"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/settings/custom-campaign"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width='13' height='13'><path d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512l325.2 0 75 0 122.8 0c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z"/></svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        Custom Campaign
                      </span>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link
                      className={`mt-2 nav-link ${location.pathname === "/vendor/settings/general"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/settings/general"}
                    >
                      <div className="icon icon-shape icon-sm vendorsidebar-child shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='13' height='13'><path d="M256 64c53 0 96 43 96 96s-43 96-96 96s-96 43-96 96s43 96 96 96C150 448 64 362 64 256S150 64 256 64zm0 448A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm32-352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>

                      </div>
                      <span className="nav-link-text trxt ms-1">
                        General
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${location.pathname === "/vendor/settings/whatsapp"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/settings/whatsapp"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                      </div>
                      <span className="nav-link-text trxt ms-1">
                        Whatsapp Setup
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${location.pathname === "/vendor/settings/sms"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/settings/sms"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM96 212.8c0-20.3 16.5-36.8 36.8-36.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-2.7 0-4.8 2.2-4.8 4.8c0 1.6 .8 3.1 2.2 4l29.4 19.6c10.3 6.8 16.4 18.3 16.4 30.7c0 20.3-16.5 36.8-36.8 36.8L112 304c-8.8 0-16-7.2-16-16s7.2-16 16-16l27.2 0c2.7 0 4.8-2.2 4.8-4.8c0-1.6-.8-3.1-2.2-4l-29.4-19.6C102.2 236.7 96 225.2 96 212.8zM372.8 176l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-2.7 0-4.8 2.2-4.8 4.8c0 1.6 .8 3.1 2.2 4l29.4 19.6c10.2 6.8 16.4 18.3 16.4 30.7c0 20.3-16.5 36.8-36.8 36.8L352 304c-8.8 0-16-7.2-16-16s7.2-16 16-16l27.2 0c2.7 0 4.8-2.2 4.8-4.8c0-1.6-.8-3.1-2.2-4l-29.4-19.6c-10.2-6.8-16.4-18.3-16.4-30.7c0-20.3 16.5-36.8 36.8-36.8zm-152 6.4L256 229.3l35.2-46.9c4.1-5.5 11.3-7.8 17.9-5.6s10.9 8.3 10.9 15.2l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48-19.2 25.6c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4L224 240l0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-6.9 4.4-13 10.9-15.2s13.7 .1 17.9 5.6z"/></svg>                      </div>
                      <span className="nav-link-text trxt ms-1">
                        Sms Setup
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${location.pathname === "/vendor/settings/api-setup"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/settings/api-setup"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 640 640"><path d="M176 120C189.3 120 200 130.7 200 144C200 157.3 189.3 168 176 168C162.7 168 152 157.3 152 144C152 130.7 162.7 120 176 120zM208.4 217.2C236.4 204.8 256 176.7 256 144C256 99.8 220.2 64 176 64C131.8 64 96 99.8 96 144C96 176.8 115.7 205 144 217.3L144 422.6C115.7 435 96 463.2 96 496C96 540.2 131.8 576 176 576C220.2 576 256 540.2 256 496C256 463.2 236.3 435 208 422.7L208 336.1C234.7 356.2 268 368.1 304 368.1L390.7 368.1C403 396.4 431.2 416.1 464 416.1C508.2 416.1 544 380.3 544 336.1C544 291.9 508.2 256.1 464 256.1C431.2 256.1 403 275.8 390.7 304.1L304 304C254.1 304 213 265.9 208.4 217.2zM176 472C189.3 472 200 482.7 200 496C200 509.3 189.3 520 176 520C162.7 520 152 509.3 152 496C152 482.7 162.7 472 176 472zM440 336C440 322.7 450.7 312 464 312C477.3 312 488 322.7 488 336C488 349.3 477.3 360 464 360C450.7 360 440 349.3 440 336z"/></svg>                     
                      </div>
                      <span className="nav-link-text trxt ms-1 grayFont">
                        Api Integration
                      </span>
                    </Link>
                  </li>
                  {isEnabled && (
                    <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${location.pathname === "/vendor/settings/catalog"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/settings/catalog"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 80l0 48c0 17.7 14.3 32 32 32l16 0 48 0 0-80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48l0 304c0 35.3 28.7 64 64 64s64-28.7 64-64l0-5.3c0-32.4 26.3-58.7 58.7-58.7L480 320l0-192c0-53-43-96-96-96L112 32zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16l-245.3 0c-14.7 0-26.7 11.9-26.7 26.7l0 5.3c0 53-43 96-96 96l176 0 96 0z"/></svg>                      
                      </div>
                      <span className="nav-link-text trxt ms-1 grayFont">
                        Catalog Setup
                      </span>
                    </Link>
                  </li>
                  

                  {/* <li className="nav-item">
                    <Link
                      className={`nav-link ${location.pathname === "/vendor/settings/catalog/bot"
                        ? "active"
                        : ""
                        }`}
                      to={"/vendor/settings/catalog/bot"}
                    >
                      <div className="icon icon-shape vendorsidebar-child icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 576 512"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M3455 4786 c-37 -17 -70 -52 -84 -89 -7 -18 -11 -138 -11 -323 l0 -294 160 0 161 0 -3 309 c-3 295 -4 311 -24 337 -11 15 -32 37 -46 47 -34 25 -113 32 -153 13z"/><path d="M1284 3741 c-148 -42 -270 -167 -308 -316 -14 -52 -16 -192 -16 -1102 0 -725 3 -1058 11 -1095 28 -131 123 -253 244 -309 83 -40 145 -49 316 -49 l147 0 4 -162 c3 -148 5 -167 27 -212 31 -63 90 -122 150 -149 71 -33 189 -31 256 5 28 15 183 137 345 272 l295 245 497 1 c326 0 515 4 550 11 119 25 221 97 289 202 71 110 69 72 69 1239 0 1152 2 1108 -63 1216 -37 62 -103 127 -167 165 -102 59 -52 57 -1375 56 -1124 0 -1214 -2 -1271 -18z m2158 -969 c40 -25 78 -91 78 -137 0 -39 -35 -106 -68 -130 -27 -20 -43 -20 -892 -20 -849 0 -865 0 -892 20 -33 24 -68 91 -68 130 0 41 36 110 68 131 15 10 43 21 62 25 19 4 404 6 855 6 l820 -2 37 -23z m-482 -694 c50 -34 72 -71 77 -125 5 -65 -26 -120 -87 -150 l-44 -23 -586 0 c-549 0 -588 2 -626 19 -61 28 -89 73 -89 143 0 63 19 97 75 136 l33 22 607 0 607 0 33 -22z"/><path d="M505 3022 c-68 -33 -127 -92 -159 -161 -20 -45 -21 -58 -21 -486 0 -430 0 -441 22 -487 46 -100 137 -170 242 -187 l51 -8 0 678 0 679 -37 0 c-21 0 -65 -13 -98 -28z"/><path d="M4480 2371 l0 -678 51 8 c105 17 196 87 242 187 22 46 22 57 22 487 0 428 -1 441 -21 486 -47 100 -167 189 -256 189 l-38 0 0 -679z"/></g></svg>
                     </div>
                      <span className="nav-link-text trxt ms-1 grayFont">
                        Catalog Bot
                      </span>
                    </Link>
                  </li> */}
                  </>)}
                </ul>
              </li>
            </ul>
          }




        </div>
      </aside>)}
    </>
  )
}

export default Sidebar