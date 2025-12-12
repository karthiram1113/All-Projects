// import React, { useState } from "react";
// import "./index.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faAngleDown,faTimes,faLocationCrosshairs,faMapLocationDot,faPlus,} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// function Location() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [detectedAddress, setDetectedAddress] = useState("");
//   const [isDetecting, setIsDetecting] = useState(false);

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   const detectLocation = async () => {
//     setIsDetecting(true);
//     setDetectedAddress("Detecting your location...");

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;

//           try {
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
//             );
//             const data = await response.json();
//             setDetectedAddress(data.display_name || "Unable to fetch address");
//           } catch (error) {
//             console.error("Error fetching address:", error);
//             setDetectedAddress("Unable to fetch address");
//           } finally {
//             setIsDetecting(false);
//           }
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           setDetectedAddress("Location access denied");
//           setIsDetecting(false);
//         }
//       );
//     } else {
//       setDetectedAddress("Geolocation is not supported by your browser");
//       setIsDetecting(false);
//     }
//   };

//   return (
//     <div className="location-container">
//       <button className="navbar_location" onClick={togglePopup}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           width="28"
//           height="28"
//           fill="currentColor"
//         >
//           <path d="M12 2C8.134 2 5 5.134 5 9c0 4.736 6.657 11.667 6.904 11.917a1 1 0 0 0 1.192 0C12.343 20.667 19 13.736 19 9c0-3.866-3.134-7-7-7zm0 17.293C10.229 17.013 7 12.618 7 9c0-2.757 2.243-5 5-5s5 2.243 5 5c0 3.618-3.229 8.013-5 10.293z" />
//           <circle cx="12" cy="9" r="2.5" />
//         </svg>
//         Select Location <FontAwesomeIcon icon={faAngleDown} className="location-down-arrow" />
//       </button>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content rounded-0">
//             <div className="popup-header">
//               <h3>Select Delivery Location</h3>
//               <button className="close-btn" onClick={closePopup}>
//                 <FontAwesomeIcon icon={faTimes} />
//               </button>
//             </div>
//             <div className="popup-body text-start">
//               <p>Select a delivery location to see product availability, offers and discounts.</p>
//               <div className="row">
//                 <div className="col-md-12 saved-address-card p-3">
//                   <div className="d-flex justify-content-between">
//                     <h6>bharathi</h6>
//                   </div>
//                   <small>
//                     2/52, your area, land mark,
//                     <br />
//                     madurai-623601, Tamilnadu
//                     <br />
//                     Phone:+91 00000 00000
//                   </small>
//                   <br />
//                   <small className="text-secondary">Default address</small>
//                 </div>
//                 <div className="col-md-12 saved-address-card p-3 mt-3 text-center">
//                   <Link to={"/MyAccount"}>
//                     <button className="mt-4 location-new-add-btn">
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                   </Link>
//                   <h6 className="mt-1">Add New Address</h6>
//                 </div>
//                 <div className="mt-4">
//                   <h6
//                     className="detect-location-field"
//                     onClick={detectLocation}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <FontAwesomeIcon icon={faLocationCrosshairs} color="#007bff" />{" "}
//                     {isDetecting ? "Detecting..." : "Detect My Location"}
//                   </h6>
//                   {detectedAddress && (
//                     <p className="mt-2">
//                       <FontAwesomeIcon icon={faMapLocationDot} /> {detectedAddress}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Location;

import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faTimes,
  faLocationCrosshairs,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Location() {
  const [showPopup, setShowPopup] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const detectLocation = async () => {
    setIsDetecting(true);
    setDetectedAddress("Detecting your location...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude, "gdgd");

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.address;
            const district =
              address.village ||
              address.town ||
              address.city ||
              address.county ||
              "Unknown Location";
            const pincode = address.postcode || "000000";
            setDetectedAddress(`Delivery to, ${district}...${pincode}`);
            closePopup();
          } catch (error) {
            console.error("Error fetching address:", error);
            setDetectedAddress("Unable to fetch address");
          } finally {
            setIsDetecting(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setDetectedAddress("Location access denied");
          setIsDetecting(false);
        }
      );
    } else {
      setDetectedAddress("Geolocation is not supported by your browser");
      setIsDetecting(false);
    }
  };

  return (
    <div className="location-container">
      {!detectedAddress ? (
        <button className="navbar_location" onClick={togglePopup}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
          >
            <path d="M12 2C8.134 2 5 5.134 5 9c0 4.736 6.657 11.667 6.904 11.917a1 1 0 0 0 1.192 0C12.343 20.667 19 13.736 19 9c0-3.866-3.134-7-7-7zm0 17.293C10.229 17.013 7 12.618 7 9c0-2.757 2.243-5 5-5s5 2.243 5 5c0 3.618-3.229 8.013-5 10.293z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Select Location <FontAwesomeIcon icon={faAngleDown} className="location-down-arrow" />
        </button>
      ) : (
        <button className="navbar_location" onClick={togglePopup}>
          <FontAwesomeIcon icon={faLocationDot} className="text-secondary" /> {detectedAddress}
        </button>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content rounded-0">
            <div className="popup-header">
              <h3>Select Delivery Location</h3>
              <button className="close-btn" onClick={closePopup}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="popup-body text-start">
              <p>Select a delivery location to see product availability, offers and discounts.</p>
              <div className="row">
                <div className="col-md-12 saved-address-card p-3">
                  <div className="d-flex justify-content-between">
                    <h6>bharathi</h6>
                  </div>
                  <small>
                    2/52, your area, land mark,
                    <br />
                    madurai-623601, Tamilnadu
                    <br />
                    Phone:+91 00000 00000
                  </small>
                  <br />
                  <small className="text-secondary">Default address</small>
                </div>
                <div className="col-md-12 saved-address-card p-3 mt-3 text-center">
                  <Link to={"/MyAccount"}>
                    <button className="mt-4 location-new-add-btn">
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </Link>
                  <h6 className="mt-1">Add New Address</h6>
                </div>
                <div className="mt-4">
                  <h6
                    className="detect-location-field"
                    onClick={detectLocation}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faLocationCrosshairs} color="#007bff" />{" "}
                    {isDetecting ? "Detecting..." : "Detect My Location"}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;
