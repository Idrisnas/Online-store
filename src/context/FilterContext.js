import React, { createContext, useState, useEffect, useContext } from "react";
import { Cartcontext } from "./CartContext"; 

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useContext(Cartcontext); // Fetching products from CartContext

  // State for search term, selected category, and sort order
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const [filteredProducts, setFilteredProducts] = useState(products);

  // Effect to filter products based on search term, category, and sorting
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearchTerm =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||  product.category.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category.name === selectedCategory;

      return matchesSearchTerm && matchesCategory;
    });

    // Sorting the filtered products based on sortOrder
    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

    setFilteredProducts(sorted);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // Expose the context values
  const values = {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    filteredProducts,
  };

  return <FilterContext.Provider value={values}>{children}</FilterContext.Provider>;
};
