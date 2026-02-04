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
  // create the states you want to share across components
  const [isActive, setActiveMenu] = useState(true);
  // create the states for the icons on Navbar
  const [isClicked, setIsClicked] = useState(initialState);
  // create the state for the screen size in mobile responsive design
  const [screenSize, setScreenSize] = useState(undefined);
  // return the context you created with it's Provider
  // create a handleClick function to manage the isClicked state
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  return (
    // note : value prop is where you define what values you want to share across components
    <StateContext.Provider
      value={{
        isActive,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// custom hook to use the context values in other components
export const useStateContext = () => useContext(StateContext);

// note: when you use ContextProvider you must wrap your app into the ContextProvider component
//       go to index.js file and wrap <App /> with <ContextProvider></ContextProvider> after importing it.

// after you importing ContextProvider in any component you can use the custom hook useStateContext to access the context values
// example:
// import { useStateContext } from "./context/ContextProvider";
// const { isActive, setIsActive } = useStateContext();
