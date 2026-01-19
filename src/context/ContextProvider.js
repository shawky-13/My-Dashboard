// import necessary modules from react
import { createContext, useContext, useState } from "react";

// create context
const StateContext = createContext();

// create initial State
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

// create ContextProvider component
// It provides state and functions to all child components via StateContext.Provider.
export const ContextProvider = ({ children }) => {
  // return the context you created with it's Provider
  return (
    <StateContext.Provider value={{ test: "test" }}>
      {children}
    </StateContext.Provider>
  );
};
