import { Link } from "react-router-dom";
import React from 'react'

const Sidebar = ({onLogout}) => {
  return (
    <div className="w-64 bg-green-500 h-screen text-white p-6">
    <h2 className="text-2xl font-semibold mb-6">Merchant Dashboard</h2>
    <ul>
      <li className="mb-4">
        <button
          onClick={onLogout}
          className="w-full text-left text-white hover:bg-green-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </li>
      <li>
      <Link
          to={"/dashboard"}
          className="w-full text-left text-white hover:bg-green-600 px-4 py-2 rounded"
        >
          Dash Board
        </Link>
      </li>
      <li>
      <Link
          to={"/addproduct"}
          className="w-full text-left text-white hover:bg-green-600 px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </li>
      <li className="mb-4">
      
        {/* <Link
        
          to={"/category"}
          className="w-full text-left text-white hover:bg-green-600 px-4 py-2 rounded"
        >
          Add Category
        </Link> */}
      </li>
    </ul>
  </div>
  )
}

export default Sidebar

  