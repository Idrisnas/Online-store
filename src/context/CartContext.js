import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const Cartcontext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
  
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        const limitedResponse = response.data.slice(0, 40); // Limit to first 10 products
        setProducts(limitedResponse);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Ensure loading is turned off even on error
      }
    };
    fetchProducts();
  }, []);

  // Update total amount whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  // Persist cartItems to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add product to cart (with quantity logic)
  const addToCart = useCallback((product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      // Update quantity if product already in cart
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product to cart with quantity 1
      setCartItems((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }, [cartItems]);

  // Remove product from cart by ID
  const removeFromCart = useCallback((id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  // Clear all items from cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Context values to provide
  const values = {
    products,
    cartItems,
    totalAmount,
    loading, // Loading state added here
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <Cartcontext.Provider value={values}>{children}</Cartcontext.Provider>;
};
