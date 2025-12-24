import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import Navbar from "../../shared/Header";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";
import { baseURL } from "../../api/api";

function ContactView() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(true);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");

useEffect(() => {
    fetchContactDetails();
  }, [id]);

  const fetchContactDetails = async () => {
    try {
      const res = await LoginAPI.contactGet(id);

      if (res.apiStatus.code === "200") {
        setViewData(res.responseData.ContactView);
      } else {
        toast.error("Failed to load details");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <DashboardLayout />
        <div className="layout-page">
          <Navbar />

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y text-start">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>View Gallery</h4>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/contact-list")}
                >
                  Back
                </Button>
              </div>

              <div className="card">
                <div className="card-body">
                  {loading ? (
                    <p>Loading...</p>
                  ) : viewData ? (
                    <>
                      {/* <img
                        src={`${baseURL}${viewData.path}${viewData.altered_file_name}`}
                        alt={viewData.heading}
                        className="img-fluid mb-4"
                        style={{
                          borderRadius: "10px",
                          maxHeight: "400px",
                          objectFit: "cover",
                        }}
                      /> */}

                      <h4 className="mb-3">Name: {viewData.Name}</h4>

                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: viewData.Email,
                        }}
                      ></div> */}
                      <h4>Email: {viewData.Email}</h4>

                      <h4>Phone: {viewData.Phone}</h4>
                      <h4>Message: {viewData.Message}</h4>

                      {/* <div className="mt-4">
                        <strong>Status: </strong>
                        <label className="switch">
                          <input
                            className="ch"
                            type="checkbox"
                            checked={viewData.activeStatus === "1"}
                            readOnly
                          />
                          <span className="slider"></span>
                        </label>
                      </div> */}
                    </>
                  ) : (
                    <p>No data found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ContactView;