import React from 'react';
import './Sidebar.css';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
      <Link to="/addproduct">
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to="/productlist">
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Product List" />
         <p>Product Lsit</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
