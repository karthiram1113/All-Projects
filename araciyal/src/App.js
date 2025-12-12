import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/views/SignIn/Login"
import Admindasboard from './views/Dashboard/dashboard';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Tamilnadu_news from "./components/News/tamilnadu news/list";
import TNFormPage from "./components/News/tamilnadu news/formpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-dashboard" element={<Admindasboard/>} />
      <Route path="/tamilnaduNews-list/3" element={<Tamilnadu_news/>} />
      <Route path="/tamilnaduNews/create" element={<TNFormPage />} />
      <Route path="/Tamilnadu/Edit/:id" element={<TNFormPage />} />
      </Routes>
      </BrowserRouter>


      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastStyle={{
          background: "#333",
          color: "#fff",
          fontFamily: "Roboto Slab, Arial, Helvetica, sans-serif",
          borderRadius: "10px",
          padding: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}

export default App;
