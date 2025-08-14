import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import cartIcon from '../assets/cart_icon.png'; // Make sure this path is correct
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [menu,setmenu]=useState('shop')
  const {  getTotalCartItems}=useContext(ShopContext)
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="Shopper Logo" />
        <p>SHOPPER</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={()=>{setmenu("shop")}}><Link style={{textDecoration:'none'}} to={'/'}>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("mens")}}><Link style={{textDecoration:'none'}} to={'/mens'}>Men</Link> 
          {menu==="mens"?<hr/>:<></>}
        </li>
        <li onClick={()=>{setmenu("womens")}}>
          <Link style={{textDecoration:'none'}} to={'/womens'}>Womens</Link>
          {menu==="womens"?<hr/>:<></>}
        </li>
        <li onClick={()=>{setmenu("kids")}}><Link style={{textDecoration:'none'}} to={'/kids'}>kids</Link>
          {menu==="kids"?<hr/>:<></>}
        </li>
      </ul>
     <div className="nav-login-cart">
      {localStorage.getItem('token')? <button onClick={()=>{localStorage.removeItem('token');window.location.replace('/')}}>Logout</button> :  <Link to="/login">
    <button>Login</button>
  </Link>}
 
  
  <Link to="/cart">
    <img src={cartIcon} alt="Cart" />
  </Link>

  
  <div className="nav-cart-count">{getTotalCartItems()}</div>
</div>

    </div>
  );
};

export default Navbar;
