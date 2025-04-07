import React from "react";

function Sidebar({ isOpen, toggleSidebar, onCategorySelect }) {
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        // Pass the selected category to Homepage component through onCategorySelect prop
        onCategorySelect(category);
    }
    
   return (
      <div
         className={`fixed md:static top-0 left-0 h-full bg-gray-600 text-white p-4 flex flex-col gap-6 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
         } md:translate-x-0 transition-transform duration-300 w-64 z-50`}
        >
         {/* Categories Section */}
         <div>
            <p className="text-lg font-bold mb-2">Categories</p>
            <ul className="space-y-2">
                {['All', 'Phones', 'Laptops', 'Audio', 'Consoles'].map((category) => (
                    <li
                        key={category}
                        onClick={() => handleCategoryClick(category.toLowerCase())}
                        className={`hover:text-blue-300 cursor-pointer ${
                            selectedCategory === category.toLowerCase() ? "text-blue-300" : ""
                        }`}
                    >
                        {category}
                    </li>
                ))}
            </ul>
         </div>

         {/* Filter by Price Section */}
         <div>
            <p className="text-lg font-bold mb-2">Filter by Price</p>
            <div className="flex items-center gap-2">
               <input
                  className="p-2 rounded-md text-black w-20"
                  type="text"
                  placeholder="Min"
               />
               <input
                  className="p-2 rounded-md text-black w-20"
                  type="text"
                  placeholder="Max"
               />
            </div>
         </div>

         {/* Submit Button */}
         <div>
            <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
               Submit
            </button>
         </div>
      </div>
   );
}

export default Sidebar;