import React from 'react';

function CartModal({ isOpen, onClose, cartItems, onRemoveItem }) {
    if (!isOpen) return null;

    const total = cartItems?.reduce((sum, item) => {
        return sum + (item.price || 0);
    }
    , 0) || 0;  

    const calculateTotal = (priceString) => {
        // Extract numbers from string, remove $ signs
        const prices = priceString.match(/\$?(\d+\.?\d*)/g);
        if (!prices) return 0;
        
        // Convert strings to numbers and sum them
        return prices.reduce((sum, price) => {
            return sum + parseFloat(price.replace('$', ''));
        }, 0);
    };

    const totalPrice = calculateTotal(total);


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                    {!cartItems || cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center">Your cart is empty</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div 
                                key={index}
                                className="flex items-center gap-4 border-b py-2"
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-gray-600">{item.price}</p>
                                </div>
                                <button
                                    onClick={() => onRemoveItem(index)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between mb-4">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">${totalPrice}</span>
                    </div>
                    <button 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={() => console.log(total)}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartModal;