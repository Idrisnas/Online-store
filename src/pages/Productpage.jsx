import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Cartcontext } from "../context/CartContext";
import Flyer from "./Flyer";

const Productpage = () => {
  const { id } = useParams();

  const [productDetails, setProductdetails] = useState({});
  const { addToCart } = useContext(Cartcontext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        setProductdetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (productDetails === 0)
    return (
      <p className="h-screen flex justify-center items-center text-center text-2xl">
        Loading product...
      </p>
    );
  return (
    <div className="bg-gray-100 min-h-screen py-12 mt-11 ">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3">
              <h1 className="text-m font-bold text-gray-400">
                {productDetails.title}
              </h1>
            </div>

            <img
              src={productDetails.images ? productDetails.images[0] : ""}
              alt={productDetails.title}
              className="w-full h-96 object-cover mb-4 rounded-t-lg lg:rounded-l-lg"
            />
            {productDetails.images?.[1] && (
              <img
                src={productDetails.images[1]}
                alt={productDetails.title}
                className="w-full h-96 object-cover mb-4 rounded-lg"
              />
            )}
            {productDetails.images?.[2] && (
              <img
                src={productDetails.images[2]}
                alt={productDetails.title}
                className="w-full h-96 object-cover mb-4 rounded-b-lg lg:rounded-l-lg"
              />
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className="lg:w-1/2 px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {productDetails.title}
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {/* {productDetails.category.name} */}
            </p>
            <div className="flex items-center mt-4">
              <span className="text-3xl font-semibold text-green-600">
                ${productDetails.price}
              </span>
            </div>

            <p className="text-gray-700 mt-6">{productDetails.description}</p>

            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => addToCart(productDetails)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
