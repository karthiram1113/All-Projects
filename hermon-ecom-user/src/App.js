import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import Category_list from './Component/category/category-list';
import Checkout from './Component/Navbar-items/Add-to-card';
import Order_summary from './Component/Navbar-items/order-summary';
import WishList from './Component/Wishlist';
import MyAccount from './Component/profile/accout-page';
import FullProductList from './Component/Home/Products/full-list';
import { CartProvider } from './Component/Home/cardcontext';
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <div className="App">
           <BrowserRouter>
           <CartProvider >
    <Routes>
      <Route path='/'  element={<Home />} />
      <Route path='/Productlist'  element={<FullProductList />} />
      <Route path='/Fruits&Vegitables/:id'  element={<Category_list />} />
      <Route path='/AddToCard-list'  element={<Checkout />} />
      <Route path='/Order-Summary'  element={<Order_summary />} />
      <Route path='/Wishlist'  element={<WishList />} />
      <Route path='/MyAccount/Edit/:id'  element={<MyAccount />} />
      {/* <Route path='/profile-main'  element={<MyAccount />} /> */}
    
    </Routes>
    </CartProvider>
    </BrowserRouter>
    <ToastContainer 
       position="bottom-center"
       autoClose={1000}
       hideProgressBar={false}
       closeOnClick={true}
       pauseOnHover={true}
       draggable={true}
       // progress={undefined}
       theme="colored"
     />
    </div>
  );
}

export default App;
