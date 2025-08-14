import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Shop from './components/Pages/Shop';
import Cart from './components/Pages/Cart';
import Product from './components/Pages/Product';
import ShopCategory from './components/Pages/ShopCategory';
import LoginSignup from './components/Pages/LoginSignup';
import men_banner from "../src/components/assets/banner_mens.png"
import women_banner from '../src/components/assets/banner_women.png'
import kid_banner from '../src/components/assets/banner_kids.png'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop category="men" />} />
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
