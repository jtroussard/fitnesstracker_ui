import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

}

export const useUser = () => useContext(UserContext);