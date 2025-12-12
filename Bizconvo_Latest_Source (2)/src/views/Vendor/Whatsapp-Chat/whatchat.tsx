import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import TopNav from "../../../shared/TopNav";
import './whatchat.css';
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import API from "../../../api/api";
import { toast } from "react-toastify";
import API_EP_BOOK from "../../../api/endpoints";
import VendorAPI from "../../../api/services/vendorLogin/vendorApi";
import { format } from "date-fns";


interface Message {
    text: string;
    file: File | null;
    timestamp: string;
    type: "text" | "file";
}
interface StoreDrop {
    id: string;
    store_name: string;
 }
 interface GroupDrop {
    id: string;
    group_name: string;
 }
 interface CountrypDrop {
    id: string;
    name: string;
    iso_code: string;
    name_capitalized: string;
    iso3_code: string;
    iso_num_code: string;
    phone_code: string;
 }
 interface LangCodeDrop {
    id: string;
    language_name: string;
    language_code: string;
 }
const WhatsApp_Chat: React.FC = () => {
    const [ShowChat, setShowChat] = useState(true);
    const [ShowChat1, setShowChat1] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const[chatList,setChatListData]=useState([]);
    const[contactSideList,setContactSideList]=useState([]);
    const [recordsPerPage] = useState(10);
    const location = useLocation();
    const contactDetailsValue = location.state?.chatDetails || {};
    const ClickMe = () => {
        setShowChat(true);
        setShowChat1(false);
        setActiveTab("all");

    }

    const ClickMe1 = () => {
        setShowChat(false);
        setShowChat1(true);
        setActiveTab("mine");
    }
    const [langCodeDrop, setlangCodeDrop] = useState<LangCodeDrop[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [to,setTo] = useState(contactDetailsValue.mobile);
    const [isMediaMessage,setisMediaMessage] = useState(false);
    const [mediaType,setmediaType] = useState("");
    const [caption,setcaption] = useState("");
    const [contactName,setcontactName] = useState(contactDetailsValue.mobile);
    const [contactNumber,setcontactNumber] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [chatPopup, setChatPopup] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [chatloading, setchatLoading] = useState(false);
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [mobNumber, setMobNumber] = useState('')
    const [languageCode, setLanguageCode] = useState('')
    const [email, setEmail] = useState('')
    const [groups, setGroups] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [loyality, setLoyality] = useState('')
    const [anniversary, setAnniversary] = useState('')
    const [saleAmount, setsaleAmount] = useState('')
    const [storeId, setStoreId] = useState('')
    const [storeDropDown, setStoreDropDown] = useState<StoreDrop[]>([])
    const [groupDropDown, setGroupDropDown] = useState<GroupDrop[]>([])
    const [countryDropDown, setCountryDropDown] = useState<CountrypDrop[]>([])
    const [genderDropDown, setgenderDropDown] = useState<string>("");
    const [countryName, setcountryName] = useState('')
    const [storeName, setStoreName] = useState('')
    const [langName, setLangName] = useState('')
    const [groupName, setGroupName] = useState<any[]>([]);
    const [groupId, setGroupId] = useState<string[]>([]);
    const [id, setId] = useState('')
    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setMessage((prev) => prev + emojiObject.emoji);
        setShowPicker(false);
    };
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        console.log(selectedFile);
    
        if (selectedFile) {
            const mimeType = selectedFile.type;
    
            setSelectedFile(selectedFile);
            setisMediaMessage(true);
            setFileName(selectedFile.name);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            
            if (mimeType.startsWith("image/")) {
                setmediaType("image");
            } else if (mimeType.startsWith("video/")) {
                setmediaType("video");
            } else if (mimeType === "application/pdf") {
                setmediaType("document");
            } else if (
                mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                mimeType === "application/msword"
            ) {
                setmediaType("document");
            } else {
                setmediaType("unknown");
            }
        }
    };
    

    const sendMessage = () => {
        if (!message.trim() && !selectedFile) return;
        handleChatsend();
        const formattedTimestamp = new Date().toLocaleString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

        const newMessage: Message = {
            text: selectedFile ? selectedFile.name : message,
            file: selectedFile,
            timestamp: formattedTimestamp,
            type: selectedFile ? "file" : "text",
        };

        setMessages([...messages, newMessage]);
        setMessage("");
        setSelectedFile(null);
    };
    const resetForm=()=>{
        setSelectedFile(null);
        setcaption("");
        setmediaType("");
        setFileName("");
    }
    const handleChatsend = async () => {
        const formData = new FormData();
        formData.append("to", to);
        formData.append("text", message);
        if (selectedFile) {
            if (!selectedFile) {
                toast.error("Please select a file to import.");
                return;
            }
            formData.append("isMediaMessage", isMediaMessage.toString());
            formData.append("media_type", mediaType);
            formData.append("caption", caption);
            formData.append("file", selectedFile);
        }
        
        try {
            const response = await VendorAPI.whatsappChatsendAPI(formData);
            if (response?.apiStatus?.code==="200") {
                handleChatList(to);
                resetForm();
                const closeButton = document.getElementById("wachatImgclose");
                if (closeButton) {
                   closeButton.click();
                }
                // toast.success(response?.apiStatus?.message);
            } else {
                toast.error(response.apiStatus?.message);
            }
        } catch (error) {
            console.error("Import Error:", error);
            toast.error("An error occurred while importing the file.");
        }
    };
  //   Get By Id

  const contactListGet = async (id:any) => {
    try {
       const responseData = await VendorAPI.contactGetAPI(id);
       if (responseData.apiStatus.code === '200') {
          const data = responseData?.result
          setFName(data?.firstName)
          setLName(data?.lastName)
          setgenderDropDown(data?.gender)
          setcountryName(data?.country)
          setStoreId(data?.storeId)
          setStoreName(data?.storeName)
          setDate(data?.otherInformation?.DOB)
          setsaleAmount(data?.otherInformation?.salesAmount)
          setMobNumber(data?.mobile)
          setLangName(data?.language)
          setLanguageCode(data?.language)
          setEmail(data?.email)
          setLoyality(data?.otherInformation?.loyality)
          setAnniversary(data?.otherInformation?.anniversary)
          setAddress(data?.otherInformation?.address)
          const groupNames = data?.groupDetails.map((group: any) => group.groupName);
          setGroupName(data?.groupDetails);
          const groupIds = data?.groupDetails.map((group: any) => group.groupId);
          setGroupId(groupIds);
       } else {
        //   toast.error(`get failed: ${responseData.apiStatus.message}`);
       }
    } catch (error) {
       console.error("Error during API call:", error);
       toast.error("An error occurred during the get process.");
    }
 };  
 const navigate = useNavigate();   
 const handleNavigate = () => {
    const contactDetailsData = {
       firstName: fName,
       lastName: lName,
       mobile: mobNumber,
       country:countryName,
    };

    navigate(`/vendor/contact/whatsapp/contact/send-template-message/${id}`, { state: { contactDetailsData } });
 };
