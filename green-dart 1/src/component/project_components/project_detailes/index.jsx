import React, { useEffect, useState } from "react";
import img1 from "../../../assets/img/project/construction-1.jpg";
import img2 from "../../../assets/img/project/construction-2.jpg";
import img3 from "../../../assets/img/project/construction-3.jpg";
import img4 from "../../../assets/img/project/design-1.jpg";
import img5 from "../../../assets/img/project/design-2.jpg";
import img6 from "../../../assets/img/project/design-3.jpg";
import { baseURL } from "../../../api/api";

import AllIcon from "../../../assets/img/project/labour.png";
import OngoingIcon from "../../../assets/img/project/builder (2).png";
import UpcomingIcon from "../../../assets/img/project/builder (1).png";
import FinishedIcon from "../../../assets/img/project/builder.png";
 
import { Modal } from "react-bootstrap";
import UserAPI from "../../../api/services/userapi";
import Loading from "../../common/loading";
 
function Project_detailes() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectData,setprojectList]=useState([]);
    const [totalRecords,setTotalRecords]=useState(0);
    const [currentPage,setcurrentPage]=useState(1);
    const [recordsPerPage,setrecordsPerPage]=useState(10);
    const projectListAPI = async (page) => {
        setLoading(true);
        try {
        const responseData = await UserAPI.projectAPI({
            pageIndex: page - 1,
            dataLength: recordsPerPage,
            projectStatus:activeFilter
        });
        if (responseData.apiStatus.code === "200") {
            setTimeout(()=>{setLoading(false)},500)
            //  setLoading(false);
            setprojectList(responseData.responseData.projectInfo);
            const totalRecords = responseData.responseData.totalRecordCount;
            setTotalRecords(totalRecords);
        } else {
            setLoading(false);
        }
        } catch(error) {
        console.error(error);
        setLoading(false);
        }
    };
    useEffect(() => {
        projectListAPI(currentPage);
    }, [currentPage,activeFilter]);

    // const projectData = [
    //     {
    //         id: 1,
    //         category: "Finished",
    //         image: img1,
    //         title: "Luxury Kitchen Remodeling",
    //         description:
    //             "A full kitchen transformation with premium materials, modular storage, and energy-efficient lighting.",
    //     },
    //     {
    //         id: 2,
    //         category: "On-going",
    //         image: img2,
    //         title: "City Bridge Construction",
    //         description:
    //             "A multi-phase infrastructure project designed to improve city connectivity and traffic flow.",
    //     },
    //     {
    //         id: 3,
    //         category: "Up-coming",
    //         image: img3,
    //         title: "Modern Wood Interior",
    //         description:
    //             "Interior project featuring sustainable wood and minimalist design aesthetics.",
    //     },
    //     {
    //         id: 4,
    //         category: "Finished",
    //         image: img4,
    //         title: "Complete House Renovation",
    //         description:
    //             "Renovation of a 20-year-old house with modern layout and improved natural lighting.",
    //     },
    //     {
    //         id: 5,
    //         category: "On-going",
    //         image: img5,
    //         title: "Premium Apartment Block",
    //         description:
    //             "Residential apartment project with modern amenities and smart home systems.",
    //     },
    //     {
    //         id: 6,
    //         category: "Up-coming",
    //         image: img6, 
    //         title: "Kitchen Upgrade Project",
    //         description: "Compact modular kitchen upgrades tailored for modern homes.",
    //     },
    // ];
 
    const filteredProjects =
        activeFilter === "All"
            ? projectData
            : projectData.filter((item) => item.project_status === activeFilter);
 
    const openModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };
 
    const closeModal = () => setShowModal(false);
 
 
    const goNext = () => {
        const currentIndex = filteredProjects.findIndex(
            p => p.id === selectedProject.id
        );
        const nextIndex = (currentIndex + 1) % filteredProjects.length;
        setSelectedProject(filteredProjects[nextIndex]);
    };
 
    const goPrev = () => {
        const currentIndex = filteredProjects.findIndex(
            p => p.id === selectedProject.id
        );
        const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
        setSelectedProject(filteredProjects[prevIndex]);
    };
 
 
    return (
        <>
            <div className="container section-title mt-5">
                <h2>Projects</h2>
                <p>
                    At UpConstruction, we believe every project is more than just bricks
                    and mortar — it's a commitment to quality, trust, and responsibility.
                </p>
            </div>
 
 
            <div className="project-custom-tabs mb-5">
                <div
                    className={`project-custom-tab A-tab ${activeFilter === "All" ? "active" : ""
                        }`}
                    onClick={() => setActiveFilter("All")}
                >
                    <img src={AllIcon} className="project-tab-icon all-icon" />
                    <span>All</span>
                </div>
 
                <div
                    className={`project-custom-tab upcoming-tab ${activeFilter === "Up-coming" ? "active" : ""
                        }`}
                    onClick={() => setActiveFilter("Up-coming")}
                >
                    <img src={UpcomingIcon} className="project-tab-icon upcoming-icon" />
                    <span>Up-coming</span>
                </div>
 
                <div
                    className={`project-custom-tab ongoing-tab ${activeFilter === "On-going" ? "active" : ""
                        }`}
                    onClick={() => setActiveFilter("On-going")}
                >
                    <img src={OngoingIcon} className="project-tab-icon ongoing-icon" />
                    <span>On-going</span>
                </div>
 
                <div
                    className={`project-custom-tab finished-tab ${activeFilter === "Finished" ? "active" : ""
                        }`}
                    onClick={() => setActiveFilter("Finished")}
                >
                    <img src={FinishedIcon} className="project-tab-icon finished-icon" />
                    <span>Finished</span>
                </div>
            </div>
 
 
            <div className="container">
            {loading ? (
    <Loading />
) : (
    <div className="row gy-4">
        {filteredProjects.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
                <div
                    className="project-hover-card position-relative"
                    onClick={() => openModal(item)}
                >
                    <img
                        src={baseURL + item.path + item.altered_file_name}
                        className="img-fluid rounded"
                        alt={item.title}
                        style={{ height: "280px", objectFit: "cover", width: "100%" }}
                    />

                    <div className="project-hover-overlay d-flex align-items-center justify-content-center">
                        <i
                            className="bi bi-eye-fill project-eye-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                openModal(item);
                            }}
                        ></i>
                    </div>
                </div>

                <h5 className="mt-3">{item.heading}</h5>
            </div>
        ))}
    </div>
)}

            </div>
 
 
            <Modal
                show={showModal}
                onHide={closeModal}
                centered
                size="lg"
                className="project-large-modal"
            >
 
                <button className="project-custom-modal-close-btn" onClick={closeModal}>
                    &times;
                </button>
 
 
                <i
                    className="bi bi-chevron-left project-nav-arrow project-prev"
                    onClick={goPrev}
                ></i>
 
 
                <i
                    className="bi bi-chevron-right project-nav-arrow project-next"
                    onClick={goNext}
                ></i>
 
                <Modal.Body className="p-4">
                    <div className="row">
                        <div className="col-md-5 d-flex align-items-center justify-content-center">
                            <img
                                src={baseURL+selectedProject?.path+selectedProject?.altered_file_name}
                                className="img-fluid rounded"
                                style={{ maxHeight: "350px", objectFit: "cover" }}
                                alt={selectedProject?.title}
                            />
                        </div>
 
                        <div className="col-md-7">
                            <h4 className="fw-bold mb-1">{selectedProject?.title}</h4>
                            <p className="text-muted mb-2" style={{ fontSize: "12px" }}>
                                {selectedProject?.category?.toUpperCase()} PROJECT
                            </p>
                            <p className="text-muted mb-0" style={{ lineHeight: "1.6" }}>
                                {selectedProject?.description}
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
 
    );
}
 
export default Project_detailes;