import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../assets/dropdown_icon.png';
import Item from '../Item/Item';

function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);

  console.log("Banner path received:", props.banner);

  return (
    <div className="shop-category">
      <img src={props.banner} alt="Category Banner" className="category-banner" />

      <div className="shopcategory-indexSort">
        <div className="shopcategory-index">
          <p>Show 1–12</p>
          <span>out of 36 products</span>
        </div>

        <div className="shopcategory-sort">
          Sort by
          <img src={dropdown_icon} alt="Dropdown Icon" />
        </div>
      </div>

      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default ShopCategory;
