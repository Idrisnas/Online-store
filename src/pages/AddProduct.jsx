import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const Base_url = "http://ecommerce.reworkstaging.name.ng/v2";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    descp: "",
    price: "",
    brand: "",
    quantity: "",
    images: [""],
    currency: "NGN",
    min_qty: "",
    max_qty: "",
    discount: "",
    discount_expiration: "",
    has_refund_policy: false,
    has_discount: false,
    has_shipment: true,
    has_variation: false,
    shipping_locations: ["Nigeria", "Ghana", "Egypt"],
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const merchantData = localStorage.getItem("merchantResponse");
      const parsedMerchant = JSON.parse(merchantData);
      
      try {
        const response = await axios.get(`${Base_url}/categories?merchant_id=${parsedMerchant.id}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryId) {
      setResponseMessage("Please select a category.");
      return;
    }

    const productData = {
      ...formData,
      category_id: categoryId,
      merchant_id: JSON.parse(localStorage.getItem("merchantResponse")).id,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${Base_url}/products`, productData);
      setResponseMessage("Product added successfully!");
      setLoading(false);
      console.log(response.data);
      
      setFormData({
        title: "",
        descp: "",
        price: "",
        brand: "",
        quantity: "",
        images: [""],
        currency: "NGN",
        min_qty: "",
        max_qty: "",
        discount: "",
        discount_expiration: "",
        has_refund_policy: false,
        has_discount: false,
        has_shipment: true,
        has_variation: false,
        shipping_locations: ["Nigeria", "Ghana", "Egypt"],
      });
      setCategoryId(""); // Clear selected category

      alert("Product added successfully!")
    //   navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error("Error adding product:", error);
      setResponseMessage("Failed to add product.");
    }
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar onLogout={handleLogout} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

            {/* Category Selection */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Select Category</label>
              <select
                name="category_id"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Form */}
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Product Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter product title"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Product Description</label>
                <textarea
                  name="descp"
                  value={formData.descp}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter product description"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter product price"
                />
              </div>

              {/* Brand */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter product brand"
                />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter product quantity"
                />
              </div>

              {/* Image URLs */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Product Images</label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter image URL"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-blue-500 hover:underline"
                >
                  Add another image
                </button>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>

            {/* Response Message */}
            {responseMessage && (
              <div className="mt-4 text-red-600">{responseMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
