import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageNotFound404 from '../../assets/img/file-search-icon.png';
import './style.css';
function Page404() {
  const navigate=useNavigate();
    return (
      <div className='notfound-cont'>
        <div className='notfound-inner'>
          <div className='page-404-icon'>
            <div className='txt-404'>404</div>
          <img src={PageNotFound404} alt='back-arrow' className='File Search' />
          </div>
          <h3>Page Not Found.</h3>
          <div className="mb-3">
            <p>
              We're sorry, the page you requested could not be found on the server. Please go back to the main page.
            </p>
          </div>
          <div className="d-grid">
          
            <button className='btn btn-primary' type='button' onClick={()=>navigate(-1)}>
              Go to Main Login
            </button>
          </div>
        </div>
      </div>
    )
}
export default Page404