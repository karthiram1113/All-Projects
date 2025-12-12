import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Url from "../Api/Url";
import { toast } from "react-toastify";

function Header() {
  const Navigate = useNavigate();

  const [log, setLog] = useState("");
  const [imgId, setImgId] = useState("");
  let imgName = localStorage.getItem("imgName");
  let userName = localStorage.getItem("userName");
  let id = localStorage.getItem("id");

  // useEffect(() => {
  //   getMethod(id);
  // },[]);

  // User Get

  const getMethod = async (id) => {
    // e.preventDefault();
    let token = localStorage.getItem("token");
    const response = await fetch(Url.start + Url.userProfile + id, {
      method: "GET",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
    });
    try {
      const responceData = await response.json();

      var dat = responceData.result.adminData;
      console.log(dat, "dat");

      setImgId(dat.imageData?.altered_file_name);
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  // Logout

  const logoutFun = async () => {
    // e.preventDefault();

    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    const response = await fetch(Url.start + "/logout/" + userId, {
      method: "GET",
      headers: {
        "content-type": "appilication/json",
        Authorization: "Bearer " + token,
      },
      //   body: JSON.stringify({}),
    });
    console.log(response,"content-type");
    
    try {
      const responceData = await response.json();
      console.log(responceData,"content-type");

      if (responceData.apiStatus.code == "200") {
        Navigate("/AdminLogin");
        localStorage.clear();

        toast.success(responceData.apiStatus.message);
      } else {
        toast.error(responceData.apiStatus.message);
      }
    } catch (error) {
      console.log("Error handled =" + error);
    }
  };

  const toggleClick = () => {
    var toggle = document.getElementsByClassName("toggle-sidebar");
    console.log(toggle.length == 2);
    console.log(toggle);
    if (toggle.length == 2) {
      document.querySelector("body").classList.remove("toggle-sidebar");
    } else {
      document.querySelector("body").classList.add("toggle-sidebar");
    }
  };


  const [searchText, setSearchText] = useState("");

  const globalSearch = () => {

    document.querySelectorAll("mark").forEach((el) => {
      el.outerHTML = el.innerText;
    });

  if (!searchText) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const regex = new RegExp(`(${searchText})`, "gi");

    while (walker.nextNode()) {
      const node = walker.currentNode;

      if (
        node.parentNode &&
        node.nodeValue.toLowerCase().includes(searchText.toLowerCase())
      ) {
        const span = document.createElement("span");
        span.innerHTML = node.nodeValue.replace(regex, "<mark>$1</mark>");
        const newNode = document.createElement("span");
        newNode.className = "search-highlight";
        newNode.innerHTML = span.innerHTML;

        node.parentNode.replaceChild(newNode, node);
      }
    }
  }

useEffect(() => {
  globalSearch();
}, [searchText]);
  

  return (
    <div className="toggle-sidebar">
      <header id="header" class="header fixed-top d-flex align-items-center">
        <div class="d-flex align-items-center justify-content-between">
          <a  class="logo d-flex align-items-center">
            <img src="/assets/img/hs.logo.png" alt="" />
            {/* <span class="d-none d-lg-block"></span>   */}
          </a>
          <i class="bi bi-list toggle-sidebar-btn" onClick={toggleClick}></i>
        </div>
        {/* <!-- End Logo --> */}

        <div class="search-bar">
          <form class="search-form d-flex align-items-center" method="POST">
           <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            /> 
            <button type="submit" title="Search">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>

        {/* <div className="search-bar">
          <form className="search-form d-flex align-items-center">
            <input
              type="text"
              placeholder="Search"
              // value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="button" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div> */}
        {/* <!-- End Search Bar --> */}

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">
            <li class="nav-item d-block d-lg-none">
              <a class="nav-link nav-icon search-bar-toggle">
                <i class="bi bi-search"></i>
              </a>
            </li>
            {/* <!-- End Search Icon--> */}

            {/* <li class="nav-item dropdown">
              <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-bell"></i>
                <span class="badge bg-primary badge-number">4</span>
              </a>
            

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li class="dropdown-header">
                  You have 4 new notifications
                  <a>
                    <span class="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li class="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>
              </ul>
             
            </li> */}
            {/* <!-- End Notification Nav --> */}

            {/* <li class="nav-item dropdown">
              <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-chat-left-text"></i>
                <span class="badge bg-success badge-number">3</span>
              </a>
            

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li class="dropdown-header">
                  You have 3 new messages
                  <a href="#">
                    <span class="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a href="#">
                    <img
                      src="/assets/img/messages-1.jpg"
                      alt=""
                      class="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a href="#">
                    <img
                      src="/assets/img/messages-2.jpg"
                      alt=""
                      class="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="message-item">
                  <a>
                    <img
                      src="/assets/img/messages-3.jpg"
                      alt=""
                      class="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>
              </ul>
         
            </li> */}
            {/* <!-- End Messages Nav --> */}

            <li class="nav-item dropdown pe-3">
              <a
                class="short nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                {/* <img src="/assets/img/praveen.jpg" alt="Profile" class="rounded-circle"/> */}
                <img
                  alt="Profile"
                  src={
                    imgName
                      ? Url.start + "/" + imgName
                      : "/assets/img/noimages.jpg"
                  }
                  class="rounded-circle"
                />
                <span class="d-none d-md-block dropdown-toggle ps-2">
                  {userName}
                </span>
              </a>
              {/* <!-- End Profile Iamge Icon --> */}

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  <h6>{userName}</h6>
                  <span>Web Developer</span>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <Link
                    to="/MyProfile"
                    class="dropdown-item d-flex align-items-center"
                  >
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <Link
                    to="/Change"
                    class="dropdown-item d-flex align-items-center"
                  >
                    {/* <i class="bi bi-gear"></i> */}
                    <i class="fa-solid fa-lock"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                {/* <li>
                  <a class="dropdown-item d-flex align-items-center">
                    <i class="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </a>
                </li> */}
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <Link
                    class="dropdown-item d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#logout"
                    to="/AdminLogin"
                  >
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>

      <div
        className="modal fade"
        id="logout"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered logout">
          <div className="modal-content">
            <div class="modals">
              <div class="icon"><i class="fa-regular fa-circle-question"></i></div>
              <h3>Are you sure?</h3>
              <p>Do you really want to delete your account? You will not be able to undo this action.</p>
              <div class="buttons">
                <button
                  type="button"
                  className="no-btn"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="button"
                  className="yes-btn"
                  data-bs-dismiss="modal"
                  onClick={logoutFun}
                >
                  Yes
                </button>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Header;
