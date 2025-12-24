import React, { useEffect, useState } from "react";
import image1 from "../../../assets/img/gallery/grallery1.jpg";
import image2 from "../../../assets/img/gallery/grallery2.jpg";
import image3 from "../../../assets/img/gallery/gallery3.jpg";
import image4 from "../../../assets/img/gallery/gallery4.jpg";
import image5 from "../../../assets/img/gallery/gallery5.jpg";
import image6 from "../../../assets/img/gallery/gallery6.jpg";
import image7 from "../../../assets/img/gallery/gallery7.jpg";
import UserAPI from "../../../api/services/userapi";
import { baseURL } from "../../../api/api";
import NoDataFound from '../../../assets/img/nodata-found.png';
import { Modal } from "react-bootstrap";

function GalleryInfo() {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [gallery, setgallery] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [recordsPerPage, setrecordsPerPage] = useState(10);

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
    } catch (error) {
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





  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project); // optional
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="row mb-5 container-fluid">
        <div className="container section-title mt-5" data-aos="fade-up">
          <h2>Gallery</h2>
          <p>A collection of our latest and most memorable moments.</p>
        </div>

        {gallery.length === 0 ? (
          <div className="d-flex justify-content-center">
            <img
              src={NoDataFound}
              alt="No data found"
              style={{ maxWidth: "250px", height: "100%" }}
            />
          </div>
        ) : (gallery.map((item, index) => (
          <div
            key={index}
            className="col-md-3 mt-3 d-flex justify-content-center"
          >
            <div className="card">
              <div className="profile-pic">
                <img
                  src={baseURL + item.path + item.altered_file_name}
                  alt={item.heading}
                  className="img-fluid"
                  style={{ cursor: "pointer" }}
                  onClick={() => setFullscreenImage(baseURL + item.path + item.altered_file_name)}
                />
              </div>

              <div className="bottom">
                <div className="content">
                  <span className="name">{item.heading}</span>
                  <span className="about-me">{item.description}</span>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      key={item.id}
                      className="gallery-btn"
                      onClick={() => openModal(item)}
                    >
                      View
                    </button>
                  </div>
                 
                </div>

                <div className="bottom-bottom">
                  <button className="button">{item.heading}</button>
                </div>
              </div>
            </div>
          </div>
        )))}

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

      {/* modal view img */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        size="xl"
        className="project-large-modal"
      >
        <button
          className="project-custom-modal-close-btn"
          onClick={closeModal}
        >
          &times;
        </button>

        <Modal.Body className="p-4">
          <div className="row">
            <div className="col-md-5 d-flex align-items-center justify-content-center">
              <img
                src={
                  baseURL +
                  selectedProject?.path +
                  selectedProject?.altered_file_name
                }
                className="img-fluid rounded"
                style={{ maxHeight: "350px", objectFit: "cover" }}
                alt={selectedProject?.title}
              />
            </div>

            <div className="col-md-7">
              <h4 className="fw-bold mb-1">
                {selectedProject?.heading}
              </h4>

              {/* <p className="text-muted mb-2" style={{ fontSize: "12px" }}>
                {selectedProject?.category?.toUpperCase()}
              </p> */}

              <p
                className="text-muted mb-0"
                style={{ lineHeight: "1.6" }}
                dangerouslySetInnerHTML={{
                  __html: selectedProject?.description || "",
                }}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>



  );
}

export default GalleryInfo;
