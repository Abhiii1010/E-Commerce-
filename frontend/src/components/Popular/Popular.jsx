import React from 'react';
import './Popular.css';
import data_product from '../assets/data';
import Item from '../Item/Item'; // ✅ Make sure the path is correct
import { useState, useEffect } from 'react';

function Popular() {
  const [popularproducts,setPopularProducts] =useState([]);
  useEffect(()=>{
      fetch('http://localhost:4000/popularinwomen')
      .then((res)=>res.json()).then((data)=>setPopularProducts(data))
  },[])
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularproducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
