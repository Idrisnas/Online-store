import React, { useContext } from "react";
import { Cartcontext } from "../context/CartContext";
import { Link } from "react-router-dom"; // Optional: If you want to provide a way to go back to the product list

const CartPage = () => {
  const { cartItems, totalAmount, removeFromCart, clearCart } = useContext(Cartcontext);

  // If no items in the cart, display a message
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center text-2xl">
        <p>Your cart is empty. <Link to="/" className="text-blue-500">Go back Shop Page</Link></p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 mt-11">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-center py-6">Your Cart</h1>
          {/* List Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-lg font-semibold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  className="text-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="p-4 bg-gray-200">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                // Redirect to checkout or another page
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
