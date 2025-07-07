import React, { useEffect,useState } from 'react'
import cross_icon from'../../assets/cross_icon.png';
import './ListProduct.css'
function ListProduct() {
  const [allproducts, setAllProducts] =useState([]);
  const fetchInfo=async()=>{
    await fetch('http://localhost:4000/allproduct').then((res)=>res.json()).then((data)=>{setAllProducts(data)})
  }
  useEffect(()=>{
    fetchInfo();
  })
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>old Price</p>
        <p>New Price</p>
        <p>Image</p>
      </div>
      <hr />
      {allproducts.map((product,index)=>{
        return <div className="listproduct-format-main listproduct-format" key={index}>
          <img src={product.image} alt="" className='listproduct-product-icon'/>
          <p>{product.name}</p>
          <p>${product.old_price}</p>
          <p>{product.new_price}</p>
          <p>{product.category}</p>
          <img className='listproduct-remove-icon' src={cross_icon} alt="" />
        </div>
      })}
      
    </div>
  )
}

export default ListProduct
