import React from "react";
import { read } from "../utils/read";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const data = await read(file);
    setProducts(data);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Category selected in Homepage:", category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  // Combined filter for both category and search
  const filteredProducts = products.filter(product => {
    // Category filter
    const matchesCategory = 
      selectedCategory === "all" || 
      !selectedCategory || 
      product.category.toLowerCase() === selectedCategory;

    // Search filter
    const matchesSearch = 
      !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="w-screen h-screen bg-white flex flex-col">
        <Navbar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onSearch={handleSearch}
        />
        <div className="flex flex-1">
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            onCategorySelect={handleCategorySelect}
          />
          <div className="flex-1 p-4">
            <input 
              type="file" 
              accept=".xlsx" 
              onChange={handleFileUpload}
              className="mb-4 p-2 border rounded-md" 
            />
            {filteredProducts.length === 0 ? (
              <p className="text-gray-500 text-center mt-4">
                No products found matching your search criteria
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filteredProducts.map((product, index) => (
                  <div key={index} className="border rounded-md p-4 shadow-md">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full object-cover rounded-md"
                    />
                    <h2 className="text-lg font-bold mt-2">{product.name}</h2>
                    <p className="text-gray-700">Price: ${product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;

