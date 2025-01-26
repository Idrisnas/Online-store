import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Cartcontext } from "../context/CartContext";
import {  FaShoppingCart } from "react-icons/fa";
const Header = () => {
  const { cartItems } = useContext(Cartcontext);
  return (
    <div>
      <nav className="bg-gray-800 text-white flex justify-between items-center p-4 gap-4 fixed w-full top-0">
        <Link to={"/"} className="">
          Online Store
        </Link>
       
        {/* <Link to={"/admin"} className="">
          Admin
        </Link> */}
{/* <Link to={"/products/:categoryId"}>
View
</Link> */}
        <Link to="/cart">
  <div className="relative flex items-center justify-center">
    {/* Cart Icon */}
    <div className="text-white text-lg hover:text-blue-400 transition-all cursor-pointer">
      <FaShoppingCart size={25} color="blue" />
    </div>

    {/* Cart Item Count Badge */}
    {cartItems.length > 0 && (
      <span className="absolute bottom-3 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {cartItems.length}
      </span>
    )}
  </div>
</Link>
      </nav>
    </div>
  );
};

export default Header;
