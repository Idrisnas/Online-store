import React, { useContext } from "react";
import { Cartcontext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FilterContext } from "../context/FilterContext";

const Homepage = () => {
  const { products } = useContext(Cartcontext);

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    filteredProducts,
  } = useContext(FilterContext);


  if (products.length === 0)
    return (
      <p className="h-screen flex justify-center items-center text-center text-2xl">
        Loading products...
      </p>
    );

  return (
    <div className="container mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Search, Filter, and Sort Section */}
      <div className="mb-6 flex gap-6">
        {/* Search Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
        </div>

        {/* Filter by Category */}
        <div className="flex items-center gap-2">
          <select
            className="px-4 py-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
          >
            <option value="all">All Categories</option>
            {/* Add dynamic category options if you have categories */}
            <option value="Clothes">Clothing</option>
            <option value="Shoes">Shoes</option>
            <option value="Electronics">Electronics</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        {/* Sort by Price */}
        <div className="flex items-center gap-2">
          <select
            className="px-4 py-2 border rounded-lg"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)} // Update sort order
          >
            <option value=""  selected>Filter by price</option>

            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <div
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            key={product.id}
          >
            {/* Product image */}
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images[0]} // Assuming the product has an array of images
                alt={product.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
            </Link>

            {/* Product title and price */}
            <h2 className="text-lg font-bold mb-2 truncate">{product.title}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>

            <p className="text-gray-600 mb-4">{product.category.name}</p>

            {/* View Product button */}
            <Link
              to={`/product/${product.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Homepage;
