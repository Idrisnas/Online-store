import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar

const Base_url = "http://ecommerce.reworkstaging.name.ng/v2";

const AdminDashboard = () => {
  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // Categories state
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category ID
  const [products, setProducts] = useState([]); // Products state
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  // Fetch Merchant Data from localStorage
  useEffect(() => {
    const fetchMerchantData = () => {
      const storedMerchantData = localStorage.getItem("merchantResponse");

      if (storedMerchantData) {
        try {
          const parsedData = JSON.parse(storedMerchantData);
          setMerchantData(parsedData);
          localStorage.setItem("merchantId", parsedData.id);
        } catch (error) {
          console.error("Error parsing merchant data:", error);
          setMerchantData(null);
        }
      } else {
        console.error("No merchant data found in localStorage.");
        setMerchantData(null);
      }

      setLoading(false);
    };

    fetchMerchantData();
  }, []);

  // Fetch Categories for the Merchant
  useEffect(() => {
    const fetchCategories = async () => {
      if (!merchantData) return;

      try {
        const response = await axios.get(`${Base_url}/categories?merchant_id=${merchantData.id}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [merchantData]);

  // Fetch Products for the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory || !merchantData) return;

      setLoading(true);
      try {
        const response = await axios.get(`${Base_url}/products`, {
          params: {
            merchant_id: merchantData.id,
            category_id: selectedCategory,
          },
        });
        setProducts(response.data.data);
        setLoading(false);
        console.log(response.data.data); 
        console.log("category id",selectedCategory);
        console.log("merchant id",merchantData.id);

        
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        setResponseMessage("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, [selectedCategory, merchantData]);

  const handleLogout = () => {
    localStorage.removeItem("merchantResponse")
    navigate("/signin");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setProducts([]); // Clear products when category changes
    setResponseMessage("");
  };

  const navigateToCategory = () => {
    if (merchantData && merchantData.id) {
      navigate("/category");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!merchantData) {
    return <div>No merchant data available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar onLogout={handleLogout} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div>
              <h1>Merchant Information</h1>
              <p><strong>First Name:</strong> {merchantData.first_name}</p>
              <p><strong>Merchant ID:</strong> {merchantData.id}</p>
              <p><strong>Store Name:</strong> {merchantData.store_name}</p>
            </div>

            <p className="text-gray-600">
              Your merchant profile is active. Below are your details:
            </p>

            <button
              onClick={navigateToCategory}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Go to Category Page
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Select Category</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
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

            {/* Display products */}
            {selectedCategory && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Products for Category: {categories.find(c => c.id === selectedCategory)?.name}</h3>

                {/* Display products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4">
                         <img
                      src={product.images[0]} 
                      alt={product.title}
                      className="w-full h-48 object-cover mb-4"
                    />
                       <img
                      src={product.images[1]} 
                      alt={product.title}
                      className="w-full h-48 object-cover mb-4"
                    />
                    
                        <h4 className="font-semibold">{product.title}</h4>
                        <p>{product.descp}</p>
                        <p><strong>Price:</strong> {product.price} NGN</p>
                        <p><strong>Stock:</strong> {product.quantity}</p>
                      </div>
                    ))
                  ) : (
                    <p>No products found for this category.</p>
                  )}
                </div>
              </div>
            )}

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

export default AdminDashboard;
