import React, { useEffect,useState } from "react";
import image1 from "../../../assets/img/gallery/grallery1.jpg";
import image2 from "../../../assets/img/gallery/grallery2.jpg";
import image3 from "../../../assets/img/gallery/gallery3.jpg";
import image4 from "../../../assets/img/gallery/gallery4.jpg";
import image5 from "../../../assets/img/gallery/gallery5.jpg";
import image6 from "../../../assets/img/gallery/gallery6.jpg";
import image7 from "../../../assets/img/gallery/gallery7.jpg";
import UserAPI from "../../../api/services/userapi";
import { baseURL } from "../../../api/api";

function GalleryInfo() {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [gallery,setgallery]=useState([]);
  const [totalRecords,setTotalRecords]=useState(0);
  const [currentPage,setcurrentPage]=useState(1);
  const [recordsPerPage,setrecordsPerPage]=useState(10);

  const galleryAPI = async (page) => {
    // setLoading(true);
    try {
      const responseData = await UserAPI.galleryAPIEP({
        pageIndex: page - 1,
        dataLength: recordsPerPage,
      });
      if (responseData.apiStatus.code === "200") {
        setgallery(responseData.responseData.galleryInfo);
        const totalRecords = responseData.responseData.totalRecordCount;
        setTotalRecords(totalRecords);
      } else {
      }
    } catch(error) {
      console.error(error);
    }
  };
  useEffect(() => {
    galleryAPI(currentPage);
  }, [currentPage]);
  // const gallery = [
  //   {
  //     image: image1,
  //     name: "Image 1",
  //     description: "Image one is a beautiful image.",
  //   },
  //   {
  //     image: image2,
  //     name: "Image 2",
  //     description: "Image two is a beautiful image.",
  //   },
  //   {
  //     image: image3,
  //     name: "Image 3",
  //     description: "Image three is a beautiful image.",
  //   },
  //   {
  //     image: image4,
  //     name: "Image 4",
  //     description: "Image four is a beautiful image.",
  //   },
  //   {
  //     image: image5,
  //     name: "Image 5",
  //     description: "Image five is a beautiful image.",
  //   },
  //   {
  //     image: image6,
  //     name: "Image 6",
  //     description: "Image six is a beautiful image.",
  //   },
  //   {
  //     image: image7,
  //     name: "Image 7",
  //     description: "Image seven is a beautiful image.",
  //   },
  // ];

  return (
    <div className="row mb-5 container-fluid">
      <div className="container section-title mt-5" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>A collection of our latest and most memorable moments.</p>
      </div>

      {gallery.map((item, index) => (
        <div
          key={index}
          className="col-md-3 mt-3 d-flex justify-content-center"
        >
          <div className="card">
            <div className="profile-pic">
              <img
                src={baseURL+item.path+item.altered_file_name}
                alt={item.heading}
                className="img-fluid"
                style={{ cursor: "pointer" }}
                onClick={() => setFullscreenImage(baseURL+item.path+item.altered_file_name)}
              />
            </div>

            <div className="bottom">
              <div className="content">
                <span className="name">{item.heading}</span>
                <span className="about-me">{item.description}</span>
              </div>

              <div className="bottom-bottom">
                <button className="button">{item.heading}</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out",
            zIndex: 9999,
          }}
        >
          <img
            src={fullscreenImage}
            alt="fullscreen"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
            }}
          />
        </div>
      )} */}

      {fullscreenImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setFullscreenImage(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "35px",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              zIndex: 100000,
            }}
          >
            ✕
          </button>

          {/* Fullscreen Image */}
          <img
            src={fullscreenImage}
            alt="fullscreen"
            style={{
              maxWidth: "95vw",
              maxHeight: "95vh",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default GalleryInfo;
