import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const incrementCartCount = () => {
        setCartCount((prevCount) => prevCount + 1);
    };

    return (
        <CartContext.Provider value={{ cartCount, incrementCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
