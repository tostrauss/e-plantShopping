import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items); // Access cart items from Redux state
  const dispatch = useDispatch();

  // Calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce(
        (total, item) =>
          total + item.quantity * parseFloat(item.cost.replace('$', '')),
        0
      )
      .toFixed(2);
  };

  // Calculate the subtotal for a specific item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
  
  
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name })); // Remove item if quantity reaches 0
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Handle continue shopping button click
  const handleContinueShopping = () => {
    onContinueShopping(); // Navigate back to the product listing page
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some plants to continue!</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-cost">Unit Price: {item.cost}</p>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <p className="cart-item-total">
                  Subtotal: ${calculateTotalCost(item)}
                </p>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h2>Total Amount: ${calculateTotalAmount()}</h2>
          <button
            className="get-started-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartItem;
