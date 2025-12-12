import React from 'react'

import { Link } from 'react-router-dom'
import Navbar from '../Navbar/navbar'
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

function Superadmindashboard() {

  const userName = localStorage.getItem("userName")

  // Chart Design

  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 190, 300, 500, 200, 300,120, 190, 300, 500, 200, 300],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };


  return (
    <div>
  


<Navbar />



<div style={{paddingTop:"80px"}} className="container-fluid page-body-wrapper">

        
{/* <!-- partial:partials/_sidebar.html --> */}
<nav className="sidebar sidebar-offcanvas" id="sidebar">
    
  <ul className="nav">
    <li className="nav-item nav-profile">
      <a href="#" className="nav-link">
        <div className="nav-profile-image">
        <img src="assets/images/praveen.jpg" alt="image"/>
          <span className="login-status online"></span>
          {/* <!--change to offline or busy as needed--> */}
        </div>
        <div className="nav-profile-text d-flex flex-column">
          <span className="font-weight-bold mb-2">Bose Praveen</span>
          <span className="text-secondary text-small">Web Developer</span>
        </div>
        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
      </a>
    </li>
    <li className="nav-item">
      <Link to="/admindashboard" className="nav-link" >
      <i className="nav-icon fas fa-tachometer-alt menu-icon"></i>
        <span className="menu-title">Dashboard</span>
        
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/adminproductlist" className="nav-link" >
      <i className="nav-icon fas fa-boxes menu-icon"></i>
        <span className="menu-title">Product List</span>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/adminorderlist" className="nav-link" >
      <i className="nav-icon fas fa-list menu-icon"></i>
        <span className="menu-title">Order Lists</span>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/adminvendorlist" className="nav-link" >
      <i className="nav-icon fas fa-users menu-icon"></i>
        <span className="menu-title">Vendor List</span>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/adminclientlist" className="nav-link" >
      <i className="nav-icon fas fa-user-friends menu-icon"></i>
        <span className="menu-title">Client List</span>
      </Link>
    </li>
            
<li className="nav-item">
    <a className="nav-link" data-bs-toggle="collapse" href="#maintenanceModule" aria-expanded="false" aria-controls="maintenanceModule">
    {/* <i className="menu-arrow"></i> */}
    <i className="mdi mdi-crosshairs-gps menu-icon"></i>
      <span className="menu-title">Maintenance</span>
    
    </a>
    <div className="collapse" id="maintenanceModule">
      <ul className="nav flex-column sub-menu">
      
        <li className="nav-item">
          <Link to={"/adminshoplist"} className="nav-link">Shop Type List</Link>
        </li>
      
        <li className="nav-item">
          <Link to={"/adminuserlist"} className="nav-link">User List</Link>
        </li>
      
       
        <li className="nav-item">
          <Link to={"/adminsetting"} className="nav-link" href="#">Setting</Link>
        </li>
      </ul>
    </div>
  </li>
    
            <li className="nav-item">
    <a className="nav-link" data-bs-toggle="collapse" href="#reportsModule" aria-expanded="false" aria-controls="reportsModule">
    <i className="mdi mdi-contacts menu-icon"></i>
      <span className="menu-title">Reports</span>
      {/* <i className="menu-arrow"></i> */}
    </a>
    <div className="collapse" id="reportsModule">
      <ul className="nav flex-column sub-menu">
       
        <li className="nav-item">
          {/* <a className="nav-link" href="pages/icons/font-awesome.html"></a> */}
           <Link to={"/adminreport"} className="nav-link">Monthly Order Report</Link>
        </li>
      </ul>
    </div>
  </li>


   
  </ul>
</nav>


{/* Dashboard */}

{/* <!-- partial --> */}
<div className="main-panel">
  <div className="content-wrapper">
    <div className="page-header">
      <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white me-2">
        <i className="nav-icon fas fa-tachometer-alt menu-icon"></i>
        </span> Dashboard
      </h3>
      {/* <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
          </li>
        </ul>
      </nav> */}
    </div>
    <div className="row">
      <div className="col-md-4 stretch-card grid-margin">
        <div className="card bg-gradient-danger card-img-holder text-white">
          <div className="card-body">
            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
            <h4 className="font-weight-normal mb-3">Weekly Sales <i className="mdi mdi-chart-line mdi-24px float-end"></i>
            </h4>
            <h2 className="mb-5">$ 15,0000</h2>
            <h6 className="card-text">Increased by 60%</h6>
          </div>
        </div>
      </div>
      <div className="col-md-4 stretch-card grid-margin">
        <div className="card bg-gradient-info card-img-holder text-white">
          <div className="card-body">
            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
            <h4 className="font-weight-normal mb-3">Weekly Orders <i className="mdi mdi-bookmark-outline mdi-24px float-end"></i>
            </h4>
            <h2 className="mb-5">45,6334</h2>
            <h6 className="card-text">Decreased by 10%</h6>
          </div>
        </div>
      </div>
      <div className="col-md-4 stretch-card grid-margin">
        <div className="card bg-gradient-success card-img-holder text-white">
          <div className="card-body">
            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
            <h4 className="font-weight-normal mb-3">
              Weekly Items <i className="mdi mdi-diamond mdi-24px float-end"></i>
            </h4>
            <h2 className="mb-5">95,5741</h2>
            <h6 className="card-text">Increased by 5%</h6>
          </div>
        </div>
      </div>
    </div>
  
    <div className="row">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Recent orders</h4>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> No.</th>
                    
                    <th> Customer </th>
                    <th> Status </th>
                    <th> Date </th>
                    <th> Total </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    #222
                    </td>
                    <td> Fund is not recieved </td>
                    <td>
                      <label className="badge badge-gradient-success">DONE</label>
                    </td>
                    <td> Dec 5, 2017 </td>
                    <td> WD-12345 </td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

<div className='row'>
  <div className='col-md-12'>
      <div className="card">
          <div className="card-body">
            <h4 className="card-title">Income statistics</h4>
 <div className="saw-chart__body">
      <div className="saw-chart__container" style={{ height: 342 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
            </div>
      </div>
   
  </div>
</div>
    
  </div>
  {/* <!-- content-wrapper ends --> */}
  {/* <!-- partial:partials/_footer.html --> */}
  <footer className="footer">
    <div className="d-sm-flex justify-content-center justify-content-sm-between">
      <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023 <a href="https://www.bootstrapdash.com/" target="_blank">BootstrapDash</a>. All rights reserved.</span>
      <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i></span>
    </div>
  </footer>
  {/* <!-- partial --> */}
</div>
{/* <!-- main-panel ends --> */}
</div>
    </div>
  )
}

export default Superadmindashboard