const handleChatList = (to:any) => {
      setchatLoading(true)
      const apiData = {filter:{to: to}};
      VendorAPI.whatsappChatListAPI(apiData)
         .then((responseData: any) => {
            if (responseData.apiStatus.code === '200') {
               setchatLoading(false)
               setChatListData(responseData.responseData.MessageData)
            } else {
               if (responseData.apiStatus.code == "404") {
               setChatListData([]);
               }
               setchatLoading(false)
            }
         })
         .catch((error: any) => {
            setchatLoading(false)
            console.error("Error during login:", error);
            toast.error("An error occurred during login.");
         });
   }
   const idSetRef = useRef(false);
const handleContactSideList = (search:string) => {
      setLoading(true)
      const apiData = {filter:{search:search}};
      VendorAPI.whatsappContactSideListAPI(apiData)
         .then((responseData: any) => {
            if (responseData.apiStatus.code === '200') {
               setLoading(false)
               const messageData = responseData.responseData.MessageData;
                setContactSideList(messageData);

                if (
                    location.pathname === "/vendor/whatapp-chat" &&
                    !idSetRef.current &&
                    messageData.length > 0
                ) {
                    setId(messageData[0].contactId);
                    idSetRef.current = true; 
                }
            } else {
               if (responseData.apiStatus.code == "404") {
                setContactSideList([]);
               }
            //    toast.error(responseData.apiStatus.message);
               setLoading(false)
            }
         })
         .catch((error: any) => {
            setLoading(false)
            console.error("Error during login:", error);
            toast.error("An error occurred during login.");
         });
   }
