import React from "react";
import { read } from "../utils/read";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CartModal from "../components/CartModal";
import { useState } from "react";

function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const data = await read(file);
    setProducts(data);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Category selected in Homepage:", category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log('Added to cart:', product.name);
  };

  const handleRemoveFromCart = (index) => {
    setCart(currentCart => {
      const newCart = [...currentCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = 
      selectedCategory === "all" || 
      !selectedCategory || 
      product.category.toLowerCase() === selectedCategory;

    const matchesSearch = 
      !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="w-screen h-screen bg-white flex flex-col">
        <Navbar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onSearch={handleSearch}
          cartItems={cart.length}
          onCartClick={toggleCart}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredProducts.map((product, index) => (
                <div key={index} className="border rounded-md p-4 shadow-md">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full object-cover rounded-md"
                  />
                  <h2 className="text-lg font-bold mt-2">{product.name}</h2>
                  <p className="text-gray-700">Price: {product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
      />
    </>
  );
}

export default Homepage;

