import React, { useEffect, useState } from 'react';
import { TNdeleteProduct, World } from '../../service/apiserver'; 
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { environment } from '../../environment/environment';
import Navbar from '../../navbar/navbar';
import Sidenav from '../../navbar/sidenav';
import '../../productlist/productlist.css';
import Pagination from 'react-bootstrap/Pagination';
import Swal from "sweetalert2";
import Footer from '../../navbar/footer';

function World_News() {

  const API_BASE_URL = environment.apiBaseUrl;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const recordsPerPage = 5;

  //News list

  const fetchDataList = async (pageNumber) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const responseData = await World(token, pageNumber - 1, recordsPerPage); 

      if (responseData.apiStatus.code === "200") {
        setList(responseData.result.newsData);
        const totalRecords = responseData.result.filterCount;
        setTotalRecords(totalRecords);
        setTotalPages(Math.ceil(totalRecords / recordsPerPage));
        localStorage.setItem("SubcategoryId", responseData.result.newsData.news_sub_category_id);
        localStorage.setItem("WorldNews", totalRecords);
        console.log('bk0000',totalRecords)
      } else {
        toast.error(responseData.apiStatus.message);
      }

    } catch (error) {
      console.error("Error handled:", error);
      toast.error("An error occurred while fetching the news list.");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchDataList(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Pagination Method
  const renderPaginationItems = () => {
    let items = [];
    const maxPageNumbersToShow = 3;
    const halfRange = Math.floor(maxPageNumbersToShow / 2);

    let startPage, endPage;
    if (totalPages <= maxPageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfRange) {
      startPage = 1;
      endPage = maxPageNumbersToShow;
    } else if (currentPage + halfRange >= totalPages) {
      startPage = totalPages - maxPageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfRange;
      endPage = currentPage + halfRange;
    }

    if (startPage > 1) {
      items.push(
        <Pagination.Item key="1" active={1 === currentPage} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }
      items.push(
        <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };


  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    setList((prevList) =>
        prevList.map((item) =>
            item.news_id === id ? { ...item, publish_status: newStatus } : item
        )
    );
};


  // delete function

  // const handleDelete = async (news_id) => {
  //   if (window.confirm("Are you sure you want to delete this News?")) {
  //     setLoading(true);
  //     try {
  //       const result = await TNdeleteProduct(news_id);
  //       if (result.success) {
  //         toast.success("News deleted successfully!");
  //         setList(list.filter(vendor => vendor.news_id !== news_id));
  //       } else {
  //         toast.error(result.message);
  //       }
  //     } catch (error) {
  //       console.error("Error during News deletion:", error);
  //       toast.error("An error occurred while trying to delete the News.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

   const handleDelete = async (news_id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You need to confirm by clicking 'I agree to delete the news'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "I agree to delete the news",
        cancelButtonText: "Cancel"
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const response = await TNdeleteProduct(news_id);
            if (response.success) {
              toast.success("News deleted successfully!");
              setList(list.filter(vendor => vendor.news_id !== news_id));
            } else {
              toast.error(response.message);
            }
          } catch (error) {
            console.error("Error during News deletion:", error);
            toast.error("An error occurred while trying to delete the News.");
          } finally {
            setLoading(false);
          }
        }
      });
    };

  const [expandedItems, setExpandedItems] = useState({});
  const truncateText = (text, wordLimit, expandedLimit, id, key) => {
    if (!text) return "";
    const words = text.split(" ");

    if (words.length <= wordLimit || expandedItems[`${id}-${key}`]) {
      if (words.length > wordLimit && expandedItems[`${id}-${key}`]) {
        return (
          <>
            {words.slice(0, wordLimit).join(" ")}
            <br />
            {words.slice(wordLimit, expandedLimit).join(" ")}
          </>
        );
      }
      return text;
    }

    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const toggleExpand = (id, key) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${id}-${key}`]: !prev[`${id}-${key}`]
    }));
  };



  return (
    <div>
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidenav />
        <div style={{ paddingTop: "80px" }} className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="nav-icon fas fa-boxes menu-icon"></i>
                </span> World News
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <button onClick={() => navigate("/Worldnews/create")} className="btn btn-primary">Add</button>
                </ul>
              </nav>
            </div>
            <div className="card">
              <div className="table-responsive">
                <div className="card-body">
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        zIndex: 9999
                      }}
                    >
                      <div className="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <table className="table table-hover tableHost text-center">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Image</th>
                            <th>title</th>
                            <th>Summary	</th>
                            <th>Publish Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((value, ind) => (
                            <tr key={value.id}>
                              <th scope="row">{(currentPage - 1) * recordsPerPage + ind + 1}</th>
                              <td>
                                <img className='img-news'
                                  src={value.path ? `${API_BASE_URL}${value.path}` : "trty"}
                                  alt="News Image"
                                  style={{ width: '50px', height: '50px' }}
                                />
                              </td>
                              <td className='text-start'>
                                {truncateText(value.title, 4, 9, value.news_id, "title")}
                                {value.title.split(" ").length > 5 && (
                                  <span className="text-primary" style={{ cursor: "pointer", display: "block" }} onClick={() => toggleExpand(value.news_id, "title")}>
                                    {expandedItems[`${value.news_id}-title`] ? "Show less" : "Show more"}
                                  </span>
                                )}
                              </td>

                              <td className='text-start'>
                                {truncateText(value.sub_title, 2, 9, value.news_id, "sub_title")}
                                {value.sub_title.split(" ").length > 5 && (
                                  <span className="text-primary" style={{ cursor: "pointer", display: "block" }} onClick={() => toggleExpand(value.news_id, "sub_title")}>
                                    {expandedItems[`${value.news_id}-sub_title`] ? "Show less" : "Show more"}
                                  </span>
                                )}
                              </td>

                              {/* <td>
                                <div
                                  className="badge"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => toggleStatus(value.id, value.publish_status)}
                                >
                                  {value.publish_status === 1 ? (
                                    <i className="fa-solid fa-toggle-on toggle-red"></i>
                                  ) : (
                                    <i className="fa-solid fa-toggle-off toggle-green"></i>
                                  )}
                                </div>
                              </td> */}

<td>
                                <label className="toggle-container">
                                  <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={value.publish_status === 1}
                                    onChange={() =>
                                      toggleStatus(
                                        value.id,
                                        value.publish_status
                                      )
                                    }
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </td>

                              <td className="clients">
                                <li>
                                  <Link to={`/Worldnews/Edit/${value.news_id}`} className="edit">
                                    <i className="fa-regular fa-pen-to-square edit-font font-size-main"></i>
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    className="delete"
                                    onClick={() => handleDelete(value.news_id)}
                                  >
                                    <i className="fa-solid fa-trash delete-font font-size-main"></i>
                                  </Link>
                                </li>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Pagination>
                          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                          {renderPaginationItems()}
                          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        </Pagination>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default World_News;