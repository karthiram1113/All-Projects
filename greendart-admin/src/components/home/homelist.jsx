import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/Header";
import DashboardLayout from "../../layouts/DashboardLayout";
import Footer from "../../shared/Footer";
import LoginAPI from "../../api/services/LoginApi";
import { baseURL } from "../../api/api";
import { toast } from "react-toastify";
import "../listcss/list.css";
import { Helmet } from 'react-helmet';


export default function HomeList() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Define pagination variables
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const apiData = {
      pageIndex: pageIndex,
      dataLength: itemsPerPage,
    };

    try {
      setLoading(true);
      const response = await LoginAPI.homeListAPIEP(apiData);

      if (response.apiStatus.code === "200") {
        setBanners(response.responseData);
      } else {
        setError(response.apiStatus.message);
      }
    } catch (err) {
      setError("Failed to fetch banners");
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await LoginAPI.homeDeleteAPIEP(deleteId);
      if (response.apiStatus.code === "200") {
        toast.success(response.apiStatus.message);
        fetchBanners();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while trying to delete the data");
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <>
      <Helmet>
        <title>Home Banner | GreenDart</title>
      </Helmet>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <DashboardLayout />
          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y text-start">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>Home Banner List</h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/home-banner")}
                  >
                    Add
                  </button>
                </div>

                <div className="whole-container">
                  {loading ? (
                    <div className="text-center p-5">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  ) : (
                    <div className="row g-3">
                      {banners.map((items, index) => (
                        <div key={items.img_id} className="col-md-2 col-lg-2">
                          <div className="card banner-card">
                            {/* Page Index Badge */}
                            <div className="banner-card-index">{index + 1}</div>

                            {/* Delete Button */}
                            <button
                              className="banner-card-delete"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteModal"
                              onClick={() => setDeleteId(items.img_id)}
                            >
                              ×
                            </button>

                            <img
                              src={`${baseURL}${items.path}${items.altered_name}`}
                              className="card-img-top banner-card-image"
                              alt={items.original_name}
                            />
                            <div className="card-body">
                              <h6 className="card-title text-truncate">
                                {items.original_name}
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancelDelete}
              ></button>
            </div>
            <div className="modal-body text-center">
              <h4>Are You Sure</h4> <br />
              <h6 className="mt-n4">You want to delete this banner Image?</h6>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancelDelete}
              >
                No
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmDelete}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