const handleChatClear = () => {
      const apiData = {contactNumber: to};
      VendorAPI.whatsappChatClearAPI(apiData)
         .then((responseData: any) => {
            if (responseData.apiStatus.code === '200') {
               toast.success(responseData?.apiStatus?.message)
               handleChatList(to);
               const closeButton = document.getElementById("closedeleteModal");
               if (closeButton) {
                  closeButton.click();
               }
            } else {
               if (responseData.apiStatus.code == "404") {
               
               }
               toast.error(responseData.apiStatus.message);
            }
         })
         .catch((error: any) => {
            console.error("Error during login:", error);
            toast.error("An error occurred during login.");
         });
   }
   const isValidDate = (date: string | number): boolean => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
    };

   const contactUpdate = () => {
         let apiData = {
            ...({ contactId: id }),
            storeId: storeId,
            firstName: fName,
            lastName: lName,
            gender:genderDropDown,
            mobile: mobNumber,
            email: email,
            country: countryName,
            language: languageCode,
            otherInformation: {
               DOB: isValidDate(date) ? format(new Date(date), "MM/dd/yyyy") : "",
               saleAmount:saleAmount,
               anniversary: isValidDate(anniversary) ? format(new Date(anniversary), "MM/dd/yyyy") : "",
               loyality: loyality,
               address: address,
            },
            groupdetails: groupName
         };
   
         const apiCall = VendorAPI.contactEditAPI(apiData);
         apiCall
            .then((responseData: any) => {
               if (responseData.apiStatus.code === '200') {
                  setLoading(false)
                  toast.success(responseData.apiStatus.message);
                  const closeButton = document.getElementById("closeCreate");
                  handleChatList(to);
                  handleContactSideList(search)
                  if (closeButton) {
                     closeButton.click();
                  }
               } else {
                  setLoading(false)
                  toast.error(responseData.apiStatus.message);
               }
            })
            .catch((error: any) => {
               console.error("Error during API call:", error);
               toast.error("An error occurred during the API call.");
            });
    };
   
   const handleSelectGroup = (dropdownValue: GroupDrop) => {
    const alreadySelected = groupName.some(item => item.groupId === dropdownValue.id);;
    if (alreadySelected) {
       setGroupName(groupName.filter(group => group.groupId !== dropdownValue.id));
       setGroupId(groupId.filter(id => id !== dropdownValue.id));
    } else {
       setGroupName([...groupName, { groupId: dropdownValue.id, groupName: dropdownValue.group_name }]);
       setGroupId([...groupId, dropdownValue.id]);
    }
 };
 const handleSelectGroupName = (groupdetails: any) => {
    setGroupName(prevGroupName => prevGroupName.filter(item => item.groupId !== groupdetails.groupId))
 }
     // Store Dropdwon
   
      const handleGetStoreDrop = () => {
         VendorAPI.contactStoreDropdownAPI()
            .then((responseData: any) => {
               if (responseData.apiStatus.code === '200') {
                  setStoreDropDown(responseData?.result?.StoreDataDropDown);
               } else {
                  toast.error(responseData.apiStatus.message);
               }
            })
            .catch((error: any) => {
               setLoading(false)
               console.error("Error during login:", error);
               toast.error("An error occurred during login.");
            });
      };
      //Store Dropdown Filter
      const filteredStoreDrop = storeDropDown.filter((dropdownValue) =>
         dropdownValue?.store_name.toLowerCase().includes(storeName.toLowerCase())
       );
   
      const handleCountryDrop = () => {
         VendorAPI.commonCountryDropAPI()
            .then((responseData: any) => {
               if (responseData.apiStatus.code === '200') {
                  setCountryDropDown(responseData?.result?.CountryData);
               } else {
                  toast.error(responseData.apiStatus.message);
               }
            })
            .catch((error: any) => {
               setLoading(false)
               console.error("Error during login:", error);
               toast.error("An error occurred during login.");
            });
      };
      //CountryDropdown Filter
      const filteredCountryDrop = countryDropDown.filter((dropdownValue) =>
         dropdownValue?.name.toLowerCase().includes(countryName.toLowerCase())
      );
      //Group Dropdown
   
      const handleGetGroupDrop = () => {
         VendorAPI.contactGroupDropdownAPI()
            .then((responseData: any) => {
               if (responseData.apiStatus.code === '200') {
                  setGroupDropDown(responseData?.result?.GroupDataDropDown);
               } else {
                  toast.error(responseData.apiStatus.message);
               }
            })
            .catch((error: any) => {
               setLoading(false)
               console.error("Error during login:", error);
               toast.error("An error occurred during login.");
            });
      };
      function formatDate(timeString:any) {
        // Add a dummy date to the time to make it a valid Date string
        const currentDate = new Date();
        const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}T${timeString}`;
    
        const date = new Date(dateString);
    
        // Days of the week
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
        // Months of the year
        const monthsOfYear = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
            'October', 'November', 'December'
        ];
    
        // Get the day of the week, date, month, and year
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = monthsOfYear[date.getMonth()];
        const year = date.getFullYear();
    
        // Get the hours, minutes, and seconds
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
    
        // Determine AM/PM
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12; // Convert from 24-hour to 12-hour format
        hours = hours ? hours : 12; // Handle 0 hour as 12
    
        // Add leading zero for single digits
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        const strSeconds = seconds < 10 ? '0' + seconds : seconds;
    
        // Format the day with suffix (1st, 2nd, 3rd, 4th, etc.)
        const suffix = (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) ? 'st' :
                       (dayOfMonth === 2 || dayOfMonth === 22) ? 'nd' :
                       (dayOfMonth === 3 || dayOfMonth === 23) ? 'rd' : 'th';
        
        // Return formatted date string
        return `${dayOfWeek} ${dayOfMonth}${suffix} ${month} ${year} ${hours}:${strMinutes}:${strSeconds} ${ampm}`;
    }
      //Language Drop
    const languageCodeDropdwon = () => {
    VendorAPI.languageCodeDropdown()
        .then((responceData: any) => {
            if (responceData.apiStatus.code === '200') {
                setlangCodeDrop(responceData?.responseData)
            }
        })
        .catch((error: any) => {
            console.error("Error during login:", error);
        });
    };
    //Language Dropdown Filter
    const filteredLangCodeDrop = langCodeDrop.filter((dropdownValue) =>
    dropdownValue?.language_name.toLowerCase().includes(langName.toLowerCase())
    );
    useEffect(() => {
        const modalElements = [
        document.getElementById('exampleModal')
        ];
        const handleHidden = () => {resetForm();};
        modalElements.forEach((modalElement) => {modalElement?.addEventListener('hidden.bs.modal', handleHidden);});
        return () => {
        modalElements.forEach((modalElement) => {modalElement?.removeEventListener('hidden.bs.modal', handleHidden);});
        };
    }, []);
    useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    if (!id && myArray[3]) {
        setId(myArray[3]);
      }
    })

   useEffect(()=>{
        handleContactSideList(search)
    }, [search]);
   useEffect(()=>{
        handleChatList(to)
    }, [to]);

    useEffect(()=>{
    if (id && id !== "undefined" && id !== "") {
        contactListGet(id);
        }
    }, [id]);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
        // Scroll instantly to the last message
        lastMessageRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, [chatList]);

    
   useEffect(() => {
    if (contactSideList.length > 0) {
        setTo((contactSideList as any)[0]?.contactNumber);
        setcontactName((contactSideList as any)[0]?.contactName);        
    }
    }, [contactSideList]);
    return (
        <>
            <DashboardLayout>
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <TopNav />
                    <div className="container-fluid py-1">
                        <div className="row">
                            <div className="col-md-6">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                        <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to={"/vendor/dashboard"}>Dashboard</Link></li>
                                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">WhatsApp Chat</li>
                                    </ol>
                                    <h6 className="text-start font-weight-bolder mb-0">WhatsApp Chat</h6>
                                </nav>
                            </div>
                        </div>
                        <div className="card p-3 mt-4">
                            <div className="row">
                                <div className="col-md-3">
                                    <h4>WhatsApp Chat</h4>
                                    <p className="whatsapp-chat-hr"></p>
                                    <div className="form-check form-switch ms-1 is-filled">
                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                        /> <span>Show All</span>
                                        <span className="actionChathelp-tooltip-container">
                                        <p className="text-end whatsChat-help" style={{ cursor: 'help' }}>?</p>
                                        <div className="actionChathelp-tooltip-text">
                                            Once you get the response by the contact, they will be come in the chat list of this chat <br />
                                            window,alternatively you can click on chat button of the contact list to chat with <br /> the contact
                                        </div>
                                        </span>
                                    </div>
                                    
                                    <div className="mt-3">
                                        <ul className="nav nav-tabs custom-tabs">
                                            <li className="nav-item" onClick={ClickMe}>
                                                <p className={`nav-link ${activeTab === "all" ? "active-tab" : ""}`}>All</p>
                                            </li>
                                            <li className="nav-item" onClick={ClickMe1}>
                                                <p className={`nav-link ${activeTab === "mine" ? "active-tab" : ""}`}>Mine</p>
                                            </li>
                                        </ul>
                                        {ShowChat && (
                                            <>
                                                <div className="mt-3">
                                                    <div className="input-group">
                                                        <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                                                        <input type="text" onChange={(e) => setSearch(e.target.value)} autoComplete="off" className="form-control" placeholder="Type here..." />
                                                    </div>

                                                    <div className="mt-2">
                                                        <div className="card p-2 first-colm-scroll">
                                                        {contactSideList.map((listData:any)=>(
                                                            <div className={`d-flex flex-column gap-2 mb-1 ${id === listData?.contactId ? "active-contact" : ""}`}  onClick={()=>{setTo(listData?.contactNumber);setcontactName(listData?.contactName);setId(listData?.contactId)}}>
                                                            <div className="d-flex gap-2 align-items-center cursor-pointer">
                                                                <div>
                                                                    <h5 className="whatsapp-chat-profile-first mt-n4">
                                                                        {listData?.contactName
                                                                            ?.split(' ')
                                                                            .map((word: string) => word.charAt(0).toUpperCase())
                                                                            .join('')}
                                                                    </h5>                                                                
                                                                </div>  
                                                                <div className="pt-2">
                                                                    <h6>{listData?.contactName} {listData?.contactNumber}</h6>
                                                                    <p className="whatsapp-chat-profile-first-p mt-n2">{listData?.lastMessageTime}</p>
                                                                </div>
                                                            </div>
                                                            <hr className="whatsapp-chat-hr" />
                                                        </div>
                                                        
                                                        ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-white card campaign-template mt-5">
                                        <h6 className="campaign-temp-head">Notes</h6>
                                        <div>
                                            <h6>{contactName} - Task has been assigned</h6>
                                            <p>Status Updated</p>
                                        </div>
                                    </div>
                                            </>
                                        )}

                                        {ShowChat1 && (
                                            <>
                                                <div className="mt-3">
                                                    <div className="input-group">
                                                        <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                                                        <input type="text" autoComplete="off" className="form-control" placeholder="Type here..." />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="chat-container">
                                        <div className="chat-header">
                                            <div className="d-flex gap-2">
                                                <div>
                                                    <h5 className="whatsapp-chat-profile-first">{contactName
                                                        ?.split(' ')
                                                        .map((word: string) => word.charAt(0).toUpperCase())
                                                        .join('')}</h5>
                                                </div>
                                                <div>
                                                    <h6 className="text-white">{contactName} - <span className="text-success">{to}</span></h6>
                                                    <p className="whatsapp-chat-profile-first-p mt-n2 text-warning">You can't reply, they need to reply back to start the conversation.</p>
                                                </div>
                                            </div>
                                            <div className="btn-group dropstart">
                                                <i className="fa-solid fa-ellipsis-vertical cursor-pointer" data-bs-toggle="dropdown"></i>
                                                <ul className="dropdown-menu chat-three-dot-drop">
                                                    <li onClick={()=>{handleNavigate()}}><a className="dropdown-item" href=""><i className="fa-solid fa-mars"></i> Send template message</a></li>
                                                    <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#chatdelete" href=""><i className="fa-solid fa-eraser"></i> Clear chat history</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="chat-body">
                                        <div className="conversation whatsapp-chat-msg-design">
                                            <div className="conversation-container chat-message-new">
                                                 {
                                                    chatloading ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "100px" }}>
                                                            <span className="loader"></span>
                                                        </div>
                                                    ) : chatList.length === 0 ? (
                                                        <></>
                                                    ) : (
                                                        <>
                                                {chatList.map((listData: any, id: number) => (
                                                <div key={id} ref={id === chatList.length - 1 ? lastMessageRef : null}>
                                                    {listData?.messageAgent === "user" ? (
                                                    <div className="p-2 received">
                                                        <span className="p-2 chat-msg-1 position-relative d-inline-block">
                                                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',background: "gainsboro",borderRadius:"5px" }} className="w-100">
                                                        <img className="w-50"  src={listData?.messageBody?.MessageMedia} alt="" />
                                                        </span>
                                                        {listData?.messageBody.messageText}
                                                        <span className="time-footer text-xxs d-block text-end mt-1">{listData?.time}</span>
                                                        </span>
                                                    </div>
                                                    ) : (
                                                    <div className="p-2 text-end position-relative">
                                                        <span className="p-2 chat-msg-2 position-relative d-inline-block text-start">
                                                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',background: "gainsboro",borderRadius:"5px" }} className="w-100">
                                                        {listData?.messageBody?.MessageMedia?.match(/\.(mp4)$/i) ? (
                                                            <video controls className="w-80" src={listData.messageBody.MessageMedia} />
                                                        ) : listData?.messageBody?.MessageMedia?.match(/\.(jpeg|jpg|png)$/i) ? (
                                                            <img className="w-50" src={listData.messageBody.MessageMedia} alt="" />
                                                        ) : listData?.messageBody?.MessageMedia?.match(/\.(pdf|docx)$/i) ? (
                                                            <a
                                                            href={listData.messageBody.MessageMedia}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-50 text-center"
                                                            style={{ color: '#007bff', textDecoration: 'underline' }}
                                                            >
                                                            <i className="  fa fa-3x fa-file-alt text-white"></i>
                                                            </a>
                                                        ) : null}
                                                        </span>
                                                        {listData?.messageBody.messageText}
                                                        {listData?.messageStatus === "failed" ? (
                                                        <span className="d-inline-block failed-msg text-danger">
                                                            <i className="fa-solid fa-circle-exclamation failed-txt text-danger"></i>
                                                             Message failed to send because more than 24 hours have passed since the customer last replied to this number
                                                        </span>
                                                        ) : null}
                                                        <span className="time-footer text-xxs d-block text-end mt-1">{formatDate(listData?.time)}
                                                            {listData?.messageStatus ==="sent"
                                                            ?<>
                                                            <svg className="tick-align" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="13" height="13" viewBox="0 0 72 72"><path d="M57.658,12.643c1.854,1.201,2.384,3.678,1.183,5.532l-25.915,40c-0.682,1.051-1.815,1.723-3.064,1.814	C29.764,59.997,29.665,60,29.568,60c-1.146,0-2.241-0.491-3.003-1.358L13.514,43.807c-1.459-1.659-1.298-4.186,0.36-5.646	c1.662-1.46,4.188-1.296,5.646,0.361l9.563,10.87l23.043-35.567C53.329,11.971,55.806,11.442,57.658,12.643z" fill="#899499"></path></svg>                                                      
                                                            </>
                                                            :listData?.messageStatus ==="delivered" ?
                                                            <>
                                                            <svg className="tick-align" xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#899499"></path></svg>
                                                            </>
                                                            :listData?.messageStatus==="read"?
                                                            <>
                                                            <svg className="tick-align" xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"></path></svg></>
                                                            :listData?.messageStatus==="failed"?
                                                            <>
                                                            <i className="fa-solid fa-circle-exclamation whachat-failed text-danger"></i></>
                                                            :""
                                                            }
                                                            </span>
                                                        </span>
                                                    </div>
                                                    )}
                                                </div>
                                                ))}
                                                </>)}
                                            </div>
                                            </div>
                                        </div>


                                        <div className="chat-footer">
                                            <div className="chat-input-container">
                                                <button className="emoji-btn" onClick={() => setShowPicker((prev) => !prev)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aba9a9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <path d="M15 16a3 3 0 0 1-6 0"></path>
                                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                                    </svg>
                                                </button>
                                                {showPicker && (
                                                    <div className="emoji-dropdown-whtaspp">
                                                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                                                    </div>
                                                )}

                                                {/* {/ Message Input /} */}
                                                <input
                                                    type="text"
                                                    className="chat-input"
                                                    placeholder="Type a message..."
                                                    value={message}
                                                    autoComplete="off" onChange={(e) => setMessage(e.target.value)}
                                                />

                                                {/* {/ File Upload /} */}
                                                <div className="btn-group dropup">
                                                    <button className="file-btn" data-bs-toggle="dropdown">
                                                        <i className="fa-solid fa-paperclip"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li onClick={() => setChatPopup(1)} data-bs-toggle="modal" data-bs-target="#exampleModal"><a className="dropdown-item"><i className="fa-solid fa-file"></i> Send Document</a></li>
                                                        <li onClick={() => setChatPopup(2)} data-bs-toggle="modal" data-bs-target="#exampleModal"><a className="dropdown-item"><i className="fa-solid fa-image"></i> Send Image</a></li>
                                                        <li onClick={() => setChatPopup(3)} data-bs-toggle="modal" data-bs-target="#exampleModal"><a className="dropdown-item"><i className="fa-solid fa-camera"></i> Send Video</a></li>
                                                        <li onClick={() => setChatPopup(4)} data-bs-toggle="modal" data-bs-target="#exampleModal"><a className="dropdown-item"><i className="fa-solid fa-microphone"></i> Send Audio</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* {/ Send Button /} */}
                                            <button className="footer-btn-send" onClick={sendMessage}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"></path>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* {/ Modal for File Upload /} */}
                                        <div className="modal fade" id="exampleModal" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content all-modal-content">
                                                    <div className="modal-header border-0">
                                                        <h5 className="modal-title vendorcreate-modal-title">Send Media</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {chatPopup && (
                                                            <div className="file-upload-container  position-relative">
                                                                <input type="file" id="fileUpload" className="file-whatsapp-popup" onChange={handleFileChange} ref={fileInputRef}/>
                                                                <p className="position-absolute w-100 mt-5 text-center">{fileName ? `Selected File: ${fileName}` : ""}</p>
                                                            
                                                                <label htmlFor="fileUpload" className="custom-file-label fw-normal">
                                                                    {chatPopup === 1 ? "Select Document" :
                                                                        chatPopup === 2 ? "Select Image" :
                                                                            chatPopup === 3 ? "Select Video" : "Select Audio"}
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                
                                                    <div className="col-md-12 px-3 login-input-group">
                                                <div className="vendor-create-container">
                                                   <input autoComplete="off" onChange={(e)=>setcaption(e.target.value)} value={caption} type="text" id="vendor-crt-input" 
                                                   className={`vendor-crt-input loginfilled-frame-username`}
                                                   placeholder=" " required />
                                                   <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-mobile-button"></i> Caption/Text</label>
                                                </div>
                                             </div>
                                                    <div className="modal-footer border-0">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="wachatImgclose" onClick={resetForm}>Close</button>
                                                        <button type="button" className="btn btn-primary" onClick={sendMessage}>Send</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="bg-white card campaign-template mt-5">
                                        <h6 className="campaign-temp-head">Contact Info</h6>
                                        <div>
                                            <div className="text-end">
                                                <button className="whatsapp-border-btn-0" type="button" data-bs-toggle="modal" data-bs-target="#vendorview" onClick={()=>contactListGet(id)}><i className="fa-solid fa-pen"></i>  Edit Contact</button>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <h6 className="mt-n2">Name</h6>
                                            <p className="mt-n2">{contactName}</p>
                                            <h6 className="mt-n2">Phone</h6>
                                            <p className="mt-n2">{mobNumber}</p>
                                            <h6 className="mt-n2">Email</h6>
                                            <p className="mt-n3">{email}</p>
                                            <h6 className="mt-n2">Language</h6>
                                            <p className="mt-n3">{languageCode}</p>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="vendorviews" aria-labelledby="vendorviewLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content all-modal-content vendorcreate-modal-content">
                                                <div className="modal-header vendorcreate-modal-header">
                                                    <h1 className="modal-title vendorcreate-modal-title fs-6 text-center" id="vendorviewLabel">Edit Contact</h1>
                                                </div>
                                                <div className="p-0 modal-body text-center">
                                                    <div className="row ms-4 mx-4">
                                                        <div className="col-md-6 login-input-group">
                                                            <div className="vendor-create-container">
                                                                <input type="text" autoComplete="off" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-file-signature"></i> First Name</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 login-input-group">
                                                            <div className="vendor-create-container">
                                                                <input type="text" autoComplete="off" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-file-signature"></i> Last Name</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 login-input-group">
                                                            <div className="vendor-create-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <input
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    //  onClick={handleGetStoreDrop}
                                                                    id="vendor-crt-input"
                                                                    className={`vendor-crt-input`}
                                                                    //  value={storeName}
                                                                    placeholder=" "
                                                                    required
                                                                    readOnly
                                                                />
                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-earth-americas"></i> Country</label>
                                                                <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                                                <ul className="dropdown-menu storename-dropdown-menu">

                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                        >
                                                                            Other
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 login-input-group">
                                                            <div className="vendor-create-container">
                                                                <input type="number" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-location-crosshairs"></i> Mobile Number</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 login-input-group">
                                                            <div className="vendor-create-container">
                                                                <input type="text" autoComplete="off" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-code-compare"></i> Language Code</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 login-input-group">
                                                            <div className="vendor-create-container">
                                                                <input type="text" autoComplete="off" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-envelope"></i>  Email</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 login-input-group">
                                                            <div className="vendor-create-container">
                                                                <input type="text" autoComplete="off" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-layer-group"></i> Groups</label>
                                                            </div>
                                                        </div>
                                                        <div className="form-check form-switch ms-1 is-filled text-start">
                                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                                            /> <span className="text-xs">Opt out Marketing Messages</span>
                                                        </div>
                                                    </div>
                                                    <div className="campaign-template mt-5 mx-4">
                                                        <h6 className="campaign-temp-head">Other Information</h6>
                                                        <div className="row">
                                                            <div className="col-md-6 login-input-group">
                                                                <div className="vendor-create-container">
                                                                <input type="date" autoComplete="off" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-calendar"></i> DOB</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 login-input-group">
                                                                <div className="vendor-create-container">
                                                                    <input type="text" autoComplete="off" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-address-book"></i> Address</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 login-input-group">
                                                                <div className="vendor-create-container">
                                                                    <input type="text" autoComplete="off" id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-street-view"></i> Loyalty_rs</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 login-input-group">
                                                                <div className=" vendor-contact-container" aria-expanded="false">
                                                                    <input type="date" id="vendor-crt-input" autoComplete="off" className="vendor-crt-input" placeholder=" " required />
                                                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label">Anniversary</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 login-input-group">
                                                            <div className="vendor-create-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <div>
                                                                    <input type="text" id="vendor-crt-input" readOnly
                                                                    value={genderDropDown} className="vendor-crt-input" placeholder=" " required />
                                                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-venus-double"></i> Gender</label>
                                                                    <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                                                </div>
                                                                <ul className="contatStore-dropdown-menu template-dropdown dropdown-menu">
                                                                <li><a className="dropdown-item" onClick={()=>setgenderDropDown("Male")}>Male</a></li>
                                                                <li><a className="dropdown-item" onClick={()=>setgenderDropDown("Female")}>Female</a></li>
                                                                <li><a className="dropdown-item" onClick={()=>setgenderDropDown("Others")}>Others</a></li>
                                                                </ul>
                                                            </div>
                                                            </div>
                                                            <div className="col-md-6 login-input-group">
                                                            <div className="vendor-contact-container" aria-expanded="false">
                                                                    <input type="text" id="vendor-crt-input" autoComplete="off" className="vendor-crt-input" placeholder=" " required />
                                                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label">Sale Amount</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="modal-footer text-end vendor-view-footer ms-4 mx-4">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="vendorview" aria-labelledby="vendorcontactLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
               <div className="modal-content all-modal-content vendorcontact-modal-content">
                  <div className="modal-header vendorcontact-modal-header border-0">
                     <h5 className="modal-title vendorcontact-modal-title" id="vendorcontactLabel" onClick={contactListGet}>
                        Edit Contact
                     </h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="row modal-container-size modal-body vendorcontact-modal-body">
                     <div className="row mt-n4">
                        {/*{/ <h5 className="text-center mt-4"><u>Vendor Admin User</u></h5> /}*/}
                        <div className="col-md-6 login-input-group">
                           <div className="vendor-create-container">
                              <input type="text" id="vendor-crt-input" value={fName} className="vendor-crt-input"
                                
                                 autoComplete="off" onChange={(e) => setFName(e.target.value)}
                                 placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-user"></i> First Name</label>
                           </div>
                          
                        </div>
                        <div className="col-md-6 login-input-group">
                           <div className="vendor-create-container">
                              <input type="text" id="vendor-crt-input" value={lName}
                                 autoComplete="off" onChange={(e) => setLName(e.target.value)}
                                 className="vendor-crt-input" placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-user"></i> Last Name</label>
                           </div>
                        </div>
                        <div className="col-md-6 login-input-group">
                           <div className="vendor-create-container dropdown">
                              <input type="text" id="vendor-crt-input dropdown" data-bs-toggle="dropdown" aria-expanded="false"
                                
                                 onClick={handleCountryDrop} value={countryName}
                                 autoComplete="off" onChange={(e) => setcountryName(e.target.value)} className="vendor-crt-input" placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-id-card-clip"></i> Country</label>
                              <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                              <ul className="dropdown-menu template-dropdown  storename-dropdown-menu">
                              {filteredCountryDrop.length === 0 ? (
                                 <li className="dropdown-nodata-found">No data found</li>
                              ) : (
                                 filteredCountryDrop.map((dropdownValue, id) => (
                                    <li key={id}>
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => { setcountryName(dropdownValue?.name) }}
                                       >
                                          {dropdownValue?.name}
                                       </a>
                                    </li>
                                 )))}
                              </ul>

                           </div>
                           
                        </div>
                        <div className="col-md-6 login-input-group">
                           <div className="vendor-create-container">
                              <input type="text" id="vendor-crt-input" autoComplete="off" value={mobNumber} className="vendor-crt-input" placeholder=" "
                                 
                                 maxLength={12} required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-mobile-button"></i> Mobile Number</label>
                           </div>
                           
                        </div>
                        <div className="col-md-6 login-input-group">
                           <div className="edit-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                              <input
                                 
                                 type="text"
                                 id="vendor-crt-input"
                                 className="vendor-crt-input"
                                 placeholder=" "
                                 required
                                 value={langName}
                                 onClick={languageCodeDropdwon}
                                 autoComplete="off" onChange={(e) => setLangName(e.target.value)}
                              />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                 <i className="fa-solid fa-at"></i> Language Code
                              </label>
                              <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                              <ul className="dropdown-menu template-dropdown w-100" >
                              {filteredLangCodeDrop.length === 0 ? (
                                 <li className="dropdown-nodata-found">No data found</li>
                              ) : (
                                 filteredLangCodeDrop.map((dropdownValue, id) => (                                    
                                 <li key={id}>
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => { setLanguageCode(dropdownValue?.language_code); setLangName(dropdownValue?.language_name); }}
                                       >
                                          {dropdownValue?.language_name}
                                       </a>
                                    </li>
                                 )))}
                              </ul>
                           </div>
                           
                        </div>
                        <div className="col-md-6 login-input-group">
                           <div className="vendor-create-container">
                              <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} 
                              placeholder=" "
                              style={
                                email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                                   ? { borderColor: "red" }
                                   : {}
                                }
                                className={`vendor-crt-input loginfilled-frame-username ${
                                email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                                   ? "error"
                                   : ""
                                }`}
                                 required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-at"></i> Email</label>
                           </div>
                           {email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                           <div className="text-danger error-message-required">Invalid email format</div>
                        )}
                        </div>
                        <div className="col-md-6 login-input-group">
                           <div className="vendor-create-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                              <input type="text" id="vendor-crt-input"
                                
                                 onClick={handleGetStoreDrop} value={storeName}
                                 autoComplete="off" onChange={(e)=>setStoreName(e.target.value)} className="vendor-crt-input" placeholder=" " required />
                              <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-id-card-clip"></i> Store</label>
                              <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                              <ul className="contatStore-dropdown-menu template-dropdown dropdown-menu">
                              {filteredStoreDrop.length === 0 ? (
                                 <li className="dropdown-nodata-found">No data found</li>
                              ) : (
                                 filteredStoreDrop.map((dropdownValue, id) => (
                                    <li key={id}>
                                       <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => { setStoreName(dropdownValue.store_name); setStoreId(dropdownValue?.id) }}
                                       >
                                          {dropdownValue?.store_name}
                                       </a>
                                    </li>
                                 )))}
                              </ul>
                           </div>
                           
                        </div>
                        <div className="col-md-6 login-input-group">
                           <div className="vendor-create-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                              <div>
                                 <input type="text" id="vendor-crt-input" readOnly
                                    
                                    onClick={handleGetGroupDrop} value={groupName.map(group => group.groupName).join(', ')} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-id-card-clip"></i> Group</label>
                                 <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                              </div>
                              <ul className="contatStore-dropdown-menu template-dropdown dropdown-menu">
                                 {groupDropDown?.map((dropdownValue, id) => (
                                    <li key={id} >
                                       <a
                                          className="dropdown-item "
                                          href="#"
                                          onClick={() => handleSelectGroup(dropdownValue)}
                                       >
                                          {dropdownValue?.group_name}
                                       </a>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           {groupName.map((item, index) => (
                              <div className="border mt-1 px-1" key={index} style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '5px', marginRight: '10px', borderRadius: '5px' }}>
                                 <span style={{ marginRight: '4px', fontSize: '10px', }}>{item.groupName}</span>
                                 <button
                                    style={{
                                       background: 'none',
                                       border: 'none',
                                       cursor: 'pointer',
                                       fontSize: '10px',
                                       color: '#a1a1a1',
                                       padding: '0'
                                    }}
                                    onClick={() => handleSelectGroupName(item)}
                                 >
                                    <i className="fa-solid fa-xmark group-xmark"></i>
                                 </button>
                              </div>
                           ))}
                          
                        </div>
                        <div className="col-md-6 mt-2">
                           <div className="form-check form-switch ms-1 is-filled">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="flexSwitchCheckDefault"
                              /> <span className="text-xs">Opt out Marketing Messages</span>
                           </div>
                        </div>
                        <div className="campaign-template mt-5">
                           <h6 className="campaign-temp-head">Other Information</h6>
                           <div className="row">
                           <div className="col-md-6 login-input-group">
                              <div className="vendor-contact-container" aria-expanded="false">
                                 <input type="date" id="vendor-crt-input" autoComplete="off" onChange={(e) => setDate(e.target.value)} value={date} className="vendor-crt-input" placeholder=" " />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label"> Date of birth</label>
                              </div>
                              </div>
                              <div className="col-md-6 login-input-group">
                              <div className="vendor-contact-container" aria-expanded="false">
                                 <div className="vendor-create-container">
                                    <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e) => setAddress(e.target.value)} value={address} className="vendor-crt-input" placeholder=" "
                                        required />
                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label"> Address</label>
                                 </div>
                                
                              </div>
                              </div>
                              <div className="col-md-6 login-input-group">
                              <div className="vendor-contact-container" aria-expanded="false">
                                 <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e) => setLoyality(e.target.value)} value={loyality} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label"> Loyalty_rs</label>
                              </div>
                              </div>
                              <div className="col-md-6 login-input-group">
                              <div className=" vendor-contact-container" aria-expanded="false">
                                 <input type="date" id="vendor-crt-input" autoComplete="off" onChange={(e) => setAnniversary(e.target.value)} value={anniversary} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label">Anniversary</label>
                              </div>
                              </div>

                           <div className="col-md-6 login-input-group">
                           <div className="vendor-create-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                              <div>
                                 <input type="text" id="vendor-crt-input" readOnly
                                   value={genderDropDown} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-venus-double"></i> Gender</label>
                                 <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                              </div>
                              <ul className="contatStore-dropdown-menu template-dropdown dropdown-menu">
                              <li><a className="dropdown-item" onClick={()=>setgenderDropDown("Male")}>Male</a></li>
                              <li><a className="dropdown-item" onClick={()=>setgenderDropDown("Female")}>Female</a></li>
                              <li><a className="dropdown-item" onClick={()=>setgenderDropDown("Others")}>Others</a></li>
                              </ul>
                           </div>
                           
                        </div>
                        <div className="col-md-6 login-input-group">
                        <div className="vendor-contact-container" aria-expanded="false">
                                 <input type="text" id="vendor-crt-input" autoComplete="off" onChange={(e) => setsaleAmount(e.target.value)} value={saleAmount} className="vendor-crt-input" placeholder=" " required />
                                 <label htmlFor="vendor-crt-input" className="vendor-crt-label">Sale Amount</label>
                              </div>
                           </div>
                        </div>
                        </div>
                     </div>
                  </div>
                  <div className="modal-footer vendorcreate-modal-footer border-0">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeCreate">Close</button>
                     <button onClick={contactUpdate} type="button" className="btn btn-primary">
                           Submit
                     </button>
                  </div>
               </div>
            </div>
         </div>
                                    <div className="bg-white card campaign-template mt-5">
                                        <h6 className="campaign-temp-head">Assign Team Member</h6>
                                        <div>
                                            <div className="vendor-create-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                <input
                                                    type="text"
                                                    id="vendor-crt-input"
                                                    className={"vendor-crt-input loginfilled-frame-username"}
                                                    placeholder=" "
                                                    required
                                                    readOnly
                                                />
                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-phone"></i> Not Assigned</label>
                                                <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                                <ul className="dropdown-menu storename-dropdown-menu team-dropdown-menu">
                                                    <li >
                                                        <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        > Not Assigned
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        > GRP Mr
                                                        </a>
                                                    </li>
                                                </ul>

                                            </div>
                                            <div className="text-end">
                                                <button className="vendor-crt-btn" >Save</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white card campaign-template mt-5">
                                        <h6 className="campaign-temp-head">Priority / Task Status</h6>
                                        <div>
                                            <div className="vendor-create-container dropdown mt-3" data-bs-toggle="dropdown" aria-expanded="false">
                                                <input
                                                    type="text"
                                                    id="vendor-crt-input"
                                                    className={"vendor-crt-input loginfilled-frame-username"}
                                                    placeholder=" "
                                                    required
                                                    readOnly
                                                />
                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" 
                                                    width="13px" height="13px" viewBox="0 0 52 52" enable-background="new 0 0 52 52">
                                                <g>
                                                    <path fill="gray" d="M9,3.5C9,2.7,8.3,2,7.5,2h-3C3.7,2,3,2.7,3,3.5v45C3,49.3,3.7,50,4.5,50h3C8.3,50,9,49.3,9,48.5V3.5z"/>
                                                    <path fill="gray" d="M47.5,7.7c-16,8.4-14.2-8.8-33.5-2.1c-0.6,0.2-1,0.8-1,1.4v23.3c0,0.7,0.7,1.2,1.3,0.9
                                                        c19.2-6.4,17.2,11.2,33.9,1.8c0.5-0.3,0.8-0.8,0.8-1.3V8.5C49,7.8,48.2,7.3,47.5,7.7z"/>
                                                </g>
                                                </svg> Priority</label>
                                                <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                                <ul className="dropdown-menu storename-dropdown-menu team-dropdown-menu">
                                                <li >
                                                        <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        > High
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        >Medium
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        >Low
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="vendor-create-container dropdown mt-3" data-bs-toggle="dropdown" aria-expanded="false">
                                                <input
                                                    type="text"
                                                    id="vendor-crt-input"
                                                    className={"vendor-crt-input loginfilled-frame-username"}
                                                    placeholder=" "
                                                    required
                                                    readOnly
                                                />
                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                                <svg fill="gray" height="13px" width="13px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                                                    viewBox="0 0 470.767 470.767">
                                                <g>
                                                    <path d="M362.965,21.384H289.62L286.638,7.99C285.614,3.323,281.467,0,276.685,0h-82.618c-4.782,0-8.913,3.323-9.953,7.99
                                                        l-2.967,13.394h-73.36c-26.835,0-48.654,21.827-48.654,48.662v352.06c0,26.835,21.819,48.662,48.654,48.662h255.179
                                                        c26.835,0,48.67-21.827,48.67-48.662V70.046C411.635,43.211,389.8,21.384,362.965,21.384z M379.831,422.105
                                                        c0,9.295-7.563,16.858-16.866,16.858H107.786c-9.287,0-16.85-7.563-16.85-16.858V70.046c0-9.295,7.563-16.857,16.85-16.857h66.294
                                                        l-1.692,7.609c-0.684,3.02,0.062,6.188,1.988,8.596c1.94,2.415,4.876,3.82,7.965,3.82h106.082c3.091,0,6.026-1.405,7.951-3.82
                                                        c1.942-2.415,2.687-5.575,2.004-8.596l-1.692-7.609h66.279c9.303,0,16.866,7.563,16.866,16.857V422.105z"/>
                                                    <path d="M170.835,188.426h43.249l-10.279-7.019c-14.506-9.899-18.232-29.693-8.325-44.197c9.893-14.489,29.693-18.239,44.197-8.324
                                                        l1.694,1.157v-12.136c0-7.866-6.383-14.248-14.242-14.248h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.271
                                                        C156.595,182.045,162.978,188.426,170.835,188.426z"/>
                                                    <path d="M303.256,110.313l-49.85,47.194l-22.704-15.49c-7.221-4.962-17.13-3.083-22.099,4.162
                                                        c-4.954,7.251-3.09,17.144,4.178,22.098l33.28,22.727c2.718,1.864,5.839,2.772,8.961,2.772c3.96,0,7.888-1.474,10.933-4.356
                                                        l59.167-56.014c6.382-6.033,6.645-16.104,0.62-22.479C319.686,104.552,309.637,104.28,303.256,110.313z"/>
                                                    <path d="M170.835,297.669H214.1l-10.295-7.027c-14.506-9.901-18.232-29.693-8.325-44.197c9.893-14.498,29.693-18.248,44.197-8.325
                                                        l1.694,1.158v-12.136c0-7.865-6.383-14.248-14.242-14.248h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.279
                                                        C156.595,291.286,162.978,297.669,170.835,297.669z"/>
                                                    <path d="M303.256,219.555l-49.85,47.186l-22.704-15.49c-7.221-4.97-17.13-3.098-22.099,4.162
                                                        c-4.954,7.253-3.09,17.144,4.178,22.099l33.28,22.727c2.718,1.864,5.839,2.772,8.961,2.772c3.96,0,7.888-1.476,10.933-4.356
                                                        l59.167-56.007c6.382-6.033,6.645-16.096,0.62-22.479C319.686,213.793,309.637,213.529,303.256,219.555z"/>
                                                    <path d="M227.129,322.135h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.271c0,7.865,6.383,14.248,14.24,14.248h56.294
                                                        c7.859,0,14.242-6.383,14.242-14.248v-56.271C241.371,328.518,234.988,322.135,227.129,322.135z"/>
                                                </g>
                                                </svg> Task Status</label>
                                                <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                                <ul className="dropdown-menu storename-dropdown-menu team-dropdown-menu">
                                                <li >
                                                        <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        > Yet to start
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        >Inprogress
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        >Completed
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="text-end mt-3">
                                                <button className="vendor-crt-btn" >Save</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Chat Delete Modal*/}
                        <div className="modal fade" id="chatdelete" tab-Index="-1" aria-labelledby="vendordeleteLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content all-modal-content vendor-delete-content">
                                <div className=" vendor-delete-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body vendor-delete-body">
                                    <div className="row">
                                    <div className="vendor-delete-icon">
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                    </div>
                                    <div>
                                    <h4 className="modal-confirm-head">Are you sure you want to clear chat history for this contact?                                                </h4>
                                    <h6 className="modal-confirm-subhead">Only chat history will be deleted permanently, it won't delete campaign messages.</h6>
                                    </div>
                                    </div>
                                </div>
                                <div className="modal-footer text-center vendor-delete-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closedeleteModal">No</button>&nbsp;
                                    <button type="button" className="btn btn-primary" onClick={handleChatClear}>Yes</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}

export default WhatsApp_Chat;
