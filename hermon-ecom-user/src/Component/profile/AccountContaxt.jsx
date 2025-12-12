// context/AccountContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AccountContext = createContext();

export const useAccount = () => {
    return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("MyAccount");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <AccountContext.Provider value={{ activeTab, handleTabClick }}>
            {children}
        </AccountContext.Provider>
    );
};
