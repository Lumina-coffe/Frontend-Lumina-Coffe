// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../components/CartContext";

function Cart() {
    const { cart, removeFromCart } = useCart();

    return (
        <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-blue-600">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p className="text-gray-700 mt-4">Your cart is empty.</p>
            ) : (
                <ul className="mt-4">
                    {cart.map((item) => (
                        <li key={item.id} className="mt-2 flex justify-between items-center max-w-md mx-auto">
                            <span className="text-gray-700">{item.name} - {item.price}</span>
                            <button
                                className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;