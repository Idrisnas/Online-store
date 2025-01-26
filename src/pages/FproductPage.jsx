import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Base_url = "http://ecommerce.reworkstaging.name.ng/v2";

const FProductPage = () => {
//   const { categoryId } = useParams();  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsWithFetch = async () => {
      setLoading(true);  

      try {
        const merchantId = "675ff0a456d563e5aeba86ea"; 
        const categoryId = "675ff11a56d563e5aeba86f2";

        const response = await fetch(
          `${Base_url}/products?merchant_id=${merchantId}&category_id=${categoryId}`
        );
        const data = await response.json();

        console.log("API Response:", data);  
        if (data && data.data && data.data.length > 0) {
          setProducts(data.data);  
        } else {
          setResponseMessage("No products found for this category.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setResponseMessage("Failed to fetch products.");
      } finally {
        setLoading(false);  
      }
    };

    fetchProductsWithFetch();
  }, []); 
  if (loading) {
    return <div className="bg-red-600 h-screen mt-16">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Products</h2>
        
        {/* Display error message */}
        {responseMessage && <div className="text-red-600">{responseMessage}</div>}

        {/* Display products */}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  src={product.images[0]}  
                  alt={product.title}
                  className="product-image"
                />
                <h4>{product.title}</h4>
                <p>{product.descp}</p>
                <p>Price: {product.price} NGN</p>
                <p>Stock: {product.quantity}</p>
              </div>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FProductPage;
