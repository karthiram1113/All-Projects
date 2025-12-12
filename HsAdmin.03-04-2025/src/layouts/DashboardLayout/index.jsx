import React from 'react';
import Sidebar from '../../shared/Sidebar';
import './index.css';

function DashboardLayout (props){
    return (
      <>
        <div className="dashboard-maincontent">
          <Sidebar />
          <>{props.children}</>
        </div>
      </>
    );
}

export default DashboardLayout;