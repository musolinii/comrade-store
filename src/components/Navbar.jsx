import React from "react";

function Navbar({ isOpen, toggleSidebar, onSearch, cartItems, onCartClick }) {
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <>
            <nav className="bg-gray-800 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            className="md:hidden p-2 bg-blue-500 text-white rounded-md mr-4"
                            onClick={toggleSidebar}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isOpen ? "M4 6h16M4 12h16m-7 6h7":"M6 18L18 6M6 6l12 12"}
                                />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="text-white text-xl font-bold">
                        Comrade Store
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        <input 

                            type="text" 
                            placeholder="Search..."
                            className="p-2 rounded-md text-black w-64 border border-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                        <button 
                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    
                    <div 
                        className="w-[60px] h-[60px] cursor-pointer relative"
                        onClick={onCartClick}
                    >
                        <img 
                            src="data:image/png;base64,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" 
                            alt="Cart" 
                        />
                        {cartItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                {cartItems}
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;