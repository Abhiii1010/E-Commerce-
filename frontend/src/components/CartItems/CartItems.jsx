import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';

function CartItems() {
  const { all_product, cartItems, removeFromCart,getTotalcartAmount } = useContext(ShopContext);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) =>
        cartItems[e.id] > 0 ? (
          <div className="cartitems-format" key={e.id}>
            <img src={e.image} alt={e.name} className='carticon-product-icon' />
            <p>{e.name}</p>
            <p>${e.new_price}</p>
            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
            <p>${e.new_price * cartItems[e.id]}</p>
            <img
              src={remove_icon}
              alt="Remove item"
              onClick={() => removeFromCart(e.id)}
              className="cartitems-remove-icon"
            />
          </div>
        ) : null
      )}
      <div className="cartitems-down"><div className="cartitems-total">
        <h1>Cart Totals </h1>
        <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>${getTotalcartAmount()}</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
            <p>Shipment fee</p>
            <p>Free</p>
        </div>
        <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>${getTotalcartAmount()}</h3>
        </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
         </div>
         <div className="cartitems-promocode">
            <p>If you have a promo code , Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" name="" id="" placeholder='promo code'/>
            </div>
         </div>
    </div>
  );
}

export default CartItems;
