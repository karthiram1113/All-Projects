import React, { useEffect, useState } from 'react';
import { productList, deleteProduct, productListss } from '../service/apiserver'; // Import deleteVendor
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { environment } from '../environment/environment';
import Navbar from '../navbar/navbar';
import Sidenav from '../navbar/sidenav';
import '../productlist/productlist.css';

// import Loading from './Loading';



function News_List() {

  const API_BASE_URL = environment.apiBaseUrl;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState('')
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [expandedDescription, setExpandedDescription] = useState(null); // Track which description is expanded


  //Product list

  // useEffect(()=>{
  //   productList()
  // },[]);

  // const productList = async () => {
  //   // e.preventDefault();
  //   // setLoading(true);

  //   try {
  //     const responseData = await productListss(0,10);
  //     if (responseData.apiStatus.code === "200") {
  //       setList(responseData.result.VendorData);

  //     } else {
  //    console.log("jjjjjj");

  //     }
  //   } catch (error) {
  //     console.log("Error handled =" + error);
  //   }
  // };

  useEffect(() => {
    let multiTimeApiCall = false;

    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const responseData = await productListss(0, 10, token); // Pass correct parameters

        if (!multiTimeApiCall) { 
          if (responseData.apiStatus.code === "200") {
            setList(responseData.result.newsData);
            console.log(responseData.result.newsData, 'ddd999');

          } else {
            toast.error(responseData.apiStatus.message);
          }
        }
      } catch (error) {
        if (!multiTimeApiCall) {
          console.error("Error handled:", error);
          toast.error("An error occurred while fetching the product list.");
        }
      } finally {
        if (!multiTimeApiCall) {
          setLoading(false); // Ensure loading state is stopped
        }
      }
    };

    fetchData();

    return () => {
      multiTimeApiCall = true; // Cancel any pending state updates if the component unmounts
    };
  }, []);

    // const handleEdit = (id) => {
    //   navigate(`/edit-product/${id}`);
    // };


     //  vendor delete function

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        const result = await deleteProduct(id);
        if (result.success) {
          toast.success("Product deleted successfully!");
          setList(list.filter(vendor => vendor.id !== id)); // Update the list by filtering out the deleted vendor
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error during product deletion:", error);
        toast.error("An error occurred while trying to delete the product.");
      } finally {
        setLoading(false);
      }
    }
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
                </span> Product List
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <button onClick={() => navigate("/formpage/Create")} className="btn btn-primary">Add</button>
                </ul>
              </nav>
            </div>
            <div className="card">
              <div className="table-responsive">
                <div className="card-body over">
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

                    <table className="table table-hover tableHost text-center">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Image</th>
                          {/* <th>Date</th> */}
                          <th>title</th>
                          <th>Summary	</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((value, ind) => (
                          <tr key={value.id}>
                            <th scope="row">{ind + 1}</th>
                            {/* <td>{value.date_created}</td> */}
                            <td>
                              <img
                                src={value.path ? `${API_BASE_URL}${value.path}` : "trty"}
                                alt="Product Image"
                                style={{ width: '50px', height: '50px' }}
                              />
                            </td>
                            <td>{value.title}</td>
                            <td>{value.sub_title}</td>
                            <td>
                            <div
                              className={`badge ${value.status === "active"
                                ? "badge-success"
                                : value.status === "inactive"
                                  ? "badge-danger"
                                  : "badge-secondary"
                              }`}
                              style={
                                value.status === "Active"
                                  ? { backgroundColor: "green" }
                                  : value.status === "Inactive"
                                    ? { backgroundColor: "red" }
                                    : { backgroundColor: "gray" }
                              }
                            >
                              {value.status}
                            </div>
                          </td>

                          <td className="clients">
                            <li>
                              <Link className="eye">
                                <i className="fa-solid fa-eye eye"></i>
                              </Link>
                            </li>
                            <li>

                               {/* edit function  */}

                              <Link to={`/formpage/Edit/${value.id}`} className="edit">   
                                <i className="fa-regular fa-pen-to-square edit-font"></i>
                              </Link>
                            </li>
                            
                            <li>
                              <Link
                                className="delete"
                                onClick={() => handleDelete(value.id)} 
                              >
                                <i className="fa-solid fa-trash delete-font"></i>
                              </Link>
                            </li>
                          </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News_List;