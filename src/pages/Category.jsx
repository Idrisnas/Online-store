import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const Base_url = "http://ecommerce.reworkstaging.name.ng/v2";
const storedMerchantData = localStorage.getItem("merchantResponse");

const Category = () => {
  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  useEffect(() => {
    const fetchMerchantData = () => {
      const storedMerchantData = localStorage.getItem("merchantResponse");

      if (storedMerchantData) {
        try {
          const parsedData = JSON.parse(storedMerchantData);
          setMerchantData(parsedData);
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
  const createCategory = async () => {
    const parsedMerchant = JSON.parse(storedMerchantData);
    if (!categoryName) {
      alert("Please fill in all fields.");
      return;
    }

    if (!merchantData) {
      alert("Merchant data is missing.");
      return;
    }

    const categoryData = {
      merchant_id: parsedMerchant.id,
      name: categoryName,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${Base_url}/categories`, categoryData);
      console.log("Category created:", response.data);
      setResponseMessage("Category created successfully!");
      setCategoryName("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating category:", error);
      setResponseMessage("Failed to create category. Please try again.");
    }
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
            <h3 className="text-xl font-semibold mb-4">
              Welcome, {merchantData.firstName}!
            </h3>

            <h1>Merchant Information</h1>
            <p>
              <strong>First Name:</strong> {merchantData.first_name}
            </p>
            <p>
              <strong>Merchant ID:</strong> {merchantData.id}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border p-2 mb-4 w-full rounded-md"
            />
            <button
              onClick={createCategory}
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
