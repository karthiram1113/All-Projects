import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { environment } from '../../../api/api';
import VENDORAPI from '../../../api/services/vendorLogin/vendorAPI';
import Navbar from '../../../shared/vendor/Navbar/navbar';
import Sidenav from '../../../shared/vendor/Sidenav/sidenav';
import Footer from '../../../shared/footer';
import NoDataFounded from '../../../components/NoDataFound';

function VendorOrderViewPage() {
    const [reference, setReference] = useState();
    const [vendor, setVendor] = useState('');
    const [client, setClient] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');
    const [img, setImg] = useState(null);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [cName, setCName] = useState('');
    const [shopname, setShopName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [id, setId] = useState()
    const [product, setProducts] = useState([])
    const navigate = useNavigate();
    const [list, setListOrder] = useState('');

    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split('/');
        const vendorId = myArray[3];
        let ss = myArray[2]
        setListOrder(vendorId)
        setId(vendorId)
        orderGetMethod(vendorId);
    }, []);

    const orderGetMethod = async (vendorId) => {
        
        try {
            const response = await VENDORAPI.vendorOrderView(vendorId);
            if (response.apiStatus.code !==  "200") {
                setListOrder(null);
                return;
            }
            if (!response || !response.result || !response.result.OrderData) {
                throw new Error('Invalid response data');
            }

            const dat = response.result.OrderData;
            const dat1 = response.result.OrderData.products;
            setProducts(dat1)
            console.log(dat, 'dat');

            setReference(dat.refernce_code);
            setClient(`${dat.clientRefercode} - ${dat.Firstname}, ${dat.Lastname}`);
            setVendor(`${dat.ShopRefercode} -${dat.Shop_name}`);
            setAddress(dat.DeliveryAddress);
            setStatus(dat.status);
            setShopName(dat.Shop_name);
            setAmount(dat.total_amount);
            setImg(dat1.map((data) => data.image));
            setPrice(dat.total_price);
            setQuantity(dat.total_quantity);
            setCName(dat1.map((data) => data.name));
        } catch (error) {
            console.log('Error handled =', error);
        }
    };

    // const handleSaveStatus = () => {
    //     console.log('Status updated to:', selectedStatus);
    //     setShowPopup(false);
    // };

    // const handleCancel = () => {
    //     setShowPopup(false);
    // };
    const handleSaveStatus = async () => {

        console.log("lllllllllll");
        console.log("1221212", id);

        if (!selectedStatus) {
            toast.error("Please select status")
            return
        }


        const apidata = {
            id: id,
            status: selectedStatus

        }


        try {
            console.log('Status updated to:', selectedStatus);

            const responseData = await VENDORAPI.vendorOrderStatus(apidata);
            if (responseData.apiStatus.code == 200) {
                console.log('Status updated successfully');
                toast.success(responseData.apiStatus.message);
                setShowPopup(false);
                orderGetMethod(id);
                // navigate("/vendorOrderlist")
            }
            else {
                toast.error(responseData.apiStatus.message);
            }
            // Close the popup after updating

        } catch (error) {
            console.log('Failed to update status:', error);

        }
    };

    const handleCancel = () => {
        setShowPopup(false); // Close the popup without saving
    };


    return (
        <div>
            <Navbar />
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <Sidenav />
                <div className='main-panel' style={{ paddingTop: "80px" }}>
                    <div className="content-wrapper">
                        <div class="page-header">
                            <h3 class="page-title">
                                <span class="page-title-icon bg-gradient-primary text-white me-2">
                                    <i class="nav-icon fa-solid fa-cart-shopping menu-icon"></i>
                                </span>Order View</h3>
                            <div style={{ textAlign: "right" }}>
                                <a type="button" class="btn btn-primary" onClick={() => navigate('/vendorOrderlist')} data-discover="true" style={{ float: "right", border: "none" }}>Back</a></div>
                        </div>
                        {list ? <> <div className="card">
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-6 '>
                                        <h4 className='order-list'>Reference Code</h4>
                                        <h6 className='order-value p-0'>{reference}</h6>
                                        <h4 className='order-list'>Client</h4>
                                        <h6 className='order-value p-0'>{client}</h6>
                                        <h4 className='order-list'>Status</h4>
                                        <div
                                            className={`badge  ${status === "Active"
                                                ? "badge-success"
                                                : status === "Inactive" || status === "Cancelled"
                                                    ? "badge-danger"
                                                    : status === "Out of Delivery"
                                                        ? "badge-warning"
                                                        : status === "Delivered"
                                                            ? "badge-dark"
                                                            : status === "Pending"
                                                                ? "badge-pending"
                                                                : status === "Packed"
                                                                    ? "badge-packed"
                                                                    : status === "Confirmed"
                                                                        ? "badge-confirmed"
                                                                        : ""
                                                }`}
                                            style={
                                                status === "Active"
                                                    ? { backgroundColor: "green" }
                                                    : status === "Inactive" || status === "Cancelled"
                                                        ? { backgroundColor: "red" }
                                                        : status === "Out of Delivery"
                                                            ? { backgroundColor: "yellow", color: "black" }
                                                            : status === "Delivered"
                                                                ? { backgroundColor: "black" }
                                                                : status === "Pending"
                                                                    ? { backgroundColor: "orange" }
                                                                    : status === "Packed"
                                                                        ? { backgroundColor: "violet" }
                                                                        : status === "Confirmed"
                                                                            ? { backgroundColor: "blue" }
                                                                            : {}
                                            }
                                        >
                                            {status}
                                        </div>
                                        <button
                                        className='btn btn-gradient-primary btn-sm ms-3'
                                            // style={{
                                            //     borderRadius: '12px',
                                            //     cursor: 'pointer',
                                            //     marginLeft: '17px',
                                            //     backgroundColor: 'azure',
                                            //     borderColor: 'burlywood',
                                            //     padding: '8px 12px',
                                            // }}
                                            onClick={() => setShowPopup(true)}
                                        >
                                            Update Status
                                        </button>
                                    </div>
                                    <div className='col-md-6'>
                                        <h4 className='order-list'>Vendor</h4>
                                        <h6 className='order-value p-0'>{vendor}</h6>
                                        <h4 className='order-list'>Delivery Address</h4>
                                        <h6 className='order-value p-0'>{address}</h6>
                                        <h4 className='order-list'>Shop Name</h4>
                                        <h6 className='order-value p-0'>{shopname}</h6>
                                    </div>
                                </div>

                            </div>
                        </div>

                            <div className='row'>

                                {product.map((item, index) => (
                                    <div className={`col-md-4 col-sm-6  ${product.length === 0 ? 'col-xl-12 col-lg-12' : 'col-xl-4 col-lg-4'}`}>
                                        <div className='card mt-3'>

                                            <div key={index} className="d-flex justify-content-around polaroid text-start">
                                                <div className=''>
                                                    <img className='chicken-img rounded' style={{ height: "90px", width: "90px" }} src={`${environment.baseURL}${item.image}`} alt="" />
                                                </div>
                                                <div className=''>
                                                    <h4>{item.name}</h4>
                                                    <div className='order-value ps-0 mt-2 text-start'>Price  :  {item.price}</div>

                                                    <div className='order-value ps-0 mt-2 text-start'>Quantity :     {item.quantity}</div>


                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className='row'>
                                <div className='col-md-12 mt-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <h4 className='order-list'>Total Price</h4>
                                                    <h6 className='order-value p-0'>{price}</h6>
                                                </div>
                                                <div>
                                                    <h4 className='order-list'>Total Quantity</h4>
                                                    <h6 className='order-value p-0'>{quantity}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></> : <div className='card'>
                            <div className='card-body'>
                                    <NoDataFounded />
 
                            </div>
                        </div>}
                       

                        
                    </div>
                    <Footer />

                </div>
            </div>

            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        zIndex: 1050,
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '5px',
                            width: '400px',
                            textAlign: 'center',
                        }}
                    >
                        <div style={{ marginBottom: '15px' }}>
                            <h5>Update Order Status - {reference}</h5>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <label htmlFor="status" style={{ marginRight: '10px' }}>Status:</label>
                            <select
                                id="status"
                                value={selectedStatus ? selectedStatus : status}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                style={{ padding: '8px', borderRadius: '5px', width: '70%' }}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Packed">Packed</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Out of Delivery">Out of Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                                {/* <option value="Out of Stock">Out of Stock</option> */}
                            </select>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                onClick={handleCancel}
                                className='btn btn-btn btn-light'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveStatus}
                                className='btn btn-btn btn-gradient-primary'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VendorOrderViewPage;
