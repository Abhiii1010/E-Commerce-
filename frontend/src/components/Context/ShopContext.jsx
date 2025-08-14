import React, { createContext, useState } from 'react';
import './ShopContext.css';
import all_product from '../assets/all_product';

export const ShopContext = createContext(null);

// Initialize default cart: { productId: 0, ... }
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[all_product[index].id] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0),
    }));
  };

  const getTotalcartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
  const getTotalCartItems = () => {
  let totalItem = 0;
  for (const item in cartItems) {
    totalItem += cartItems[item]; // Accumulate all items
  }
  return totalItem;
};


  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalcartAmount,
    getTotalCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
