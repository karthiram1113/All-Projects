import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCirclePlus, faEllipsisVertical, faPencil, faCompass, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DeliveryAddress from '../../../assets/profile-location.webp';

const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYS1zaHJlZSIsImEiOiJjbHo4OWF6ZHgwMGwxMmxzYWxzaTk1YnNiIn0.hpbbzYRq7WOaOPwInekf9w"; // Replace with your Mapbox token

function Address_Location() {
  const mapContainer = useRef(null);
  const [mapLat, setMapLat] = useState(12.9040384);
  const [mapLng, setMapLng] = useState(80.0882688);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [confirmAddress, setconfirmAddress] = useState(false);
  const [displayedAddress, setDisplayedAddress] = useState("Fetching address...");
  const [addressDetails, setAddressDetails] = useState({
    pinCode: "",
    houseNo: "",
    fullAddress: "",
    landmark: "",
    cityState: "",
  });

  const [savedAddresses, setSavedAddresses] = useState([]); // State to store saved addresses

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const address = data.features[0];
        const pinCode = address.context.find((item) => item.id.startsWith("postcode"))?.text || "";
        const cityState = `${address.context.find((item) => item.id.startsWith("place"))?.text || ""},
                 ${address.context.find((item) => item.id.startsWith("region"))?.text || ""
          }`;
        const landmark = address.text || "";
        const fullAddress = address.place_name || "";

        setAddressDetails({
          pinCode,
          houseNo: "",
          fullAddress,
          landmark,
          cityState,
        });

        return fullAddress;
      }
      return "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching address";
    }
  };

  const handleShowMap = async () => {
    setShowMap(true);
    const address = await fetchAddress(mapLat, mapLng);
    setDisplayedAddress(address);
  };

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (mapContainer.current && showMap) {
      const initialMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [mapLng, mapLat],
        zoom: 14,
      });
      initialMap.addControl(new mapboxgl.NavigationControl(), "top-right");
      setMap(initialMap);

      const newMarker = new mapboxgl.Marker({ color: "#014DC0", draggable: true })
        .setLngLat([mapLng, mapLat])
        .addTo(initialMap);
      setMarker(newMarker);

      newMarker.on("dragend", async () => {
        const newLngLat = newMarker.getLngLat();
        setMapLat(newLngLat.lat);
        setMapLng(newLngLat.lng);
        const address = await fetchAddress(newLngLat.lat, newLngLat.lng);
        setDisplayedAddress(address);
      });

      return () => {
        initialMap.remove();
      };
    }
  }, [showMap]);

  useEffect(() => {
    if (map) {
      map.flyTo({
        center: [mapLng, mapLat],
        essential: true,
        speed: 0.3,
        curve: 1,
        zoom: 14,
      });

      if (marker) {
        marker.setLngLat([mapLng, mapLat]);
      }
    }
  }, [mapLat, mapLng, map, marker]);

  const handleSaveAddress = () => {
    const newAddress = {
      houseNo: addressDetails.houseNo,
      fullAddress: addressDetails.fullAddress,
      landmark: addressDetails.landmark,
      cityState: addressDetails.cityState,
      pinCode: addressDetails.pinCode,
    };
    setconfirmAddress(true);
    setSavedAddresses((prevSavedAddresses) => [...prevSavedAddresses, newAddress]);
    setAddressDetails({
      pinCode: "",
      houseNo: "",
      fullAddress: "",
      landmark: "",
      cityState: "",
    });
  };

  return (
    <>
      <h3>Delivery Address</h3>
      <hr />
      {confirmAddress ? ( 
        <div>
          <div className="row">
            <div className="border-bottom">
              <h5>Saved Addresses</h5>
            </div>
            {savedAddresses.length === 0 ? (
              <p>No addresses saved yet.</p>
            ) : (
              savedAddresses.map((address, index) => (
                <div key={index} className="mt-4 col-md-5 saved-address-card p-3">
                  <div className="d-flex justify-content-between">
                    <h6>{address.houseNo}</h6>
                    <div className="dropdown dropstart">
                      <span type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsisVertical} className="saved-address-dot" />
                      </span>
                      <ul className="dropdown-menu dropdown-content-div" aria-labelledby="dropdownMenuButton1">
                        <li>
                          <a className="dropdown-item" href="#">
                            <FontAwesomeIcon icon={faPencil} /> Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <FontAwesomeIcon icon={faTrashCan} /> Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <small>
                    {address.fullAddress}, {address.pinCode}
                  </small>
                  <br />
                  <small className="text-secondary">Default address</small>
                </div>
              ))
            )}
            <div className="col-md-12 text-center">
              <button className="mt-4 order-shop-btn">
                <FontAwesomeIcon icon={faPlus} /> Add New Address
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center">
            <img src={DeliveryAddress} height={'250px'} />
            <h6>You don't have any address saved!</h6>
            <p>Please provide your address details to find the best<br /> products and offers in your area.</p>
            <button className="order-shop-btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><FontAwesomeIcon icon={faPlus} /> Add New Address</button>
          </div>

          <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className={`modal-dialog ${showMap ? "modal-lg" : "modal-lg"}`}>
              <div className="modal-content popup-add-address">
                <div className="modal-header">
                  <h1 className="modal-title fs-2" id="exampleModalLabel">
                    Delivery Location
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="p-2">
                    <div className="text-center">
                      <button onClick={handleShowMap} className="current-location-btn">
                        <FontAwesomeIcon icon={faCompass} color="rgb(16, 137, 186)" />
                        {" "}Current Location
                      </button>
                      {showMap && (
                        <>
                          <div
                            ref={mapContainer}
                            style={{
                              marginTop: "1rem",
                              width: "100%",
                              height: "300px",
                              border: "1px solid #ccc",
                            }}
                          />
                          <div className="location-details mt-3">
                            <h5 className="text-secondary">Your Location</h5>
                            <p className="map-address-base">
                              <FontAwesomeIcon icon={faLocationDot} color="rgb(16, 137, 186)" /> {displayedAddress}
                            </p>
                          </div>
                          <div className="text-center mt-3">
                            <button
                              type="button"
                              className="address-save-button-add"
                              data-bs-target="#exampleModalToggle2"
                              data-bs-toggle="modal"
                            >
                              Confirm Location
                            </button>
                          </div>
                        </>
                      )}
                      <div className="d-flex gap-2 justify-content-center mt-2">
                        <p className="b-right-left"></p>
                        <p>OR</p>
                        <p className="b-right-left"></p>
                      </div>
                      <div>
                        <button
                          className="current-location-btn"
                          data-bs-target="#exampleModalToggle3"
                          data-bs-toggle="modal"
                        >
                          <FontAwesomeIcon icon={faCirclePlus} color="rgb(16, 137, 186)" /> Type Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content popup-add-address">
                <div className="modal-header">
                  <h1 className="modal-title fs-2" id="exampleModalLabel">
                    <FontAwesomeIcon icon={faCirclePlus} color="rgb(16, 137, 186)" /> Add Address
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="p-2">
                    <h5 className="add-address-header">Address Details :</h5>
                  </div>
                  <form className="p-4">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label input-label-header">Pin Code*</label>
                        <input type="text" className="form-control border-0 add-address-input" value={addressDetails.pinCode} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label input-label-header">House No.</label>
                        <input type="text" className="form-control border-0 add-address-input" value={addressDetails.houseNo} onChange={(e) => setAddressDetails({ ...addressDetails, houseNo: e.target.value })} />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label input-label-header">Address</label>
                        <textarea type="text" className="form-control border-0 add-address-input" value={addressDetails.fullAddress} onChange={(e) => setAddressDetails({ ...addressDetails, fullAddress: e.target.value })} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label input-label-header">Landmark / Area</label>
                        <input type="text" className="form-control border-0 add-address-input" value={addressDetails.landmark} onChange={(e) => setAddressDetails({ ...addressDetails, landmark: e.target.value })} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label input-label-header">City, State</label>
                        <input type="text" className="form-control border-0 add-address-input" value={addressDetails.cityState} onChange={(e) => setAddressDetails({ ...addressDetails, cityState: e.target.value })} />
                      </div>
                    </div>
                  </form>
                  <div>
                    <div className="p-2">
                      <h5 className="add-address-header">Delivery Contact Details :</h5>
                      <p>This mobile number will receive an OTP, required for collecting the order.</p>
                    </div>
                    <form className="p-2">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label input-label-header">Receiver's Name*</label>
                          <input type="text" className="form-control border-0 add-address-input" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label input-label-header">Receiver's Number*</label>
                          <input type="text" className="form-control border-0 add-address-input" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="text-center p-3">
                  <button type="button" className="address-save-button-add" onClick={handleSaveAddress} data-bs-dismiss="modal" aria-label="Close">
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content popup-add-address">
                <div className="modal-header">
                  <h1 className="modal-title fs-2" id="exampleModalLabel">
                    <FontAwesomeIcon icon={faCirclePlus} color="rgb(16, 137, 186)" /> Add Address
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="p-2">
                    <h5 className="add-address-header">Address Details :</h5>
                  </div>
                  <form className="p-4">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label input-label-header">Pin Code*</label>
                        <input type="text" className="form-control border-0 add-address-input" readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label input-label-header">House No.</label>
                        <input type="text" className="form-control border-0 add-address-input" />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label input-label-header">Address</label>
                        <textarea type="text" className="form-control border-0 add-address-input" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label input-label-header">Landmark / Area</label>
                        <input type="text" className="form-control border-0 add-address-input" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label input-label-header">City, State</label>
                        <input type="text" className="form-control border-0 add-address-input" />
                      </div>
                    </div>
                  </form>
                  <div>
                    <div className="p-2">
                      <h5 className="add-address-header">Delivery Contact Details :</h5>
                      <p>This mobile number will receive an OTP, required for collecting the order.</p>
                    </div>
                    <form className="p-2">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label input-label-header">Receiver's Name*</label>
                          <input type="text" className="form-control border-0 add-address-input" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label input-label-header">Receiver's Number*</label>
                          <input type="text" className="form-control border-0 add-address-input" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="text-center p-3">
                  <button type="button" className="address-save-button-add" data-bs-dismiss="modal" aria-label="Close">
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Address_Location;
