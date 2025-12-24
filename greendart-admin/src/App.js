import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./views/SignIn/Login";
import Dashboard from "./views/Dashboard/dashboard";
// import Gallery_Image from "./views/GalleryImage";
// import GalleryImage_Form from "./components/Forms/galleryImage";
// import Gallery_Video from "./views/GalleryVideo";
// import GalleryVideo_Form from "./components/Forms/galleryVideo";
// import GalleryMedia from "./views/GalleryMedia";
// import GalleryMedia_Form from "./components/Forms/galleryMedia";
// import GalleryBanner from "./components/gallery/gallerybanner";
// import Gallerycreate from "./components/gallery/gallerycreate";
// import Gallerylist from "./components/gallery/gallerylist";
import ProjectBanner from "./components/project/projectbanner";
import Projectcreate from "./components/project/projectcreate";
import ProjectList from "./components/project/projectlist";
// import Contactlist from "./components/contact/contactlist";
import ProjectDetails from "./components/project/projectview";
import AboutBanner from "./components/about/aboutbanner";
import Aboutcreate from "./components/about/aboutcreate";
import Aboutlist from "./components/about/aboutlist";
import AboutView from "./components/about/aboutview";
import GalleryBanner from "./components/gallery/gallerybanner";
import Gallerycreate from "./components/gallery/gallerycreate";
import Gallerylist from "./components/gallery/gallerylist";
import GalleryView from "./components/gallery/galleryview";
import Contactlist from "./components/contact/contactlist";
import ContactView from "./components/contact/contactview";
import TeamBanner from "./components/teams/teambanner";
import Teamcreate from "./components/teams/teamcreate";
import Teamlist from "./components/teams/teamlist";
import TeamView from "./components/teams/teamview";
import HomeBanner from "./components/home/homebanner";
import HomeList from "./components/home/homelist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* <Route path="/gallery-banner" element={<GalleryBanner />} />
          <Route path="/gallery-create" element={<Gallerycreate />} />
          <Route path="/gallery-list" element={<Gallerylist />} />

          <Route path="/about-banner" element={<AboutBanner />} />
          <Route path="/about-create" element={<Aboutcreate />} />
          <Route path="/about-list" element={<Aboutlist />} /> */}

          <Route path="/project-banner" element={<ProjectBanner />} />
          <Route path="/project-create" element={<Projectcreate />} />
          <Route path="/project-list" element={<ProjectList />} />
          <Route path="/project/view/:id" element={<ProjectDetails />} />
          <Route path="/project/edit/:id" element={<Projectcreate />} />

          <Route path="/about-banner" element={<AboutBanner />} />
          <Route path="/about-create" element={<Aboutcreate />} />
          <Route path="/about-list" element={<Aboutlist />} />
          <Route path="/about/view/:id" element={<AboutView />} />
          <Route path="/about/edit/:id" element={<Aboutcreate />} />

          <Route path="/gallery-banner" element={<GalleryBanner />} />
          <Route path="/gallery-create" element={<Gallerycreate />} />
          <Route path="/gallery-list" element={<Gallerylist />} />
          <Route path="/gallery/view/:id" element={<GalleryView />} />
          <Route path="/gallery/edit/:id" element={<Gallerycreate />} />

          <Route path="/contact-list" element={<Contactlist />} />
          <Route path="/contact/view/:id" element={<ContactView />} />

          <Route path="/teams-banner" element={<TeamBanner />} />
          <Route path="/teams-create" element={<Teamcreate />} />
          <Route path="/teams-list" element={<Teamlist />} />
          <Route path="/teams/view/:id" element={<TeamView />} />
          <Route path="/teams/edit/:id" element={<Teamcreate />} />

          <Route path="/home-banner" element={<HomeBanner />} />
          <Route path="/home/bannerList" element={<HomeList />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        // theme="colored"
        toastStyle={{
          background: "white",
          color: "black",
          borderRadius: "10px",
          fontSize: "15px",
          padding: "10px",
          textAlign: "left",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}

export default App;
