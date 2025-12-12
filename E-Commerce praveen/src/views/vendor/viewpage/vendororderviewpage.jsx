import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { environment } from '../../../api/api';
import VENDORAPI from '../../../api/services/vendorLogin/vendorAPI';

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
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [id,setId] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split('/');
        const vendorId = myArray[3];
        let ss = myArray[2]
        setId(vendorId)
        orderGetMethod(vendorId);
    }, []);

    const orderGetMethod = async (vendorId) => {
        try {
            const response = await VENDORAPI.vendorOrderView(vendorId);
            if (!response || !response.result || !response.result.OrderData) {
                throw new Error('Invalid response data');
            }

            const dat = response.result.OrderData;
            const dat1 = response.result.OrderData.products;
            console.log(dat, 'dat');

            setReference(dat.refernce_code);
            setClient(`${dat.clientRefercode} - ${dat.Firstname}, ${dat.last_name}`);
            setVendor(`${dat.ShopRefercode} -${dat.Shop_name}`);
            setAddress(dat.DeliveryAddress);
            setStatus(dat.status);
            setAmount(dat.total_amount);
            setImg(dat1.map((data) => data.image));
            setPrice(dat1.map((data) => data.price));
            setQuantity(dat1.map((data) => data.quantity));
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
        console.log("1221212",id);


        const apidata={
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
                navigate("/vendor/orderlist")
                setSelectedStatus(selectedStatus); // Update the status in the UI
            }
    else{
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
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row flex-grow">
                        <div className="col-lg-6 mx-auto">
                            <div style={{ padding: '50px' }} className="auth-form-light">
                                <p className="ordername">Order View Details</p>

                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="order-list">Reference Code</h4>
                                        <h6 className="order-value">{reference}</h6>
                                        <h4 className="order-list">Client</h4>
                                        <h6 className="order-value">{client}</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="order-list">Vendor</h4>
                                        <h6 className="order-value">{vendor}</h6>
                                        <h4 className="order-list">Delivery Address</h4>
                                        <h6 className="order-value">{address}</h6>
                                    </div>
                                </div>

                                <h4 className="order-list">Status</h4>
                                <div
                                    className={`badge ${
                                        status === 'Active'
                                            ? 'badge-success'
                                            : status === 'Inactive' || status === 'Cancelled'
                                            ? 'badge-danger'
                                            : status === 'Out of Delivery'
                                            ? 'badge-warning'
                                            : status === 'Delivered'
                                            ? 'badge-dark'
                                            : status === 'Pending'
                                            ? 'badge-pending'
                                            : status === 'Packed'
                                            ? 'badge-packed'
                                            : status === 'Confirmed'
                                            ? 'badge-confirmed'
                                            : ''
                                    }`}
                                    style={
                                        status === 'Active'
                                            ? { backgroundColor: 'green' }
                                            : status === 'Inactive' || status === 'Cancelled'
                                            ? { backgroundColor: 'red' }
                                            : status === 'Out of Delivery'
                                            ? { backgroundColor: 'yellow' }
                                            : status === 'Delivered'
                                            ? { backgroundColor: 'black' }
                                            : status === 'Pending'
                                            ? { backgroundColor: 'orange' }
                                            : status === 'Packed'
                                            ? { backgroundColor: 'violet' }
                                            : status === 'Confirmed'
                                            ? { backgroundColor: 'blue' }
                                            : {}
                                    }
                                >
                                    {status}
                                </div>
                                <button
                                    style={{
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        marginLeft: '17px',
                                        backgroundColor: 'azure',
                                        borderColor: 'burlywood',
                                        padding: '8px 12px',
                                        marginTop: '10px',
                                      }}
                                    onClick={() => setShowPopup(true)}
                                >
                                    Update Status
                                </button>
                                <div style={{ paddingTop: '30px' }} className="row text-center">
                                    <div className="col-md-6">
                                        <h4>{cName}</h4>
                                        <p className="chicken-price">Price: {price}</p>
                                        <p className="chicken-price">Quantity: {quantity}</p>
                                        <p>Total: {amount}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <img
                                            className="chicken-img"
                                            src={`${environment.baseURL}${img}`}
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/vendor/orderlist')}
                                    className="btn view-close btn-gradient-primary me-2"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
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
                        <div>
                            <label htmlFor="status" style={{ marginRight: '10px' }}>Status:</label>
                            <select
                                id="status"
                                value={selectedStatus}
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
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveStatus}
                                style={{
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
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
